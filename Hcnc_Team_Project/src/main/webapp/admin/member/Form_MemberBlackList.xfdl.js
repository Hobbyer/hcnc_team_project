(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_MemberBlackList");
            this.set_titletext("New Form");
            this.set_background("#F4F7FE");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_list", this);
            obj._setContents("<ColumnInfo><Column id=\"MEMBER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"USER_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"EMAIL_ADDR\" type=\"STRING\" size=\"256\"/><Column id=\"UPDATE_DT\" type=\"STRING\" size=\"256\"/><Column id=\"INPUT_DT\" type=\"STRING\" size=\"256\"/><Column id=\"PHONE_NUMBER\" type=\"STRING\" size=\"256\"/><Column id=\"GRADE_NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_search", this);
            obj._setContents("<ColumnInfo><Column id=\"USER_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"MEMBER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"PHONE_NUMBER\" type=\"STRING\" size=\"256\"/><Column id=\"START_INPUT_DT\" type=\"STRING\" size=\"256\"/><Column id=\"END_INPUT_DT\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Static("black_search_box","40","17",null,"113","40",null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_background("white");
            obj.set_text("");
            obj.set_borderRadius("8px");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_00","273","36","46","27",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("아이디");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            obj.set_textAlign("center");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_00_00","35","35","32","27",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("이름");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            obj.set_textAlign("center");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_00_00_00","520","35","60","27",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("전화번호");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            obj.set_textAlign("center");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit00","98","36","172","29",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_borderRadius("8px");
            obj.set_border("1px solid black");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit00_00","340","36","170","28",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_borderRadius("8px");
            obj.set_border("1px solid black");
            this.addChild(obj.name, obj);

            obj = new Button("search_btn","570","85","90","35",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_text("검색하기");
            obj.set_background("#667eea");
            obj.set_borderRadius("8px");
            obj.set_color("#ffffff");
            obj.set_font("11px/normal \"Noto Sans KR Black\"");
            obj.set_border("0px solid #667eea");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);

            obj = new Button("Button01","670","85","100","35",null,null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_text("초기화");
            obj.set_background(" #f5f5f5");
            obj.set_borderRadius("8px");
            obj.set_font("11px/normal \"Noto Sans KR Black\"");
            obj.set_border("1px solid #e0e0e0");
            obj.set_color("#666666");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);

            obj = new Grid("black_list","40","140","1200",null,null,"20",null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_background("#FFFFFF");
            obj.set_border("0px none");
            obj.set_borderRadius("10px");
            obj.set_autofittype("col");
            obj.set_binddataset("ds_list");
            obj.set_autosizebandtype("body");
            obj.set_cellclickbound("control");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"52\"/><Column size=\"165\"/><Column size=\"131\"/><Column size=\"156\"/><Column size=\"108\"/><Column size=\"104\"/><Column size=\"186\"/><Column size=\"206\"/><Column size=\"90\"/></Columns><Rows><Row size=\"48\" band=\"head\"/><Row size=\"40\"/></Rows><Band id=\"head\"><Cell text=\"NO\" textAlign=\"CENTER\" font=\"11pt/normal &quot;LG Smart UI Bold&quot;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"1\" text=\"아이디\" textAlign=\"CENTER\" font=\"11pt/normal &quot;LG Smart UI Bold&quot;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"2\" text=\"이름\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"3\" text=\"이메일\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"4\" text=\"전화번호\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"5\" text=\"등급\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"6\" text=\"블랙처리일\" textAlign=\"CENTER\" font=\"11pt/normal &quot;LG Smart UI Bold&quot;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"7\" text=\"가입일\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\" font=\"11pt/normal &quot;LG Smart UI Bold&quot;\"/><Cell col=\"8\" text=\"관리\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\" font=\"11pt/normal &quot;LG Smart UI Bold&quot;\"/></Band><Band id=\"body\"><Cell text=\"expr:currow + 1\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"1\" text=\"bind:MEMBER_ID\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"2\" text=\"bind:USER_NAME\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"3\" text=\"bind:EMAIL_ADDR\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"4\" text=\"bind:PHONE_NUMBER\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\" textAlign=\"center\" displaytype=\"mask\" edittype=\"mask\" maskedittype=\"string\" maskeditformat=\"###-####-####\"/><Cell col=\"5\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\" text=\"bind:GRADE_NAME\" textAlign=\"center\"/><Cell col=\"6\" text=\"bind:UPDATE_DT\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"7\" text=\"bind:INPUT_DT\" displaytype=\"normal\" edittype=\"none\" combocodecol=\"GRADE_CODE\" combodatacol=\"GRADE_NAME\" combodataset=\"ds_grade\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\" textAlign=\"center\"/><Cell col=\"8\" displaytype=\"buttoncontrol\" edittype=\"button\" text=\"신고 내역\" font=\"12px/normal &quot;LG Smart UI Bold&quot;\" textAlign=\"center\" color=\"red\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new MaskEdit("MaskEdit00","590","34","180","32",null,null,null,null,null,null,this);
            obj.set_taborder("9");
            obj.set_format("###-####-####");
            obj.set_limitbymask("none");
            obj.set_type("string");
            obj.set_border("1px solid black");
            obj.set_borderRadius("8px");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_00_00_00_00","780","37","60","27",null,null,null,null,null,null,this);
            obj.set_taborder("10");
            obj.set_text("가입일");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            obj.set_textAlign("center");
            this.addChild(obj.name, obj);

            obj = new Calendar("Calendar00","840","34","170","31",null,null,null,null,null,null,this);
            obj.set_taborder("11");
            obj.set_border("1px solid black");
            obj.set_borderRadius("8px");
            this.addChild(obj.name, obj);

            obj = new Calendar("Calendar01","1040","36","170","30",null,null,null,null,null,null,this);
            obj.set_taborder("12");
            obj.set_border("1px solid black");
            obj.set_borderRadius("8px");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","1020","38","20","22",null,null,null,null,null,null,this);
            obj.set_taborder("13");
            obj.set_text("~");
            obj.set_font("bold 14px/normal \"Gulim\"");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1280,720,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item0","black_list","binddataset","ds_list","");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item1","Edit00","value","ds_search","USER_NAME");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item2","Edit00_00","value","ds_search","MEMBER_ID");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item3","MaskEdit00","value","ds_search","PHONE_NUMBER");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item4","Calendar00","value","ds_search","START_INPUT_DT");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item5","Calendar01","value","ds_search","END_INPUT_DT");
            this.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Form_MemberBlackList.xfdl", function() {
        this.Form_MemberBlackList_onload = function(obj,e)
        {
        	this.fn_selectBlackList();
        };


        //블랙 리스트 조회
        this.fn_selectBlackList= function(){

        	var strSvcID = "selectBlackList"
        	var setURL = "svc::/selectBlackListByAdmin.do?time=" + new Date().getTime();
        	var strInDatasets = "ds_search=ds_search";
        	var strOutDatasets = "ds_list=ds_list";
        	var strArg = "";
        	var callBack = "fn_callBack";
        	var inAsync = true;

        	this.transaction(strSvcID,setURL,strInDatasets,strOutDatasets,strArg,callBack,inAsync);
        }


        // 공통 콜백
        this.fn_callBack = function(svcID, errorCode, errorMSG){

        	if(errorCode == -1){
        		this.alert(errorMSG)
        	}

        	switch(svcID){
        	case "selectBlackList" :
        		console.log(this.ds_list.saveXML());
        		break;

        	}

        }

        //검색하기
        this.search_btn_onclick = function(obj,e)
        {
        	this.fn_selectBlackList();
        };

        //초기화
        this.Button01_onclick = function(obj,e)
        {
        	this.reload();
        };

        //블랙리스트 팝업
        this.black_list_oncellclick = function(obj,e)
        {
        	//this.alert(e.cell)

        	if(e.cell == 8){

        		var memberId = this.ds_list.getColumn(e.row, "MEMBER_ID");

        		var surl = "member::Form_MemberBlackListDetail.xfdl";
        		var param = { MEMBER_ID: memberId };

        		// 디버깅용 로그 추가
        		trace("팝업 호출 시 전달할 MEMBER_ID: " + memberId);

        		var popup = new nexacro.ChildFrame();
        		popup.init("updatePop", 0, 0, 800, 700, null, null, surl);
        		popup.set_dragmovetype("all");
        		popup.set_showtitlebar(true);
        		popup.set_titletext("블랙리스트 상세보기");

        		// 두 번째 인자로 param을 전달
        		popup.showModal(this.getOwnerFrame(), param, this, "fn_popCallback");

        	}
        };

        //팝업 콜백
        this.fn_popCallback = function(svcID, strVal){
        	switch(svcID){
        	case "updatePop":
        		this.fn_selectBlackList();
        		break;
        	}
        };

        //이름 검색하면 바로 조회
        this.Edit00_onkeyup = function(obj,e)
        {
        	if(e.keycode == 13){
        		this.fn_selectBlackList();
        	}
        };

        //아이디 검색하면 바로 조회
        this.Edit00_00_onkeyup = function(obj,e)
        {
        	if(e.keycode == 13){
        		this.fn_selectBlackList();
        	}
        };

        //전화번호 검색하면 바로 조회
        this.MaskEdit00_onkeyup = function(obj,e)
        {
        	if(e.keycode == 13){
        		this.fn_selectBlackList();
        	}
        };

        //시작일
        this.Calendar00_onchanged = function(obj,e)
        {
            // Div 안의 컴포넌트 참조 수정
            var startDate = this.black_search_box.form.Calendar00.value;
            var endDate   = this.black_search_box.form.Calendar01.value;

            if (!startDate) return;

            if (endDate && endDate < startDate) {
                this.alert("종료일은 시작일보다 빠를 수 없습니다.");
                this.black_search_box.form.Calendar01.set_value(startDate);
                endDate = startDate;
            }

            this.ds_search.setColumn(0, "START_INPUT_DT", startDate + "000000");

            if (endDate) {
                this.ds_search.setColumn(0, "END_INPUT_DT", endDate + "235959");
            }

            this.fn_selectBlackList()
        };

        //종료일
        this.Calendar01_onchanged = function(obj,e)
        {
            // Div 안의 컴포넌트 참조 수정
            var startDate = this.black_search_box.form.Calendar00.value;
            var endDate   = this.black_search_box.form.Calendar01.value;

            if (!endDate) return;

            if (startDate && endDate < startDate) {
                this.alert("종료일은 시작일보다 빠를 수 없습니다.");
                this.black_search_box.form.Calendar01.set_value(startDate);
                endDate = startDate;
            }

            this.ds_search.setColumn(0, "END_INPUT_DT", endDate + "235959");

            if (startDate) {
                this.ds_search.setColumn(0, "START_INPUT_DT", startDate + "000000");
            }

            this.fn_selectBlackList();
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_MemberBlackList_onload,this);
            this.Edit00.addEventHandler("onkeyup",this.Edit00_onkeyup,this);
            this.Edit00_00.addEventHandler("onkeyup",this.Edit00_00_onkeyup,this);
            this.search_btn.addEventHandler("onclick",this.search_btn_onclick,this);
            this.Button01.addEventHandler("onclick",this.Button01_onclick,this);
            this.black_list.addEventHandler("oncellclick",this.black_list_oncellclick,this);
            this.MaskEdit00.addEventHandler("onkeyup",this.MaskEdit00_onkeyup,this);
            this.Calendar00.addEventHandler("onchanged",this.Calendar00_onchanged,this);
            this.Calendar01.addEventHandler("onchanged",this.Calendar01_onchanged,this);
        };
        this.loadIncludeScript("Form_MemberBlackList.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
