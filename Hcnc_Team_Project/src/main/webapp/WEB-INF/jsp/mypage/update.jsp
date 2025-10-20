<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%> <%@
taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DOO.D 프로필 수정</title>
    <jsp:include page="../layout/headertop.jsp" />
    <script src="../../../common/utils.js"></script>
    <script src="../../../common/regex.js"></script>
    <link
      rel="stylesheet"
      href="//cdn.jsdelivr.net/xeicon/2.3.0/xeicon.min.css"
    />
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <link
      rel="stylesheet"
      href="http://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css"
    />
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  </head>
  <script>
    $(() => {
      init();
      let user = JSON.parse('<c:out value="${user}" escapeXml="false"/>');
      $("#name").val(user.USER_NAME);
      $("#email").val(user.EMAIL_ADDR);
      $("#loginType").val(user.LOGIN_TYPE);
      if (user.LOGIN_TYPE == "KAKAO") {
        $("#security-section").css("display", "none");
      }
      let timestamp = user.BIRTH;
      let date = new Date(timestamp);
      let formatted =
        date.getFullYear() +
        "-" +
        String(date.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(date.getDate()).padStart(2, "0");
      $("#birth").val(formatted);
      $("#phone").val(phoneFormat(user.PHONE_NUMBER));
      $("#originEmail").val(user.EMAIL_ADDR);
      $("#birth").datepicker({
        dateFormat: "yy-mm-dd",
        prevText: "이전 달",
        nextText: "다음 달",
        monthNames: [
          "1월",
          "2월",
          "3월",
          "4월",
          "5월",
          "6월",
          "7월",
          "8월",
          "9월",
          "10월",
          "11월",
          "12월",
        ],
        monthNamesShort: [
          "1월",
          "2월",
          "3월",
          "4월",
          "5월",
          "6월",
          "7월",
          "8월",
          "9월",
          "10월",
          "11월",
          "12월",
        ],
        dayNames: ["일", "월", "화", "수", "목", "금", "토"],
        dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
        dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
        showMonthAfterYear: true,
        changeMonth: true, // 월 선택 허용
        changeYear: true, // 연도 선택 허용
        yearRange: "-100:+0",
        onChangeMonthYear: function (year, month, inst) {
          // 연도 select 옵션에 "년" 붙이기
          $(inst.dpDiv)
            .find(".ui-datepicker-year option")
            .each(function () {
              const val = $(this).val();
              $(this).text(val + "년");
            });
        },
        beforeShow: function (input, inst) {
          setTimeout(function () {
            $(inst.dpDiv)
              .find(".ui-datepicker-year option")
              .each(function () {
                const val = $(this).val();
                $(this).text(val + "년");
              });
          }, 0);
        },
      });
      $("#phone").on("input", function () {
        let num = $(this)
          .val()
          .replace(/[^0-9]/g, ""); // 숫자만 남김
        if (num.length < 4) {
          $(this).val(num);
        } else if (num.length < 7) {
          $(this).val(num.substr(0, 3) + "-" + num.substr(3));
        } else if (num.length <= 11) {
          $(this).val(
            num.substr(0, 3) + "-" + num.substr(3, 4) + "-" + num.substr(7)
          );
        } else {
          $(this).val(
            num.substr(0, 3) + "-" + num.substr(3, 4) + "-" + num.substr(7, 4)
          );
        }
      });
    });
    const phoneFormat = (phone) => {
      let num = phone.replace(/[^0-9]/g, ""); // 숫자만 남김
      if (num.length <= 11) {
        num = num.substr(0, 3) + "-" + num.substr(3, 4) + "-" + num.substr(7);
      } else {
        num =
          num.substr(0, 3) + "-" + num.substr(3, 4) + "-" + num.substr(7, 4);
      }
      return num;
    };
    const updateUser = () => {
      const email = $("#email").val().trim();
      const name = $("#name").val().trim();
      const birth = $("#birth").val().trim();
      const loginType = $("#loginType").val().trim();
      const phone = $("#phone").val().replace(/-/gi, "").trim();
      const originEmail = $("#originEmail").val().trim();
      const originPassword = $("#originPassword").val().trim();
      const newPassword = $("#newPassword").val().trim();
      const newPasswordCheck = $("#newPasswordCheck").val().trim();
      if (email !== originEmail) {
        if (sessionStorage.getItem("to") !== email) {
          alert(
            "입력된 이메일과 요청한 이메일이 다릅니다. 인증번호를 다시 요청해주세요."
          );
          init();
          return;
        }
        if (sessionStorage.getItem("mailFlag") !== "pass") {
          alert("이메일 인증을 완료해주세요.");
          return;
        }
      }
      if (name.length < 2) {
        alert("이름을 2자이상 입력해주세요");
      }
      if (!phoneRegex.test(phone)) {
        alert("올바르지 않은 휴대폰 번호입니다. 휴대폰번호를 확인해주세요.");
        return;
      }
      if (originPassword != "") {
        if (newPasswordCheck === "") {
          alert("비밀번호확인을 입력해주세요.");
          return;
        }
        if (containsSqlKeywords(originPassword)) {
          alert("기존 비밀번호형식을 확인해주세요.");
          return;
        }
        if (containsSqlKeywords(newPassword)) {
          alert("신규 비밀번호형식을 확인해주세요.");
          return;
        }
        if (!passwordRegex.test(originPassword)) {
          alert(
            "기존 비밀번호를 8자리이상 영문,숫자,특수문자 1개이상 포함시켜주세요."
          );
          return;
        }
        if (!passwordRegex.test(newPassword)) {
          alert(
            "신규 비밀번호를 8자리이상 영문,숫자,특수문자 1개이상 포함시켜주세요."
          );
          return;
        }
        if (newPassword !== newPasswordCheck) {
          alert("비밀번호와 비밀번호확인란이 일치하지않습니다.");
          return;
        }
      }
      const param = {
        email: email,
        name: name,
        birth: birth,
        phone: phone,
        password: newPassword,
      };
      ajaxUtil(param, "updateMemberByUser.do", (res) => {
        console.log(res);
        if (res.status == 200) {
          alert("회원정보가 변경되었습니다.");
          location.href = "/mypage/update.do";
        }
      });
    };
    const init = () => {
      sessionStorage.setItem("mailCode", "");
      sessionStorage.setItem("mailFlag", "");
      sessionStorage.setItem("to", "");
    };
    let verificationSent = false;

    const emailChkByUser = () => {
      const email = $("#email").val().trim();
      const param = { to: email, type: "sign" };
      const verifyBtn = event.target;
      verifyBtn.disabled = true;
      verifyBtn.textContent = "발송중...";
      sendMailByUser(param, (response) => {
        if (response.status === 200) {
          alert("인증번호를 발송하였습니다");
          document.getElementById("verificationCodeGroup").style.display =
            "block";
          verifyBtn.textContent = "발송완료";
          verificationSent = true;
          sessionStorage.setItem("mailCode", response.mailCode);
          sessionStorage.setItem("to", email);
        }
        if (response.status === 409) {
          alert("이미 존재하는 이메일입니다.");
          init();
          verifyBtn.disabled = false;
          verifyBtn.textContent = "발송하기";
        }
      });
    };

    const emailCodeCheck = () => {
      const email = $("#email").val().trim();
      const emailCode = $("#emailCode").val().trim();
      const param = { to: email, code: emailCode, type: "sign" };
      if (sessionStorage.getItem("to") !== email) {
        alert(
          "입력된 이메일과 요청한 이메일이 다릅니다. 인증번호를 다시 요청해주세요."
        );
        init();
        return;
      }
      const verifyBtn = event.target;
      verifyBtn.disabled = true;
      verifyBtn.textContent = "확인중...";
      mailCodeCheckByUser(param, (response) => {
        console.log(JSON.stringify(response));
        if (response.result === true) {
          alert("이메일 인증이 완료되었습니다.");
          sessionStorage.setItem("mailFlag", "pass");
          $("#email").prop("readonly", true);
          $("#emailCode").prop("readonly", true);
          verifyBtn.textContent = "인증완료";
          verifyBtn.style.background = "#48bb78";
          codeInput.disabled = true;
        } else {
          alert("인증에 실패하였습니다. 인증번호를 확인해주세요.");
          verifyBtn.disabled = false;
          verifyBtn.textContent = "인증하기";
        }
      });
    };
    const updateWithDrawByUser = () => {
      if (confirm("회원탈퇴하시겠습니까? 해당작업은 돌이킬수없습니다.")) {
        const param = {};
        ajaxUtil(param, "updateWithDrawByUser.do", (res) => {
          if (res.status == 200) {
            alert("회원탈퇴되었습니다.");
            location.href = "/login.do";
            history.deleteAll();
          }
          if (res.status == 400) {
            alert("삭제에 실패하였습니다.");
          }
          if (res.status == 404) {
            alert("세션정보를 찾을수없습니다. 다시 로그인해주세요");
          }
        });
      }
    };
  </script>
  <style>
    /*데이트피커 커스텀*/
    .i_datepicker input {
      cursor: pointer;
    }
    .ui-datepicker select.ui-datepicker-month,
    .ui-datepicker select.ui-datepicker-year {
      border: none;
      background: rgba(234, 14, 37, 0.2); /* 배경색 넣어주기 */
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: bold;
      text-align: center; /* 텍스트 가운데 정렬 */
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
    }
    .i_datepicker img {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      width: 16px;
      height: 16px;
      background: url(../img/ico_datepicker.svg) no-repeat center/cover;
    }
    #ui-datepicker-div {
      z-index: 9 !important;
    }
    .ui-widget-header {
      border: 0px solid #dddddd;
      background: #fff;
    }

    .ui-datepicker-calendar > thead > tr > th {
      font-size: 14px !important;
    }

    .ui-datepicker .ui-datepicker-header {
      position: relative;
      padding: 10px 0;
    }

    .ui-state-default,
    .ui-widget-content .ui-state-default,
    .ui-widget-header .ui-state-default,
    .ui-button,
    html .ui-button.ui-state-disabled:hover,
    html .ui-button.ui-state-disabled:active {
      border: 0px solid #c5c5c5;
      background-color: transparent;
      font-weight: normal;
      color: #454545;
      text-align: center;
    }

    .ui-datepicker .ui-datepicker-title {
      margin: 0 0em;
      line-height: 16px;
      text-align: center;
      font-size: 14px;
      padding: 0px;
      font-weight: bold;
    }

    .ui-datepicker {
      display: none;
      background-color: #fff;
      border-radius: 4px;
      margin-top: 10px;
      margin-left: 0px;
      margin-right: 0px;
      padding: 20px;
      padding-bottom: 10px;
      width: 300px;
      box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.1);
    }

    .ui-widget.ui-widget-content {
      border: 1px solid #eee;
    }

    #datepicker:focus > .ui-datepicker {
      display: block;
    }

    .ui-datepicker-prev,
    .ui-datepicker-next {
      display: none;
      cursor: pointer;
    }

    .ui-datepicker-next {
      float: right;
    }

    .ui-state-disabled {
      cursor: auto;
      color: hsla(0, 0%, 80%, 1);
    }

    .ui-datepicker-title {
      text-align: center;
      padding: 10px;
      font-weight: 100;
      font-size: 20px;
    }

    .ui-datepicker-calendar {
      width: 100%;
    }

    .ui-datepicker-calendar > thead > tr > th {
      padding: 5px;
      font-size: 14px;
      font-weight: 400;
    }

    .ui-datepicker-calendar > tbody > tr > td > a {
      color: #000;
      font-size: 14px !important;
      font-weight: bold !important;
      text-decoration: none;
    }

    .ui-datepicker-calendar > tbody > tr > .ui-state-disabled:hover {
      cursor: auto;
      background-color: #fff;
    }

    .ui-datepicker-calendar > tbody > tr > td {
      border-radius: 100%;
      width: 44px;
      height: 30px;
      cursor: pointer;
      padding: 5px;
      font-weight: 100;
      text-align: center;
      font-size: 16px;
    }

    .ui-datepicker-calendar > tbody > tr > td:hover {
      background-color: transparent;
      opacity: 0.6;
    }

    .ui-state-hover,
    .ui-widget-content .ui-state-hover,
    .ui-widget-header .ui-state-hover,
    .ui-state-focus,
    .ui-widget-content .ui-state-focus,
    .ui-widget-header .ui-state-focus,
    .ui-button:hover,
    .ui-button:focus {
      border: 0px solid #cccccc;
      background-color: transparent;
      font-weight: normal;
      color: #2b2b2b;
    }
    .ui-datepicker-calendar > tbody > tr > td:first-child a {
      color: red !important;
    }

    .ui-datepicker-calendar > tbody > tr > td:last-child a {
      color: #0099ff !important;
    }

    .ui-datepicker-calendar > thead > tr > th:first-child {
      color: red !important;
    }

    .ui-datepicker-calendar > thead > tr > th:last-child {
      color: #0099ff !important;
    }

    .ui-state-highlight,
    .ui-widget-content .ui-state-highlight,
    .ui-widget-header .ui-state-highlight {
      border: 0px;
      background: #f1f1f1;
      border-radius: 50%;
      padding-top: 7px;
      padding-bottom: 8px;
    }

    .inp {
      padding: 10px 10px;
      background-color: #f1f1f1;
      border-radius: 4px;
      border: 0px;
    }
  </style>
  <style>
    .page-header {
      text-align: center;
      margin-bottom: 40px;
    }

    .page-title {
      font-size: 28px;
      font-weight: 700;
      color: #2d3748;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    .page-subtitle {
      color: #718096;
      font-size: 14px;
    }

    .profile-section {
      margin-bottom: 40px;
    }

    .form-section {
      display: flex;
      flex-direction: column;
      gap: 25px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .form-label {
      font-weight: 600;
      color: #2d3748;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .required {
      color: #e53e3e;
    }

    .form-input {
      padding: 15px 20px;
      border: 2px solid rgba(102, 126, 234, 0.1);
      border-radius: 12px;
      font-size: 16px;
      transition: all 0.3s ease;
      background: white;
    }

    .form-input:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .form-select {
      padding: 15px 20px;
      border: 2px solid rgba(102, 126, 234, 0.1);
      border-radius: 12px;
      font-size: 16px;
      background: white;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .form-select:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .password-group {
      display: flex;
      gap: 15px;
    }

    .password-group .form-input {
      flex: 1;
    }

    .form-help {
      font-size: 12px;
      color: #718096;
      margin-top: 5px;
    }

    .gender-options {
      display: none;
    }

    .radio-group {
      display: none;
    }

    .radio-input {
      display: none;
    }

    .radio-label {
      display: none;
    }

    .verification-group {
      display: flex;
      gap: 15px;
    }

    .verification-group .form-input {
      flex: 1;
    }

    .verify-btn {
      background: linear-gradient(45deg, #667eea, #764ba2);
      color: white;
      border: none;
      padding: 15px 25px;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      white-space: nowrap;
    }

    .verify-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }

    .verify-btn:disabled {
      background: #e2e8f0;
      color: #718096;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    .button-section {
      display: flex;
      gap: 15px;
      justify-content: center;
      margin-top: 40px;
    }

    .btn {
      padding: 15px 40px;
      border: none;
      border-radius: 25px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      min-width: 120px;
    }

    .btn-primary {
      background: linear-gradient(45deg, #667eea, #764ba2);
      color: white;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    }

    .btn-secondary {
      background: rgba(113, 128, 150, 0.1);
      color: #718096;
      border: 2px solid rgba(113, 128, 150, 0.2);
    }

    .btn-secondary:hover {
      background: rgba(113, 128, 150, 0.2);
      transform: translateY(-1px);
    }

    .security-section {
      background: rgba(102, 126, 234, 0.05);
      border-radius: 15px;
      padding: 25px;
      margin: 30px 0;
      border: 1px solid rgba(102, 126, 234, 0.1);
    }

    .section-title {
      font-size: 18px;
      font-weight: 700;
      color: #2d3748;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    /* 반응형 */
    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }

      .button-section {
        flex-direction: column;
        align-items: center;
      }

      .btn {
        width: 100%;
        max-width: 300px;
      }

      .password-group,
      .verification-group {
        flex-direction: column;
      }
    }

    @media (max-width: 480px) {
      body {
        padding: 10px;
      }

      .inner {
        padding: 20px;
      }

      .profile-img {
        width: 120px;
        height: 120px;
        font-size: 48px;
      }
    }
  </style>
  <body>
    <jsp:include page="../layout/header.jsp" />
    <div style="height: 20px"></div>
    <div class="container">
      <div class="inner" style="width: 860px">
        <!-- 페이지 헤더 -->
        <div class="page-header">
          <h1 class="page-title">
            <span>⚙️</span>
            프로필 수정
          </h1>
          <p class="page-subtitle">회원 정보를 안전하게 관리하세요</p>
        </div>

        <!-- 프로필 섹션 -->
        <div class="profile-section">
          <div class="form-section">
            <div class="form-group">
              <label class="form-label">
                이름 <span class="required">*</span>
              </label>
              <input
                id="name"
                type="text"
                class="form-input"
                placeholder="이름을 입력하세요"
                maxlength="30"
              />
            </div>

            <div class="form-group">
              <label class="form-label">
                이메일 <span class="required">*</span>
              </label>
              <div class="verification-group">
                <input
                  id="email"
                  type="email"
                  class="form-input"
                  placeholder="이메일을 입력하세요"
                />
                <button
                  type="button"
                  class="verify-btn"
                  onclick="emailChkByUser()"
                >
                  인증번호 받기
                </button>
              </div>
            </div>

            <div
              class="form-group"
              id="verificationCodeGroup"
              style="display: none"
            >
              <label class="form-label">
                인증번호 <span class="required">*</span>
              </label>
              <div class="verification-group">
                <input
                  id="emailCode"
                  type="text"
                  class="form-input"
                  placeholder="인증번호를 입력하세요"
                  maxlength="6"
                />
                <button
                  type="button"
                  class="verify-btn"
                  onclick="emailCodeCheck()"
                >
                  인증하기
                </button>
              </div>
              <div class="form-help">
                이메일로 발송된 6자리 인증번호를 입력하세요.
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">생일</label>
                <input
                  name="birth"
                  type="date"
                  class="form-input"
                  id="birth"
                  maxlength="8"
                  readonly
                />
              </div>
              <div class="form-group">
                <label class="form-label">휴대폰번호</label>
                <input
                  id="phone"
                  type="tel"
                  class="form-input"
                  placeholder="010-0000-0000"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 보안 섹션 -->
        <div id="security-section" class="security-section">
          <h3 class="section-title">
            <span>🔒</span>
            비밀번호 변경
          </h3>
          <div class="form-section">
            <div class="form-group">
              <label class="form-label">현재 비밀번호</label>
              <input
                id="originPassword"
                type="password"
                class="form-input"
                placeholder="현재 비밀번호를 입력하세요"
              />
            </div>

            <div class="password-group">
              <div class="form-group" style="flex: 1">
                <label class="form-label">신규 비밀번호</label>
                <input
                  type="password"
                  id="newPassword"
                  class="form-input"
                  placeholder="신규 비밀번호를 입력하세요"
                />
                <div class="form-help">8자 이상, 영문/숫자/특수문자 조합</div>
              </div>
              <div class="form-group" style="flex: 1">
                <label class="form-label">신규 비밀번호 확인</label>
                <input
                  type="password"
                  id="newPasswordCheck"
                  class="form-input"
                  placeholder="신규 비밀번호를 다시 입력하세요"
                />
                <div class="form-help">비밀번호 한번 더 입력</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 버튼 섹션 -->
        <div class="button-section" style="justify-content: space-between">
          <div style="font-size: 12px; font-weight: 400"></div>
          <div>
            <button class="btn btn-primary" onclick="updateUser()">
              변경사항 저장
            </button>
            <button class="btn btn-secondary" onclick="goBack()">취소</button>
          </div>
          <div
            style="
              margin-top: auto;
              font-size: 12px;
              font-weight: 400;
              text-decoration: underline;
            "
            onclick="updateWithDrawByUser()"
          >
            회원탈퇴
          </div>
        </div>
      </div>
    </div>
    <script></script>
    <div style="height: 20px"></div>
    <input id="originEmail" type="hidden" />
    <input id="loginType" type="hidden" />
    <jsp:include page="../layout/footer.jsp" />
    <script>
      function verifyCode() {
        const codeInput = document.querySelector(
          "#verificationCodeGroup input"
        );
        const code = codeInput.value.trim();

        if (!code) {
          alert("인증번호를 입력해주세요.");
          return;
        }

        if (code.length !== 6) {
          alert("6자리 인증번호를 입력해주세요.");
          return;
        }

        // 인증 시뮬레이션
        const verifyBtn = event.target;
        verifyBtn.disabled = true;
        verifyBtn.textContent = "확인중...";

        setTimeout(() => {
          alert("이메일 인증이 완료되었습니다.");
          verifyBtn.textContent = "인증완료";
          verifyBtn.style.background = "#48bb78";
          codeInput.disabled = true;

          // 타이머 정리
          if (verificationTimer) {
            clearInterval(verificationTimer);
          }
        }, 1000);
      }

      function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }

      function saveProfile() {
        // 폼 유효성 검사
        const name = document.querySelector('input[type="text"]').value;
        const email = document.querySelector('input[type="email"]').value;

        if (!name.trim()) {
          alert("이름을 입력해주세요.");
          return;
        }

        if (!email.trim()) {
          alert("이메일을 입력해주세요.");
          return;
        }

        // 비밀번호 변경 시 확인
        const currentPassword =
          document.getElementById("currentPassword").value;
        const newPassword = document.getElementById("newPassword").value;
        const confirmPassword =
          document.getElementById("confirmPassword").value;

        if (newPassword && newPassword !== confirmPassword) {
          alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
          return;
        }

        if (newPassword && newPassword.length < 8) {
          alert("비밀번호는 8자 이상이어야 합니다.");
          return;
        }

        // 저장 로직 (실제 구현에서는 서버로 데이터 전송)
        alert("프로필이 성공적으로 업데이트되었습니다.");

        // 마이페이지로 돌아가기
        // window.location.href = 'mypage.jsp';
      }

      function goBack() {
        if (
          confirm(
            "변경사항이 저장되지 않을 수 있습니다. 정말 취소하시겠습니까?"
          )
        ) {
          // 마이페이지로 돌아가기
          window.history.back();
        }
      }

      // 실시간 비밀번호 확인
      document
        .getElementById("confirmPassword")
        .addEventListener("input", function () {
          const newPassword = document.getElementById("newPassword").value;
          const confirmPassword = this.value;

          if (confirmPassword && newPassword !== confirmPassword) {
            this.style.borderColor = "#e53e3e";
          } else {
            this.style.borderColor = "rgba(102, 126, 234, 0.1)";
          }
        });
    </script>
  </body>
</html>
