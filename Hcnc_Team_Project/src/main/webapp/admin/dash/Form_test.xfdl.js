(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_test");
            this.set_titletext("New Form");
            this.set_background("#F4F7FE");
            this.set_font("normal 10pt/normal \"Noto Sans KR DemiLight\"");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_orderCount", this);
            obj._setContents("<ColumnInfo><Column id=\"COUNT\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_payCount", this);
            obj._setContents("<ColumnInfo><Column id=\"COUNT\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_shipCount", this);
            obj._setContents("<ColumnInfo><Column id=\"COUNT\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_stat", this);
            obj._setContents("<ColumnInfo><Column id=\"CHART_LABEL\" type=\"STRING\" size=\"256\"/><Column id=\"TOTAL_AMOUNT\" type=\"STRING\" size=\"256\"/><Column id=\"ORDER_COUNT\" type=\"STRING\" size=\"256\"/><Column id=\"CHART_TYPE\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Div("newOrder","2.34%","12","30.00%","130",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("");
            obj.set_borderRadius("7px");
            obj.set_boxShadow("0px 0px 2px 2px rgba(229,229,229,0.15)");
            obj.set_cursor("pointer");
            obj.getSetter("onmouseout").set("Div_onmouseout");
            obj.set_background("white");
            obj.set_formscrolltype("none");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","27","15","97","33",null,null,null,null,null,null,this.newOrder.form);
            obj.set_taborder("0");
            obj.set_text("신규 주문");
            obj.set_font("normal 16pt/0 \"Noto Sans KR Black\"");
            obj.set_color("black");
            this.newOrder.addChild(obj.name, obj);

            obj = new Static("Static00_00","28","46","144","15",null,null,null,null,null,null,this.newOrder.form);
            obj.set_taborder("1");
            obj.set_font("normal 9pt/normal \"Noto Sans KR Medium\"");
            this.newOrder.addChild(obj.name, obj);

            obj = new Static("Static01","141","21",null,"96","12.50%",null,null,null,null,null,this.newOrder.form);
            obj.set_taborder("2");
            obj.set_text("0");
            obj.set_font("normal 60pt/normal \"Arial Black\"");
            obj.set_textAlign("right");
            obj.set_verticalAlign("top");
            obj.set_color("#135dae");
            obj.set_letterSpacing("0px");
            this.newOrder.addChild(obj.name, obj);

            obj = new Static("Static00_01",null,"77","27","33","20",null,null,null,null,null,this.newOrder.form);
            obj.set_taborder("3");
            obj.set_text("건");
            obj.set_font("normal 16pt/0 \"Noto Sans KR\"");
            obj.set_color("black");
            obj.set_textAlign("left");
            this.newOrder.addChild(obj.name, obj);

            obj = new Div("payStatus",null,"12","29.84%","130","35.08%",null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("");
            obj.set_borderRadius("7px");
            obj.set_boxShadow("0px 0px 2px 2px rgba(229,229,229,0.15)");
            obj.set_cursor("pointer");
            obj.getSetter("onmouseout").set("Div_onmouseout");
            obj.set_background("white");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","27","15","97","33",null,null,null,null,null,null,this.payStatus.form);
            obj.set_taborder("0");
            obj.set_text("결제 대기");
            obj.set_font("normal 16pt/0 \"Noto Sans KR Black\"");
            obj.set_color("black");
            this.payStatus.addChild(obj.name, obj);

            obj = new Static("Static00_00","28","46","144","15",null,null,null,null,null,null,this.payStatus.form);
            obj.set_taborder("1");
            obj.set_text("현재 시간 기준");
            obj.set_font("normal 9pt/normal \"Noto Sans KR Medium\"");
            this.payStatus.addChild(obj.name, obj);

            obj = new Static("Static00_01",null,"77","27","33","18",null,null,null,null,null,this.payStatus.form);
            obj.set_taborder("2");
            obj.set_text("건");
            obj.set_font("normal 16pt/0 \"Noto Sans KR\"");
            obj.set_color("black");
            obj.set_textAlign("left");
            this.payStatus.addChild(obj.name, obj);

            obj = new Static("Static01","130","21",null,"96","11.26%",null,null,null,null,null,this.payStatus.form);
            obj.set_taborder("3");
            obj.set_text("0");
            obj.set_font("normal 60pt/normal \"Arial Black\"");
            obj.set_textAlign("right");
            obj.set_verticalAlign("top");
            obj.set_color("#135dae");
            obj.set_letterSpacing("0px");
            this.payStatus.addChild(obj.name, obj);

            obj = new Div("shipStatus",null,"12","30.00%","130","2.27%",null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("");
            obj.set_borderRadius("7px");
            obj.set_boxShadow("0px 0px 2px 2px rgba(229,229,229,0.15)");
            obj.set_cursor("pointer");
            obj.getSetter("onmouseout").set("Div_onmouseout");
            obj.set_background("white");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","27","15","97","33",null,null,null,null,null,null,this.shipStatus.form);
            obj.set_taborder("0");
            obj.set_text("발송 대기");
            obj.set_font("normal 16pt/0 \"Noto Sans KR Black\"");
            obj.set_color("black");
            this.shipStatus.addChild(obj.name, obj);

            obj = new Static("Static00_00","28","46","144","15",null,null,null,null,null,null,this.shipStatus.form);
            obj.set_taborder("1");
            obj.set_text("현재 시간 기준");
            obj.set_font("normal 9pt/normal \"Noto Sans KR Medium\"");
            this.shipStatus.addChild(obj.name, obj);

            obj = new Static("Static00_01",null,"77","27","33","20",null,null,null,null,null,this.shipStatus.form);
            obj.set_taborder("2");
            obj.set_text("건");
            obj.set_font("normal 16pt/0 \"Noto Sans KR\"");
            obj.set_color("black");
            obj.set_textAlign("left");
            this.shipStatus.addChild(obj.name, obj);

            obj = new Static("Static01","133","21",null,"96","12.50%",null,null,null,null,null,this.shipStatus.form);
            obj.set_taborder("3");
            obj.set_text("0");
            obj.set_font("normal 60pt/normal \"Arial Black\"");
            obj.set_textAlign("right");
            obj.set_verticalAlign("top");
            obj.set_color("#135dae");
            obj.set_letterSpacing("-2px");
            this.shipStatus.addChild(obj.name, obj);

            obj = new Div("shipStatus00",null,"170","30.00%",null,"2.27%","40",null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("");
            obj.set_borderRadius("7px");
            obj.set_boxShadow("0px 0px 2px 2px rgba(229,229,229,0.15)");
            obj.set_cursor("pointer");
            obj.getSetter("onmouseout").set("Div_onmouseout");
            obj.set_background("white");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","27","15","137","33",null,null,null,null,null,null,this.shipStatus00.form);
            obj.set_taborder("0");
            obj.set_text("금일 주문 내역");
            obj.set_font("normal 16pt/0 \"Noto Sans KR Black\"");
            obj.set_color("black");
            this.shipStatus00.addChild(obj.name, obj);

            obj = new Static("Static00_00","28","47","144","15",null,null,null,null,null,null,this.shipStatus00.form);
            obj.set_taborder("1");
            obj.set_font("normal 9pt/normal \"Noto Sans KR Medium\"");
            this.shipStatus00.addChild(obj.name, obj);

            obj = new Grid("grid_list","0","80",null,null,"0","0",null,null,null,null,this.shipStatus00.form);
            obj.set_taborder("2");
            obj.set_background("#FFFFFF");
            obj.set_border("0px none");
            obj.set_borderRadius("10px");
            obj.set_autofittype("col");
            obj.set_binddataset("ds_stat");
            obj.set_cellcomboscrollbarsize("4");
            obj.set_celltextareascrollbarsize("4");
            obj.set_scrollbarsize("10");
            obj.set_scrollbartrackbarsize("40");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"140\"/><Column size=\"87\"/><Column size=\"144\"/></Columns><Rows><Row size=\"44\" band=\"head\"/><Row size=\"33\"/></Rows><Band id=\"head\"><Cell text=\"시간대별\" background=\"white\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" border=\"0px,0px,1px solid #eeeeee\" color=\"black\"/><Cell col=\"1\" text=\"주문량\" background=\"white\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" border=\"0px,0px,1px solid #eeeeee\" color=\"black\"/><Cell col=\"2\" text=\"주문금액\" background=\"white\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" border=\"0px,0px,1px solid #eeeeee\" color=\"black\"/></Band><Band id=\"body\"><Cell text=\"bind:CHART_LABEL\" textAlign=\"center\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR Medium&quot;\" color=\"black\"/><Cell col=\"1\" text=\"bind:ORDER_COUNT\" textAlign=\"center\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR Light&quot;\" color=\"black\"/><Cell col=\"2\" text=\"bind:TOTAL_AMOUNT\" textAlign=\"center\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR Medium&quot;\" color=\"#135dae\"/></Band></Format></Formats>");
            this.shipStatus00.addChild(obj.name, obj);

            obj = new Div("Div00","2.34%","170",null,null,"35%","40",null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("Div00");
            obj.set_background("white");
            obj.set_borderRadius("7px");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);

            obj = new BasicChart("BasicChart00","20","50",null,null,"20","0",null,null,null,null,this.Div00.form);
            obj.set_taborder("0");
            obj.set_background("white");
            obj.set_borderRadius("10px");
            obj.set_binddataset("ds_stat");
            obj._setContents({
            	"legend": {
            		"id": "legend",
            		"padding": "20px 10px 3px",
            		"itemtextfont": "normal 10/normal \"Noto Sans KR\"",
            		"itemtextcolor": "#4c4c4c",
            		"visible": true,
            		"markertype": "circle",
            		"align": "topright",
            		"itemcolumncount": "1",
            		"markertextgap": "2",
            		"markersize": "7"
            	},
            	"hrangebar": {
            		"id": "hrangebar",
            		"trackbarpadding": "1px",
            		"background": "#eaeaea",
            		"linestyle": "1px solid #d5d5d5",
            		"trackbarlinestyle": "0px none",
            		"trackbarfillstyle": "#c9c9c9",
            		"size": "12",
            		"visible": false
            	},
            	"vrangebar": {
            		"id": "vrangebar",
            		"trackbarpadding": "1px",
            		"background": "#eaeaea",
            		"linestyle": "1px solid #d5d5d5",
            		"trackbarlinestyle": "0px none",
            		"trackbarfillstyle": "#c9c9c9",
            		"size": "12",
            		"visible": false
            	},
            	"tooltip": {
            		"id": "tooltip",
            		"background": "#4b4b4b",
            		"linestyle": "0px none",
            		"textcolor": "white",
            		"textfont": "10pt/normal '맑은 고딕'",
            		"padding": "5px",
            		"visible": true
            	},
            	"board": {
            		"id": "board",
            		"visible": false
            	},
            	"categoryaxis": {
            		"id": "categoryaxis",
            		"titletextcolor": "#4c4c4c",
            		"titletextfont": "bold 12pt '맑은 고딕'",
            		"labeltextcolor": "#6f6f6f",
            		"labeltextfont": "normal 400 10/normal \"Noto Sans KR\"",
            		"axislinestyle": "1px solid #525252",
            		"ticklinestyle": "1px solid #525252",
            		"visible": true,
            		"titletext": " ",
            		"labeltype": "currency",
            		"ticksize": "5",
            		"gap": "0",
            		"axislineopacity": "0"
            	},
            	"valueaxes": [
            		{
            			"id": "valueaxis0",
            			"boardlinevisible": true,
            			"labeltextfont": "normal 400 8/normal \"Noto Sans KR\"",
            			"titletextcolor": "#38b9ff",
            			"ticklinestyle": "1px solid #7b7b7b",
            			"axislinestyle": "1px solid #7b7b7b",
            			"visible": "true",
            			"titletextalign": "high",
            			"ticks": "4",
            			"autotickscale": "20",
            			"ticklineopacity": "1",
            			"boardlineopacity": "0",
            			"labeltype": "currency",
            			"labeltextcolor": "#7b7b7b",
            			"axislineopacity": "1",
            			"titlerotate": "0",
            			"opposite": "false",
            			"titletextfont": "normal 10pt/normal \"Arial\"",
            			"titletext": " ",
            			"gap": "0",
            			"ticksize": "3",
            			"labelgap": "0",
            			"boardlinestyle": "1px solid #7b7b7b"
            		},
            		{
            			"id": "valueaxis1",
            			"titletext": " ",
            			"boardlinevisible": true,
            			"labeltextcolor": "#7b7b7b",
            			"labeltextfont": "normal 9/normal \"Noto Sans KR\"",
            			"titletextcolor": "#009ff4",
            			"titletextfont": "normal 800 9/normal \"Noto Sans KR\"",
            			"ticklinestyle": "1px solid #525252",
            			"axislinestyle": "1px solid #7b7b7b",
            			"opposite": "true",
            			"autotickscale": "50",
            			"ticks": "4",
            			"titletextalign": "high",
            			"titlerotate": "0",
            			"ticksize": "3",
            			"labelgap": "3",
            			"boardlineopacity": "1",
            			"boardlinestyle": "1px solid #c9c9c9"
            		}
            	],
            	"seriesset": [
            		{
            			"id": "총액",
            			"titletext": "총액",
            			"barvisible": "true",
            			"itemtextvisible": true,
            			"itemtextfont": "normal 12/normal \"Noto Sans KR Medium\"",
            			"valuecolumn": "bind:TOTAL_AMOUNT",
            			"itemtextcolor": "white",
            			"selectcolumn": "bind:TOTAL_AMOUNT",
            			"lineareavisible": "false",
            			"linevisible": "false",
            			"pointvisible": "true",
            			"pointitemtextgap": "0",
            			"selectpointopacity": "0",
            			"stacktype": "none",
            			"selecttype": "unselect",
            			"barsize": "15",
            			"baropacity": "1",
            			"valueaxis": "valueaxis0",
            			"highlightbarvisible": "false",
            			"barfillstyle": "#135dae",
            			"linetype": "",
            			"lineareaopacity": "0",
            			"highlightlineopacity": "0",
            			"lineopacity": "0",
            			"selectlineareaopacity": "0",
            			"selectlineopacity": "0",
            			"pointsize": "0",
            			"pointopacity": "0",
            			"highlightpointopacity": "0",
            			"barlinestyle": "0"
            		},
            		{
            			"id": "판매수량",
            			"titletext": "판매수량",
            			"valuecolumn": "bind:ORDER_COUNT",
            			"valueaxis": "valueaxis1",
            			"barlinestyle": "1px solid #1a85be",
            			"barfillstyle": "#1a85be",
            			"barvisible": "false",
            			"lineareavisible": "false",
            			"linevisible": "true",
            			"pointvisible": "true",
            			"itemtextvisible": "true",
            			"itemtextcolor": "#009ff4",
            			"itemtextfont": "normal 400 10/normal \"Noto Sans KR\"",
            			"pointsize": "9",
            			"pointfillstyle": "#008bd6",
            			"pointlinestyle": "1px solid #009ff4",
            			"pointitemtextgap": "9",
            			"linetype": "segment",
            			"linestyle": "2px solid #009ff4",
            			"selecttype": "unselect"
            		}
            	]
            });
            obj.set_categorycolumn("bind:CHART_LABEL");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static00","27","15","157","33",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("1");
            obj.set_text("금일 주문 차트");
            obj.set_font("normal 16pt/0 \"Noto Sans KR Black\"");
            obj.set_color("black");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static00_00","28","47","144","15",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("2");
            obj.set_font("normal 9pt/normal \"Noto Sans KR Medium\"");
            obj.set_text("(4시간 단위로 묶여있습니다.)");
            this.Div00.addChild(obj.name, obj);

            obj = new Div("Div00_00","0.00%","0",null,null,"0.00%","0",null,null,null,null,this.Div00.form);
            obj.set_taborder("3");
            obj.set_borderRadius("7px");
            obj.set_cursor("pointer");
            obj.set_text("");
            this.Div00.addChild(obj.name, obj);

            obj = new Div("shipStatus01",null,"12","30.00%","130","2.27%",null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("");
            obj.set_borderRadius("7px");
            obj.set_boxShadow("0px 0px 2px 2px rgba(229,229,229,0.15)");
            obj.set_cursor("pointer");
            obj.getSetter("onmouseout").set("Div_onmouseout");
            this.addChild(obj.name, obj);

            obj = new Div("payStatus00",null,"12","29.84%","130","35.08%",null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_text("");
            obj.set_borderRadius("7px");
            obj.set_boxShadow("0px 0px 2px 2px rgba(229,229,229,0.15)");
            obj.set_cursor("pointer");
            obj.getSetter("onmouseout").set("Div_onmouseout");
            this.addChild(obj.name, obj);

            obj = new Div("newOrder00","2.27%","12","30.00%","130",null,null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_text("");
            obj.set_borderRadius("7px");
            obj.set_boxShadow("0px 0px 2px 2px rgba(229,229,229,0.15)");
            obj.set_cursor("pointer");
            obj.getSetter("onmouseout").set("Div_onmouseout");
            obj.set_formscrolltype("none");
            obj.set_opacity("1");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1280,720,this,function(p){});
            obj.set_mobileorientation("landscape");
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Form_test.xfdl", function() {
        // Form 로드
        this.Form_test_onload = function(obj,e)
        {
            this.fnselectNewOrderCountByAdmin();
        	this.fnselectPendingPaymentCountByAdmin();
        	this.fnselectPendingShipCountByAdmin();
        	this.fnselectDashStatByAdmin();
        	this.setTodayText();
        };

        this.Div_onmousemove = function(obj,e)
        {
            obj.set_boxShadow("0px 0px 3px 3px rgba(200,200,200,0.30)");
        };

        this.Div_onmouseleave = function(obj,e)
        {
            obj.set_boxShadow("0px 0px 2px 2px rgba(229,229,229,0.15)");
        };

        this.payStatus_onclick = function(obj,e)
        {
        	var glbAd = nexacro.getApplication();
            glbAd.mainframe.VFrameSet00.HFrameSet00.VFrameSet01.WorkFrame.set_formurl(
                "order::Form_Order_Pay.xfdl"
            );
        };

        this.shipStatus_onclick = function(obj,e)
        {
        	var glbAd = nexacro.getApplication();
            glbAd.mainframe.VFrameSet00.HFrameSet00.VFrameSet01.WorkFrame.set_formurl(
                "order::Form_Order_Ship.xfdl"
            );
        };

        this.newOrder_onclick = function(obj,e)
        {
        	var glbAd = nexacro.getApplication();
            glbAd.mainframe.VFrameSet00.HFrameSet00.VFrameSet01.WorkFrame.set_formurl(
                "order::Form_Order_Main.xfdl"
            );
        };



        // 오늘자 주문 개수 조회
        this.fnselectNewOrderCountByAdmin = function() {
            var strSvcID       = "selectNewOrderCountByAdmin";
            var strURL         = "svc::selectNewOrderCountByAdmin.do?time=" + new Date().getTime();  // Spring Controller 매핑
            var strInDatasets  = "";                   // 검색조건 dataset 전달
            var strOutDatasets = "ds_orderCount=ds_orderCount";
            var strArg         = "";
            var strCallback    = "fnCallback";

            this.transaction(strSvcID, strURL, strInDatasets, strOutDatasets, strArg, strCallback);
        };

        // 오늘자 결제대기 개수 조회
        this.fnselectPendingPaymentCountByAdmin = function() {
            var strSvcID       = "selectPendingPaymentCountByAdmin";
            var strURL         = "svc::selectPendingPaymentCountByAdmin.do?time=" + new Date().getTime();  // Spring Controller 매핑
            var strInDatasets  = "";
            var strOutDatasets = "ds_payCount=ds_payCount";
            var strArg         = "";
            var strCallback    = "fnCallback";

            this.transaction(strSvcID, strURL, strInDatasets, strOutDatasets, strArg, strCallback);
        };

        // 오늘자 배송 대기 개수 조회
        this.fnselectPendingShipCountByAdmin = function() {
            var strSvcID       = "selectPendingShipCountByAdmin";
            var strURL         = "svc::selectPendingShipCountByAdmin.do?time=" + new Date().getTime();  // Spring Controller 매핑
            var strInDatasets  = "";
            var strOutDatasets = "ds_shipCount=ds_shipCount";
            var strArg         = "";
            var strCallback    = "fnCallback";

            this.transaction(strSvcID, strURL, strInDatasets, strOutDatasets, strArg, strCallback);
        };

        // 공통 콜백
        this.fnCallback = function(svc, err, errMsg) {
            if (err < 0) {
                this.alert("에러 발생: " + errMsg);

                return;
            }
            switch(svc){
                case "selectNewOrderCountByAdmin"  :
        			var cnt = this.ds_orderCount.getColumn(0,"COUNT");
        			this.newOrder.form.Static01.set_text(cnt);
                    break;

        		case "selectPendingPaymentCountByAdmin"  :
        			var cnt = this.ds_payCount.getColumn(0,"COUNT");
        			this.payStatus.form.Static01.set_text(cnt);
                    break;
        		case "selectPendingShipCountByAdmin"  :
        			var cnt = this.ds_shipCount.getColumn(0,"COUNT");
        			this.shipStatus.form.Static01.set_text(cnt);
                    break;

        		case "selectDashStatByAdmin"  :
                    break;
            }
        };


        // 주문 내역 조회
        this.fnselectDashStatByAdmin = function() {
            var strSvcID       = "selectDashStatByAdmin";
            var strURL         = "svc::selectDashStatByAdmin.do?time=" + new Date().getTime();
            var strInDatasets  = "";
            var strOutDatasets = "ds_stat=ds_stat";
            var strArg         = "";
            var strCallback    = "fnCallback";
            this.transaction(strSvcID, strURL, strInDatasets, strOutDatasets, strArg, strCallback);
        };


        // 오늘날짜 받아오는 함수
        this.setTodayText = function() {
            var today = new Date();
            var month = today.getMonth() + 1;  // 0부터 시작하므로 +1
            var day = today.getDate();

            var dateText = month + "월 " + day + "일 기준";

            this.newOrder.form.Static00_00.set_text(dateText);
        	this.shipStatus00.form.Static00_00.set_text(dateText);
        };

        // 통계로 이동
        this.Div00_00_onclick = function(obj,e)
        {
        	var glbAd = nexacro.getApplication();
            glbAd.mainframe.VFrameSet00.HFrameSet00.VFrameSet01.WorkFrame.set_formurl(
                "stat::Form_stat_main.xfdl"
            );
        };



        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_test_onload,this);
            this.newOrder.addEventHandler("onmousemove",this.Div_onmousemove,this);
            this.newOrder.addEventHandler("onmouseleave",this.Div_onmouseleave,this);
            this.newOrder.addEventHandler("onclick",this.newOrder_onclick,this);
            this.newOrder.form.Static00.addEventHandler("onclick",this.newOrder_Static00_onclick,this);
            this.newOrder.form.Static00_01.addEventHandler("onclick",this.newOrder_Static00_onclick,this);
            this.payStatus.addEventHandler("onmousemove",this.Div_onmousemove,this);
            this.payStatus.addEventHandler("onmouseleave",this.Div_onmouseleave,this);
            this.payStatus.addEventHandler("onclick",this.payStatus_onclick,this);
            this.payStatus.form.Static00_01.addEventHandler("onclick",this.newOrder_Static00_onclick,this);
            this.shipStatus.addEventHandler("onmousemove",this.Div_onmousemove,this);
            this.shipStatus.addEventHandler("onmouseleave",this.Div_onmouseleave,this);
            this.shipStatus.addEventHandler("onclick",this.shipStatus_onclick,this);
            this.shipStatus.form.Static00_01.addEventHandler("onclick",this.newOrder_Static00_onclick,this);
            this.shipStatus00.addEventHandler("onmousemove",this.Div_onmousemove,this);
            this.shipStatus00.addEventHandler("onmouseleave",this.Div_onmouseleave,this);
            this.Div00.addEventHandler("onmouseleave",this.Div_onmouseleave,this);
            this.Div00.addEventHandler("onmousemove",this.Div_onmousemove,this);
            this.Div00.form.BasicChart00.addEventHandler("onseriesclick",this.Div00_BasicChart00_onseriesclick,this);
            this.Div00.form.Div00_00.addEventHandler("onmouseleave",this.Div_onmouseleave,this);
            this.Div00.form.Div00_00.addEventHandler("onmousemove",this.Div_onmousemove,this);
            this.Div00.form.Div00_00.addEventHandler("onclick",this.Div00_00_onclick,this);
            this.shipStatus01.addEventHandler("onmousemove",this.Div_onmousemove,this);
            this.shipStatus01.addEventHandler("onmouseleave",this.Div_onmouseleave,this);
            this.shipStatus01.addEventHandler("onclick",this.shipStatus_onclick,this);
            this.payStatus00.addEventHandler("onmousemove",this.Div_onmousemove,this);
            this.payStatus00.addEventHandler("onmouseleave",this.Div_onmouseleave,this);
            this.payStatus00.addEventHandler("onclick",this.payStatus_onclick,this);
            this.newOrder00.addEventHandler("onmousemove",this.Div_onmousemove,this);
            this.newOrder00.addEventHandler("onmouseleave",this.Div_onmouseleave,this);
            this.newOrder00.addEventHandler("onclick",this.newOrder_onclick,this);
        };
        this.loadIncludeScript("Form_test.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
