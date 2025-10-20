<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<jsp:include page="../layout/headertop.jsp" />
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>주문완료</title>

<script>
	$(function(){
	    var orderNumber = "${orderInfo.ORDER_NUMBER}" || "";
	    var userName = "${orderInfo.USER_NAME}" || "";
	    var phoneNumber = "${orderInfo.PHONE_NUMBER}" || "";
	    var post = "${orderInfo.SHIPPING_POST}" || "";
	    var shippingAddr1 = "${orderInfo.SHIPPING_ADDR_1}" || "";
	    var shippingAddr2 = "${orderInfo.SHIPPING_ADDR_2}" || "";
	    
	    var totalAmount = Number("${orderInfo.TOTAL_AMOUNT}") || 0;
	    var shipCost = Number("${orderInfo.SHIP_COST}") || 0;
	    var discountAmount = Number("${orderInfo.DISCOUNT_AMOUNT}") || 0;
	    var point = Number("${orderInfo.POINT}") || 0;
	    var finalAmount = Number("${orderInfo.FINAL_AMOUNT}") || 0;
	    
	    var productAmount = totalAmount - shipCost;
	    var shippingFee = shipCost;
	    var totalDiscount = discountAmount + point;
	    var pointUsed = point;
	    var paymentMethod = "${orderInfo.PAYMENT_METHOD}" || "";
		
		// 주문번호
		$("#orderNumber").text(orderNumber);
		
		// 배송지 정보
		$("#receiverName").text(userName);
		$("#receiverPhone").text(phoneNumber);
		$("#shippingAddress").html(
		    "[" + post + "] " + shippingAddr1 + "<br>" + 
		    (shippingAddr2 || "")
		);
		
		// 결제 정보
		$("#productAmount").text(productAmount.toLocaleString() + "원");
		$("#shippingFee").text(shippingFee.toLocaleString() + "원");
		$("#discountAmount").text("-" + totalDiscount.toLocaleString() + "원");
		$("#pointUsed").text(pointUsed.toLocaleString() + "P");
		$("#paymentMethod").text(paymentMethod);
		$("#finalAmount").text(finalAmount.toLocaleString() + "원");
		
		if(sessionStorage.getItem("tempId") != null){
			sessionStorage.removeItem("tempId");
		}
		if(sessionStorage.getItem("orderData") != null){
			sessionStorage.removeItem("orderData");
		}
	});
</script>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    body {
        font-family: 'Malgun Gothic', sans-serif;
        background-color: #f5f5f5;
        padding: 40px 20px;
    }
    
    .container {
        max-width: 1200px;
        margin: 0 auto;
        background: white;
        padding: 40px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .page-title {
        text-align: center;
        margin-bottom: 40px;
        padding-bottom: 20px;
        border-bottom: 2px solid #333;
    }
    
    .page-title h1 {
        font-size: 28px;
        color: #DC0630;
        margin-bottom: 10px;
    }
    
    .success-message {
        color: 	gray;
        font-size: 16px;
    }
    
    .order-content {
        display: flex;
        gap: 40px;
    }
    
    .left-section {
        flex: 1;
    }
    
    .right-section {
        width: 350px;
        background: #f9f9f9;
        padding: 30px;
        border-radius: 8px;
    }
    
    .info-section {
        margin-bottom: 40px;
    }
    
    .section-title {
        font-size: 18px;
        font-weight: bold;
        color: #333;
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 2px solid #333;
    }
    
    .info-row {
        display: flex;
        padding: 12px 0;
        border-bottom: 1px solid #eee;
    }
    
    .info-label {
        width: 120px;
        color: #666;
        font-weight: 500;
    }
    
    .info-value {
        flex: 1;
        color: #333;
    }
    
    .price-row {
        display: flex;
        justify-content: space-between;
        padding: 12px 0;
        font-size: 15px;
    }
    
    .price-label {
        color: #666;
    }
    
    .price-value {
        color: #333;
        font-weight: 500;
    }
    
    .total-row {
        display: flex;
        justify-content: space-between;
        padding: 20px 0;
        margin-top: 15px;
        border-top: 2px solid #333;
        font-size: 18px;
        font-weight: bold;
    }
    
    .total-label {
        color: #333;
    }
    
    .total-value {
        color: #DC0630;
        font-size: 22px;
    }
    
    .btn-group {
        display: flex;
        gap: 10px;
        margin-top: 30px;
    }
    
    .btn {
        flex: 1;
        padding: 15px;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.3s;
    }
    
    .btn-primary {
        background: #DC0630;
        color: white;
    }
    
    .btn-primary:hover {
        background: #555;
    }
    
    .btn-secondary {
        background: white;
        color: #333;
        border: 1px solid #ddd;
    }
    
    .btn-secondary:hover {
        background: #f5f5f5;
    }
</style>

</head>
<body>
    <div class="container">
        <div class="page-title">
            <h1>주문이 완료되었습니다</h1>
            <p class="success-message">주문해주셔서 감사합니다.</p>
        </div>
        
        <div class="order-content">
            <!-- 좌측: 주문정보 -->
            <div class="left-section">
                <!-- 주문번호 -->
                <div class="info-section">
                    <h2 class="section-title">주문번호</h2>
                    <div class="info-row">
                        <span class="info-value" id="orderNumber"></span>
                    </div>
                </div>
                
                <!-- 배송지 정보 -->
                <div class="info-section">
                    <h2 class="section-title">배송지 정보</h2>
                    <div class="info-row">
                        <span class="info-label">받는사람</span>
                        <span class="info-value" id="receiverName"></span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">휴대폰번호</span>
                        <span class="info-value" id="receiverPhone"></span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">주소</span>
                        <span class="info-value" id="shippingAddress">
                            
                        </span>
                    </div>
                </div>
            </div>
            
            <!-- 우측: 결제정보 -->
            <div class="right-section">
                <h2 class="section-title">결제 정보</h2>
                
                <!-- 주문금액 -->
                <div class="price-row">
                    <span class="price-label">상품금액</span>
                    <span class="price-value" id="productAmount"></span>
                </div>
                <div class="price-row">
                    <span class="price-label">배송비</span>
                    <span class="price-value" id="shippingFee"></span>
                </div>
                <div class="price-row">
                    <span class="price-label">총 할인금액</span>
                    <span class="price-value" style="color: #DC0630;" id="discountAmount"></span>
                </div>
                
                <!-- 포인트 사용 -->
                <div class="price-row">
                    <span class="price-label">포인트 사용</span>
                    <span class="price-value" style="color: #DC0630;" id="pointUsed"></span>
                </div>
                
                <!-- 결제 방식 -->
                <div class="price-row" style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #ddd;">
                    <span class="price-label">결제 방식</span>
                    <span class="price-value" id="paymentMethod"></span>
                </div>
                
                <!-- 최종 결제금액 -->
                <div class="total-row">
                    <span class="total-label">결제금액</span>
                    <span class="total-value" id="finalAmount"></span>
                </div>
                
                <!-- 버튼 -->
                <div class="btn-group">
                    <button class="btn btn-primary" onclick="location.href='/orderHistory.do'">주문내역 보기</button>
                    <button class="btn btn-secondary" onclick="location.href='/'">쇼핑 계속하기</button>
                </div>
            </div>
        </div>
    </div>
</body>
</html>