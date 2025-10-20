(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_ReviewList");
            this.set_titletext("New Form");
            this.set_background("#F4F7FE");
            if (Form == this.constructor)
            {
                this._setFormPosition(1080,630);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_review_list", this);
            obj._setContents("<ColumnInfo><Column id=\"REVIEW_ID\" type=\"STRING\" size=\"256\"/><Column id=\"MEMBER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"PRODUCT_ID\" type=\"STRING\" size=\"256\"/><Column id=\"PRODUCT_CODE\" type=\"STRING\" size=\"256\"/><Column id=\"PRODUCT_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"REVIEW_TITLE\" type=\"STRING\" size=\"256\"/><Column id=\"REVIEW_CONTENT\" type=\"STRING\" size=\"256\"/><Column id=\"STAR_POINT\" type=\"STRING\" size=\"256\"/><Column id=\"INPUT_DT\" type=\"STRING\" size=\"256\"/><Column id=\"REVIEW_STATUS\" type=\"STRING\" size=\"256\"/><Column id=\"POINT_ISSUED\" type=\"STRING\" size=\"256\"/><Column id=\"ORDER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"ISSUED_DT\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_search_combo", this);
            obj._setContents("<ColumnInfo><Column id=\"SEARCH_TYPE\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"SEARCH_TYPE\">검색분류</Col></Row><Row><Col id=\"SEARCH_TYPE\">상품코드</Col></Row><Row><Col id=\"SEARCH_TYPE\">상품명</Col></Row><Row><Col id=\"SEARCH_TYPE\">아이디</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_issued_state", this);
            obj._setContents("<ColumnInfo><Column id=\"datacolumn\" type=\"STRING\" size=\"256\"/><Column id=\"codecolumn\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"datacolumn\">전체</Col><Col id=\"codecolumn\">all</Col></Row><Row><Col id=\"datacolumn\">지급</Col><Col id=\"codecolumn\">Y</Col></Row><Row><Col id=\"codecolumn\">N</Col><Col id=\"datacolumn\">미지급</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_search", this);
            obj._setContents("<ColumnInfo><Column id=\"POINT_ISSUED\" type=\"STRING\" size=\"256\"/><Column id=\"SEARCH_COMBO\" type=\"STRING\" size=\"256\"/><Column id=\"SEARCH_DATA\" type=\"STRING\" size=\"256\"/><Column id=\"START_DT\" type=\"STRING\" size=\"256\"/><Column id=\"END_DT\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Grid("grid_list","40","220",null,null,"40","40",null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_background("#FFFFFF");
            obj.set_border("0px none");
            obj.set_borderRadius("10px");
            obj.set_autofittype("col");
            obj.set_binddataset("ds_review_list");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"48\"/><Column size=\"68\"/><Column size=\"103\"/><Column size=\"169\"/><Column size=\"140\"/><Column size=\"55\"/><Column size=\"128\"/><Column size=\"110\"/><Column size=\"111\"/><Column size=\"68\"/></Columns><Rows><Row size=\"48\" band=\"head\"/><Row size=\"40\"/></Rows><Band id=\"head\"><Cell text=\"NO\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"1\" text=\"주문아이디\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"2\" text=\"상품코드\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"3\" text=\"상품명\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"4\" text=\"회원ID\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"5\" text=\"별점\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\"/><Cell col=\"6\" text=\"리뷰작성일\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"7\" text=\"포인트지급여부\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"8\" text=\"지급일\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"9\" text=\"리뷰상세\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/></Band><Band id=\"body\"><Cell text=\"expr:currow + 1\" textAlign=\"center\"/><Cell col=\"1\" text=\"bind:ORDER_ID\"/><Cell col=\"2\" text=\"bind:PRODUCT_CODE\" textAlign=\"center\"/><Cell col=\"3\" text=\"bind:PRODUCT_NAME\"/><Cell col=\"4\" text=\"bind:MEMBER_ID\" textAlign=\"center\"/><Cell col=\"5\" text=\"bind:STAR_POINT\" textAlign=\"center\"/><Cell col=\"6\" edittype=\"none\" text=\"bind:INPUT_DT\" textAlign=\"center\"/><Cell col=\"7\" text=\"bind:POINT_ISSUED\" textAlign=\"center\"/><Cell col=\"8\" edittype=\"none\" text=\"bind:ISSUED_DT\" textAlign=\"center\"/><Cell col=\"9\" displaytype=\"buttoncontrol\" text=\"관리\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Div("search_area","40","20",null,"190","40",null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_background("#ffffff");
            obj.set_borderRadius("10px");
            this.addChild(obj.name, obj);

            obj = new Static("search_tit","20","49","60","41",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("0");
            obj.set_text("검색분류");
            obj.set_font("normal 700 10pt/normal \"Noto Sans KR Bold\"");
            obj.set_color("#2b3674");
            this.search_area.addChild(obj.name, obj);

            obj = new Static("Static00","82","61","2","20",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("1");
            obj.set_background("#cccccc");
            obj.set_text("");
            this.search_area.addChild(obj.name, obj);

            obj = new Static("Static00_00","83","16","2","20",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("2");
            obj.set_background("#cccccc");
            obj.set_text("");
            this.search_area.addChild(obj.name, obj);

            obj = new Static("search_tit00","21","12","60","28",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("3");
            obj.set_text("지급유무");
            obj.set_font("normal 700 10pt/normal \"Noto Sans KR Bold\"");
            obj.set_color("#2b3674");
            this.search_area.addChild(obj.name, obj);

            obj = new Combo("search_combo","110","51","114","36",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("4");
            obj.set_innerdataset("ds_search_combo");
            obj.set_codecolumn("SEARCH_TYPE");
            obj.set_datacolumn("SEARCH_TYPE");
            obj.set_borderRadius("5px");
            obj.set_text("상품코드");
            obj.set_value("상품코드");
            obj.set_index("0");
            this.search_area.addChild(obj.name, obj);

            obj = new Edit("edit_search","234","51","161","36",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("5");
            obj.set_borderRadius("5px");
            this.search_area.addChild(obj.name, obj);

            obj = new Radio("radio_issued","110","12","280","29",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("6");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_direction("vertical");
            obj.set_innerdataset("ds_issued_state");
            obj.set_text("전체");
            obj.set_value("all");
            obj.set_index("0");
            this.search_area.addChild(obj.name, obj);

            obj = new Static("search_tit00_00_00","20","94","60","41",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("7");
            obj.set_text("리뷰작성일");
            obj.set_font("normal 700 10pt/normal \"Noto Sans KR Bold\"");
            obj.set_color("#2b3674");
            this.search_area.addChild(obj.name, obj);

            obj = new Static("Static00_00_00_00","83","107","2","20",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("8");
            obj.set_background("#cccccc");
            obj.set_text("");
            this.search_area.addChild(obj.name, obj);

            obj = new Calendar("cal_start_day","110","99","230","36",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("9");
            obj.set_borderRadius("5px");
            obj.set_font("normal 10pt/normal \"Noto Sans KR Medium\"");
            this.search_area.addChild(obj.name, obj);

            obj = new Calendar("cal_end_day","375","99","230","36",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("10");
            obj.set_borderRadius("5px");
            obj.set_font("normal 10pt/normal \"Noto Sans KR Medium\"");
            this.search_area.addChild(obj.name, obj);

            obj = new Static("txt_update_td","347","99","27","36",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("11");
            obj.set_text("~");
            obj.set_font("normal 14pt/normal \"Noto Sans KR\"");
            this.search_area.addChild(obj.name, obj);

            obj = new Button("btn_select","390","145","100","30",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("12");
            obj.set_text("조회");
            obj.set_borderRadius("5px");
            obj.set_background("#135dae");
            obj.set_color("white");
            obj.set_font("normal 11pt/normal \"Noto Sans KR Medium\"");
            obj.set_textAlign("center");
            obj.set_cursor("pointer");
            this.search_area.addChild(obj.name, obj);

            obj = new Button("btn_reset","509","145","100","30",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("13");
            obj.set_text("초기화");
            obj.set_borderRadius("5px");
            obj.set_background("#8e8e8e");
            obj.set_color("white");
            obj.set_font("normal 11pt/normal \"Noto Sans KR Medium\"");
            obj.set_textAlign("center");
            obj.set_cursor("pointer");
            this.search_area.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1080,630,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item0","grid_list","binddataset","ds_user","");
            this.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Form_ReviewList.xfdl", function() {
        this.Form_ReviewList_onload = function(obj,e)
        {
        	this.search_area.form.edit_search.set_enable(false);
        	this.fnSearchReview();
        	trace("리뷰이벤트 출력여부 확인용>>>");
        };

        this.search_area_btn_select_onclick = function(obj,e)
        {
        	this.fnSearchReview();
        };

        this.search_area_btn_reset_onclick = function(obj,e)
        {
        	this.reload();
        };


        this.search_area_review_info_onitemchanged = function(obj,e)
        {
        	var searchCombo = this.search_area.form.search_combo.value;
            if(searchCombo == "검색분류") {
                this.search_area.form.edit_search.set_enable(false);
                this.search_area.form.edit_search.set_value("");
            } else {
                this.search_area.form.edit_search.set_enable(true);
            }
        };

        //팝업용
        this.grid_list_oncellclick = function(obj, e) {
            if(e.cell == 9){ // 리뷰 상세 열 클릭
                var row = e.row;
                var popup = new nexacro.ChildFrame();
                var surl = "promotion::Form_ReviewDetail.xfdl";
                popup.init("openReviewPop", 300, 10, 800, 700, null, null, surl);
                popup.set_dragmovetype("all");
                popup.set_showtitlebar(true);

                // 선택 리뷰 정보 전달 - REVIEW_ID를 문자열로 변환
                popup.arguments = {
                    REVIEW_ID: String(this.ds_review_list.getColumn(row,"REVIEW_ID")),
                    MEMBER_ID: this.ds_review_list.getColumn(row,"MEMBER_ID"),
                    ORDER_ID: String(this.ds_review_list.getColumn(row,"ORDER_ID")),
        			PRODUCT_ID: String(this.ds_review_list.getColumn(row,"PRODUCT_ID")),
        			PRODUCT_CODE: this.ds_review_list.getColumn(row,"PRODUCT_CODE"),
                    PRODUCT_NAME: this.ds_review_list.getColumn(row,"PRODUCT_NAME"),
                    REVIEW_TITLE: this.ds_review_list.getColumn(row,"REVIEW_TITLE"),
                    REVIEW_CONTENT: this.ds_review_list.getColumn(row,"REVIEW_CONTENT"),
        			POINT_ISSUED: this.ds_review_list.getColumn(row,"POINT_ISSUED"),
        			ISSUED_DT: this.ds_review_list.getColumn(row,"ISSUED_DT"),
        			STAR_POINT: this.ds_review_list.getColumn(row,"STAR_POINT"),
        			INPUT_DT: this.ds_review_list.getColumn(row,"INPUT_DT") // 추가: 리뷰 작성일
                };
                popup.showModal(this.getOwnerFrame(), null, this, "fn_popCallback", true);
            }
        };

        // 리뷰리스트
        this.fnSearchReview = function() {
            var strSvcID       = "selectReview";
            var strURL         = "svc::selectProductReviewListByAdmin.do";
            var strInDatasets  = "ds_search=ds_search";
            var strOutDatasets = "ds_review_list=ds_review_list";
            var strArg = "";
            var strCallback    = "fnCallback";

            // 먼저 ds_search 초기화
            this.ds_search.clearData();
            this.ds_search.addRow();

            var pointIssued = this.search_area.form.radio_issued.value;
            if(pointIssued && pointIssued != "" && pointIssued != "all") {
                this.ds_search.setColumn(0, "POINT_ISSUED", pointIssued);
                trace("지급유무: " + pointIssued);
            }

            // 검색 분류 & 검색어
            var searchCombo = this.search_area.form.search_combo.value;
            if(searchCombo && searchCombo != "검색분류") {
                var editSearch = this.search_area.form.edit_search.value;

                if(!editSearch || editSearch.trim() == "") {
                    this.alert("검색어를 입력해주세요.");
                    return;
                }

                editSearch = editSearch.trim();

                if(editSearch.length > 50) {
                    this.alert("검색어는 50자 이내로 입력해주세요.");
                    return;
                }

                this.ds_search.setColumn(0, "SEARCH_COMBO", searchCombo);
                this.ds_search.setColumn(0, "SEARCH_DATA", editSearch);
            }

            // 리뷰일
            var startDate = this.search_area.form.cal_start_day.value;
            var endDate = this.search_area.form.cal_end_day.value;

            if(startDate && endDate && startDate != "" && endDate != "") {
                if(startDate > endDate) {
                    this.alert("시작일은 종료일보다 이전이어야 합니다.");
                    return;
                }
            }

            if(startDate && startDate != "") {
                this.ds_search.setColumn(0, "START_DT", startDate);
                trace("리뷰작성일: " + startDate);
            }

            if(endDate && endDate != "") {
                this.ds_search.setColumn(0, "END_DT", endDate);
                trace("리뷰작성종료일: " + endDate);
            }

            this.transaction(strSvcID, strURL, strInDatasets, strOutDatasets, strArg, strCallback);
        };

        // 공통 콜백
        this.fnCallback = function(svc, err, errMsg) {
            if (err < 0) {
                this.alert("에러 발생: " + errMsg);
                return;
            }
            switch(svc){
        		case "selectReview":
                    var rowCount = this.ds_review_list.getRowCount();
                    if(rowCount == 0) {
                        this.alert("검색 조건에 맞는 리뷰가 없습니다.");
                    }
                return;
        	}
        };

        // 팝업공통 콜백
        this.fn_popCallback = function(svcID, strVal){
            switch(svcID){
                case "openReviewPop":
                    if(strVal == "REFRESH_NEEDED"){
                        trace("포인트 지급 완료, 리스트 새로고침");
                        this.fnSearchReview();
                    }
                break;
            }
        };
        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_ReviewList_onload,this);
            this.grid_list.addEventHandler("oncellclick",this.grid_list_oncellclick,this);
            this.search_area.form.search_tit.addEventHandler("onclick",this.search_area_search_txt01_onclick,this);
            this.search_area.form.search_tit00.addEventHandler("onclick",this.search_area_search_txt01_onclick,this);
            this.search_area.form.search_combo.addEventHandler("onitemchanged",this.search_area_review_info_onitemchanged,this);
            this.search_area.form.radio_issued.addEventHandler("onitemchanged",this.search_area_radio_issued_onitemchanged,this);
            this.search_area.form.search_tit00_00_00.addEventHandler("onclick",this.search_area_search_txt01_onclick,this);
            this.search_area.form.txt_update_td.addEventHandler("onclick",this.txt_th00_onclick,this);
            this.search_area.form.btn_select.addEventHandler("onclick",this.search_area_btn_select_onclick,this);
            this.search_area.form.btn_reset.addEventHandler("onclick",this.search_area_btn_reset_onclick,this);
        };
        this.loadIncludeScript("Form_ReviewList.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
