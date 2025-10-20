(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_Top");
            this.set_titletext("Form_Top");
            this.set_background("white");
            this.set_border("0px none");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,50);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_count", this);
            obj._setContents("<ColumnInfo><Column id=\"COUNT\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Static("Static00",null,"5","100","43","90",null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("님 환영합니다");
            obj.set_font("normal 12pt/normal \"Pretendard SemiBold\"");
            this.addChild(obj.name, obj);

            obj = new ImageViewer("h1_logo","22","9","138","33",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_image("url(\'imagerc::h1_logo.png\')");
            obj.set_border("0px none");
            obj.set_stretch("fixaspectratio");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);

            obj = new Button("btn_logout",null,"11","80","31","10",null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("로그아웃");
            obj.set_font("normal 10pt/normal \"Pretendard SemiBold\"");
            obj.set_background("transition");
            obj.set_border("0px none");
            obj.set_color("firebrick");
            this.addChild(obj.name, obj);

            obj = new Static("admin_id",null,"14","70","23","200",null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_background("#f5f5f5");
            obj.set_textAlign("center");
            obj.set_color("black");
            obj.set_font("bold 14px/normal \"Noto Sans KR Black\"");
            obj.set_borderRadius("12px");
            this.addChild(obj.name, obj);

            obj = new Button("btn_notification",null,"8","40","35","280",null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("🔔");
            obj.set_font("normal 18pt/normal \"Pretendard SemiBold\"");
            obj.set_background("white");
            obj.set_border("0px");
            obj.set_borderRadius("5px");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);

            obj = new Static("sta_badge",null,"6","18","18","276",null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("");
            obj.set_background("red");
            obj.set_color("white");
            obj.set_textAlign("center");
            obj.set_font("bold 10px/normal \"Pretendard\"");
            obj.set_borderRadius("9px");
            obj.set_visible("false");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","Desktop_screen",1280,50,this,function(p){});
            obj.set_stepcount("0");
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item0","admin_id","text","gds_adminInfo","MEMBER_ID");
            this.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Form_Top.xfdl", function() {
        this.isWait = false;
        this.websocket = null;


        this.Form_Top_onload = function(obj,e)
        {

        };


        this.fn_initWebSocket = function()
        {
            trace("🔐 로그인 완료 - 웹소켓 및 알림 초기화 시작");

            // 1. 웹소켓 연결
            this.connectWebSocket();

            // 2. 미읽음 알림 개수 조회
            this.loadUnreadCount();
        };


        this.connectWebSocket = function()
        {
            var glbAd = nexacro.getApplication();
            var userId = "ADMIN"

            if (!userId) {
                trace("❌ 사용자 ID 없음 - 웹소켓 연결 불가");
                return;
            }

            var wsUrl = 'ws://localhost:8080/notification/' + userId;

            trace("🔌 웹소켓 연결 시도: " + wsUrl);

            try {
                this.websocket = new WebSocket(wsUrl);

                var objThis = this;

                // onopen 이벤트
                this.websocket.onopen = function(e) {
                    trace("✅ 웹소켓 연결 성공");
                };

                // onmessage 이벤트
                this.websocket.onmessage = function(e) {
                    trace("📩 알림 수신: " + e.data);
                    objThis.playNotificationSound();

                    try {
                        var data = JSON.parse(e.data);

                        // 배지 개수 갱신
                        objThis.loadUnreadCount();



                        // 알림 메시지 표시
                        var message = data.message || "새 알림이 도착했습니다.";

                        alert("[알림] " + message);


                    } catch(err) {
                        trace("❌ 메시지 파싱 에러: " + err.message);
                    }
                };

                // onerror 이벤트
                this.websocket.onerror = function(e) {
                    trace("❌ 웹소켓 에러");
                };

                // onclose 이벤트
                this.websocket.onclose = function(e) {
                    trace("⚠️ 웹소켓 연결 종료");

                    // 로그아웃이 아닌 경우만 재연결
                    if (objThis.websocket !== null) {
                        trace("3초 후 재연결 시도...");
                        setTimeout(function() {
                            objThis.connectWebSocket();
                        }, 3000);
                    }
                };

            } catch(err) {
                trace("❌ 웹소켓 생성 실패: " + err.message);
            }
        };


        this.loadUnreadCount = function()
        {
            var strSvcId    = "selectUnreadCount";
            var strSvcUrl   = "svc::/notification/unreadCountNexa.do?time=" + new Date().getTime();
            var inData      = "";
            var outData     = "ds_count=ds_count";
            var strArg      = "";
            var callBackFnc = "fn_callback_unreadCount";
            var isAsync     = true;

            this.transaction(strSvcId, strSvcUrl, inData, outData, strArg, callBackFnc, isAsync);
        };


        // 미읽음 개수 조회 콜백
        this.fn_callback_unreadCount = function(strSvcId, nErrorCode, strErrorMsg)
        {
            if (nErrorCode < 0) {
                trace("미읽음 개수 조회 실패: " + strErrorMsg);
                return;
            }
            switch(strSvcId){
        		case "selectUnreadCount" :
        		if(this.ds_count.getRowCount()>0){
        			var count = this.ds_count.getColumn(0,"COUNT");
        			trace("미읽음 개수는 : " + count);

        			if(count>0){
        				var displayText = count > 99? "99+" : count.toString();
        				 this.sta_badge.set_text(displayText);
                         this.sta_badge.set_visible(true);
        			}else{
        				trace("데이터 없음");
        				this.sta_badge.set_visible(false);
        			}
        		}
        		break;
        	}
        };

        // ========================================
        // 알림 버튼 클릭
        // ========================================
        this.btn_notification_onclick = function(obj,e)
        {
            // 알림 팝업 열기
            var objChildFrame = new nexacro.ChildFrame;
            objChildFrame.init("NotificationPopup", 0, 0, 500, 600, null, null, "popup::Pop_Notification.xfdl");

            objChildFrame.set_dragmovetype("all");
            objChildFrame.set_showtitlebar(true);
            objChildFrame.set_titletext("알림");
            objChildFrame.set_resizable(false);
            objChildFrame.set_openalign("center middle");

            objChildFrame.showModal(
                this.getOwnerFrame(),
                {},
                this,
                "fn_popupCallback"
            );
        };

        // 팝업 콜백
        this.fn_popupCallback = function(strPopupId, strReturn)
        {
            if (strReturn == "refresh") {
                // 배지 개수 갱신
                this.loadUnreadCount();
            }
        };

        // ========================================
        // 로그아웃
        // ========================================
        this.btn_logout_onclick = function(obj,e)
        {
            if(this.isWait) return;
            this.isWait = true;

            // 웹소켓 종료 (재연결 방지)
            if (this.websocket) {
                trace("🔌 웹소켓 연결 종료");
                var ws = this.websocket;
                this.websocket = null; // null로 설정하여 재연결 방지
                ws.close();
            }

            this.logout();
        };

        this.fn_callBack = function(svcID, errorCode, errorMSG)
        {
            if(errorCode == -1) {
                this.alert(errorMSG);
                this.isWait = false;
                return;
            }

            switch(svcID) {
                case "adminLogout":
                    var glbAd = nexacro.getApplication();

                    // 전역 데이터 초기화
                    if(glbAd.gds_adminInfo) {
                        glbAd.gds_adminInfo.clearData();
                    }

                    // 프레임 닫기
                    nexacro.VFrameSet00.set_separatesize("0,*");
                    nexacro.HFrameSet00.set_separatesize("0,*");
                    nexacro.InnerVFrameSet.set_separatesize("0,*");

                    // 로그인 화면으로
                    this.isWait = false;
                    glbAd.mainframe.VFrameSet00.HFrameSet00.VFrameSet01.WorkFrame.arguments = { "isLogout": true };
                    glbAd.mainframe.VFrameSet00.HFrameSet00.VFrameSet01.WorkFrame.set_formurl("member::Form_Login.xfdl");

                    break;
        		case "selectUnreadCount":
        		break;
            }
        };

        this.logout = function()
        {
            var strSvcID = "adminLogout";
            var setURL = "svc::/adminLogoutByAdmin.do?time=" + new Date().getTime();
            var strInDatasets = "";
            var strOutDatasets = "";
            var strArg = "";
            var callBack = "fn_callBack";
            var inAsync = true;

            this.transaction(strSvcID, setURL, strInDatasets, strOutDatasets, strArg, callBack, inAsync);
        };

        // ========================================
        // 로고 클릭
        // ========================================
        this.h1_logo_onclick = function(obj,e)
        {
            var glbAd = nexacro.getApplication();
            glbAd.mainframe.VFrameSet00.HFrameSet00.VFrameSet01.WorkFrame.set_formurl("admin::Form_Main.xfdl");
        };

        this.playNotificationSound = function()
        {
            try {
                // 방법 1: nexacro API 사용
                var soundUrl = "http://localhost:8080/sounds/bell.mp3";

                // Audio 객체 생성 (브라우저 환경)
                var audio = new Audio(soundUrl);
                audio.play();

                trace("🔔 알림음 재생: " + soundUrl);

            } catch(err) {
                trace("❌ 알림음 재생 실패: " + err.message);
            }
        };
        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_Top_onload,this);
            this.Static00.addEventHandler("onclick",this.Static00_onclick,this);
            this.h1_logo.addEventHandler("onclick",this.h1_logo_onclick,this);
            this.btn_logout.addEventHandler("onclick",this.btn_logout_onclick,this);
            this.btn_notification.addEventHandler("onclick",this.btn_notification_onclick,this);
        };
        this.loadIncludeScript("Form_Top.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
