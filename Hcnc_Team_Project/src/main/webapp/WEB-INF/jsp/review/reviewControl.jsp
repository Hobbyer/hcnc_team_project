<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui"     uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<jsp:include page="../layout/headertop.jsp" />

<link type="text/css" rel="stylesheet" href="<c:url value='/css/egovframework/global.css'/>"/>
<link type="text/css" rel="stylesheet" href="<c:url value='/css/egovframework/layout.css'/>"/>
<link type="text/css" rel="stylesheet" href="<c:url value='/css/egovframework/common.css'/>"/>
<link type="text/css" rel="stylesheet" href="<c:url value='/css/egovframework/reset.css'/>"/>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">

<link type="text/css" rel="stylesheet" href="<c:url value='/css/review/reviewWriteModal.css'/>"/>
<link type="text/css" rel="stylesheet" href="<c:url value='/css/review/reviewReadModal.css'/>"/>
<link type="text/css" rel="stylesheet" href="<c:url value='/css/review/orderProductList.css'/>"/>

<!-- j쿼리를 실행하기 위해 스크립트 선언을 해줘야한다. -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>

<script type="text/javascript" src="<c:url value='/js/review/orderProductListRead.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/review/reviewWriteModal.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/review/reviewReadModal.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/review/reviewWriteFunction.js'/>"></script>

</head>
<body>
	<jsp:include page="../layout/header.jsp" />
	<div class="container" style="display: flex; gap: 10px;">
    	<div class="inner">
    		<div class="order-product-list">
  				
    		</div>
		</div>
	</div>

	<!-- 리뷰 작성 모달 배경 (오버레이) -->
	<div id="review-write-modal-overlay" class="review-write-modal-overlay" onclick="closeReviewWriteModal()"></div>

	<!-- 리뷰 작성 모달 -->
	<div id="review-write-modal" class="review-write-modal">
		<div class="review-write-modal-header">
			<h3>리뷰 작성</h3>
			<button type="button" class="review-write-modal-close-btn" onclick="closeReviewWriteModal()">&times;</button>
		</div>
		
		<!-- 상품 정보 -->
		<div class="review-product-info">
			<img id="review-product-image" alt="상품 이미지" src="">
			<div class="review-product-details">
				<p id="review-product-name" class="review-product-name">상품명A</p>
				<span id="review-product-orderDT" class="review-product-orderDT">2023-08-15</span>
				<input type="hidden" id="review-product-data"></input>
			</div>
		</div>
		
		<!-- 별점 선택 -->
		<div class="review-star-rating">
			<label>별점 평가</label>
			<div class="star-rating-container">
				<span class="star" data-rating="1" onclick="setRating(1)">★</span>
				<span class="star" data-rating="2" onclick="setRating(2)">★</span>
				<span class="star" data-rating="3" onclick="setRating(3)">★</span>
				<span class="star" data-rating="4" onclick="setRating(4)">★</span>
				<span class="star" data-rating="5" onclick="setRating(5)">★</span>
			</div>
			<input type="hidden" id="review-rating" value="1.0">
		</div>
		
		<div class="review-write-modal-body">
			<div class="review-write-title-area">
				<label for="review-write-title">리뷰 제목</label>
				<input type="text" id="review-write-title" maxlength="50" placeholder="리뷰 제목을 입력하세요">
			</div>
			
			<!-- 미리보기 영역 -->
			<div class="review-write-img-area">
				<label id="review-write-photo-label">사진 첨부</label>
				<div style="display: flex; align-items: flex-start; gap: 10px;">
					<div id="review-write-preview-container" style="display: flex; flex-wrap: wrap; gap: 10px; flex: 1;"></div>
					<label for="review-write-photo-upload" class="review-write-upload-button">
					  <i class="bi bi-camera"></i> 사진 추가
					</label>
					<input type="file" multiple accept=".jpg,.jpeg,.png" id="review-write-photo-upload" onchange="fileChange(event)" style="display: none;">
				</div>
			</div>
			
			<div class="review-write-content-area">
				<label for="review-write-content">리뷰 내용</label>
				<textarea id="review-write-content" placeholder="상품에 대한 솔직한 리뷰를 작성해주세요"></textarea>
			</div>
		</div>
		
		<div class="review-write-button-area">
			<button type="button" class="review-write-btn-submit" onclick="submitReview()">리뷰 등록</button>
			<button type="button" class="review-write-btn-cancel" onclick="closeReviewWriteModal()">취소</button>
		</div>
	</div>

	<!--     ------------------------------------------------------------------------------------------------------         -->


	<!-- 리뷰 보기 모달 -->
	<div id="review-read-modal" class="review-read-modal">
		<div class="review-read-modal-header">
			<h3>리뷰 보기</h3>
			<button type="button" class="review-read-modal-close-btn" onclick="closeReviewReadModal()">&times;</button>
		</div>
		
		<!-- 상품 정보 -->
		<div class="review-product-info">
			<img id="review-product-image-read" alt="상품 이미지" src="">
			<div class="review-product-details">
				<p id="review-product-name-read" class="review-product-name"></p>
				<span id="review-product-orderDT-read" class="review-product-orderDT"></span>
			</div>
		</div>
		
		<!-- 별점 선택 -->
		<div class="review-star-rating">
			<label>별점 평가</label>
			
			<!-- 읽기 전용 별점 -->
			<div id="review-read-star-rating">
				<span class="star-readOnly" data-rating="1">★</span>
				<span class="star-readOnly" data-rating="2">★</span>
				<span class="star-readOnly" data-rating="3">★</span>
				<span class="star-readOnly" data-rating="4">★</span>
				<span class="star-readOnly" data-rating="5">★</span>
			</div>
			
			<!-- 수정 가능 별점 -->
			<div id="review-editable-star-rating">
				<span class="star-read" data-rating="1" onclick="setReadRating(1)">★</span>
				<span class="star-read" data-rating="2" onclick="setReadRating(2)">★</span>
				<span class="star-read" data-rating="3" onclick="setReadRating(3)">★</span>
				<span class="star-read" data-rating="4" onclick="setReadRating(4)">★</span>
				<span class="star-read" data-rating="5" onclick="setReadRating(5)">★</span>
			</div>
			
			<input type="hidden" id="review-read-rating" value="1">
		</div>
		
		<div class="review-read-modal-body">
			<div class="review-read-title-area">
				<label for="review-read-title">리뷰 제목</label>
				<input type="text" id="review-read-title" maxlength="50" readonly>
			</div>
			
			<!-- 이미지 영역 -->
			<div class="review-read-img-area">
				<label>첨부 사진</label>
				<div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px;">
					<div id="review-read-preview-container"></div>
					<label for="review-read-photo-upload" class="review-read-upload-button" id="review-read-photo-upload-label">
						<i class="bi bi-camera"></i> 사진 추가
					</label>
					<input type="file" multiple accept=".jpg,.jpeg,.png" id="review-read-photo-upload" onchange="handleReviewReadFileChange(event)" style="display: none;">
				</div>
			</div>
			
			<div class="review-read-content-area">
				<label for="review-read-content">리뷰 내용</label>
				<textarea id="review-read-content" readonly maxlength="500"></textarea>
			</div>
		</div>
		
		<div class="review-read-button-area">
			<button type="button" class="review-read-btn-edit" onclick="enableReviewEditing()">수정하기</button>
			<button type="button" class="review-read-btn-submit" onclick="updateReview()">저장</button>
			<button type="button" class="review-read-btn-delete" onclick="deleteReview()">삭제</button>
			<button type="button" class="review-read-btn-cancel" onclick="cancelReviewEditing()">취소</button>
		</div>
	</div>
	<jsp:include page="../layout/footer.jsp" />
</body>
</html>