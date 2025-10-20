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
            obj = new Dataset("ds_search_combo", this);
            obj._setContents("<ColumnInfo><Column id=\"SEARCH_TYPE\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"SEARCH_TYPE\">검색분류</Col></Row><Row><Col id=\"SEARCH_TYPE\">회원ID</Col></Row><Row><Col id=\"SEARCH_TYPE\">쿠폰코드</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_newmem_list", this);
            obj._setContents("<ColumnInfo><Column id=\"MEMBER_ID\" type=\"STRING\" size=\"30\"/><Column id=\"COUPON_CODE\" type=\"STRING\" size=\"30\"/><Column id=\"COUPON_TYPE\" type=\"STRING\" size=\"30\"/><Column id=\"ISSUED_DT\" type=\"STRING\" size=\"30\"/><Column id=\"EXPIRY_DT\" type=\"STRING\" size=\"30\"/><Column id=\"ISSUED_STATUS\" type=\"STRING\" size=\"30\"/><Column id=\"IS_USED\" type=\"STRING\" size=\"30\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_search", this);
            obj._setContents("<ColumnInfo><Column id=\"IS_USED\" type=\"STRING\" size=\"30\"/><Column id=\"SEARCH_COMBO\" type=\"STRING\" size=\"30\"/><Column id=\"SEARCH_DATA\" type=\"STRING\" size=\"30\"/><Column id=\"START_DT\" type=\"STRING\" size=\"30\"/><Column id=\"END_DT\" type=\"STRING\" size=\"30\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_use_state", this);
            obj._setContents("<ColumnInfo><Column id=\"datacolumn\" type=\"STRING\" size=\"256\"/><Column id=\"codecolumn\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"datacolumn\">전체</Col><Col id=\"codecolumn\">all</Col></Row><Row><Col id=\"datacolumn\">사용</Col><Col id=\"codecolumn\">Y</Col></Row><Row><Col id=\"datacolumn\">미사용</Col><Col id=\"codecolumn\">N</Col></Row><Row><Col id=\"datacolumn\">기간만료</Col><Col id=\"codecolumn\">D</Col></Row></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Div("search_area","40","30","1000","190",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_background("#ffffff");
            obj.set_borderRadius("10px");
            obj.set_text("");
            this.addChild(obj.name, obj);

            obj = new Static("search_tit","20","53","60","41",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("0");
            obj.set_text("검색분류");
            obj.set_font("normal 700 10pt/normal \"Noto Sans KR Bold\"");
            obj.set_color("#2b3674");
            this.search_area.addChild(obj.name, obj);

            obj = new Static("Static00","82","64","2","20",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("1");
            obj.set_background("#cccccc");
            obj.set_text("");
            this.search_area.addChild(obj.name, obj);

            obj = new Static("Static00_00","83","22","2","20",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("2");
            obj.set_background("#cccccc");
            obj.set_text("");
            this.search_area.addChild(obj.name, obj);

            obj = new Static("search_tit00","20","12","60","41",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("3");
            obj.set_text("사용유무");
            obj.set_font("normal 700 10pt/normal \"Noto Sans KR Bold\"");
            obj.set_color("#2b3674");
            this.search_area.addChild(obj.name, obj);

            obj = new Combo("search_combo","110","56","114","36",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("4");
            obj.set_innerdataset("ds_search_combo");
            obj.set_codecolumn("SEARCH_TYPE");
            obj.set_datacolumn("SEARCH_TYPE");
            obj.set_borderRadius("5px");
            obj.set_text("검색분류");
            obj.set_value("검색분류");
            obj.set_index("0");
            this.search_area.addChild(obj.name, obj);

            obj = new Edit("edit_search","234","56","161","36",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("5");
            obj.set_borderRadius("5px");
            this.search_area.addChild(obj.name, obj);

            obj = new Button("btn_select","390","145","100","30",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("6");
            obj.set_text("조회");
            obj.set_borderRadius("5px");
            obj.set_background("#135dae");
            obj.set_color("white");
            obj.set_font("normal 11pt/normal \"Noto Sans KR Medium\"");
            obj.set_textAlign("center");
            obj.set_cursor("pointer");
            this.search_area.addChild(obj.name, obj);

            obj = new Button("btn_reset","509","145","100","30",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("7");
            obj.set_text("초기화");
            obj.set_borderRadius("5px");
            obj.set_background("#8e8e8e");
            obj.set_color("white");
            obj.set_font("normal 11pt/normal \"Noto Sans KR Medium\"");
            obj.set_textAlign("center");
            obj.set_cursor("pointer");
            this.search_area.addChild(obj.name, obj);

            obj = new Calendar("cal_start_day","110","99","230","36",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("8");
            obj.set_borderRadius("5px");
            obj.set_font("normal 10pt/normal \"Noto Sans KR Medium\"");
            this.search_area.addChild(obj.name, obj);

            obj = new Static("search_tit00_00_00","20","94","60","41",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("9");
            obj.set_text("발급일");
            obj.set_font("normal 700 10pt/normal \"Noto Sans KR Bold\"");
            obj.set_color("#2b3674");
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

            obj = new Static("Static00_00_00_00","83","107","2","20",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("12");
            obj.set_background("#cccccc");
            obj.set_text("");
            this.search_area.addChild(obj.name, obj);

            obj = new Radio("radio_state","115","6","280","50",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("13");
            obj.set_innerdataset("ds_use_state");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_direction("vertical");
            obj.set_text("전체");
            obj.set_value("");
            obj.set_index("0");
            this.search_area.addChild(obj.name, obj);

            obj = new Grid("pointAndCoupon","35","230",null,null,"30","30",null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_background("#FFFFFF");
            obj.set_border("0px none");
            obj.set_borderRadius("10px");
            obj.set_autofittype("col");
            obj.set_binddataset("ds_newmem_list");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"52\"/><Column size=\"100\"/><Column size=\"119\"/><Column size=\"265\"/><Column size=\"150\"/><Column size=\"148\"/><Column size=\"88\"/><Column size=\"94\"/></Columns><Rows><Row size=\"48\" band=\"head\"/><Row size=\"40\"/></Rows><Band id=\"head\"><Cell text=\"NO\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"1\" text=\"쿠폰종류\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"2\" text=\"회원ID\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"3\" text=\"쿠폰코드\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"4\" text=\"발급일\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"5\" text=\"만료일\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"6\" text=\"지급여부\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"7\" text=\"사용여부\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/></Band><Band id=\"body\"><Cell text=\"expr:currow + 1\" font=\"12px/normal &quot;LG Smart UI Bold&quot;\" textAlign=\"center\"/><Cell col=\"1\" text=\"bind:COUPON_TYPE\" textAlign=\"center\" font=\"12px/normal &quot;LG Smart UI Bold&quot;\"/><Cell col=\"2\" text=\"bind:MEMBER_ID\" font=\"12px/normal &quot;LG Smart UI Bold&quot;\"/><Cell col=\"3\" text=\"bind:COUPON_CODE\" textAlign=\"center\" font=\"12px/normal &quot;LG Smart UI Bold&quot;\"/><Cell col=\"4\" text=\"bind:ISSUED_DT\" font=\"12px/normal &quot;LG Smart UI Bold&quot;\" textAlign=\"center\"/><Cell col=\"5\" text=\"bind:EXPIRY_DT\" font=\"12px/normal &quot;LG Smart UI Bold&quot;\" textAlign=\"center\"/><Cell col=\"6\" text=\"bind:ISSUED_STATUS\" font=\"12px/normal &quot;LG Smart UI Bold&quot;\" textAlign=\"center\"/><Cell col=\"7\" text=\"bind:IS_USED\" font=\"12px/normal &quot;LG Smart UI Bold&quot;\" textAlign=\"center\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1080,630,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item2","pointAndCoupon","binddataset","ds_user","");
            this.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Form_NewMemList.xfdl", function() {
        this.Form_ReviewList_onload = function(obj,e)
        {
            this.search_area.form.edit_search.set_enable(false);
            this.fnSearchNewMem();
            trace("신규회원 쿠폰 출력여부 확인용>>>");
        };

        this.search_area_btn_select_onclick = function(obj,e)
        {
            this.fnSearchNewMem();
        };

        this.search_area_btn_reset_onclick = function(obj,e)
        {
            this.reload();
        };

        this.search_area_search_combo_onitemchanged = function(obj,e)
        {
            var searchCombo = this.search_area.form.search_combo.value;
            if(searchCombo == "검색분류") {
                this.search_area.form.edit_search.set_enable(false);
                this.search_area.form.edit_search.set_value("");
            } else {
                this.search_area.form.edit_search.set_enable(true);
            }
        };

        // 신규회원쿠폰발행리스트
        this.fnSearchNewMem = function() {
            var strSvcID       = "selectNewMem";
            var strURL         = "svc::selectNewMemListByAdmin.do";
            var strInDatasets  = "ds_search=ds_search";
            var strOutDatasets = "ds_newmem_list=ds_newmem_list";
            var strArg         = "";
            var strCallback    = "fnCallback";

        	var searchCombo = this.search_area.form.search_combo.value;
            var editSearch = this.search_area.form.edit_search.value;
            var isUsed = this.search_area.form.radio_state.value;
            var startDate = this.search_area.form.cal_start_day.value;
            var endDate = this.search_area.form.cal_end_day.value;

            // 먼저 ds_search 초기화
            this.ds_search.clearData();
            this.ds_search.addRow();

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

            // 사용유무
            var isUsed = this.search_area.form.radio_state.value;
            if(isUsed && isUsed != "" && isUsed != "all") {
                this.ds_search.setColumn(0, "IS_USED", isUsed);
            }

            // 발급일
            var startDate = this.search_area.form.cal_start_day.value;
            var endDate = this.search_area.form.cal_end_day.value;

            if(startDate && endDate && startDate != "" && endDate != "") {
                if(startDate > endDate) {
                    this.alert("발급시작일은 발급종료일보다 이전이어야 합니다.");
                    return;
                }
            }

            if(startDate && startDate != "") {
                this.ds_search.setColumn(0, "START_DT", startDate);
                trace("발급시작일: " + startDate);
            }

            if(endDate && endDate != "") {
                this.ds_search.setColumn(0, "END_DT", endDate);
                trace("발급종료일: " + endDate);
            }

            this.transaction(strSvcID, strURL, strInDatasets, strOutDatasets, strArg, strCallback);
        };

        // 공통 콜백
        this.fnCallback = function(svc, err, errMsg) {
            if (err < 0) {
                this.alert("에러 발생: " + errMsg);
                return;
            }

            switch(svc) {
                case "selectNewMem":
                    var rowCount = this.ds_newmem_list.getRowCount();
                    if(rowCount == 0) {
                        this.alert("검색 조건에 맞는 신규회원 쿠폰이 없습니다.");
                    }
                    return;
            }
        };
        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_ReviewList_onload,this);
            this.search_area.form.search_tit.addEventHandler("onclick",this.search_area_search_txt01_onclick,this);
            this.search_area.form.search_tit00.addEventHandler("onclick",this.search_area_search_txt01_onclick,this);
            this.search_area.form.search_combo.addEventHandler("onitemchanged",this.search_area_search_combo_onitemchanged,this);
            this.search_area.form.btn_select.addEventHandler("onclick",this.search_area_btn_select_onclick,this);
            this.search_area.form.btn_reset.addEventHandler("onclick",this.search_area_btn_reset_onclick,this);
            this.search_area.form.search_tit00_00_00.addEventHandler("onclick",this.search_area_search_txt01_onclick,this);
            this.search_area.form.txt_update_td.addEventHandler("onclick",this.txt_th00_onclick,this);
            this.pointAndCoupon.addEventHandler("oncellclick",this.pointAndCoupon_oncellclick,this);
        };
        this.loadIncludeScript("Form_NewMemList.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
