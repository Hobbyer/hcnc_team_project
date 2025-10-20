(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_Stat_Main");
            this.set_titletext("New Form");
            this.set_background("#F4F7FE");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_stat", this);
            obj._setContents("<ColumnInfo><Column id=\"CHART_LABEL\" type=\"STRING\" size=\"256\"/><Column id=\"TOTAL_AMOUNT\" type=\"STRING\" size=\"256\"/><Column id=\"ORDER_COUNT\" type=\"STRING\" size=\"256\"/><Column id=\"CHART_TYPE\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_search", this);
            obj._setContents("<ColumnInfo><Column id=\"SEARCH_TYPE\" type=\"STRING\" size=\"256\"/><Column id=\"SEARCH_DATA\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_payment", this);
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"256\"/><Column id=\"NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"CODE\">전체</Col><Col id=\"NAME\">전체</Col></Row><Row><Col id=\"CODE\">카드</Col><Col id=\"NAME\">카드</Col></Row><Row><Col id=\"CODE\">계좌</Col><Col id=\"NAME\">계좌</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_statname", this);
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"256\"/><Column id=\"NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"CODE\">일별</Col><Col id=\"NAME\">일별</Col></Row><Row><Col id=\"CODE\">월별</Col><Col id=\"NAME\">월별</Col></Row><Row><Col id=\"CODE\">결제수단별</Col><Col id=\"NAME\">결제수단별</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_detailsearch", this);
            obj._setContents("<ColumnInfo><Column id=\"SEARCH_DATA\" type=\"STRING\" size=\"256\"/><Column id=\"SEARCH_TYPE\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_detailstat", this);
            obj._setContents("<ColumnInfo><Column id=\"ORDER_NUMBER\" type=\"STRING\" size=\"256\"/><Column id=\"ORDER_COMMENT\" type=\"STRING\" size=\"256\"/><Column id=\"ORDER_DT\" type=\"STRING\" size=\"256\"/><Column id=\"FINAL_AMOUNT\" type=\"STRING\" size=\"256\"/><Column id=\"USER_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"MEMBER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"PAYMENT_METHOD\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Div("search_area","40","10",null,"60","40",null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_background("#ffffff");
            obj.set_borderRadius("10px");
            obj.set_text("");
            obj.set_boxShadow("0px 0px 2px 2px rgba(229,229,229,0.15)");
            this.addChild(obj.name, obj);

            obj = new Static("txt_cnt","110","15","80","36",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("0");
            obj.set_font("normal 10pt/normal \"Noto Sans KR\"");
            this.search_area.addChild(obj.name, obj);

            obj = new Static("txt_th01","29","13","80","36",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("1");
            obj.set_text("주문 내역");
            obj.set_font("normal 13pt/normal \"Noto Sans KR Black\"");
            obj.set_color("#4b4b4b");
            this.search_area.addChild(obj.name, obj);

            obj = new Combo("Combo00","247","17","120","30",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("2");
            obj.set_innerdataset("ds_statname");
            obj.set_codecolumn("NAME");
            obj.set_datacolumn("NAME");
            obj.set_text("일별");
            obj.set_value("일별");
            obj.set_index("0");
            this.search_area.addChild(obj.name, obj);

            obj = new Static("txt_th01_00","177","14","80","36",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("3");
            obj.set_text("기본 설정");
            obj.set_font("normal 10pt/normal \"Noto Sans KR\"");
            obj.set_color("#4b4b4b");
            this.search_area.addChild(obj.name, obj);

            obj = new Static("txt_th01_00_00","52.5%","13","80","36",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("4");
            obj.set_text("상세 설정");
            obj.set_font("normal 10pt/normal \"Noto Sans KR\"");
            obj.set_color("#4b4b4b");
            this.search_area.addChild(obj.name, obj);

            obj = new Calendar("Calendar00","58.33%","16","120","30",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("5");
            this.search_area.addChild(obj.name, obj);

            obj = new Div("Div00","40","90","47%",null,null,"50",null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text(" ");
            obj.set_background("white");
            obj.set_borderRadius("10px");
            obj.set_boxShadow("0px 0px 2px 2px rgba(229,229,229,0.15)");
            this.addChild(obj.name, obj);

            obj = new BasicChart("BasicChart00","0","57",null,null,"0","0",null,null,null,null,this.Div00.form);
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
            			"barvisible": "false",
            			"itemtextvisible": true,
            			"itemtextfont": "normal 400 10/normal \"Noto Sans KR\"",
            			"valuecolumn": "bind:TOTAL_AMOUNT",
            			"itemtextcolor": "#38b9ff",
            			"selectcolumn": "bind:TOTAL_AMOUNT",
            			"lineareavisible": "true",
            			"linevisible": "true",
            			"pointvisible": "true",
            			"lineareafillstyle": "#b0e4ff",
            			"pointfillstyle": "#38b9ff",
            			"pointsize": "9",
            			"linestyle": "1px solid #38b9ff",
            			"pointlinestyle": "1px solid #38b9ff",
            			"pointshape": "circle",
            			"pointitemtextposition": "centertop",
            			"pointitemtextgap": "8",
            			"selectpointopacity": "1",
            			"stacktype": "none",
            			"selecttype": "unselect",
            			"barsize": "20",
            			"baropacity": "0",
            			"valueaxis": "valueaxis0"
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

            obj = new Div("Div00","0","53","100%","35",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("1");
            obj.set_border("1px solid #eeeeee,0px none,0px none");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("txt_th01","29","10","80","36",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("2");
            obj.set_text("주문 내역");
            obj.set_font("normal 13pt/normal \"Noto Sans KR Black\"");
            obj.set_color("#4b4b4b");
            this.Div00.addChild(obj.name, obj);

            obj = new Div("Div01","0","70",null,null,"0","0",null,null,null,null,this.Div00.form);
            obj.set_taborder("3");
            obj.set_background("white");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("txt_th01_00","36.22%","48.24%","159","16",null,null,null,null,null,null,this.Div00.form.Div01.form);
            obj.set_taborder("0");
            obj.set_text("조회된 데이터가 없습니다");
            obj.set_font("normal 11pt/normal \"Noto Sans KR\"");
            obj.set_color("#4b4b4b");
            obj.set_textAlign("center");
            this.Div00.form.Div01.addChild(obj.name, obj);

            obj = new Div("Div00_00",null,"90","47%",null,"40","50",null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("Div00");
            obj.set_background("white");
            obj.set_borderRadius("10px");
            obj.set_boxShadow("0px 0px 2px 2px rgba(229,229,229,0.15)");
            this.addChild(obj.name, obj);

            obj = new Div("Div00","0","53","100%","35",null,null,null,null,null,null,this.Div00_00.form);
            obj.set_taborder("1");
            obj.set_border("1px solid #eeeeee,0px none,0px none");
            this.Div00_00.addChild(obj.name, obj);

            obj = new Static("txt_th01","29","10","80","36",null,null,null,null,null,null,this.Div00_00.form);
            obj.set_taborder("0");
            obj.set_text("상세 내역");
            obj.set_font("normal 13pt/normal \"Noto Sans KR Black\"");
            obj.set_color("#4b4b4b");
            this.Div00_00.addChild(obj.name, obj);

            obj = new Static("txt_th01_01","106","11","80","36",null,null,null,null,null,null,this.Div00_00.form);
            obj.set_taborder("2");
            obj.set_font("normal 9pt/normal \"Noto Sans KR\"");
            obj.set_color("#4b4b4b");
            this.Div00_00.addChild(obj.name, obj);

            obj = new Grid("grid_list",null,"63","100.00%",null,"0","0",null,null,null,null,this.Div00_00.form);
            obj.set_taborder("3");
            obj.set_background("#FFFFFF");
            obj.set_border("0px none");
            obj.set_borderRadius("10px");
            obj.set_autofittype("col");
            obj.set_binddataset("ds_detailstat");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"107\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row size=\"44\" band=\"head\"/><Row size=\"33\"/></Rows><Band id=\"head\"><Cell text=\"주문번호\" background=\"white\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" border=\"0px,0px,1px solid #eeeeee\" color=\"black\"/><Cell col=\"1\" text=\"주문ID\" background=\"white\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" border=\"0px,0px,1px solid #eeeeee\" color=\"black\"/><Cell col=\"2\" text=\"주문자\" background=\"white\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" border=\"0px,0px,1px solid #eeeeee\" color=\"black\"/><Cell col=\"3\" text=\"결제금액\" background=\"white\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" border=\"0px,0px,1px solid #eeeeee\" color=\"black\"/><Cell col=\"4\" text=\"주문일\" background=\"white\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" border=\"0px,0px,1px solid #eeeeee\" color=\"black\"/></Band><Band id=\"body\"><Cell text=\"bind:ORDER_NUMBER\" textAlign=\"center\" border=\"0px\" font=\"normal 10pt/normal &quot;Noto Sans KR Light&quot;\"/><Cell col=\"1\" text=\"bind:MEMBER_ID\" textAlign=\"center\" border=\"0px\" font=\"normal 10pt/normal &quot;Noto Sans KR Light&quot;\"/><Cell col=\"2\" text=\"bind:USER_NAME\" textAlign=\"center\" border=\"0px\" font=\"normal 10pt/normal &quot;Noto Sans KR Light&quot;\"/><Cell col=\"3\" text=\"bind:FINAL_AMOUNT\" textAlign=\"right\" border=\"0px\" font=\"normal 10pt/normal &quot;Noto Sans KR Black&quot;\" color=\"#135dae\"/><Cell col=\"4\" text=\"bind:ORDER_DT\" textAlign=\"center\" border=\"0px\" font=\"normal 10pt/normal &quot;Noto Sans KR Light&quot;\"/></Band></Format></Formats>");
            this.Div00_00.addChild(obj.name, obj);

            obj = new Static("txt_th01_00","350","21",null,"16","20",null,null,null,null,null,this.Div00_00.form);
            obj.set_taborder("4");
            obj.set_text("상세 내역을 보려면 포인터를 클릭하세요");
            obj.set_font("normal 9pt/normal \"Noto Sans KR Light\"");
            obj.set_color("#4b4b4b");
            obj.set_textAlign("right");
            this.Div00_00.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1280,720,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item0","Div00_00.form.grid_list","binddataset","ds_user","");
            this.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Form_stat_main.xfdl", function() {
        // 온로드시
        this.Form_Stat_Main_onload = function(obj,e)
        {
            // 초기 설정: 일별로 기본값 설정
            this.ds_search.addRow();
            this.ds_search.setColumn(0, "SEARCH_TYPE", "일별");



            // 일별 통계 조회
            this.fnSelectStatByAdmin();
        };

        // 주문 내역 조회
        this.fnSelectStatByAdmin = function() {
            var strSvcID       = "selectStatByAdmin";
            var strURL         = "svc::selectStatByAdmin.do?time=" + new Date().getTime();
            var strInDatasets  = "ds_search=ds_search";
            var strOutDatasets = "ds_stat=ds_stat";
            var strArg         = "";
            var strCallback    = "fnCallback";
            this.transaction(strSvcID, strURL, strInDatasets, strOutDatasets, strArg, strCallback);
        };

        // 주문 내역 상세 조회
        this.fnSelectStatDetailByAdmin = function() {
            var strSvcID       = "selectStatDetailByAdmin";
            var strURL         = "svc::selectStatDetailByAdmin.do?time=" + new Date().getTime();
            var strInDatasets  = "ds_detailsearch=ds_detailsearch";
            var strOutDatasets = "ds_detailstat=ds_detailstat";
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
                case "selectStatByAdmin" :
        			var isData = this.ds_stat.getRowCount();
        			if(isData==0){
        				this.Div00.form.Div01.set_visible(true);
        			}else{
        				this.Div00.form.Div01.set_visible(false);
        			}
        			var currentType = this.search_area.form.Combo00.value;

                    this.Div00.form.txt_th01.set_text(currentType);

        			switch(currentType){
        				case "결제수단별":
        				this.search_area.form.Calendar00.set_visible(false);
        				this.search_area.form.Calendar00.set_value("");
        				this.search_area.form.txt_th01_00_00.set_text("");
        				break;

        				default :
        				this.search_area.form.Calendar00.set_visible(true);
        				this.search_area.form.txt_th01_00_00.set_text("상세 설정");
        				break;
        			}
        			this.ds_search.setColumn(0,"SEARCH_DATA","")

        			this.ds_detailstat.clearData()
        			this.Div00_00.form.txt_th01_01.set_text("");
        			this.Div00_00.form.txt_th01_00.set_text("");

                    break;

        		case "selectStatDetailByAdmin" :
        			var detailCnt = this.ds_detailstat.getRowCount();
        			var search = this.ds_detailsearch.getColumn(0,"SEARCH_DATA");
        			var type   = this.ds_detailsearch.getColumn(0,"SEARCH_TYPE");
        			this.Div00_00.form.txt_th01_01.set_text("총 " + detailCnt + "건");
        			this.Div00_00.form.txt_th01_00.set_text(type +" : "+ search);

        		break;
            }
        };




        //차트 포인트 클릭 이벤트 이 폼페이지의 핵심!
        this.Div00_BasicChart00_onseriesclick = function(obj,e)
        {
        	var itemIndex = e.itemindex;


        		if(e.itemindex ==null){
        			alert("점부분을 눌러주세요")

        			return;
        		}else{

        			var detail = this.ds_stat.getColumn(e.itemindex, "CHART_LABEL");
        			var type = this.ds_stat.getColumn(e.itemindex, "CHART_TYPE");
        			this.ds_detailsearch.setColumn(0,"SEARCH_TYPE",type);
        			this.ds_detailsearch.setColumn(0,"SEARCH_DATA",detail);

        			this.fnSelectStatDetailByAdmin();

        		}

        };


        // 검색조회 콤보박스
        this.search_area_Combo00_onitemchanged = function(obj,e)
        {
            this.ds_search.setColumn(0, "SEARCH_TYPE", e.postvalue);
            this.fnSelectStatByAdmin();  // 조회 트랜젝션
        };

        //상세 콤보박스(전체, 카드, 계좌)
        this.search_area_Combo00_00_onitemchanged = function(obj,e)
        {
        	 this.ds_search.setColumn(0, "SEARCH_DATA", e.postvalue);
        	 this.fnSelectStatByAdmin();
        };



        //날짜선택시
        this.search_area_Calendar00_onchanged = function(obj,e)
        {
        	var selectedDate = e.postvalue;
            var currentType = this.search_area.form.Combo00.value;

        	switch(currentType){

        		case "일별" :
        		this.fnDailySearchdata(selectedDate); // 일변환함수 실행
        		this.fnSelectStatByAdmin();
        		break;


        		case "월별" :
        		this.fnMonthSearchdata(selectedDate); //월변환함수 실행
        		this.fnSelectStatByAdmin();
        		break;
        	}

        };

        //일별 선택시 seachdata 설정 함수
        this.fnDailySearchdata = function(selectedDate){
            // 넥사크로 Calendar는 보통 YYYYMMDD 형식으로 넘어옴
            if (selectedDate && selectedDate.length == 8) {
                // YYYYMMDD → YYYY-MM-DD 변환
                var year = selectedDate.substring(0, 4);
                var month = selectedDate.substring(4, 6);
                var day = selectedDate.substring(6, 8);
                var formattedDate = year + '-' + month + '-' + day;

                this.ds_search.setColumn(0, "SEARCH_DATA", formattedDate);
            } else if (selectedDate) {
                // 이미 YYYY-MM-DD 형식이면 그대로 사용
                this.ds_search.setColumn(0, "SEARCH_DATA", selectedDate);
            } else {
                // 값이 없으면 null로 설정
                this.ds_search.setColumn(0, "SEARCH_DATA", null);
            }
        }


        //월별 선택시 seachdata 설정 함수
        this.fnMonthSearchdata = function(selectedDate){
            // 넥사크로 Calendar는 보통 YYYYMMDD 형식으로 넘어옴
            if (selectedDate && selectedDate.length == 8) {
                // YYYYMMDD → YYYY-MM 변환 (월별이므로 일은 제외)
                var year = selectedDate.substring(0, 4);
                var month = selectedDate.substring(4, 6);
                var formattedDate = year + '-' + month;

                this.ds_search.setColumn(0, "SEARCH_DATA", formattedDate);
            } else if (selectedDate && selectedDate.length >= 7) {
                // 이미 YYYY-MM-DD 형식이면 YYYY-MM만 추출
                var formattedDate = selectedDate.substring(0, 7); // YYYY-MM
                this.ds_search.setColumn(0, "SEARCH_DATA", formattedDate);
            } else {
                // 값이 없으면 null로 설정
                this.ds_search.setColumn(0, "SEARCH_DATA", null);
            }
        }


        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_Stat_Main_onload,this);
            this.search_area.form.txt_th01.addEventHandler("onclick",this.txt_th_onclick,this);
            this.search_area.form.Combo00.addEventHandler("onitemchanged",this.search_area_Combo00_onitemchanged,this);
            this.search_area.form.txt_th01_00.addEventHandler("onclick",this.txt_th_onclick,this);
            this.search_area.form.txt_th01_00_00.addEventHandler("onclick",this.txt_th_onclick,this);
            this.search_area.form.Calendar00.addEventHandler("onchanged",this.search_area_Calendar00_onchanged,this);
            this.Div00.form.BasicChart00.addEventHandler("onseriesclick",this.Div00_BasicChart00_onseriesclick,this);
            this.Div00.form.txt_th01.addEventHandler("onclick",this.txt_th_onclick,this);
            this.Div00.form.Div01.form.txt_th01_00.addEventHandler("onclick",this.txt_th_onclick,this);
            this.Div00_00.form.txt_th01.addEventHandler("onclick",this.txt_th_onclick,this);
            this.Div00_00.form.txt_th01_01.addEventHandler("onclick",this.txt_th_onclick,this);
            this.Div00_00.form.txt_th01_00.addEventHandler("onclick",this.txt_th_onclick,this);
        };
        this.loadIncludeScript("Form_stat_main.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
