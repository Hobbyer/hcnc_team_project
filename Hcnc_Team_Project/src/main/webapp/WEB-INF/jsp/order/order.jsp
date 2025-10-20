<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>주문/결제</title>
<jsp:include page="../layout/headertop.jsp" />

<link type="text/css" rel="stylesheet" href="<c:url value='/css/order/order.css'/>" />
<link rel="stylesheet" href="//cdn.jsdelivr.net/xeicon/2.3.0/xeicon.min.css"/>
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script src="https://js.tosspayments.com/v2/standard"></script>

<!-- 쿠폰 모달 컨트롤 -->
<script>
	function openCouponModal(){
		$("#couponModal").show();
	}

	function closeCouponModal(){
		$("#couponModal").hide();
	}
</script>

<!-- 다음주소 API -->
<script>
    function daumPostcode() {
        new daum.Postcode({
            oncomplete: function(data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var addr = ''; // 주소 변수
                var extraAddr = ''; // 참고항목 변수

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('orderPost').value = data.zonecode;
                document.getElementById("orderAddr1").value = addr;
                // 커서를 상세주소 필드로 이동한다.
                document.getElementById("orderAddr2").focus();
            }
        }).open();
    }
</script>

<!-- 주문/결제 처리 -->
<script>
	const urlParams = new URLSearchParams(window.location.search);
	
	const cartId = urlParams.get("cartId");
	const orderNumber = urlParams.get("orderNum");
	const guestId = localStorage.getItem('guestId');
	
	const clientKey = "test_ck_Ba5PzR0ArnwNxkAOwR0X8vmYnNeD";
	const customerKey = "ewvVxcVTXJDPvruNASP_I";
	const tossPayments = TossPayments(clientKey);

	const payment = tossPayments.payment({ customerKey });
	// 비회원 결제
	// const payment = tossPayments.payment({customerKey: TossPayments.ANONYMOUS})
	
	
	
	// ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
	async function requestPayment(payType) {
		const phoneNumber = $("#phoneNumber").val();
		// 정규식: 010으로 시작, 숫자만, 10자 또는 11자
		var phoneRegex = /^010\d{7,8}$/;

		if(!phoneRegex.test(phoneNumber)) {
		    alert("올바른 휴대폰 번호를 입력해주세요. (예: 01012345678)");
		    $("#phoneNumber").focus();
		    return;
		}
		
        // 배송 정보 확인
        const receiverName = $("#receiver").val();
        const addr1 = $("#orderAddr1").val();
        
        if (!receiverName || !phoneNumber || !addr1 ) {
            alert('배송 정보를 모두 입력해주세요.');
            return;
        }
        
		// 필수 동의 항목 확인
        const requiredAgreements = document.querySelectorAll('input[required]');
        let allAgreed = true;
        
        requiredAgreements.forEach(checkbox => {
            if (!checkbox.checked) {
                allAgreed = false;
            }
        });
        
        if (!allAgreed) {
            alert('필수 이용약관에 동의해주세요.');
            return;
        }
        
		// 서버에 저장할 데이터
		var shippingComment = ''
			   if($("#shippingComment").val() == "direct_input"){
				 shippingComment = $("#directMessage").val();
			   } else {
				 shippingComment = $("#shippingComment").val();
			   }
			   
	    var items = getItems();
	    
	    var userName = $("#orderName").val();
	    var finalAmount = $("#finalPrice").data('value');
	    
	    if(sessionStorage.getItem("tempId") != null){
	    	var tempId = sessionStorage.getItem("tempId");
	    }
			   
	    var orderData = {
			items: items,
			order: {
				orderNumber: orderNumber
				, phoneNumber: phoneNumber
				, totalAmount: Number ( $("#itemTotalPrice").data('value') ) + Number ( $("#shipFee").data('value') )
				, shippingCost: $("#shipFee").data('value')
				, discountAmount: Number( $("#gradeSale").data('value') ) + Number( $("#couponSale").data('value') ) + Number( $("#pointSale").data('value') )
				, finalAmount: finalAmount
				, receiver: $("#receiver").val()
				, shippingPost: $("#orderPost").val()
				, shippingAddr1: $("#orderAddr1").val()
				, shippingAddr2: $("#orderAddr2").val()
				, userName: userName
				, guestId: guestId
				, shippingComment: shippingComment
				, couponId: $('input[name="selectedCoupon"]:checked').val() || null
				, couponDiscount: Number( $("#couponSale").data('value') )
				, usedPoint: Number( $("#pointSale").data('value') )
				, tempId: tempId
			}
		}
		
	  // 세션에 데이터 임시저장
	  sessionStorage.setItem("orderData", JSON.stringify(orderData));
	  
	  // 선택된 결제 방식 확인
	  selectedRadio = document.querySelector('input[name="payment"]:checked');

	  if (selectedRadio) {
	      var selectedPayment = selectedRadio.value;
	      console.log('선택된 결제 방식:', selectedPayment);
	  } else {
	      console.log('선택된 결제 방식이 없습니다.');
	  }
	  
	  if(selectedPayment == "card"){
		  // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
		  // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
		  await payment.requestPayment({
	          method: "CARD", // 카드 결제
	          amount: {
	            currency: "KRW",
	            value: finalAmount,
	          },
	          orderId: orderNumber, // 고유 주문번호
	          orderName: "DOO.D",
	          successUrl: window.location.origin + "/paySuccess.do", // 결제 요청이 성공하면 리다이렉트되는 URL
	          failUrl: window.location.origin + "/fail.do", // 결제 요청이 실패하면 리다이렉트되는 URL
	          customerEmail: "",
	          customerName: userName,
	          customerMobilePhone: phoneNumber,
	          // 카드 결제에 필요한 정보
	          card: {
	            useEscrow: false,
	            flowMode: "DEFAULT", // 통합결제창 여는 옵션
	            useCardPoint: false,
	            useAppCardOnly: false,
	          },
	        });
		
	  } else if (selectedPayment == "account"){
	        await payment.requestPayment({
	            method: "TRANSFER", // 계좌이체 결제
	            amount: {
	              currency: "KRW",
	              value: finalAmount,
	            },
	            orderId: orderNumber, // 고유 주문번호
	            orderName: "DOO.D",
	            successUrl: window.location.origin + "/paySuccess.do", // 결제 요청이 성공하면 리다이렉트되는 URL
	            failUrl: window.location.origin + "/fail.do", // 결제 요청이 실패하면 리다이렉트되는 URL
	            customerEmail: "",
	            customerName: userName,
	            customerMobilePhone: phoneNumber,
	            // 계좌이체 결제에 필요한 정보
	            transfer: {
	              cashReceipt: {
	                type: "소득공제",
	              },
	              useEscrow: false,
	            },
	          });
	  } else if (selectedPayment == "bank"){
	        await payment.requestPayment({
	            method: "VIRTUAL_ACCOUNT", // 가상계좌 결제
	            amount: {
	              currency: "KRW",
	              value: finalAmount,
	            },
	            orderId: orderNumber, // 고유 주문번호
	            orderName: "DOO.D",
	            successUrl: window.location.origin + "/paySuccess.do", // 결제 요청이 성공하면 리다이렉트되는 URL
	            failUrl: window.location.origin + "/fail.do", // 결제 요청이 실패하면 리다이렉트되는 URL
	            customerEmail: "",
	            customerName: userName,
	            customerMobilePhone: phoneNumber, // 가상계좌 안내 보내는 번호
	            // 가상계좌 결제에 필요한 정보
	            virtualAccount: {
	              cashReceipt: {
	                type: "소득공제",
	              },
	              useEscrow: false,
	              validHours: 1,
	            },
	          });
	    } else {
	    	alert("결제 방식을 선택해주세요.");
	    }
	}
	
 	// 상품 데이터 가져오기
    function getItems(){
 	   var itemElements = document.getElementsByClassName("itemInfoData");
 	   var items = [];
 	   
 	   for (var i=0; i < itemElements.length; i++){
 		   var element = itemElements[i];
 		   var item = {
 				   cartItemId: parseInt(element.getAttribute('data-cart-item-id')),
 				   productId: parseInt(element.getAttribute('data-product-id')),
 				   productName: element.getAttribute('data-product-name'),
 				   productOption: element.getAttribute('data-product-option'),
 				   price: parseInt(element.getAttribute('data-price')),
 				   quantity: parseInt(element.getAttribute('data-quantity')),
 				   subTotal: parseInt(element.getAttribute('data-sub-total')),
 				   costPrice: parseInt(element.getAttribute('data-cost-price'))
 		   };
 		   
 		   items.push(item);
 	   }
 	   
 	   return items;
    }

   
 </script>


<style>
    /* Modal 전체 부모 컨테이너 */
    .modal-overlay {
      position: fixed; /* 화면 전체를 덮기 위해 fixed */
      top: 0;
      left: 0;
      width: 100vw; /* 화면 너비 전체 */
      height: 100vh; /* 화면 높이 전체 */
      background-color: rgba(0, 0, 0, 0.5); /* 반투명 검정 */
      display: flex; /* 중앙 정렬을 위해 flex 사용 */
      justify-content: center; /* 가로 중앙 */
      align-items: center; /* 세로 중앙 */
      z-index: 1000; /* 다른 요소 위에 표시 */
      visibility: hidden; /* 기본은 숨김 상태 */
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    /* Modal 활성화 상태 */
    .modal-overlay.active {
      visibility: visible;
      opacity: 1;
    }

    .modal-content {
      background: #fff;
      padding: 30px 40px; /* 안쪽 여백 늘림 */
      border-radius: 10px;
      width: 600px; /* 모달 너비 넓힘 */
      max-width: 80%; /* 화면 작은 경우 반응형 */
      min-height: 300px; /* 세로 공간도 확보 */
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); /* 살짝 그림자 */
      text-align: center;
    }
  </style>
  
  <!-- 쿠폰모달 -->
  <style>
  	/* 쿠폰 선택하기 버튼 */
	.btn-coupon {
	    width: 100%;
	    padding: 14px 20px;
	    background: #ffffff;
	    border: 2px solid #DC0630;
	    color: #DC0630;
	    font-size: 15px;
	    font-weight: 600;
	    border-radius: 6px;
	    cursor: pointer;
	    transition: all 0.3s ease;
	    letter-spacing: -0.3px;
	}
	
	.btn-coupon:hover {
	    background: #DC0630;
	    color: #ffffff;
	    transform: translateY(-1px);
	    box-shadow: 0 4px 12px rgba(220, 6, 48, 0.2);
	}
	
	.btn-coupon:active {
	    transform: translateY(0);
	}
  	.modal {
	    display: none;
	    position: fixed;
	    z-index: 1000;
	    left: 0;
	    top: 0;
	    width: 100%;
	    height: 100%;
	    background-color: rgba(0, 0, 0, 0.4);
	}
	
	.modal-content {
	    position: relative;
	    background-color: #ffffff;
	    margin: 5% auto;
	    width: 90%;
	    max-width: 600px;
	    border-radius: 12px;
	    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
	    max-height: 80vh;
	    display: flex;
	    flex-direction: column;
	    overflow: hidden;
	}
	
	.modal-header {
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	    padding: 24px 28px;
	    background: #ffffff;
	    border-bottom: 2px solid #f5f5f5;
	}
	
	.modal-header h2 {
	    margin: 0;
	    font-size: 22px;
	    font-weight: 700;
	    color: #333;
	    letter-spacing: -0.5px;
	}
	
	.modal-close {
	    font-size: 28px;
	    font-weight: 300;
	    color: #999;
	    cursor: pointer;
	    transition: all 0.2s ease;
	    width: 32px;
	    height: 32px;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	    border-radius: 50%;
	}
	
	.modal-close:hover {
	    color: #DC0630;
    	background: #fff0f2;
	}
	
	.modal-body {
	    padding: 24px 28px;
	    overflow-y: auto;
	    flex: 1;
	    background: #fafafa;
	}
	
	.modal-footer {
	    display: flex;
	    justify-content: flex-end;
	    gap: 12px;
	    padding: 20px 28px;
	    background: #ffffff;
	    border-top: 2px solid #f5f5f5;
	}
	
	.btn-cancel, .btn-confirm {
	    padding: 12px 28px;
	    border: none;
	    border-radius: 6px;
	    cursor: pointer;
	    font-size: 15px;
	    font-weight: 600;
	    transition: all 0.3s ease;
	    letter-spacing: -0.3px;
	}
	
	.btn-cancel {
	    background: #f5f5f5;
	    color: #666;
	    border: 1px solid #e0e0e0;
	}
	
	.btn-cancel:hover {
	    background: #ebebeb;
	    color: #333;
	}
	
	.btn-confirm {
	  	background: #DC0630;
	    color: #ffffff;
	    min-width: 100px;
	    box-shadow: 0 2px 8px rgba(220, 6, 48, 0.2);
	}
	
	.btn-confirm:hover {
	    background: #b8051f;
	    box-shadow: 0 4px 12px rgba(220, 6, 48, 0.3);
	}
	
	.btn-confirm:active {
	    transform: translateY(0);
	}
	
	/* 쿠폰 아이템 */
	.coupon-item {
	    background: #ffffff;
	    border: 2px solid #e8e8e8;
	    border-radius: 10px;
	    padding: 20px;
	    margin-bottom: 12px;
	    cursor: pointer;
	    transition: all 0.3s ease;
	    position: relative;
	}
	
	.coupon-item:hover:not(.disabled) {
	    border-color: #DC0630;
	    box-shadow: 0 4px 16px rgba(220, 6, 48, 0.12);
	    transform: translateY(-2px);
	}
	
	.coupon-item.disabled {
	    opacity: 0.5;
	    cursor: not-allowed;
	    background: #f9f9f9;
	}
	
	.coupon-item.selected {
	    border-color: #DC0630;
	    background: #fff5f7;
	    box-shadow: 0 4px 16px rgba(220, 6, 48, 0.15);
	}
	
	
	
	.coupon-content {
	    display: flex;
	    justify-content: space-between;
	    align-items: flex-start;
	    gap: 16px;
	}
	
	.coupon-left {
	    flex: 1;
	    text-align: left;
	}
	
	.coupon-name {
		text-align: left;
	    font-size: 16px;
	    font-weight: 700;
	    color: #333;
	    margin-bottom: 6px;
	    letter-spacing: -0.3px;
	}
	
	.coupon-code {
	    font-size: 13px;
	    color: #999;
	    margin-bottom: 12px;
	    font-family: monospace;
	}
	
	.coupon-conditions {
	    display: flex;
	    flex-direction: column;
	    gap: 4px;
	}
	
	.condition-item {
	    font-size: 13px;
	    color: #666;
	    display: flex;
	    align-items: center;
	    gap: 4px;
	}
	
	.condition-item.usable {
	    color: #DC0630;
	    font-weight: 500;
	}
	
	.condition-item.unusable {
	    color: #999;
	}
	
	.coupon-right {
	    text-align: right;
	    min-width: 100px;
	}
	
	.discount-amount,
	.discount-rate {
	    font-size: 24px;
	    font-weight: 800;
	    color: #DC0630;
	    margin-bottom: 4px;
	    letter-spacing: -0.5px;
	}
	
	.expiry-date {
	    font-size: 12px;
	    color: #999;
	}
	
	.radio-custom {
	    display: none;
	}
	
	.no-coupon {
	    text-align: center;
	    padding: 60px 20px;
	    color: #999;
	    font-size: 15px;
	    background: #ffffff;
	    border-radius: 10px;
	}
  </style>
</head>
<body>
	<jsp:include page="../layout/header.jsp" />
	<div class="breadcrumb">
			<div class="container">
					<div class="breadcrumb-content">
							<a href="#">홈</a> > 
							<a href="#">장바구니</a> > 
							<span class="breadcrumb-current">주문/결제</span>
					</div>
			</div>
	</div>
	
	<!-- 쿠폰 모달 -->
<div id="couponModal" class="modal" style="display:none;">
		<div class="modal-content">
				<div class="modal-header">
						<h2>쿠폰 선택</h2>
						<span class="modal-close" onclick="closeCouponModal()">&times;</span>
				</div>
				<div class="modal-body">
						<div id="couponList"></div>
				</div>
				<div class="modal-footer">
						<button class="btn-cancel" onclick="closeCouponModal()">취소</button>
						<button class="btn-confirm" onclick="applyCoupon()">적용</button>
				</div>
		</div>
</div>

	<!-- Main Content -->
	<main class="main-content">
			<div class="container">
					<h1>[ O R D E R ]</h1>
					<p class="page-subtitle">주문 정보를 확인하고 결제를 진행해주세요</p>

					<div class="order-layout">
							<!-- Order Main Content -->
							<div class="order-main">
									<!-- Order Items -->
									<div class="section">
											<h2 class="section-title">주문상품 (${itemCnt.ITEM_CNT})</h2>
											
											<div class="order-item" style="flex-direction: column;">
													<c:forEach var="item" items="${itemsInfo}">
														<input type="hidden" class="itemInfoData" data-cart-item-id="${item.CART_ITEM_ID}" data-product-id="${item.PRODUCT_ID}" data-product-name="${item.PRODUCT_NAME}" data-product-option="${item.PRODUCT_OPTION}" data-quantity="${item.QUANTITY}" data-price="${item.PRICE}" data-sub-total="${item.SUB_TOTAL}" data-cost-price="${item.COST_PRICE}"> 
														<div style="display: flex;">
															<div class="item-image">
																	<img src="https://contents.kyobobook.co.kr/sih/fit-in/400x0/gift/pdt/1463/S1726816418034.jpg" alt="왕연필">
															</div>
															<div class="item-info">
																	<div class="item-name">${item.PRODUCT_NAME}</div>
																	<div class="item-options">${item.PRODUCT_OPTION}</div>
															</div>
														</div>
															<div class="item-price-info">
																	<span class="item-quantity">수량: ${item.QUANTITY}개</span>
																	<span class="item-price" data-value="${item.SUB_TOTAL}">
										<fmt:formatNumber value="${item.SUB_TOTAL}" pattern="#,###"/>원
								</span>
														</div>
													</c:forEach>
											</div>
									</div>

									<!-- Shipping Information -->
									<div class="section">
											<h2 class="section-title">배송정보</h2>
											
											<div class="form-group">
													<label class="form-label">주문자 <span class="required">*</span></label>
													<input type="text" class="form-input" id="orderName" placeholder="주문자 성함을 입력하세요" value="비회원" readonly>
											</div>
											
											<div class="form-group">
													<label class="form-label">받는 분 <span class="required">*</span></label>
													<input type="text" class="form-input" id="receiver" placeholder="받는 분 성함을 입력하세요">
											</div>

											<div class="form-row">
													<div class="form-group">
															<label class="form-label">휴대폰 번호 <span class="required">*</span></label>
															<input type="tel" class="form-input" id="phoneNumber" placeholder="휴대폰 번호를 입력해주세요" maxlength="11">
													</div>
													<div class="form-group">
															<label class="form-label">일반전화</label>
															<input type="tel" class="form-input" placeholder="02-123-4567" maxlength="12">
													</div>
											</div>

											<div class="form-group">
													<label class="form-label">주소 <span class="required">*</span></label>
													<div class="address-search">
															<input type="text" class="form-input" id="orderPost" placeholder="우편번호" readonly>
															<button class="btn-address" onclick="searchAddress()">주소찾기</button>
													</div>
													<input type="text" class="form-input" id="orderAddr1" placeholder="기본주소" readonly style="margin-top: 10px;">
													<input type="text" class="form-input" id="orderAddr2" placeholder="상세주소를 입력하세요" style="margin-top: 10px;">
											</div>

											<div class="form-group">
													<label class="form-label">배송 요청사항</label>
													<select class="form-select" id="shippingComment">
															<option value="" disabled >배송 요청사항을 선택하세요</option>
															<option value="문앞에 놓아주세요">문앞에 놓아주세요</option>
															<option value="경비실에 맡겨주세요">경비실에 맡겨주세요</option>
															<option value="배송 전 연락주세요">배송 전 연락주세요</option>
															<option value="안전한 곳에 놓아주세요">안전한 곳에 놓아주세요</option>
															<option value="direct_input">직접입력</option>
													</select>
											</div>
									</div>

									<!-- Payment Method -->
									<div class="section">
											<div class="payment-methods">
													<div class="payment-option">
															<input type="radio" id="card" name="payment" value="card" checked>
															<label for="card" class="payment-label">신용카드/간편결제</label>
													</div>
													<div class="payment-option">
															<input type="radio" id="virtual" name="payment" value="account">
															<label for="virtual" class="payment-label">계좌이체</label>
													</div>
													<div class="payment-option">
															<input type="radio" id="bank" name="payment" value="bank">
															<label for="bank" class="payment-label">무통장입금</label>
													</div>
											</div>
									</div>

									<!-- Terms Agreement -->
									<div class="section">
											<h2 class="section-title">이용약관 동의</h2>
											
											<div class="checkbox-group">
													<div class="checkbox-item">
															<input type="checkbox" id="agree-all" onchange="toggleAllAgreements()">
															<label for="agree-all" class="checkbox-label">전체 동의</label>
													</div>
													<hr style="margin: 15px 0; border: none; border-top: 1px solid #eee;">
													<div class="checkbox-item">
															<input type="checkbox" id="agree-terms" class="individual-agree" required>
															<label for="agree-terms" class="checkbox-label">구매조건 확인 및 결제진행에 동의 <span class="required">(필수)</span></label>
													</div>
													<div class="checkbox-item">
															<input type="checkbox" id="agree-privacy" class="individual-agree" required>
															<label for="agree-privacy" class="checkbox-label">개인정보 수집 및 이용에 동의 <span class="required">(필수)</span></label>
													</div>
													<div class="checkbox-item">
															<input type="checkbox" id="agree-provide" class="individual-agree" required>
															<label for="agree-provide" class="checkbox-label">개인정보 제3자 제공에 동의 <span class="required">(필수)</span></label>
													</div>
													<div class="checkbox-item">
															<input type="checkbox" id="agree-marketing" class="individual-agree">
															<label for="agree-marketing" class="checkbox-label">마케팅 정보 수신에 동의 (선택)</label>
													</div>
											</div>
									</div>
							</div>

							<!-- Order Sidebar -->
							<div class="order-sidebar">
									<div class="order-summary">
											<h3 class="summary-title">결제정보</h3>
											
											<!-- Coupon Section -->
											<c:if test="${userInfo != null}">
												<div class="coupon-section">
														<div class="coupon-input">
															<div id="couponList">
													<!-- 쿠폰 아이템들이 여기에 생성됩니다 -->
											</div>
																<!-- <input type="text" class="form-input" placeholder="쿠폰 번호 입력"> -->
																<button class="btn-coupon" onclick="openCouponModal()">쿠폰 선택하기</button>
														</div>
												</div>
											

												<!-- Points Section -->
												<div class="points-section">
														<label class="form-label">포인트 사용</label>
														<div class="points-info">
																<span>보유 포인트</span>
																<span id="hasPoint" data-value=0>0P</span>
														</div>
														<div class="points-input">
																<input type="number" class="form-input" id="usePoint" placeholder="사용할 포인트" min="0" onchange="usePointChage()">
																<button class="btn-points" onclick="applyPoints()">전액사용</button>
														</div>
												</div>
											</c:if>

											<div class="summary-row">
													<span class="summary-label">상품금액</span>
													<span class="summary-value" id="itemTotalPrice" data-value="0"></span>
											</div>
											<div class="summary-row">
													<span class="summary-label">배송비</span>
													<span class="summary-value" id="shipFee" data-value=3000>3,000원</span>
											</div>
											<div class="summary-row">
													<span class="summary-label">회원등급할인</span>
													<span class="summary-value" id="gradeSale" data-value=0 style="color: #DC0630;">- 0원</span>
											</div>
											<div class="summary-row">
													<span class="summary-label">쿠폰할인</span>
													<span class="summary-value" id="couponSale" data-value=0 style="color: #DC0630;">- 0원</span>
											</div>
											<div class="summary-row">
													<span class="summary-label">포인트사용</span>
													<span class="summary-value" id="pointSale" data-value=0 style="color: #DC0630;">- 0P</span>
											</div>
											<div class="summary-row">
													<span class="summary-label">최종결제금액</span>
													<span class="summary-value" id="finalPrice" style="font-size: 20px;"></span></span>
											</div>
											
						<button class="payButton" style="margin-top: 30px" onclick="requestPayment()">결제하기</button>
						
											<div class="btn-actions">
													<button class="btn btn-outline" style="flex: 1;" onclick="goBack()">이전단계</button>
											</div>
									</div>
							</div>
					</div>
			</div>
	</main>

	<!-- Success Message -->
	<div id="successMessage" class="success-message">
			결제가 완료되었습니다!
	</div>

	<script> 
    window.addEventListener('unload', function() {
			if(sessionStorage.getItem("tempId") != null){
        sessionStorage.removeItem("tempId");
			}
    });
  </script>

	<script>
			// 전체 동의 체크박스
			function toggleAllAgreements() {
				const allAgree = document.getElementById('agree-all');
				const individualAgrees = document.querySelectorAll('.individual-agree');
				
				individualAgrees.forEach(checkbox => {
						checkbox.checked = allAgree.checked;
				});
			}

			// 개별 동의 체크박스 변경 시 전체 동의 상태 업데이트
			document.querySelectorAll('.individual-agree').forEach(checkbox => {
				checkbox.addEventListener('change', function() {
						const allAgree = document.getElementById('agree-all');
						const individualAgrees = document.querySelectorAll('.individual-agree');
						const allChecked = Array.from(individualAgrees).every(cb => cb.checked);
						allAgree.checked = allChecked;
				});
			});

			// 주소 찾기
			function searchAddress() {
				daumPostcode();
			}

			// 쿠폰 적용
			function applyCoupon() {
			var selectedCoupon = $('input[name="selectedCoupon"]:checked').val();
			if(selectedCoupon) {
					// 선택된 쿠폰 아이템에서 data 속성으로 정보 가져오기
					var discountType = $('input[name="selectedCoupon"]:checked').data('discount-type');
					var discountValue = $('input[name="selectedCoupon"]:checked').data('discount-value');
					
					// 할인 정보 표시 문자열 생성
					var discountInfo = '';
					var applyDiscount = 0;
					if(discountType != "R") {
							discountInfo = Number(discountValue).toLocaleString() + '원 할인';
							applyDiscount = discountValue;
					} else {
							discountInfo = discountValue + '% 할인';
							applyDiscount = ${itemCnt.TOTAL_PRICE} * ( discountValue / 100 );
					}
					
					alert('쿠폰이 적용되었습니다');
					
					closeCouponModal();
					
					var roundedDiscount = Math.round(applyDiscount);
					
					$("#couponSale").text('- '+ roundedDiscount.toLocaleString() + '원');
					$("#couponSale").data('value', roundedDiscount); //TOD
					
					updateFinalAmount();
					
			} else {
					alert('쿠폰을 선택해주세요.');
			}
	}

			// 포인트 전액 사용
			function applyPoints() {
				var hasPoint = $("#hasPoint").data('value');
				
					const pointsInput = document.querySelector('.points-input input');
					pointsInput.value = hasPoint;
					applyPointsDiscount(hasPoint);
			
					showSuccessMessage('포인트 '+ hasPoint +'P가 적용되었습니다!');
					
					updateFinalAmount();
			}
			
		function usePointChage() {
			var	usePoint = $("#usePoint").val();
			
			applyPointsDiscount(usePoint);
			
			showSuccessMessage('포인트 '+ usePoint +'P가 적용되었습니다!');
			
			updateFinalAmount();
		}

			// 쿠폰 할인 적용
			function applyCouponDiscount(amount) {
				$("#couponSale").text('- ' + amount.toLocaleString() + '원');
				$("#couponSale").data('value', amount);
					
					updateFinalAmount();
			}

			// 포인트 할인 적용
			function applyPointsDiscount(amount) {
					$("#pointSale").text('- ' + amount.toLocaleString() + 'P');
					$("#pointSale").data('value', amount);
					
					updateFinalAmount();
			}

			// 최종 금액 업데이트
			function updateFinalAmount() {
					const productAmount = ${itemCnt.TOTAL_PRICE};
					const shippingFee = $("#shipFee").data('value');
					
					var gradeDiscount = $("#gradeSale").data('value');
					var couponDiscount = $("#couponSale").data('value');
					var pointsDiscount = $("#pointSale").data('value');
					
					var finalAmount = productAmount + shippingFee - gradeDiscount - couponDiscount - pointsDiscount;
					if(finalAmount < 0){
						finalAmount = 0;
					}
					$("#finalPrice").data('value', finalAmount);
					
					$("#finalPrice").text('₩ '+ finalAmount.toLocaleString() + '원');
					
					/* const paymentBtn = document.querySelector('.btn-primary.btn-full');
					paymentBtn.textContent = `₩${finalAmount.toLocaleString()} 결제하기; */
			}

			// 결제 처리
			function processPayment() {
					


			// 로딩 상태
			const paymentBtn = document.querySelector('.btn-primary.btn-full');
			const originalText = paymentBtn.textContent;
			paymentBtn.classList.add('loading');
			paymentBtn.disabled = true;

			// 결제 처리 시뮬레이션
			setTimeout(() => {
					// 실제 구현 시 결제 API 호출
					// 예: PG사 결제 모듈 연동 (아임포트, 토스페이먼츠 등)
					
					paymentBtn.classList.remove('loading');
					paymentBtn.disabled = false;
					paymentBtn.textContent = originalText;
					
					// 성공 시 주문 완료 페이지로 이동
					showSuccessMessage('결제가 완료되었습니다!');
					
					setTimeout(() => {
							// 주문 완료 페이지로 리다이렉트
							// window.location.href = '/order/complete?orderNo=ORDER20241209001';
							alert('주문이 완료되었습니다. 주문번호: ORDER20241209001');
					}, 2000);
				}, 2000);	
			}

			// 이전 단계로
			function goBack() {
					if (confirm('이전 단계로 돌아가시겠습니까? 입력한 정보가 저장되지 않을 수 있습니다.')) {
							window.history.back();
							// 또는 특정 URL로 리다이렉트
							// window.location.href = '/cart';
					}
			}

			// 성공 메시지 표시
			function showSuccessMessage(message) {
					const msgElement = document.getElementById('successMessage');
					msgElement.textContent = message;
					msgElement.classList.add('show');
					
					setTimeout(() => {
							msgElement.classList.remove('show');
					}, 3000);
			}

			// 배송 요청사항 직접입력 처리
			document.querySelector('select.form-select').addEventListener('change', function() {
					if (this.value === 'direct_input') {
							const customInput = document.createElement('input');
							customInput.type = 'text';
							customInput.className = 'form-input';
							customInput.id = "directMessage";
							customInput.placeholder = '배송 요청사항을 직접 입력하세요';
							customInput.style.marginTop = '10px';
							
							// 기존 직접입력 필드가 있으면 제거
							const existing = this.parentNode.querySelector('input[placeholder*="직접 입력"]');
							if (existing) {
									existing.remove();
							}
							
							this.parentNode.appendChild(customInput);
					} else {
							// 직접입력 필드 제거
							const existing = this.parentNode.querySelector('input[placeholder*="직접 입력"]');
							if (existing) {
									existing.remove();
							}
					}
			});

			// 페이지 로드 시 초기화
			document.addEventListener('DOMContentLoaded', function() {
					// 초기 상태 설정
					updateFinalAmount();
					
					// 폼 유효성 검사를 위한 실시간 확인
					const requiredInputs = document.querySelectorAll('input[required], select[required]');
					requiredInputs.forEach(input => {
							input.addEventListener('blur', function() {
									if (!this.value.trim()) {
											this.style.borderColor = '#DC0630';
									} else {
											this.style.borderColor = '#ddd';
									}
							});
					});
			});

			// 포인트 입력 시 보유 포인트 초과 방지
			document.querySelector('.points-input input').addEventListener('input', function() {
					const maxPoints = $("#hasPoint").data('value');
					const value = parseInt(this.value) || 0;
					
					if (value > maxPoints) {
							this.value = maxPoints;
							alert('보유 적립금을 초과할 수 없습니다.');
					}
			});
	</script>
	
	<script>
	var itemToTalPrice = ${itemCnt.TOTAL_PRICE};
	$("#itemTotalPrice").text(itemToTalPrice.toLocaleString() + '원');
	$("#itemTotalPrice").data('value', itemToTalPrice);
	</script>

<!-- 회원 정보 조회 -->
<c:if test="${userInfo != null}"> 
	<script>
		$(function(){
			var itemToTalPrice = ${itemCnt.TOTAL_PRICE};
			$("#itemTotalPrice").text(itemToTalPrice.toLocaleString() + '원');
			$("#itemTotalPrice").data('value', itemToTalPrice);
			
			memberInfo();
			
		});
		
		function memberInfo(){
			$.ajax({
				url: "/orderMemberData.do"
				, type: "post"
				, data: {}
				, dataType: "json"
				, success: function(res){
					console.log(res.resultInfo);
					
					var result = res.resultInfo;
					
					$("#orderName").val(result.USER_NAME);
					$("#receiver").val(result.USER_NAME);
					$("#phoneNumber").val(result.PHONE_NUMBER);
					$("#hasPoint").text(result.totalPoint.toLocaleString() + 'P');
					$("#hasPoint").data('value', result.totalPoint);
					$("#usePoint").html('<input type="number" class="form-input" id="usePoint" placeholder="사용할 포인트" min="0" max="'+ result.totalPoint +'">')
					
					var gradeSale = ${itemCnt.TOTAL_PRICE} * ( result.DISCOUNT_RATE / 100 );
					var orderTotalPrice = ${itemCnt.TOTAL_PRICE} + 3000 - gradeSale;
					$("#gradeSale").text('- ' + gradeSale.toLocaleString() + '원');	
					$("#gradeSale").data('value', gradeSale);
					$("#finalPrice").text('₩ ' + orderTotalPrice.toLocaleString() + '원');
					$("#finalPrice").data('value', orderTotalPrice);
					
					var couponList = result.coupons;
					var couponsHtml = '';
					
					for(var i = 0; i < couponList.length; i++) {
							var isUsable = orderTotalPrice >= couponList[i].MIN_ORDER_PRICE;
							var disabledClass = isUsable ? '' : ' disabled';
							var disabledAttr = isUsable ? '' : ' disabled';
							
							couponsHtml += '<div class="coupon-item' + disabledClass + '" data-coupon-id="' + couponList[i].COUPON_ID + '"';
							couponsHtml += ' data-usable="' + isUsable + '">';
							couponsHtml += '    <div class="coupon-content">';
							couponsHtml += '        <div class="coupon-left">';
							couponsHtml += '            <div class="coupon-name">' + couponList[i].COUPON_NAME + '</div>';
							couponsHtml += '            <div class="coupon-code">' + couponList[i].COUPON_CODE + '</div>';
							couponsHtml += '            <div class="coupon-conditions">';
							
							if(isUsable) {
									couponsHtml += '                <div class="condition-item usable">✓ ' + Number(couponList[i].MIN_ORDER_PRICE).toLocaleString() + '원 이상 주문시</div>';
							} else {
									couponsHtml += '                <div class="condition-item unusable">✗ ' + Number(couponList[i].MIN_ORDER_PRICE).toLocaleString() + '원 이상 주문시 (현재: ' + orderTotalPrice.toLocaleString() + '원)</div>';
							}
							
							couponsHtml += '                <div class="condition-item">✓ ' + couponList[i].EXPIRY_DT + ' 까지</div>';
							couponsHtml += '            </div>';
							couponsHtml += '        </div>';
							couponsHtml += '        <div class="coupon-right">';
							
							if(couponList[i].DISCOUNT_TYPE != "R") {
									couponsHtml += '            <div class="discount-amount">' + Number(couponList[i].DISCOUNT_VALUE).toLocaleString() + '원</div>';
							} else {
									couponsHtml += '            <div class="discount-rate">' + couponList[i].DISCOUNT_VALUE + '%</div>';
							}
							
							couponsHtml += '            <div class="expiry-date">~' + couponList[i].EXPIRY_DT + '</div>';
							couponsHtml += '        </div>';
							couponsHtml += '    </div>';
							couponsHtml += '    <div class="radio-custom">';
							couponsHtml += '        <input type="radio" name="selectedCoupon" value="' + couponList[i].COUPON_ID + '"';
							couponsHtml += '               data-discount-type="' + couponList[i].DISCOUNT_TYPE + '"';
							couponsHtml += '               data-discount-value="' + couponList[i].DISCOUNT_VALUE + '"';
							couponsHtml += '               ' + disabledAttr + '>';
							couponsHtml += '    </div>';
							couponsHtml += '</div>';
					}
					
					if(couponList.length === 0) {
							couponsHtml = '<div class="no-coupon">사용 가능한 쿠폰이 없습니다.</div>';
					}
					
					$("#couponList").html(couponsHtml);
					
					// 쿠폰 아이템 클릭 이벤트
					$(".coupon-item:not(.disabled)").on("click", function() {
							$(".coupon-item").removeClass("selected");
							$(this).addClass("selected");
							$(this).find("input[type='radio']").prop("checked", true);
					});

				}
				, error: function(){}
			});
		}
	</script>
</c:if>
<jsp:include page="../layout/footer.jsp" />
</body>
</html>