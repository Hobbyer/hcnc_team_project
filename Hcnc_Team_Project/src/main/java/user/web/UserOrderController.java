package user.web;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import admin.mapper.NotificationMapper;
import common.websocket.WebUtil;
import user.service.UserOrderService;

@Controller
public class UserOrderController {

	@Autowired
	private UserOrderService userOrderService;

	@Autowired
	private NotificationMapper notificationMapper;

	// 페이지 로드
	@RequestMapping(value = "/orderView.do")
	public ModelAndView orderView(@RequestParam("cartId") Long cartId) {
		ModelAndView mav = new ModelAndView();

		System.out.println(cartId);

		HashMap<String, Object> itemCnt = userOrderService.selectItemCntByUser(cartId);
		List<HashMap<String, Object>> requestInfoList = userOrderService.selectOrderRequestItemListByUser(cartId);

		mav.addObject("itemCnt", itemCnt);
		mav.addObject("itemsInfo", requestInfoList);

		System.out.println(requestInfoList);

		mav.setViewName("order/order");

		return mav;
	}

	@RequestMapping(value = "/orderMemberData.do")
	public ModelAndView selectRequestedOrderInfoByUser(@RequestParam Map<String, Object> param, HttpSession session) {
		ModelAndView mav = new ModelAndView("jsonView");

		Map<String, Object> userInfo = (Map<String, Object>) session.getAttribute("userInfo");
		if (userInfo != null) {
			String memberId = (String) userInfo.get("MEMBER_ID");
			param.put("memberId", memberId);
		}

		System.out.println(param);

		HashMap<String, Object> resultInfo = userOrderService.selectRequestedOrderInfoByUser(param);

		mav.addObject("resultInfo", resultInfo);

		return mav;
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/orderDataSave.do")
	public ModelAndView orderDataSaveByUser(@RequestParam("paymentKey") String paymentKey,
			@RequestParam("orderId") String orderId, @RequestParam("amount") String amount,
			@RequestParam("itemsJson") String itemsJson, @RequestParam("orderJson") String orderJson,
			HttpSession session) {
		ModelAndView mav = new ModelAndView("jsonView");

		try {
			// 1. 토스페이먼츠 승인 API 호출
			JSONObject paymentData = confirmTossPayment(paymentKey, orderId, amount);

			// 2. 결제 수단 추출 (안전한 방식)
			String method = paymentData.getString("method");
			String paymentMethod = method;

			if (paymentData.has("easyPay")) {
				try {
					// easyPay가 JSONObject인 경우
					JSONObject easyPay = paymentData.getJSONObject("easyPay");

					if (easyPay.has("provider")) {
						paymentMethod = easyPay.getString("provider");
					}

				} catch (JSONException e) {
					// easyPay가 String인 경우 (하위 호환)
					try {
						paymentMethod = paymentData.getString("easyPay");
					} catch (Exception ex) {
						System.err.println("easyPay (간편결제)가 아님");
					}
				}
			}

			// 디코딩
			itemsJson = itemsJson.replace("&quot;", "\"");
			orderJson = orderJson.replace("&quot;", "\"");

			ObjectMapper mapper = new ObjectMapper();

			List<Map<String, Object>> items = mapper.readValue(itemsJson,
					new TypeReference<List<Map<String, Object>>>() {
					});

			Map<String, Object> order = mapper.readValue(orderJson, new TypeReference<Map<String, Object>>() {
			});

			order.put("paymentMethod", paymentMethod);

			System.out.println(order);
			System.out.println(items);

			String memberId = null;
			Map<String, Object> userInfo = (Map<String, Object>) session.getAttribute("userInfo");
			if (userInfo != null) {
				memberId = (String) userInfo.get("MEMBER_ID");
			} else {
				memberId = (String) order.get("guestId");
			}

			order.put("memberId", memberId);

			// DB 저장...
			int result = userOrderService.orderDataSaveByUser(order, items);

			if (result == 1) {
				mav.addObject("message", "주문/결제 완료!!");

				// 주문 성공 알림 (websocket)
				// WebUtil.sendNewOrderNotification(orderId, LocalDateTime.now().toString());
				// notificationMapper.insertNotificationByUser(orderId);

				mav.addObject("result", 1);
			} else {
				mav.addObject("message", "주문/결제 중 오류 발생했습니다.");
				mav.addObject("result", 0);
			}
		} catch (Exception e) {
			e.printStackTrace();

			mav.addObject("message", "토스페이먼츠 승인중 오류 발생");
			mav.addObject("result", -1);
		}

		return mav;
	}

	@RequestMapping(value = "/paySuccess.do")
	public ModelAndView paySuccess() {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("order/payments/paySuccess");
		return mav;
	}

	@RequestMapping(value = "/orderSuccess.do")
	public ModelAndView orderSuccess(@RequestParam("orderNum") String orderNumber) {
		ModelAndView mav = new ModelAndView();

		HashMap<String, Object> orderInfo = userOrderService.selectSuccessOrderByUser(orderNumber);

		mav.addObject("orderInfo", orderInfo);

		mav.setViewName("order/orderSuccess");

		return mav;
	}

	// 토스페이먼츠 승인 API 호출
	private JSONObject confirmTossPayment(String paymentKey, String orderId, String amount) throws Exception {

		String secretKey = "test_sk_d46qopOB89ZvvJl5Gbqd3ZmM75y0";
		String apiUrl = "https://api.tosspayments.com/v1/payments/confirm";

		URL url = new URL(apiUrl);
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestMethod("POST");
		conn.setRequestProperty("Authorization",
				"Basic " + Base64.getEncoder().encodeToString((secretKey + ":").getBytes()));
		conn.setRequestProperty("Content-Type", "application/json");
		conn.setDoOutput(true);

		JSONObject params = new JSONObject();
		params.put("paymentKey", paymentKey);
		params.put("orderId", orderId);
		params.put("amount", amount);

		OutputStream os = conn.getOutputStream();
		os.write(params.toString().getBytes("UTF-8"));
		os.close();

		int code = conn.getResponseCode();
		InputStream is = (code == 200) ? conn.getInputStream() : conn.getErrorStream();

		BufferedReader br = new BufferedReader(new InputStreamReader(is, "UTF-8"));
		StringBuilder response = new StringBuilder();
		String line;
		while ((line = br.readLine()) != null) {
			response.append(line);
		}
		br.close();

		if (code != 200) {
			throw new Exception("결제 승인 실패: " + response.toString());
		}

		return new JSONObject(response.toString());
	}

	// ----- 주문내역페이지 조회 로드 -----
	@RequestMapping(value = "/orderHistory.do")
	public ModelAndView orderHistory(HttpSession session) throws JsonProcessingException {
		ModelAndView mav = new ModelAndView();

		@SuppressWarnings("unchecked")
		Map<String, Object> userInfo = (Map<String, Object>) session.getAttribute("userInfo");

		if (userInfo != null) {
			String memberId = (String) userInfo.get("MEMBER_ID");

			List<HashMap<String, Object>> orderList = userOrderService.orderHistory(memberId);

			List<HashMap<String, Object>> orderItemCount = userOrderService.orderItemCountByUser(memberId);

			// orderItemCount를 Map으로 변환 (빠른 검색을 위해)
			Map<Object, Integer> countMap = new HashMap<>();

			for (HashMap<String, Object> item : orderItemCount) {
				Object orderId = item.get("ORDER_ID");
				Object count = item.get("ORDER_ITEM_CNT");
				if (orderId != null && count != null) {
					countMap.put(orderId, Integer.parseInt(count.toString()));
				}
			}

			// orderList에 ORDER_CNT 추가
			for (HashMap<String, Object> order : orderList) {
				Object orderId = order.get("ORDER_ID");
				if (orderId != null && countMap.containsKey(orderId)) {
					order.put("ORDER_ITEM_CNT", countMap.get(orderId));
				} else {
					order.put("ORDER_ITEM_CNT", 0); // 매칭되는 항목이 없으면 0
				}
			}

			mav.addObject("orderList", orderList);

			// JSON 변환
			ObjectMapper mapper = new ObjectMapper();
			mav.addObject("orderListJson", mapper.writeValueAsString(orderList));
		}

		mav.setViewName("order/orderHistory");

		return mav;
	}

	@RequestMapping(value = "/getOrderDetail.do")
	public ModelAndView getOrderDetail(@RequestParam HashMap<String, Object> param) {
		ModelAndView mav = new ModelAndView("jsonView");

		System.out.println(param);

		
		Map<Long, HashMap<String, Object>> orderDetail = userOrderService.selectOrderDetailByUser(param);
		  
		mav.addObject("orderDetail", orderDetail);
		 

		return mav;
	}

	@RequestMapping(value = "/getDeliveryTracking.do")
	public ModelAndView getDeliveryTracking(@RequestParam HashMap<String, Object> param) {
		ModelAndView mav = new ModelAndView("jsonView");

		System.out.println(param);

		HashMap<String, Object> deliveryTracking = userOrderService.selectDeliveryTrackingByUser(param);

		mav.addObject("deliveryTracking", deliveryTracking);

		return mav;
	}
}
