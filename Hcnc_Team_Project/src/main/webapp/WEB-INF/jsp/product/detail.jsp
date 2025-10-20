<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>상품 상세페이지</title>
	<jsp:include page="../layout/headertop.jsp" />
	
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/egovframework/global.css'/>"/>
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/egovframework/layout.css'/>"/>
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/egovframework/common.css'/>"/>
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/egovframework/reset.css'/>"/>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
	
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/productKEY/productDetail.css'/>"/>
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/productKEY/productTabNav.css'/>"/>
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/productKEY/productQnAModal.css'/>"/>

	<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
	<script type="text/javascript" src="<c:url value='/js/productKEY/productTabNav.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/productKEY/productInfo.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/productKEY/productPageLoad.js'/>"></script>
	
<%-- 	<c:if test="${userInfo != null}">
		<script>
			$(document).ready(function(){
				$("#add-to-wish").show();
			});
		</script>
	</c:if> --%>
	
	<!-- 상품 옵션 처리 스크립트 -->
	<c:if test="${not empty productDetail || not empty optionInfo}">
		<script>	
			var productDetail = ${productDetailJson};
			var optionInfo = ${optionInfoJson};
			var productName = productDetail[0].PRODUCT_NAME;
			var productPrice = productDetail[0].PRODUCT_PRICE;
			if(productDetail[0].imgs.length > 0){
				var productImgPath = productDetail[0].imgs[0].IMAGE_URL;
			}
			var basePrice = productDetail[0].SAILED_PRICE ? productDetail[0].SAILED_PRICE : productDetail[0].PRODUCT_PRICE;
			var selectedOptions = {};

			$(document).ready(function() {
				if(typeof productId !== 'undefined' && productId) {
					addRecentProduct(productId, productName, productImgPath, productPrice);
				}

				var options = [];
				for (var i = 0; i < optionInfo.length; i++) {
					var optionName = optionInfo[i].OPTION_NAME;
					var duplicate = false;
					for (var j = 0; j < options.length; j++) {
						if (options[j] == optionName) {
							duplicate = true;
							break;
						}
					}
					if (!duplicate) {
						options.push(optionName);
					}
				}

				var optionContainer = '';
				for(var i = 0; i < options.length; i++){
					optionContainer += '<div class="option-group">';
					optionContainer += '<span class="option-label">' + options[i] + ': </span>';
					optionContainer += '<select class="option-select" id="'+ optionInfo[i].OPTION_ID +'_select" data-option-name="' + options[i] + '" onchange="optionSelect(this)">';
					optionContainer += '<option value="non-select">옵션을 선택해주세요.</option>';
					
					for(var j = 0; j < optionInfo.length; j++){
						if(options[i] == optionInfo[j].OPTION_NAME){
							var optionName = options[i];
							var optionValue = optionInfo[j].OPTION_VALUE;
							var additionalPrice = optionInfo[j].ADDITIONAL_PRICE;
							var displayText = optionValue;
							if(additionalPrice > 0){
								displayText += ' (+' + additionalPrice + '원)';
							}
							optionContainer += '<option value="['+ optionName +'] ' + optionValue + '" data-price="' + additionalPrice + '">';
							optionContainer += displayText + '</option>';
						}
					}
					optionContainer += '</select></div>';
				}
				$("#options-td").html(optionContainer);
			});

			const optionSelect = (element) => {
				var selectedOption = element.options[element.selectedIndex];
				var optionName = element.getAttribute('data-option-name');
				var optionPrice = parseInt(selectedOption.getAttribute('data-price')) || 0;
				if(selectedOption.value === 'non-select') {
					delete selectedOptions[optionName];
				} else {
					selectedOptions[optionName] = optionPrice;
				}
				var totalOptionPrice = 0;
				for(var key in selectedOptions) {
					totalOptionPrice += selectedOptions[key];
				}
				var salaryPrice = getSalaryPrice();
				var newPrice = salaryPrice + totalOptionPrice;
				$("#quantity").val(1);
				updateTotalPrice(newPrice);
				basePrice = newPrice;
			}

			function getSalaryPrice() {
				return parseInt(document.getElementById("saled-price").getAttribute('data-price')) || 0;
			}

			function updateTotalPrice(newPrice) {
				var element = document.getElementById("totalPrice");
				element.setAttribute('data-price', newPrice);
				element.innerText = newPrice.toLocaleString() + "원";
			}
			
		</script>
	</c:if>
</head>

<body>
  <jsp:include page="../layout/header.jsp" />
  
  <div class="page-wrapper">
    <div class="container" style="display: flex">
      <div class="main-content">
        <div class="inner">
          <div class="product-container">
            <div class="product-image-container">
              <c:if test="${not empty productDetail[0].imgs}">
                <img id="product-image" src="${productDetail[0].imgs[0].IMAGE_URL}" alt="${productDetail[0].imgs[0].ALT_TEXT}">
              </c:if>
              <c:if test="${empty productDetail[0].imgs}">
                <img id="product-image" src="https://placehold.co/400x400" alt="Product Image">
              </c:if>
            </div>
            <div class="product-info">
              <div class="product-details">
                <div class="product-title">
                  <h1 id="product-name">${productDetail[0].PRODUCT_NAME}</h1>
                </div>
                <table>
                  <tbody>
                    <tr><td>소비자가</td><td id="product-price"><fmt:formatNumber value="${productDetail[0].PRODUCT_PRICE}" pattern="#,###"/>원</td></tr>
                    <tr><td>판매가</td>
                      <c:choose>
                        <c:when test="${productDetail[0].SAILED_PRICE != null}">
                          <td id="saled-price" data-price="${productDetail[0].SAILED_PRICE}"><fmt:formatNumber value="${productDetail[0].SAILED_PRICE}" pattern="#,###"/>원</td>
                        </c:when>
                        <c:otherwise>
                          <td id="saled-price" data-price="${productDetail[0].PRODUCT_PRICE}"><fmt:formatNumber value="${productDetail[0].PRODUCT_PRICE}" pattern="#,###"/>원</td>
                        </c:otherwise>
                      </c:choose>
                    </tr>
                    <tr><td>상품코드</td><td id="product-code">${productDetail[0].PRODUCT_CODE}</td></tr>
                    <tr><td>상품설명</td><td id="product-description">${productDetail[0].PRODUCT_CONTENT}</td></tr>
                    <tr><td>무게</td><td id="product-weight">${productDetail[0].PRODUCT_WEIGHT}</td></tr>
                    <c:if test="${optionInfo[0] != null}">
                      <tr id="product-option"><td>옵션</td><td id="options-td"></td></tr>
                    </c:if>
                    <tr id="selected-option-display" style="display: none;"><td>선택된 옵션</td><td id="selectedCombination">옵션을 선택해주세요.</td></tr>
                    <tr><td>총 가격</td>
                      <c:choose>
                        <c:when test="${productDetail[0].SAILED_PRICE != null}">
                          <td id="totalPrice" class="total-price-amount" data-price="${productDetail[0].SAILED_PRICE}"><fmt:formatNumber value="${productDetail[0].SAILED_PRICE}" pattern="#,###"/>원</td>
                        </c:when>
                        <c:otherwise>
                          <td id="totalPrice" class="total-price-amount" data-price="${productDetail[0].PRODUCT_PRICE}"><fmt:formatNumber value="${productDetail[0].PRODUCT_PRICE}" pattern="#,###"/>원</td>
                        </c:otherwise>
                      </c:choose>
                    </tr>
                    <tr><td>수량</td><td>
                      <button onclick="countDown()">-</button>
                      <input type="number" name="quantity" id="quantity" value="1" min="1" max="999999" onchange="updateCnt()">
                      <button onclick="countUp()">+</button>
                    </td></tr>
                  </tbody>
                </table>
              </div>
              <div class="product-actions">
                <div class="button-container" id="product-btn-area">
                	<button id="add-to-wish" onclick="pushWish()" style="display:none;">위시리스트 담기</button>
                  <button id="add-to-cart" onclick="pushCart()">장바구니 담기</button>
                  <button id="buy-now" onclick="buyNow()">바로구매</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="inner">
          <div class="tab-navigation-section">
            <nav>
              <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab">상품상세정보</button>
                <button class="nav-link" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab">상품 리뷰<span id="productReviewCnt"></span></button>
                <button class="nav-link" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab">상품 Q&A<span id="productQnACnt"></span></button>
              </div>
            </nav>
          </div>
          <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-home" role="tabpanel"><%@ include file="tabs/description.jsp" %></div>
            <div class="tab-pane fade" id="nav-profile" role="tabpanel"><%@ include file="tabs/review.jsp" %></div>
            <div class="tab-pane fade" id="nav-contact" role="tabpanel"><%@ include file="tabs/productQnA.jsp" %></div>
          </div>
        </div>
      </div>
      
      <jsp:include page="./recentProduct.jsp" />
    </div>
  </div>
  
  <jsp:include page="../layout/footer.jsp" />
 
</body>
</html>