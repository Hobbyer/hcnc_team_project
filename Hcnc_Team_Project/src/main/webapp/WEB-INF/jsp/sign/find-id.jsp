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
    <script>
      $(() => {
        $("#btn-mail").click(() => {
          const email = $("#email").val().trim();
          const param = { to: email, type: "find-id" };
          sendMailByUser(
            param,
            (response) => {
              if (response.status === 200) {
                $("#guide-title").text("인증번호가 발송되었습니다.");
                $("#email").prop("readonly", true);
                $("#email").css("display", "none");
                $("#emailCode").css("display", "block");
                $("#btn-mail").css("display", "none");
                $("#btn-code").css("display", "block");
              }
              if (response.status === 409) {
                alert("이메일의 회원정보를 찾을수없습니다.");
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
          const param = { to: email, code: emailCode, type: "find-id" };
          mailCodeCheckByUser(
            param,
            (response) => {
              if (response.resultInfo.LOGIN_TYPE == "KAKAO") {
                $("#login-main").css("display", "none");
                $("#complete-body").css("display", "block");
                $("#complete-id").text(
                  "KAKAO 소셜로그인으로 등록된 계정이에요"
                );
                return;
              }
              if (response.result && response.resultInfo != null) {
                $("#login-main").css("display", "none");
                $("#complete-body").css("display", "block");
                $("#complete-id").text(response.resultInfo.MEMBER_ID);
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
      });
    </script>
  </head>
  <body style="background-color: #f7f7f7">
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
      .tab-unknown {
        background-color: #f7f7f7;
        border-left: 1px solid #d9d9d9;
        border-bottom: 1px solid #d9d9d9;
        border-top-right-radius: 5px;
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
      .sign-btn {
        display: flex;
        flex: 1;
        background-color: #fff;
        justify-content: center;
        padding-top: 15px;
        padding-bottom: 15px;
        border-radius: 8px;
        margin-top: 37px;
        border: 1px solid #ea0e25;
        cursor: pointer;
      }
    </style>
    <jsp:include page="../layout/header.jsp" />
    <div class="container">
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
              <div class="tab-unknown" onclick="location.href = '/findPw.do'">
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
                내 정보에 등록된 이메일로 찾기
              </div>
              <div class="login-input-container">
                <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="이메일"
                />
                <div style="height: 6px"></div>

                <input
                  id="emailCode"
                  name="emailCode"
                  maxlength="6"
                  type="text"
                  placeholder="인증번호 6자리"
                  style="display: none"
                />
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
              <div id="btn-code" class="login-btn" style="display: none">
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
            <div id="complete-body" class="complete-body" style="display: none">
              <div
                id="complete-title"
                style="
                  max-width: 500px;
                  margin: 50px auto;
                  margin-bottom: 0;
                  padding: 30px 20px;
                  /* background-color: #f9f9f9; */
                  border-radius: 12px;
                  /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); */
                  text-align: center;
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                "
              >
                <!-- 안내 문구 -->
                <p
                  style="
                    font-size: 22px;
                    font-weight: 600;
                    margin-bottom: 10px;
                    color: #333;
                  "
                >
                  DOO.D 회원님의 아이디를 찾았어요
                </p>

                <!-- 강조할 이메일 -->
                <p
                  id="complete-id"
                  style="
                    font-size: 24px;
                    font-weight: 700;
                    margin-bottom: 10px;
                    color: #222;
                    word-break: break-all;
                    text-decoration: underline;
                  "
                >
                  test
                </p>
              </div>

              <div
                id="btn"
                class="sign-btn"
                style="margin-top: 0; margin-bottom: 20px"
                onclick="location.href = '/login.do'"
              >
                <div
                  id="btn-post"
                  style="font-size: 18px; font-weight: 700; color: #ea0e25"
                >
                  로그인 하러가기
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
</html>
