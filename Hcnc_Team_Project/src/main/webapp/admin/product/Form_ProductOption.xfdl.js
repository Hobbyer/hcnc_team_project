(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_ProductOption");
            this.set_titletext("상품관리");
            this.set_background("#f4f7fe");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,800);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_searchCond", this);
            obj._setContents("<ColumnInfo><Column id=\"SEARCH_TYPE\" type=\"STRING\" size=\"256\"/><Column id=\"SEARCH_TEXT\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_out_opList", this);
            obj.set_useclientlayout("true");
            obj._setContents("<ColumnInfo><Column id=\"chk\" type=\"INT\" size=\"1\"/><Column id=\"OPTION_ID\" type=\"INT\" size=\"256\"/><Column id=\"PRODUCT_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"ADDITIONAL_PRICE\" type=\"INT\" size=\"256\"/><Column id=\"OPTION_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"OPTION_VALUE\" type=\"STRING\" size=\"256\"/><Column id=\"INPUT_DT\" type=\"DATETIME\" size=\"256\"/><Column id=\"IS_VISIBLE\" type=\"STRING\" size=\"1\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_in", this);
            obj.set_useclientlayout("true");
            obj._setContents("<ColumnInfo><Column id=\"OPTION_ID\" type=\"INT\" size=\"256\"/><Column id=\"IS_VISIBLE\" type=\"STRING\" size=\"1\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Div("Div00_00","27","35","1230","76",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("");
            obj.set_background("#ffffff");
            obj.set_borderRadius("10px 10px 10px 10px");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_search","311","21",null,"35","588",null,null,null,null,null,this.Div00_00.form);
            obj.set_taborder("0");
            obj.set_maxlength("20");
            obj.set_tooltiptext("글자수는 20자를 넘을 수 없습니다.");
            this.Div00_00.addChild(obj.name, obj);

            obj = new Grid("grid_list","27","151","1230","550",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_background("#FFFFFF");
            obj.set_border("0px none");
            obj.set_borderRadius("10px");
            obj.set_autofittype("col");
            obj.set_binddataset("ds_out_opList");
            obj.set_font("bold 10pt/normal \"맑은 고딕\"");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"78\"/><Column size=\"49\"/><Column size=\"100\"/><Column size=\"151\"/><Column size=\"151\"/><Column size=\"225\"/><Column size=\"151\"/><Column size=\"69\"/><Column size=\"223\"/></Columns><Rows><Row size=\"62\" band=\"head\"/><Row size=\"48\" band=\"head\"/><Row size=\"24\" band=\"head\"/><Row size=\"36\"/></Rows><Band id=\"head\"><Cell colspan=\"9\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell row=\"1\" rowspan=\"2\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\" displaytype=\"checkboxcontrol\" edittype=\"checkbox\" text=\"0\" verticalAlign=\"bottom\"/><Cell row=\"1\" col=\"1\" rowspan=\"2\" text=\"NO\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell row=\"1\" col=\"2\" rowspan=\"2\" text=\"옵션코드\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell row=\"1\" col=\"3\" rowspan=\"2\" text=\"옵션명\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell row=\"1\" col=\"4\" rowspan=\"2\" text=\"옵션 세부사항\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell row=\"1\" col=\"5\" rowspan=\"2\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\" text=\"관련 상품명\"/><Cell row=\"1\" col=\"6\" rowspan=\"2\" text=\"옵션가\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell row=\"1\" col=\"7\" rowspan=\"2\" text=\"진열상태\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell row=\"1\" col=\"8\" rowspan=\"2\" text=\"등록일\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/></Band><Band id=\"body\"><Cell displaytype=\"checkboxcontrol\" background=\"#ffffff\" textAlign=\"center\" edittype=\"checkbox\" text=\"bind:chk\"/><Cell col=\"1\" text=\"expr:currow + 1\" background=\"#ffffff\" font=\"12px/normal &quot;Gulim&quot;\" textAlign=\"center\" edittype=\"none\"/><Cell col=\"2\" background=\"#ffffff\" text=\"bind:OPTION_ID\" font=\"12px/normal &quot;Gulim&quot;\" textAlign=\"center\" edittype=\"none\"/><Cell col=\"3\" background=\"#ffffff\" text=\"bind:OPTION_NAME\" font=\"12px/normal &quot;Gulim&quot;\" textAlign=\"center\" edittype=\"none\"/><Cell col=\"4\" edittype=\"none\" background=\"#ffffff\" text=\"bind:OPTION_VALUE\" font=\"12px/normal &quot;Gulim&quot;\" textAlign=\"center\"/><Cell col=\"5\" edittype=\"none\" background=\"#ffffff\" text=\"bind:PRODUCT_NAME\" font=\"12px/normal &quot;Gulim&quot;\" textAlign=\"center\"/><Cell col=\"6\" edittype=\"none\" background=\"#ffffff\" text=\"bind:ADDITIONAL_PRICE\" font=\"12px/normal &quot;Gulim&quot;\"/><Cell col=\"7\" edittype=\"none\" background=\"#ffffff\" text=\"bind:IS_VISIBLE\" font=\"12px/normal &quot;Gulim&quot;\" textAlign=\"center\"/><Cell col=\"8\" edittype=\"none\" background=\"#ffffff\" text=\"bind:INPUT_DT\" font=\"12px/normal &quot;Gulim&quot;\" displaytype=\"date\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("stc_total_prefix","168","172","29","20",null,null,null,null,null,null,this);
            obj.set_text("총 [ ");
            obj.set_font("bold 10pt/normal \"맑은 고딕\"");
            this.addChild(obj.name, obj);

            obj = new Static("stc_total_value","197","172","20","20",null,null,null,null,null,null,this);
            obj.set_text("");
            obj.set_textDecoration("underline");
            obj.set_font("bold 10pt/normal \"맑은 고딕\"");
            this.addChild(obj.name, obj);

            obj = new Static("stc_total_suffix","212","172","36","20",null,null,null,null,null,null,this);
            obj.set_text(" ]건");
            obj.set_font("bold 10pt/normal \"맑은 고딕\"");
            this.addChild(obj.name, obj);

            obj = new Static("sta_listTitle","42","152","86","61",null,null,null,null,null,null,this);
            obj.set_text("옵션 목록");
            obj.set_font("bold 14pt/normal \"맑은 고딕\"");
            obj.set_taborder("1");
            obj.set_color("#232323");
            this.addChild(obj.name, obj);

            obj = new Static("sta_prodType","40","53","90","40",null,null,null,null,null,null,this);
            obj.set_text("옵션검색");
            obj.set_font("bold 16px/normal \"맑은 고딕\"");
            obj.set_padding("0px 0px 0px 10px");
            obj.set_taborder("4");
            obj.set_background("transparent");
            obj.set_borderRadius("10px 0px 0px 10px");
            obj.set_color("#333333");
            this.addChild(obj.name, obj);

            obj = new Combo("cmb_searchType","157","56","150","35",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_font("normal 800 10pt/normal \"Arial\"");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            var cmb_searchType_innerdataset = new nexacro.NormalDataset("cmb_searchType_innerdataset", obj);
            cmb_searchType_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">OPTION_ID</Col><Col id=\"datacolumn\">옵션코드</Col></Row><Row><Col id=\"codecolumn\">OPTION_NAME</Col><Col id=\"datacolumn\">옵션명</Col></Row><Row><Col id=\"codecolumn\">OPTION_VALUE</Col><Col id=\"datacolumn\">옵션 세부사항</Col></Row><Row><Col id=\"codecolumn\">PRODUCT_NAME</Col><Col id=\"datacolumn\">상품명</Col></Row></Rows>");
            obj.set_innerdataset(cmb_searchType_innerdataset);
            obj.set_text("상품명");
            obj.set_value("PRODUCT_NAME");
            obj.set_index("1");
            this.addChild(obj.name, obj);

            obj = new Static("sta_listTitle00","498","152","215","61",null,null,null,null,null,null,this);
            obj.set_text("옵션 더블클릭시 수정가능");
            obj.set_font("11pt/normal \"Arial\"");
            obj.set_taborder("12");
            obj.set_color("#383838");
            obj.set_border("0px none,0px none,5px solid #ffa70f,0px solid #ffa70f");
            obj.set_textAlign("center");
            obj.set_verticalAlign("bottom");
            this.addChild(obj.name, obj);

            obj = new Button("btn_view","714","58","72","30",null,null,null,null,null,null,this);
            obj.set_text("조회");
            obj.set_background("#000000");
            obj.set_color("#ffffff");
            obj.set_border("1px solid #000000");
            obj.set_borderRadius("6px");
            obj.set_font("bold 12px \'Arial\'");
            obj.set_cursor("pointer");
            obj.set_taborder("12");
            this.addChild(obj.name, obj);

            obj = new Button("btn_show","832","172","92","30",null,null,null,null,null,null,this);
            obj.set_text("선택 진열");
            obj.set_background("#f09d37");
            obj.set_color("#ffffff");
            obj.set_border("1px solid #f09d37");
            obj.set_borderRadius("6px");
            obj.set_font("bold 12px \'Arial\'");
            obj.set_cursor("pointer");
            obj.set_taborder("11");
            this.addChild(obj.name, obj);

            obj = new Button("btn_hide","948","172","92","30",null,null,null,null,null,null,this);
            obj.set_text("진열 취소");
            obj.set_background("#ce5525");
            obj.set_color("#ffffff");
            obj.set_border("1px solid #ce5525");
            obj.set_borderRadius("6px");
            obj.set_font("bold 12px \'Arial\'");
            obj.set_cursor("pointer");
            obj.set_taborder("12");
            this.addChild(obj.name, obj);

            obj = new Button("btn_reg","1130","172","100","30",null,null,null,null,null,null,this);
            obj.set_text("옵션등록");
            obj.set_background("#000000");
            obj.set_color("#ffffff");
            obj.set_border("1px solid #000000");
            obj.set_borderRadius("6px");
            obj.set_font("bold 12px \'Arial\'");
            obj.set_cursor("pointer");
            obj.set_taborder("12");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1280,800,this,function(p){});
            obj.set_stepcount("0");
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.addIncludeScript("Form_ProductOption.xfdl","common::common.xjs");
        this.registerScript("Form_ProductOption.xfdl", function() {

        this.executeIncludeScript("common::common.xjs"); /*include "common::common.xjs"*/;

        this.Form_ProductOption_onload = function(obj,e)
        {

            var oArgs = this.getOwnerFrame().arguments;

            if (oArgs && oArgs.REFRESH == "Y") {
        		this.fn_search();
        		// 🔹 전달받은 메시지가 있으면 출력
                if (oArgs.MESSAGE) {
                    this.alert(oArgs.MESSAGE);
                }
            } else {
                this.fn_search();
            }
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

            // 2) 콤보/에딧 값을 ds_searchCond에 넣기
            this._setCond(this.ds_searchCond, "SEARCH_TYPE",     this.cmb_searchType.value);                   // 검색분류
            this._setCond(this.ds_searchCond, "SEARCH_TEXT",     this.Div00_00.form.edt_search.text);          // 검색어

        };

        //엔터키
        this.Div00_00_edt_search_onkeydown = function(obj,e)
        {
        	if(e.keycode == 13){
        		this.btn_view_onclick();
        	}
        };


        //조회버튼(검색)
        this.btn_view_onclick = function(obj,e)
        {
        	this.fn_search();
        };



        //옵션 목록 조회 (조건포함)
        this.fn_search = function() {
            // 1) 조회조건 Dataset 구성
            this.fn_makeSearchCond();
            // 2) 트랜잭션 호출 (검색조건 Dataset 하나로 전달)

        	this.transaction(
                "selectOptionByAdmin",
                "svc::selectOptionByAdmin.do?time=" + new Date().getTime(),
                "ds_searchCond=ds_searchCond",
                "ds_out_opList=ds_out_opList",
                "",
                "fn_callback",
                true
            );

        };





        //콜백
        this.fn_callback = function (svcID, errCode, errMsg)
        {
            if (errCode < 0) {
                this.alert("오류: " + errMsg);
                return;
            }

            switch (svcID)
            {
        	case "selectOptionByAdmin":
        		var ea = this.ds_out_opList.getRowCount();
        		this.stc_total_value.set_text(ea );
        		break;

        	case "updateOptionVisibleByAdmin":
        		this.alert("옵션 진열상태 변경이 완료되었습니다.");
        		this.fn_search();
        		break;
            }
        };




        //옵션등록(페이지이동)
        // 옵션등록 버튼 클릭 시 (무조건 신규 등록)
        this.btn_reg_onclick = function(obj,e)
        {

        	this.fn_confirmCustom("옵션 등록을 하시겠습니까?\n확인 시 등록 사이트로 이동합니다.",
        		function(ok){
        			if(!ok) return;

        			this.fn_openOptionForm("INSERT"); // 등록 모드
        		}.bind(this)
        	);

        };


        //체크박스 chk 로 선택된 옵션(진열상태 요청 ,선택된 값만 반전 토글버튼 )
        this.btn_toggle_onclick = function (obj, e)
        {
            // 선택된 항목 반전 처리
            var selRows = this._getSelectedRows();
            if (selRows.length == 0) {
                this.alert("변경할 옵션을 선택하세요.");
                return;
            }

            this.fn_confirmCustom("총 " + selRows.length + "건의 옵션 진열상태를 반전하시겠습니까?",
                function (ok) {
                    if (!ok) return;

                    this.ds_in.clearData();

                    for (var i = 0; i < selRows.length; i++) {
                        var row = selRows[i];
                        var id = this.ds_out_opList.getColumn(row, "OPTION_ID");
                        var state = this.ds_out_opList.getColumn(row, "IS_VISIBLE");
                        var newState = (state == "Y" ? "N" : "Y");

                        var r = this.ds_in.addRow();
                        this.ds_in.setColumn(r, "OPTION_ID", id);
                        this.ds_in.setColumn(r, "IS_VISIBLE", newState);
                    }

                    this.transaction(
                        "updateOptionVisibleByAdmin",
                        "svc::updateOptionVisibleByAdmin.do",
                        "ds_in=ds_in", "", "", "fn_callback", true
                    );
                }.bind(this)
            );
        };

        // 선택된 행들을 모아오는 공통 함수
        this._getSelectedRows = function ()
        {
            var arr = [];
            for (var i = 0; i < this.ds_out_opList.getRowCount(); i++) {
                if (this.ds_out_opList.getColumn(i, "chk") == 1) {
                    arr.push(i);
                }
            }
            return arr;
        };




        /**
        * 옵션 진열상태 변경 공통 함수
        * @param {string} newState - "Y" = 진열, "N" = 숨김
        */
        this.fn_updateVisible = function (newState)
        {
            var selRows = this._getSelectedRows();
            if (selRows.length == 0) {
                this.alert((newState == "Y" ? "진열" : "숨김") + "할 옵션을 선택하세요.");
                return;
            }

            // 이미 같은 상태인 건 제외
            var ds = this.ds_out_opList;
            var realChange = [];
            var alreadyCnt = 0;

            for (var i = 0; i < selRows.length; i++) {
                var row = selRows[i];
                var curState = ds.getColumn(row, "IS_VISIBLE");
                if (curState != newState) {
                    realChange.push(ds.getColumn(row, "OPTION_ID"));
                } else {
                    alreadyCnt++;
                }
            }

            if (realChange.length == 0) {
                this.alert("선택한 옵션은 이미 " + (newState == "Y" ? "진열" : "숨김") + " 상태입니다.");
                return;
            }

            if (alreadyCnt > 0) {
                this.alert("선택한 옵션 중 " + alreadyCnt + "건은 이미 "
                    + (newState == "Y" ? "진열" : "숨김") + " 상태입니다.\n나머지만 변경합니다.");
            }

            // 컨펌창 (공통 confirm)
            this.fn_confirmCustom(
                "총 " + realChange.length + "건의 옵션을 "
                + (newState == "Y" ? "진열" : "숨김") + " 상태로 변경하시겠습니까?",
                function (ok) {
                    if (!ok) return;

                    this.ds_in.clearData();
                    for (var j = 0; j < realChange.length; j++) {
                        var r = this.ds_in.addRow();
                        this.ds_in.setColumn(r, "OPTION_ID", realChange[j]);
                        this.ds_in.setColumn(r, "IS_VISIBLE", newState);
                    }

                    this.transaction(
                        "updateOptionVisibleByAdmin",
                        "svc::updateOptionVisibleByAdmin.do",
                        "ds_in=ds_in",
                        "",
                        "",
                        "fn_callback",
                        true
                    );
                }.bind(this)
            );
        };



        // 선택 진열 버튼
        this.btn_show_onclick = function(obj, e) {
            this.fn_updateVisible("Y"); // 무조건 진열
        };

        // 선택 숨김 버튼
        this.btn_hide_onclick = function(obj, e) {
            this.fn_updateVisible("N"); // 무조건 숨김
        };



        /***************************************************
        * Grid 헤더 클릭 시 이벤트 (전체선택 / 전체해제)
        ***************************************************/
        this.grid_list_onheadclick = function (obj, e)
        {
            // 1) 체크박스 컬럼이 아니면 무시
            if (e.col != 0) return;

            // 2) 멀티헤더의 '목록' 등 상단 셀 클릭 시 무시
            var dispType = obj.getCellProperty("head", e.cell, "displaytype");
            if (dispType != "checkboxcontrol") return;

            var ds = this.ds_out_opList;
            var rowCount = ds.getRowCount();

            // 3) 전체 체크 여부 확인
            var allChecked = true;
            for (var i = 0; i < rowCount; i++) {
                if (ds.getColumn(i, "chk") != 1) {
                    allChecked = false;
                    break;
                }
            }

            // 4) 전체가 이미 체크되어 있으면 → 전체 해제, 아니면 전체 선택
            var newVal = allChecked ? 0 : 1;

            for (var j = 0; j < rowCount; j++) {
                ds.setColumn(j, "chk", newVal);
            }

            // 5) 헤더 체크박스 표시 갱신
            obj.setCellProperty("head", e.cell, "text", newVal.toString());
        };



        // this.ds_out_opList_oncolumnchanged = function(obj:nexacro.NormalDataset,e:nexacro.DSColChangeEventInfo)
        // {
        // 	trace("row=" + e.row + ", colid=" + e.columnid + ", newval=" + e.newvalue);
        // };


        /***************************************************
        * 옵션목록 더블클릭 → 등록/수정 폼으로 이동
        ***************************************************/
        this.grid_list_oncelldblclick = function (obj, e)
        {
            var nRow = e.row;
            if (nRow < 0) return;

            // 선택된 행의 데이터 추출
        	var productName = this.ds_out_opList.getColumn(nRow, "PRODUCT_NAME");
            var optionId   = this.ds_out_opList.getColumn(nRow, "OPTION_ID");
            var optionName = this.ds_out_opList.getColumn(nRow, "OPTION_NAME");
            var optionVal  = this.ds_out_opList.getColumn(nRow, "OPTION_VALUE");
            var addPrice   = this.ds_out_opList.getColumn(nRow, "ADDITIONAL_PRICE");

            // 사용자에게 확인창 표시
            this.fn_confirmCustom(
                "해당 상품: "+productName+"\n옵션: [옵션명: " + optionName + " / 세부사항: " + optionVal + "] \n정보를 수정하시겠습니까?",
                function (ok) {
                    if (!ok) return;

                    // bind(this)로 Form 컨텍스트 유지
                    this.fn_openOptionForm("UPDATE", {
        					"OPTION_ID": optionId,
        					"OPTION_NAME": optionName,
        					"OPTION_VALUE": optionVal,
        					"ADDITIONAL_PRICE": addPrice
        				});
                }.bind(this)
            );
        };




        /**
        * 옵션 등록/수정 폼 열기
        * @param {string} mode - "INSERT" or "UPDATE"
        * @param {object} args - 옵션 데이터 (수정일 경우)
        */
        this.fn_openOptionForm = function(mode, args)
        {
            var app = nexacro.getApplication();
            var workFrame = app.mainframe.VFrameSet00.HFrameSet00.VFrameSet01.WorkFrame;


        	// 이전 arguments 지우고 새로 세팅
        	workFrame.arguments = null;

            // 전달값 만들기 // Object Merge 동작 args객체에 들어있는 모든 key-value 쌍 하나씩 꺼내서 oArgs에 복사
            var oArgs = { MODE: mode };
            if (args) {
                for (var k in args) {
                    oArgs[k] = args[k];
                }
            }

            //trace("fn_openOptionForm 전달 >>> " + JSON.stringify(oArgs));

            // arguments 세팅
            workFrame.arguments = oArgs;

            // 등록/수정 화면 열기
            workFrame.set_formurl("product::Form_ProductOptionReg.xfdl");
        };



        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_ProductOption_onload,this);
            this.Div00_00.form.edt_search.addEventHandler("onkeydown",this.Div00_00_edt_search_onkeydown,this);
            this.grid_list.addEventHandler("onheadclick",this.grid_list_onheadclick,this);
            this.grid_list.addEventHandler("oncelldblclick",this.grid_list_oncelldblclick,this);
            this.sta_listTitle.addEventHandler("onclick",this.sta_listTitle_onclick,this);
            this.sta_prodType.addEventHandler("onclick",this.sta_prodType_onclick,this);
            this.sta_listTitle00.addEventHandler("onclick",this.sta_listTitle_onclick,this);
            this.btn_view.addEventHandler("onclick",this.btn_view_onclick,this);
            this.btn_show.addEventHandler("onclick",this.btn_show_onclick,this);
            this.btn_hide.addEventHandler("onclick",this.btn_hide_onclick,this);
            this.btn_reg.addEventHandler("onclick",this.btn_reg_onclick,this);
            this.ds_out_opList.addEventHandler("oncolumnchanged",this.ds_out_opList_oncolumnchanged,this);
            this.ds_in.addEventHandler("oncolumnchanged",this.ds_out_opList_oncolumnchanged,this);
        };
        this.loadIncludeScript("Form_ProductOption.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
