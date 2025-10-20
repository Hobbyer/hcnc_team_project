<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<style>
	.recent-products-container {
	    position: sticky;
	    top: 20px !important;  /* 스크롤 시 상단에서 20px 떨어진 위치에 고정 */
	    width: 120px !important;
    	min-width: 120px !important;
    	max-width: 120px !important;
	    background: #fff;
	    border: 1px solid #e0e0e0;
	    border-radius: 8px;
	    padding: 15px 10px;
	    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
	    z-index: 100;
	    align-self: flex-start;  /* 부모가 flex일 경우 상단 정렬 */
	}
	
	.recent-products-title {
	    font-size: 14px;
	    font-weight: bold;
	    margin-bottom: 10px;
	    text-align: center;
	    color: #333;
	}
	
	.recent-item {
	    margin-bottom: 10px;
	    cursor: pointer;
	    border: 1px solid #f0f0f0;
	    border-radius: 4px;
	    padding: 5px;
	    transition: all 0.3s;
	}
	
	.recent-item:hover {
	    border-color: #DC0630;
	    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
	}
	
	.recent-item img {
	    width: 100%;
	    height: 100px;
	    object-fit: cover;
	    border-radius: 4px;
	}
	
	.recent-item p {
	    font-size: 12px;
	    margin: 5px 0;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	}
	
	.recent-item span {
	    font-size: 11px;
	    color: #DC0630;
	    font-weight: bold;
	}
	
	.recent-nav {
	    display: flex;
	    justify-content: space-between;
	    margin-top: 10px;
	}
	
	.recent-nav button {
	    background: #f5f5f5;
	    border: 1px solid #ddd;
	    padding: 5px 10px;
	    cursor: pointer;
	    border-radius: 4px;
	    font-size: 12px;
	}
	
	.recent-nav button:hover {
	    background: #DC0630;
	    color: white;
	}
	
	.recent-nav button:disabled {
	    opacity: 0.5;
	    cursor: not-allowed;
	}
</style>

<div class="recent-products-container">
    <div class="recent-products-title">최근 본 상품</div>
    <div id="recent-products">
        <!-- 최근 본 상품이 여기에 표시됩니다 -->
    </div>
    <div class="recent-nav">
        <button id="recent-prev" onclick="changeRecentPage(-1)">▲</button>
        <button id="recent-next" onclick="changeRecentPage(1)">▼</button>
    </div>
</div>

<script>
	var currentRecentPage = 0;
	var itemsPerPage = 3;


	// 최근 본 상품 표시
	function displayRecentProducts() {
			var recentProducts = JSON.parse(localStorage.getItem('recentProducts')) || [];
			
			if(recentProducts.length === 0) {
					$('#recent-products').html('<p style="text-align:center; color:#999; font-size:12px;">최근 본 상품이<br>없습니다</p>');
					$('#recent-prev').prop('disabled', true);
					$('#recent-next').prop('disabled', true);
					return;
			}
			
			var startIdx = currentRecentPage * itemsPerPage;
			var endIdx = Math.min(startIdx + itemsPerPage, recentProducts.length);
			
			var html = '';
			for(var i = startIdx; i < endIdx; i++) {
					html += '<div class="recent-item" onclick="location.href=\'/productDetailView.do?productId=' + recentProducts[i].productId + '\'">';
					html += '<img src="' + recentProducts[i].productImage + '" alt="' + recentProducts[i].productName + '">';
					html += '<p>' + recentProducts[i].productName + '</p>';
					html += '<span>' + recentProducts[i].price.toLocaleString() + '원</span>';
					html += '</div>';
			}
			
			$('#recent-products').html(html);
			
			// 버튼 활성화/비활성화
			$('#recent-prev').prop('disabled', currentRecentPage === 0);
			$('#recent-next').prop('disabled', endIdx >= recentProducts.length);
	}

	// 페이지 변경
	function changeRecentPage(direction) {
			var recentProducts = JSON.parse(localStorage.getItem('recentProducts')) || [];
			var maxPage = Math.ceil(recentProducts.length / itemsPerPage) - 1;
			
			currentRecentPage += direction;
			
			if(currentRecentPage < 0) currentRecentPage = 0;
			if(currentRecentPage > maxPage) currentRecentPage = maxPage;
			
			displayRecentProducts();
	}

	// 페이지 로드 시 표시
	$(document).ready(function() {
			displayRecentProducts();
	});
</script>