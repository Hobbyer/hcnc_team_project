(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_Order_Pay");
            this.set_titletext("결제 내역");
            this.set_background("#F4F7FE");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_pay", this);
            obj._setContents("<ColumnInfo><Column id=\"CHK\" type=\"STRING\" size=\"1\" default=\"0\"/><Column id=\"PAYMENT_ID\" type=\"STRING\" size=\"256\"/><Column id=\"ORDER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"PAYMENT_METHOD\" type=\"STRING\" size=\"256\"/><Column id=\"PAYMENT_AMOUNT\" type=\"STRING\" size=\"256\"/><Column id=\"PAYMENT_STATUS\" type=\"STRING\" size=\"256\"/><Column id=\"PAYMENT_DT\" type=\"STRING\" size=\"256\"/><Column id=\"USER_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"PHONE_NUMBER\" type=\"STRING\" size=\"256\"/><Column id=\"MEMBER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"ORDER_NUMBER\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_selected", this);
            obj._setContents("<ColumnInfo><Column id=\"PAYMENT_ID\" type=\"STRING\" size=\"256\"/><Column id=\"ORDER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"PAYMENT_METHOD\" type=\"STRING\" size=\"256\"/><Column id=\"PAYMENT_AMOUNT\" type=\"STRING\" size=\"256\"/><Column id=\"PAYMENT_STATUS\" type=\"STRING\" size=\"256\"/><Column id=\"PAYMENT_DT\" type=\"STRING\" size=\"256\"/><Column id=\"USER_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"PHONE_NUMBER\" type=\"STRING\" size=\"256\"/><Column id=\"MEMBER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"ORDER_NUMBER\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_status", this);
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"10\"/><Column id=\"NAME\" type=\"STRING\" size=\"50\"/></ColumnInfo><Rows><Row><Col id=\"CODE\">WAIT</Col><Col id=\"NAME\">입금대기</Col></Row><Row><Col id=\"CODE\">DONE</Col><Col id=\"NAME\">결제완료</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_statRad", this);
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"10\"/><Column id=\"NAME\" type=\"STRING\" size=\"50\"/></ColumnInfo><Rows><Row><Col id=\"CODE\">ALL</Col><Col id=\"NAME\">전체</Col></Row><Row><Col id=\"CODE\">WAIT</Col><Col id=\"NAME\">입금대기</Col></Row><Row><Col id=\"CODE\">DONE</Col><Col id=\"NAME\">결제완료</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_search", this);
            obj._setContents("<ColumnInfo><Column id=\"START_DATE\" type=\"STRING\" size=\"256\"/><Column id=\"END_DATE\" type=\"STRING\" size=\"256\"/><Column id=\"USER_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"PAYMENT_STATUS\" type=\"STRING\" size=\"256\"/><Column id=\"PHONE_NUMBER\" type=\"STRING\" size=\"256\"/><Column id=\"PAYMENT_METHOD\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_payMethod", this);
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"10\"/><Column id=\"NAME\" type=\"STRING\" size=\"50\"/></ColumnInfo><Rows><Row><Col id=\"CODE\">ALL</Col><Col id=\"NAME\">전체</Col></Row><Row><Col id=\"CODE\">WAIT</Col><Col id=\"NAME\">카드</Col></Row><Row><Col id=\"CODE\">DONE</Col><Col id=\"NAME\">계좌</Col></Row></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Div("search_area","40","10",null,"60","40",null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_background("#ffffff");
            obj.set_borderRadius("10px");
            obj.set_boxShadow("0px 0px 2px 2px rgba(229,229,229,0.15)");
            this.addChild(obj.name, obj);

            obj = new Static("stc_ship","30","9","80","36",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("0");
            obj.set_text("주문 상태");
            obj.set_font("normal 11pt/normal \"Noto Sans KR Medium\"");
            this.search_area.addChild(obj.name, obj);

            obj = new Radio("rad_pay","102","6","207","45",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("1");
            obj.set_innerdataset("ds_statRad");
            obj.set_codecolumn("NAME");
            obj.set_datacolumn("NAME");
            obj.set_direction("vertical");
            obj.set_font("normal 9pt/normal \"Noto Sans KR\"");
            obj.set_text("전체");
            obj.set_value("전체");
            obj.set_index("0");
            this.search_area.addChild(obj.name, obj);

            obj = new Edit("Edit00",null,"13","85","30","37.83%",null,null,null,null,null,this.search_area.form);
            obj.set_taborder("2");
            obj.set_borderRadius("5px");
            this.search_area.addChild(obj.name, obj);

            obj = new Static("stc_name",null,"9","40","36","45.83%",null,null,null,null,null,this.search_area.form);
            obj.set_taborder("3");
            obj.set_text("주문자");
            obj.set_font("normal 11pt/normal \"Noto Sans KR Medium\"");
            this.search_area.addChild(obj.name, obj);

            obj = new Static("stc_name00",null,"9","40","36","30.42%",null,null,null,null,null,this.search_area.form);
            obj.set_taborder("4");
            obj.set_text("연락처");
            obj.set_font("normal 11pt/normal \"Noto Sans KR Medium\"");
            this.search_area.addChild(obj.name, obj);

            obj = new Edit("Edit00_00",null,"13","90","30","21.92%",null,null,null,null,null,this.search_area.form);
            obj.set_taborder("5");
            obj.set_borderRadius("5px");
            this.search_area.addChild(obj.name, obj);

            obj = new Static("stc_ship00","344","8","80","36",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("6");
            obj.set_text("결제 방법");
            obj.set_font("normal 11pt/normal \"Noto Sans KR Medium\"");
            this.search_area.addChild(obj.name, obj);

            obj = new Radio("rad_payMeth","424","5","167","45",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("7");
            obj.set_innerdataset("ds_payMethod");
            obj.set_codecolumn("NAME");
            obj.set_datacolumn("NAME");
            obj.set_direction("vertical");
            obj.set_font("normal 9pt/normal \"Noto Sans KR\"");
            obj.set_text("전체");
            obj.set_value("전체");
            obj.set_index("0");
            this.search_area.addChild(obj.name, obj);

            obj = new Button("btn_save",null,"13","100","30","24",null,null,null,null,null,this.search_area.form);
            obj.set_taborder("8");
            obj.set_text("저장");
            obj.set_borderRadius("5px");
            obj.set_background("#135dae");
            obj.set_color("white");
            obj.set_font("normal 11pt/normal \"Noto Sans KR Medium\"");
            obj.set_textAlign("center");
            obj.set_cursor("pointer");
            this.search_area.addChild(obj.name, obj);

            obj = new Div("grid_wrapper","40","121",null,null,"40","40",null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_background("#FFFFFF");
            obj.set_borderRadius("10px");
            obj.set_boxShadow("0px 0px 2px 2px rgba(229,229,229,0.15)");
            this.addChild(obj.name, obj);

            obj = new Grid("grid_list","0","0",null,null,"0","0",null,null,null,null,this.grid_wrapper.form);
            obj.set_taborder("0");
            obj.set_binddataset("ds_pay");
            obj.set_autofittype("col");
            obj.set_background("#FFFFFF");
            obj.set_border("0px none");
            obj.set_borderRadius("10px");
            obj.set_scrollbarsize("10");
            obj.set_scrollbartrackbarsize("40");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"40\"/><Column size=\"90\"/><Column size=\"90\"/><Column size=\"115\"/><Column size=\"38\"/><Column size=\"115\"/><Column size=\"120\"/><Column size=\"80\"/></Columns><Rows><Row size=\"40\" band=\"head\"/><Row size=\"34\"/></Rows><Band id=\"head\"><Cell text=\"chk\" displaytype=\"checkboxcontrol\" edittype=\"checkbox\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\"/><Cell col=\"1\" text=\"주문번호\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\"/><Cell col=\"2\" text=\"주문자\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\"/><Cell col=\"3\" text=\"연락처\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\"/><Cell col=\"4\" text=\"결제수단\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\"/><Cell col=\"5\" text=\"결제금액\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\"/><Cell col=\"6\" text=\"결제상태\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\"/><Cell col=\"7\" text=\"결제일\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\"/></Band><Band id=\"body\"><Cell text=\"bind:CHK\" displaytype=\"checkboxcontrol\" edittype=\"checkbox\" checkboxtruevalue=\"1\" checkboxfalsevalue=\"0\" textAlign=\"center\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR DemiLight&quot;\"/><Cell col=\"1\" text=\"bind:ORDER_NUMBER\" textAlign=\"center\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR Medium&quot;\" color=\"black\"/><Cell col=\"2\" text=\"bind:USER_NAME\" textAlign=\"center\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR Light&quot;\" color=\"black\"/><Cell col=\"3\" text=\"bind:PHONE_NUMBER\" textAlign=\"right\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR Light&quot;\" color=\"black\"/><Cell col=\"4\" text=\"bind:PAYMENT_METHOD\" textAlign=\"center\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR Light&quot;\" color=\"black\"/><Cell col=\"5\" text=\"bind:PAYMENT_AMOUNT\" textAlign=\"right\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR Light&quot;\" color=\"black\"/><Cell col=\"6\" text=\"bind:PAYMENT_STATUS\" displaytype=\"combocontrol\" edittype=\"combo\" combodataset=\"ds_status\" combocodecol=\"NAME\" combodatacol=\"NAME\" textAlign=\"center\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR Medium&quot;\" cssclass=\"expr:(PAYMENT_STATUS==&apos;입금대기&apos;?&apos;cell_wait&apos;:(PAYMENT_STATUS==&apos;결제완료&apos;?&apos;cell_done&apos;:&apos;&apos;))\"/><Cell col=\"7\" text=\"bind:PAYMENT_DT\" textAlign=\"center\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR DemiLight&quot;\" color=\"black\"/></Band></Format></Formats>");
            this.grid_wrapper.addChild(obj.name, obj);

            obj = new Static("stc_ship00_00","45","12.92%","310","28",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("* 결제상태 변경후 저장을 눌러주세요");
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

            obj = new BindItem("item1","search_area.form.Edit00_00","value","ds_search","PHONE_NUMBER");
            this.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Form_Order_Pay.xfdl", function() {
        // 온로드
        this.Form_Order_Pay_onload = function(obj, e) {
            this.grid_wrapper.form.grid_list.setCellProperty("head", 0, "text", "0");

            this.fnSearchPay();
        };

        // 조회
        this.fnSearchPay = function() {
            var strSvcID       = "selectPayment";
            var strURL         = "svc::selectPaymentListByAdmin.do?time=" + new Date().getTime();
            var strInDatasets  = "ds_search=ds_search";
            var strOutDatasets = "ds_pay=ds_pay";
            var strArg         = "";
            var strCallback    = "fnCallback";

            this.transaction(strSvcID, strURL, strInDatasets, strOutDatasets, strArg, strCallback);
        };



        // 서버 전송
        this.fnSaveSelectedPay = function() {
            var strSvcID       = "saveSelectedPay";
            var strURL         = "svc::updatePaymentListByAdmin.do?time=" + new Date().getTime();
            var strInDatasets  = "ds_selected=ds_selected";
            var strOutDatasets = "";
            var strArg         = "";
            var strCallback    = "fnCallback";

            this.transaction(strSvcID, strURL, strInDatasets, strOutDatasets, strArg, strCallback);
        };

        // 공통 콜백
        this.fnCallback = function(svcID, errCode, errMsg) {
            if (errCode < 0) {
                this.alert("에러: " + errMsg);
                return;
            }

            switch(svcID) {
                case "selectPayment":
                    trace("조회 완료");
                    break;
                case "saveSelectedPay":
                    this.alert("저장 완료");
                    this.fnSearchPay();
                    break;
            }
        };

        // 저장버튼 클릭시
        this.search_area_btn_save_onclick = function(obj,e)
        {
        	this.ds_selected.clearData();

            for (var i = 0; i < this.ds_pay.getRowCount(); i++) {
                if (this.ds_pay.getColumn(i, "CHK") == "1") {
                    var nRow = this.ds_selected.addRow();
                    this.ds_selected.copyRow(nRow, this.ds_pay, i);
                }
            }

            if (this.ds_selected.getRowCount() == 0) {
                this.alert("선택된 항목이 없습니다.");
                return;
            }

            this.fnSaveSelectedPay();
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
                for (var i = 0; i < this.ds_pay.getRowCount(); i++) {
                    this.ds_pay.setColumn(i, "CHK", newVal);
                }
            }
        };

        //라디오박스
        this.search_area_rad_ship_onitemchanged = function(obj,e)
        {
        	   // ds_search에 반영
            this.ds_search.setColumn(0, "PAYMENT_STATUS", e.postvalue);
            this.fnSearchPay();
        };

        // 라디오박스2
        this.search_area_rad_payMeth_onitemchanged = function(obj,e)
        {
        	this.ds_search.setColumn(0, "PAYMENT_METHOD", e.postvalue);
            this.fnSearchPay();
        };

        this.search_area_Button00_onclick = function(obj,e)
        {
        	this.fnSearchPay();
        };

        this.search_area_Button00_00_onclick = function(obj,e)
        {
        	this.fnSearchPay();
        };



        this.search_area_Edit00_onkeyup = function(obj,e)
        {
        	if (e.keycode == 13) {  // 13 = Enter 키
                // 조회 버튼 클릭 이벤트와 동일 동작 실행
                this.fnSearchPay();
            }
        };

        this.search_area_Edit00_00_onkeyup = function(obj,e)
        {

        	if (e.keycode == 13) {  // 13 = Enter 키
                // 조회 버튼 클릭 이벤트와 동일 동작 실행
                this.fnSearchPay();
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
            this.addEventHandler("onload",this.Form_Order_Pay_onload,this);
            this.search_area.addEventHandler("onmousemove",this.search_area_onmousemove,this);
            this.search_area.addEventHandler("onmouseleave",this.search_area_onmouseleave,this);
            this.search_area.form.stc_ship.addEventHandler("onclick",this.search_area_txt_th_onclick,this);
            this.search_area.form.rad_pay.addEventHandler("onitemchanged",this.search_area_rad_ship_onitemchanged,this);
            this.search_area.form.Edit00.addEventHandler("onkeyup",this.search_area_Edit00_onkeyup,this);
            this.search_area.form.stc_name.addEventHandler("onclick",this.search_area_txt_th_onclick,this);
            this.search_area.form.stc_name00.addEventHandler("onclick",this.search_area_txt_th_onclick,this);
            this.search_area.form.Edit00_00.addEventHandler("onchanged",this.search_area_Edit00_00_onchanged,this);
            this.search_area.form.Edit00_00.addEventHandler("onkeyup",this.search_area_Edit00_00_onkeyup,this);
            this.search_area.form.stc_ship00.addEventHandler("onclick",this.search_area_txt_th_onclick,this);
            this.search_area.form.rad_payMeth.addEventHandler("onitemchanged",this.search_area_rad_payMeth_onitemchanged,this);
            this.search_area.form.btn_save.addEventHandler("onclick",this.search_area_btn_save_onclick,this);
            this.grid_wrapper.addEventHandler("onmousemove",this.grid_wrapper_onmousemove,this);
            this.grid_wrapper.addEventHandler("onmouseleave",this.grid_wrapper_onmouseleave,this);
            this.grid_wrapper.form.grid_list.addEventHandler("onheadclick",this.grid_list_onheadclick,this);
            this.stc_ship00_00.addEventHandler("onclick",this.search_area_txt_th_onclick,this);
        };
        this.loadIncludeScript("Form_Order_Pay.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
