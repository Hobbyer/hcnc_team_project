<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>DOO.D 회원정보 찾기</title>
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="../../../css/egovframework/import.css" />
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script src="../../../common/utils.js"></script>
    <script src="../../../common/regex.js"></script>
    <script type="text/javascript"></script>
  </head>
  <script>
    $(() => {
      $("#btn-mail").click(() => {
        const id = $("#id").val().trim();
        const email = $("#email").val().trim();
        const param = { to: email, id: id, type: "find-pw" };
        if (id === "" || id == null) {
          alert("아이디를 입력해주세요");
          return;
        }
        sendMailByUser(
          param,
          (response) => {
            if (response.status === 200) {
              $("#guide-title").text("인증번호가 발송되었습니다.");
              $("#step1").css("display", "none");
              $("#step2").css("display", "block");
            }
            if (response.status === 409) {
              alert("일치하는 회원정보를 찾을수없습니다");
            }
          },
          () => {
            alert("메일발송에 실패하였습니다");
          }
        );
      });
      $("#btn-code").click(() => {
        const email = $("#email").val().trim();
        const emailCode = $("#emailCode").val().trim();
        const param = { to: email, code: emailCode, type: "find-pw" };
        mailCodeCheckByUser(
          param,
          (response) => {
            if (response.result && response.resultInfo != null) {
              $("#guide-title").text("비밀번호 재설정");
              $("#step2").css("display", "none");
              $("#step3").css("display", "block");
              return;
            }
            if (!response.result) {
              alert("인증에 실패하였습니다. 인증번호를 확인해주세요.");
              return;
            }
          },
          () => {
            alert("인증에 실패하였습니다.");
          }
        );
      });
      $("#btn-update").click(() => {
        const id = $("#id").val().trim();
        const password = $("#password").val().trim();
        const param = { id: id, password: password };
        ajaxUtil(param, "updatePasswordByUser.do", (res) => {
          if (res.status === 200) {
            alert("비밀번호가 변경되었습니다 로그인페이지로 이동합니다");
            location.href = "/login.do";
          }
          if (res.status === 409) {
            alert("비밀번호변경에 실패하였습니다");
          }
        });
      });
    });
  </script>

  <body>
    <jsp:include page="../layout/header.jsp" />
    <style>
      input[type="number"]::-webkit-inner-spin-button,
      input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      input[type="password"],
      input[type="number"],
      input[type="text"] {
        width: 100%;
        height: 60px;
        border: 1px solid #d9d9d9;
        border-radius: 5px;
        font-size: 20px;
        padding-left: 10px;
        box-sizing: border-box;
      }
      input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px white inset;
        box-shadow: 0 0 0 1000px white inset;
      }
      .loginbox {
        margin: 0 auto;
        width: 628px;
        background-color: #fff;
        border-radius: 16px;
        box-shadow: 0px 0px 30px #ccc;
        padding: 55px 40px 55px 40px;
        min-width: 628px;
        max-width: 628px;
      }
      .login-header {
        display: flex;
        font-weight: bold;
        font-size: 28px;
        padding-bottom: 19px;
        border-bottom: 1px solid #d9d9d9;
        margin-bottom: 34px;
      }
      .login-body {
        border: 1px solid #d9d9d9;
        border-radius: 5px;
        margin-bottom: 42px;
      }
      .tab-login,
      .tab-unknown {
        display: flex;
        flex: 1;
        justify-content: center;
        font-size: 16px;
        font-weight: 700;
        line-height: 20px;
        padding-top: 15px;
        padding-bottom: 15px;
        cursor: pointer;
      }
      .tab-login {
        background-color: #f7f7f7;
        border-right: 1px solid #d9d9d9;
        border-bottom: 1px solid #d9d9d9;
        border-top-left-radius: 5px;
      }
      .login-input-container {
        align-items: center;
        justify-content: center;
        display: flex;
        flex-direction: column;
        padding-top: 26px;
        padding-left: 40px;
        padding-right: 40px;
      }
      .login-btn {
        margin-left: 40px;
        margin-right: 40px;
        display: flex;
        flex: 1;
        background-color: #ea0e25;
        justify-content: center;
        padding-top: 15px;
        padding-bottom: 15px;
        border-radius: 4px;
        cursor: pointer;
      }
      .sign-btn {
        margin-left: 40px;
        margin-right: 40px;
        display: flex;
        flex: 1;
        background-color: #fff;
        justify-content: center;
        padding-top: 15px;
        padding-bottom: 15px;
        border-radius: 4px;
        border: 1px solid #ea0e25;
        cursor: pointer;
      }
      .find-info {
        font-size: 12px;
        font-weight: 400;
        color: #777;
        cursor: pointer;
      }
    </style>

    <div class="container" style="background-color: #f7f7f7">
      <div class="inner" style="margin-top: 20px">
        <div class="loginbox">
          <div class="login-header">회원정보 찾기</div>
          <div class="login-body">
            <div
              class="login-tab"
              style="display: flex; flex-direction: row; flex: 1"
            >
              <div class="tab-login" onclick="location.href = '/findId.do'">
                아이디 찾기
              </div>
              <div class="tab-unknown" onclick="location.href = '/findId.do'">
                비밀번호 찾기
              </div>
            </div>
            <div id="login-main" class="login-main" style="display: block">
              <div
                id="guide-title"
                style="
                  padding-left: 40px;
                  font-size: 20px;
                  font-weight: 600;
                  padding-top: 30px;
                "
              >
                아이디와 이메일을 입력해주세요.
              </div>
              <div id="step1">
                <div class="login-input-container">
                  <input id="id" name="id" type="text" placeholder="아이디" />
                  <div style="height: 6px"></div>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="이메일"
                  />
                  <div style="height: 6px"></div>
                </div>
                <div style="height: 23px"></div>
                <div id="btn-mail" class="login-btn">
                  <div
                    id="btn-post"
                    style="font-size: 18px; font-weight: 700; color: #fff"
                  >
                    인증번호 보내기
                  </div>
                </div>
              </div>
              <div id="step2" style="display: none">
                <div class="login-input-container">
                  <input
                    id="emailCode"
                    name="emailCode"
                    maxlength="6"
                    type="text"
                    placeholder="인증번호 6자리"
                  />
                  <div style="height: 6px"></div>
                </div>
                <div style="height: 23px"></div>
                <div id="btn-code" class="login-btn">
                  <div
                    id="btn-post"
                    style="
                      font-size: 18px;
                      font-weight: 700;
                      color: #fff;
                      text-align: center;
                    "
                  >
                    확인
                  </div>
                </div>
              </div>
              <div id="step3" style="display: none">
                <div class="login-input-container">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="영문,숫자,특수문자 포함 최소 8자리 이상"
                  />
                  <div style="height: 6px"></div>
                  <input
                    id="passwordCheck"
                    name="passwordCheck"
                    type="password"
                    placeholder="비밀번호 한번 더 입력"
                  />
                  <div style="height: 6px"></div>
                </div>
                <div style="height: 23px"></div>
                <div id="btn-update" class="login-btn">
                  <div
                    id="btn-post"
                    style="
                      font-size: 18px;
                      font-weight: 700;
                      color: #fff;
                      text-align: center;
                    "
                  >
                    비밀번호 재설정
                  </div>
                </div>
              </div>
              <div
                style="
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  padding-left: 40px;
                  padding-right: 40px;
                  padding-top: 31px;
                  padding-bottom: 18px;
                "
              >
                <div
                  style="
                    display: flex;
                    flex: 1;
                    border-bottom: 1px solid #d9d9d9;
                  "
                ></div>
                <div style="font-size: 12; font-weight: 400; color: #777">
                  이메일에 전송된 인증번호를 입력해주세요
                </div>
                <div
                  style="
                    display: flex;
                    flex: 1;
                    border-bottom: 1px solid #d9d9d9;
                  "
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 20px"></div>
    <jsp:include page="../layout/footer.jsp" />
  </body>
</html>
