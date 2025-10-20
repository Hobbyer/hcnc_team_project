(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_Product");
            this.set_titletext("상품관리");
            this.set_background("#f4f7fe");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,800);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_searchCond", this);
            obj._setContents("<ColumnInfo><Column id=\"SEARCH_TYPE\" type=\"STRING\" size=\"256\"/><Column id=\"SEARCH_TEXT\" type=\"STRING\" size=\"20\"/><Column id=\"IS_VISIBLE\" type=\"STRING\" size=\"256\"/><Column id=\"QUANTITY_STATUS\" type=\"STRING\" size=\"256\"/><Column id=\"START_DATE\" type=\"STRING\" size=\"256\"/><Column id=\"END_DATE\" type=\"STRING\" size=\"256\"/><Column id=\"MAIN_CATE_ID\" type=\"STRING\" size=\"256\"/><Column id=\"SUB_CATE_ID\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_out_proList", this);
            obj.set_useclientlayout("true");
            obj._setContents("<ColumnInfo><Column id=\"chk\" type=\"INT\" size=\"256\"/><Column id=\"PRODUCT_CODE\" type=\"STRING\" size=\"256\"/><Column id=\"PRODUCT_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"PRODUCT_CONTENT\" type=\"STRING\" size=\"1000\"/><Column id=\"COST_PRICE\" type=\"INT\" size=\"256\"/><Column id=\"PRODUCT_PRICE\" type=\"INT\" size=\"256\"/><Column id=\"ADDITIONAL_PRICE\" type=\"INT\" size=\"256\"/><Column id=\"TOTAL_PRICE\" type=\"INT\" size=\"256\"/><Column id=\"MAIN_CATE_NM\" type=\"STRING\" size=\"256\"/><Column id=\"SUB_CATE_NM\" type=\"STRING\" size=\"256\"/><Column id=\"OPTION_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"OPTION_VALUE\" type=\"STRING\" size=\"256\"/><Column id=\"IS_VISIBLE\" type=\"STRING\" size=\"256\"/><Column id=\"QUANTITY\" type=\"INT\" size=\"256\"/><Column id=\"INV_OPTION_ID\" type=\"INT\" size=\"256\"/><Column id=\"INPUT_DT\" type=\"DATETIME\" size=\"256\"/><Column id=\"UPDATE_DT\" type=\"DATETIME\" size=\"256\"/><Column id=\"PRODUCT_ID\" type=\"INT\" size=\"256\"/><Column id=\"OPTION_ID\" type=\"INT\" size=\"256\"/><Column id=\"INPUT_ID\" type=\"STRING\" size=\"256\"/><Column id=\"UPDATE_ID\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
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
            obj._setContents("<ColumnInfo><Column id=\"PRODUCT_ID\" type=\"BIGDECIMAL\" size=\"256\"/><Column id=\"OPTION_ID\" type=\"BIGDECIMAL\" size=\"256\"/><Column id=\"QUANTITY\" type=\"INT\" size=\"256\"/><Column id=\"INPUT_ID\" type=\"STRING\" size=\"256\"/><Column id=\"UPDATE_ID\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
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
            obj.set_tooltiptext("최대 20자까지 입력 가능합니다.");
            obj.set_taborder("0");
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
            obj.set_text("재고상태");
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
            Div00_00_00_00_00_form_Radio00_00_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">allS</Col><Col id=\"datacolumn\">전체</Col></Row><Row><Col id=\"codecolumn\">sale</Col><Col id=\"datacolumn\">재고있음</Col></Row><Row><Col id=\"codecolumn\">nosale</Col><Col id=\"datacolumn\">재고없음</Col></Row></Rows>");
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
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"26\"/><Column size=\"24\"/><Column size=\"61\"/><Column size=\"107\"/><Column size=\"173\"/><Column size=\"52\"/><Column size=\"52\"/><Column size=\"52\"/><Column size=\"68\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"103\"/><Column size=\"41\"/><Column size=\"41\"/><Column size=\"88\"/></Columns><Rows><Row size=\"66\" band=\"head\"/><Row size=\"48\" band=\"head\"/><Row size=\"24\" band=\"head\"/><Row size=\"40\"/></Rows><Band id=\"head\"><Cell colspan=\"17\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell row=\"1\" rowspan=\"2\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\" displaytype=\"checkboxcontrol\" text=\"0\" edittype=\"checkbox\"/><Cell row=\"1\" col=\"1\" rowspan=\"2\" text=\"NO\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell row=\"1\" col=\"2\" rowspan=\"2\" text=\"상품코드\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell row=\"1\" col=\"3\" rowspan=\"2\" text=\"상품명\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell row=\"1\" col=\"4\" rowspan=\"2\" text=\"설명\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell row=\"1\" col=\"5\" rowspan=\"2\" text=\"원가\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell row=\"1\" col=\"6\" rowspan=\"2\" text=\"상품가\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell row=\"1\" col=\"7\" rowspan=\"2\" text=\"옵션가\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell row=\"1\" col=\"8\" rowspan=\"2\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\" text=\"최종판매가\"/><Cell row=\"1\" col=\"9\" colspan=\"2\" text=\"상품분류\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell row=\"1\" col=\"11\" colspan=\"2\" text=\"옵션\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell row=\"1\" col=\"13\" rowspan=\"2\" text=\"등록일\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell row=\"1\" col=\"14\" rowspan=\"2\" text=\"진열\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell row=\"1\" col=\"15\" rowspan=\"2\" colspan=\"2\" text=\"재고수량/관리\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell row=\"2\" col=\"9\" text=\"대분류\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell row=\"2\" col=\"10\" text=\"중분류\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell row=\"2\" col=\"11\" text=\"옵션\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell row=\"2\" col=\"12\" text=\"세부사항\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/></Band><Band id=\"body\"><Cell displaytype=\"checkboxcontrol\" background=\"#ffffff\" textAlign=\"center\" edittype=\"checkbox\" text=\"bind:chk\"/><Cell col=\"1\" text=\"expr:currow + 1\" background=\"#ffffff\" font=\"12px/normal &quot;Gulim&quot;\" textAlign=\"center\" edittype=\"none\"/><Cell col=\"2\" background=\"#ffffff\" text=\"bind:PRODUCT_CODE\" font=\"12px/normal &quot;Gulim&quot;\" textAlign=\"center\" edittype=\"none\"/><Cell col=\"3\" background=\"#ffffff\" text=\"bind:PRODUCT_NAME\" font=\"12px/normal &quot;Gulim&quot;\" textAlign=\"center\" edittype=\"none\"/><Cell col=\"4\" edittype=\"none\" background=\"#ffffff\" text=\"bind:PRODUCT_CONTENT\" font=\"12px/normal &quot;Gulim&quot;\" textAlign=\"center\"/><Cell col=\"5\" background=\"#ffffff\" text=\"bind:COST_PRICE\" font=\"12px/normal &quot;Gulim&quot;\" edittype=\"none\"/><Cell col=\"6\" edittype=\"none\" background=\"#ffffff\" text=\"bind:PRODUCT_PRICE\" font=\"12px/normal &quot;Gulim&quot;\"/><Cell col=\"7\" edittype=\"none\" background=\"#ffffff\" text=\"bind:ADDITIONAL_PRICE\" font=\"12px/normal &quot;Gulim&quot;\"/><Cell col=\"8\" edittype=\"none\" background=\"#ffffff\" text=\"bind:TOTAL_PRICE\" font=\"12px/normal &quot;Gulim&quot;\"/><Cell col=\"9\" edittype=\"none\" background=\"#ffffff\" text=\"bind:MAIN_CATE_NM\" font=\"12px/normal &quot;Gulim&quot;\" textAlign=\"center\"/><Cell col=\"10\" edittype=\"none\" background=\"#ffffff\" text=\"bind:SUB_CATE_NM\" font=\"12px/normal &quot;Gulim&quot;\" textAlign=\"center\"/><Cell col=\"11\" background=\"#ffffff\" text=\"bind:OPTION_NAME\" font=\"12px/normal &quot;Gulim&quot;\" textAlign=\"center\" edittype=\"none\"/><Cell col=\"12\" edittype=\"none\" background=\"#ffffff\" text=\"bind:OPTION_VALUE\" font=\"12px/normal &quot;Gulim&quot;\" textAlign=\"center\"/><Cell col=\"13\" edittype=\"none\" background=\"#ffffff\" text=\"bind:INPUT_DT\" font=\"12px/normal &quot;Gulim&quot;\" textAlign=\"center\" displaytype=\"date\"/><Cell col=\"14\" edittype=\"none\" background=\"#ffffff\" text=\"bind:IS_VISIBLE\" font=\"12px/normal &quot;Gulim&quot;\" textAlign=\"center\"/><Cell col=\"15\" edittype=\"mask\" background=\"#ffffff\" text=\"bind:QUANTITY\" font=\"12px/normal &quot;Gulim&quot;\" textAlign=\"center\" displaytype=\"mask\" textareamaxlength=\"-1\" maskeditformat=\"####\"/><Cell col=\"16\" edittype=\"none\" text=\"재고변경\" font=\"12px/normal &quot;Gulim&quot;\" displaytype=\"buttoncontrol\" background=\"transparent\" cssclass=\"productCellBtnEdit\"/></Band></Format></Formats>");
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
            obj.set_text("상품등록일");
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
            cmb_searchType_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">PRODUCT_CODE</Col><Col id=\"datacolumn\">상품코드</Col></Row><Row><Col id=\"codecolumn\">PRODUCT_NAME</Col><Col id=\"datacolumn\">상품명</Col></Row></Rows>");
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

            obj = new Static("sta_listTitle00",null,"290","188","61","68",null,null,null,null,null,this);
            obj.set_text("재고 클릭시 수량 수정가능");
            obj.set_font("11pt/normal \"Arial\"");
            obj.set_taborder("17");
            obj.set_color("#383838");
            obj.set_border("0px none,0px none,5px solid #ffa70f,0px solid #ffa70f");
            obj.set_textAlign("center");
            obj.set_verticalAlign("bottom");
            this.addChild(obj.name, obj);

            obj = new Static("stc_total","39","15","61","30",null,null,null,null,null,null,this);
            obj.set_taborder("18");
            obj.set_text("");
            obj.set_font("12px/normal \"Gulim\",\"Arial Black\"");
            obj.set_borderRadius("0px 10px 10px 0px");
            this.addChild(obj.name, obj);

            obj = new Button("btn_reg",null,"70","100","30","50",null,null,null,null,null,this);
            obj.set_text("상품등록");
            obj.set_background("#000000");
            obj.set_color("#ffffff");
            obj.set_border("1px solid #000000");
            obj.set_borderRadius("6px");
            obj.set_font("bold 12px \'Arial\'");
            obj.set_cursor("pointer");
            obj.set_taborder("19");
            this.addChild(obj.name, obj);

            obj = new Button("btn_view","698","70","72","30",null,null,null,null,null,null,this);
            obj.set_text("조회");
            obj.set_background("#000000");
            obj.set_color("#ffffff");
            obj.set_border("1px solid #000000");
            obj.set_borderRadius("6px");
            obj.set_font("bold 12px \'Arial\'");
            obj.set_cursor("pointer");
            obj.set_taborder("20");
            this.addChild(obj.name, obj);

            obj = new Button("btn_show","418","306","92","30",null,null,null,null,null,null,this);
            obj.set_text("선택 진열");
            obj.set_background("#f09d37");
            obj.set_color("#ffffff");
            obj.set_border("1px solid #f09d37");
            obj.set_borderRadius("6px");
            obj.set_font("bold 12px \'Arial\'");
            obj.set_cursor("pointer");
            obj.set_taborder("21");
            this.addChild(obj.name, obj);

            obj = new Button("btn_hide","534","306","92","30",null,null,null,null,null,null,this);
            obj.set_text("진열 취소");
            obj.set_background("#ce5525");
            obj.set_color("#ffffff");
            obj.set_border("1px solid #ce5525");
            obj.set_borderRadius("6px");
            obj.set_font("bold 12px \'Arial\'");
            obj.set_cursor("pointer");
            obj.set_taborder("22");
            this.addChild(obj.name, obj);

            obj = new Button("btn_excel","180","306","130","30",null,null,null,null,null,null,this);
            obj.set_text("    엑셀다운로드");
            obj.set_background("url(\'imagerc::excel_logo.png\') no-repeat left center /30px");
            obj.set_color("#000000");
            obj.set_border("1px solid #cccccc");
            obj.set_borderRadius("6px");
            obj.set_font("bold 12px \'Arial\'");
            obj.set_cursor("pointer");
            obj.set_taborder("23");
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
        this.addIncludeScript("Form_Product.xfdl","common::common.xjs");
        this.registerScript("Form_Product.xfdl", function() {
        this.executeIncludeScript("common::common.xjs"); /*include "common::common.xjs"*/;


        this.Form_Product_onload = function(obj,e)
        {
        	this.setTimer(1, 10); //10ms 후 실행


        };

        this.Form_Product_ontimer = function(obj,e){
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


        // =============검색어 가공 함수=============
        this._normalizeSearchText = function(text) {
            if (!text) return "";

        	// 모든 공백 제거 후 소문자로 변환
            return text.replace(/\s+/g, "").toLowerCase();
        };



        /***** 조회조건 Dataset 구성 *****/
        this.fn_makeSearchCond = function() {
            // 1) 초기화 및 한 줄 추가
            this.ds_searchCond.clearData();
            this.ds_searchCond.addRow();
            // 2) 콤보/에딧/라디오/달력 값을 ds_searchCond에 넣기
            this._setCond(this.ds_searchCond, "SEARCH_TYPE",     this.cmb_searchType.value);                   // 검색분류 (PRODUCT_CODE/PRODUCT_NAME)
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




        //조회버튼
        this.btn_view_onclick = function(obj,e)
        {
        	//this.fn_validateDateRange(); // 날짜 검증
        	this.fn_search();
        };



        this.fn_validateDateRange = function()
        {
            var start = this._dateOrEmpty(this.cal_start); // "yyyy-MM-dd"
        	var end   = this._dateOrEmpty(this.cal_end);   // "yyyy-MM-dd"

        	var now = new Date();
        	var today = now.getFullYear() + "-"
        	+ String(now.getMonth() + 1).padStart(2, "0") + "-"
        	+ String(now.getDate()).padStart(2, "0");


            // 날짜 미선택
            if (!start || !end) {
                this.alert("시작일과 종료일을 모두 선택해주세요.");
                return false;
            }

        	if (start && end) {
        		if (new Date(start) > new Date(end)) { this.alert("시작일은 종료일보다 늦을 수 없습니다."); return false; }
        		var diff = (new Date(end) - new Date(start)) / (1000*60*60*24);
        		if (diff > 365) { this.alert("조회 기간은 최대 1년까지만 가능합니다."); return false; }
        	}

        	var today = (function(d){return d.toISOString().slice(0,10);} )(new Date());
        	if (end && end > today) { this.alert("미래 날짜는 선택할 수 없습니다."); return false; }
        	return true;
        };






        // 검색창
        this.Div00_00_edt_search_onkeydown = function(obj,e)
        {
        	if(e.keycode == 13){
        		this.btn_view_onclick();
        	}
        };


        //상품 목록 조회 (조건포함)
        this.fn_search = function() {
            // 1) 조회조건 Dataset 구성
            this.fn_makeSearchCond();
        	trace(this.ds_searchCond.getColumn(0,"START_DATE"));
        	trace(this.ds_searchCond.getColumn(0,"END_DATE"));
            // 2) 트랜잭션 호출 (검색조건 Dataset 하나로 전달)
            this.transaction(
                "selectProductListByAdmin",            // 서비스 ID (콜백 분기용)
                "svc::selectProductListByAdmin.do?time=" + new Date().getTime(),    // 컨트롤러 URL
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


        /**
        * 상품 진열상태 변경 공통 함수
        * @param {string} newState - "Y" = 진열, "N" = 숨김
        */
        this.fn_updateVisibleProd = function(newState)
        {
            var selRows = [];
        	var alreadyCnt = 0; // 이미 같은 상태인 상품 개수
        	var checkedCnt = 0; // 체크된개수

        	//체크상품있는지 확인
        	for(var i=0; i<this.ds_out_proList.getRowCount(); i++) {
        		if(this.ds_out_proList.getColumn(i, "chk") == 1) {
        			checkedCnt++;
        		}
        	}

        	if(checkedCnt == 0){
        		this.alert("선택된 상품이 없습니다. \n진열 상태를 변경할 상품을 선택해주세요.");
        		return; //함수 종료
        	}



        	//체크 항목 있을때만 실행
            for (var i=0; i<this.ds_out_proList.getRowCount(); i++) {
                if (this.ds_out_proList.getColumn(i, "chk") == 1) {
        			var curState = this.ds_out_proList.getColumn(i,"IS_VISIBLE");

        			//원래 있던상태랑 현재 상태 다르면 넣기
        			if(curState != newState){
        				selRows.push(this.ds_out_proList.getColumn(i, "PRODUCT_ID"));
        			} else {
        				alreadyCnt++;
        			}
                }
            }


        	// 체크했지만 전부 이미 같은 상태인 경우
            if (selRows.length == 0) {
                this.alert("선택한 상품은 이미 " + (newState == "Y" ? "진열" : "숨김") + " 상태입니다.");
                return;
            }

            // 일부는 이미 같은 상태, 일부만 변경 대상일 때 → 안내 후 진행
            if (alreadyCnt > 0) {
                this.alert("선택한 상품 중 " + alreadyCnt + "건은 이미 "
                    + (newState == "Y" ? "진열" : "숨김") + " 상태입니다.\n나머지 상품만 변경합니다.");
            }

        	// 기존: if (!this.confirm("...")) return;
        	this.fn_confirmCustom(
        		"총 " + selRows.length + "건을 "
        		+ (newState == "Y" ? "진열" : "숨김")
        		+ " 상태로 변경하시겠습니까?\n같은 상품계열은 모두 같은 상태로 변경됩니다.",
        		function(ok){
        			if (!ok) return;   // 취소

        			this.ds_in.clearData();
        			for (var j=0; j<selRows.length; j++) {
        				var row = this.ds_in.addRow();
        				this.ds_in.setColumn(row, "PRODUCT_ID", selRows[j]);
        				this.ds_in.setColumn(row, "IS_VISIBLE", newState);
        			}

        			this.transaction(
        				"updateProductVisibleByAdmin",
        				"svc::updateProductVisibleByAdmin.do",
        				"ds_in=ds_in","", "", "fn_callback", true
        			);
        		}.bind(this)
        	);

        };

        // 버튼 이벤트 연결
        this.btn_hide_onclick = function(obj,e)
        {
        	this.fn_updateVisibleProd("N");
        };

        this.btn_show_onclick = function(obj,e)
        {
        	this.fn_updateVisibleProd("Y");
        };





        // 재고 이전값 저장
        this.grid_list_oncellclick = function (obj, e) {
            if (e.col == 16) {   // 15번 컬럼이 재고(QUANTITY) 16번은 버튼
        		var row = e.row;
        		this._updateQuantityByButton(row);
            }
        };




        // Dataset 값 변경시 (재고변경감지)
        this.ds_out_proList_oncolumnchanged = function(obj,e)
        {
        	if(e.columnid == "QUANTITY"){
        		var n = nexacro.toNumber(e.newvalue);

        		if (n > 9999) {
                    obj.setColumn(e.row, "QUANTITY", 9999);
                    this.alert("수량은 최대 9999까지만 입력 가능합니다.");
                } else if (n < 0) {
                    obj.setColumn(e.row, "QUANTITY", 0);
                    this.alert("수량은 0 이상이어야 합니다.");
                }




        		this._updateQuantityByButton (e.row);
        	}
        };


        // 사용자 ID 반환 함수
        this.getUserId = function()
        {
            var app = nexacro.getApplication();
            var sUserId = app.gds_adminInfo.getColumn(0, "MEMBER_ID");

            if (sUserId && sUserId != "undefined") {
                trace("현재 로그인 사용자 ID: " + sUserId);
                return sUserId;
            } else {
                trace("⚠ 사용자 ID를 가져올 수 없습니다. gds_adminInfo 상태 확인 필요");
                return null;
            }
        };




        //재고 수량 저장 공통함수
        this._updateQuantityByButton = function (row) {
            var oldVal = this.ds_out_proList.getColumn(row, "QUANTITY"); // 현재 값
            var productId = this.ds_out_proList.getColumn(row, "PRODUCT_ID");
        	var productName = this.ds_out_proList.getColumn(row, "PRODUCT_NAME");
            var optionId  = this.ds_out_proList.getColumn(row, "OPTION_ID");
        	var optionName = this.ds_out_proList.getColumn(row, "OPTION_NAME");
        	var optionValue = this.ds_out_proList.getColumn(row, "OPTION_VALUE");
        	var sUserId = this.getUserId();

            this.fn_confirmCustom(
        		"상품: " + productName + "\n옵션: " + optionName + "/" + optionValue +
        		"\n재고를 " + oldVal + "개로 저장하시겠습니까?",
        		function(ok){
        			if (!ok) return;

        			this.ds_qu.clearData();
        			var r = this.ds_qu.addRow();
        			this.ds_qu.setColumn(r, "PRODUCT_ID", productId);
        			this.ds_qu.setColumn(r, "OPTION_ID", optionId);
        			this.ds_qu.setColumn(r, "QUANTITY", oldVal);
        			this.ds_qu.setColumn(r, "INPUT_ID", sUserId);
        			this.ds_qu.setColumn(r, "UPDATE_ID", sUserId);

        			this.transaction(
        				"updateInventory",
        				"svc::updateInventory.do?time=" + new Date().getTime(),
        				"ds_qu=ds_qu","", "", "fn_callback", true
        			);
        		}.bind(this)
        	);

        };


        //상품등록(페이지이동)
        this.btn_reg_onclick = function(obj,e)
        {
        	this.getOwnerFrame().arguments = {"productId" : -1}
        	this.getOwnerFrame().set_formurl("product::Form_ProductReg.xfdl");
        };



        //콜백
        this.fn_callback = function(strSvcID, nErrorCode, strErrorMag){
            if (nErrorCode < 0) {
                this.alert(strErrorMag);
        		return;
            }

            switch(strSvcID){
        	case "selectProductListByAdmin":
        		var ea = this.ds_out_proList.getRowCount();
        		this.stc_total.set_text("총 "+ea+"건");
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

        	case "updateProductVisibleByAdmin":
        		// 1) 화면 데이터 갱신
        		for (var i=0; i<this.ds_in.getRowCount(); i++) {
        			var prodId   = this.ds_in.getColumn(i, "PRODUCT_ID");
        			var newState = this.ds_in.getColumn(i, "IS_VISIBLE");

        			for (var r=0; r<this.ds_out_proList.getRowCount(); r++) {
        				if (this.ds_out_proList.getColumn(r, "PRODUCT_ID") == prodId) {
        					this.ds_out_proList.setColumn(r, "IS_VISIBLE", newState);

        					// 2) 하이라이트 플래그 ON
        					this.ds_out_proList.setColumn(r, "HILIGHT", "Y");

        					// 3) 1.2초 뒤 플래그 OFF (색상 원복)
        					var tId = "hi_" + r;
        					this.setTimer(tId, 1200);
        				}
        			}
        		}

        		this.alert("상품 진열상태가 변경되었습니다.");

        		//  4) 하이라이트가 잠시 표시된 후 재조회 (1.2초 뒤)
        		this.setTimer("refreshList", 1300);
        		break;



        		// 타이머에서 하이라이트 해제
        		this.Form_Product_ontimer = function(obj, e)
        		{
        			var id = String(e.timerid);

        			// 1) 하이라이트 해제 타이머
        			if (id.indexOf("hi_") === 0) {
        				var row = parseInt(id.split("_")[1], 10);
        				if (row >= 0 && row < this.ds_out_proList.getRowCount()) {
        					this.ds_out_proList.setColumn(row, "HILIGHT", ""); // OFF
        				}
        				this.killTimer(e.timerid);
        			}

        			// 2) 재조회 타이머
        			if (id == "refreshList") {
        				this.killTimer("refreshList");
        				this.fn_search();  // ← 하이라이트 보여준 뒤 재조회
        			}
        		};


        		//this.fn_search();

        		break;

        	case "updateInventory":
        		this.alert("재고 변경이 완료되었습니다.")
        		this.fn_search();
        		break;


        	}

        };

        // 그리드 전체 클릭 (멀티헤더 대응)
        this.grid_list_onheadclick = function (obj, e)
        {
            var ds = this.ds_out_proList;
            var chkCol = "chk";
            var rowCount = ds.getRowCount();

            // [1] 클릭한 헤더 셀이 체크박스 컬럼(0)일 때만 검사
            if (e.col == 0)
            {
                //  '목록'(row=0 등) 영역 클릭 시 무시
                var dispType = obj.getCellProperty("head", e.cell, "displaytype");
                if (dispType != "checkboxcontrol") return;

                // [2] 현재 헤더 체크 상태 읽기
                var headVal = obj.getCellProperty("head", e.cell, "text");
                var newVal = (headVal == "1" ? "0" : "1");

                // [3] 헤더 표시 갱신
                obj.setCellProperty("head", e.cell, "text", newVal);

                // [4] 전체 행 데이터셋에 반영
                for (var i = 0; i < rowCount; i++) {
                    ds.setColumn(i, chkCol, newVal);
                }
            }
            // [5] 데이터셋 전체 반영
            for (var j = 0; j < rowCount; j++) {
                ds.setColumn(j, chkCol, newVal);
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



        this.grid_list_oncelldblclick = function(obj,e)
        {
        	var productId = this.ds_out_proList.getColumn(e.row,"PRODUCT_ID");
        	trace(productId);
        	this.getOwnerFrame().arguments = {"productId" : productId}
        	this.getOwnerFrame().set_formurl("product::Form_ProductReg.xfdl");
        };
         //콜백
        this.fn_callback = function(strSvcID, nErrorCode, strErrorMag){
            if (nErrorCode < 0) {
                this.alert("오류: "+strErrorMag);
        		return;
            }

            switch(strSvcID){
                case "selectProductListByAdmin":
                    var ea = this.ds_out_proList.getRowCount();
                    this.stc_total.set_text("총 "+ea+"건");

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

        		case "updateProductVisibleByAdmin" :
        			alert("상품 진열상태가 변경되었습니다.");
        			this.fn_search();
        			break;

        		case "updateInventory":
        			this.alert("재고 변경이 완료되었습니다.")
        			this.fn_search();
        			break;


            }
        };



        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_Product_onload,this);
            this.addEventHandler("ontimer",this.Form_Product_ontimer,this);
            this.Div00_00.form.edt_search.addEventHandler("onchanged",this.Div00_00_edt_search_onchanged,this);
            this.Div00_00.form.edt_search.addEventHandler("onkeydown",this.Div00_00_edt_search_onkeydown,this);
            this.Div00_00_00_00_00.form.Radio00_00.addEventHandler("onitemchanged",this.Div00_00_00_00_00_Radio00_00_onitemchanged,this);
            this.grid_list.addEventHandler("onkeydown",this.grid_list_onkeydown,this);
            this.grid_list.addEventHandler("onkillfocus",this.grid_list_onkillfocus,this);
            this.grid_list.addEventHandler("oncellclick",this.grid_list_oncellclick,this);
            this.grid_list.addEventHandler("oncelldblclick",this.grid_list_oncelldblclick,this);
            this.grid_list.addEventHandler("onheadclick",this.grid_list_onheadclick,this);
            this.sta_listTitle.addEventHandler("onclick",this.sta_listTitle_onclick,this);
            this.sta_prodType.addEventHandler("onclick",this.sta_prodType_onclick,this);
            this.cmb_searchType.addEventHandler("onitemchanged",this.cmb_searchType_onitemchanged,this);
            this.cmb_cate1.addEventHandler("onitemchanged",this.cmb_cate1_onitemchanged,this);
            this.cal_end.addEventHandler("onchanged",this.cal_end_onchanged,this);
            this.sta_listTitle00.addEventHandler("onclick",this.sta_listTitle_onclick,this);
            this.btn_reg.addEventHandler("onclick",this.btn_reg_onclick,this);
            this.btn_view.addEventHandler("onclick",this.btn_view_onclick,this);
            this.btn_show.addEventHandler("onclick",this.btn_show_onclick,this);
            this.btn_hide.addEventHandler("onclick",this.btn_hide_onclick,this);
            this.btn_excel.addEventHandler("onclick",this.btn_excel_onclick,this);
            this.ds_out_proList.addEventHandler("oncolumnchanged",this.ds_out_proList_oncolumnchanged,this);
        };
        this.loadIncludeScript("Form_Product.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
