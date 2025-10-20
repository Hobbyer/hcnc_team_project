<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%> <%@
taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> <%@ taglib
prefix="form" uri="http://www.springframework.org/tags/form" %> <%@ taglib
prefix="ui" uri="http://egovframework.gov/ctl/ui"%> <%@ taglib prefix="spring"
uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<head>
  <jsp:include page="../layout/headertop.jsp" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>DOO.D - 마이페이지</title>
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
    rel="stylesheet"
  />
</head>
<script language="javascript">
  $(() => {
    var loginType = "${sessionScope.userInfo['MEMBER_ID']}";
    console.log(loginType);
    var orders = JSON.parse('<c:out value="${orders}" escapeXml="false"/>');
    shipCalculator(orders);
  });
  const shipCalculator = (orders) => {
    let payWait = 0;
    let shipReady = 0;
    let shipping = 0;
    let shipDone = 0;
    orders.map((res) => {
      if (res.PAYMENT_STATUS == "결제대기") {
        payWait += 1;
        return;
      }
      if (res.ORDER_COMMENT == "결제완료") {
        shipReady += 1;
        return;
      }
      if (res.ORDER_COMMENT == "배송중") {
        shipping += 1;
        return;
      }
      if (res.ORDER_COMMENT == "배송완료") {
        shipDone += 1;
        return;
      }
    });
    $("#payWait").text(payWait);
    $("#shipReady").text(shipReady);
    $("#shipping").text(shipping);
    $("#shipDone").text(shipDone);
  };
</script>
<style>
  .user-info {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .user-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(45deg, #ff9a9e, #fecfef);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: white;
    font-weight: bold;
  }

  .user-name {
    font-size: 18px;
    font-weight: 600;
    color: #2d3748;
  }

  /* 메인 콘텐츠 */
  .main-content {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 30px;
  }

  /* 사이드바 */
  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .profile-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 8px;
    padding: 30px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .profile-img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: linear-gradient(45deg, #ffecd2, #fcb69f);
    margin: 0 auto 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    color: white;
    border: 4px solid rgba(255, 255, 255, 0.8);
  }

  .profile-name {
    font-size: 24px;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 8px;
  }

  .profile-email {
    color: #718096;
    margin-bottom: 20px;
  }

  .edit-profile-btn {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.3s ease;
  }

  .edit-profile-btn:hover {
    transform: translateY(-2px);
  }

  /* 퀵 메뉴 */
  .quick-menu {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 25px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .quick-menu h3 {
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
    transition: all 0.3s ease;
    text-decoration: none;
    color: #4a5568;
  }

  .menu-item:hover {
    background: rgba(102, 126, 234, 0.1);
    transform: translateX(5px);
    color: #667eea;
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

  /* 메인 패널 */
  .main-panel {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  /* 주문 현황 */
  .order-status {
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

  .status-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  .status-item {
    text-align: center;
    padding: 20px;
    border-radius: 15px;
    background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
    cursor: pointer;
    transition: transform 0.3s ease;
  }

  .status-item:hover {
    transform: translateY(-5px);
  }

  .status-item:nth-child(2) {
    background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  }

  .status-item:nth-child(3) {
    background: linear-gradient(135deg, #d299c2 0%, #fef9d3 100%);
  }

  .status-item:nth-child(4) {
    background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%);
  }

  .status-number {
    font-size: 28px;
    font-weight: 800;
    color: white;
    margin-bottom: 8px;
  }

  .status-label {
    font-size: 14px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
  }

  /* 최근 주문 */
  .recent-orders {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .order-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-radius: 15px;
    margin-bottom: 15px;
    background: rgba(102, 126, 234, 0.05);
    border: 1px solid rgba(102, 126, 234, 0.1);
    transition: all 0.3s ease;
  }

  .order-item:hover {
    background: rgba(102, 126, 234, 0.1);
    transform: translateY(-2px);
  }

  .order-info h4 {
    color: #2d3748;
    font-weight: 600;
    margin-bottom: 5px;
  }

  .order-date {
    color: #718096;
    font-size: 14px;
  }

  .order-status-badge {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
  }

  .order-status-badge.delivered {
    background: linear-gradient(45deg, #48bb78, #38a169);
  }

  .order-status-badge.shipping {
    background: linear-gradient(45deg, #ed8936, #dd6b20);
  }

  /* 위시리스트 부분 */
  .wishlist-section {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .wishlist-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
  }

  .section-title {
    font-size: 20px;
    font-weight: 700;
    color: #2d3748;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .view-all-btn {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    border: none;
    padding: 8px 20px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.3s ease;
  }

  .view-all-btn:hover {
    transform: translateY(-2px);
  }

  /* 위시리스트 그리드 */
  .wishlist-mini-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 20px;
  }

  .wishlist-mini-item {
    position: relative;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .wishlist-mini-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  .mini-item-image {
    position: relative;
    width: 100%;
    height: 160px;
    overflow: hidden;
    background: linear-gradient(45deg, #ffecd2, #fcb69f);
  }

  .mini-item-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .wishlist-mini-item:hover .mini-item-image img {
    transform: scale(1.05);
  }

  .mini-heart-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    transition: all 0.3s ease;
    z-index: 2;
  }

  .mini-heart-btn:hover {
    transform: scale(1.1);
    background: white;
  }

  .mini-heart-btn.heart-filled {
    background: rgba(220, 6, 48, 0.1);
  }

  .mini-item-info {
    padding: 12px;
  }

  .mini-item-name {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin-bottom: 6px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.3;
    min-height: 36px;
  }

  .mini-item-price {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 8px;
  }

  .mini-current-price {
    font-size: 16px;
    font-weight: 700;
    color: #dc0630;
  }

  .mini-discount {
    background: #dc0630;
    color: white;
    padding: 2px 5px;
    font-size: 10px;
    font-weight: 700;
    border-radius: 3px;
  }

  /* 빈 위시리스트 */
  .empty-wishlist-mini {
    text-align: center;
    padding: 60px 20px;
  }

  .empty-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }

  .empty-title {
    font-size: 18px;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 8px;
  }

  .empty-subtitle {
    font-size: 14px;
    color: #718096;
  }

  /* 로딩 상태 */
  .loading-state {
    text-align: center;
    padding: 60px 20px;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 16px;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  /* 토스트 메시지 */
  .toast-message {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: white;
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    gap: 12px;
    transform: translateY(100px);
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 1000;
  }

  .toast-message.show {
    transform: translateY(0);
    opacity: 1;
  }

  .toast-message.success {
    border-left: 4px solid #48bb78;
  }

  .toast-message.error {
    border-left: 4px solid #f56565;
  }

  /* 반응형 */
  @media (max-width: 768px) {
    .wishlist-mini-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .wishlist-section {
      padding: 20px;
    }
  }

  @media (max-width: 480px) {
    .wishlist-mini-grid {
      grid-template-columns: 1fr;
    }
  }
</style>

<!-- 위시리스트 스크립트 -->
<script>
  var memberId = "user01";

  $(function () {
    loadMiniWishlist();
  });

  //로드
  var loadMiniWishlist = function () {
    var param = {
      memberId: memberId,
      category: "",
      sortType: "newest",
      limit: 6,
    };

    // 로딩 표시
    $("#miniWishlistGrid").html(
      '<div class="loading-state">' +
        '<div class="loading-spinner"></div>' +
        '<div class="empty-title">로딩 중...</div>' +
        "</div>"
    );

    $.ajax({
      url: "/selectWishlistByUser.do",
      type: "post",
      data: param,
      dataType: "json",
      success: function (res) {
        if (res.success) {
          renderMiniWishlist(res.wishlist);
        } else {
          renderMiniWishlist([]);
        }
      },
      error: function (err) {
        console.log("위시리스트 조회 실패:", err);
        renderMiniWishlist([]);
      },
    });
  };

  //마이페이지용 위시리스트 렌더링
  var renderMiniWishlist = function (wishlist) {
    var html = "";

    if (!wishlist || wishlist.length === 0) {
      html = '<div class="empty-wishlist-mini">';
      html += '<div class="empty-icon">💔</div>';
      html += '<div class="empty-title">위시리스트가 비어있습니다</div>';
      html += '<div class="empty-subtitle">마음에 드는 상품을 찜해보세요</div>';
      html += "</div>";
    } else {
      // 재고가 있는(판매중인) 상품만 필터링
      var availableList = [];
      for (var i = 0; i < wishlist.length; i++) {
        var quantity = wishlist[i].TOTAL_QUANTITY;
        if (quantity && quantity > 0) {
          availableList.push(wishlist[i]);
          if (availableList.length >= 6) {
            break;
          }
        }
      }

      // 판매중인 상품이 하나도 없는 경우
      if (availableList.length === 0) {
        html = '<div class="empty-wishlist-mini">';
        html += '<div class="empty-icon">💔</div>';
        html += '<div class="empty-title">판매중인 상품이 없습니다</div>';
        html +=
          '<div class="empty-subtitle">품절된 상품만 위시리스트에 있습니다</div>';
        html += "</div>";
      } else {
        // 판매중인 상품 최대 6개 표시
        for (var i = 0; i < availableList.length; i++) {
          var item = availableList[i];

          html +=
            '<div class="wishlist-mini-item" onclick="viewDetail(' +
            item.PRODUCT_ID +
            ')">';

          // 이미지
          html += '<div class="mini-item-image">';
          var imageUrl =
            item.IMAGE_URL ||
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=";
          html +=
            '<img src="' + imageUrl + '" alt="' + item.PRODUCT_NAME + '">';

          // 하트 버튼
          html +=
            '<button class="mini-heart-btn heart-filled" onclick="event.stopPropagation(); toggleMiniWishlist(' +
            item.PRODUCT_ID +
            ', this)">';
          html += '<span class="heart-icon">❤️</span>';
          html += "</button>";
          html += "</div>";

          // 상품 정보
          html += '<div class="mini-item-info">';
          html += '<div class="mini-item-name">' + item.PRODUCT_NAME + "</div>";
          html += '<div class="mini-item-price">';

          if (
            item.SALED_PRICE &&
            item.SALED_PRICE > 0 &&
            item.SALED_PRICE < item.PRODUCT_PRICE
          ) {
            html +=
              '<span class="mini-current-price">₩' +
              item.SALED_PRICE.toLocaleString() +
              "</span>";
            var discount = Math.round(
              ((item.PRODUCT_PRICE - item.SALED_PRICE) / item.PRODUCT_PRICE) *
                100
            );
            html += '<span class="mini-discount">-' + discount + "%</span>";
          } else {
            html +=
              '<span class="mini-current-price">₩' +
              item.PRODUCT_PRICE.toLocaleString() +
              "</span>";
          }

          html += "</div>";
          html += "</div>";
          html += "</div>";
        }
      }
    }

    $("#miniWishlistGrid").html(html);
  };

  // 위시리스트 토글 (마이페이지용)
  var toggleMiniWishlist = function (productId, heartElement) {
    var param = {
      productId: productId,
      memberId: memberId,
    };

    var originalHtml = $(heartElement).html();
    $(heartElement).html('<span style="font-size: 12px;">⏳</span>');
    $(heartElement).prop("disabled", true);

    $.ajax({
      url: "/toggleWishlist.do",
      type: "post",
      data: param,
      dataType: "json",
      success: function (res) {
        $(heartElement).prop("disabled", false);

        if (res.success) {
          var message =
            res.message ||
            (res.isWished
              ? "위시리스트에 추가되었습니다."
              : "위시리스트에서 제거되었습니다.");
          showMiniToast(message, "success");

          // 목록 새로고침
          loadMiniWishlist();
        } else {
          $(heartElement).html(originalHtml);
          var errorMessage = res.message || "처리 중 오류가 발생했습니다.";
          showMiniToast(errorMessage, "error");
        }
      },
      error: function (err) {
        $(heartElement).html(originalHtml);
        $(heartElement).prop("disabled", false);
        showMiniToast("네트워크 오류가 발생했습니다.", "error");
      },
    });
  };

  // 상세 페이지로 이동
  var viewDetail = function (productId) {
    window.location.href = "/productDetailView.do?productId=" + productId;
  };

  // 전체 위시리스트 페이지로 이동
  var goToWishlistPage = function () {
    window.location.href = "/wishView.do";
  };

  // 토스트 메시지
  var showMiniToast = function (message, type) {
    var toastClass = type || "success";
    var toastHtml =
      '<div class="toast-message ' + toastClass + '">' + message + "</div>";

    $("body").append(toastHtml);
    var toast = $(".toast-message").last();

    setTimeout(function () {
      toast.addClass("show");
    }, 100);

    setTimeout(function () {
      toast.removeClass("show");
      setTimeout(function () {
        toast.remove();
      }, 300);
    }, 3000);
  };
</script>

<body>
  <jsp:include page="../layout/header.jsp" />
  <div style="height: 20px"></div>
  <div class="container">
    <!-- 메인 콘텐츠 -->
    <div class="inner">
      <div class="main-content">
        <!-- 사이드바 -->
        <div class="sidebar">
          <!-- 프로필 카드 -->
          <div class="profile-card">
            <div class="profile-img">✏️</div>
            <div class="profile-name">${user.USER_NAME}</div>
            <div class="profile-email">${user.EMAIL_ADDR}</div>
            <button
              class="edit-profile-btn"
              type="button"
              onclick="location.href='/mypage/update.do'"
            >
              프로필 수정
            </button>
          </div>

          <!-- 퀵 메뉴 -->
          <div class="quick-menu">
            <h3><i class="fas fa-bolt"></i> 빠른 메뉴</h3>
            <a href="/orderHistory.do" class="menu-item">
              <div class="menu-icon">📦</div>
              <span>주문/배송 조회</span>
            </a>
            <a href="/wishView.do" class="menu-item">
              <div class="menu-icon">❤️</div>
              <span>위시리스트</span>
            </a>
            <a href="/mypage/point.do" class="menu-item">
              <div class="menu-icon">💳</div>
              <span>적립금/쿠폰</span>
            </a>
            <a href="/reviewControl.do" class="menu-item">
              <div class="menu-icon">📝</div>
              <span>상품 후기</span>
            </a>
            <a href="#" class="menu-item">
              <div class="menu-icon">💬</div>
              <span>1:1 문의</span>
            </a>
          </div>
        </div>

        <!-- 메인 패널 -->
        <div class="main-panel">
          <!-- 주문 현황 -->
          <div class="order-status">
            <h2 class="section-title">
              <i class="fas fa-shopping-cart"></i>
              나의 주문 현황
            </h2>
            <div class="status-grid">
              <div class="status-item">
                <div id="payWait" class="status-number">2</div>
                <div class="status-label">입금대기</div>
              </div>
              <div class="status-item">
                <div id="shipReady" class="status-number">1</div>
                <div class="status-label">배송준비</div>
              </div>
              <div class="status-item">
                <div id="shipping" class="status-number">3</div>
                <div class="status-label">배송중</div>
              </div>
              <div class="status-item">
                <div id="shipDone" class="status-number">15</div>
                <div class="status-label">배송완료</div>
              </div>
            </div>
          </div>

          <!-- 최근 주문 -->
          <div class="recent-orders">
            <h2 class="section-title">
              <i class="fas fa-clock"></i>
              최근 주문 내역
            </h2>
            <div class="order-item">
              <div class="order-info">
                <h4>모나미 153 볼펜 세트 (12색)</h4>
                <div class="order-date">2024-11-15</div>
              </div>
              <div class="order-status-badge delivered">배송완료</div>
            </div>
            <div class="order-item">
              <div class="order-info">
                <h4>코쿠요 캠퍼스 노트 A4</h4>
                <div class="order-date">2024-11-12</div>
              </div>
              <div class="order-status-badge shipping">배송중</div>
            </div>
            <div class="order-item">
              <div class="order-info">
                <h4>포스트잇 플래그 세트</h4>
                <div class="order-date">2024-11-10</div>
              </div>
              <div class="order-status-badge">결제완료</div>
            </div>
          </div>

          <!-- 위시리스트 -->
          <div class="wishlist-section">
            <div class="wishlist-header">
              <h2 class="section-title">
                <i class="fas fa-heart"></i>
                위시 리스트
              </h2>
              <button class="view-all-btn" onclick="goToWishlistPage()">
                전체보기
              </button>
            </div>
            <div class="wishlist-mini-grid" id="miniWishlistGrid">
              <!-- JavaScript로 동적 렌더링 -->
              <div class="loading-state">
                <div class="loading-spinner"></div>
                <div class="empty-title">로딩 중...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div style="height: 20px"></div>
  <jsp:include page="../layout/footer.jsp" />
</body>
