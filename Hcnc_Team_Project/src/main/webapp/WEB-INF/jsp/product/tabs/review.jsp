<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<style>
		.review-area {
	background: #ffffff;
	padding: 0;
	border-radius: 0;
	}
	
	/* 리뷰 좌측 영역 - 평점 표시 */
	.review-left-area {
		background: #ffffff;
		padding: 30px 20px;
		border-right: 1px solid #f1f3f4;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		min-height: 200px;
		position: sticky;
		top: 80px;
		height: fit-content;
		z-index: 50;
	}
	
	#avg-point-text {
		font-size: 48px;
		font-weight: 700;
		color: #DC0630;
		margin-bottom: 15px;
		text-align: center;
	}
	
	#avg-star {
		text-align: center;
		margin-bottom: 20px;
	}
	
	/* 평점 별 표시 */
	.star-rating-display {
		display: inline-flex;
		font-size: 24px;
		gap: 2px;
		margin-bottom: 10px;
	}
	
	.star-rating-display .star {
		position: relative;
		width: 24px;
		text-align: center;
		color: #e9ecef;
	}
	
	.star-rating-display .star::before {
		content: "★";
		display: block;
	}
	
	/* 완전히 채워진 별 */
	.star-rating-display .star.filled {
		color: #DC0630;
	}
	
	/* 부분적으로 채워진 별 */
	.star-rating-display .star.partial {
		color: #e9ecef;
	}
	
	.star-rating-display .star.partial::after {
		content: "★";
		position: absolute;
		left: 0;
		top: 0;
		color: #DC0630;
		overflow: hidden;
		width: var(--partial-width, 0%);
		white-space: nowrap;
	}
	
	/* 총 리뷰 개수 표시 */
	.total-reviews {
		color: #666;
		font-size: 14px;
		margin-top: 5px;
	}
	
	/* 평점 통계 영역 추가 */
	.rating-stats {
		width: 100%;
		margin-top: 20px;
	}
	
	.rating-breakdown {
		margin-bottom: 15px;
	}
	
	.rating-row {
		display: flex;
		align-items: center;
		margin-bottom: 8px;
		font-size: 14px;
	}
	
	.rating-stars {
		color: #DC0630;
		font-weight: 600;
		width: 40px;
		text-align: left;
	}
	
	.rating-bar {
		flex: 1;
		height: 8px;
		background: #f1f3f4;
		border-radius: 4px;
		margin: 0 10px;
		overflow: hidden;
	}
	
	.rating-bar-fill {
		height: 100%;
		background: #DC0630;
		border-radius: 4px;
		transition: width 0.3s ease;
	}
	
	.rating-count {
		color: #666;
		font-size: 12px;
		width: 30px;
		text-align: right;
	}
	
	/* 리뷰 우측 영역 */
	.review-right-area {
		background: #ffffff;
		padding: 20px 20px 20px 30px;
	}
	
	/* 리뷰 필터 영역 */
	.review-filter {
		background: #ffffff;
		padding: 20px 0;
		border-bottom: 1px solid #f8f9fa;
		margin-bottom: 30px;
	}
	
	/* 필터 메뉴 */
	.filter-menu {
		display: flex;
		gap: 20px;
		list-style: none;
		padding: 0;
		margin: 0;
	}
	
	.filter-menu li {
		position: relative;
	}
	
	.filter-menu li span {
		color: #666;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		padding: 8px 16px;
		border-radius: 20px;
		transition: all 0.3s ease;
		background: #ffffff;
		border: 1px solid #e9ecef;
		display: inline-block;
	}
	
	.filter-menu li span:hover {
		color: #DC0630;
		background: rgba(220, 6, 48, 0.03);
		border-color: rgba(220, 6, 48, 0.2);
	}
	
	.filter-menu li span.active {
		color: #ffffff;
		background: #DC0630;
		border-color: #DC0630;
	}
	
	/* 정렬 상태 표시 */
	.filter-menu li span.sort-asc::after {
		content: "";
		font-weight: bold;
	}
	
	.filter-menu li span.sort-desc::after {
		content: "";
		font-weight: bold;
	}
	
	/* 드롭다운 버튼 */
	.dropdown-center .btn {
		background: #ffffff !important;
		border: 1px solid #e9ecef !important;
		color: #666 !important;
		font-size: 14px;
		padding: 8px 16px;
		border-radius: 6px;
		transition: all 0.3s ease;
	}
	
	.dropdown-center .btn:hover {
		background: rgba(220, 6, 48, 0.03) !important;
		border-color: rgba(220, 6, 48, 0.2) !important;
		color: #DC0630 !important;
	}
	
	.dropdown-center .btn:focus {
		box-shadow: 0 0 0 2px rgba(220, 6, 48, 0.1) !important;
	}
	
	/* 리뷰 리스트 */
	.review-content-list {
		background: #ffffff;
	}
	
	.reviews {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	
	.review {
		background: #ffffff;
		padding: 25px 0;
		border-bottom: 1px solid #f1f3f4;
		transition: all 0.3s ease;
	}
	
	.review:hover {
		background: rgba(220, 6, 48, 0.01);
	}
	
	.review:first-child {
		border-top: 1px solid #f1f3f4;
	}
	
	/* 리뷰 상단 정보 */
	.top-info {
		display: flex;
		align-items: center;
		gap: 15px;
		margin-bottom: 15px;
		color: #666;
		font-size: 14px;
	}
	
	/* 별점 표시 */
	.review .top-info div[id*="_starPoint"] {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	
	.review .top-info span[id*="_star"] {
		background: #DC0630;
		color: #ffffff;
		padding: 4px 8px;
		border-radius: 12px;
		font-size: 12px;
		font-weight: 600;
		min-width: 35px;
		text-align: center;
	}
	
	.review .top-info span[id*="_starText"] {
		color: #DC0630;
		font-weight: 600;
		font-size: 13px;
	}
	
	/* 개별 리뷰 별점 표시 */
	.review-star-display {
		display: inline-flex;
		gap: 1px;
		margin-right: 8px;
	}
	
	.review-star {
		color: #DC0630;
		font-size: 14px;
	}
	
	.review-star.empty {
		color: #e9ecef;
	}
	
	/* 리뷰 제목 */
	.review-title {
		margin-bottom: 15px;
	}
	
	.review-title span {
		font-size: 16px;
		font-weight: 600;
		color: #333;
		line-height: 1.5;
	}
	
	/* 리뷰 이미지 영역 */
	.review-imgs {
		margin-bottom: 15px;
		gap: 10px;
	}
	
	/* 리뷰 내용 */
	.review-content {
		color: #555;
		line-height: 1.6;
		font-size: 14px;
		margin-bottom: 15px;
	}
	
	/* 하단 정보 */
	.bottom-info {
		text-align: right;
	}
	
	.bottom-info span {
		color: #999;
		font-size: 13px;
		cursor: pointer;
		padding: 4px 8px;
		border-radius: 4px;
		transition: all 0.3s ease;
	}
	
	.bottom-info span:hover {
		color: #DC0630;
		background: rgba(220, 6, 48, 0.05);
	}
	
	/* 페이지네이션 */
	.pagination {
		justify-content: center;
		margin-top: 40px;
	}
	
	.pagination .page-link {
		color: #666;
		background: #ffffff;
		border: 1px solid #e9ecef;
		padding: 8px 12px;
		margin: 0 2px;
		border-radius: 6px;
		transition: all 0.3s ease;
	}
	
	.pagination .page-link:hover {
		color: #DC0630;
		background: rgba(220, 6, 48, 0.03);
		border-color: rgba(220, 6, 48, 0.2);
	}
	
	.pagination .page-item.active .page-link {
		color: #ffffff;
		background: #DC0630;
		border-color: #DC0630;
		font-weight: 600;
	}
	
	.pagination .page-item.current .page-link {
		color: #ffffff;
		background: #DC0630;
		border-color: #DC0630;
		font-weight: 600;
	}
	
	.pagination .page-item:first-child .page-link,
	.pagination .page-item:last-child .page-link {
		color: #999;
	}
	
	.pagination .page-item:first-child .page-link:hover,
	.pagination .page-item:last-child .page-link:hover {
		color: #DC0630;
	}
	
	/* 리뷰 없음 메시지 */
	.review:only-child {
		text-align: center;
		color: #999;
		font-size: 16px;
		padding: 60px 0;
		border: 1px solid #f1f3f4;
		border-radius: 8px;
		background: rgba(248, 249, 250, 0.5);
	}
	
	/* 반응형 */
	@media (max-width: 768px) {
		.review-area {
			flex-direction: column !important;
		}
		
		.review-left-area, .review-right-area {
			width: 100% !important;
		}
		
		.review-left-area {
			position: static;
			top: auto;
			height: auto;
			border-right: none;
			border-bottom: 1px solid #f1f3f4;
			min-height: 120px;
			padding: 20px;
		}
		
		#avg-point-text {
			font-size: 24px;
		}
		
		.review-filter {
			flex-direction: column !important;
			gap: 15px !important;
		}
		
		.filter-menu {
			flex-wrap: wrap;
			gap: 10px !important;
		}
		
		.filter-menu li span {
			font-size: 13px;
			padding: 6px 12px;
		}
		
		.review {
			padding: 20px 0;
		}
		
		.top-info {
			flex-wrap: wrap;
			gap: 10px;
			font-size: 13px;
		}
		
		.review-title span {
			font-size: 15px;
		}
		
		.review-content {
			font-size: 13px;
		}
	}
	
</style>

<div class="review-area" style="display: flex;">
	<div class="review-left-area" style="width:20%;">
		<div>
			<span id="avg-point-text"></span>
			<div id="avg-star">
				<div class="star-rating-display" id="star-display">
					<span class="star" data-star="1"></span>
					<span class="star" data-star="2"></span>
					<span class="star" data-star="3"></span>
					<span class="star" data-star="4"></span>
					<span class="star" data-star="5"></span>
				</div>
				<!-- 아래 행 전체리뷰수 나오게 바꿔야 함 ! -->
				<div class="total-reviews" id="total-reviews-text">전체 100개 리뷰</div>
			</div>
		</div>
		
		<!-- 평점 통계 추가 -->
		<div class="rating-stats">
			<div class="rating-breakdown">
				<div class="rating-row">
					<span class="rating-stars">5★</span>
					<div class="rating-bar">
						<div class="rating-bar-fill" style="width: 0%"></div>
					</div>
					<span class="rating-count">0</span>
				</div>
				<div class="rating-row">
					<span class="rating-stars">4★</span>
					<div class="rating-bar">
						<div class="rating-bar-fill" style="width: 0%"></div>
					</div>
					<span class="rating-count">0</span>
				</div>
				<div class="rating-row">
					<span class="rating-stars">3★</span>
					<div class="rating-bar">
						<div class="rating-bar-fill" style="width: 0%"></div>
					</div>
					<span class="rating-count">0</span>
				</div>
				<div class="rating-row">
					<span class="rating-stars">2★</span>
					<div class="rating-bar">
						<div class="rating-bar-fill" style="width: 0%"></div>
					</div>
					<span class="rating-count">0</span>
				</div>
				<div class="rating-row">
					<span class="rating-stars">1★</span>
					<div class="rating-bar">
						<div class="rating-bar-fill" style="width: 0%"></div>
					</div>
					<span class="rating-count">0</span>
				</div>
			</div>
		</div>
		
	</div>
	<div class="review-right-area" style="width:70%;">
		<div class="review-filter" style="display: flex; justify-content: space-between">
			<div class="review-filter-left">
				<ul class="filter-menu" style="display: flex; gap: 10px; list-style: none; padding: 0; margin: 0;">
					<li>
						<span id="review-sort-btn" onclick="orderbyReview()" style="cursor: pointer;">리뷰순</span>
					</li>
					<li>
						<span id="date-sort-btn" onclick="orderbyInputDT()" style="cursor: pointer;">최신순</span>
					</li>
					<li>
						<span id="photo-filter-btn" onclick="togglePhotoFilter()" style="cursor: pointer;">포토리뷰만 보기</span>
					</li>
				</ul>
			</div>
			<!-- <div class="review-filter-right">
				<div class="dropdown-center">
					<button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						<span>별점전체보기</span>
						<span>(100)</span>
					</button>
					<ul class="dropdown-menu">
						<li><a class="dropdown-item" href="#">Action</a></li>
						<li><a class="dropdown-item" href="#">Action two</a></li>
						<li><a class="dropdown-item" href="#">Action three</a></li>
					</ul>
				</div>
			</div> -->
		</div>
		<div class="review-content-list">
			<ul class="reviews" style="padding: 0;">
				
			</ul>
		</div>
		<nav aria-label="Page navigation example">
			<ul class="pagination">
			  
			</ul>
		</nav>
	</div>
</div>

<script>
	var urlParams = new URLSearchParams(window.location.search);
	
	var productId = urlParams.get('productId');
	
	var currentPage = 1;
	var maxPage = 0;
	
	var byReview = true;
	var byInputDT = true;
	var photoOnly = false;
	
	function formatRating(rating) {
	    if (rating == null || isNaN(rating)) return '0.0';
	    return parseFloat(rating).toFixed(1);
	}
	
	// 필터 버튼 상태 업데이트
	function updateFilterButtons() {
		var reviewBtn = document.getElementById('review-sort-btn');
		var dateBtn = document.getElementById('date-sort-btn');
		var photoBtn = document.getElementById('photo-filter-btn');
		
		// 리뷰순 버튼 상태
		if (reviewBtn) {
			if (byReview) {
				reviewBtn.className = 'active sort-desc';
			} else {
				reviewBtn.className = '';
			}updateRatingStats
		}
		
		// 최신순 버튼 상태  
		if (dateBtn) {
			if (byInputDT) {
				dateBtn.className = 'active sort-desc';
			} else {
				dateBtn.className = '';
			}
		}
		
		// 포토 필터 버튼
		if (photoBtn) {
			if (photoOnly) {
				photoBtn.className = 'active';
			} else {
				photoBtn.className = '';
			}
		}
	}
	
	// 포토 필터 토글
	function togglePhotoFilter() {
		photoOnly = !photoOnly;
		updateFilterButtons();
		loadReviewList(1, byReview, byInputDT);
	}
	
	
	var isPageJustLoaded = true;
	function loadReviewList(page, byReview, byInputDT){
		var pageSize = 10;
		
		var param = {
			productId : productId,
			page : page,
			pageSize : pageSize,
			byReview : byReview,
			byInputDT : byInputDT
		};
		
		return $.ajax({
			url: "/selectReviewListPaged.do",
			type: "post",
			data: param,
			dataType: "json",
			success: function(res){
				var reviews = res.reviews;
				var reviewCnt = res.reviewCnt.REVIEW_CNT;
				
				// 중요: currentPage를 먼저 업데이트
				currentPage = page;
				
				updateReviewList(reviews);
				updateReviewCount(reviewCnt); // 이제 currentPage가 올바르게 설정됨
				
				if (reviews.length > 0) {
					updateReviewAVG(reviews[0].AVG_STAR_POINT);
					updateRatingStats(reviews);
				}
				
				// 페이지 변경 시 탭 네비게이션으로 스크롤
				if (!isPageJustLoaded) {
                	scrollToTabNavigation();
            	}
			},
			error: function(xhr, status, error) {
				console.log('리뷰 리스트 로드 실패:', error);
			}
		});
	}
	
	// 별점을 별표시로 변환하는 함수 추가
	function formatStarDisplay(rating) {
	    var stars = '';
	    var fullStars = Math.round(parseFloat(rating) || 0); // 반올림하여 정수로 변환
	    
	    // 별점만큼 꽉 찬 별 추가 (빨간색)
	    for (var i = 0; i < fullStars; i++) {
	        stars += '<span style="color: #DC0630;">★</span>';
	    }
	    
	    // 남은 별은 회색으로 추가
	    for (var i = fullStars; i < 5; i++) {
	        stars += '<span style="color: #e9ecef;">☆</span>';
	    }
	    
	    return stars;
	}
	
	function updateReviewList(reviews){
		
		var list = '';
		if(reviews.length > 0){
			for(var i=0; i < reviews.length; i++){
				list += '<li class="review" id="'+ reviews[i].REVIEW_ID +'_list" style="padding: 20px 0; border-top: 1px solid grey; border-bottom: 1px solid grey;">';
				list +=	'<div class="top-info" id="'+ reviews[i].REVIEW_ID +'_topInfo">';
				list +=	'<div id="'+ reviews[i].REVIEW_ID +'_starPoint">';
				list += '<div class="review-star-display">' + formatStarDisplay(reviews[i].STAR_POINT) + '</div>';
				list += '<span class="starText">' + formatRating(reviews[i].STAR_POINT) + '점</span>';
				list += '</div>';
				list +=	'<span>' + reviews[i].MEMBER_ID + ' | <span>';
				list += '<span>' + reviews[i].INPUT_DT + '<span></div>';
				list +=	'<div class="body-info" id="'+ reviews[i].REVIEW_ID +'_bodyInfo">';

				if(reviews[i].reviewImgs && reviews[i].reviewImgs.length > 0 && reviews[i].reviewImgs[0] != null){
					list += '<div class="review-img-list" id="'+ reviews[i].REVIEW_ID +'_imgList" style="display: flex; gap: 10px; margin-bottom: 15px;">';
					for(var j=0; j < reviews[i].reviewImgs.length; j++){
						list += '<img src="'+ reviews[i].reviewImgs[j].IMG_PATH +'" alt="Review Image" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">';
					}
					list += '</div>';
				}

				list +=	'<div class="review-title"><span style="font-weight: bold;">'+ reviews[i].REVIEW_TITLE +'</span></div>';
				list +=	'<div class="review-imgs" id="'+ reviews[i].REVIEW_ID +'_imgs" style="display: flex;"></div>';
				list +=	'<div class="review-content">'+ reviews[i].REVIEW_CONTENT +'</div>';
				list +=	'<div class="bottom-info" id="'+ reviews[i].REVIEW_ID +'_bottomInfo">';
				// list +=	'<span>펼쳐보기</span>';
				list += '</div>';
				list +=	'</div>';
				list += '</li>';
			} 
		} else {
			list = '<li class="review" style="padding: 20px 0; border-top: 1px solid grey; border-bottom: 1px solid grey;">해당 상품의 리뷰가 없습니다.</li>'
		}
		$(".reviews").html(list);
	}
	
	// 별점 통계 업데이트 함수
	function updateRatingStats(reviews) {
		var ratingCounts = [0, 0, 0, 0, 0]; // 1점부터 5점까지 개수
		var totalReviews = reviews.length;
		
		// 각 별점별 개수 계산
		reviews.forEach(function(review) {
			var rating = Math.floor(parseFloat(review.STAR_POINT) || 0);
			if (rating >= 1 && rating <= 5) {
				ratingCounts[rating - 1]++;
			}
		});
		
		
		// 게이지 바 업데이트
		for (var i = 0; i < 5; i++) {
			var starLevel = 5 - i; // 5점부터 1점 순서
			var count = ratingCounts[starLevel - 1];
			var percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
			
			
			// 게이지 바 너비 업데이트
			var barFill = document.querySelector('.rating-row:nth-child(' + (i + 1) + ') .rating-bar-fill');
			var countSpan = document.querySelector('.rating-row:nth-child(' + (i + 1) + ') .rating-count');
			
			if (barFill) {
				barFill.style.width = percentage + '%';
			}
			if (countSpan) {
				countSpan.textContent = count;
			}
		}
	}
	
	// 별점 표시 업데이트 함수
	function updateStarDisplay(rating) {
		var stars = document.querySelectorAll('.star-rating-display .star');
		var fullStars = Math.floor(rating);
		var partialStar = rating - fullStars;
		
		
		stars.forEach(function(star, index) {
			var starNumber = index + 1;
			
			if (starNumber <= fullStars) {
				// 완전히 채워진 별
				star.className = 'star filled';
				star.style.removeProperty('--partial-width');
			} else if (starNumber === fullStars + 1 && partialStar > 0) {
				// 부분적으로 채워진 별
				star.className = 'star partial';
				star.style.setProperty('--partial-width', (partialStar * 100) + '%');
			} else {
				// 빈 별
				star.className = 'star';
				star.style.removeProperty('--partial-width');
			}
		});
	}
	
	function updateReviewAVG(starPoint){
		var rating = parseFloat(starPoint) || 0;
		$("#avg-point-text").text(formatRating(rating) + '점');
		updateStarDisplay(rating); // 이 줄이 추가되어야 함!
	}
	
	function updateReviewCount(reviewCnt){
		
		$("#productReviewCnt").text('('+ reviewCnt + ')');
		$("#total-reviews-text").text('전체 ' + reviewCnt + '개 리뷰');
		$("#dropdown-count").text('(' + reviewCnt + ')');
		
		var pageCnt = Math.ceil(reviewCnt / 10);
		maxPage = pageCnt;
		
		var pageList = 
			'<li class="page-item" onclick="prePage()">' +
				'<a class="page-link" href="#" aria-label="Previous">' +
					'<span aria-hidden="true">&lt;</span>' +
				'</a>' +
			'</li>';
		for(var i=0; i < pageCnt; i++){
			// 현재 페이지인 경우 'current' 클래스 추가
			var activeClass = (i + 1) === currentPage ? ' current' : '';
			pageList += '<li class="page-item' + activeClass + '"><a class="page-link" href="#" onclick="loadReviewList('+ (i + 1) +', '+ byReview +', '+ byInputDT +')">' + (i + 1) + '</a></li>';
		}
		pageList += '<li class="page-item" onclick="nextPage()">';
		pageList += '<a class="page-link" href="#" aria-label="Next">';
		pageList += '<span aria-hidden="true">&gt;</span>';
		pageList += '</a></li>';
		
	  	$(".pagination").html(pageList);
	}
	
	function prePage(){
		currentPage > 1 ? loadReviewList(currentPage - 1, byReview, byInputDT) : null;
	}
	
	function nextPage(){
		currentPage < maxPage  ? loadReviewList(currentPage + 1, byReview, byInputDT) : null;
	}
	
	function orderbyReview(){
		byReview = !byReview;
		updateFilterButtons();
		loadReviewList(currentPage, byReview, byInputDT);
	}
	
	function orderbyInputDT(){
		byInputDT = !byInputDT;
		updateFilterButtons();
		loadReviewList(currentPage, byReview, byInputDT);
	}
	
	// 페이지 로드 시 초기 상태 설정
	$(document).ready(function() {
		updateFilterButtons();
		updateStarDisplay(0);
		$("#avg-point-text").text('0.0점');
		$("#total-reviews-text").text('리뷰를 불러오는 중...');
		
		setTimeout(function() {
	        isPageJustLoaded = false;
	    }, 500);
	});
	
</script>