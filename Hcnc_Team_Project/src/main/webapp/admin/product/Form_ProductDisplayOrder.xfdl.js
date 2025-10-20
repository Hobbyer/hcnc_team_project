(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_ProductDisplayOrder");
            this.set_titletext("상품 진열순서 관리");
            this.set_background("#f4f7fe");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,800);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_out_proList", this);
            obj._setContents("<ColumnInfo><Column id=\"SORT_NUMBER\" type=\"INT\"/><Column id=\"PRODUCT_ID\" type=\"INT\"/><Column id=\"PRODUCT_CODE\" type=\"STRING\"/><Column id=\"PRODUCT_NAME\" type=\"STRING\"/><Column id=\"MAIN_CATE_NM\" type=\"STRING\"/><Column id=\"SUB_CATE_NM\" type=\"STRING\"/><Column id=\"IS_VISIBLE\" type=\"STRING\"/><Column id=\"INPUT_DT\" type=\"DATETIME\"/><Column id=\"TOTAL_QUANTITY\" type=\"INT\"/><Column id=\"OUT_OF_STOCK\" type=\"STRING\"/><Column id=\"OPTION_LIST\" type=\"STRING\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_sortSave", this);
            obj._setContents("<ColumnInfo><Column id=\"PRODUCT_ID\" type=\"INT\"/><Column id=\"SORT_NUMBER\" type=\"INT\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Button("btn_save","1090","11","150","49",null,null,null,null,null,null,this);
            obj.set_text("진열 순서 변경");
            obj.set_background("#000000");
            obj.set_color("#ffffff");
            obj.set_borderRadius("6px");
            obj.set_font("bold 12px \'Gulim\'");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);

            obj = new Tab("tabDisplay","40","21","210","35",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_tabindex("0");
            obj.set_font("bold 10pt/normal \"Arial\"");
            obj.set_borderRadius("1px");
            obj.set_cursor("pointer");
            obj.set_cssclass("Tab");
            this.addChild(obj.name, obj);

            obj = new Tabpage("tab_new",this.tabDisplay);
            obj.set_text("신상품");
            obj.set_background("transparent");
            obj.set_color("transparent");
            this.tabDisplay.addChild(obj.name, obj);

            obj = new Tabpage("tab_recommend",this.tabDisplay);
            obj.set_text("추천상품");
            obj.set_background("#ffffff");
            obj.set_color("#000000");
            this.tabDisplay.addChild(obj.name, obj);

            obj = new Tabpage("tab_nomal",this.tabDisplay);
            obj.set_text("일반상품");
            obj.set_background("#ffffff");
            obj.set_color("#000000");
            this.tabDisplay.addChild(obj.name, obj);

            obj = new Grid("grid_list","40","91","1200","570",null,null,null,null,null,null,this);
            obj.set_binddataset("ds_out_proList");
            obj.set_cssclass("GridDisplayOrder");
            obj.set_autofittype("col");
            obj.set_taborder("2");
            obj.set_cellmovingtype("none");
            obj.set_border("1px solid #000000");
            obj.set_useselcolor("false");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"110\"/><Column size=\"83\"/><Column size=\"200\"/><Column size=\"105\"/><Column size=\"105\"/><Column size=\"54\"/><Column size=\"100\"/><Column size=\"60\"/><Column size=\"73\"/><Column size=\"297\"/></Columns><Rows><Row size=\"44\" band=\"head\"/><Row size=\"34\"/></Rows><Band id=\"head\"><Cell text=\"SORT_NUMBER&#13;&#10;높을수록 상위\" background=\"#000000\" color=\"#ffffff\" font=\"bold 12px/normal &quot;Arial&quot;\" border=\"1px solid #cccccc\"/><Cell col=\"1\" text=\"상품코드\" background=\"#000000\" color=\"#ffffff\" font=\"bold 12px/normal &quot;Arial&quot;\" border=\"1px solid #cccccc\"/><Cell col=\"2\" text=\"상품명\" background=\"#000000\" color=\"#ffffff\" font=\"bold 12px/normal &quot;Arial&quot;\" border=\"1px solid #cccccc\"/><Cell col=\"3\" text=\"대분류\" background=\"#000000\" color=\"#ffffff\" font=\"bold 12px/normal &quot;Arial&quot;\" border=\"1px solid #cccccc\"/><Cell col=\"4\" text=\"중분류\" background=\"#000000\" color=\"#ffffff\" font=\"bold 12px/normal &quot;Arial&quot;\" border=\"1px solid #cccccc\"/><Cell col=\"5\" text=\"진열\" background=\"#000000\" color=\"#ffffff\" font=\"bold 12px/normal &quot;Arial&quot;\" border=\"1px solid #cccccc\"/><Cell col=\"6\" text=\"등록일\" background=\"#000000\" color=\"#ffffff\" font=\"bold 12px/normal &quot;Arial&quot;\" border=\"1px solid #cccccc\"/><Cell col=\"7\" text=\"재고수량\" background=\"#000000\" color=\"#ffffff\" font=\"bold 12px/normal &quot;Arial&quot;\" border=\"1px solid #cccccc\"/><Cell col=\"8\" text=\"품절여부\" background=\"#000000\" color=\"#ffffff\" font=\"bold 12px/normal &quot;Arial&quot;\" border=\"1px solid #cccccc\"/><Cell col=\"9\" text=\"옵션\" background=\"#000000\" color=\"#ffffff\" font=\"bold 12px/normal &quot;Arial&quot;\" border=\"1px solid #cccccc\"/></Band><Band id=\"body\"><Cell text=\"bind:SORT_NUMBER\" textAlign=\"center\" background=\"#ffffff\" color=\"#000000\" border=\"1px solid #cccccc\"/><Cell col=\"1\" text=\"bind:PRODUCT_CODE\" textAlign=\"center\" background=\"#ffffff\" color=\"#000000\" border=\"1px solid #cccccc\"/><Cell col=\"2\" text=\"bind:PRODUCT_NAME\" textAlign=\"left\" background=\"#ffffff\" color=\"#000000\" border=\"1px solid #cccccc\"/><Cell col=\"3\" text=\"bind:MAIN_CATE_NM\" textAlign=\"center\" background=\"#ffffff\" color=\"#000000\" border=\"1px solid #cccccc\"/><Cell col=\"4\" text=\"bind:SUB_CATE_NM\" textAlign=\"center\" background=\"#ffffff\" color=\"#000000\" border=\"1px solid #cccccc\"/><Cell col=\"5\" text=\"bind:IS_VISIBLE\" textAlign=\"center\" background=\"#ffffff\" color=\"#000000\" border=\"1px solid #cccccc\"/><Cell col=\"6\" text=\"bind:INPUT_DT\" displaytype=\"date\" background=\"#ffffff\" color=\"#000000\" border=\"1px solid #cccccc\"/><Cell col=\"7\" text=\"bind:TOTAL_QUANTITY\" textAlign=\"right\" background=\"#ffffff\" color=\"#000000\" border=\"1px solid #cccccc\"/><Cell col=\"8\" text=\"bind:OUT_OF_STOCK\" textAlign=\"center\" background=\"#ffffff\" color=\"#000000\" border=\"1px solid #cccccc\"/><Cell col=\"9\" text=\"bind:OPTION_LIST\" background=\"#ffffff\" color=\"#000000\" border=\"1px solid #cccccc\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("stc_mv","635","11","605","45",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("\" 메인 상품의  진열 순서 관리 이므로 일반상품은 조회만 가능합니다.\"");
            obj.set_font("bold 10pt \"Arial\"");
            obj.set_textAlign("center");
            obj.set_border("1px dashed black");
            obj.set_visible("false");
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
        this.addIncludeScript("Form_ProductDisplayOrder.xfdl","common::common.xjs");
        this.registerScript("Form_ProductDisplayOrder.xfdl", function() {
        this.executeIncludeScript("common::common.xjs"); /*include "common::common.xjs"*/;

        this.Form_ProductDisplayOrder_onload = function(obj,e){
            this.tabDisplay.set_tabindex(0);
            this.fn_search("new");
        	this.trace(this.grid_list.cssclass);

        	this.grid_list.set_userstatus("displayorder", true);

        };





        //탭부분
        this.tabDisplay_onchanged = function(obj,e){

            // 기존 조회 로직 유지
            if (obj.tabindex == 0) {
        		this.btn_save.set_visible(true);
        		this.stc_mv.set_visible(false);
        		this.fn_search("new");
            }
        	else if (obj.tabindex == 1){
        		this.btn_save.set_visible(true);
        		this.stc_mv.set_visible(false);
        		this.fn_search("recommend");
        	}
            else if (obj.tabindex == 2) {
        		this.btn_save.set_visible(false);
        		this.stc_mv.set_visible(true);
        		this.fn_search("normal");

        	}
        };





        this.fn_search = function(displayType){
            this._displayType = displayType;
            this.transaction(
                "productDisplayOrderListByAdmin",
                "svc::productDisplayOrderListByAdmin.do?time=" + new Date().getTime(),
                "",
                "ds_out_proList=ds_out_proList",
                "displayType=" + displayType,
                "fn_callback"
            );
        };



        var preRow = -1;
        var dragging = false;	// 드래그 중인지 여부
        var defaultColor = "#FFFFFF" // 원색상
        var draggingColor = "#a1dcff"	// 드래그중색
        var selectedColor = "#6ac7fc" 	// 최종색


        /***************************************************
        * 드래그앤드롭 구현 (유령 박스 - 상품명만, 행 색상)
        ***************************************************/

        //  this.grid_list_onmousedown = function(obj:nexacro.Grid,e:nexacro.GridMouseEventInfo)
        // {
        // 		var curRow = e.row;
        //
        // };
        //


        // 드래그 시작
        this.grid_list_onlbuttondown = function(obj, e)
        {
        	if (this.tabDisplay.tabindex == 2) return;

            if (e.row >= 0) {
                this._dragRow = e.row;

                var ghostText = this.ds_out_proList.getColumn(e.row, "PRODUCT_NAME");

                if (this.st_ghost) {
                    this.removeChild("st_ghost");
                    this.st_ghost = null;
                }

                var rowHeight = obj.getRealRowSize(e.row);
                var formX = obj.getOffsetLeft() + e.canvasx;
                var formY = obj.getOffsetTop() + e.canvasy;

                var ghost = new Static("st_ghost", "absolute",
                    formX, formY, 60, rowHeight, null, null);

                ghost.set_text(ghostText);
                ghost.set_background("#d9fcf9");
                ghost.set_border("2px solid #0080ff");
                ghost.set_borderRadius("8px");
                ghost.set_textAlign("center");
                ghost.set_opacity(0.85);
                ghost.set_font("bold 10pt Arial");


                this.addChild("st_ghost", ghost);
                ghost.show();
                ghost.bringToFront();

                this.st_ghost = ghost;
                this._isDragging = true;
            }
        };







        // 드래그 중 → 유령박스 이동
        this.grid_list_onmousemove = function(obj, e)
        {
            if (this._isDragging && this.st_ghost) {
                var newX = e.canvasx+40;
                var newY = e.canvasy+10;
                this.st_ghost.move(newX, newY, this.st_ghost.width, this.st_ghost.height);
            }


        };

        // 드래그 끝 → 행 이동
        this.grid_list_onlbuttonup = function(obj, e)
        {


            if (this._isDragging && this._dragRow >= 0 && e.row >= 0) {
                var from = this._dragRow;
                var to   = e.row;
                if (from != to) {
                    this.ds_out_proList.moveRow(from, to);
                }
            }

            if (this.st_ghost) {
                this.removeChild("st_ghost");
                this.st_ghost = null;
            }

            this._isDragging = false;
            this._dragRow = -1;
        };

        // 드롭 후 순번만 재정렬 (저장은 안 함)
        this.grid_list_ondrop = function(obj, e)
        {
            if (this._dragRow == null || e.row < 0) return;

            var fromRow = this._dragRow;
            var toRow   = e.row;
            this.ds_out_proList.moveRow(fromRow, toRow);

            this._dragRow = null;
        };



        // 저장 버튼 클릭
        this.btn_save_onclick = function(obj,e)
        {
            var total = this.ds_out_proList.getRowCount();
            this.ds_sortSave.clearData();  // 저장용 데이터셋 초기화

            for (var i=0; i<total; i++) {
                var newSort = (i < 16) ? (16 - i) : 0;
                var oldSort = this.ds_out_proList.getColumn(i, "SORT_NUMBER");

                if (oldSort != newSort) {
                    this.ds_out_proList.setColumn(i, "SORT_NUMBER", newSort);

                    var row = this.ds_sortSave.addRow();
                    this.ds_sortSave.setColumn(row, "PRODUCT_ID", this.ds_out_proList.getColumn(i, "PRODUCT_ID"));
                    this.ds_sortSave.setColumn(row, "SORT_NUMBER", newSort);
                }
            }

            if (this.ds_sortSave.getRowCount() == 0) {
                this.alert("변경된 내용이 없습니다.");
                return;
            }

            this.transaction(
                "updateProductSort",
                "svc::updateProductSort.do",
                "ds_sortSave=ds_sortSave",   // 저장용 Dataset만 전송
                "",
                "displayType=" + this._displayType,
                "fn_callback"
            );
        };




        // 콜백
        this.fn_callback = function(svcID, errCode, errMsg){
            if (errCode < 0) {
                this.alert("오류: " + errMsg);
                return;
            }
            if (svcID == "updateProductSort") {
                this.alert("진열순서 변경 완료!");
                this.fn_search(this._displayType);
            }
        };







        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_ProductDisplayOrder_onload,this);
            this.btn_save.addEventHandler("onclick",this.btn_save_onclick,this);
            this.tabDisplay.addEventHandler("onchanged",this.tabDisplay_onchanged,this);
            this.grid_list.addEventHandler("ondrop",this.grid_list_ondrop,this);
            this.grid_list.addEventHandler("onlbuttonup",this.grid_list_onlbuttonup,this);
            this.grid_list.addEventHandler("onlbuttondown",this.grid_list_onlbuttondown,this);
            this.grid_list.addEventHandler("onmousemove",this.grid_list_onmousemove,this);
            this.grid_list.addEventHandler("oncellclick",this.grid_list_oncellclick,this);
            this.grid_list.addEventHandler("onmousedown",this.grid_list_onmousedown,this);
            this.stc_mv.addEventHandler("onclick",this.Static00_onclick,this);
        };
        this.loadIncludeScript("Form_ProductDisplayOrder.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
