(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_ProductCate");
            this.set_titletext("카테고리 관리");
            this.set_background("#f7f8fa");
            this.set_font("14px \'Arial\'");
            this.set_color("#222222");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,800);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_mainCate", this);
            obj._setContents("<ColumnInfo><Column id=\"MAIN_CATE_ID\" type=\"BIGDECIMAL\"/><Column id=\"MAIN_CATE_NM\" type=\"STRING\" size=\"100\"/><Column id=\"SORT_NUMBER\" type=\"INT\"/><Column id=\"IS_ACTIVE\" type=\"STRING\" size=\"1\"/><Column id=\"INPUT_DT\" type=\"DATETIME\"/><Column id=\"UPDATE_DT\" type=\"DATETIME\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_subCate", this);
            obj._setContents("<ColumnInfo><Column id=\"SUB_CATE_ID\" type=\"BIGDECIMAL\"/><Column id=\"MAIN_CATE_ID\" type=\"BIGDECIMAL\"/><Column id=\"SUB_CATE_NM\" type=\"STRING\" size=\"100\"/><Column id=\"SORT_NUMBER\" type=\"INT\"/><Column id=\"IS_ACTIVE\" type=\"STRING\" size=\"1\"/><Column id=\"INPUT_DT\" type=\"DATETIME\"/><Column id=\"UPDATE_DT\" type=\"DATETIME\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_in", this);
            obj._setContents("<ColumnInfo><Column id=\"TYPE\" type=\"STRING\" size=\"10\"/><Column id=\"MAIN_CATE_ID\" type=\"BIGDECIMAL\"/><Column id=\"SUB_CATE_ID\" type=\"BIGDECIMAL\"/><Column id=\"MAIN_CATE_NM\" type=\"STRING\" size=\"100\"/><Column id=\"SUB_CATE_NM\" type=\"STRING\" size=\"100\"/><Column id=\"SORT_NUMBER\" type=\"INT\"/><Column id=\"IS_ACTIVE\" type=\"STRING\" size=\"1\"/><Column id=\"INPUT_ID\" type=\"STRING\" size=\"255\"/><Column id=\"UPDATE_ID\" type=\"STRING\" size=\"255\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_category", this);
            obj._setContents("<ColumnInfo><Column id=\"cate_id\" type=\"STRING\" size=\"256\"/><Column id=\"parent_id\" type=\"STRING\" size=\"256\"/><Column id=\"cate_name\" type=\"STRING\" size=\"256\"/><Column id=\"level\" type=\"INT\" size=\"8\"/><Column id=\"type\" type=\"STRING\" size=\"10\"/><Column id=\"expanded\" type=\"STRING\" size=\"2\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Static("st_path","55","11","485","40",null,null,null,null,null,null,this);
            obj.set_text("     대분류 > (선택 안됨 - 대분류를 선택해주세요.)");
            obj.set_font("bold 15px \'Arial\'");
            obj.set_color("#111111");
            obj.set_background("#ffffff");
            obj.set_border("1px solid #dddddd");
            obj.set_borderRadius("6px");
            obj.set_padding("8px");
            this.addChild(obj.name, obj);

            obj = new Button("btn_addMain","80","60","110","34",null,null,null,null,null,null,this);
            obj.set_text("대분류 추가");
            obj.set_background("#000000");
            obj.set_color("#ffffff");
            obj.set_font("bold 12px \'Arial\'");
            obj.set_borderRadius("6px");
            obj.set_cursor("pointer");
            obj.getSetter("hoverbackground").set("#ffffff");
            obj.getSetter("hovercolor").set("#000000");
            this.addChild(obj.name, obj);

            obj = new Button("btn_addSub","200","60","110","34",null,null,null,null,null,null,this);
            obj.set_text("중분류 추가");
            obj.set_background("#333333");
            obj.set_color("#ffffff");
            obj.set_font("bold 12px \'Arial\'");
            obj.set_borderRadius("6px");
            obj.set_cursor("pointer");
            obj.getSetter("hoverbackground").set("#ffffff");
            obj.getSetter("hovercolor").set("#333333");
            this.addChild(obj.name, obj);

            obj = new Button("btn_edit","360","60","70","34",null,null,null,null,null,null,this);
            obj.set_text("수정");
            obj.set_background("#555555");
            obj.set_color("#ffffff");
            obj.set_font("bold 12px \'Arial\'");
            obj.set_borderRadius("6px");
            obj.set_cursor("pointer");
            obj.getSetter("hoverbackground").set("#ffffff");
            obj.getSetter("hovercolor").set("#555555");
            this.addChild(obj.name, obj);

            obj = new Button("btn_delete","440","60","70","34",null,null,null,null,null,null,this);
            obj.set_text("삭제");
            obj.set_background("#999999");
            obj.set_color("#ffffff");
            obj.set_font("bold 12px \'Arial\'");
            obj.set_borderRadius("6px");
            obj.set_cursor("pointer");
            obj.getSetter("hoverbackground").set("#ffffff");
            obj.getSetter("hovercolor").set("#999999");
            this.addChild(obj.name, obj);

            obj = new Grid("grd_category","55","104","485","607",null,null,null,null,null,null,this);
            obj.set_binddataset("ds_category");
            obj.set_useselcolor("true");
            obj.set_selecttype("row");
            obj.set_border("1px solid #d0d0d0");
            obj.set_borderRadius("6px");
            obj.set_background("#ffffff");
            obj.set_color("#111111");
            obj.set_font("14px \'Arial\'");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"420\"/></Columns><Rows><Row size=\"38\"/></Rows><Band id=\"body\"><Cell text=\"bind:cate_name\" textAlign=\"left\" padding=\"10px\" font=\"expr:type==&apos;main&apos; ? &apos;bold 14px Arial&apos; : &apos;13px Arial&apos;\" color=\"expr:type==&apos;main&apos; ? &apos;#111111&apos; : &apos;#555555&apos;\" background=\"expr:currow==rowposition ? &apos;#e6e6e6&apos; : (mouseover ? &apos;#f2f2f2&apos; : &apos;#ffffff&apos;)\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Div("div_detail","640","104","570","607",null,null,null,null,null,null,this);
            obj.set_background("#ffffff");
            obj.set_border("1px solid #d9d9d9");
            obj.set_borderRadius("12px");
            obj.set_font("14px \'Arial\'");
            obj.set_color("#111111");
            this.addChild(obj.name, obj);

            obj = new Static("sta_title","0","26","100.00%","35",null,null,null,null,null,null,this.div_detail.form);
            obj.set_text("카테고리 상세정보");
            obj.set_textAlign("center");
            obj.set_font("bold 18px \'Arial\'");
            obj.set_color("#000000");
            this.div_detail.addChild(obj.name, obj);

            obj = new Static("line_top","40","80","490","1",null,null,null,null,null,null,this.div_detail.form);
            obj.set_text("");
            obj.set_background("#e0e0e0");
            this.div_detail.addChild(obj.name, obj);

            obj = new Static("sta_section1","50","96","440","25",null,null,null,null,null,null,this.div_detail.form);
            obj.set_text("기본 정보");
            obj.set_font("bold 14px \'Arial\'");
            obj.set_color("#111111");
            this.div_detail.addChild(obj.name, obj);

            obj = new Static("line_1","50","133","440","1",null,null,null,null,null,null,this.div_detail.form);
            obj.set_background("#dddddd");
            this.div_detail.addChild(obj.name, obj);

            obj = new Static("sta_id","80","160","100","25",null,null,null,null,null,null,this.div_detail.form);
            obj.set_text("ID");
            obj.set_textAlign("right");
            obj.set_font("bold 13px \'Arial\'");
            obj.set_color("#333333");
            this.div_detail.addChild(obj.name, obj);

            obj = new Static("sta_idValue","200","160","240","25",null,null,null,null,null,null,this.div_detail.form);
            obj.set_text("자동생성");
            obj.set_textAlign("left");
            obj.set_font("13px \'Arial\'");
            obj.set_color("#666666");
            this.div_detail.addChild(obj.name, obj);

            obj = new Static("sta_name","80","205","100","25",null,null,null,null,null,null,this.div_detail.form);
            obj.set_text("분류명");
            obj.set_textAlign("right");
            obj.set_font("bold 13px \'Arial\'");
            obj.set_color("#333333");
            this.div_detail.addChild(obj.name, obj);

            obj = new Edit("edt_cateName","200","200","260","34",null,null,null,null,null,null,this.div_detail.form);
            obj.set_border("1px solid #cccccc");
            obj.set_borderRadius("6px");
            obj.set_font("13px \'Arial\'");
            obj.set_color("#000000");
            obj.set_background("#fafafa");
            obj.set_textAlign("left");
            obj.set_padding("6px");
            obj.getSetter("focusborder").set("1px solid #000000");
            this.div_detail.addChild(obj.name, obj);

            obj = new Static("sta_sort","80","255","100","25",null,null,null,null,null,null,this.div_detail.form);
            obj.set_text("정렬순번");
            obj.set_textAlign("right");
            obj.set_font("bold 13px \'Arial\'");
            obj.set_color("#333333");
            this.div_detail.addChild(obj.name, obj);

            obj = new Edit("edt_sort","200","250","120","34",null,null,null,null,null,null,this.div_detail.form);
            obj.set_border("1px solid #cccccc");
            obj.set_borderRadius("6px");
            obj.set_font("13px \'Arial\'");
            obj.set_color("#000000");
            obj.set_background("#fafafa");
            obj.set_textAlign("left");
            obj.set_padding("6px");
            obj.getSetter("focusborder").set("1px solid #000000");
            this.div_detail.addChild(obj.name, obj);

            obj = new Static("sta_section2","50","310","440","25",null,null,null,null,null,null,this.div_detail.form);
            obj.set_text("표시 설정");
            obj.set_font("bold 14px \'Arial\'");
            obj.set_color("#111111");
            this.div_detail.addChild(obj.name, obj);

            obj = new Static("line_2","50","338","440","1",null,null,null,null,null,null,this.div_detail.form);
            obj.set_background("#dddddd");
            this.div_detail.addChild(obj.name, obj);

            obj = new Static("sta_display","80","370","100","25",null,null,null,null,null,null,this.div_detail.form);
            obj.set_text("노출여부");
            obj.set_textAlign("right");
            obj.set_font("bold 13px \'Arial\'");
            obj.set_color("#333333");
            this.div_detail.addChild(obj.name, obj);

            obj = new Radio("rdo_display","200","365","240","35",null,null,null,null,null,null,this.div_detail.form);
            obj.set_direction("vertical");
            obj.set_font("13px \'Arial\'");
            obj.set_color("#111111");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            var div_detail_form_rdo_display_innerdataset = new nexacro.NormalDataset("div_detail_form_rdo_display_innerdataset", obj);
            div_detail_form_rdo_display_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">Y</Col><Col id=\"datacolumn\">진열함</Col></Row><Row><Col id=\"codecolumn\">N</Col><Col id=\"datacolumn\">진열안함</Col></Row></Rows>");
            obj.set_innerdataset(div_detail_form_rdo_display_innerdataset);
            obj.set_value("Y");
            this.div_detail.addChild(obj.name, obj);

            obj = new Static("sta_hint","60","435","440","40",null,null,null,null,null,null,this.div_detail.form);
            obj.set_text("※ 정보를 수정한 후 반드시 [저장] 버튼을 눌러주세요.");
            obj.set_color("#999999");
            obj.set_font("12px \'Arial\'");
            obj.set_textAlign("center");
            this.div_detail.addChild(obj.name, obj);

            obj = new Button("btn_saveDetail","826","626","100","38",null,null,null,null,null,null,this);
            obj.set_text("저장");
            obj.set_background("#000000");
            obj.set_color("#ffffff");
            obj.set_font("bold 12px \'Arial\'");
            obj.set_borderRadius("6px");
            obj.set_cursor("pointer");
            obj.getSetter("hoverbackground").set("#ffffff");
            obj.getSetter("hovercolor").set("#000000");
            this.addChild(obj.name, obj);

            obj = new Button("btn_cancel","940","626","100","38",null,null,null,null,null,null,this);
            obj.set_text("취소");
            obj.set_background("#444444");
            obj.set_color("#ffffff");
            obj.set_font("bold 12px \'Arial\'");
            obj.set_borderRadius("6px");
            obj.set_cursor("pointer");
            obj.getSetter("hoverbackground").set("#666666");
            this.addChild(obj.name, obj);

            obj = new Static("sta_msg","640","11","570","83",null,null,null,null,null,null,this);
            obj.set_text("");
            obj.set_background("#ffffff");
            obj.set_border("1px solid #dddddd");
            obj.set_color("#000000");
            obj.set_font("bold 18px/normal \"Arial\"");
            obj.set_textAlign("center");
            obj.set_borderRadius("6px");
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
        this.addIncludeScript("Form_ProductCate.xfdl","common::common.xjs");
        this.registerScript("Form_ProductCate.xfdl", function() {
        this.executeIncludeScript("common::common.xjs"); /*include "common::common.xjs"*/;

        this._mode = "view";
        this._insertMode = null;
        this._pendingAction = null;
        this._pendingType = null;
        this._needRefresh = false;

        /***************************************************
        * onload : 대/중분류 조회
        ***************************************************/
        this.Form_ProductCate_onload = function(obj, e)
        {
            this.grd_category.addEventHandler("oncellclick", this.grd_category_oncellclick, this);

            // 통신 타임아웃 (무한대기 방지)
            try { nexacro.getEnvironment().set_httptimeout(30); } catch(e) {}

            // 상단 초기화
            this.sta_msg.set_text("카테고리 정보를 조회 중입니다...");
            this.sta_msg.set_color("#000000");
            this.st_path.set_text("     대분류 > (선택 안됨 -> 대분류를 선택해 주세요.)");

            // 최초 조회 (main -> sub 체인)
            this.transaction(
                "selectMainCategoryByAdmin",
                "svc::selectMainCategoryByAdmin.do?time=" + new Date().getTime(),
                "",
                "ds_mainCate=ds_mainCate",
                "",
                "fn_callback",
                true
            );


        };

        /***************************************************
        * 모드 변경(view/insert/edit)
        ***************************************************/
        this.fn_setMode = function(mode)
        {
            this._mode = mode;

            if (mode === "insert") {
                this.btn_saveDetail.set_text("등록");
                this.div_detail.set_background("#fffbe6");
            } else if (mode === "edit") {
                this.btn_saveDetail.set_text("수정");
                this.div_detail.set_background("#e6f7ff");
            } else {
                this.btn_saveDetail.set_text("저장");
                this.div_detail.set_background("#ffffff");
            }
        };

        /***************************************************
        * 알림 메시지 표시
        ***************************************************/
        this.fn_notify = function(msg, type)
        {
            if (!this.sta_msg) return;
            this.sta_msg.set_text(msg);
            this.sta_msg.set_color(type === "error" ? "#ff4d4f" : "#52c41a");
        };

        /***************************************************
        * 정렬순번 계산
        ***************************************************/
        this.fn_getNextSortNumber = function(type, mainId)
        {
            var maxSort = 0;
            if (type === "main") {
                for (var i = 0; i < this.ds_mainCate.getRowCount(); i++) {
                    var v = Number(this.ds_mainCate.getColumn(i, "SORT_NUMBER"));
                    if (v > maxSort) maxSort = v;
                }
            } else {
                for (var j = 0; j < this.ds_subCate.getRowCount(); j++) {
                    if (String(this.ds_subCate.getColumn(j, "MAIN_CATE_ID")) === String(mainId)) {
                        var v2 = Number(this.ds_subCate.getColumn(j, "SORT_NUMBER"));
                        if (v2 > maxSort) maxSort = v2;
                    }
                }
            }
            return maxSort + 1;
        };

        /***************************************************
        * 트리 구성
        ***************************************************/
        this.fn_makeTree = function()
        {
            var dsTree = this.ds_category;
            dsTree.clearData();

            for (var i = 0; i < this.ds_mainCate.getRowCount(); i++) {
                var mid = this.ds_mainCate.getColumn(i, "MAIN_CATE_ID");
                var name = this.ds_mainCate.getColumn(i, "MAIN_CATE_NM");
                var r = dsTree.addRow();
                dsTree.setColumn(r, "cate_id", "M" + mid);
                dsTree.setColumn(r, "parent_id", "");
                dsTree.setColumn(r, "cate_name", "🗂 " + name);
                dsTree.setColumn(r, "type", "main");
                dsTree.setColumn(r, "expanded", "N");
            }

            this.fn_notify("카테고리 목록이 갱신되었습니다.", "success");
        };





        /***************************************************
        * 트리 클릭 (펼침/접힘 + 자동 선택 보정)
        ***************************************************/
        this.grd_category_oncellclick = function(obj, e)
        {
            var row = e.row;
            if (row < 0) return;

            var type = this.ds_category.getColumn(row, "type");
            var cateId = this.ds_category.getColumn(row, "cate_id");

            // 항상 클릭한 행을 선택상태로 고정
            this.ds_category.set_rowposition(row);
            this.grd_category.selectRow(row);

            if (type === "main") {
                var expanded = this.ds_category.getColumn(row, "expanded");
                var mainId = cateId.replace("M", "");

                if (expanded === "Y") {
                    // 접기
                    this.ds_category.setColumn(row, "expanded", "N");
                    for (var i = this.ds_category.getRowCount() - 1; i >= 0; i--) {
                        if (this.ds_category.getColumn(i, "parent_id") == cateId)
        				this.ds_category.deleteRow(i);
                    }
                } else {
                    // 펼치기
                    this.ds_category.setColumn(row, "expanded", "Y");
                    var insertPos = row;
                    for (var k = 0; k < this.ds_subCate.getRowCount(); k++) {
                        if (String(this.ds_subCate.getColumn(k, "MAIN_CATE_ID")) == String(mainId)) {
                            insertPos++;
                            var r2 = this.ds_category.insertRow(insertPos);
                            this.ds_category.setColumn(r2, "cate_id", "S" + this.ds_subCate.getColumn(k, "SUB_CATE_ID"));
                            this.ds_category.setColumn(r2, "parent_id", "M" + mainId);
                            this.ds_category.setColumn(r2, "cate_name", "   📁 " + this.ds_subCate.getColumn(k, "SUB_CATE_NM"));
                            this.ds_category.setColumn(r2, "type", "sub");
                        }
                    }

                    // 🔸 펼친 직후 자동으로 대분류를 다시 선택 상태로 고정
                    this.ds_category.set_rowposition(row);
                    this.grd_category.selectRow(row);
                }
            }

            // 클릭된 항목 기준으로 상세 표시
            this.fn_showDetail(row);
        };






        /***************************************************
        * 상세 표시 + 상단 경로 갱신
        ***************************************************/
        this.fn_showDetail = function(row)
        {
            if (row < 0) return;

            var id = this.ds_category.getColumn(row, "cate_id");
            var name = (this.ds_category.getColumn(row, "cate_name") || "").replace(/[🗂📁\s]+/g, "").trim();
            var type = this.ds_category.getColumn(row, "type");
            var active = "Y", sort = "";

            if (type === "main") {
                var mainId = id.replace("M", "");
                var mrow = this.ds_mainCate.findRow("MAIN_CATE_ID", mainId);
                if (mrow >= 0) {
                    active = this.ds_mainCate.getColumn(mrow, "IS_ACTIVE");
                    sort = this.ds_mainCate.getColumn(mrow, "SORT_NUMBER");
                }

                // 상단 경로 텍스트 갱신 (대분류 선택 시)
                this.st_path.set_text("     대분류 > " + name);
            }
            else {
                var subId = id.replace("S", "");
                var srow = this.ds_subCate.findRow("SUB_CATE_ID", subId);
                var parentName = "";
                if (srow >= 0) {
                    active = this.ds_subCate.getColumn(srow, "IS_ACTIVE");
                    sort = this.ds_subCate.getColumn(srow, "SORT_NUMBER");

                    // 부모 대분류명 조회
                    var mainId = this.ds_subCate.getColumn(srow, "MAIN_CATE_ID");
                    var mrow2 = this.ds_mainCate.findRow("MAIN_CATE_ID", mainId);
                    if (mrow2 >= 0)
        			parentName = this.ds_mainCate.getColumn(mrow2, "MAIN_CATE_NM");
                }

                // 상단 경로 텍스트 갱신 (중분류 선택 시)
                this.st_path.set_text("     대분류 > " + parentName + " > " + name);
            }

            // 상세값 세팅
            this.div_detail.form.sta_idValue.set_text(id ? id : "자동생성");
            this.div_detail.form.edt_cateName.set_value(name);
            this.div_detail.form.edt_sort.set_value(sort);
            this.div_detail.form.rdo_display.set_value(active);
            this.fn_setMode("view");
        };











        /***************************************************
        * 신규 추가 버튼
        ***************************************************/
        this.btn_addMain_onclick = function()
        {
            this._insertMode = { type: "main" };
            this.fn_setMode("insert");
            this.div_detail.form.sta_idValue.set_text("자동생성");
            this.div_detail.form.edt_cateName.set_value("");
            this.div_detail.form.edt_sort.set_value(this.fn_getNextSortNumber("main"));
            this.div_detail.form.rdo_display.set_value("Y");
            this.fn_notify("신규 대분류명을 입력 후 [등록]을 누르세요.", "success");
        };

        this.btn_addSub_onclick = function()
        {
            var row = this.grd_category.currentrow;
            if (row < 0) { this.alert("대분류나 중분류를 선택하세요."); return; }

            var type = this.ds_category.getColumn(row, "type");
            var mainId = (type === "main") ? this.ds_category.getColumn(row, "cate_id").replace("M", "") :
        	this.ds_category.getColumn(row, "parent_id").replace("M", "");

            this._insertMode = { type: "sub", mainId: mainId };
            this.fn_setMode("insert");
            this.div_detail.form.sta_idValue.set_text("자동생성");
            this.div_detail.form.edt_cateName.set_value("");
            this.div_detail.form.edt_sort.set_value(this.fn_getNextSortNumber("sub", mainId));
            this.div_detail.form.rdo_display.set_value("Y");
            this.fn_notify("신규 중분류명을 입력 후 [등록] 버튼을 누르세요.", "success");
        };




        /***************************************************
        * 저장(등록/수정)
        ***************************************************/
        this.btn_saveDetail_onclick = function()
        {
            var name = this.div_detail.form.edt_cateName.value;
            var sort = this.div_detail.form.edt_sort.value;
            var display = this.div_detail.form.rdo_display.value;
            if (!name) { this.alert("분류명을 입력하세요."); return; }

            var msg = this._insertMode ?
        	"새로운 " + (this._insertMode.type === "main" ? "대분류" : "중분류") + "를 등록하시겠습니까?" :
        	"현재 내용을 저장(수정)하시겠습니까?";

            // this context 유지(bind)
            this.fn_confirmCustom(msg, function(ok){
        			if (!ok) return;

        			this.ds_in.clearData();
        			var nRow = this.ds_in.addRow();
        			var sUserId = this.getUserId ? this.getUserId() : "admin";

        			if (this._insertMode) {
        				if (this._insertMode.type === "main") {
        					this.ds_in.setColumn(nRow, "TYPE", "main");
        					this.ds_in.setColumn(nRow, "MAIN_CATE_NM", name);
        					this.ds_in.setColumn(nRow, "SORT_NUMBER", this.fn_getNextSortNumber("main"));
        				} else {
        					this.ds_in.setColumn(nRow, "TYPE", "sub");
        					this.ds_in.setColumn(nRow, "MAIN_CATE_ID", this._insertMode.mainId);
        					this.ds_in.setColumn(nRow, "SUB_CATE_NM", name);
        					this.ds_in.setColumn(nRow, "SORT_NUMBER", this.fn_getNextSortNumber("sub", this._insertMode.mainId));
        				}
        				this.ds_in.setColumn(nRow, "IS_ACTIVE", display);
        				this.ds_in.setColumn(nRow, "INPUT_ID", sUserId);
        				this.ds_in.setColumn(nRow, "UPDATE_ID", sUserId);

        				this._pendingAction = "insert";
        				this._pendingType = this._insertMode.type;

        				this.transaction(
        					"insertCategoryByAdmin",
        					"svc::insertCategoryByAdmin.do?time=" + new Date().getTime(),
        					"ds_in=ds_in", "", "", "fn_callback", true
        				);
        			} else {
        				var row = this.grd_category.currentrow;
        				if (row < 0) { this.alert("수정할 항목을 선택하세요."); return; }

        				var id = this.ds_category.getColumn(row, "cate_id");
        				var type = this.ds_category.getColumn(row, "type");
        				var cateId = id.substring(1);


        				// [btn_saveDetail_onclick] 수정 직전에 추가
        				trace(">>> UPDATE 준비: row=" + row
        					+ " type=" + type
        					+ " id=" + id
        					+ " name=" + name);



        				this.ds_in.setColumn(nRow, "TYPE", type);
        				if (type === "main") {
        					this.ds_in.setColumn(nRow, "MAIN_CATE_ID", cateId);
        					this.ds_in.setColumn(nRow, "MAIN_CATE_NM", name);
        				} else {
        					this.ds_in.setColumn(nRow, "SUB_CATE_ID", cateId);
        					this.ds_in.setColumn(nRow, "SUB_CATE_NM", name);
        				}
        				this.ds_in.setColumn(nRow, "SORT_NUMBER", Number(sort) || 1);
        				this.ds_in.setColumn(nRow, "IS_ACTIVE", display);
        				this.ds_in.setColumn(nRow, "UPDATE_ID", sUserId);

        				this._pendingAction = "update";
        				this._pendingType = type;

        				this.transaction(
        					"updateCategoryByAdmin",
        					"svc::updateCategoryByAdmin.do?time=" + new Date().getTime(),
        					"ds_in=ds_in", "", "", "fn_callback", true
        				);
        			}
        		}.bind(this));  // this 바인딩 중요
        };



        /***************************************************
        * 삭제 (대분류-중분류 안전검사 포함, 무한로딩 방지)
        ***************************************************/
        this.btn_delete_onclick = function()
        {
            var row = this.grd_category.currentrow;
            if (row < 0) {
                this.alert("삭제할 항목을 선택하세요.");
                return;
            }

            var type = this.ds_category.getColumn(row, "type");
            var cateId = this.ds_category.getColumn(row, "cate_id");
            if (!cateId) return;

            cateId = cateId.replace(/^[MS]/, ""); // M,S 접두 제거

            // 대분류 삭제 시 — 하위 중분류 존재 검사
            if (type === "main") {
                var hasSub = false;

                // 1.ds_subCate 기준 검사 (DB 기준)
                for (var i = 0; i < this.ds_subCate.getRowCount(); i++) {
                    if (String(this.ds_subCate.getColumn(i, "MAIN_CATE_ID")) === String(cateId)) {
                        hasSub = true;
                        break;
                    }
                }

                // 2.트리(ds_category) 기준 검사 (화면 기준)
                if (!hasSub) {
                    for (var j = 0; j < this.ds_category.getRowCount(); j++) {
                        var parentId = this.ds_category.getColumn(j, "parent_id");
                        if (parentId === "M" + cateId) {
                            hasSub = true;
                            break;
                        }
                    }
                }

                // 하위 중분류 존재 시 안내 후 중단
                if (hasSub) {
                    this.alert("이 대분류에는 중분류가 존재합니다.\n먼저 중분류를 모두 삭제한 후\n다시 시도해주세요.");
                    return;
                }
            }

            // 삭제 확인
            this.fn_confirmCustom("정말 삭제하시겠습니까?", function(ok){
        			if (!ok) return;

        			this.ds_in.clearData();
        			var nRow = this.ds_in.addRow();
        			this.ds_in.setColumn(nRow, "TYPE", type);

        			if (type === "main") {
        				this.ds_in.setColumn(nRow, "MAIN_CATE_ID", cateId);
        			} else {
        				this.ds_in.setColumn(nRow, "SUB_CATE_ID", cateId);

        				// 🔹 부모 ID 저장 (삭제 후 자동 펼침용)
        				var parentId = this.ds_category.getColumn(row, "parent_id");
        				if (parentId)
                        this.ds_in.setColumn(nRow, "MAIN_CATE_ID", parentId.replace("M", ""));
        			}

        			this._pendingAction = "delete";
        			this._pendingType = type;

        			try { this.setWaitCursor(true); } catch(e) {}

        			trace("TX >> deleteCategoryByAdmin (" + type + ") cateId=" + cateId);
        			this.transaction(
        				"deleteCategoryByAdmin",
        				"svc::deleteCategoryByAdmin.do?time=" + new Date().getTime(),
        				"ds_in=ds_in", "", "", "fn_callback", true
        			);
        		}.bind(this));
        };
















        /***************************************************
        * 상단 경로 텍스트 업데이트
        ***************************************************/
        this.fn_updatePath = function(row)
        {
            if (row < 0) return;

            var type = this.ds_category.getColumn(row, "type");
            var cateName = (this.ds_category.getColumn(row, "cate_name") || "").replace(/[🗂📁\s]+/g, "").trim();
            var pathText = "";

            if (type === "main") {
                // 대분류만 선택된 상태
                pathText = "대분류 > " + cateName;
            }
            else if (type === "sub") {
                // 중분류일 때 부모 대분류명까지 찾아서 표시
                var parentId = this.ds_category.getColumn(row, "parent_id");
                var parentName = "";
                var pRow = this.ds_category.findRow("cate_id", parentId);
                if (pRow >= 0)
        		parentName = (this.ds_category.getColumn(pRow, "cate_name") || "").replace(/[🗂📁\s]+/g, "").trim();
                else {
                    // 트리에 안 떠 있으면 메인 카테고리 dataset에서 직접 검색
                    var mainId = parentId ? parentId.replace("M", "") : "";
                    var mRow = this.ds_mainCate.findRow("MAIN_CATE_ID", mainId);
                    if (mRow >= 0)
        			parentName = this.ds_mainCate.getColumn(mRow, "MAIN_CATE_NM");
                }
                pathText = "대분류 > " + parentName + " > " + cateName;
            }

            this.st_path.set_text(pathText);
        };



        /***************************************************
        * 콜백 (insert/update/delete 공통)
        ***************************************************/
        this.fn_callback = function (svcID, errCode, errMsg)
        {
            try { this.setWaitCursor(false); } catch(e) {}   // 무한로딩 방지

            if (errCode < 0) {
                this.fn_notify("실행 실패: " + (errMsg || "서버 오류"), "error");
                return;
            }

            trace("CALLBACK: " + svcID + " / errCode=" + errCode);

            switch (svcID) {

                // 등록 / 수정 / 삭제 완료 시 → 메인 카테고리 재조회
        	case "insertCategoryByAdmin":
        	case "updateCategoryByAdmin":
        	case "deleteCategoryByAdmin":
        		this._needRefresh = true;
        		this.transaction(
        			"selectMainCategoryByAdmin",
        			"svc::selectMainCategoryByAdmin.do?time=" + new Date().getTime(),
        			"",
        			"ds_mainCate=ds_mainCate",
        			"",
        			"fn_callback",
        			true
        		);
        		break;

                // 메인 조회 완료 → 서브 조회 이어가기
        	case "selectMainCategoryByAdmin":
        		this.transaction(
        			"selectSubCategoryByAdmin",
        			"svc::selectSubCategoryByAdmin.do?time=" + new Date().getTime(),
        			"",
        			"ds_subCate=ds_subCate",
        			"",
        			"fn_callback",
        			true
        		);
        		break;

                // 서브 조회 완료 → 트리 갱신 + 후처리
        	case "selectSubCategoryByAdmin":
        		this.fn_makeTree();

        		if (this._needRefresh)
        		{
        			/***********************
        			* INSERT
        			***********************/
        			if (this._pendingAction === "insert")
        			{
        				if (this._pendingType === "main")
        				{
        					var newMainId = this.ds_mainCate.getColumn(this.ds_mainCate.getRowCount() - 1, "MAIN_CATE_ID");
        					var mainRow = this.ds_category.findRow("cate_id", "M" + newMainId);
        					if (mainRow >= 0)
        					{
        						this.grd_category.selectRow(mainRow);
        						this.fn_showDetail(mainRow);

        						var mainName = this.ds_mainCate.lookup("MAIN_CATE_ID", newMainId, "MAIN_CATE_NM");
        						this.st_path.set_text("대분류 > " + mainName);
        					}
        					this.fn_notify("대분류가 등록되었습니다.", "success");
        				}
        				else if (this._pendingType === "sub")
        				{
        					var mainId = this.ds_in.getColumn(0, "MAIN_CATE_ID");
        					var mainRow = this.ds_category.findRow("cate_id", "M" + mainId);
        					if (mainRow >= 0)
        					{
        						this.ds_category.setColumn(mainRow, "expanded", "Y");

        						// 하위 중분류 재구성
        						var insertPos = mainRow;
        						for (var k = 0; k < this.ds_subCate.getRowCount(); k++) {
        							if (String(this.ds_subCate.getColumn(k, "MAIN_CATE_ID")) === String(mainId)) {
        								insertPos++;
        								var r2 = this.ds_category.insertRow(insertPos);
        								this.ds_category.setColumn(r2, "cate_id", "S" + this.ds_subCate.getColumn(k, "SUB_CATE_ID"));
        								this.ds_category.setColumn(r2, "parent_id", "M" + mainId);
        								this.ds_category.setColumn(r2, "cate_name", "   📁 " + this.ds_subCate.getColumn(k, "SUB_CATE_NM"));
        								this.ds_category.setColumn(r2, "type", "sub");
        							}
        						}

        						var newSubId = this.ds_subCate.getColumn(this.ds_subCate.getRowCount() - 1, "SUB_CATE_ID");
        						var subRow = this.ds_category.findRow("cate_id", "S" + newSubId);
        						if (subRow >= 0) {
        							this.grd_category.selectRow(subRow);
        							this.fn_showDetail(subRow);

        							var mainName = this.ds_mainCate.lookup("MAIN_CATE_ID", mainId, "MAIN_CATE_NM");
        							var subName  = this.ds_subCate.lookup("SUB_CATE_ID", newSubId, "SUB_CATE_NM");
        							this.st_path.set_text("대분류 > " + mainName + " > " + subName);
        						}
        					}
        					this.fn_notify("중분류가 등록되었습니다.", "success");
        				}
        			}


        			/***********************
        			* UPDATE (insert 방식 동일하게 처리)
        			***********************/
        			else if (this._pendingAction === "update") {
        				this.fn_notify("수정이 완료되었습니다.", "success");

        				var type   = this._pendingType;
        				var mainId = this.ds_in.getColumn(0, "MAIN_CATE_ID");
        				var subId  = this.ds_in.getColumn(0, "SUB_CATE_ID");

        				// 🔹 중분류 수정 시 누락된 mainId 보정
        				if (!mainId && type === "sub") {
        					var sRow = this.ds_subCate.findRow("SUB_CATE_ID", subId);
        					if (sRow >= 0) {
        						mainId = this.ds_subCate.getColumn(sRow, "MAIN_CATE_ID");
        					}
        				}

        				// 대분류 수정 또는 중분류 수정 모두 '펼치기' 처리
        				var mainRow = this.ds_category.findRow("cate_id", "M" + mainId);
        				if (mainRow >= 0) {
        					// 부모 대분류 펼치기
        					this.ds_category.setColumn(mainRow, "expanded", "Y");

        					// 하위 중분류 재구성 (모든 update에서 공통)
        					var insertPos = mainRow;
        					for (var k = 0; k < this.ds_subCate.getRowCount(); k++) {
        						if (String(this.ds_subCate.getColumn(k, "MAIN_CATE_ID")) === String(mainId)) {
        							insertPos++;
        							var r2 = this.ds_category.insertRow(insertPos);
        							this.ds_category.setColumn(r2, "cate_id", "S" + this.ds_subCate.getColumn(k, "SUB_CATE_ID"));
        							this.ds_category.setColumn(r2, "parent_id", "M" + mainId);
        							this.ds_category.setColumn(r2, "cate_name", "   📁 " + this.ds_subCate.getColumn(k, "SUB_CATE_NM"));
        							this.ds_category.setColumn(r2, "type", "sub");
        						}
        					}

        					// 중분류 수정 시
        					if (type === "sub") {
        						var subRow = this.ds_category.findRow("cate_id", "S" + subId);
        						if (subRow >= 0) {
        							this.grd_category.selectRow(subRow);
        							this.fn_showDetail(subRow);

        							var mainName = this.ds_mainCate.lookup("MAIN_CATE_ID", mainId, "MAIN_CATE_NM");
        							var subName  = this.ds_in.getColumn(0, "SUB_CATE_NM");
        							this.st_path.set_text("대분류 > " + mainName + " > " + subName);
        						}
        					}
        					// 대분류 수정 시
        					else if (type === "main") {
        						this.grd_category.selectRow(mainRow);
        						this.fn_showDetail(mainRow);

        						var mainName = this.ds_in.getColumn(0, "MAIN_CATE_NM");
        						this.st_path.set_text("대분류 > " + mainName);
        					}
        				}
        			}


        			/***********************
        			* DELETE
        			***********************/
        			else if (this._pendingAction === "delete")
        			{
        				this.fn_notify("삭제가 완료되었습니다.", "success");
        				this.st_path.set_text("카테고리를 선택하세요.");
        			}

        			/***********************
        			* 상태 초기화
        			***********************/
        			this._needRefresh = false;
        			this._insertMode = null;
        			this._pendingAction = null;
        			this._pendingType = null;
        		}
        		break;
            }
        };






        /***************************************************
        * 재조회
        ***************************************************/
        this.fn_reloadTree = function()
        {
            this.transaction(
                "selectMainCategoryByAdmin",
                "svc::selectMainCategoryByAdmin.do?time=" + new Date().getTime(),
                "",
                "ds_mainCate=ds_mainCate",
                "",
                "fn_callback",
                true
            );
        };




        /***************************************************
        * 수정 버튼 클릭
        ***************************************************/
        this.btn_edit_onclick = function()
        {
            var row = this.grd_category.currentrow;
            if (row < 0) {
                this.alert("수정할 항목을 선택하세요.");
                return;
            }

            // 현재 선택된 카테고리의 상세정보를 수정 모드로 전환
            this.fn_setMode("edit");
            this.fn_notify("분류명을 수정 후 [저장]을 누르세요.", "success");
        };

        //취소
        this.btn_cancel_onclick = function(obj,e)
        {
           this.alert("저장이 취소 되었습니다.");
           this.div_detail.form.edt_cateName.set_value("");
           this.div_detail.form.edt_sort.set_value("");
           this.fn_notify("취소 완료", "success");

        };
        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_ProductCate_onload,this);
            this.addEventHandler("ontimer",this.Form_ProductCate_ontimer,this);
            this.btn_addMain.addEventHandler("onclick",this.btn_addMain_onclick,this);
            this.btn_addSub.addEventHandler("onclick",this.btn_addSub_onclick,this);
            this.btn_edit.addEventHandler("onclick",this.btn_edit_onclick,this);
            this.btn_delete.addEventHandler("onclick",this.btn_delete_onclick,this);
            this.grd_category.addEventHandler("oncellclick",this.grd_category_oncellclick,this);
            this.btn_saveDetail.addEventHandler("onclick",this.btn_saveDetail_onclick,this);
            this.btn_cancel.addEventHandler("onclick",this.btn_cancel_onclick,this);
        };
        this.loadIncludeScript("Form_ProductCate.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
