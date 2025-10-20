(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_ProductStockMovements");
            this.set_titletext("상품관리");
            this.set_background("#f4f7fe");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,800);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_searchCond", this);
            obj._setContents("<ColumnInfo><Column id=\"SEARCH_TYPE\" type=\"STRING\" size=\"256\"/><Column id=\"SEARCH_TEXT\" type=\"STRING\" size=\"256\"/><Column id=\"IS_VISIBLE\" type=\"STRING\" size=\"256\"/><Column id=\"QUANTITY_STATUS\" type=\"STRING\" size=\"256\"/><Column id=\"START_DATE\" type=\"STRING\" size=\"256\"/><Column id=\"END_DATE\" type=\"STRING\" size=\"256\"/><Column id=\"MAIN_CATE_ID\" type=\"STRING\" size=\"256\"/><Column id=\"SUB_CATE_ID\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_out_proList", this);
            obj.set_useclientlayout("true");
            obj._setContents("<ColumnInfo><Column id=\"PRODUCT_CODE\" type=\"STRING\" size=\"256\"/><Column id=\"PRODUCT_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"TOTAL_QUANTITY\" type=\"INT\" size=\"1000\"/><Column id=\"MAIN_CATE_NM\" type=\"STRING\" size=\"256\"/><Column id=\"SUB_CATE_NM\" type=\"STRING\" size=\"256\"/><Column id=\"OPTION_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"OPTION_VALUE\" type=\"STRING\" size=\"256\"/><Column id=\"IS_VISIBLE\" type=\"STRING\" size=\"256\"/><Column id=\"CURRENT_QUANTITY\" type=\"INT\" size=\"256\"/><Column id=\"MOVE_QUANTITY\" type=\"INT\" size=\"256\"/><Column id=\"MOVE_TYPE\" type=\"STRING\" size=\"256\"/><Column id=\"INPUT_DT\" type=\"DATETIME\" size=\"256\"/><Column id=\"PRODUCT_ID\" type=\"INT\" size=\"256\"/><Column id=\"OPTION_ID\" type=\"INT\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_mainCate", this);
            obj._setContents("<ColumnInfo><Column id=\"MAIN_CATE_ID\" type=\"INT\" size=\"256\"/><Column id=\"MAIN_CATE_NM\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_subCate", this);
            obj._setContents("<ColumnInfo><Column id=\"SUB_CATE_ID\" type=\"INT\" size=\"256\"/><Column id=\"SUB_CATE_NM\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_in", this);
            obj._setContents("<ColumnInfo><Column id=\"PRODUCT_ID\" type=\"INT\" size=\"256\"/><Column id=\"IS_VISIBLE\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_qu", this);
            obj._setContents("<ColumnInfo><Column id=\"PRODUCT_ID\" type=\"BIGDECIMAL\" size=\"256\"/><Column id=\"OPTION_ID\" type=\"BIGDECIMAL\" size=\"256\"/><Column id=\"QUANTITY\" type=\"INT\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Div("Div00","24","10","90","40",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("");
            obj.set_background("#ffffff");
            obj.set_borderRadius("10px 10px 10px 10px");
            this.addChild(obj.name, obj);

            obj = new Div("Div00_00","24","65",null,"40","26",null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("");
            obj.set_background("#ffffff");
            obj.set_borderRadius("10px 10px 10px 10px");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_search","325","5","317","30",null,null,null,null,null,null,this.Div00_00.form);
            obj.set_taborder("0");
            obj.set_tooltiptext("최대 20자까지 입력 가능합니다.");
            obj.set_maxlength("20");
            this.Div00_00.addChild(obj.name, obj);

            obj = new Div("Div00_00_00","24","120",null,"40","26",null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("");
            obj.set_background("#ffffff");
            obj.set_borderRadius("10px 10px 10px 10px");
            obj.set_color("#215825");
            this.addChild(obj.name, obj);

            obj = new Div("Div00_00_00_00","24","175",null,"40","26",null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("");
            obj.set_background("#ffffff");
            obj.set_borderRadius("10px 10px 10px 10px");
            this.addChild(obj.name, obj);

            obj = new Div("Div00_00_00_00_00","24","230",null,"40","26",null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_text("");
            obj.set_background("#ffffff");
            obj.set_borderRadius("10px 10px 10px 10px");
            this.addChild(obj.name, obj);

            obj = new Radio("Radio00","155","5","246","35",null,null,null,null,null,null,this.Div00_00_00_00_00.form);
            obj.set_taborder("0");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_direction("vertical");
            obj.set_font("normal 800 10pt/normal \"Arial\"");
            var Div00_00_00_00_00_form_Radio00_innerdataset = new nexacro.NormalDataset("Div00_00_00_00_00_form_Radio00_innerdataset", obj);
            Div00_00_00_00_00_form_Radio00_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">all</Col><Col id=\"datacolumn\">전체</Col></Row><Row><Col id=\"codecolumn\">Y</Col><Col id=\"datacolumn\">진열함</Col></Row><Row><Col id=\"codecolumn\">N</Col><Col id=\"datacolumn\">진열안함</Col></Row></Rows>");
            obj.set_innerdataset(Div00_00_00_00_00_form_Radio00_innerdataset);
            obj.set_text("전체");
            obj.set_value("all");
            obj.set_index("0");
            this.Div00_00_00_00_00.addChild(obj.name, obj);

            obj = new Static("sta_sale","537","0",null,"40","577",null,null,null,null,null,this.Div00_00_00_00_00.form);
            obj.set_text("판매상태");
            obj.set_taborder("1");
            obj.set_font("normal 700 13px/normal \"Gulim\"");
            obj.set_padding("0px 0px 0px 10px");
            obj.set_background("#ffffff");
            obj.set_borderRadius("10px 0px 0px 10px");
            obj.set_color("#333333");
            this.Div00_00_00_00_00.addChild(obj.name, obj);

            obj = new Radio("Radio00_00","634","5","246","35",null,null,null,null,null,null,this.Div00_00_00_00_00.form);
            obj.set_taborder("2");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_direction("vertical");
            obj.set_font("normal 800 10pt/normal \"Arial\"");
            var Div00_00_00_00_00_form_Radio00_00_innerdataset = new nexacro.NormalDataset("Div00_00_00_00_00_form_Radio00_00_innerdataset", obj);
            Div00_00_00_00_00_form_Radio00_00_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">allS</Col><Col id=\"datacolumn\">전체</Col></Row><Row><Col id=\"codecolumn\">sale</Col><Col id=\"datacolumn\">판매함</Col></Row><Row><Col id=\"codecolumn\">nosale</Col><Col id=\"datacolumn\">판매안함</Col></Row></Rows>");
            obj.set_innerdataset(Div00_00_00_00_00_form_Radio00_00_innerdataset);
            obj.set_text("전체");
            obj.set_value("allS");
            obj.set_index("0");
            this.Div00_00_00_00_00.addChild(obj.name, obj);

            obj = new Grid("grid_list","24","285",null,"465","26",null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_background("#FFFFFF");
            obj.set_border("0px none");
            obj.set_borderRadius("10px");
            obj.set_autofittype("col");
            obj.set_binddataset("ds_out_proList");
            obj.set_readonly("true");
            obj.set_selecttype("row");
            obj.set_cellclickbound("cell");
            obj.set_enable("true");
            obj.set_enableevent("true");
            obj.set_mouseovertype("cell");
            obj.set_usesoftkeyboard("true");
            obj.set_useselcolor("false");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"28\"/><Column size=\"61\"/><Column size=\"185\"/><Column size=\"91\"/><Column size=\"100\"/><Column size=\"100\"/><Column size=\"100\"/><Column size=\"100\"/><Column size=\"48\"/><Column size=\"73\"/><Column size=\"73\"/><Column size=\"103\"/><Column size=\"142\"/></Columns><Rows><Row size=\"66\" band=\"head\"/><Row size=\"48\" band=\"head\"/><Row size=\"24\" band=\"head\"/><Row size=\"40\"/></Rows><Band id=\"head\"><Cell colspan=\"13\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell row=\"1\" rowspan=\"2\" text=\"NO\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell row=\"1\" col=\"1\" rowspan=\"2\" text=\"상품코드\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell row=\"1\" col=\"2\" rowspan=\"2\" text=\"상품명\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell row=\"1\" col=\"3\" rowspan=\"2\" text=\"상품 총 재고\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell row=\"1\" col=\"4\" colspan=\"2\" text=\"상품분류\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell row=\"1\" col=\"6\" colspan=\"2\" text=\"옵션\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell row=\"1\" col=\"8\" rowspan=\"2\" text=\"옵션&#13;&#10;진열\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\" wordWrap=\"both\"/><Cell row=\"1\" col=\"9\" rowspan=\"2\" text=\"재고\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell row=\"1\" col=\"10\" rowspan=\"2\" text=\"입•출고량\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell row=\"1\" col=\"11\" rowspan=\"2\" text=\"타입\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell row=\"1\" col=\"12\" rowspan=\"2\" text=\"등록일\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell row=\"2\" col=\"4\" text=\"대분류\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell row=\"2\" col=\"5\" text=\"중분류\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell row=\"2\" col=\"6\" text=\"옵션\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell row=\"2\" col=\"7\" text=\"세부사항\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/></Band><Band id=\"body\"><Cell text=\"expr:currow + 1\" background=\"#ffffff\" font=\"12px/normal &quot;Gulim&quot;\" textAlign=\"center\" edittype=\"none\" displaytype=\"normal\"/><Cell col=\"1\" background=\"#ffffff\" text=\"bind:PRODUCT_CODE\" font=\"12px/normal &quot;Gulim&quot;\" textAlign=\"center\" edittype=\"none\" displaytype=\"normal\"/><Cell col=\"2\" background=\"#ffffff\" text=\"bind:PRODUCT_NAME\" font=\"12px/normal &quot;Gulim&quot;\" textAlign=\"center\" edittype=\"none\" displaytype=\"normal\"/><Cell col=\"3\" background=\"#ffffff\" text=\"bind:TOTAL_QUANTITY\" font=\"12px/normal &quot;Gulim&quot;\" textAlign=\"right\" edittype=\"none\" displaytype=\"normal\"/><Cell col=\"4\" edittype=\"none\" background=\"#ffffff\" text=\"bind:MAIN_CATE_NM\" font=\"12px/normal &quot;Gulim&quot;\" textAlign=\"center\" displaytype=\"normal\"/><Cell col=\"5\" edittype=\"none\" background=\"#ffffff\" text=\"bind:SUB_CATE_NM\" font=\"12px/normal &quot;Gulim&quot;\" textAlign=\"center\" displaytype=\"normal\"/><Cell col=\"6\" background=\"#ffffff\" text=\"bind:OPTION_NAME\" font=\"12px/normal &quot;Gulim&quot;\" textAlign=\"center\" edittype=\"none\" displaytype=\"normal\"/><Cell col=\"7\" edittype=\"none\" background=\"#ffffff\" text=\"bind:OPTION_VALUE\" font=\"12px/normal &quot;Gulim&quot;\" textAlign=\"center\" displaytype=\"normal\"/><Cell col=\"8\" edittype=\"none\" background=\"#ffffff\" text=\"bind:IS_VISIBLE\" font=\"12px/normal &quot;Gulim&quot;\" textAlign=\"center\" displaytype=\"normal\"/><Cell col=\"9\" edittype=\"none\" background=\"#ffffff\" text=\"bind:CURRENT_QUANTITY\" font=\"12px/normal &quot;Gulim&quot;\" textAlign=\"right\" displaytype=\"normal\"/><Cell col=\"10\" edittype=\"none\" background=\"#ffffff\" text=\"bind:MOVE_QUANTITY\" font=\"12px/normal &quot;Gulim&quot;\" textAlign=\"right\" displaytype=\"normal\"/><Cell col=\"11\" edittype=\"none\" text=\"bind:MOVE_TYPE\" font=\"12px/normal &quot;Gulim&quot;\" textAlign=\"center\" displaytype=\"normal\" cssclass=\"expr:(MOVE_TYPE==&apos;Inbound&apos; ? &apos;cls_inbound&apos;                 : (MOVE_TYPE==&apos;Outbound&apos; ? &apos;cls_outbound&apos;                 : (MOVE_TYPE==&apos;Add option&apos; ? &apos;cls_addopt&apos; : &apos;&apos;)))\"/><Cell col=\"12\" edittype=\"none\" background=\"#ffffff\" text=\"bind:INPUT_DT\" font=\"12px/normal &quot;Gulim&quot;\" textAlign=\"center\" displaytype=\"date\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("sta_listTitle","50","296","80","61",null,null,null,null,null,null,this);
            obj.set_text("목록");
            obj.set_font("bold 13pt/normal \"Arial\"");
            obj.set_taborder("3");
            obj.set_color("#232323");
            this.addChild(obj.name, obj);

            obj = new Static("sta_prodType","40","65","140","40",null,null,null,null,null,null,this);
            obj.set_text("검색분류");
            obj.set_font("normal 700 13px/normal \"Gulim\"");
            obj.set_padding("0px 0px 0px 10px");
            obj.set_taborder("7");
            obj.set_background("transparent");
            obj.set_borderRadius("10px 0px 0px 10px");
            obj.set_color("#333333");
            this.addChild(obj.name, obj);

            obj = new Static("sta_category","40","120","140","40",null,null,null,null,null,null,this);
            obj.set_text("상품분류");
            obj.set_font("normal 700 13px/normal \"Gulim\"");
            obj.set_padding("0px 0px 0px 10px");
            obj.set_taborder("8");
            obj.set_background("transparent");
            obj.set_borderRadius("10px 0px 0px 10px");
            obj.set_color("#333333");
            this.addChild(obj.name, obj);

            obj = new Static("sta_regDate","40","175","140","40",null,null,null,null,null,null,this);
            obj.set_text("입•출고 등록일");
            obj.set_font("normal 700 13px/normal \"Gulim\"");
            obj.set_padding("0px 0px 0px 10px");
            obj.set_taborder("9");
            obj.set_background("transparent");
            obj.set_borderRadius("10px 0px 0px 10px");
            obj.set_color("#333333");
            this.addChild(obj.name, obj);

            obj = new Static("sta_sale","40","230","140","40",null,null,null,null,null,null,this);
            obj.set_text("진열상태");
            obj.set_font("normal 700 13px/normal \"Gulim\"");
            obj.set_padding("0px 0px 0px 10px");
            obj.set_taborder("10");
            obj.set_background("transparent");
            obj.set_borderRadius("10px 0px 0px 10px");
            obj.set_color("#333333");
            this.addChild(obj.name, obj);

            obj = new Combo("cmb_searchType","179","70","150","30",null,null,null,null,null,null,this);
            obj.set_taborder("11");
            obj.set_font("normal 800 10pt/normal \"Arial\"");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            var cmb_searchType_innerdataset = new nexacro.NormalDataset("cmb_searchType_innerdataset", obj);
            cmb_searchType_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">PRODUCT_CODE</Col><Col id=\"datacolumn\">상품코드</Col></Row><Row><Col id=\"codecolumn\">PRODUCT_NAME</Col><Col id=\"datacolumn\">상품명</Col></Row><Row><Col id=\"codecolumn\">MOVE_TYPE</Col><Col id=\"datacolumn\">입•출고 타입</Col></Row></Rows>");
            obj.set_innerdataset(cmb_searchType_innerdataset);
            obj.set_text("상품명");
            obj.set_value("PRODUCT_NAME");
            obj.set_index("1");
            this.addChild(obj.name, obj);

            obj = new Combo("cmb_cate1","179","125","150","30",null,null,null,null,null,null,this);
            obj.set_taborder("12");
            obj.set_font("normal 800 10pt/normal \"Arial\"");
            obj.set_innerdataset("ds_mainCate");
            obj.set_codecolumn("MAIN_CATE_ID");
            obj.set_datacolumn("MAIN_CATE_NM");
            obj.set_displayrowcount("20");
            obj.set_text("");
            obj.set_value("");
            obj.set_index("-1");
            this.addChild(obj.name, obj);

            obj = new Calendar("cal_start","179","180","149","30",null,null,null,null,null,null,this);
            obj.set_taborder("13");
            obj.set_font("normal 800 10pt/normal \"Arial\"");
            this.addChild(obj.name, obj);

            obj = new Combo("cmb_cate2","349","125","150","30",null,null,null,null,null,null,this);
            obj.set_taborder("14");
            obj.set_font("normal 800 10pt/normal \"Arial\"");
            obj.set_innerdataset("ds_subCate");
            obj.set_codecolumn("SUB_CATE_ID");
            obj.set_datacolumn("SUB_CATE_NM");
            obj.set_displayrowcount("20");
            obj.set_text("- 중분류 선택 -");
            this.addChild(obj.name, obj);

            obj = new Calendar("cal_end","349","180","150","30",null,null,null,null,null,null,this);
            obj.set_taborder("15");
            obj.set_font("normal 800 10pt/normal \"Arial\"");
            this.addChild(obj.name, obj);

            obj = new Static("sta_dash","334","178","20","35",null,null,null,null,null,null,this);
            obj.set_text("~");
            obj.set_taborder("16");
            obj.set_font("normal bold 10pt/normal \"Arial\"");
            this.addChild(obj.name, obj);

            obj = new Static("stc_total","39","15","61","30",null,null,null,null,null,null,this);
            obj.set_taborder("17");
            obj.set_text("");
            obj.set_font("12px/normal \"Gulim\",\"Arial Black\"");
            obj.set_borderRadius("0px 10px 10px 0px");
            this.addChild(obj.name, obj);

            obj = new Static("sta_listTitle00",null,"290","400","61","130",null,null,null,null,null,this);
            obj.set_text("Inbound : 입고  /  Outbound : 출고  /  Add option : 옵션추가");
            obj.set_font("9pt/normal \"맑은 고딕\",\"Arial\"");
            obj.set_taborder("18");
            obj.set_color("#383838");
            obj.set_border("0px none,0px none,5px solid #ffa70f,0px solid #ffa70f");
            obj.set_textAlign("left");
            obj.set_verticalAlign("middle");
            obj.set_letterSpacing("1px");
            this.addChild(obj.name, obj);

            obj = new Button("btn_view","698","70","72","30",null,null,null,null,null,null,this);
            obj.set_text("조회");
            obj.set_background("#000000");
            obj.set_color("#ffffff");
            obj.set_border("1px solid #000000");
            obj.set_borderRadius("6px");
            obj.set_font("bold 12px \'Arial\'");
            obj.set_cursor("pointer");
            obj.set_taborder("19");
            this.addChild(obj.name, obj);

            obj = new Button("btn_excel","188","305","130","30",null,null,null,null,null,null,this);
            obj.set_text("    엑셀다운로드");
            obj.set_background("url(\'imagerc::excel_logo.png\') no-repeat left center /30px");
            obj.set_color("#000000");
            obj.set_border("1px solid #cccccc");
            obj.set_borderRadius("6px");
            obj.set_font("bold 12px \'Arial\'");
            obj.set_cursor("pointer");
            obj.set_taborder("20");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1280,800,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.addIncludeScript("Form_ProductStockMovements.xfdl","common::common.xjs");
        this.registerScript("Form_ProductStockMovements.xfdl", function() {
        this.executeIncludeScript("common::common.xjs"); /*include "common::common.xjs"*/;

        this.Form_ProductStockMovements_onload = function(obj,e)
        {
        	this.setTimer(1, 10); //10ms 후 실행
        };

        this.Form_ProductStockMovements_ontimer = function(obj,e){
            if (e.timerid == 1) {
                this.killTimer(1);

                // 라디오 기본값 세팅
                this.Div00_00_00_00_00.form.Radio00.set_value("all");
                this.Div00_00_00_00_00.form.Radio00_00.set_value("allS");

                if (this.cal_start) this.cal_start.set_dateformat("yyyy-MM-dd");
                if (this.cal_end)   this.cal_end.set_dateformat("yyyy-MM-dd");

                // 대분류 콤보 데이터 조회
                this.transaction(
                    "selectMainCategoryComboByAdmin",
                    "svc::selectMainCategoryComboByAdmin.do",
                    "",
                    "ds_mainCate=ds_mainCate",
                    "",
                    "fn_callback",
                    true
                );

                //  전체조회 실행 (조건 없음)
                this.fn_search();
            }
        };



        // 수정본: 8자리(yyyymmdd)와 10자리(yyyy-MM-dd) 모두 지원
        // 앞단 공용 함수 교체
        this._dateOrEmpty = function (cal) {
            if (!cal) return "";
            var v = (cal.text || cal.value || "").toString().trim();

            // 이미 yyyy-MM-dd면 그대로
            if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return v;

            // yyyymmdd → yyyy-MM-dd
            if (/^\d{8}$/.test(v)) {
                return v.substr(0,4) + "-" + v.substr(4,2) + "-" + v.substr(6,2);
            }

            // Date 문자열 등은 버림(조건 안 넣음)
            return "";
        };


        /***** (유틸) Dataset 컬럼 세팅 공통 함수 *****/
        this._setCond = function(ds, col, val) {
            // null/undefined만 제외하고 값 세팅
            if (val !== undefined && val !== null) {
        		if (typeof val == "string"){
        			val = nexacro.trim(val);

        			if(col == "SEARCH_TEXT"){
        				val = val.replace(/\s+/g, "");                   // 일반 공백 제거
        				val = val.replace(/[\u200B-\u200D\uFEFF]/g,"");  // 특수공백 제거
        				val = val.toLowerCase();                         // 소문자 변환
        			}
        		}
        		ds.setColumn(0, col, val);
            }
        };



        /***** 조회조건 Dataset 구성 *****/
        this.fn_makeSearchCond = function() {
            // 1) 초기화 및 한 줄 추가
            this.ds_searchCond.clearData();
            this.ds_searchCond.addRow();

            // 2) 콤보/에딧/라디오/달력 값을 ds_searchCond에 넣기
            this._setCond(this.ds_searchCond, "SEARCH_TYPE",     this.cmb_searchType.value);                   // 검색분류 (PRODUCT_CODE/PRODUCT_NAME/MOVE_TYPE)
            this._setCond(this.ds_searchCond, "SEARCH_TEXT",     this.Div00_00.form.edt_search.text);          // 검색어
            this._setCond(this.ds_searchCond, "IS_VISIBLE",      this.Div00_00_00_00_00.form.Radio00.value);   // 진열상태(all,Y,N)
            // 컬럼 통일: QUANTITY_STATUS 로 보냄 (mapper와 일치)
            this._setCond(this.ds_searchCond, "QUANTITY_STATUS", this.Div00_00_00_00_00.form.Radio00_00.value);// 판매상태(allS,sale,nosale)
            this._setCond(this.ds_searchCond, "START_DATE",      this._dateOrEmpty(this.cal_start));           // 시작일
            this._setCond(this.ds_searchCond, "END_DATE",        this._dateOrEmpty(this.cal_end));             // 종료일
            this._setCond(this.ds_searchCond, "MAIN_CATE_ID",    this.cmb_cate1.value);                        // 대분류
            this._setCond(this.ds_searchCond, "SUB_CATE_ID",     this.cmb_cate2.value);                        // 중분류

            // 3) 프론트에서 '전체' 값을 서버로 보낼지 말지 선택
            //    - 여기서는 'all', 'allS'를 그대로 보내고, 서버/쿼리에서 무시 처리(WHERE 동적조건) → 유지보수 유리
        };


        // 검색창
        this.Div00_00_edt_search_onkeydown = function(obj,e)
        {
        	if(e.keycode == 13){
        		this.btn_view_onclick();
        	}
        };



        //조회버튼
        this.btn_view_onclick = function(obj,e)
        {
        	this.fn_search();
        };



        //입출고 리스트  조회 (조건포함)
        this.fn_search = function() {
            // 1) 조회조건 Dataset 구성
            this.fn_makeSearchCond();

            // 2) 트랜잭션 호출 (검색조건 Dataset 하나로 전달)
            this.transaction(
                "selectStockMovementsListByAdmin",            // 서비스 ID (콜백 분기용)
                "svc::selectStockMovementsListByAdmin.do?time=" + new Date().getTime(),    // 컨트롤러 URL
                "ds_searchCond=ds_searchCond",         // inDatasets: 조건 묶음
                "ds_out_proList=ds_out_proList",       // outDatasets: 결과 그리드 바인딩
                "",                                    // args는 사용하지 않음 (전부 Dataset으로 처리)
                "fn_callback",                         // 콜백 함수명
                true                                   // 비동기
            );
        };






        // 콤보 연동 (대분류 선택 시 중분류)
        this.cmb_cate1_onitemchanged = function(obj,e)
        {
            var mainCateId = obj.value;  // 선택한 값
            if (!mainCateId) {
                this.ds_subCate.clearData();
                return;
            }

            this.transaction(
                "selectSubCategoryComboByAdmin",
                "svc::selectSubCategoryComboByAdmin.do",
                "",
                "ds_subCate=ds_subCate",
                "MAIN_CATE_ID=" + mainCateId,
                "fn_callback",
                true
            );
        };





        //공통 콜백
        this.fn_callback = function(strSvcID, nErrorCode, strErrorMag){
            if (nErrorCode < 0) {
                this.alert("오류: "+strErrorMag);
        		return;
            }

            switch(strSvcID){
        	case "selectStockMovementsListByAdmin":
        		var ea = this.ds_out_proList.getRowCount();
        		this.stc_total.set_text("총 "+ea+" 건");

        		break;
        	case "selectMainCategoryComboByAdmin":
        		this.ds_mainCate.insertRow(0);
        		this.ds_mainCate.setColumn(0,"MAIN_CATE_ID","");
        		this.ds_mainCate.setColumn(0,"MAIN_CATE_NM","- 전체 -");
        		break;
        	case "selectSubCategoryComboByAdmin":
        		this.ds_subCate.insertRow(0);
        		this.ds_subCate.setColumn(0,"SUB_CATE_ID","");
        		this.ds_subCate.setColumn(0,"SUB_CATE_NM","- 전체 -");
        		break;

            }
        };






























        /****************************************************
        * [상수] 엑셀 JSP URL
        *  - 서버 주소/포트/컨텍스트 맞춰 주세요.
        *  - 예) http://localhost:8080/admin/excelExport.jsp
        ****************************************************/
        this.EXCEL_JSP_URL = "http://localhost:8080/admin/excelExport.jsp";


        /****************************************************
        * ① FileDownload 컴포넌트를 준비하는 함수
        *  - 없으면 생성해서 화면에 붙입니다.
        ****************************************************/
        this._ensureFileDownload = function () {
            // 이미 만들어둔 적 있으면 재사용
            if (this.filedown && this.filedown instanceof nexacro.FileDownload) return;

            // 동적으로 FileDownload 생성
            var fd = new nexacro.FileDownload("filedown", 0, 0, 0, 0, null, null, this);
            this.addChild("filedown", fd);

            // 성공/실패 로그 및 안내
            fd.addEventHandler("onsuccess", function (obj, e) {
        			trace("[Excel] 다운로드 성공");
        		}, this);

            fd.addEventHandler("onerror", function (obj, e) {
        			// e.errormsg 에러메시지 확인
        			this.alert("엑셀 다운로드 실패: " + e.errormsg);
        		}, this);

            this.filedown = fd;
        };


        /****************************************************
        * ② Grid + Dataset → XML 문자열 생성 함수
        *  - 이전에 쓰던 헤더/바디 XML 포맷을 그대로 생성.
        *  - Grid 멀티헤더(행/열 병합) 정보를 모두 수집해서 <Header> 구성
        *  - Body는 화면에 보이는 값(grid.getCellText) 기준으로 <Body> 구성
        ****************************************************/
        this._buildGridXmlForExcel = function () {
            // 내 화면의 그리드/데이터셋 참조
            var grid = this.grid_list;                 // 그리드 객체
            var ds   = this.ds_out_proList;            // 데이터셋 객체

            if (!grid || !ds) {
                this.alert("그리드나 데이터셋을 찾을 수 없습니다.");
                return "";
            }

            // XML 시작 태그
            var xmlStr = "<Rows>";

            // --- [1] Header 생성 ---
            xmlStr += "<Header>";

            // 그리드 head 밴드 셀 개수(멀티헤더 포함)
            var headCellCount = grid.getCellCount("head");

            for (var hc = 0; hc < headCellCount; hc++) {
                // 각 헤더셀의 행/열 좌표 + 병합(rowspan/colspan) + 텍스트 추출
                var row     = grid.getCellProperty("head", hc, "row");       // 헤더행 인덱스
                var col     = grid.getCellProperty("head", hc, "col");       // 헤더열 인덱스
                var rowspan = grid.getCellProperty("head", hc, "rowspan");   // 세로병합 크기
                var colspan = grid.getCellProperty("head", hc, "colspan");   // 가로병합 크기
                var text    = grid.getCellProperty("head", hc, "text");      // 셀 표시 텍스트

                if (text == null || text == "undefined") text = "";

                // CDATA로 감싸 특수문자 안전하게
                xmlStr += "<Cell row='" + row + "' col='" + col +
        		"' rowspan='" + rowspan + "' colspan='" + colspan +
        		"'><![CDATA[" + text + "]]></Cell>";
            }
            xmlStr += "</Header>";

            // --- [2] Body 생성 ---
            xmlStr += "<Body>";

            // 본문(body) 셀 개수
            var bodyCellCount = grid.getCellCount("body");

            // 데이터셋 row 수만큼 반복
            var rowCount = ds.getRowCount();
            for (var r = 0; r < rowCount; r++) {
                xmlStr += "<Row>";

                // body 셀 인덱스대로 화면 표시값을 추출
                for (var c = 0; c < bodyCellCount; c++) {
                    // getCellText(row, col) → 실제 그리드에 보이는 문자열
                    var cellValue = grid.getCellText(r, c);
                    if (cellValue == null || cellValue == "undefined") cellValue = "";

                    // <C0>... </C0>, <C1>...</C1> 형식으로 채움
                    xmlStr += "<C" + c + "><![CDATA[" + cellValue + "]]></C" + c + ">";
                }
                xmlStr += "</Row>";
            }
            xmlStr += "</Body>";

            // XML 종료 태그
            xmlStr += "</Rows>";

            return xmlStr;
        };


        /****************************************************
        * ③ 엑셀 버튼 클릭 → (권장) 토큰 방식 다운로드
        *  - 1) xmlData를 서버 세션에 저장(prepare)
        *  - 2) token 받으면 FileDownload로 GET 다운로드
        *  - 이렇게 해야 “다운로드 폴더”로 떨어집니다.
        ****************************************************/
        this.btn_excel_onclick = function (obj, e) {
            // 0) FileDownload 준비
            this._ensureFileDownload();

            // 1) 그리드 → XML 문자열 생성
            var xmlStr = this._buildGridXmlForExcel();
            if (!xmlStr) return;

            // (선택) 데이터 없으면 확인
            if (this.ds_out_proList.getRowCount() === 0) {
                if (!this.confirm("조회된 데이터가 없습니다. 헤더만 다운로드할까요?")) return;
            }

            // 2) 토큰 준비 요청(prepare) – XHR POST
            var prepareUrl = this.EXCEL_JSP_URL + "?mode=prepare";
            var xhr = new XMLHttpRequest();                               // 브라우저/런타임 공통 XHR
            xhr.open("POST", prepareUrl, true);                           // 비동기 POST
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");

            // 3) 응답 처리
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {                               // 통신 완료
                    if (xhr.status === 200) {                             // OK
                        var res = null;
                        try {
                            res = JSON.parse(xhr.responseText);          // {"ok":true,"token":"..."}
                        } catch (ex) {
                            this.alert("서버 응답 파싱 실패: " + xhr.responseText);
                            return;
                        }

                        if (res && res.ok && res.token) {
                            // 4) FileDownload로 GET 다운로드(다운로드 폴더로 저장)
                            var downUrl = this.EXCEL_JSP_URL + "?mode=download&token=" + encodeURIComponent(res.token);
                            this.filedown.set_downloadurl(downUrl);
                            this.filedown.download();
        					this.alert("목록 엑셀파일 다운로드 완료");
                        } else {
                            this.alert("엑셀 준비 실패: " + (res && res.message ? res.message : "unknown error"));
                        }
                    } else {
                        this.alert("서버 통신 실패: HTTP " + xhr.status);
                    }
                }
            }.bind(this);

            xhr.onerror = function () {                                    // 네트워크 에러
                this.alert("네트워크 오류로 엑셀 준비에 실패했습니다.");
            }.bind(this);

            // 5) xmlData를 x-www-form-urlencoded 본문으로 전송
            xhr.send("xmlData=" + encodeURIComponent(xmlStr));
        };











        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("ontimer",this.Form_ProductStockMovements_ontimer,this);
            this.addEventHandler("onload",this.Form_ProductStockMovements_onload,this);
            this.Div00_00.form.edt_search.addEventHandler("onchanged",this.Div00_00_edt_search_onchanged,this);
            this.Div00_00.form.edt_search.addEventHandler("onkeydown",this.Div00_00_edt_search_onkeydown,this);
            this.Div00_00_00_00_00.form.Radio00_00.addEventHandler("onitemchanged",this.Div00_00_00_00_00_Radio00_00_onitemchanged,this);
            this.sta_listTitle.addEventHandler("onclick",this.sta_listTitle_onclick,this);
            this.sta_prodType.addEventHandler("onclick",this.sta_prodType_onclick,this);
            this.cmb_cate1.addEventHandler("onitemchanged",this.cmb_cate1_onitemchanged,this);
            this.sta_listTitle00.addEventHandler("onclick",this.sta_listTitle_onclick,this);
            this.btn_view.addEventHandler("onclick",this.btn_view_onclick,this);
            this.btn_excel.addEventHandler("onclick",this.btn_excel_onclick,this);
            this.ds_out_proList.addEventHandler("oncolumnchanged",this.ds_out_proList_oncolumnchanged,this);
        };
        this.loadIncludeScript("Form_ProductStockMovements.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
