(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Pop_BoardInsert");
            this.set_titletext("게시글 작성");
            this.set_background("white");
            this.set_border("1px solid  #E0E0E0");
            this.set_borderRadius("10px");
            if (Form == this.constructor)
            {
                this._setFormPosition(691,628);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_post", this);
            obj._setContents("<ColumnInfo><Column id=\"POST_TITLE\" type=\"STRING\" size=\"256\"/><Column id=\"POST_CONTENT\" type=\"STRING\" size=\"256\"/><Column id=\"MEMBER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"BOARD_ID\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_boardType", this);
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"20\"/><Column id=\"NAME\" type=\"STRING\" size=\"50\"/></ColumnInfo><Rows><Row><Col id=\"CODE\">NOTICE</Col><Col id=\"NAME\">공지사항</Col></Row><Row><Col id=\"CODE\">FAQ</Col><Col id=\"NAME\">FAQ</Col></Row></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Static("sta_title","30","-5","0","40",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("게시글 작성");
            obj.set_font("normal 18pt/normal \"Noto Sans KR Medium\"");
            obj.set_color(" #333333");
            this.addChild(obj.name, obj);

            obj = new Static("sta_boardType","40","20","80","40",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("게시판");
            obj.set_font("normal 11pt/normal \"Noto Sans KR Medium\"");
            obj.set_color(" #555555");
            this.addChild(obj.name, obj);

            obj = new Combo("cmb_boardType","100","25","210","30",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_borderRadius("5px");
            obj.set_border("1px solid  #CCCCCC");
            obj.set_displaynulltext("게시판을 선택하세요");
            obj.set_innerdataset("ds_boardType");
            obj.set_codecolumn("NAME");
            obj.set_datacolumn("NAME");
            this.addChild(obj.name, obj);

            obj = new Static("sta_postTitle","40","70","80","40",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("제목");
            obj.set_font("normal 11pt/normal \"Noto Sans KR Medium\"");
            obj.set_color(" #555555");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_postTitle","100","75",null,"30","31",null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_borderRadius("5px");
            obj.set_border("1px solid  #CCCCCC");
            this.addChild(obj.name, obj);

            obj = new Static("sta_postContent","40","120","80","40",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("내용");
            obj.set_font("normal 11pt/normal \"Noto Sans KR Medium\"");
            obj.set_color(" #555555");
            this.addChild(obj.name, obj);

            obj = new WebBrowser("web_postContent","40","165",null,"385","31",null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.getSetter("borderRadius").set("5px");
            obj.set_border("1px solid  #CCCCCC");
            this.addChild(obj.name, obj);

            obj = new Button("btn_cancel",null,null,"100","40","141","18",null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_text("취소");
            obj.set_background(" #E5E7EB");
            obj.set_color(" #555555");
            obj.set_border("0px none");
            obj.set_borderRadius("5px");
            obj.set_cursor("pointer");
            obj.set_font("normal 11pt/normal \"Noto Sans KR Medium\"");
            this.addChild(obj.name, obj);

            obj = new Button("btn_save",null,null,"100","40","31","18",null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_text("작성 완료");
            obj.set_background(" #5C6BC0");
            obj.set_color("white");
            obj.set_border("0px none");
            obj.set_borderRadius("5px");
            obj.set_cursor("pointer");
            obj.set_font("normal 11pt/normal \"Noto Sans KR Medium\"");
            this.addChild(obj.name, obj);

            obj = new Static("sta_user","470","20","80","40",null,null,null,null,null,null,this);
            obj.set_taborder("9");
            obj.set_text("작성자");
            obj.set_font("normal 11pt/normal \"Noto Sans KR Medium\"");
            obj.set_color(" #555555");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_user","530","25",null,"30","32",null,null,null,null,null,this);
            obj.set_taborder("10");
            obj.set_borderRadius("5px");
            obj.set_border("1px solid  #CCCCCC");
            obj.set_readonly("true");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",691,628,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item0","edt_postTitle","value","ds_post","POST_TITLE");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item2","edt_user","value","ds_post","MEMBER_ID");
            this.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Pop_BaordInsert.xfdl", function() {
        // Form 로드시 실행
        this.Pop_BoardInsert_onload = function(obj,e)
        {
        	var isSaved = false;  // 초기화
            // 데이터셋 초기화
            this.ds_post.clearData();
        	//데이터셋 로우 추가
            this.ds_post.addRow();

            // 전역변수에서 사용자 ID 가져오기
            this.setMemberId();

            // 웹브라우저에 에디터URL을 설정
            var sUrl = "http://localhost:8080/ckedit.do";
        	// 웹브라우저에 URL을 대입
            this.web_postContent.set_url(sUrl);
        };


        // 사용자 ID 설정
        this.setMemberId = function()
        {
            // 전역변수에서 USER_ID 가져오기 (전역변수 이름에 따라 수정)
            var sUserId = nexacro.getApplication().gds_adminInfo.getColumn(0, "MEMBER_ID"); // 또는 gds_user.getColumn(0, "USER_ID") 등


            if(sUserId) { //전역변수에서 받아온 내용이 있으면 넣어주고 아니면 예외 trace
                this.ds_post.setColumn(0, "MEMBER_ID", sUserId);
                trace("사용자 ID 설정: " + sUserId);
            } else {
                trace("사용자 ID를 가져올 수 없습니다.");
                // 필요시 로그인 페이지로 이동하거나 오류 처리
            }
        };

        // 웹브라우저 로드 완료 후 실행
        this.web_postContent_onloadcompleted = function(obj,e)
        {
            trace("에디터 로드 완료");
            this.setTimer(1, 2000);
        };

        // 타이머 이벤트
        this.Pop_BoardInsert_ontimer = function(obj,e)
        {
            if(e.timerid == 1) {
                this.killTimer(1);
                trace("에디터 준비 완료");

                // 초기 메시지 설정
                this.setEditorContent("<p>내용을 입력해주세요.</p>");
            }
        };


        /*
        	여기서부터 에디터입니다.
        */

        // 에디터 내용 가져오기 (간단한 버전)
        this.getEditorContent = function()
        {
            try {
                var sContent = this.web_postContent.callMethod("getEditorContent", "");

                trace("=== 에디터 내용 디버깅 ===");
                trace("가져온 내용: " + sContent);
                trace("내용 타입: " + typeof sContent);

                if(!sContent || sContent === "undefined" || sContent === "null" || sContent === null) {
                    return "";
                }

                return String(sContent);

            } catch(e) {
                trace("에디터 내용 가져오기 실패: " + e.message);
                return "";
            }
        };

        // 에디터 내용 설정
        this.setEditorContent = function(sContent)
        {
            try {
                if(!sContent) {
                    sContent = "";
                }

                var result = this.web_postContent.callMethod("setEditorContent", sContent);
                trace("에디터 내용 설정 결과: " + result);

            } catch(e) {
                trace("에디터 내용 설정 실패: " + e.message);
            }
        };

        // 에디터 준비 상태 확인
        this.isEditorReady = function()
        {
            try {
                var result = this.web_postContent.callMethod("isEditorReady", "");
                return result === true || result === "true";
            } catch(e) {
                trace("에디터 준비 상태 확인 실패: " + e.message);
                return false;
            }
        };


        // 작성 완료 버튼 클릭
        this.btn_save_onclick = function(obj,e)
        {
            // 유효성 검사
            if(!this.validateFormData()) {
                return;
            }

            // 에디터 내용을 데이터셋에 저장
            var sContent = this.getEditorContent();
            this.ds_post.setColumn(0, "POST_CONTENT", sContent);

            // 디버그: 데이터셋 내용 확인
            this.logDatasetContent();

            // 서버로 데이터 전송
            this.fnInsertPostByAdmin();
        };

        // 취소 버튼 클릭
        this.btn_cancel_onclick = function(obj,e)
        {
            var sTitle = this.edt_postTitle.value;
            var sContent = this.getEditorContent();

            if((sTitle && sTitle.trim() != "") || (sContent && sContent.trim() != "" && sContent != "<p></p>" && sContent != "<p>내용을 입력해주세요.</p>")) {
                if(!this.confirm("작성 중인 내용이 있습니다. 정말 취소하시겠습니까?")) {
                    return;
                }
            }

            this.close();
        };

        // 폼 데이터 유효성 검사
        this.validateFormData = function()
        {

            var sBoardId = this.ds_post.getColumn(0, "BOARD_ID");
            if(!sBoardId || sBoardId == "") {
                alert("게시판을 선택해주세요.");
                this.cmb_boardType.setFocus();
                return false;
            }

            // 제목 검사
            var sTitle = this.edt_postTitle.value;
            if(!sTitle || sTitle.trim() == "") {
                alert("제목을 입력해주세요.");
                this.edt_postTitle.setFocus();
                return false;
            }

            if(sTitle.trim().length < 2) {
                alert("제목은 2글자 이상 입력해주세요.");
                this.edt_postTitle.setFocus();
                return false;
            }

            if(sTitle.trim().length > 100) {
                alert("제목은 100글자 이하로 입력해주세요.");
                this.edt_postTitle.setFocus();
                return false;
            }

            // 내용 검사
            var sContent = this.getEditorContent();
            if(!sContent || sContent.trim() == "" || sContent == "<p></p>" || sContent == "<p>내용을 입력해주세요.</p>") {
                alert("내용을 입력해주세요.");
                return false;
            }

            // HTML 태그 제거 후 텍스트 길이 검사
            var sTextContent = sContent.replace(/<[^>]*>/g, "").trim();
            if(sTextContent.length < 10) {
                alert("내용은 10글자 이상 입력해주세요.");
                return false;
            }

            // 사용자 ID 검사
            var sMemberId = this.ds_post.getColumn(0, "MEMBER_ID");
            if(!sMemberId || sMemberId == "") {
                alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
                return false;
            }

            return true;
        };

        // 데이터셋 내용 로그 출력 (디버그용)
        this.logDatasetContent = function()
        {
            trace("=== 저장할 데이터 ===");
            trace("게시판 ID: " + this.ds_post.getColumn(0, "BOARD_ID"));
            trace("제목: " + this.ds_post.getColumn(0, "POST_TITLE"));
            trace("작성자 ID: " + this.ds_post.getColumn(0, "MEMBER_ID"));
            trace("내용 길이: " + this.ds_post.getColumn(0, "POST_CONTENT").length + "자");
            trace("==================");
        };

        // 서버에 게시글 저장
        this.fnInsertPostByAdmin = function()
        {
            var sSvcID    = "insertPostByAdmin";
            var sURL      = "svc::insertPostByAdmin.do?time=" + new Date().getTime();
            var sInDs     = "ds_post=ds_post:U"; // Updated 행만 전송
            var sOutDs    = "";
            var sParam    = "";
            var sCallBack = "fnCallback";

            // 저장 중 메시지 (선택사항)
            // this.alert("저장 중입니다...");

            this.transaction(sSvcID, sURL, sInDs, sOutDs, sParam, sCallBack);
        };

        // Transaction 콜백 함수
        this.fnCallback = function(svcID, errorCode, errorMsg)
        {
            if(errorCode < 0) {
                alert("오류가 발생했습니다: " + errorMsg);
                return;
            }

            switch(svcID) {
                case "insertPostByAdmin":
                    alert("게시글이 성공적으로 작성되었습니다.");
                    isSaved = true;
                    // 부모 창에 결과 전달 (목록 새로고침)
                    if(this.opener && this.opener.fnRefreshList) {
                        this.opener.fnRefreshList();
                    }

                    this.close("success");
                    break;
            }
        };

        // 폼 닫기 전 확인
        this.Pop_BoardInsert_onbeforeclose = function(obj,e)
        {
            if(isSaved) {
                return;
            }

            var sTitle = this.edt_postTitle.value;
            var sContent = this.getEditorContent();

            if((sTitle && sTitle.trim() != "") || (sContent && sContent.trim() != "" && sContent != "<p></p>" && sContent != "<p>내용을 입력해주세요.</p>")) {
                if(!this.confirm("작성 중인 내용이 있습니다. 정말 나가시겠습니까?")) {
                    e.set_cancel(true);
                }
            }
        };


        this.cmb_boardType_onitemchanged = function(obj,e)
        {
        	var val = e.postvalue;

        	  // 게시판 구분 검사
        	if(val == "공지사항"){
                this.ds_post.setColumn(0, "BOARD_ID", "1");    // 전체는 ALL 같은 값으로 보냄 (쿼리에선 1,3,4로 조회함)
            } else if(val == "FAQ"){
                this.ds_post.setColumn(0, "BOARD_ID", "3");    // 공지사항
            }
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Pop_BoardInsert_onload,this);
            this.addEventHandler("ontimer",this.Pop_BoardInsert_ontimer,this);
            this.addEventHandler("onbeforeclose",this.Pop_BoardInsert_onbeforeclose,this);
            this.cmb_boardType.addEventHandler("onitemchanged",this.cmb_boardType_onitemchanged,this);
            this.web_postContent.addEventHandler("onloadcompleted",this.web_postContent_onloadcompleted,this);
            this.btn_cancel.addEventHandler("onclick",this.btn_cancel_onclick,this);
            this.btn_save.addEventHandler("onclick",this.btn_save_onclick,this);
            this.sta_user.addEventHandler("onclick",this.sta_boardType00_onclick,this);
        };
        this.loadIncludeScript("Pop_BaordInsert.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
