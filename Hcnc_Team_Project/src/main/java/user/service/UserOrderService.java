package user.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import user.mapper.UserOrderMapper;

@Service
public class UserOrderService {

	@Autowired
	private UserOrderMapper userOrderMapper;
	
	public List<HashMap<String, Object>> selectOrderRequestItemListByUser(Long cartId) {
		// TODO Auto-generated method stub
		return userOrderMapper.selectOrderRequestItemListByUser(cartId);
	}

	public HashMap<String, Object> selectItemCntByUser(Long cartId) {
		// TODO Auto-generated method stub
		return userOrderMapper.selectItemCntByUser(cartId);
	}

	@Transactional
	public HashMap<String, Object> selectRequestedOrderInfoByUser(Map<String, Object> param) {
		// TODO Auto-generated method stub
		HashMap<String, Object> result = new HashMap<>();
		
        try {
        	HashMap<String, Object> basicInfo = userOrderMapper.selectOrderMemberBasicInfoByUser(param);
        	Integer totalPoint = userOrderMapper.selectMemberPointByUser(param);
        	List<HashMap<String, Object>> coupons = userOrderMapper.selectMemberCouponListByUser(param);
        	List<HashMap<String, Object>> address = userOrderMapper.selectMemberAddressListByUser(param);
        	
        	result.putAll(basicInfo);
        	result.put("totalPoint", totalPoint);
        	result.put("coupons", coupons);
        	result.put("address", address);
        	
        } catch(Exception e) {
        	throw new RuntimeException("회원 정보 조회 실패", e);
        }
		return result;
	}

	@Transactional
	public int orderDataSaveByUser(Map<String, Object> order, List<Map<String, Object>> items) {
		int result = 1;
		
		// 1. ORDERS테이블 데이터 입력
		int ordersInsert = userOrderMapper.orderDataSaveByUser(order);
		if(ordersInsert == 1) {
			System.out.println("orders 테이블 데이터 저장완료!");
		} else {
			result = 0;
			System.out.println("orders 테이블 데이터 저장실패");
		}
		
		// 2. ORDER_ID 가져오기
		Long orderId = userOrderMapper.getOrderIdByUser(order);
		order.put("orderId", orderId);
		
		// 3. ORDER_ITEMS에 데이터 입력
		boolean orderItems = true;
		for(int i = 0; i < items.size(); i++) {
			Map<String, Object> item = items.get(i);
			
			item.put("orderId", orderId);
			
			int orderItemsInsert = userOrderMapper.insertOrderItemsByUser(item);
			
			if(orderItemsInsert != 1) {
				orderItems = false;
			}
		}
		
		if(orderItems) {
			System.out.println("orderItems 데이터 저장완료!");
		} else {
			result = 0;
			System.out.println("orderItems 데이터 저장실패");
		}
		
		// 4. 포인트 차감
		boolean points = true;
		if((int) order.get("usedPoint") != 0) {
			int pointInsert = userOrderMapper.insertPointByUser(order);
			
			if(pointInsert != 1) {
				points = false;
			}
		}
		
		if(points) {
			System.out.println("points 테이블 데이터 저장완료!");
		} else {
			result = 0;
			System.out.println("points 테이블 데이터 저장실패 ");
		}
		
		// 5. 쿠폰 차감
		boolean coupons = true;
		if(order.get("couponId") != null) {
			int couponUpdate = userOrderMapper.updateCouponByUser(order);
			
			if(couponUpdate != 1) {
				coupons = false;
			}
		}
		
		if(coupons) {
			System.out.println("coupons 테이블 데이터 저장완료!");
		} else {
			result = 0;
			System.out.println("coupons 테이블 데이터 저장실패");
		}
		
		// 6. 재고 차감
		boolean inventories = true;
		for(int i=0; i < items.size(); i++) {
			Map<String, Object> item = items.get(i);
			
			List<Map<String, Object>> optionIds = userOrderMapper.selectOrderItemOptionListByUser(item); 
			for(int j=0;j < optionIds.size(); j++) {
				Map<String, Object> option = optionIds.get(j);
				int updateQuantity= userOrderMapper.updateQuantityByUser(option);
				
				if(updateQuantity != 1) {
					inventories = false;
				}
			}
		}
		
		if(inventories) {
			System.out.println("inventories 테이블 데이터 저장완료!");
		} else {
			result = 0;
			System.out.println("inventories 테이블 데이터 저장실패");
		}
		
		// 회원 누적 금액 합산
		if(order.get("memberId") != null) {
			userOrderMapper.updateMemberPriceAmount(order);
		}
		
		// 7. 회원 카트ID의 체크된 항목 삭제 처리
		boolean cartItemDelete = true;
		for(int i = 0; i < items.size(); i++) {
			Map<String, Object> item = items.get(i);
			
			int deleteCartItem = userOrderMapper.deleteCartItemByUser(item);
			
			if(deleteCartItem != 1) {
				cartItemDelete = false;
			}
		}
		
		if(cartItemDelete) {
			System.out.println("cartItemDelete 테이블 데이터 저장완료!");
		} else {
			result = 0;
			System.out.println("cartItemDelete 테이블 데이터 저장실패");
		}
		
		// 8. 바로가기 주문이라면 임시 카트 삭제하기
		if(order.get("tempId") != null) {
			int deleteCart = userOrderMapper.deleteCartByUser(order);
			
			if(deleteCart == 1) {
				System.out.println("임시카트 삭제 완료!");
			}
		}
		
		return result;
	}

	public HashMap<String, Object> selectSuccessOrderByUser(String orderNumber) {
		// TODO Auto-generated method stub
		return userOrderMapper.selectSuccessOrderByUser(orderNumber);
	}

	// 주문내역페이지 조회
	public List<HashMap<String, Object>> orderHistory(String memberId) {
	    return userOrderMapper.selectOrderHistoryByUser(memberId);
	}

	public List<HashMap<String, Object>> orderItemCountByUser(String memberId) {
		return userOrderMapper.orderItemCountByUser(memberId);
	}

	public Map<Long, HashMap<String, Object>> selectOrderDetailByUser(HashMap<String, Object> param) {
		
		List<HashMap<String, Object>> selectOrderDetail = userOrderMapper.selectOrderDetailByUser(param);
		
		// orderId 기준으로 그룹화
		Map<Long, HashMap<String, Object>> orderDetailItemMap = new LinkedHashMap<>();
		
		for(HashMap<String, Object> row: selectOrderDetail) {
			Long orderId = (Long) row.get("ORDER_ID");
			
			// 해당 orderId가 orderDetailItemMap에 없는 경우
			if(!orderDetailItemMap.containsKey(orderId)) {
				HashMap<String, Object> item = new HashMap<>();
				
				item.put("ORDER_ID", row.get("ORDER_ID"));
				item.put("ORDER_NUMBER", row.get("ORDER_NUMBER"));
				item.put("PHONE_NUMBER", row.get("PHONE_NUMBER"));
				item.put("ORDER_STATUS", row.get("ORDER_STATUS"));
				item.put("ORDER_DT", row.get("ORDER_DT"));
				item.put("TOTAL_AMOUNT", row.get("TOTAL_AMOUNT"));
				item.put("DISCOUNT_AMOUNT", row.get("DISCOUNT_AMOUNT"));
				item.put("FINAL_AMOUNT", row.get("FINAL_AMOUNT"));
				item.put("PAYMENT_METHOD", row.get("PAYMENT_METHOD"));
				item.put("SHIPPING_POST", row.get("SHIPPING_POST"));
				item.put("SHIPPING_ADDR_1", row.get("SHIPPING_ADDR_1"));
				item.put("SHIPPING_ADDR_2", row.get("SHIPPING_ADDR_2"));
				item.put("USER_NAME", row.get("USER_NAME"));
				item.put("SHIPPING_COMMENT", row.get("SHIPPING_COMMENT"));

				
				// 옵션이 있는 경우 담을 리스트 추가해놓기
				item.put("orderItems", new ArrayList<HashMap<String, Object>>());

				orderDetailItemMap.put(orderId, item);
			}
			
			// 주문 상품 목록 추가!
			if(row.get("ORDER_ITEM_ID") != null) {
				HashMap<String, Object> orderItem = new HashMap<>();
				
				orderItem.put("ORDER_ITEM_ID", row.get("ORDER_ITEM_ID"));
				orderItem.put("IMAGE_ID", row.get("IMAGE_ID"));
				orderItem.put("IMAGE_URL", row.get("IMAGE_URL"));
				orderItem.put("PRODUCT_ID", row.get("PRODUCT_ID"));
				orderItem.put("PRODUCT_NAME", row.get("PRODUCT_NAME"));
				orderItem.put("PRICE", row.get("PRICE"));
				orderItem.put("QUANTITY", row.get("QUANTITY"));
				orderItem.put("SUB_TOTAL", row.get("SUB_TOTAL"));
				orderItem.put("ORDER_STATUS", row.get("ORDER_STATUS"));
				orderItem.put("PRODUCT_OPTION", row.get("PRODUCT_OPTION"));	
	            
				@SuppressWarnings("unchecked")
				List<HashMap<String, Object>> orderItems =
	            		(List<HashMap<String, Object>>) orderDetailItemMap.get(orderId).get("orderItems");
	            
				orderItems.add(orderItem);
			}
		}
		
		// Map의 values를 List로 반환
		return orderDetailItemMap;
	}

	public HashMap<String, Object> selectDeliveryTrackingByUser(HashMap<String, Object> param) {

		return userOrderMapper.selectDeliveryTrackingByUser(param);
	}
}
