<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%> <%@
taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>

<script>
  var audioPath = '<c:url value="/sounds/bell.mp3" />';
  var audio = new Audio(audioPath);

  const confirmLogout = () => {
    if (confirm("정말 로그아웃 하시겠습니까?")) {
      return true; // true 반환 → a 태그 href 실행 (로그아웃 컨트롤러 이동)
    } else {
      return false; // false 반환 → a 태그 이동 취소
    }
  };
  //페이지 로드 시 실행
  $(document).ready(function () {
    //웹소켓 연결 함수 실행 밑에 정의 되어있음
    connectWebSocket();

    // 2. 미읽음 알림 개수 조회 함수 실행 밑에 정의 되어있음
    loadUnreadCount();
  });

  // 웹소켓 연결
  let websocket; // 웹소켓이라는 함수 생성
  //웹소켓 연결 함수 생성
  function connectWebSocket() {
    const userId = "${userInfo.MEMBER_ID}"; // 또는 ${userInfo['MEMBER_ID']}
    const wsUrl = "ws://localhost:8080/notification/" + userId; //wsURL 생성

    // 위에 만들어 놓은 웹소켓 함수에 새로 만든 웹소켓 넣음
    websocket = new WebSocket(wsUrl);

    //웹소켓 열기 @OnOpen이라는 함수
    websocket.onopen = function () {
      console.log("웹소켓 연결됨");
    };

    //웹소켓 메세지 보내기
    websocket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      console.log("알림 수신:", data);

      // 실시간 알림 받으면 배지 개수 +1
      loadUnreadCount();

      // 알림 토스트 표시
      showToast(data.message);
    };

    //웹소켓 에러시
    websocket.onerror = function (error) {
      console.error("웹소켓 에러:", error);
    };

    //웹소켓 닫을 때
    websocket.onclose = function () {
      console.log("웹소켓 연결 종료");
      // 3초 후 재연결
      setTimeout(connectWebSocket, 3000);
    };
  }

  // 미읽음 개수 조회 ajax
  function loadUnreadCount() {
    $.ajax({
      url: "/notification/unreadCount.do",
      type: "GET",
      success: function (response) {
        const count = response.unreadCount;
        const badge = $("#notificationBadge");

        if (count > 0) {
          badge.text(count > 99 ? "99+" : count);
          badge.show(); // 빨간 점 표시
        } else {
          badge.hide(); // 빨간 점 숨김
        }
      },
      error: function () {
        console.error("미읽음 개수 조회 실패");
      },
    });
  }

  // 종 아이콘 클릭 - 알림 팝업 열기/닫기 (***수정된 부분***)
  function toggleNotificationPopup() {
    const popup = $("#notificationPopup");

    // 팝업이 열려있는지 확인 (클래스 'open'으로 판단)
    if (popup.hasClass("open")) {
      // 닫을 때: 'open' 클래스 제거
      popup.removeClass("open");
    } else {
      // 열 때: 알림 목록 조회 후 'open' 클래스 추가
      loadNotificationList();

      // 작은 딜레이 후 클래스를 추가하여 transition 효과가 적용되게 함
      setTimeout(() => {
        popup.addClass("open");
      }, 10);
    }
  }

  // 알림 목록 조회
  function loadNotificationList() {
    $.ajax({
      url: "/notification/list.do",
      type: "GET",
      success: function (response) {
        const list = response.list;
        const listHtml = [];

        if (list.length === 0) {
          listHtml.push(
            '<div class="notification-body">알림이 없습니다.</div>'
          );
        } else {
          list.forEach(function (item) {
            // DB에서 NOTI_ID와 READ_YN도 가져와야 여기서 에러가 해결됩니다.
            // 현재 쿼리에서는 NOTI_MESSAGE만 가져오고 있으므로, 백엔드 쿼리도 수정이 필요합니다.
            // (사진에서 undefined가 뜬 이유: item.notiId와 item.regDate, item.readYn이 없기 때문)
            const notiId = item.NOTI_ID || "0"; //
            const notiMessage = item.NOTI_MESSAGE || "알림 메시지 없음";
            const regDate = item.REG_DATE || ""; // 알림 등록일
            const readYn = item.READ_YN || "N"; // 읽음 여부

            const readClass = readYn === "Y" ? "read" : "unread";

            listHtml.push(
              '<div class="notification_item ' +
                readClass +
                '" data-noti-id="' +
                notiId +
                '">'
            );
            listHtml.push(
              '  <div class="noti_message">' + notiMessage + "</div>"
            );
            listHtml.push('  <div class="noti_date">' + regDate + "</div>");

            if (readYn === "N") {
              listHtml.push(
                '  <button class="btn btn-sm btn-primary" onclick="markAsRead(\'' +
                  notiId +
                  "')\">읽음</button>"
              );
            }

            listHtml.push("</div>");
          });
        }

        $("#notificationList").html(listHtml.join(""));
      },
      error: function () {
        console.error("알림 목록 조회 실패");
      },
    });
  }

  // 읽음 처리 업데이트 및 애니메이션 적용 (***수정된 부분***)
  function markAsRead(notiId) {
    // 알림 항목 선택 (★ 이 부분을 추가했습니다!)
    const $item = $('[data-noti-id="' + notiId + '"]');

    $.ajax({
      url: "/notification/markAsRead.do",
      type: "POST",

      data: { notiId: notiId }, // key-value 형태로 전송
      success: function () {
        // 읽음 처리 성공

        // 1. 읽음 상태 클래스 추가 및 버튼 제거 (즉시 반영)
        $item.addClass("read").removeClass("unread");
        $item.find("button").remove();

        // 2. 애니메이션 클래스 추가 (사라지는 애니메이션 시작)
        $item.addClass("fade-out");

        // 3. 애니메이션 종료 후 요소 제거
        // CSS transition 시간(0.5초)보다 약간 길게 설정 (750ms)
        setTimeout(function () {
          $item.remove(); // DOM에서 알림 항목 제거

          // 알림 목록이 비었는지 확인하고 "알림이 없습니다." 메시지를 표시
          const $listContainer = $("#notificationList");
          // 현재 보이는 알림 항목의 개수를 확인
          if ($listContainer.children(".notification_item").length === 0) {
            // 알림이 모두 사라진 후 "알림이 없습니다." 메시지 표시
            $listContainer.html(
              '<div class="notification-body">알림이 없습니다.</div>'
            );
          }
        }, 750); // 0.75초 후 실행

        // 4. 배지 개수 갱신
        loadUnreadCount();
      },
      error: function () {
        alert("읽음 처리 실패");
      },
    });
  }

  // 팝업 닫기 (***수정된 부분***)
  function closeNotificationPopup() {
    $("#notificationPopup").removeClass("open");
  }

  // 토스트 알림
  function showToast(message) {
    // Bootstrap Toast 사용
    audio.play(); // 알림

    const toastHtml =
      '<div class="toast" role="alert">' +
      '  <div class="toast-body">' +
      message +
      "</div>" +
      "</div>";

    $("body").append(toastHtml);
    // 부트스트랩 토스트가 작동하려면 해당 라이브러리(bootstrap.js)가 로드되어 있어야 합니다.
    $(".toast").toast("show");
  }
</script>
<script>
  function validateSearch(form) {
    var searchInput = $("#globalSearch").val();
    var value = searchInput.trim(); // 앞뒤 공백 제거
    if (value.length === 0) {
      //alert("검색어를 입력해 주세요.");
      return false; // 'return false'는 폼 제출을 막습니다.
    }
    var encoding = encodeURIComponent(value);
    $("#postValue").val(encoding);
    return true; // 값이 있으면 폼 제출 진행
  }
</script>
<header class="header header_area">
  <style>
    /* 알림 항목이 사라질 때 사용할 애니메이션 클래스 */
    .notification_item.fade-out {
      opacity: 0 !important; /* 투명도를 0으로 만들어 사라지게 함 */
      transform: translateX(
        100%
      ); /* 요소를 오른쪽으로 100% 이동 (오른쪽으로 슬라이드 아웃) */
      height: 0 !important; /* 높이를 0으로 만들어 공간이 닫히게 함 */
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      margin: 0 !important;
      border-bottom: none !important;
      transition: opacity 0.5s ease-out, transform 0.5s ease-out,
        height 0.5s 0.2s ease-out,
        /* 높이 변화는 약간 늦게 시작 */ padding 0.5s 0.2s ease-out;
    }
    /* 기존 .notification_item에도 트랜지션을 유지합니다. */
    .notification_item {
      display: flex; /* Flexbox 사용 */
      justify-content: space-between; /* 내용과 버튼을 양 끝으로 정렬 */
      align-items: center; /* 세로 중앙 정렬 */
      padding: 15px;
      border-bottom: 1px solid #eee;
      cursor: pointer;
      /* 트랜지션 유지 및 추가 */
      transition: opacity 0.2s, background-color 0.2s, transform 0.2s,
        height 0.2s, padding 0.2s;
    }
    /* ... 나머지 CSS 코드는 변경 없음 ... */

    .notification_area {
      position: relative;
      display: flex;
      justify-content: flex-end;
    }

    .btn_notification {
      position: relative;
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
    }

    .btn_notification .badge {
      position: absolute;
      top: -5px;
      right: -5px;
      min-width: 18px;
      height: 18px;
      padding: 2px 6px;
      font-size: 11px;
      border-radius: 9px;
    }

    /* 알림 팝업 스타일 (***수정된 부분***) */
    .notification_popup {
      position: absolute;
      top: 50px;
      right: 0;
      width: 350px;
      /* 초기 상태: 높이 0, 투명도 0 */
      max-height: 0;
      opacity: 0;
      overflow: hidden; /* 슬라이드 시 내용 숨김 */
      /* transition으로 0.2초 애니메이션 적용 */
      transition: max-height 0.6s ease-in-out, opacity 0.2s ease-out;

      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 1100;
      /* display:none; 대신 CSS로 제어합니다. */
    }

    /* 팝업이 열렸을 때 적용되는 스타일 */
    .notification_popup.open {
      max-height: 500px; /* 충분히 큰 높이로 슬라이드 다운 */
      opacity: 1;
      z-index: 1100;
    }

    .popup_header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      border-bottom: 1px solid #eee;
    }

    .popup_header h5 {
      margin: 0;
    }

    .popup_header button {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
    }

    .popup_body {
      max-height: 400px;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .notification-body {
      padding: 15px; /* 내부 여백 */
      text-align: left; /* 텍스트 왼쪽 정렬 (이미지 참조) */
      color: #666; /* 텍스트 색상 */
      font-size: 1em; /* 텍스트 크기 */
      /* min-height를 줘서 메시지 한 줄이더라도 적절한 높이를 유지 */
      min-height: 40px; /* 팝업 본문의 최소 높이 (이미지 참조) */
      display: flex; /* 텍스트 중앙 정렬을 위해 flex 사용 */
      align-items: center; /* 세로 중앙 정렬 */
    }

    .notification_item button {
      background-color: #ff3333; /* 빨간색 배경 */
      color: white; /* 흰색 글씨 */
      border: 1px solid #ff3333; /* 빨간색 테두리 */
      border-radius: 5px; /* 둥근 모서리 */
      padding: 5px 10px; /* 내부 여백 */
      font-size: 13px; /* 글자 크기 */
      cursor: pointer;
      transition: background-color 0.2s ease; /* 호버 시 부드러운 전환 */

      /* 필요한 경우 위치 조정 */
      margin-left: 10px; /* 메시지와의 간격 */
      float: right; /* 오른쪽에 배치 */
    }

    .notification_item button:hover {
      background-color: #e60000; /* 호버 시 더 어두운 빨간색 */
      border-color: #e60000;
    }

    /* 알림 항목 호버 효과 및 기존 unread 배경색 제거 */
    .notification_item.unread {
      /* background-color: #f0f8ff; /* 기존 라이트블루 제거 */
      font-weight: bold;
    }

    .notification_item.read {
      background-color: white;
      opacity: 0.7;
    }

    /* 호버 시 옅은 분홍색 배경 (Image 3의 색상) */
    .notification_item:hover {
      background-color: rgb(255, 240, 240); /* 옅은 분홍색 */
    }

    /* 호버 시 읽음 상태의 투명도 조절 */
    .notification_item.read:hover {
      opacity: 1; /* 읽음 상태에서도 호버 시 투명도 1로 */
    }

    /* 알림 항목 내부 내용 정렬 */
    /* .notification_item 스타일은 위에 애니메이션 클래스와 함께 재정의되어 있습니다. */

    .notification_item.fade-out {
      opacity: 0 !important; /* 투명도를 0으로 만들어 사라지게 함 */
      transform: translateX(
        100%
      ); /* 요소를 오른쪽으로 100% 이동 (오른쪽으로 슬라이드 아웃) */
      height: 0 !important; /* 높이를 0으로 만들어 공간이 닫히게 함 */
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      margin: 0 !important;
      border-bottom: none !important;
      transition: opacity 0.5s ease-out, transform 0.5s ease-out,
        height 0.5s 0.2s ease-out,
        /* 높이 변화는 약간 늦게 시작 */ padding 0.5s 0.2s ease-out;
    }

    .noti_message {
      flex-grow: 1; /* 메시지가 가능한 많은 공간을 차지 */
      margin-bottom: 0; /* flexbox 사용 시 기존 margin-bottom 제거 */
    }

    .noti_date {
      font-size: 12px;
      color: #999;
      margin-right: 10px; /* 날짜와 버튼 사이 간격 */
      white-space: nowrap; /* 날짜가 한 줄로 유지되도록 */
    }
    li a {
      font-family: "Pretendard", -apple-system, BlinkMacSystemFont,
        "Malgun Gothic", "Dotum", "돋움", "Apple SD Gothic Neo", Helvetica,
        Sans-serif;
    }
    .header_menu_list li a {
      font-size: 12px;
      color: #555;
      margin: 3px 14px;
    }
    .header_menu_list li a:hover {
      text-decoration: none;
      border-bottom: 1px solid transparent;
      transition: border-color 0.3s ease;
      border-bottom-color: #222;
    }
  </style>

  <div class="header_top_area">
    <div class="inner">
      <div class="flex ju-end">
        <ul class="header_menu_list flex">
          <c:if test="${userInfo == null}">
            <li><a href="/login.do?type=list">비회원 주문조회</a></li>
            <li><a href="/login.do">로그인</a></li>
            <li><a href="/sign.do">회원가입</a></li>
          </c:if>

          <c:if test="${userInfo != null}">
            <li>
              <a href="/mypage/home.do">마이페이지</a>
            </li>
            <li>
              <a href="/logoutByUser.do" onclick="return confirmLogout()"
                >로그아웃</a
              >
            </li>

            <c:if test="${userInfo['MEMBER_TYPE'] == 'admin'}">
              <li><a href="/admin">관리자페이지 바로가기</a></li>
            </c:if>
          </c:if>
        </ul>
      </div>
    </div>
  </div>

  <div class="header_main_area">
    <div class="inner flex ai-center">
      <div style="flex: 1">
        <h1 class="logo"><a href="/"></a></h1>
      </div>

      <div class="header_search_area flex" style="flex: 1">
        <form
          action="/search.do"
          class="flex"
          onsubmit="return validateSearch()"
        >
          <input
            id="postValue"
            type="hidden"
            name="keyword"
            placeholder="검색어를 입력하세요"
          />
          <input
            id="globalSearch"
            type="text"
            placeholder="검색어를 입력하세요"
          />
          <button class="btn btn_search" type="submit">
            <i class="xi xi-search"></i>
          </button>
        </form>
      </div>

      <div style="flex: 1; align-items: flex-end">
        <c:if test="${userInfo != null}">
          <c:if test="${userInfo['MEMBER_TYPE'] == 'user'}">
            <div class="notification_area">
              <button
                class="btn_notification"
                onclick="toggleNotificationPopup()"
              >
                <i class="bi bi-bell"></i>

                <span
                  class="badge bg-danger"
                  id="notificationBadge"
                  style="display: none"
                  >0</span
                >
              </button>

              <div class="notification_popup" id="notificationPopup">
                <div class="popup_header">
                  <h5>알림</h5>
                  <button onclick="closeNotificationPopup()">×</button>
                </div>
                <div class="popup_body" id="notificationList"></div>
              </div>
            </div>
          </c:if>
        </c:if>
      </div>
    </div>
  </div>
</header>
<jsp:include page="./menu.jsp" />
