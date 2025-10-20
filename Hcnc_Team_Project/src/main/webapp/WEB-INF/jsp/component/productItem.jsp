<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<div class="swiper-slide prdItem">
    <div class="prdInfo">
    	<div class="thumbnail">
	    	<a href="/productDetailView.do?productId=${product['PRODUCT_ID']}" class="prdLink img-link">
	    		<div class="labels-area flex ju-between">
			        <div class="labels flex">
			          <c:if test="${product['PRODUCT_TYPE'] eq 'new'}">
			            <span class="label new">NEW</span>	
			          </c:if>
			          <c:if test="${product['PRODUCT_TYPE'] eq 'hot'}">
			            <span class="label hot">인기상품</span>
			          </c:if>
			          <c:if test="${product['PRODUCT_TYPE'] eq 'recommend'}">
			            <span class="label rec">추천상품</span>
			          </c:if>
			        </div>
		      	</div>
		      	<c:choose>
				    <c:when test="${empty product['imageUrl']}">
				        <img src="/images/egovframework/layout/pro-nodata.png" alt="상품 기본 이미지" />
				    </c:when>
				    <c:otherwise>
				        <img src="<c:out value='${product["imageUrl"]}'/>" alt="상품 이미지" />
				    </c:otherwise>
				</c:choose>
		    	<c:if test="${product['STOCK_QUANTITY'] <= 0}">
			        <span class="soldout">SOLD OUT</span>
			    </c:if>
		    </a>
		</div>
	    <a href="/productDetailView.do?productId=${product['PRODUCT_ID']}" class="prdLink">
		    <div class="description">
		      <div class="reviews">리뷰 <c:out value="${product['REVIEW_COUNT']}"/> | <i class="xi-star"></i><c:out value="${product['AVG_RATING']}"/>/5.0</div>
		      <p class="name"><c:out value="${product['PRODUCT_NAME']}"/></p>
		      <p class="info"><c:out value="${product['DESCRIPTION']}"/></p>
		      
		      <div class="priceArea">
		        <c:if test="${not empty product['SALED_PRICE'] and product['SALED_PRICE'] > 0}">
		          <c:set var="discountRate" value="${((product['PRODUCT_PRICE'] - product['SALED_PRICE']) / product['PRODUCT_PRICE'] * 100)}" />
		          <span class="priceSale"><fmt:formatNumber value="${product['SALED_PRICE']}" pattern="#,###"/>원</span>
		          <span class="originPrice"><fmt:formatNumber value="${product['PRODUCT_PRICE']}" pattern="#,###"/>원</span>
		          <span class="salePercent"><fmt:formatNumber value="${discountRate}" pattern="0"/>%</span>
		        </c:if>
		        <c:if test="${empty product['SALED_PRICE'] or product['SALED_PRICE'] <= 0}">
		          <span class="priceSale"><fmt:formatNumber value="${product['PRODUCT_PRICE']}" pattern="#,###"/>원</span>
		        </c:if>
		      </div>
		      
	      	 </div>
	      </a>
    </div>
</div>