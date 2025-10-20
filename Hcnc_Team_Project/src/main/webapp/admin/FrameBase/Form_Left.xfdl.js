(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_Left");
            this.set_titletext("Form_Left");
            this.set_scrolltype("none");
            if (Form == this.constructor)
            {
                this._setFormPosition(200,570);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_left", this);
            obj._setContents("<ColumnInfo><Column id=\"MENU_ID\" type=\"STRING\" size=\"256\"/><Column id=\"MENU_NM\" type=\"STRING\" size=\"256\"/><Column id=\"MENU_LEVEL\" type=\"INT\" size=\"10\"/><Column id=\"MENU_PATH\" type=\"STRING\" size=\"256\"/><Column id=\"CSSCLASS\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Grid("Grid00","0","0",null,null,"0","0",null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_binddataset("ds_left");
            obj.set_treeusebutton("no");
            obj.set_treeusecheckbox("false");
            obj.set_treeuseline("false");
            obj.set_treeuseimage("false");
            obj.set_autofittype("col");
            obj.set_border("0px");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"206\"/></Columns><Rows><Row size=\"41\"/></Rows><Band id=\"body\"><Cell text=\"bind:MENU_NM\" displaytype=\"treeitemcontrol\" edittype=\"tree\" treelevel=\"bind:MENU_LEVEL\" cssclass=\"expr:(MENU_LEVEL==0?&apos;parent&apos;:(MENU_LEVEL==1?&apos;child&apos;:&apos;&apos;))\" border=\"0px\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Div("Div00","-40","0",null,"3","-60",null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_boxShadow("inset 0px 2px 2px 2px rgba(229,229,229,0.15)");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","Desktop_screen",200,570,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Form_Left.xfdl", function() {
        this.Form_Left_onload = function(obj, e)
        {
            this.fnGetLeftMenu();   // 좌측 메뉴 초기 로드
        };

        // 좌측 메뉴 데이터 로드 (TreeLevel 세팅)
        this.fnGetLeftMenu = function()
        {
            var objApp    = nexacro.getApplication();
            var objDsMenu = objApp.gds_menu;

            // 모든 메뉴 가져오기 (LEVEL 있는 상태)
            this.ds_left.copyData(objDsMenu, true);

            // 트리 뷰어용 TreeLevel 컬럼 값 강제 세팅
            for (var i = 0; i < this.ds_left.getRowCount(); i++) {
                var sMenuId = this.ds_left.getColumn(i, "MENU_ID");
                if (sMenuId.length == 2) {
                    this.ds_left.setColumn(i, "MENU_LEVEL", 0);   // 루트
                    this.ds_left.setColumn(i, "CSSCLASS", "parent");
                } else if (sMenuId.length == 4) {
                    this.ds_left.setColumn(i, "MENU_LEVEL", 1);   // 자식
        			this.ds_left.setColumn(i, "CSSCLASS", "child");
                }
            }
        };

        // 그리드 셀 클릭 이벤트
        this.Grid00_oncellclick = function(obj, e)
        {
            var sMenuId = this.ds_left.getColumn(e.row, "MENU_ID");

            // 부모 (2자리)
            if (sMenuId.length == 2) {
                // 현재 row 기준으로 자식 있는지 검사
                var hasChild = false;
                for (var i = 0; i < this.ds_left.getRowCount(); i++) {
                    var childId = this.ds_left.getColumn(i, "MENU_ID");
                    if (childId.indexOf(sMenuId) == 0 && childId.length == 4) {
                        hasChild = true;
                        break;
                    }
                }

                if (hasChild) {
                    // ⭐ 트리 토글 (아코디언 방식)
                    this.fnToggleTreeAccordion(obj, e.row, sMenuId);
                } else {
                    // 자식이 없으면 바로 메뉴 실행
                    this.fnOpenMenu(sMenuId);
                }
            }
            // 자식 (4자리) → 화면 실행
            else if (sMenuId.length == 4) {
                this.fnOpenMenu(sMenuId);
            }
        };

        // ⭐ 아코디언 방식 트리 토글
        this.fnToggleTreeAccordion = function(obj, nRow, sMenuId)
        {
            var rowTree   = obj.getTreeRow(nRow);
            var currState = obj.getTreeStatus(rowTree);

            if (currState == 3) return; // leaf 노드면 무시

            var bWasOpen = (currState == 1); // 현재 열려있는지 확인

            // 클릭한 메뉴가 원래 닫혀있었으면 먼저 열기
            if (!bWasOpen) {
                obj.setTreeStatus(rowTree, 1);
            }

            // 다른 부모 메뉴들만 닫기 (현재 클릭한 것 제외!)
            for (var i = 0; i < this.ds_left.getRowCount(); i++) {
                var checkMenuId = this.ds_left.getColumn(i, "MENU_ID");

                // 2자리 메뉴(부모)이고, 현재 클릭한 메뉴가 아닌 것만
                if (checkMenuId.length == 2 && checkMenuId != sMenuId) {
                    var checkRow = obj.getTreeRow(i);
                    var checkState = obj.getTreeStatus(checkRow);

                    // 열려있으면 닫기
                    if (checkState == 1) {
                        obj.setTreeStatus(checkRow, 0);
                    }
                }
            }

            // 같은 메뉴를 다시 클릭했으면 닫기
            if (bWasOpen) {
                obj.setTreeStatus(rowTree, 0);
            }
        };

        // 메뉴 실행
        this.fnOpenMenu = function(sMenuId)
        {
            var objApp = nexacro.getApplication();

            var nFRow = this.ds_left.findRow("MENU_ID", sMenuId);
            if (nFRow < 0) return;

            var sMenuPath = this.ds_left.getColumn(nFRow, "MENU_PATH");
            var sMenuNm = this.ds_left.getColumn(nFRow, "MENU_NM");

            if (!sMenuPath || sMenuPath == "[Undefined]") {
                trace("메뉴 경로가 정의되지 않음: " + sMenuId);
                return;
            }

            // 부모 메뉴명 찾기
            var sParentMenuNm = "";
            if (sMenuId.length == 4) {
                // 4자리 메뉴인 경우 부모(2자리) 찾기
                var sParentMenuId = sMenuId.substring(0, 2);
                var nParentRow = this.ds_left.findRow("MENU_ID", sParentMenuId);
                if (nParentRow >= 0) {
                    sParentMenuNm = this.ds_left.getColumn(nParentRow, "MENU_NM");
                }
            }

            // WorkFrame에 폼 로드
            objApp.mainframe.VFrameSet00.HFrameSet00.VFrameSet01.WorkFrame.set_formurl(sMenuPath);

            // TitleFrame에 메뉴명과 부모 메뉴명 전달
            if (objApp.mainframe.VFrameSet00.HFrameSet00.VFrameSet01.TitleFrame.form.fn_setTitle) {
                objApp.mainframe.VFrameSet00.HFrameSet00.VFrameSet01.TitleFrame.form.fn_setTitle(sMenuNm, sParentMenuNm);
            }
        };
        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_Left_onload,this);
            this.Grid00.addEventHandler("oncellclick",this.Grid00_oncellclick,this);
        };
        this.loadIncludeScript("Form_Left.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
