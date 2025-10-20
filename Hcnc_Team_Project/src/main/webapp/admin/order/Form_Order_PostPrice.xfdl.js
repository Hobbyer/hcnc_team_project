(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_Order_PostPrice");
            this.set_titletext("결제 내역");
            this.set_background("#F4F7FE");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_post", this);
            obj._setContents("<ColumnInfo><Column id=\"CHK\" type=\"STRING\" size=\"1\" default=\"0\"/><Column id=\"COURIER_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"SHIP_COST\" type=\"STRING\" size=\"256\"/><Column id=\"FREE_SHIPPING_PRICE\" type=\"STRING\" size=\"256\"/><Column id=\"ADDITIONAL_TYPE\" type=\"STRING\" size=\"256\"/><Column id=\"ADDITIONAL_PRICE\" type=\"STRING\" size=\"256\"/><Column id=\"COURIER_ID\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_search", this);
            obj._setContents("<ColumnInfo><Column id=\"COURIER_NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_cate", this);
            obj._setContents("<ColumnInfo><Column id=\"COURIER_NAME\" type=\"STRING\" size=\"50\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_selected", this);
            obj._setContents("<ColumnInfo><Column id=\"COURIER_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"SHIP_COST\" type=\"STRING\" size=\"256\"/><Column id=\"FREE_SHIPPING_PRICE\" type=\"STRING\" size=\"256\"/><Column id=\"ADDITIONAL_TYPE\" type=\"STRING\" size=\"256\"/><Column id=\"ADDITIONAL_PRICE\" type=\"STRING\" size=\"256\"/><Column id=\"COURIER_ID\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
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
            obj.set_text("택배사");
            obj.set_font("normal 11pt/normal \"Noto Sans KR Medium\"");
            this.search_area.addChild(obj.name, obj);

            obj = new Combo("Combo00","7.83%","13","160","32",null,null,null,null,null,null,this.search_area.form);
            obj.set_taborder("1");
            obj.set_innerdataset("ds_cate");
            obj.set_codecolumn("COURIER_NAME");
            obj.set_datacolumn("COURIER_NAME");
            obj.set_text("");
            obj.set_value("");
            obj.set_index("0");
            this.search_area.addChild(obj.name, obj);

            obj = new Static("stc_ship00",null,"10","460","36","12%",null,null,null,null,null,this.search_area.form);
            obj.set_taborder("2");
            obj.set_text("* 택배비, 무료배송조건, 추가사유, 추가금 수정후 저장버튼을 눌러주세요 ->");
            obj.set_font("normal 9pt/normal \"Noto Sans KR Medium\"");
            obj.set_textAlign("right");
            this.search_area.addChild(obj.name, obj);

            obj = new Button("btn_save",null,"14","8.00%","30","3.00%",null,null,null,null,null,this.search_area.form);
            obj.set_taborder("3");
            obj.set_text("저장");
            obj.set_borderRadius("5px");
            obj.set_background("#135dae");
            obj.set_color("white");
            obj.set_font("normal 11pt/normal \"Noto Sans KR Medium\"");
            obj.set_textAlign("center");
            obj.set_cursor("pointer");
            this.search_area.addChild(obj.name, obj);

            obj = new Div("grid_wrapper","40","110",null,null,"40","40",null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_background("#FFFFFF");
            obj.set_borderRadius("10px");
            obj.set_boxShadow("0px 0px 2px 2px rgba(229,229,229,0.15)");
            this.addChild(obj.name, obj);

            obj = new Grid("grid_list","0","0",null,null,"0","0",null,null,null,null,this.grid_wrapper.form);
            obj.set_taborder("0");
            obj.set_binddataset("ds_post");
            obj.set_autofittype("col");
            obj.set_background("#FFFFFF");
            obj.set_border("0px none");
            obj.set_borderRadius("10px");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"40\"/><Column size=\"90\"/><Column size=\"90\"/><Column size=\"115\"/><Column size=\"53\"/><Column size=\"115\"/></Columns><Rows><Row size=\"40\" band=\"head\"/><Row size=\"34\"/></Rows><Band id=\"head\"><Cell text=\"chk\" displaytype=\"checkboxcontrol\" edittype=\"checkbox\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\"/><Cell col=\"1\" text=\"택배사\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\"/><Cell col=\"2\" text=\"택배비\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\"/><Cell col=\"3\" text=\"무료배송조건\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\"/><Cell col=\"4\" text=\"추가사유\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\"/><Cell col=\"5\" text=\"추가금\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\"/></Band><Band id=\"body\"><Cell displaytype=\"checkboxcontrol\" edittype=\"checkbox\" checkboxtruevalue=\"1\" checkboxfalsevalue=\"0\" textAlign=\"center\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR DemiLight&quot;\" text=\"bind:CHK\"/><Cell col=\"1\" text=\"bind:COURIER_NAME\" textAlign=\"center\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR DemiLight&quot;\"/><Cell col=\"2\" text=\"bind:SHIP_COST\" textAlign=\"center\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR DemiLight&quot;\" edittype=\"text\"/><Cell col=\"3\" text=\"bind:FREE_SHIPPING_PRICE\" textAlign=\"right\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR DemiLight&quot;\" edittype=\"text\"/><Cell col=\"4\" text=\"bind:ADDITIONAL_TYPE\" textAlign=\"center\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR DemiLight&quot;\" edittype=\"text\"/><Cell col=\"5\" text=\"bind:ADDITIONAL_PRICE\" textAlign=\"center\" border=\"0px,0px,2px solid rgba(229,229,229,0.15)\" font=\"normal 10pt/normal &quot;Noto Sans KR DemiLight&quot;\" edittype=\"text\"/></Band></Format></Formats>");
            this.grid_wrapper.addChild(obj.name, obj);

            obj = new Static("stc_ship00_00","46","80","173","28",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("* 더블클릭하면 수정 가능합니다");
            obj.set_font("normal 9pt/normal \"Noto Sans KR Medium\"");
            obj.set_textAlign("left");
            obj.set_color("#135dae");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1280,720,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Form_Order_PostPrice.xfdl", function() {
        // 온로드
        this.Form_Order_PostPrice_onload = function(obj,e)
        {
        	this.grid_wrapper.form.grid_list.setCellProperty("head", 0, "text", "0");
            this.fnSearchPostPrice();
        };

        // 조회
        this.fnSearchPostPrice = function() {
            var strSvcID       = "selectPostCarrierByAdmin";
            var strURL         = "svc::selectPostCarrierByAdmin.do?time=" + new Date().getTime();
            var strInDatasets  = "ds_search=ds_search";
            var strOutDatasets = "ds_post=ds_post ds_cate=ds_cate";
            var strArg         = "";
            var strCallback    = "fnCallback";

            this.transaction(strSvcID, strURL, strInDatasets, strOutDatasets, strArg, strCallback);
        };



        // 서버 전송
        this.fnSaveSelectedPostPrice = function() {
            var strSvcID       = "saveSelectedPostPrice";
            var strURL         = "svc::updatePostPriceListByAdmin.do?time=" + new Date().getTime();
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
                case "selectPostCarrierByAdmin":
                    trace("조회 완료");
                    break;

                case "saveSelectedPostPrice":
                    this.alert("저장 완료");
                    this.fnSearchPostPrice();
                    break;
            }
        };

        // 저장버튼 클릭시
        this.search_area_btn_save_onclick = function(obj,e)
        {
        	this.ds_selected.clearData();

            for (var i = 0; i < this.ds_post.getRowCount(); i++) {
                if (this.ds_post.getColumn(i, "CHK") == "1") {
                    var nRow = this.ds_selected.addRow();
                    this.ds_selected.copyRow(nRow, this.ds_post, i);
                }
            }

            if (this.ds_selected.getRowCount() == 0) {
                this.alert("선택된 항목이 없습니다.");
                return;
            }

            this.fnSaveSelectedPostPrice();
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
                for (var i = 0; i < this.ds_post.getRowCount(); i++) {
                    this.ds_post.setColumn(i, "CHK", newVal);
                }
            }
        };


        // 이름칸에서 엔터 눌렀을때
        this.search_area_Edit00_00_onkeyup = function(obj,e)
        {

        	if (e.keycode == 13) {  // 13 = Enter 키
                // 조회 버튼 클릭 이벤트와 동일 동작 실행
                this.fnSearchPostPrice();
            }
        };

        // 콤보박스 선택시
        this.search_area_Combo00_onitemchanged = function(obj,e)
        {
        	var post = e.postvalue;
        	this.ds_search.setColumn(0,"COURIER_NAME",post)
        	this.fnSearchPostPrice();
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
            this.addEventHandler("onload",this.Form_Order_PostPrice_onload,this);
            this.search_area.addEventHandler("onmousemove",this.search_area_onmousemove,this);
            this.search_area.addEventHandler("onmouseleave",this.search_area_onmouseleave,this);
            this.search_area.form.stc_ship.addEventHandler("onclick",this.search_area_txt_th_onclick,this);
            this.search_area.form.Combo00.addEventHandler("onitemchanged",this.search_area_Combo00_onitemchanged,this);
            this.search_area.form.stc_ship00.addEventHandler("onclick",this.search_area_txt_th_onclick,this);
            this.search_area.form.btn_save.addEventHandler("onclick",this.search_area_btn_save_onclick,this);
            this.grid_wrapper.addEventHandler("onmousemove",this.grid_wrapper_onmousemove,this);
            this.grid_wrapper.addEventHandler("onmouseleave",this.grid_wrapper_onmouseleave,this);
            this.grid_wrapper.form.grid_list.addEventHandler("onheadclick",this.grid_list_onheadclick,this);
            this.grid_wrapper.form.grid_list.addEventHandler("oncellclick",this.grid_list_oncellclick,this);
            this.stc_ship00_00.addEventHandler("onclick",this.search_area_txt_th_onclick,this);
        };
        this.loadIncludeScript("Form_Order_PostPrice.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
