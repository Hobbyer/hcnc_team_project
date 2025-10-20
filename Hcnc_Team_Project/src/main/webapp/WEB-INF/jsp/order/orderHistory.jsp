<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>주문내역</title>
    <jsp:include page="../layout/headertop.jsp" />
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Malgun Gothic', sans-serif;
            background-color: #f5f5f5;
            line-height: 1.6;
        }

        /* 컨테이너 */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
        }

        /* 페이지 헤더 */
        .page-header {
            background: white;
            padding: 40px;
            border-radius: 8px;
            margin-bottom: 30px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            border-top: 4px solid #DC0630;
        }

        .page-title {
            font-size: 32px;
            font-weight: 700;
            color: #DC0630;
            margin-bottom: 10px;
        }

        .page-subtitle {
            color: #666;
            font-size: 15px;
        }
        
        /* 메인 탭 */
        .main-tabs {
            display: flex;
            background: white;
            border-radius: 8px 8px 0 0;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .main-tab {
            flex: 1;
            padding: 20px;
            background: white;
            border: none;
            border-bottom: 3px solid #e0e0e0;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            color: #666;
            transition: all 0.3s;
        }

        .main-tab:hover {
            background: #f9f9f9;
        }

        .main-tab.active {
            color: #DC0630;
            border-bottom-color: #DC0630;
        }

        /* 탭 컨텐츠 */
        .tab-content {
            display: none;
        }

        .tab-content.active {
            display: block;
        }

        /* 필터 섹션 */
        .filter-section {
            background: white;
            padding: 30px;
            border-radius: 0 0 8px 8px;
            margin-bottom: 25px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .filter-header {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 20px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }

        .date-filter {
            display: flex;
            align-items: center;
            gap: 10px;
            flex-wrap: wrap;
        }

        .period-buttons {
            display: flex;
            gap: 5px;
        }

        .period-btn {
            padding: 8px 16px;
            border: 1px solid #ddd;
            background: white;
            border-radius: 4px;
            cursor: pointer;
            font-size: 13px;
            transition: all 0.3s;
        }

        .period-btn:hover {
            background: #f5f5f5;
        }
        
        .period-btn.active {
            background: #DC0630;
            color: white;
            border-color: #DC0630;
        }

        .date-input {
            padding: 10px 14px;
            border: 2px solid #ddd;
            border-radius: 6px;
            font-size: 14px;
        }

        .date-separator {
            color: #666;
            font-weight: 600;
        }

        .btn-search {
            padding: 10px 24px;
            background: #DC0630;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
        }

        .btn-search:hover {
            background: #B8051F;
        }

        .filter-notice {
            font-size: 13px;
            color: #888;
            line-height: 1.6;
        }
   		
        /* 섹션 제목 */
        .section-title {
            font-size: 22px;
            font-weight: 700;
            color: #333;
            margin-bottom: 20px;
            padding: 20px 0;
        }

        /* 주문 카드 */
        .order-card {
            background: white;
            border-radius: 8px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .order-header {
            display: flex;
            justify-content: space-between;
            padding-bottom: 20px;
            border-bottom: 2px solid #f5f5f5;
            margin-bottom: 20px;
        }

        .order-info {
            display: flex;
            gap: 20px;
            align-items: center;
        }

        .order-date {
            font-size: 15px;
            color: #333;
            font-weight: 600;
        }

        .order-number {
            font-size: 13px;
            color: #999;
            background: #f5f5f5;
            padding: 6px 12px;
            border-radius: 4px;
        }

        .order-body {
            display: flex;
            gap: 25px;
        }

        .product-image {
            width: 140px;
            height: 140px;
            object-fit: cover;
            border-radius: 8px;
            border: 1px solid #f0f0f0;
        }

        .product-details {
            flex: 1;
        }

        .product-name {
            font-size: 18px;
            font-weight: 700;
            color: #333;
            margin-bottom: 10px;
        }

        .product-name span {
            font-size: 14px;
            color: #888;
            margin-bottom: 6px;
        }

        .product-quantity {
            font-size: 14px;
            color: #888;
            margin-bottom: 15px;
        }

        .product-price {
            font-size: 24px;
            font-weight: 800;
            color: #DC0630;
            margin-top: 10px;
        }

        .order-actions {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 12px;
            min-width: 180px;
        }

        .status-badge {
            padding: 10px 20px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 700;
        }

        .status-delivered {
            background: #e8f5e9;
            color: #74BF04;
        }

        .status-shipping {
            background: #e3f2fd;
            color: #0A4DA6;
        }

        .status-preparing {
            background: #fff9e6;
            color: #F2CC0C;
        }
        
        .status-cancelled {
            background: #FFF0F2;
            color: #591A03;
        }

        .status-pending {
            background: #fff9e6;
            color: #F2CC0C;
        }

        .action-buttons {
            display: flex;
            flex-direction: column;
            gap: 8px;
            width: 100%;
        }

        .btn {
            padding: 10px 20px;
            border: 2px solid #ddd;
            background: white;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
        }

        .btn:hover {
            background: #f5f5f5;
        }

        .btn-primary {
            background: #DC0630;
            color: white;
            border-color: #DC0630;
        }

        .btn-primary:hover {
            background: #B8051F;
        }

        /* 빈 상태 */
        .empty-state {
            text-align: center;
            padding: 80px 20px;
            background: white;
            border-radius: 8px;
        }

        .empty-icon {
            font-size: 80px;
            margin-bottom: 20px;
            opacity: 0.3;
        }

        .empty-title {
            font-size: 22px;
            font-weight: 700;
            color: #333;
            margin-bottom: 10px;
        }

        .empty-text {
            color: #999;
            font-size: 15px;
        }

        /* 모달 */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.6);
            z-index: 1000;
            justify-content: center;
            align-items: center;
        }

        .modal.active {
            display: flex;
        }

        .modal-content {
            background: white;
            padding: 40px;
            border-radius: 12px;
            max-width: 550px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
            padding-bottom: 20px;
            border-bottom: 3px solid #DC0630;
        }

        .modal-title {
            font-size: 26px;
            font-weight: 800;
            color: #DC0630;
        }

        .close-btn {
            background: #f5f5f5;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
        }

        .close-btn:hover {
            background: #e0e0e0;
            color: #333;
        }

        .alert {
            padding: 16px 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-size: 14px;
            border-left: 4px solid;
        }

        .alert-warning {
            background: #fff9e6;
            color: #591A03;
            border-color: #F2CC0C;
        }

        .refund-product {
            display: flex;
            gap: 18px;
            padding: 20px;
            background: #f9f9f9;
            border-radius: 8px;
            margin-bottom: 25px;
        }

        .refund-product img {
            width: 90px;
            height: 90px;
            object-fit: cover;
            border-radius: 8px;
        }

        .refund-product-info {
            flex: 1;
        }

        .refund-product-name {
            font-weight: 700;
            font-size: 16px;
            margin-bottom: 8px;
            color: #333;
        }

        .refund-product-price {
            color: #DC0630;
            font-weight: 800;
            font-size: 18px;
            margin-top: 8px;
        }

        .form-group {
            margin-bottom: 25px;
        }

        .form-label {
            display: block;
            margin-bottom: 10px;
            font-weight: 700;
            color: #333;
            font-size: 15px;
        }

        .form-select,
        .form-textarea {
            width: 100%;
            padding: 14px 16px;
            border: 2px solid #ddd;
            border-radius: 6px;
            font-size: 15px;
            font-family: inherit;
            transition: border-color 0.3s;
        }

        .form-textarea {
            min-height: 120px;
            resize: vertical;
        }

        .form-select:focus,
        .form-textarea:focus {
            outline: none;
            border-color: #DC0630;
        }

        .refund-info {
            background: #FFF0F2;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 25px;
            border-left: 4px solid #DC0630;
        }

        .refund-info-title {
            font-weight: 700;
            margin-bottom: 15px;
            color: #DC0630;
            font-size: 16px;
        }

        .refund-info-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            font-size: 15px;
            color: #333;
        }

        .refund-info-total {
            display: flex;
            justify-content: space-between;
            margin-top: 15px;
            padding-top: 15px;
            border-top: 2px solid #DC0630;
            font-weight: 800;
            font-size: 18px;
            color: #DC0630;
        }

        .modal-buttons {
            display: flex;
            gap: 12px;
            margin-top: 25px;
        }

        .modal-btn {
            flex: 1;
            padding: 16px;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s;
        }

        .modal-btn-cancel {
            background: #f5f5f5;
            color: #666;
        }

        .modal-btn-cancel:hover {
            background: #e0e0e0;
        }

        .modal-btn-submit {
            background: #DC0630;
            color: white;
        }

        .modal-btn-submit:hover {
            background: #B8051F;
        }

        /* 주문상세 모달 스타일 */
        .detail-section {
            margin-bottom: 25px;
            padding-bottom: 25px;
            border-bottom: 2px solid #f5f5f5;
        }

        .detail-section:last-child {
            border-bottom: none;
        }

        .detail-section-title {
            font-size: 18px;
            font-weight: 700;
            color: #DC0630;
            margin-bottom: 15px;
        }

        .detail-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            font-size: 14px;
        }

        .detail-label {
            color: #666;
            font-weight: 600;
        }

        .detail-value {
            color: #333;
            font-weight: 700;
            text-align: right;
        }

        .detail-product {
            display: flex;
            gap: 15px;
            padding: 15px;
            background: #f9f9f9;
            border-radius: 8px;
            margin-bottom: 15px;
        }

        .detail-product img {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 6px;
        }

        .detail-product-info {
            flex: 1;
        }

        .detail-product-name {
            font-weight: 700;
            font-size: 15px;
            margin-bottom: 5px;
            color: #333;
        }

        .detail-product-option {
            font-size: 13px;
            color: #888;
            margin-bottom: 3px;
        }

        .detail-product-price {
            font-weight: 700;
            color: #DC0630;
            margin-top: 8px;
        }

        .price-summary {
            background: #FFF0F2;
            padding: 20px;
            border-radius: 8px;
        }

        .price-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            font-size: 15px;
        }

        .price-row.total {
            margin-top: 15px;
            padding-top: 15px;
            border-top: 2px solid #DC0630;
            font-size: 18px;
            font-weight: 800;
            color: #DC0630;
        }

        .delivery-step {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            padding: 12px;
            background: #f9f9f9;
            border-radius: 6px;
        }

        .delivery-step.active {
            background: #FFF0F2;
            border-left: 4px solid #DC0630;
        }

        .delivery-step-icon {
            font-size: 24px;
            margin-right: 12px;
        }

        .delivery-step-info {
            flex: 1;
        }

        .delivery-step-title {
            font-weight: 700;
            color: #333;
            margin-bottom: 3px;
        }

        .delivery-step-date {
            font-size: 13px;
            color: #888;
        }

        @media (max-width: 768px) {
        	.filter-header {
                flex-direction: column;
                align-items: flex-start;
            }
        
            .order-body {
                flex-direction: column;
            }

            .order-actions {
                flex-direction: row;
                justify-content: flex-start;
                width: 100%;
            }

            .action-buttons {
                flex-direction: row;
                flex-wrap: wrap;
            }
        }
    </style>
</head>

<body>
    <jsp:include page="../layout/header.jsp" />
    <div class="container">
        <!-- 페이지 헤더 -->
        <div class="page-header">
            <h1 class="page-title">주문내역</h1>
            <p class="page-subtitle">고객님의 주문 내역을 확인하실 수 있습니다</p>
        </div>
        
        <!-- 메인 탭 -->
        <div class="main-tabs">
            <button class="main-tab active" data-tab="orders">주문내역조회</button>
            <!-- <button class="main-tab" data-tab="cancelled">취소/환불 내역</button> -->
        </div>
        
		<!-- 주문내역조회 탭 -->
        <div class="tab-content active" id="orders-content">
            <div class="filter-section">
                <div class="filter-header">
                    <div class="date-filter">
                        <div class="period-buttons">
                            <button class="period-btn" onclick="setPeriod(0, this)">오늘</button>
                            <button class="period-btn" onclick="setPeriod(7, this)">1주일</button>
                            <button class="period-btn" onclick="setPeriod(30, this)">1개월</button>
                            <button class="period-btn" onclick="setPeriod(90, this)">3개월</button>
                            <button class="period-btn" onclick="setPeriod(180, this)">6개월</button>
                        </div>
                        <input type="date" class="date-input" id="startDate">
                        <span class="date-separator">~</span>
                        <input type="date" class="date-input" id="endDate">
                        <button class="btn-search" onclick="searchByDate()">조회</button>
                    </div>
                </div>
                <div class="filter-notice">
                    · 기간 버튼을 선택하거나 날짜를 직접 입력하여 주문내역을 조회할 수 있습니다.<br>
                    · 각 주문의 상세 정보는 주문상세 버튼을 통해 확인하실 수 있습니다.
                </div>
            </div>

            <div class="section-title">주문 상품 정보</div>
            <div id="orderList"></div>
        </div>
    </div>
        
    <!-- 주문 목록 -->
    <div id="orderList"></div>

    <!-- 주문상세 모달 -->
    <div class="modal" id="detailModal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">주문 상세</h2>
                <button class="close-btn" onclick="closeDetailModal()">&times;</button>
            </div>

            <div id="detailContent">
                <!-- 주문 정보 -->
                <div class="detail-section">
                    <h3 class="detail-section-title">주문 정보</h3>
                    <div class="detail-item">
                        <span class="detail-label">주문번호</span>
                        <span class="detail-value" id="detailOrderNumber"></span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">주문일시</span>
                        <span class="detail-value" id="detailOrderDate"></span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">주문상태</span>
                        <span class="detail-value" id="detailOrderStatus"></span>
                    </div>
                </div>

                <!-- 상품 정보 -->
                <div class="detail-section">
                    <h3 class="detail-section-title">상품 정보</h3>
                    <div id="detailProductInfo"></div>
                </div>

                <!-- 배송 정보 -->
                <div class="detail-section">
                    <h3 class="detail-section-title">배송 정보</h3>
                    <div class="detail-item">
                        <span class="detail-label">수령인</span>
                        <span class="detail-value" id="detailRecipient"></span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">연락처</span>
                        <span class="detail-value" id="detailPhone"></span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">배송지</span>
                        <span class="detail-value" id="detailAddress"></span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">배송 요청사항</span>
                        <span class="detail-value" id="detailRequest"></span>
                    </div>
                </div>

                <!-- 결제 정보 -->
                <div class="detail-section">
                    <h3 class="detail-section-title">결제 정보</h3>
                    <div class="price-summary">
                        <div class="price-row">
                            <span>총 상품금액</span>
                            <span id="detailProductPrice"></span>
                        </div>
                        <div class="price-row">
                            <span>배송비</span>
                            <span id="detailShippingPrice"></span>
                        </div>
                        <div class="price-row">
                            <span>총 할인금액</span>
                            <span id="detailDiscountPrice"></span>
                        </div>
                        <div class="price-row total">
                            <span>총 결제금액</span>
                            <span id="detailTotalPrice"></span>
                        </div>
                        <div class="detail-item" style="margin-top: 15px;">
                            <span class="detail-label">결제방법</span>
                            <span class="detail-value" id="detailPaymentMethod"></span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal-buttons">
                <button type="button" class="modal-btn modal-btn-cancel" onclick="closeDetailModal()">닫기</button>
            </div>
        </div>
    </div>

    <!-- 배송조회 모달 -->
    <div class="modal" id="trackingModal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">배송 조회</h2>
                <button class="close-btn" onclick="closeTrackingModal()">&times;</button>
            </div>

            <div id="trackingContent">
                <!-- 배송 정보 -->
                <div class="detail-section">
                    <h3 class="detail-section-title">배송 정보</h3>
                    <div class="detail-item">
                        <span class="detail-label">택배사</span>
                        <span class="detail-value" id="trackingCompany"></span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">운송장번호</span>
                        <span class="detail-value" id="trackingNumber"></span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">수령인</span>
                        <span class="detail-value" id="trackingRecipient"></span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">배송지</span>
                        <span class="detail-value" id="trackingAddress"></span>
                    </div>
                </div>

                <!-- 배송 추적 -->
                <div class="detail-section">
                    <h3 class="detail-section-title">배송 추적</h3>
                    <div id="trackingSteps"></div>
                </div>
            </div>

            <div class="modal-buttons">
                <button type="button" class="modal-btn modal-btn-cancel" onclick="closeTrackingModal()">닫기</button>
            </div>
        </div>
    </div>

    <jsp:include page="../layout/footer.jsp" />

    <script>
 // 기간 선택 함수
	    function setPeriod(days, button) {
	        // 같은 탭 내의 모든 기간 버튼 찾기
	        var parentFilter = button.closest('.filter-section');
	        var allButtons = parentFilter.querySelectorAll('.period-btn');
	        
	        // 모든 버튼의 active 클래스 제거
	        for (var i = 0; i < allButtons.length; i++) {
	            allButtons[i].classList.remove('active');
	        }
	        
	        // 클릭한 버튼에 active 클래스 추가
	        button.classList.add('active');
	        
	        // 날짜 계산
	        var endDate = new Date();
	        var startDate = new Date();
	        startDate.setDate(startDate.getDate() - days);
	        
	        // 날짜 형식 변환 (YYYY-MM-DD)
	        var endDateStr = endDate.toISOString().split('T')[0];
	        var startDateStr = startDate.toISOString().split('T')[0];
	        
	        // 현재 탭에 맞는 input 찾기
	        var startInput = parentFilter.querySelector('input[type="date"]');
	        var endInput = parentFilter.querySelectorAll('input[type="date"]')[1];
	        
	        // input 값 설정
	        if (startInput) startInput.value = startDateStr;
	        if (endInput) endInput.value = endDateStr;
	    }
	    
	    // 조회 버튼 클릭 함수
	    function searchByDate() {
	        var startDate = document.getElementById('startDate').value;
	        var endDate = document.getElementById('endDate').value;
	        
	        if (!startDate || !endDate) {
	            alert('날짜를 선택해주세요.');
	            return;
	        }
	        
	        console.log('조회 기간:', startDate, '~', endDate);
	        alert('조회 기간: ' + startDate + ' ~ ' + endDate);
	    }
	    
	    var orders = ${orderListJson};
	    console.log(orders);

        var currentRefundOrder = null;

        function formatPrice(price) {
            return price.toLocaleString('ko-KR') + '원';
        }

        function renderOrders() {
            $("#startDate")

            var orderList = document.getElementById('orderList');
            var html = '';
            
            for (var i = 0; i < orders.length; i++) {
                var order = orders[i];
                
                html += '<div class="order-card">';
                html += '<div class="order-header">';
                html += '<div class="order-info">';
                html += '<span class="order-date">📅 ' + order.ORDER_DT + '</span>';
                html += '<span class="order-number">주문번호: ' + order.ORDER_NUMBER + '</span>';
                html += '</div></div>';
                html += '<div class="order-body">';
                html += '<img src="' + order.IMAGE_URL + '" alt="' + order.PRODUCT_NAME + '" class="product-image">';
                html += '<div class="product-details">';
                html += '<h3 class="product-name">' + order.PRODUCT_NAME + '<span> 외 ' + (order.ORDER_ITEM_CNT - 1) + '개</span></h3>';
                html += '<div class="product-price">' + formatPrice(order.FINAL_AMOUNT) + '</div>';
                html += '</div>';
                html += '<div class="order-actions">';
                html += '<span class="status-badge status-' + order.ORDER_STATUS + '">' + order.ORDER_STATUS + '</span>';
                html += '<div class="action-buttons">';
                
                if (order.ORDER_STATUS === '배송중') {
                	html += '<button class="btn btn-primary" onclick="openTrackingModal(' + order.ORDER_ID + ')">🚚 배송조회</button>';
                }
                
                html += '<button class="btn" onclick="openDetailModal(' + order.ORDER_ID + ')">📋 주문상세</button>';
                html += '</div></div></div></div>';
            }
            
            orderList.innerHTML = html;
        }
        
        // 필터 탭 이벤트
        var tabs = document.querySelectorAll('.filter-tab');
        for (var i = 0; i < tabs.length; i++) {
            tabs[i].addEventListener('click', function() {
                var allTabs = document.querySelectorAll('.filter-tab');
                for (var j = 0; j < allTabs.length; j++) {
                    allTabs[j].classList.remove('active');
                }
                this.classList.add('active');
                renderOrders(this.getAttribute('data-filter'));
            });
        }

        // 주문상세 모달 열기
        function openDetailModal(orderId) {
        	console.log(orderId);

        	$.ajax({
        		url: "/getOrderDetail.do",
        		type: "post",
        		data: {orderId : orderId},
        		dataType: "json",
        		success: function(res){
        			var orderDetail = res.orderDetail[orderId];
        			
        			console.log(orderDetail);

                    // 주문 정보
                    document.getElementById('detailOrderNumber').textContent = orderDetail.ORDER_NUMBER;
                    document.getElementById('detailOrderDate').textContent = orderDetail.ORDER_DT;
                    document.getElementById('detailOrderStatus').textContent = orderDetail.ORDER_STATUS;

                    // 상품 정보
                    var productHtml = '';
                    var productTotalPrice = 0;
                    for(var i=0; i < orderDetail.orderItems.length; i++){
                        productTotalPrice += orderDetail.orderItems[i].SUB_TOTAL;
                        productHtml += '<div class="detail-product">';
                        productHtml += '<img src="' + orderDetail.orderItems[i].IMAGE_URL + '" alt="' + orderDetail.orderItems[i].PRODUCT_NAME + '">';
                        productHtml += '<div class="detail-product-info">';
                        productHtml += '<div class="detail-product-name">' + orderDetail.orderItems[i].PRODUCT_NAME + '</div>';
                        productHtml += '<div class="detail-product-option">' + orderDetail.orderItems[i].PRODUCT_OPTION + '</div>';
                        productHtml += '<div class="detail-product-option">수량: ' + orderDetail.orderItems[i].QUANTITY + '개</div>';
                        productHtml += '<div class="detail-product-price">' + formatPrice(orderDetail.orderItems[i].SUB_TOTAL) + '</div>';
                        productHtml += '</div></div>';
                    }

                    document.getElementById('detailProductInfo').innerHTML = productHtml;

                    var address = orderDetail.SHIPPING_ADDR_1 + (orderDetail.SHIPPING_ADDR_2 ? orderDetail.SHIPPING_ADDR_2 : '');
                    // 배송 정보
                    document.getElementById('detailRecipient').textContent = orderDetail.USER_NAME;
                    document.getElementById('detailPhone').textContent = orderDetail.PHONE_NUMBER;
                    document.getElementById('detailAddress').textContent = address;
                    document.getElementById('detailRequest').textContent = orderDetail.SHIPPING_COMMENT;

                    // 결제 정보 (할인내용 포함해야 됨)
                    var shippingFee = orderDetail.TOTAL_AMOUNT - productTotalPrice;
                    document.getElementById('detailProductPrice').textContent = formatPrice(productTotalPrice);
                    document.getElementById('detailShippingPrice').textContent = formatPrice(shippingFee);
                    if(orderDetail.DISCOUNT_AMOUNT === 0){
                    	 document.getElementById('detailDiscountPrice').textContent = formatPrice(0);
                    } else {
                    	 document.getElementById('detailDiscountPrice').textContent = '- ' + formatPrice(orderDetail.DISCOUNT_AMOUNT);
                    }
                    document.getElementById('detailTotalPrice').textContent = formatPrice(orderDetail.FINAL_AMOUNT);
                    document.getElementById('detailPaymentMethod').textContent = orderDetail.PAYMENT_METHOD;
                    document.getElementById('detailModal').classList.add('active');

                    document.querySelector("#detailModal .modal-content").scrollTop = 0;
        		},
        		error: function(){}
        	});
        }

        // 주문상세 모달 닫기
        function closeDetailModal() {
            document.getElementById('detailModal').classList.remove('active');
        }

        // 주문상세 모달 외부 클릭시 닫기
        document.getElementById('detailModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeDetailModal();
            }
        });
        
        // 배송조회 모달 열기
        function openTrackingModal(orderId) {

            $.ajax({
                url: "/getDeliveryTracking.do",
                type: "post",
                data: {orderId : orderId},
                dataType: "json",
                success: function(res){
                    var deliveryTracking = res.deliveryTracking;

                    console.log(deliveryTracking);

                    // 배송 정보
                    var address = deliveryTracking.SHIPPING_ADDR_1 + (deliveryTracking.SHIPPING_ADDR_2 ? deliveryTracking.SHIPPING_ADDR_2 : '');
                    document.getElementById('trackingCompany').textContent = deliveryTracking.COURIER_NAME || '정보 없음';
                    document.getElementById('trackingNumber').textContent = deliveryTracking.TRACKING_NUMBER || '정보 없음';
                    document.getElementById('trackingRecipient').textContent = deliveryTracking.USER_NAME;
                    document.getElementById('trackingAddress').textContent = address;

                    var deliveryTracking = [
                        { step: '상품준비중', active: false },
                        { step: '배송시작', active: false },
                        { step: '배송중', active: true },
                        { step: '배송완료', active: false }
	                ];

                    // 배송 추적
                    var trackingHtml = '';
                    for (var i = 0; i < deliveryTracking.length; i++) {
                        var track = deliveryTracking[i];
                        trackingHtml += '<div class="delivery-step' + (track.active ? ' active' : '') + '">';
                        trackingHtml += '<div class="delivery-step-icon">' + (track.active ? '📍' : '✓') + '</div>';
                        trackingHtml += '<div class="delivery-step-info">';
                        trackingHtml += '<div class="delivery-step-title">' + track.step + '</div>';
                        trackingHtml += '</div></div>';
                    }
                    document.getElementById('trackingSteps').innerHTML = trackingHtml;

                    document.getElementById('trackingModal').classList.add('active');

                    document.querySelector("#trackingModal .modal-content").scrollTop = 0;
                },
                error: function(){}
            });
        }

        // 배송조회 모달 닫기
        function closeTrackingModal() {
            document.getElementById('trackingModal').classList.remove('active');
        }

        // 배송조회 모달 외부 클릭시 닫기
        document.getElementById('trackingModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeTrackingModal();
            }
        });

        // 초기 렌더링
        renderOrders('all');
    </script>
    
</body>
</html>