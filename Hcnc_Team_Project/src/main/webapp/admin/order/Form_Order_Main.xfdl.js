(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_Order_Main");
            this.set_titletext("New Form");
            this.set_background("#F4F7FE");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_order", this);
            obj._setContents("<ColumnInfo><Column id=\"ORDER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"ORDER_NUMBER\" type=\"STRING\" size=\"256\"/><Column id=\"USER_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"TOTAL_AMOUNT\" type=\"STRING\" size=\"256\"/><Column id=\"DISCOUNT_AMOUNT\" type=\"STRING\" size=\"256\"/><Column id=\"FINAL_AMOUNT\" type=\"STRING\" size=\"256\"/><Column id=\"PAYMENT_STATUS\" type=\"STRING\" size=\"256\"/><Column id=\"SHIPMENT_STATUS\" type=\"STRING\" size=\"256\"/><Column id=\"COUPON_TYPE\" type=\"STRING\" size=\"256\"/><Column id=\"PROMOTION_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"POINT\" type=\"STRING\" size=\"256\"/><Column id=\"ORDER_DT\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_search", this);
            obj._setContents("<ColumnInfo><Column id=\"START_DATE\" type=\"STRING\" size=\"256\"/><Column id=\"END_DATE\" type=\"STRING\" size=\"256\"/><Column id=\"USER_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"SHIPMENT_STATUS\" type=\"STRING\" size=\"256\"/><Column id=\"PAYMENT_STATUS\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_payStat", this);
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"256\"/><Column id=\"NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"CODE\">전체</Col><Col id=\"NAME\">전체</Col></Row><Row><Col id=\"CODE\">입금대기</Col><Col id=\"NAME\">입금대기</Col></Row><Row><Col id=\"CODE\">결제완료</Col><Col id=\"NAME\">결제완료</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_orderStat", this);
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"256\"/><Column id=\"NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"CODE\">전체</Col><Col id=\"NAME\">전체</Col></Row><Row><Col id=\"CODE\">발송대기</Col><Col id=\"NAME\">발송대기</Col></Row><Row><Col id=\"CODE\">발송완료</Col><Col id=\"NAME\">발송완료</Col></Row></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Div("search_area","40","10",null,"30.69%","40",null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_background("#ffffff");
            obj.set_borderRadius("10px");
            obj.set_boxShadow("0px 0px 2px 2px rgba(229,229,229,0.15)");
            obj.set_text("");
            this.addChild(obj.name, obj);

            obj = new Static("txt_orderer","30","70","80","30",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("1");
            obj.set_text("주문자");
            obj.set_font("normal 10pt/normal \"Noto Sans KR\"");
            obj.set_verticalAlign("middle");
            obj.set_color("black");
            this.search_area.addChild(obj.name, obj);

            obj = new Edit("Edit00","120","70","25%","30",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("9");
            this.search_area.addChild(obj.name, obj);

            obj = new Static("txt_pay","54.17%","70","80","30",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("3");
            obj.set_text("결제 상태");
            obj.set_font("normal 10pt/normal \"Noto Sans KR\"");
            obj.set_verticalAlign("middle");
            obj.set_color("black");
            this.search_area.addChild(obj.name, obj);

            obj = new Radio("rad_pay","62.5%","70","450","30",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("8");
            obj.set_innerdataset("ds_payStat");
            obj.set_codecolumn("CODE");
            obj.set_datacolumn("NAME");
            obj.set_direction("vertical");
            obj.set_font("normal 9pt/normal \"Noto Sans KR\"");
            obj.set_color("black");
            obj.set_text("전체");
            obj.set_value("전체");
            obj.set_index("0");
            this.search_area.addChild(obj.name, obj);

            obj = new Static("txt_date","30","112","80","30",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("4");
            obj.set_text("주문 날짜");
            obj.set_font("normal 10pt/normal \"Noto Sans KR\"");
            obj.set_verticalAlign("middle");
            obj.set_color("black");
            this.search_area.addChild(obj.name, obj);

            obj = new Calendar("Calendar00_01","120","112","10.75%","30",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("7");
            this.search_area.addChild(obj.name, obj);

            obj = new Static("txt_dash","270","112","1.67%","30",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("5");
            obj.set_text("-");
            obj.set_font("normal 11pt/normal \"Noto Sans KR\"");
            obj.set_textAlign("center");
            obj.set_verticalAlign("middle");
            this.search_area.addChild(obj.name, obj);

            obj = new Calendar("Calendar00_00_00","310","112","10.75%","30",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("6");
            this.search_area.addChild(obj.name, obj);

            obj = new Static("txt_ship","54.17%","112","80","30",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("2");
            obj.set_text("배송 상태");
            obj.set_font("normal 10pt/normal \"Noto Sans KR\"");
            obj.set_verticalAlign("middle");
            obj.set_color("black");
            this.search_area.addChild(obj.name, obj);

            obj = new Radio("rad_ship","62.50%","112","450","30",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("11");
            obj.set_innerdataset("ds_orderStat");
            obj.set_codecolumn("CODE");
            obj.set_datacolumn("NAME");
            obj.set_direction("vertical");
            obj.set_font("normal 9pt/normal \"Noto Sans KR\"");
            obj.set_color("black");
            obj.set_text("전체");
            obj.set_value("전체");
            obj.set_index("0");
            this.search_area.addChild(obj.name, obj);

            obj = new Button("btn_select","41.17%","79.09%","8.25%","13.64%",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("0");
            obj.set_text("조회");
            obj.set_borderRadius("5px");
            obj.set_background("#135dae");
            obj.set_color("white");
            obj.set_font("normal 11pt/normal \"Noto Sans KR Medium\"");
            obj.set_textAlign("center");
            obj.set_cursor("pointer");
            this.search_area.addChild(obj.name, obj);

            obj = new Button("btn_reset","51.67%","79.09%","8.25%","13.64%",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("10");
            obj.set_text("초기화");
            obj.set_borderRadius("5px");
            obj.set_background("#8e8e8e");
            obj.set_color("white");
            obj.set_font("normal 11pt/normal \"Noto Sans KR Medium\"");
            obj.set_textAlign("center");
            obj.set_cursor("pointer");
            this.search_area.addChild(obj.name, obj);

            obj = new Static("txt_cnt","9.58%","8.79%","25.00%","11.30%",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("12");
            obj.set_font("normal 10pt/normal \"Noto Sans KR\"");
            obj.set_verticalAlign("middle");
            this.search_area.addChild(obj.name, obj);

            obj = new Static("txt_th","30","13","200","40",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("13");
            obj.set_text("주문 내역");
            obj.set_font("normal 13pt/normal \"Noto Sans KR Black\"");
            obj.set_color("black");
            this.search_area.addChild(obj.name, obj);

            obj = new Div("grid_wrapper","40",null,null,"56.94%","40","40",null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_background("#FFFFFF");
            obj.set_borderRadius("10px");
            obj.set_boxShadow("0px 0px 2px 2px rgba(229,229,229,0.15)");
            this.addChild(obj.name, obj);

            obj = new Grid("grid_list","0","0",null,null,"0","0",null,null,null,null,this.grid_wrapper.form);
            obj.set_taborder("0");
            obj.set_background("#FFFFFF");
            obj.set_border("0px none");
            obj.set_borderRadius("10px");
            obj.set_autofittype("col");
            obj.set_binddataset("ds_order");
            obj.set_cellcomboscrollbarsize("4");
            obj.set_celltextareascrollbarsize("4");
            obj.set_scrollbarsize("10");
            obj.set_scrollbartrackbarsize("40");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"107\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row size=\"44\" band=\"head\"/><Row size=\"33\"/></Rows><Band id=\"head\"><Cell text=\"주문번호\" background=\"white\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" border=\"0px,0px,1px solid #eeeeee\" color=\"black\"/><Cell col=\"1\" text=\"주문자\" background=\"white\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" border=\"0px,0px,1px solid #eeeeee\" color=\"black\"/><Cell col=\"2\" text=\"총금액\" background=\"white\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" border=\"0px,0px,1px solid #eeeeee\" color=\"black\"/><Cell col=\"3\" text=\"할인금액\" background=\"white\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" border=\"0px,0px,1px solid #eeeeee\" color=\"black\"/><Cell col=\"4\" text=\"최종금액\" background=\"white\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" border=\"0px,0px,1px solid #eeeeee\" color=\"black\"/><Cell col=\"5\" text=\"결제상태\" background=\"white\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" border=\"0px,0px,1px solid #eeeeee\" color=\"black\"/><Cell col=\"6\" text=\"배송상태\" background=\"white\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" border=\"0px,0px,1px solid #eeeeee\" color=\"black\"/><Cell col=\"7\" text=\"쿠폰\" background=\"white\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" border=\"0px,0px,1px solid #eeeeee\" color=\"black\"/><Cell col=\"8\" text=\"할인금액\" background=\"white\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" border=\"0px,0px,1px solid #eeeeee\" color=\"black\"/><Cell col=\"9\" text=\"주문일\" background=\"white\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" border=\"0px,0px,1px solid #eeeeee\" color=\"black\"/></Band><Band id=\"body\"><Cell text=\"bind:ORDER_NUMBER\" textAlign=\"center\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR Medium&quot;\" color=\"black\"/><Cell col=\"1\" text=\"bind:USER_NAME\" textAlign=\"center\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR Light&quot;\" color=\"black\"/><Cell col=\"2\" text=\"bind:TOTAL_AMOUNT\" textAlign=\"right\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR Light&quot;\" color=\"black\"/><Cell col=\"3\" text=\"bind:DISCOUNT_AMOUNT\" textAlign=\"right\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR Light&quot;\" color=\"black\"/><Cell col=\"4\" text=\"bind:FINAL_AMOUNT\" textAlign=\"right\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR Light&quot;\" color=\"black\"/><Cell col=\"5\" text=\"bind:PAYMENT_STATUS\" textAlign=\"center\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR Light&quot;\" color=\"black\"/><Cell col=\"6\" text=\"bind:SHIPMENT_STATUS\" textAlign=\"center\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR Light&quot;\" color=\"black\"/><Cell col=\"7\" text=\"bind:COUPON_TYPE\" textAlign=\"center\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR Light&quot;\" color=\"black\"/><Cell col=\"8\" text=\"bind:POINT\" textAlign=\"center\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR Light&quot;\" color=\"black\"/><Cell col=\"9\" text=\"bind:ORDER_DT\" textAlign=\"center\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR Light&quot;\" color=\"black\"/></Band></Format></Formats>");
            this.grid_wrapper.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1280,720,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item0","grid_list","binddataset","ds_user","");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item1","search_area.form.Edit00","value","ds_search","USER_NAME");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item2","search_area.form.Calendar00_01","value","ds_search","START_DATE");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item3","search_area.form.Calendar00_00_00","value","ds_search","END_DATE");
            this.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Form_Order_Main.xfdl", function() {
        // 온로드시
        this.Form_Order_Main_onload = function(obj, e)
        {
            // 초기 조회
            this.fnSearchOrders();
            this.search_area.set_height(220);
        };

        // 주문 내역 조회
        this.fnSearchOrders = function() {
            var strSvcID       = "selectOrders";
            var strURL         = "svc::selectOrderDetailListByAdmin.do?time=" + new Date().getTime();  // Spring Controller 매핑
            var strInDatasets  = "ds_search=ds_search";                   // 검색조건 dataset 전달
            var strOutDatasets = "ds_order=ds_order";
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
                case "selectOrders"  :
                    trace("주문 목록 조회 완료, 건수=" + this.ds_order.rowcount);
        			var cnt = this.ds_order.rowcount;
        			this.search_area.form.txt_cnt.set_text("총 "+ cnt + "개");
                    break;
            }
        };






        // 조회 버튼 (조건 적용 후 조회 실행)
        this.search_area_btn_select_onclick = function(obj, e)
        {
            this.fnSearchOrders(); // 조회 트랜젝션
        };


        // 초기화 버튼
        this.search_area_btn_reset_onclick = function(obj, e)
        {
        	this.reload();   // 폼 전체 리로드
        };



        // 배송 상태 라디오 onitemchanged
        this.search_area_rad_ship_onitemchanged = function(obj, e)
        {
            this.ds_search.setColumn(0, "SHIPMENT_STATUS", e.postvalue);  // 라디오박스값을 ds_search에 넣음
            this.fnSearchOrders();  // 조회 트랜젝션
        };

        // 결제 상태 라디오 onitemchanged (추가)
        this.search_area_rad_pay_onitemchanged = function(obj, e)
        {
            this.ds_search.setColumn(0, "PAYMENT_STATUS", e.postvalue); // 라디오박스값을 ds_search에 넣음
            this.fnSearchOrders(); // 조회 트랜젝션
        };

        //엔터키 눌렀을시
        this.search_area_Edit00_onkeyup = function(obj, e)
        {
            if (e.keycode == 13) {  // 13 = Enter 키
                this.fnSearchOrders(); // 조회 트랜젝션
            }
        };

        // 시작일 변경 이벤트
        this.search_area_Calendar00_01_onchanged = function(obj, e)
        {
            var startDate = this.search_area.form.Calendar00_01.value;
            var endDate   = this.search_area.form.Calendar00_00_00.value;

            if (!startDate) return; // 시작일 없으면 처리 중단

            // 종료일이 있고, 종료일이 시작일보다 빠른 경우
            if (endDate && endDate < startDate) {
                this.alert("종료일은 시작일보다 빠를 수 없습니다.");
                this.search_area.form.Calendar00_00_00.set_value(startDate);
                endDate = startDate;
            }

            // 시작일은 00시 00분
            this.ds_search.setColumn(0, "START_DATE", startDate + "000000");

            // 종료일이 있으면 23시 59분까지 설정
            if (endDate) {
                this.ds_search.setColumn(0, "END_DATE", endDate + "235959");
            }
        };

        // 종료일 변경 이벤트
        this.search_area_Calendar00_00_00_onchanged = function(obj, e)
        {
            var startDate = this.search_area.form.Calendar00_01.value;
            var endDate   = this.search_area.form.Calendar00_00_00.value;

            if (!endDate) return; // 종료일 없으면 처리 중단

            if (startDate && endDate < startDate) {
                this.alert("종료일은 시작일보다 빠를 수 없습니다.");
                this.search_area.form.Calendar00_00_00.set_value(startDate);
                endDate = startDate;
            }

            // 종료일은 23시 59분
            this.ds_search.setColumn(0, "END_DATE", endDate + "235959");

            // 시작일이 있으면 00시 00분까지 세팅
            if (startDate) {
                this.ds_search.setColumn(0, "START_DATE", startDate + "000000");
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
            obj.set_boxShadow("0px 0px 3px 3px rgba(200,200,200,0.30)");
        };

        this.grid_wrapper_onmouseleave = function(obj, e)
        {
            obj.set_boxShadow("0px 0px 2px 2px rgba(229,229,229,0.15)");
        };
        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_Order_Main_onload,this);
            this.search_area.addEventHandler("onmousemove",this.search_area_onmousemove,this);
            this.search_area.addEventHandler("onmouseleave",this.search_area_onmouseleave,this);
            this.search_area.form.Edit00.addEventHandler("onkeyup",this.search_area_Edit00_onkeyup,this);
            this.search_area.form.rad_pay.addEventHandler("onitemchanged",this.search_area_rad_pay_onitemchanged,this);
            this.search_area.form.Calendar00_01.addEventHandler("onchanged",this.search_area_Calendar00_01_onchanged,this);
            this.search_area.form.Calendar00_00_00.addEventHandler("onchanged",this.search_area_Calendar00_00_00_onchanged,this);
            this.search_area.form.rad_ship.addEventHandler("onitemchanged",this.search_area_rad_ship_onitemchanged,this);
            this.search_area.form.btn_select.addEventHandler("onclick",this.search_area_btn_select_onclick,this);
            this.search_area.form.btn_reset.addEventHandler("onclick",this.search_area_btn_reset_onclick,this);
            this.grid_wrapper.addEventHandler("onmousemove",this.grid_wrapper_onmousemove,this);
            this.grid_wrapper.addEventHandler("onmouseleave",this.grid_wrapper_onmouseleave,this);
        };
        this.loadIncludeScript("Form_Order_Main.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
