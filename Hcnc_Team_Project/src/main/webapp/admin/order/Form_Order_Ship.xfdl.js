(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_Order_Ship");
            this.set_titletext("결제 내역");
            this.set_background("#F4F7FE");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_ship", this);
            obj._setContents("<ColumnInfo><Column id=\"CHK\" type=\"STRING\" size=\"1\" default=\"0\"/><Column id=\"SHIPMENT_ID\" type=\"STRING\" size=\"256\"/><Column id=\"ORDER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"COUIER_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"TRACKING_NUMBER\" type=\"STRING\" size=\"256\"/><Column id=\"SHIPMENT_STATUS\" type=\"STRING\" size=\"256\"/><Column id=\"SHIPPED_DT\" type=\"STRING\" size=\"256\"/><Column id=\"DELIVERD_DT\" type=\"STRING\" size=\"256\"/><Column id=\"UPDATE_DT\" type=\"STRING\" size=\"256\"/><Column id=\"USER_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"PHONE_NUMBER\" type=\"STRING\" size=\"256\"/><Column id=\"ADDRESS\" type=\"STRING\" size=\"256\"/><Column id=\"PRODUCT_SHORT\" type=\"STRING\" size=\"256\"/><Column id=\"PRODUCT_SUMMARY\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_status", this);
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"10\"/><Column id=\"NAME\" type=\"STRING\" size=\"50\"/></ColumnInfo><Rows><Row><Col id=\"CODE\">WAIT</Col><Col id=\"NAME\">발송대기</Col></Row><Row><Col id=\"CODE\">DONE</Col><Col id=\"NAME\">발송완료</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_selected", this);
            obj._setContents("<ColumnInfo><Column id=\"SHIPMENT_ID\" type=\"STRING\" size=\"256\"/><Column id=\"ORDER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"COUIER_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"TRACKING_NUMBER\" type=\"STRING\" size=\"256\"/><Column id=\"SHIPMENT_STATUS\" type=\"STRING\" size=\"256\"/><Column id=\"SHIPPED_DT\" type=\"STRING\" size=\"256\"/><Column id=\"DELIVERD_DT\" type=\"STRING\" size=\"256\"/><Column id=\"UPDATE_DT\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_orderStat", this);
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"256\"/><Column id=\"NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"CODE\">전체</Col><Col id=\"NAME\">전체</Col></Row><Row><Col id=\"CODE\">발송대기</Col><Col id=\"NAME\">발송대기</Col></Row><Row><Col id=\"CODE\">발송완료</Col><Col id=\"NAME\">발송완료</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_search", this);
            obj._setContents("<ColumnInfo><Column id=\"START_DATE\" type=\"STRING\" size=\"256\"/><Column id=\"END_DATE\" type=\"STRING\" size=\"256\"/><Column id=\"USER_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"SHIPMENT_STATUS\" type=\"STRING\" size=\"256\"/><Column id=\"PHONE_NUMBER\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Div("search_area","40","0",null,"190","40",null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_background("#ffffff");
            obj.set_borderRadius("10px");
            obj.set_text("");
            this.addChild(obj.name, obj);

            obj = new Static("stc_name","32","50","80","36",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("2");
            obj.set_text("주문자");
            obj.set_font("normal 11pt/normal \"Noto Sans KR Medium\"");
            this.search_area.addChild(obj.name, obj);

            obj = new Edit("Edit00","128","54","125","30",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("3");
            obj.set_borderRadius("5px");
            this.search_area.addChild(obj.name, obj);

            obj = new Button("Button00","235","54","30","30",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("4");
            obj.set_text("⌕");
            obj.set_background("#135dae");
            obj.set_borderRadius("5px");
            obj.set_color("white");
            this.search_area.addChild(obj.name, obj);

            obj = new Static("stc_ship","30","8","80","36",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("0");
            obj.set_text("배송 상태");
            obj.set_font("normal 11pt/normal \"Noto Sans KR Medium\"");
            this.search_area.addChild(obj.name, obj);

            obj = new Radio("rad_ship","130","4","357","45",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("1");
            obj.set_innerdataset("ds_orderStat");
            obj.set_codecolumn("CODE");
            obj.set_datacolumn("NAME");
            obj.set_direction("vertical");
            obj.set_font("normal 9pt/normal \"Noto Sans KR\"");
            obj.set_text("전체");
            obj.set_value("전체");
            obj.set_index("0");
            this.search_area.addChild(obj.name, obj);

            obj = new Static("stc_name00","32","96","80","36",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("5");
            obj.set_text("연락처");
            obj.set_font("normal 11pt/normal \"Noto Sans KR Medium\"");
            this.search_area.addChild(obj.name, obj);

            obj = new Edit("Edit00_00","128","100","262","30",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("7");
            obj.set_borderRadius("5px");
            this.search_area.addChild(obj.name, obj);

            obj = new Button("Button00_00","375","100","30","30",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("6");
            obj.set_text("⌕");
            obj.set_background("#135dae");
            obj.set_borderRadius("5px");
            obj.set_color("white");
            this.search_area.addChild(obj.name, obj);

            obj = new Grid("grid_list","40","255",null,null,"40","40",null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_binddataset("ds_ship");
            obj.set_autofittype("col");
            obj.set_background("#FFFFFF");
            obj.set_border("0px none");
            obj.set_borderRadius("10px");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"26\"/><Column size=\"47\"/><Column size=\"52\"/><Column size=\"113\"/><Column size=\"75\"/><Column size=\"125\"/><Column size=\"60\"/><Column size=\"53\"/><Column size=\"78\"/></Columns><Rows><Row size=\"40\" band=\"head\"/><Row size=\"34\"/></Rows><Band id=\"head\"><Cell text=\"chk\" displaytype=\"checkboxcontrol\" edittype=\"checkbox\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\"/><Cell col=\"1\" text=\"주문번호\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\"/><Cell col=\"2\" text=\"주문자\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\"/><Cell col=\"3\" text=\"주문 상품\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\"/><Cell col=\"4\" text=\"연락처\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\"/><Cell col=\"5\" text=\"주소\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\"/><Cell col=\"6\" text=\"택배사\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\"/><Cell col=\"7\" text=\"배송 상태\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\"/><Cell col=\"8\" text=\"송장 번호\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\"/></Band><Band id=\"body\"><Cell text=\"bind:CHK\" displaytype=\"checkboxcontrol\" edittype=\"checkbox\" checkboxtruevalue=\"1\" checkboxfalsevalue=\"0\" textAlign=\"center\" border=\"0px none,0px none,0.5px solid #eeeeee\" font=\"normal 10pt/normal &quot;Noto Sans KR DemiLight&quot;\"/><Cell col=\"1\" text=\"bind:ORDER_ID\" textAlign=\"center\" border=\"0px none,0px none,0.5px solid #eeeeee\" font=\"normal 10pt/normal &quot;Noto Sans KR DemiLight&quot;\"/><Cell col=\"2\" text=\"bind:USER_NAME\" textAlign=\"center\" border=\"0px none,0px none,0.5px solid #eeeeee\" font=\"normal 10pt/normal &quot;Noto Sans KR DemiLight&quot;\" edittype=\"none\"/><Cell col=\"3\" text=\"bind:PRODUCT_SHORT\" textAlign=\"center\" border=\"0px none,0px none,0.5px solid #eeeeee\" font=\"normal 10pt/normal &quot;Noto Sans KR DemiLight&quot;\" edittype=\"none\" cursor=\"pointer\"/><Cell col=\"4\" text=\"bind:PHONE_NUMBER\" textAlign=\"center\" border=\"0px none,0px none,0.5px solid #eeeeee\" font=\"normal 10pt/normal &quot;Noto Sans KR DemiLight&quot;\" edittype=\"none\"/><Cell col=\"5\" text=\"bind:ADDRESS\" textAlign=\"center\" border=\"0px none,0px none,0.5px solid #eeeeee\" font=\"normal 10pt/normal &quot;Noto Sans KR DemiLight&quot;\" edittype=\"none\"/><Cell col=\"6\" text=\"bind:COUIER_NAME\" textAlign=\"center\" border=\"0px none,0px none,0.5px solid #eeeeee\" font=\"normal 10pt/normal &quot;Noto Sans KR DemiLight&quot;\" edittype=\"text\"/><Cell col=\"7\" text=\"bind:SHIPMENT_STATUS\" displaytype=\"combocontrol\" edittype=\"combo\" combodataset=\"ds_status\" combocodecol=\"NAME\" combodatacol=\"NAME\" textAlign=\"center\" border=\"0px none,0px none,0.5px solid #eeeeee\" font=\"normal 10pt/normal &quot;Noto Sans KR DemiLight&quot;\"/><Cell col=\"8\" text=\"bind:TRACKING_NUMBER\" textAlign=\"center\" border=\"0px none,0px none,0.5px solid #eeeeee\" font=\"normal 10pt/normal &quot;Noto Sans KR DemiLight&quot;\" edittype=\"text\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Button("btn_save","1140","208","100","30",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("저장");
            obj.set_borderRadius("5px");
            obj.set_background("#135dae");
            obj.set_color("white");
            obj.set_font("normal 11pt/normal \"Noto Sans KR Medium\"");
            obj.set_textAlign("center");
            obj.set_cursor("pointer");
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
        this.registerScript("Form_Order_Ship.xfdl", function() {
        this.Form_Order_Ship_onload = function(obj,e)
        {
        	this.grid_list.setCellProperty("head", 0, "text", "0");
            this.fnSearchShip();

        };

        // 배송 조회
        this.fnSearchShip = function() {
            var strSvcID       = "selectShip";
            var strURL         = "svc::selectShipListByAdmin.do";
            var strInDatasets  = "ds_search=ds_search";
            var strOutDatasets = "ds_ship=ds_ship";
            var strArg         = "";
            var strCallback    = "fnCallback";

            this.transaction(strSvcID, strURL, strInDatasets, strOutDatasets, strArg, strCallback);
        };

        // 서버 전송
        this.fnSaveSelectedShip = function() {
            var strSvcID       = "saveSelectedShip";
            var strURL         = "svc::updateShipListByAdmin.do";
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
                case "selectShip":
                    trace("조회 완료");

                    break;
                case "saveSelectedShip":
                    this.alert("저장 완료");
                    this.fnSearchShip();
                    break;
            }
        };

        // 저장 버튼 클릭시
        this.search_area_btn_save_onclick = function(obj,e)
        {
        	this.ds_selected.clearData();

            for (var i = 0; i < this.ds_ship.getRowCount(); i++) {
                if (this.ds_ship.getColumn(i, "CHK") == "1") {
                    var nRow = this.ds_selected.addRow();
                    this.ds_selected.copyRow(nRow, this.ds_ship, i);
                }
            }

            if (this.ds_selected.getRowCount() == 0) {
                this.alert("선택된 항목이 없습니다.");
                return;
            }

            this.fnSaveSelectedShip();
        };

        //체크박스 전체 선택+ 전체 해제
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
                for (var i = 0; i < this.ds_ship.getRowCount(); i++) {
                    this.ds_ship.setColumn(i, "CHK", newVal);
                }
            }
        };


        // 라디오박스 선택시
        this.search_area_rad_ship_onitemchanged = function(obj,e)
        {
        	   // ds_search에 반영
            this.ds_search.setColumn(0, "SHIPMENT_STATUS", e.postvalue);
            this.fnSearchShip();
        };

        this.ds_ship_oncolumnchanged = function(obj,e)
        {
        	 if (e.columnid == "CHK") {
                var orderId = obj.getColumn(e.row, "ORDER_ID");

                if (e.newvalue == "1") {
                    // 추가
                    var findRow = this.ds_selected.findRow("ORDER_ID", orderId);
                    if (findRow < 0) {
                        var nRow = this.ds_selected.addRow();
                        this.ds_selected.copyRow(nRow, obj, e.row);
                    }
                } else {
                    // 해제 시 삭제
                    var delRow = this.ds_selected.findRow("ORDER_ID", orderId);
                    if (delRow >= 0) {
                        this.ds_selected.deleteRow(delRow);
                    }
                }
            }
        };

        this.search_area_Button00_onclick = function(obj,e)
        {
        	this.fnSearchShip();
        };


        // 엔터 눌렀을때 검색 되도록
        this.search_area_Edit00_onkeyup = function(obj,e)
        {
        	 if (e.keycode == 13) {  // 13 = Enter 키
                // 조회 버튼 클릭 이벤트와 동일 동작 실행
                this.fnSearchShip();
            }
        };


        // 그리드 셀클릭이벤트
        this.grid_list_oncellclick = function(obj,e)
        {
        	var row = e.row;      // 클릭한 행 번호
            var col = e.col;      // 클릭한 컬럼 번호
            var colId = obj.getCellProperty("body", col, "text");

            // 특정 컬럼만 동작시키고 싶다면 조건문
            if (colId.indexOf("PRODUCT_SHORT") > -1) {
                var orderId = this.ds_ship.getColumn(row, "ORDER_ID");
                var popupArgs = { ORDER_ID: orderId }

        		var rect = obj.getCellRect(row, col); // 셀의 상대좌표
                var gridX = obj.getOffsetLeft();
                var gridY = obj.getOffsetTop();
                var absX = gridX + rect.left + rect.width;  // 셀 오른쪽 옆
                var absY = gridY + rect.top;                // 같은 높이



                var objChildFrame = new ChildFrame(); // 하나의 새 폼 만들고
        		objChildFrame.init("itemPop", absX, absY, 400, 300, null, null, "popup::Pop_ProductDetail.xfdl"); // init
        		objChildFrame.showModal(this.getOwnerFrame(), popupArgs, this, "fn_popupCallback"); // 모달 띄어주기
            }
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_Order_Ship_onload,this);
            this.search_area.form.stc_name.addEventHandler("onclick",this.search_area_txt_th_onclick,this);
            this.search_area.form.Edit00.addEventHandler("onkeyup",this.search_area_Edit00_onkeyup,this);
            this.search_area.form.Button00.addEventHandler("onclick",this.search_area_Button00_onclick,this);
            this.search_area.form.stc_ship.addEventHandler("onclick",this.search_area_txt_th_onclick,this);
            this.search_area.form.rad_ship.addEventHandler("onitemchanged",this.search_area_rad_ship_onitemchanged,this);
            this.search_area.form.stc_name00.addEventHandler("onclick",this.search_area_txt_th_onclick,this);
            this.search_area.form.Edit00_00.addEventHandler("onkeyup",this.search_area_Edit00_onkeyup,this);
            this.search_area.form.Button00_00.addEventHandler("onclick",this.search_area_Button00_onclick,this);
            this.grid_list.addEventHandler("onheadclick",this.grid_list_onheadclick,this);
            this.grid_list.addEventHandler("oncellclick",this.grid_list_oncellclick,this);
            this.btn_save.addEventHandler("onclick",this.search_area_btn_save_onclick,this);
            this.ds_ship.addEventHandler("oncolumnchanged",this.ds_ship_oncolumnchanged,this);
        };
        this.loadIncludeScript("Form_Order_Ship.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
