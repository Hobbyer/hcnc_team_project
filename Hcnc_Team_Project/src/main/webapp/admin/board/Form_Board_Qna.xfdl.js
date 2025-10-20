(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_Board_Qna");
            this.set_titletext("New Form");
            this.set_background("#F4F7FE");
            this.set_scrolltype("none");
            this.set_scrollbartype("none");
            this.set_scrollbarsize("0");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_boardType", this);
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"256\"/><Column id=\"NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"CODE\">전체</Col><Col id=\"NAME\">전체</Col></Row><Row><Col id=\"CODE\">답변대기</Col><Col id=\"NAME\">답변대기</Col></Row><Row><Col id=\"CODE\">답변완료</Col><Col id=\"NAME\">답변완료</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_board", this);
            obj._setContents("<ColumnInfo><Column id=\"BOARD_ID\" type=\"STRING\" size=\"256\"/><Column id=\"MEMBER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"POST_TITLE\" type=\"STRING\" size=\"256\"/><Column id=\"POST_CONTENT\" type=\"STRING\" size=\"256\"/><Column id=\"POST_STATUS\" type=\"STRING\" size=\"256\"/><Column id=\"SORT_NUMBER\" type=\"STRING\" size=\"256\"/><Column id=\"INPUT_DT\" type=\"STRING\" size=\"256\"/><Column id=\"USER_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"CHK\" type=\"STRING\" size=\"256\"/><Column id=\"POST_ID\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_search", this);
            obj._setContents("<ColumnInfo><Column id=\"START_DATE\" type=\"STRING\" size=\"256\"/><Column id=\"END_DATE\" type=\"STRING\" size=\"256\"/><Column id=\"USER_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"POST_STATUS\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_selected", this);
            obj._setContents("<ColumnInfo><Column id=\"BOARD_ID\" type=\"STRING\" size=\"256\"/><Column id=\"MEMBER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"POST_TITLE\" type=\"STRING\" size=\"256\"/><Column id=\"POST_CONTENT\" type=\"STRING\" size=\"256\"/><Column id=\"SORT_NUMBER\" type=\"STRING\" size=\"256\"/><Column id=\"INPUT_DT\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Div("search_area","40","10",null,"60","40",null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_background("#ffffff");
            obj.set_borderRadius("10px");
            obj.set_text("");
            obj.set_boxShadow("0px 0px 2px 2px rgba(229,229,229,0.15)");
            this.addChild(obj.name, obj);

            obj = new Static("stc_name","37.25%","13","50","36",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("2");
            obj.set_text("작성자");
            obj.set_font("normal 11pt/normal \"Noto Sans KR Medium\"");
            this.search_area.addChild(obj.name, obj);

            obj = new Edit("Edit00","41.92%","17","125","30",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("3");
            obj.set_borderRadius("5px");
            this.search_area.addChild(obj.name, obj);

            obj = new Static("stc_ship","2.5%","13","80","36",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("0");
            obj.set_text("답변 유무");
            obj.set_font("normal 11pt/normal \"Noto Sans KR Medium\"");
            this.search_area.addChild(obj.name, obj);

            obj = new Radio("rad_type","9.17%","13","220","36",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("1");
            obj.set_innerdataset("ds_boardType");
            obj.set_codecolumn("CODE");
            obj.set_datacolumn("NAME");
            obj.set_direction("vertical");
            obj.set_font("normal 9pt/normal \"Noto Sans KR\"");
            obj.set_text("전체");
            obj.set_value("전체");
            obj.set_index("0");
            this.search_area.addChild(obj.name, obj);

            obj = new Calendar("Calendar00_01",null,"16","120","30","16.08%",null,null,null,null,null,this.search_area.form);
            obj.set_taborder("4");
            this.search_area.addChild(obj.name, obj);

            obj = new Static("stc_name00",null,"13","50","36","26.58%",null,null,null,null,null,this.search_area.form);
            obj.set_taborder("5");
            obj.set_text("작성일");
            obj.set_font("normal 11pt/normal \"Noto Sans KR Medium\"");
            this.search_area.addChild(obj.name, obj);

            obj = new Static("txt_th00_00_00",null,"12","20","36","13.08%",null,null,null,null,null,this.search_area.form);
            obj.set_taborder("6");
            obj.set_text("-");
            obj.set_font("normal 11pt/normal \"Noto Sans KR\"");
            this.search_area.addChild(obj.name, obj);

            obj = new Calendar("Calendar00_00_00",null,"16","110","30","2.83%",null,null,null,null,null,this.search_area.form);
            obj.set_taborder("7");
            this.search_area.addChild(obj.name, obj);

            obj = new Div("grid_wrapper","40","100",null,null,"40","40",null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_background("#FFFFFF");
            obj.set_borderRadius("10px");
            obj.set_boxShadow("0px 0px 2px 2px rgba(229,229,229,0.15)");
            this.addChild(obj.name, obj);

            obj = new Grid("grid_header","0","0",null,"40","10",null,null,null,null,null,this.grid_wrapper.form);
            obj.set_taborder("0");
            obj.set_binddataset("ds_board");
            obj.set_autofittype("col");
            obj.set_background("#FFFFFF");
            obj.set_border("0px none");
            obj.set_selecttype("row");
            obj.set_readonly("true");
            obj.set_enableevent("false");
            obj.set_scrolltype("none");
            obj.set_scrollbartype("none");
            obj.set_scrollpixel("none");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"26\"/><Column size=\"47\"/><Column size=\"160\"/><Column size=\"74\"/><Column size=\"78\"/></Columns><Rows><Row size=\"40\"/></Rows><Band id=\"body\"><Cell text=\"NO\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\" textAlign=\"center\"/><Cell col=\"1\" text=\"작성자\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\" textAlign=\"center\"/><Cell col=\"2\" text=\"게시글 제목\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\" textAlign=\"center\"/><Cell col=\"3\" text=\"답변상태\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\" textAlign=\"center\"/><Cell col=\"4\" text=\"작성일\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\" textAlign=\"center\"/></Band></Format></Formats>");
            this.grid_wrapper.addChild(obj.name, obj);

            obj = new Grid("grid_list","0","40",null,null,"0","0",null,null,null,null,this.grid_wrapper.form);
            obj.set_taborder("1");
            obj.set_binddataset("ds_board");
            obj.set_autofittype("col");
            obj.set_background("#FFFFFF");
            obj.set_border("0px none");
            obj.set_borderRadius("0px 0px 10px 10px");
            obj.set_scrollbartype("auto");
            obj.set_scrollbarsize("10");
            obj.set_scrollbartrackbarsize("40");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"26\"/><Column size=\"47\"/><Column size=\"160\"/><Column size=\"74\"/><Column size=\"78\"/></Columns><Rows><Row size=\"34\"/></Rows><Band id=\"body\"><Cell displaytype=\"normal\" edittype=\"none\" textAlign=\"center\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR DemiLight&quot;\" expr=\"currow+1\"/><Cell col=\"1\" text=\"bind:USER_NAME\" textAlign=\"center\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR DemiLight&quot;\"/><Cell col=\"2\" text=\"bind:POST_TITLE\" textAlign=\"center\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR DemiLight&quot;\" edittype=\"none\"/><Cell col=\"3\" text=\"bind:POST_STATUS\" displaytype=\"normal\" edittype=\"none\" textAlign=\"center\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR Medium&quot;\" cursor=\"pointer\" cssclass=\"expr:(POST_STATUS==&apos;답변대기&apos;?&apos;cell_wait&apos;:(POST_STATUS==&apos;답변완료&apos;?&apos;cell_done&apos;:&apos;&apos;))\"/><Cell col=\"4\" text=\"bind:INPUT_DT\" textAlign=\"center\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR DemiLight&quot;\" edittype=\"none\"/></Band></Format></Formats>");
            this.grid_wrapper.addChild(obj.name, obj);

            obj = new Static("stc_ship00_00","50","10.28%","200","28",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("* 답변상태를 누르면 답변할 수 있습니다.");
            obj.set_font("normal 9pt/normal \"Noto Sans KR Medium\"");
            obj.set_textAlign("left");
            obj.set_color("#135dae");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1280,720,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item0","search_area.form.Edit00","value","ds_search","USER_NAME");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item1","search_area.form.Calendar00_01","value","ds_search","START_DATE");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item2","search_area.form.Calendar00_00_00","value","ds_search","END_DATE");
            this.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Form_Board_Qna.xfdl", function() {
        //온로드시 조회
        this.Form_Board_Qna_onload = function(obj,e)
        {
        	this.fnselectOneOnOneByAdmin(); // 1대1 게시판 조회 트랜젝션


        };

        //엔터키 눌렀을때
        this.search_area_Edit00_onkeyup = function(obj,e)
        {
        	if(e.keycode == 13){ //엔터이면 실행

        		this.fnselectOneOnOneByAdmin();
        	}
        };

        //라디오박스 바뀌었을때
        this.search_area_rad_type_onitemchanged = function(obj,e)
        {
        	this.ds_search.setColumn(0,"POST_STATUS",e.postvalue);
        	trace(this.ds_search.getColumn(0,"POST_STATUS"));
        	this.fnselectOneOnOneByAdmin();
        };

        // 공통 함수 : 오늘 날짜 반환 (YYYYMMDD)
        this.gfnGetToday = function() {
            var d = new Date();
            var yyyy = d.getFullYear();
            var mm = ("0" + (d.getMonth()+1)).slice(-2);
            var dd = ("0" + d.getDate()).slice(-2);
            return "" + yyyy + mm + dd;
        };

        // 시작일 변경 이벤트
        this.Calendar00_01_onchanged = function(obj,e)
        {
        	var startDate = this.Calendar00_01.value;
            var endDate   = this.Calendar00_00_00.value;

            if (!startDate) return; // 시작일 없으면 처리 중단

            // 종료일이 있고, 종료일이 시작일보다 빠른 경우
            if (endDate && endDate < startDate) {
                this.alert("종료일은 시작일보다 빠를 수 없습니다.");
                this.Calendar00_00_00.set_value(startDate);
                endDate = startDate;
            }

            // 시작일은 00시 00분
            this.ds_search.setColumn(0, "START_DATE", startDate + "000000");

            // 종료일이 있으면 23시 59분까지 설정
            if (endDate) {
                this.ds_search.setColumn(0, "END_DATE", endDate + "235959");
            }

        	this.fnselectOneOnOneByAdmin();
        };

        // 종료일 변경 이벤트
        this.Calendar00_00_00_onchanged = function(obj,e)
        {
        	var startDate = this.Calendar00_01.value;
            var endDate   = this.Calendar00_00_00.value;

            if (!endDate) return; // 종료일 없으면 처리 중단

            if (startDate && endDate < startDate) {
                this.alert("종료일은 시작일보다 빠를 수 없습니다.");
                this.Calendar00_00_00.set_value(startDate);
                endDate = startDate;
            }

            // 종료일은 23시 59분
            this.ds_search.setColumn(0, "END_DATE", endDate + "235959");

            // 시작일이 있으면 00시 00분까지 세팅
            if (startDate) {
                this.ds_search.setColumn(0, "START_DATE", startDate + "000000");
            }

        	this.fnselectOneOnOneByAdmin();
        };

        // 그리드 셀클릭이벤트
        this.grid_list_oncellclick = function(obj,e)
        {
        	var row = e.row;      // 클릭한 행 번호
            var col = e.col;      // 클릭한 컬럼 번호
            var colId = obj.getCellProperty("body", col, "text");

            // 특정 컬럼만 동작시키고 싶다면 조건문
            if (colId.indexOf("POST_STATUS") > -1) {
                var postId = this.ds_board.getColumn(row, "POST_ID");
                var popupArgs = { POST_ID: postId }


        		 // 팝업 크기
                var popW = 500;
                var popH = 350;

        		var owner = this.getOwnerFrame();
                var absX = (owner.width  - popW) / 2;
                var absY = (owner.height - popH) / 2;



                var objChildFrame = new ChildFrame(); // 하나의 새 폼 만들고
        		objChildFrame.init("itemPop", absX, absY, popW, popH, null, null, "popup::Pop_BaordQnA.xfdl"); // init
        		objChildFrame.showModal(this.getOwnerFrame(), popupArgs, this, "fn_popupCallback"); // 모달 띄어주기
            }
        };
        this.fn_popupCallback = function(){
        	this.fnselectOneOnOneByAdmin();
        };





        //1대1 게시판 조회 트랜젝션
        this.fnselectOneOnOneByAdmin = function(){
        	var strSvcID       = "fnselectOneOnOneByAdmin";
            var strURL         = "svc::selectOneOnOneByAdmin.do?time=" + new Date().getTime();
            var strInDatasets  = "ds_search=ds_search";
            var strOutDatasets = "ds_board=ds_board";
            var strArg         = "";
            var strCallback    = "fnCallback";

            this.transaction(strSvcID, strURL, strInDatasets, strOutDatasets, strArg, strCallback);
        }

        // 공통 콜백
        this.fnCallback = function(svcID, errCode, errMsg) {
            if (errCode < 0) {
                this.alert("에러: " + errMsg);
                return;
            }

            switch(svcID) {
                case "fnselectOneOnOneByAdmin":
                    trace("조회 완료");
                    break;

            }
        };


        // 검색 영역 hover 효과
        this.search_area_onmousemove = function(obj, e)
        {
            obj.set_boxShadow("0px 0px 3px 3px rgba(200,200,200,0.30)");
        };

        this.search_area_onmouseleave = function(obj, e)
        {
            obj.set_boxShadow("0px 0px 2px 2px rgba(229,229,229,0.15)");
        };

        // Grid wrapper hover 효과
        this.grid_wrapper_onmousemove = function(obj, e)
        {
            obj.set_boxShadow("0px 0px 4px 3px rgba(200,200,200,0.30)");
        };

        this.grid_wrapper_onmouseleave = function(obj, e)
        {
            obj.set_boxShadow("0px 0px 2px 2px rgba(229,229,229,0.15)");
        };



        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_Board_Qna_onload,this);
            this.search_area.addEventHandler("onmousemove",this.search_area_onmousemove,this);
            this.search_area.addEventHandler("onmouseleave",this.search_area_onmouseleave,this);
            this.search_area.form.stc_name.addEventHandler("onclick",this.search_area_txt_th_onclick,this);
            this.search_area.form.Edit00.addEventHandler("onkeyup",this.search_area_Edit00_onkeyup,this);
            this.search_area.form.stc_ship.addEventHandler("onclick",this.search_area_txt_th_onclick,this);
            this.search_area.form.rad_type.addEventHandler("onitemchanged",this.search_area_rad_type_onitemchanged,this);
            this.search_area.form.Calendar00_01.addEventHandler("onchanged",this.Calendar00_01_onchanged,this);
            this.search_area.form.stc_name00.addEventHandler("onclick",this.search_area_txt_th_onclick,this);
            this.search_area.form.txt_th00_00_00.addEventHandler("onclick",this.search_area_txt_th_onclick,this);
            this.search_area.form.Calendar00_00_00.addEventHandler("onchanged",this.Calendar00_00_00_onchanged,this);
            this.grid_wrapper.addEventHandler("onmousemove",this.grid_wrapper_onmousemove,this);
            this.grid_wrapper.addEventHandler("onmouseleave",this.grid_wrapper_onmouseleave,this);
            this.grid_wrapper.form.grid_list.addEventHandler("oncellclick",this.grid_list_oncellclick,this);
            this.stc_ship00_00.addEventHandler("onclick",this.search_area_txt_th_onclick,this);
        };
        this.loadIncludeScript("Form_Board_Qna.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
