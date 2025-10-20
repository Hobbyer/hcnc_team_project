<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<!DOCTYPE html>
<head>
  <jsp:include page="../layout/headertop.jsp" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>DDD.D - 적립금</title>
</head>

<style>
  /* 메인 콘텐츠 레이아웃 */
  /* .main-content {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 30px;
  } */

  /* 사이드바 */
  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  /* 사이드바 메뉴 */
  .sidebar-menu {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 25px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .sidebar-menu h3 {
    font-size: 18px;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .menu-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px;
    border-radius: 12px;
    margin-bottom: 10px;
    cursor: pointer;
    text-decoration: none;
    color: #4a5568;
    font-weight: 500;
  }



  .menu-item.active {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
  }

  .menu-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: linear-gradient(45deg, #a8edea, #fed6e3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }

  .menu-item.active .menu-icon {
    background: rgba(255, 255, 255, 0.2);
  }

  /* 메인 패널 */
  .main-panel {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  /* 포인트 요약 카드 */
  .point-summary {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .summary-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }

  .user-greeting {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .user-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(45deg, #ffecd2, #fcb69f);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
  }

  .greeting-text h2 {
    font-size: 24px;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 5px;
  }

  .greeting-text p {
    color: #718096;
    font-size: 14px;
  }

  .point-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    
  }

  .point-card {
    padding: 30px;
    border-radius: 15px;
    text-align: center;
    position: relative;
    overflow: hidden;
        transition: all 0.3s ease;

  }
  .point-card:hover{
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
  }

  .point-card .coupon:hover{
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
  }

  .point-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    opacity: 0.9;
    z-index: 0;
  }

  .point-card.coupon::before {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  }

  .point-card-content {
    position: relative;
    z-index: 1;
  }

  .point-label {
    color: rgba(255, 255, 255, 0.9);
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .point-amount {
    color: white;
    font-size: 36px;
    font-weight: 800;
    margin-bottom: 5px;
  }

  .point-unit {
    color: rgba(255, 255, 255, 0.8);
    font-size: 14px;
  }

  /* 포인트 내역 섹션 */
  .point-history {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .section-title {
    font-size: 20px;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  /* 포인트 테이블 */
  .point-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 10px;
  }

  .point-table thead {
    background: rgba(102, 126, 234, 0.1);
  }

  .point-table thead th {
    padding: 15px 20px;
    text-align: center;
    font-weight: 600;
    color: #4a5568;
    font-size: 14px;
    border: none;
  }

  .point-table thead th:first-child {
    border-radius: 10px 0 0 10px;
  }

  .point-table thead th:last-child {
    border-radius: 0 10px 10px 0;
    text-align: right;
  }

  .point-table tbody tr {
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .point-table tbody td {
    padding: 20px;
    border: none;
    color: #4a5568;
    text-align: center;
  }

  .point-table tbody td:first-child {
    border-radius: 10px 0 0 10px;
  }
  

  .point-table tbody td:last-child {
    border-radius: 0 10px 10px 0;
    text-align: right;
    font-weight: 700;
  }

  .point-date {
    color: #718096;
    font-size: 14px;
  }

  .point-reason {
    color: #2d3748;
    font-weight: 600;
    font-size: 15px;
  }

  .point-change {
    font-size: 18px;
  }

  .point-change.plus {
    color: #48bb78;
  }

  .point-change.minus {
    color: #f56565;
  }

  /* 빈 상태 */
  .empty-state {
    text-align: center;
    padding: 60px 20px;
  }

  .empty-icon {
    font-size: 64px;
    margin-bottom: 20px;
    opacity: 0.5;
  }

  .empty-text {
    color: #718096;
    font-size: 16px;
  }

  /* 반응형 */
  @media (max-width: 1024px) {
    .main-content {
      grid-template-columns: 1fr;
    }

    .sidebar {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .point-cards {
      grid-template-columns: 1fr;
    }

    .point-summary {
      padding: 25px;
    }

    .summary-header {
      flex-direction: column;
      gap: 20px;
      text-align: center;
    }

    .point-table {
      font-size: 13px;
    }

    .point-table thead th,
    .point-table tbody td {
      padding: 12px;
    }
  }

  @media (max-width: 480px) {
    body {
      padding: 10px;
    }

    .point-amount {
      font-size: 28px;
    }

    .point-table thead {
      display: none;
    }

    .point-table tbody tr {
      display: flex;
      flex-direction: column;
      padding: 15px;
      margin-bottom: 15px;
    }

    .point-table tbody td {
      padding: 5px 0;
      text-align: left !important;
    }

    .point-table tbody td:last-child {
      border-radius: 0;
      margin-top: 10px;
    }
  }
</style>
<script>
  $(()=>{
    $("#coupon-list").hide();
  })
  const showPoint = () => {
    $("#point-list").show();
    $("#coupon-list").hide();
  }
  const showCoupon = () => {
    $("#point-list").hide();
    $("#coupon-list").show();
  }
</script>
<body>
  <jsp:include page="../layout/header.jsp" />
  <div style="height: 20px"></div>
  
  <div class="container">
    <div class="inner">
      <div class="main-content">
        <!-- 사이드바 -->
        <!-- <div class="sidebar">
          <div class="sidebar-menu">
            <h3>
            <a href="/mypage/main.do" class="menu-item">
              <div class="menu-icon">🏠</div>
              <span>대시보드</span>
            </a>
            <a href="/mypage/orders.do" class="menu-item">
              <div class="menu-icon">📦</div>
              <span>주문/배송 조회</span>
            </a>
            <a href="/mypage/wishlist.do" class="menu-item">
              <div class="menu-icon">❤️</div>
              <span>찜한 상품</span>
            </a>
            <a href="/mypage/point.do" class="menu-item active">
              <div class="menu-icon">💳</div>
              <span>적립금/쿠폰</span>
            </a>
            <a href="/mypage/reviews.do" class="menu-item">
              <div class="menu-icon">📝</div>
              <span>상품 후기</span>
            </a>
            <a href="/mypage/inquiry.do" class="menu-item">
              <div class="menu-icon">💬</div>
              <span>1:1 문의</span>
            </a>
            <a href="/mypage/update.do" class="menu-item">
              <div class="menu-icon">⚙️</div>
              <span>정보 수정</span>
            </a>
          </div>
        </div> -->

        <!-- 메인 패널 -->
        <div class="main-panel">
          <!-- 포인트 요약 -->
          <div class="point-summary">
            <div class="summary-header">
              <div class="user-greeting">
                <div class="user-avatar">✏️</div>
                <div class="greeting-text">
                  <h2><span style="color: #667eea; font-size: 26px;">${userName}</span>님 안녕하세요!</h2>
                  <p>누적 구매금액: <strong><fmt:formatNumber value="${spendTotal}" type="number" />원</strong>
</p>
                </div>
              </div>
              <button class="edit-profile-btn" style="background: linear-gradient(45deg, #667eea, #764ba2); color: white; border: none; padding: 12px 24px; border-radius: 25px; font-weight: 600; cursor: pointer;" onclick="location.href='/mypage/home.do'">
                마이페이지로
              </button>
            </div>

            <div class="point-cards">
              <div class="point-card" onclick="showPoint();">
                <div class="point-card-content">
                  <div class="point-label">
                    
                    Point
                  </div>
                  <div class="point-amount">${pointTotal}</div>
                  <div class="point-unit">적립금</div>
                </div>
              </div>
              <div class="point-card coupon" onclick="showCoupon();">
                <div class="point-card-content">
                  <div class="point-label">
                    
                    쿠폰
                  </div>
                  <c:set var="usedCount" value="0" />
                  <jsp:useBean id="nowDate" class="java.util.Date" />
                  <c:forEach var="item" items="${couponList}">

                    <c:if test="${item.IS_USED == 'N' && item.EXPIRY_DT gt nowDate}">
                      <c:set var="usedCount" value="${usedCount + 1}" />
                    </c:if>
                  </c:forEach>
                  <div class="point-amount">${usedCount}</div>
                  <div class="point-unit">사용 가능</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 포인트 내역 -->
          <div id="point-list" class="point-history">
            <h2 class="section-title">
              Point 적립/사용 내역
            </h2>

            <table class="point-table">
              <thead>
                <tr>
                  <th>날짜</th>
                  <th>사유/내용</th>
                  <th>Point 내역</th>
                </tr>
              </thead>
              <tbody id="showList">
                <c:forEach var="item" items="${pointList}">
                  <tr>
                  <td>
                    <div class="point-date"><fmt:formatDate value="${item.INPUT_DT}" pattern="yyyy-MM-dd" />
</div>
                  </td>
                  <td>
                    <div class="point-reason">${item.DESCRIPTION}</div>
                  </td>
                  <td>
                    <c:choose>
                    <c:when test="${fn:startsWith(item.POINT, '-')}">
                      <div class="point-change minus" >${item.POINT} Point</div>
                    </c:when>
                    <c:otherwise>
                      <div class="point-change plus">${item.POINT} Point</div>
                    </c:otherwise>
                  </c:choose>
                  </td>
                </tr>
                </c:forEach>
              </tbody>
            </table>

            <!-- 빈 상태 (데이터가 없을 때) -->
            <!-- 
            <div class="empty-state">
              <div class="empty-icon">📝</div>
              <div class="empty-text">아직 적립금 내역이 없습니다.</div>
            </div>
            -->
          </div>
          <div id="coupon-list" class="point-history">
            <h2 class="section-title">
              
              쿠폰 사용/지급 내역
            </h2>

            <table class="point-table">
              <thead>
                <tr>
                  <th>지급날짜</th>
                  <th>유효기간</th>
                  <th>쿠폰이름</th>
                  <th>쿠폰코드</th>
                  <th>사용여부</th>
                </tr>
              </thead>
              <tbody id="showList">
                <c:forEach var="item" items="${couponList}">
                  <tr>
                  <td>
                    <div class="point-date"><fmt:formatDate value="${item.ISSUED_DT}" pattern="yyyy-MM-dd" />
</div>
                  </td>
                  <td>
                    <div class="point-date"><fmt:formatDate value="${item.EXPIRY_DT}" pattern="yyyy-MM-dd" />
</div>
                  </td>
                  <td>
                    <div class="point-reason">${item.COUPON_NAME}</div>
                  </td>
                  <td>
                    <div class="point-reason">${item.COUPON_CODE}</div>
                  </td>
                  <td>
                    <jsp:useBean id="now" class="java.util.Date" />
                    <c:choose>
                      <c:when test="${item.IS_USED == 'Y'}">
                        <div class="point-change minus">사용완료</div>
                      </c:when>
                      <c:otherwise>
                        <c:choose>
                          <c:when test="${item.EXPIRY_DT lt now}">
                            <div class="point-change minus">기간만료</div>
                          </c:when>
                          <c:otherwise>
                            <div class="point-change plus">사용가능</div>
                          </c:otherwise>
                        </c:choose>  <!-- 이 태그가 누락되어 있었습니다 -->
                      </c:otherwise>
                    </c:choose>
                  </td>
                </tr>
                </c:forEach>
              </tbody>
            </table>

            <!-- 빈 상태 (데이터가 없을 때) -->
            <!-- 
            <div class="empty-state">
              <div class="empty-icon">📝</div>
              <div class="empty-text">아직 적립금 내역이 없습니다.</div>
            </div>
            -->
          </div>
        </div>
      </div>
    </div>
  </div>

  <div style="height: 20px"></div>
  <jsp:include page="../layout/footer.jsp" />
</body>
</html>