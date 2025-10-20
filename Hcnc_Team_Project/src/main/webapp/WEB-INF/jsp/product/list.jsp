<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>상품목록 :: ${mainCategory['MAIN_CATE_NM']}</title>
    <jsp:include page="../layout/headertop.jsp" />
    <link rel="stylesheet" href="../../../css/content/board.css">
    <link rel="stylesheet" href="../../../css/component/productItem.css">
    <link rel="stylesheet" href="../../../js/component/productItem.js">
</head>
<body>

<div class="container-wrap">
    <jsp:include page="../layout/header.jsp" />
    <div class="container productlist">
        <div class="breadcrumb">
            <a href="/">홈</a>
            <span>›</span>
            <strong>${mainCategory['MAIN_CATE_NM']}</strong>
            <c:if test="${not empty subCateId}">
		        <span>›</span>
		        <strong>${subCate.SUB_CATE_NM}</strong>
		    </c:if>
        </div>
        <div class="sub-area">
            <div class="sub-title-area">
                <h3>[ ${mainCategory['MAIN_CATE_NM']} ]</h3>
            </div>
            <div class="sub-content-area">
                <div class="sub-category-area">
                    <ul class="flex">
                        <li><a href="/product/list.do?mainCateId=${mainCategory['MAIN_CATE_ID']}" class="${empty subCateId ? 'active' : ''}">전체</a></li>
                        <c:forEach var="subCate" items="${subCategories}">
                            <li>
								<a href="/product/list.do?mainCateId=${mainCategory['MAIN_CATE_ID']}&subCateId=${subCate['SUB_CATE_ID']}"
							   class="${subCateId eq subCate.SUB_CATE_ID ? 'active' : ''}">
							    ${subCate.SUB_CATE_NM}
							</a>
                            </li>
                        </c:forEach>
                    </ul>
                </div>
                <div class="sub-search-area flex ju-between">
                    <div class="left">총 ${totalCount}개의 상품이 있습니다</div>
                    <div class="right">
                        <select id="sortType" onchange="changeSortType(this.value)">
                            <option value="newest" ${sortType eq 'newest' ? 'selected' : ''}>신상품순</option>
                            <option value="name" ${sortType eq 'name' ? 'selected' : ''}>상품명순</option>
                            <option value="lowPrice" ${sortType eq 'lowPrice' ? 'selected' : ''}>낮은가격순</option>
                            <option value="highPrice" ${sortType eq 'highPrice' ? 'selected' : ''}>높은가격순</option>
                        </select>
                    </div>
                </div>
                
                <div class="prdItem_area">
                    <div class="flex prdList f-wrap">
                        <c:choose>
                            <c:when test="${not empty productList}">
                                <c:forEach var="product" items="${productList}">
                                    <%@ include file="/WEB-INF/jsp/component/productItem.jsp" %>
                                </c:forEach>
                            </c:when>
                            <c:otherwise>
                                <div class="prdItem no-product">등록된 상품이 없습니다.</div>
                            </c:otherwise>
                        </c:choose>
                    </div>
                </div>
                
                <c:if test="${totalPages >= 1}">
                    <div class="pagination">
                        <c:if test="${currentPage > 1}">
                            <a href="?mainCateId=${mainCateId}&subCateId=${subCateId}&sortType=${sortType}&page=${currentPage - 1}" class="prev">«</a>
                        </c:if>
                        
                        <c:forEach var="i" begin="${startPage}" end="${endPage}">
                            <a href="?mainCateId=${mainCateId}&subCateId=${subCateId}&sortType=${sortType}&page=${i}" 
                               class="${i eq currentPage ? 'active' : ''}">${i}</a>
                        </c:forEach>
                        
                        <c:if test="${currentPage < totalPages}">
                            <a href="?mainCateId=${mainCateId}&subCateId=${subCateId}&sortType=${sortType}&page=${currentPage + 1}" class="next">»</a>
                        </c:if>
                    </div>
                </c:if>
            </div>
        </div>
    </div>
    <jsp:include page="../layout/footer.jsp" />
</div>

<script>
function changeSortType(sortType) {
    const params = new URLSearchParams(window.location.search);
    params.set('sortType', sortType);
    params.set('page', '1'); // 정렬 변경시 1페이지로
    window.location.href = '?' + params.toString();
}
</script>
</body>
</html>