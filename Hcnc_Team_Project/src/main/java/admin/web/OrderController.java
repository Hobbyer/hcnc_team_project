package admin.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

import admin.mapper.NotificationMapper;
import admin.service.OrderService;
import common.websocket.WebUtil;


@Controller
public class OrderController {
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private NotificationMapper notification;
	
	//주문 조회
	
	//주문 상세조회
	@RequestMapping(value="selectOrderDetailListByAdmin.do")
	public NexacroResult selectOrderDetailListByAdmin( 
			@ParamDataSet(name="ds_search", required=false) Map<String, Object> dsSearch) {
		NexacroResult result = new NexacroResult();
		
		List<Map<String, Object>> orderList = orderService.selectOrderDetailListByAdmin(dsSearch);
		
		result.addDataSet("ds_order", orderList);

		return result;
	}
	
	//결제내역 조회
	@RequestMapping(value="selectPaymentListByAdmin.do")
	public NexacroResult selectPaymentListByAdmin( 
			@ParamDataSet(name="ds_search", required=false) Map<String, Object> dsSearch) {
		NexacroResult result = new NexacroResult();
		
		List<Map<String, Object>> paymentList = orderService.selectPaymentListByAdmin(dsSearch);
		
		result.addDataSet("ds_pay", paymentList);

		return result;
	}


    // 결제 상태 업데이트
    @RequestMapping(value="/updatePaymentListByAdmin.do")
    public NexacroResult updatePaymentListByAdmin(
            @ParamDataSet(name="ds_selected", required=false) List<Map<String, Object>> dsSelected) {

        NexacroResult result = new NexacroResult();

        //넥사크로에서 보내는 체크되어있는 것들의 리스트가 있으면 아래 실행
        if (dsSelected != null) {
            for (Map<String,Object> row : dsSelected) {
            	
            	// 웹소켓 알람을 보내기 위해서 만든 변수들입니다. dsSelected를  forEach돌려서 row로 빼낸것들임
            	String orderStatus = (String)row.get("PAYMENT_STATUS"); 
            	String orderId = (String)row.get("ORDER_NUMBER");
            	String userId = (String)row.get("MEMBER_ID");
            	
            	  // 2. 알림 DB 저장 ⭐
                Map<String, Object> params = new HashMap<>();
                params.put("senderId", "ADMIN");
                params.put("receiverId", userId);
                params.put("receiverType", "USER");
                params.put("notiType", "STATUS");
                params.put("notiMessage", orderId + "\n 주문상태 변경 : " + orderStatus);
                params.put("orderNo", orderId);
                params.put("orderStatus", orderStatus);            
            	
                orderService.updatePaymentListByAdmin(row);
                
                notification.insertNotificationByAdmin(params);                          //노티피케이션 디비 저장
                
                WebUtil.sendOrderStatusChangeNotification(userId, orderId, orderStatus); //웹소켓으로 알람 보내기
                
            }
        }

        return result;
    }
    
    // 배송내역 조회
  	@RequestMapping(value="/selectShipListByAdmin.do")
  	public NexacroResult selectShipListByAdmin( 
  			@ParamDataSet(name="ds_search", required=false) Map<String, Object> dsSearch) {
  		NexacroResult result = new NexacroResult();
  		
  		List<Map<String, Object>> shipList = orderService.selectShipListByAdmin(dsSearch);
  		
  		result.addDataSet("ds_ship", shipList);

  		return result;
  	}

  	 // 배송 상태 업데이트 -> 배송대기? 인서트문 : 업데이트문
    @RequestMapping(value="/updateShipListByAdmin.do")
    public NexacroResult updateShipListByAdmin(
            @ParamDataSet(name="ds_selected", required=false) List<Map<String, Object>> dsSelected) {
    	
    	int insertCnt = 0;     // 인서트문 실행된 갯수 파악할 변수
    	int upCnt = 0;         // 업데이트문 실행된 갯수 파악할 변수
    			
        NexacroResult result = new NexacroResult(); 

        if (dsSelected != null) {
        	 for (Map<String, Object> row : dsSelected) {
        	        Object shipmentId = row.get("SHIPMENT_ID");
        	        
        	        // 웹소켓 알람을 보내기 위해서 만든 변수들입니다. dsSelected를  forEach돌려서 row로 빼낸것들임
                	String orderStatus = (String)row.get("SHIPMENT_STATUS"); 
                	String orderId = (String)row.get("ORDER_NUMBER");
                	String userId = (String)row.get("MEMBER_ID");
                	
                	// 노티피케이션을 띄우기 위한 함수
                    Map<String, Object> params = new HashMap<>();
                    params.put("senderId", "ADMIN");
                    params.put("receiverId", userId);
                    params.put("receiverType", "USER");
                    params.put("notiType", "STATUS");
                    params.put("notiMessage", "[" +orderId+ "]" + " <br> 주문상태 변경 : " + orderStatus);
                    params.put("orderNo", orderId);
                    params.put("orderStatus", orderStatus);            
        	        
        	        if (shipmentId == null || "".equals(shipmentId.toString())) { // 배송ID가 없으면 데이터가 없으므로
        	            // INSERT 실행
        	        	orderService.insertShipListByAdmin(row);
        	        	insertCnt++;
        	        	System.out.println("실행된 인서트문의 갯수 : "+insertCnt);
        	        	
        	        } else { // 배송ID가 있으면 업데이트문 실행
        	            // UPDATE 실행
        	        	orderService.updateShipListByAdmin(row);
        	        	upCnt++;
        	        	System.out.println("실행된 업데이트문의 갯수 : "+upCnt);
        	        }
        	        
        	        orderService.updateOrderCommentByAdmin(row);                               // 주문상태 발송으로 변경
        	        notification.insertNotificationByAdmin(params);                            // 디비에 저장 
        	        WebUtil.sendOrderStatusChangeNotification(userId, orderId, orderStatus);   // 웹소켓으로 알람 보내기
        	    }
        }
        
        
        return result;
    }
    
    // 주문 상품 조회
    @RequestMapping(value="/selectOrderItemByAdmin.do")
  	public NexacroResult selectOrderItemByAdmin( 
  			@ParamDataSet(name="ds_search", required=false) Map<String, Object> dsSearch) {
  		NexacroResult result = new NexacroResult();
  		
  		List<Map<String, Object>> orderItemList = orderService.selectOrderItemByAdmin(dsSearch);
  		
  		result.addDataSet("ds_item", orderItemList);

  		return result;
  	}
    
    // 택배사별 택배비 조회
    @RequestMapping(value="/selectPostCarrierByAdmin.do")
  	public NexacroResult selectPostCarrierByAdmin( 
  			@ParamDataSet(name="ds_search", required=false) Map<String, Object> dsSearch) {
  		NexacroResult result = new NexacroResult();
  		
  		List<Map<String, Object>> postList = orderService.selectPostCarrierByAdmin(dsSearch);
  		List<Map<String, Object>> cateList = orderService.selectPostCateByAdmin();
  		
  		result.addDataSet("ds_post", postList);
  		result.addDataSet("ds_cate", cateList);
  		
  		return result;
  	}
    
    // 택배비 수정
    @RequestMapping(value="/updatePostPriceListByAdmin.do")
    public NexacroResult updatePostPriceListByAdmin(
            @ParamDataSet(name="ds_selected", required=false) List<Map<String, Object>> dsSelected) {

        NexacroResult result = new NexacroResult();

        if (dsSelected != null) {
            for (Map<String,Object> row : dsSelected) {
            	orderService.updatePostPriceListByAdmin(row);
            }
        }

        return result;
    }
    
    // 신규주문 건수
    @RequestMapping(value="/selectNewOrderCountByAdmin.do")
    public NexacroResult selectNewOrderCountByAdmin() {
        NexacroResult result = new NexacroResult();

        int orderCount = orderService.selectNewOrderCountByAdmin();
        
        // Map으로 감싸서 전송
        Map<String, Object> map = new HashMap<>();
        map.put("COUNT", orderCount);
        
        List<Map<String, Object>> list = new ArrayList<>();
        list.add(map);
        
        result.addDataSet("ds_orderCount", list);
        return result;
    }
    
    // 결제대기 건수
    @RequestMapping(value="/selectPendingPaymentCountByAdmin.do")
    public NexacroResult selectPendingPaymentCountByAdmin() {
        NexacroResult result = new NexacroResult();

        int payCount = orderService.selectPendingPaymentCountByAdmin();
        
        // Map으로 감싸서 전송
        Map<String, Object> map = new HashMap<>();
        map.put("COUNT", payCount);
        
        List<Map<String, Object>> list = new ArrayList<>();
        list.add(map);
        
        result.addDataSet("ds_payCount", list);
        return result;
    }
    // 배송대기 건수
    @RequestMapping(value="/selectPendingShipCountByAdmin.do")
    public NexacroResult selectPendingShipCountByAdmin() {
        NexacroResult result = new NexacroResult();

        int shipCount = orderService.selectPendingShipCountByAdmin();
        
        // Map으로 감싸서 전송
        Map<String, Object> map = new HashMap<>();
        map.put("COUNT", shipCount);
        
        List<Map<String, Object>> list = new ArrayList<>();
        list.add(map);
        
        result.addDataSet("ds_shipCount", list);
        return result;
    }
    
    // 대쉬보드 
    @RequestMapping(value="/selectDashStatByAdmin.do")
    public NexacroResult selectDashStatByAdmin() {
        NexacroResult result = new NexacroResult();

        List<Map<String, Object>> dashStat = orderService.selectDashStatByAdmin();
        
        result.addDataSet("ds_stat", dashStat);
        return result;
    }
    
    
    
}
