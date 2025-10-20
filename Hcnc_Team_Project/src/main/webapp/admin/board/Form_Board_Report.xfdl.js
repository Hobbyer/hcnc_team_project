(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_Board_Notice");
            this.set_titletext("New Form");
            this.set_color("blue");
            this.set_background("#F4F7FE");
            this.set_font("normal 11pt/normal \"Noto Sans KR\"");
            this.set_scrolltype("none");
            this.set_scrollbartype("none");
            this.set_scrollbarsize("0");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_report", this);
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"256\"/><Column id=\"NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"CODE\">전체</Col><Col id=\"NAME\">전체</Col></Row><Row><Col id=\"CODE\">신고접수</Col><Col id=\"NAME\">신고접수</Col></Row><Row><Col id=\"CODE\">신고처리</Col><Col id=\"NAME\">신고처리</Col></Row><Row><Col id=\"CODE\">신고취소</Col><Col id=\"NAME\">신고취소</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_list", this);
            obj._setContents("<ColumnInfo><Column id=\"TARGET_TYPE\" type=\"STRING\" size=\"256\"/><Column id=\"REPORTER\" type=\"STRING\" size=\"256\"/><Column id=\"COMMENT_ID\" type=\"STRING\" size=\"256\"/><Column id=\"REVIEW_ID\" type=\"STRING\" size=\"256\"/><Column id=\"BOARD_WRITER\" type=\"STRING\" size=\"256\"/><Column id=\"REPORT_TYPE\" type=\"STRING\" size=\"256\"/><Column id=\"REPORT_STATUS\" type=\"STRING\" size=\"256\"/><Column id=\"CHK\" type=\"STRING\" size=\"256\"/><Column id=\"USER_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"REPORT_ID\" type=\"STRING\" size=\"256\"/><Column id=\"REPORT_CONTENT\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_search", this);
            obj._setContents("<ColumnInfo><Column id=\"USER_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"REPORT_STATUS\" type=\"STRING\" size=\"256\"/><Column id=\"REPORT_TYPE\" type=\"STRING\" size=\"256\"/><Column id=\"TARGET_TYPE\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_postType", this);
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"256\"/><Column id=\"NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"CODE\">전체</Col><Col id=\"NAME\">전체</Col></Row><Row><Col id=\"CODE\">댓글</Col><Col id=\"NAME\">댓글</Col></Row><Row><Col id=\"CODE\">리뷰</Col><Col id=\"NAME\">리뷰</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_reportType", this);
            obj._setContents("<ColumnInfo><Column id=\"REPORT_TYPE\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_selected", this);
            obj._setContents("<ColumnInfo><Column id=\"TARGET_TYPE\" type=\"STRING\" size=\"256\"/><Column id=\"REPORTER\" type=\"STRING\" size=\"256\"/><Column id=\"COMMENT_ID\" type=\"STRING\" size=\"256\"/><Column id=\"REVIEW_ID\" type=\"STRING\" size=\"256\"/><Column id=\"BOARD_WRITER\" type=\"STRING\" size=\"256\"/><Column id=\"REPORT_TYPE\" type=\"STRING\" size=\"256\"/><Column id=\"REPORT_STATUS\" type=\"STRING\" size=\"256\"/><Column id=\"REPORT_ID\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_reportGrid", this);
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"256\"/><Column id=\"NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"CODE\">신고접수</Col><Col id=\"NAME\">신고접수</Col></Row><Row><Col id=\"CODE\">신고처리</Col><Col id=\"NAME\">신고처리</Col></Row><Row><Col id=\"CODE\">신고취소</Col><Col id=\"NAME\">신고취소</Col></Row></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Div("search_area","40","10",null,"60","40",null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_background("#ffffff");
            obj.set_borderRadius("10px");
            obj.set_text("");
            obj.set_boxShadow("0px 0px 2px 2px rgba(229,229,229,0.15)");
            this.addChild(obj.name, obj);

            obj = new Static("stc_name",null,"13","50","36","29.08%",null,null,null,null,null,this.search_area.form);
            obj.set_taborder("2");
            obj.set_text("작성자");
            obj.set_font("normal 11pt/normal \"Noto Sans KR Medium\"");
            this.search_area.addChild(obj.name, obj);

            obj = new Edit("Edit00",null,"14","105","30","20%",null,null,null,null,null,this.search_area.form);
            obj.set_taborder("3");
            obj.set_borderRadius("5px");
            this.search_area.addChild(obj.name, obj);

            obj = new Static("stc_postType","2.5%","13","80","36",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("0");
            obj.set_text("게시글 유형");
            obj.set_font("normal 11pt/normal \"Noto Sans KR Medium\"");
            this.search_area.addChild(obj.name, obj);

            obj = new Radio("rad_type","10.83%","13","190","36",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("1");
            obj.set_innerdataset("ds_postType");
            obj.set_codecolumn("NAME");
            obj.set_datacolumn("NAME");
            obj.set_direction("vertical");
            obj.set_font("normal 9pt/normal \"Noto Sans KR\"");
            obj.set_text("전체");
            obj.set_value("전체");
            obj.set_index("0");
            this.search_area.addChild(obj.name, obj);

            obj = new Static("stc_report","29.92%","12","70","36",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("4");
            obj.set_text("신고 상태");
            obj.set_font("normal 11pt/normal \"Noto Sans KR Medium\"");
            this.search_area.addChild(obj.name, obj);

            obj = new Combo("Combo00","35.5%","14","104","30",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("5");
            obj.set_innerdataset("ds_report");
            obj.set_codecolumn("NAME");
            obj.set_datacolumn("NAME");
            obj.set_borderRadius("5px");
            obj.set_text("전체");
            obj.set_value("전체");
            obj.set_index("0");
            this.search_area.addChild(obj.name, obj);

            obj = new Static("stc_report00",null,"12","70","36","45.67%",null,null,null,null,null,this.search_area.form);
            obj.set_taborder("6");
            obj.set_text("신고 유형");
            obj.set_font("normal 11pt/normal \"Noto Sans KR Medium\"");
            this.search_area.addChild(obj.name, obj);

            obj = new Combo("Combo00_00",null,"14","104","30","37.25%",null,null,null,null,null,this.search_area.form);
            obj.set_taborder("7");
            obj.set_innerdataset("ds_reportType");
            obj.set_codecolumn("REPORT_TYPE");
            obj.set_datacolumn("REPORT_TYPE");
            obj.set_borderRadius("5px");
            obj.set_text("");
            obj.set_value("");
            obj.set_index("0");
            this.search_area.addChild(obj.name, obj);

            obj = new Button("btn_save",null,"14","100","30","30",null,null,null,null,null,this.search_area.form);
            obj.set_taborder("8");
            obj.set_text("저장");
            obj.set_borderRadius("5px");
            obj.set_background("#135dae");
            obj.set_color("white");
            obj.set_font("normal 11pt/normal \"Noto Sans KR Medium\"");
            obj.set_textAlign("center");
            obj.set_cursor("pointer");
            this.search_area.addChild(obj.name, obj);

            obj = new Div("grid_wrapper","40","100",null,null,"40","48",null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_background("#FFFFFF");
            obj.set_borderRadius("10px");
            obj.set_boxShadow("0px 0px 2px 2px rgba(229,229,229,0.15)");
            this.addChild(obj.name, obj);

            obj = new Grid("grid_header","0","0",null,"40","10",null,null,null,null,null,this.grid_wrapper.form);
            obj.set_taborder("0");
            obj.set_binddataset("ds_list");
            obj.set_autofittype("col");
            obj.set_background("#FFFFFF");
            obj.set_border("0px none");
            obj.set_selecttype("row");
            obj.set_readonly("true");
            obj.set_enableevent("false");
            obj.set_scrolltype("none");
            obj.set_scrollbartype("none");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"26\"/><Column size=\"47\"/><Column size=\"52\"/><Column size=\"51\"/><Column size=\"236\"/><Column size=\"66\"/><Column size=\"100\"/><Column size=\"54\"/><Column size=\"67\"/></Columns><Rows><Row size=\"40\"/></Rows><Band id=\"body\"><Cell text=\"chk\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\" textAlign=\"center\"/><Cell col=\"1\" text=\"게시분류\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\" textAlign=\"center\"/><Cell col=\"2\" text=\"리뷰ID\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\" textAlign=\"center\"/><Cell col=\"3\" text=\"댓글ID\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\" textAlign=\"center\"/><Cell col=\"4\" text=\"신고내용\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\" textAlign=\"center\"/><Cell col=\"5\" text=\"작성자\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\" textAlign=\"center\"/><Cell col=\"6\" text=\"작성자ID\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\" textAlign=\"center\"/><Cell col=\"7\" text=\"신고 유형\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\" textAlign=\"center\"/><Cell col=\"8\" text=\"신고 상태\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\" textAlign=\"center\"/></Band></Format></Formats>");
            this.grid_wrapper.addChild(obj.name, obj);

            obj = new Grid("grid_list","0","40",null,null,"0","0",null,null,null,null,this.grid_wrapper.form);
            obj.set_taborder("1");
            obj.set_binddataset("ds_list");
            obj.set_autofittype("col");
            obj.set_background("#FFFFFF");
            obj.set_border("0px none");
            obj.set_borderRadius("0px 0px 10px 10px");
            obj.set_scrollbartype("auto");
            obj.set_scrollbarsize("10");
            obj.set_scrollbartrackbarsize("40");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"26\"/><Column size=\"47\"/><Column size=\"52\"/><Column size=\"51\"/><Column size=\"236\"/><Column size=\"66\"/><Column size=\"100\"/><Column size=\"54\"/><Column size=\"67\"/></Columns><Rows><Row size=\"34\"/></Rows><Band id=\"body\"><Cell text=\"bind:CHK\" displaytype=\"checkboxcontrol\" edittype=\"checkbox\" checkboxtruevalue=\"1\" checkboxfalsevalue=\"0\" textAlign=\"center\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR DemiLight&quot;\"/><Cell col=\"1\" text=\"bind:TARGET_TYPE\" textAlign=\"center\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR DemiLight&quot;\"/><Cell col=\"2\" text=\"bind:REVIEW_ID\" textAlign=\"center\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR DemiLight&quot;\" edittype=\"none\" cursor=\"pointer\"/><Cell col=\"3\" text=\"bind:COMMENT_ID\" textAlign=\"center\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR DemiLight&quot;\" edittype=\"none\" cursor=\"pointer\"/><Cell col=\"4\" text=\"bind:REPORT_CONTENT\" textAlign=\"center\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR DemiLight&quot;\" edittype=\"none\"/><Cell col=\"5\" text=\"bind:USER_NAME\" textAlign=\"center\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR DemiLight&quot;\" edittype=\"none\"/><Cell col=\"6\" text=\"bind:BOARD_WRITER\" textAlign=\"center\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR DemiLight&quot;\" edittype=\"none\"/><Cell col=\"7\" text=\"bind:REPORT_TYPE\" textAlign=\"center\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR DemiLight&quot;\" edittype=\"none\"/><Cell col=\"8\" text=\"bind:REPORT_STATUS\" textAlign=\"center\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR DemiLight&quot;\" edittype=\"combo\" displaytype=\"combocontrol\" combodataset=\"ds_reportGrid\" combodatacol=\"NAME\" combocodecol=\"NAME\" cssclass=\"expr:(REPORT_STATUS==&apos;신고접수&apos;?&apos;cell_pending&apos;:(REPORT_STATUS==&apos;신고처리&apos;?&apos;cell_done&apos;:(REPORT_STATUS==&apos;신고취소&apos;?&apos;cell_wait&apos;:&apos;&apos;)))\"/></Band></Format></Formats>");
            this.grid_wrapper.addChild(obj.name, obj);

            obj = new Static("stc_postType","51","81","150","16",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("* 각 ID를 클릭해주세요");
            obj.set_font("normal 9pt/normal \"Noto Sans KR\"");
            obj.set_color("#135dae");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1280,720,this,function(p){});
            obj.set_mobileorientation("landscape");
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item0","search_area.form.Edit00","value","ds_search","USER_NAME");
            this.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Form_Board_Report.xfdl", function() {
        //페이지 온로드시
        this.Form_Board_Notice_onload = function(obj,e)
        {
        	this.fnselectReportByAdmin();
            this.grid_wrapper.form.grid_list.setCellProperty("head", 0, "text", "0");
        	this.search_area_Combo00_00.set_value("전체");
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


        // 리포트 리스트 조회 트랜젝션
        this.fnselectReportByAdmin = function(){
        	var timestamp   = new Date().getTime();

        	var strSvcID       = "selectReportByAdmin";
            var strURL         = "svc::selectReportByAdmin.do?time=" + new Date().getTime();
            var strInDatasets  = "ds_search=ds_search";
            var strOutDatasets = "ds_list=ds_list ds_reportType=ds_reportType";
            var strArg         = "";
            var strCallback    = "fnCallback";

            this.transaction(strSvcID, strURL, strInDatasets, strOutDatasets, strArg, strCallback);
        }

        //
        this.fnUpdateReportByAdmin = function(){
        	var timestamp   = new Date().getTime();

        	var strSvcID       = "updateReportByAdmin";
            var strURL         = "svc::updateReportByAdmin.do?time=" + new Date().getTime();
            var strInDatasets  = "ds_selected=ds_selected";
            var strOutDatasets = "";
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
                case "selectReportByAdmin":

                    trace("조회 완료");
                    break;

        		case "updateReportByAdmin" :

        			this.fnselectReportByAdmin();
        		    trace("수정 완료");
        			break;
            }
        };


        // 신고 상태별 조회(콤보박스)
        this.search_area_Combo00_onitemchanged = function(obj,e)
        {
        	var type = e.postvalue;
        	this.ds_search.setColumn(0,"REPORT_STATUS",type);
        	this.fnselectReportByAdmin();
        };

        // 신고 유형별 조회(콤보박스)
        this.search_area_Combo00_00_onitemchanged = function(obj,e)
        {
        	var type = e.postvalue;
        	this.ds_search.setColumn(0,"REPORT_TYPE",type);
        	this.fnselectReportByAdmin();
        };

        // 댓글, 리뷰 유형(라디오)
        this.search_area_rad_type_onitemchanged = function(obj,e)
        {
        	var type = e.postvalue;
        	this.ds_search.setColumn(0,"TARGET_TYPE",type);
        	this.fnselectReportByAdmin();
        };

        // 글 작성자 조회(에디트박스)
        this.search_area_Edit00_onkeyup = function(obj,e)
        {
        	if(e.keycode==13){
        		this.fnselectReportByAdmin();
        	}

        };

        //조회 버튼
        this.search_area_Button00_onclick = function(obj,e)
        {
        	this.fnselectReportByAdmin();

        };

        //체크박스 전체선택 , 전체해제
        this.grid_list_onheadclick = function(obj, e)
        {
            // 첫 번째 컬럼(체크박스 헤더) 클릭 시
            if (e.cell == 0) {
                var headVal = obj.getCellProperty("head", 0, "text");

                // 현재 상태 확인 (체크 → 해제 / 해제 → 체크)
                var newVal = (headVal == "1" ? "0" : "1");

                // 헤더 갱신
                obj.setCellProperty("head", 0, "text", newVal);

                // 데이터셋 전체 반영
                for (var i = 0; i < this.ds_list.getRowCount(); i++) {
                    this.ds_list.setColumn(i, "CHK", newVal);
                }
            }
        };

        // 저장버튼 클릭시
        this.search_area_btn_save_onclick = function(obj,e)
        {
        	this.ds_selected.clearData();

            for (var i = 0; i < this.ds_list.getRowCount(); i++) {
                if (this.ds_list.getColumn(i, "CHK") == "1") {
                    var nRow = this.ds_selected.addRow();
                    this.ds_selected.copyRow(nRow, this.ds_list, i);
                }
            }

            if (this.ds_selected.getRowCount() == 0) {
                this.alert("선택된 항목이 없습니다.");
                return;
            }

        	//저장 버튼을 눌렀을때 트랜젝션
        	this.fnUpdateReportByAdmin();
        };


        this.grid_list_oncellclick = function(obj,e)
        {
        	var row = e.row;      // 클릭한 행 번호
            var col = e.col;      // 클릭한 컬럼 번호
            var colId = obj.getCellProperty("body", col, "text");


            // 특정 컬럼만 동작시키고 싶다면 조건문
            if (colId.indexOf("COMMENT_ID") > -1) { // 댓글 신고 조회
        		var commentId   = this.ds_list.getColumn(row,"COMMENT_ID");
        		if(!commentId){
        			alert("리뷰 신고입니다.");
        			return;
        		}

                var popupArgs = {COMMENT_ID : commentId}

        		 // 팝업 크기
                var popW = 500;
                var popH = 350;

        		var owner = this.getOwnerFrame();
                var absX = (owner.width  - popW) / 2;
                var absY = (owner.height - popH) / 2;

                var objChildFrame = new ChildFrame(); // 하나의 새 폼 만들고
        		objChildFrame.init("itemPop", absX, absY, popW, popH, null, null, "popup::Pop_BaordReport.xfdl"); // init
        		objChildFrame.showModal(this.getOwnerFrame(), popupArgs, this, "fn_popupCallback"); // 모달 띄어주기
            }

        	    // 특정 컬럼만 동작시키고 싶다면 조건문
            if (colId.indexOf("REVIEW_ID") > -1) {

        		var reviewId    = this.ds_list.getColumn(row,"REVIEW_ID");
        		if(!reviewId){
        			alert("게시글 신고입니다.");
        			return;
        		}

                var popupArgs = {REVIEW_ID : reviewId}

        		 // 팝업 크기
                var popW = 500;
                var popH = 350;

        		var owner = this.getOwnerFrame();
                var absX = (owner.width  - popW) / 2;
                var absY = (owner.height - popH) / 2;

                var objChildFrame = new ChildFrame(); // 하나의 새 폼 만들고
        		objChildFrame.init("itemPop", absX, absY, popW, popH, null, null, "popup::Pop_BaordReport.xfdl"); // init
        		objChildFrame.showModal(this.getOwnerFrame(), popupArgs, this, "fn_popupCallback"); // 모달 띄어주기
            }
        };



        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_Board_Notice_onload,this);
            this.search_area.addEventHandler("onmousemove",this.search_area_onmousemove,this);
            this.search_area.addEventHandler("onmouseleave",this.search_area_onmouseleave,this);
            this.search_area.form.stc_name.addEventHandler("onclick",this.search_area_txt_th_onclick,this);
            this.search_area.form.Edit00.addEventHandler("onkeyup",this.search_area_Edit00_onkeyup,this);
            this.search_area.form.stc_postType.addEventHandler("onclick",this.search_area_txt_th_onclick,this);
            this.search_area.form.rad_type.addEventHandler("onitemchanged",this.search_area_rad_type_onitemchanged,this);
            this.search_area.form.stc_report.addEventHandler("onclick",this.search_area_txt_th_onclick,this);
            this.search_area.form.Combo00.addEventHandler("onitemchanged",this.search_area_Combo00_onitemchanged,this);
            this.search_area.form.stc_report00.addEventHandler("onclick",this.search_area_txt_th_onclick,this);
            this.search_area.form.Combo00_00.addEventHandler("onitemchanged",this.search_area_Combo00_00_onitemchanged,this);
            this.search_area.form.btn_save.addEventHandler("onclick",this.search_area_btn_save_onclick,this);
            this.grid_wrapper.addEventHandler("onmousemove",this.grid_wrapper_onmousemove,this);
            this.grid_wrapper.addEventHandler("onmouseleave",this.grid_wrapper_onmouseleave,this);
            this.grid_wrapper.form.grid_list.addEventHandler("onheadclick",this.grid_list_onheadclick,this);
            this.grid_wrapper.form.grid_list.addEventHandler("oncellclick",this.grid_list_oncellclick,this);
            this.stc_postType.addEventHandler("onclick",this.search_area_txt_th_onclick,this);
        };
        this.loadIncludeScript("Form_Board_Report.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
