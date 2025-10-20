(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_MemberList");
            this.set_titletext("New Form");
            this.set_background("#F4F7FE");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_search", this);
            obj._setContents("<ColumnInfo><Column id=\"SEARCH_TYPE\" type=\"STRING\" size=\"256\"/><Column id=\"SEARCH_TEXT\" type=\"STRING\" size=\"256\"/><Column id=\"GRADE_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"PHONE_NUMBER\" type=\"STRING\" size=\"256\"/><Column id=\"FIRST_LOGIN_DT\" type=\"STRING\" size=\"256\"/><Column id=\"LAST_LOGIN_DT\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_list", this);
            obj._setContents("<ColumnInfo><Column id=\"INPUT_DT\" type=\"STRING\" size=\"256\"/><Column id=\"USER_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"MEMBER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"EMAIL_ADDR\" type=\"STRING\" size=\"256\"/><Column id=\"GRADE_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"PHONE_NUMBER\" type=\"STRING\" size=\"256\"/><Column id=\"GENDER\" type=\"STRING\" size=\"256\"/><Column id=\"BIRTH\" type=\"STRING\" size=\"256\"/><Column id=\"MEMBER_TYPE\" type=\"STRING\" size=\"256\"/><Column id=\"STATUS\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_grade", this);
            obj._setContents("<ColumnInfo><Column id=\"GRADE_CODE\" type=\"STRING\" size=\"256\"/><Column id=\"GRADE_NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_info", this);
            obj._setContents("<ColumnInfo><Column id=\"SEARCH_TYPE\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"SEARCH_TYPE\">이름</Col></Row><Row><Col id=\"SEARCH_TYPE\">아이디</Col></Row><Row><Col id=\"SEARCH_TYPE\">이메일</Col></Row></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Grid("member_list","40","210","1200",null,null,"20",null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_background("#FFFFFF");
            obj.set_border("0px none");
            obj.set_borderRadius("10px");
            obj.set_autofittype("col");
            obj.set_binddataset("ds_list");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"44\"/><Column size=\"77\"/><Column size=\"90\"/><Column size=\"131\"/><Column size=\"157\"/><Column size=\"91\"/><Column size=\"144\"/><Column size=\"64\"/><Column size=\"152\"/><Column size=\"68\"/><Column size=\"155\"/><Column size=\"86\"/></Columns><Rows><Row size=\"48\" band=\"head\"/><Row size=\"40\"/></Rows><Band id=\"head\"><Cell text=\"NO\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"1\" text=\"권한\" textAlign=\"CENTER\" font=\"11pt/normal &quot;LG Smart UI Bold&quot;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"2\" text=\"이름\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"3\" text=\"아이디\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"4\" text=\"이메일\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"5\" text=\"등급\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"6\" text=\"휴대전화\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"7\" text=\"성별\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"8\" text=\"생년월일\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"9\" text=\"상태\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"10\" text=\"등록일\" textAlign=\"CENTER\" font=\"bold 11pt/normal &quot;LG Smart UI Bold&quot;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"11\" text=\"관리\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/></Band><Band id=\"body\"><Cell text=\"expr:currow + 1\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\" textAlign=\"center\"/><Cell col=\"1\" text=\"bind:MEMBER_TYPE\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\" textAlign=\"center\"/><Cell col=\"2\" text=\"bind:USER_NAME\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\" textAlign=\"center\"/><Cell col=\"3\" text=\"bind:MEMBER_ID\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\" textAlign=\"center\"/><Cell col=\"4\" text=\"bind:EMAIL_ADDR\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\" textAlign=\"center\"/><Cell col=\"5\" text=\"bind:GRADE_NAME\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\" textAlign=\"center\"/><Cell col=\"6\" edittype=\"mask\" text=\"bind:PHONE_NUMBER\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\" textAlign=\"center\" displaytype=\"mask\" maskeditformat=\"###-####-####\" maskedittype=\"string\"/><Cell col=\"7\" text=\"bind:GENDER\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\" textAlign=\"center\"/><Cell col=\"8\" edittype=\"normal\" text=\"bind:BIRTH\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"9\" edittype=\"normal\" text=\"bind:STATUS\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"10\" text=\"bind:INPUT_DT\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"11\" displaytype=\"buttoncontrol\" edittype=\"button\" text=\"상세\" font=\"11px/normal &quot;Noto Sans KR Black&quot;\" color=\"blue\" textAlign=\"center\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Div("search_box","40","12","1200","188",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("");
            obj.set_borderRadius("8px");
            obj.set_background("#fff");
            obj.set_boxShadow("0 2px 6px rgba(0,0,0,0.05)");
            this.addChild(obj.name, obj);

            obj = new Static("m","20","71","55","28",null,null,null,null,null,null,this.search_box.form);
            obj.set_taborder("0");
            obj.set_text("개인정보");
            obj.set_font("15px/normal \"Noto Sans KR Black\"");
            this.search_box.addChild(obj.name, obj);

            obj = new Static("m2","751","71","59","28",null,null,null,null,null,null,this.search_box.form);
            obj.set_taborder("1");
            obj.set_text("회원등급");
            obj.set_font("15px/normal \"Noto Sans KR Black\"");
            this.search_box.addChild(obj.name, obj);

            obj = new Static("Static00_00_00","480","71","60","28",null,null,null,null,null,null,this.search_box.form);
            obj.set_taborder("2");
            obj.set_text("휴대전화");
            obj.set_font("15px/normal \"Noto Sans KR Black\"");
            this.search_box.addChild(obj.name, obj);

            obj = new Static("Static00_00_00_00","30","128","40","28",null,null,null,null,null,null,this.search_box.form);
            obj.set_taborder("3");
            obj.set_text("접속일");
            obj.set_font("15px/normal \"Noto Sans KR Black\"");
            this.search_box.addChild(obj.name, obj);

            obj = new Combo("member_info","87","69","106","33",null,null,null,null,null,null,this.search_box.form);
            obj.set_taborder("4");
            obj.set_innerdataset("ds_info");
            obj.set_codecolumn("SEARCH_TYPE");
            obj.set_datacolumn("SEARCH_TYPE");
            obj.set_border("1px solid black");
            obj.set_borderRadius("8px");
            obj.set_font("12px/normal \"Noto Sans KR Black\"");
            obj.set_text("");
            this.search_box.addChild(obj.name, obj);

            obj = new Edit("Edit00","200","69","240","34",null,null,null,null,null,null,this.search_box.form);
            obj.set_taborder("5");
            obj.set_border("1px solid black");
            obj.set_borderRadius("8px");
            this.search_box.addChild(obj.name, obj);

            obj = new Combo("member_grade","820","68","160","35",null,null,null,null,null,null,this.search_box.form);
            obj.set_taborder("6");
            obj.set_innerdataset("ds_grade");
            obj.set_codecolumn("GRADE_NAME");
            obj.set_datacolumn("GRADE_NAME");
            obj.set_border("1px solid black");
            obj.set_borderRadius("8px");
            obj.set_font("12px/normal \"Noto Sans KR Black\"");
            this.search_box.addChild(obj.name, obj);

            obj = new Calendar("Calendar00","84","125","190","35",null,null,null,null,null,null,this.search_box.form);
            obj.set_taborder("7");
            obj.set_border("1px solid black");
            obj.set_borderRadius("8px");
            this.search_box.addChild(obj.name, obj);

            obj = new Calendar("Calendar00_00","300","125","190","35",null,null,null,null,null,null,this.search_box.form);
            obj.set_taborder("8");
            obj.set_border("1px solid black");
            obj.set_borderRadius("8px");
            this.search_box.addChild(obj.name, obj);

            obj = new Static("Static00","274","130","26","24",null,null,null,null,null,null,this.search_box.form);
            obj.set_taborder("9");
            obj.set_text("~");
            obj.set_textAlign("center");
            this.search_box.addChild(obj.name, obj);

            obj = new Static("Static01","9","11","91","38",null,null,null,null,null,null,this.search_box.form);
            obj.set_taborder("10");
            obj.set_text("회원 검색");
            obj.set_textAlign("center");
            obj.set_font("20px/normal \"Noto Sans KR Black\"");
            this.search_box.addChild(obj.name, obj);

            obj = new Button("search_btn","580","130","100","36",null,null,null,null,null,null,this.search_box.form);
            obj.set_taborder("11");
            obj.set_text("조회하기");
            obj.set_font("12px/normal \"Noto Sans KR Black\"");
            obj.set_background("#667eea");
            obj.set_color("#ffffff");
            obj.set_borderRadius("8px");
            obj.set_cursor("pointer");
            obj.set_border("0px solid #667eea");
            this.search_box.addChild(obj.name, obj);

            obj = new Button("reset_btn","710","130","100","36",null,null,null,null,null,null,this.search_box.form);
            obj.set_taborder("12");
            obj.set_text("초기화");
            obj.set_font("12px/normal \"Noto Sans KR Black\"");
            obj.set_background("#f5f5f5");
            obj.set_color("#666666");
            obj.set_borderRadius("8px");
            obj.set_cursor("pointer");
            obj.set_border("1px solid #e0e0e0");
            this.search_box.addChild(obj.name, obj);

            obj = new MaskEdit("MaskEdit00","550","68","160","35",null,null,null,null,null,null,this.search_box.form);
            obj.set_taborder("13");
            obj.set_border("1px solid black");
            obj.set_borderRadius("8px");
            obj.set_format("###-####-####");
            obj.set_type("string");
            this.search_box.addChild(obj.name, obj);

            obj = new Button("insert_member","1115","142","105","36",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("관리자 등록");
            obj.set_font("12px/normal \"Noto Sans KR Black\"");
            obj.set_borderRadius("8px");
            obj.set_background("#667eea");
            obj.set_color("#ffffff");
            obj.set_border("0px solid #667eea");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1280,720,this,function(p){});
            obj.set_mobileorientation("landscape");
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item0","member_list","binddataset","ds_user","");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item2","search_box.form.Edit00","value","ds_search","SEARCH_TEXT");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item3","search_box.form.member_info","value","ds_search","SEARCH_TYPE");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item1","search_box.form.member_grade","value","ds_search","GRADE_NAME");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item5","search_box.form.Calendar00","value","ds_search","FIRST_LOGIN_DT");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item6","search_box.form.Calendar00_00","value","ds_search","LAST_LOGIN_DT");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item4","search_box.form.MaskEdit00","value","ds_search","PHONE_NUMBER");
            this.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Form_MemberList.xfdl", function() {
        this.Form_MemberList_onload = function(obj,e)
        {
        //     var objDate = new nexacro.Date();
        //     var mm = (objDate.getMonth()+1).toString().padLeft(2,"0");
        //     var dd = objDate.getDate().toString().padLeft(2,"0");
        //     var today = objDate.getYear() + mm + dd;
        //
        //     this.ds_search.setColumn(0, "FIRST_LOGIN_DT", objDate.getYear() + "0101");
        //     this.ds_search.setColumn(0, "LAST_LOGIN_DT", today);

        	//개인정보 검색 콤보값 기본값 세팅
            this.search_box.form.member_info.set_index(0);

            this.fn_search();
            this.fn_gradeSearch();
        };



        //회원 리스트 조회
        this.fn_search = function(){

        	var strSvcID = "selectMemberList"
        	var setURL = "svc::/selectMemberListByAdmin.do?time=" + new Date().getTime();
        	var strInDatasets = "ds_search=ds_search";
        	var strOutDatasets = "ds_list=ds_list";
        	var strArg = "";
        	var callBack = "fn_callBack";
        	var inAsync = true;

        	this.transaction(strSvcID,setURL,strInDatasets,strOutDatasets,strArg,callBack,inAsync);
        }

        //회원 등급 조회
        this.fn_gradeSearch = function(){

        	var strSvcID = "selectMemberGradeList"
        	var setURL = "svc::/selectMemberGradeListByAdmin.do?time=" + new Date().getTime();
        	var strInDatasets = "";
        	var strOutDatasets = "ds_grade=ds_grade";
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
        	case "selectMemberList" :
        		console.log(this.ds_list.saveXML());
        		break;

        	case "selectMemberGradeList" :
        		console.log(this.ds_grade.saveXML())

        		//등급 검색 콤보 기본값 세팅
        		//온로드 할때 불러오는게 아니라 경로를 타고 쿼리를 타는게 성공했을때 디폴트 값 설정
        	    this.search_box.form.member_grade.set_index(0);

        		break;
        	}
        }


        //조회하기 버튼
        this.search_box_search_btn_onclick = function(obj,e)
        {
        	this.fn_search();
        };


        // 초기화 버튼
        this.search_box_reset_btn_onclick = function(obj, e)
        {
        	this.reload();
        };

        //등록하기 페이지 이동(관리자 생성 또는 회원 강제 insert)
        this.Button00_onclick = function(obj,e)
        {
        	this.getOwnerFrame().set_formurl("member::Form_MemberInsert.xfdl");
        };


        //상세버튼 누를시 상세 페이지로 이동.
        //그리드에 이벤트 주기
        this.member_list_oncellclick = function(obj,e)
        {
        	//cell마다 이벤트 따로주기
        	//trace(e.cell)해서 해당하는 셀의 위치를 찾기
        	if(e.cell == 11){
        		var memberId = this.ds_list.getColumn(e.row,"MEMBER_ID")

        		//부모페이지 자식페이지 값 전달하기 arguments
        		this.getOwnerFrame().arguments = {"MEMBER_ID" : memberId}

        		this.getOwnerFrame().set_formurl("member::Form_MemberDetail.xfdl");
        	}
        };

        //이름 검색
        this.search_box_Edit00_onkeyup = function(obj,e)
        {
        	if(e.keycode ==13){
        		this.fn_search();
        	}
        };

        //등급에 따라 검색
        this.search_box_member_grade_onitemchanged = function(obj,e)
        {
           this.fn_search();
        };

        //전화번호 검색
        this.search_box_MaskEdit00_onkeyup = function(obj,e)
        {
        	if(e.keycode ==13){
        		this.fn_search();
        	}
        };

        //시작일
        this.search_box_Calendar00_onchanged = function(obj,e)
        {
        	var startDate = this.search_box.form.Calendar00.value;
            var endDate   = this.search_box.form.Calendar00_00.value;

            if (!startDate) return; // 시작일 없으면 처리 중단

            // 종료일이 있고, 종료일이 시작일보다 빠른 경우
            if (endDate && endDate < startDate) {
                this.alert("종료일은 시작일보다 빠를 수 없습니다.");
                this.search_box.form.Calendar00_00.set_value(startDate);
                endDate = startDate;
            }

            // 시작일은 00시 00분
            this.ds_search.setColumn(0, "FIRST_LOGIN_DT", startDate + "000000");

            // 종료일이 있으면 23시 59분까지 설정
            if (endDate) {
                this.ds_search.setColumn(0, "LAST_LOGIN_DT", endDate + "235959");
            }

        	//자동 검색
        	this.fn_search()
        };

        //종료일
        this.search_box_Calendar00_00_onchanged = function(obj,e)
        {
        	var startDate = this.search_box.form.Calendar00.value;
            var endDate   = this.search_box.form.Calendar00_00.value;

            if (!endDate) return; // 종료일 없으면 처리 중단

            // 종료일이 시작일보다 빠른 경우
            if (startDate && endDate < startDate) {
                this.alert("종료일은 시작일보다 빠를 수 없습니다.");
                this.search_box.form.Calendar00_00.set_value(startDate);
                endDate = startDate;
            }

            // 종료일은 23시 59분
            this.ds_search.setColumn(0, "L_LOGIN_DT", endDate + "235959");

            // 시작일이 있으면 00시 00분까지 세팅
            if (startDate) {
                this.ds_search.setColumn(0, "FIRST_LOGIN_DT", startDate + "000000");
            }

        	//자동 검색
        	this.fn_search()
        };


        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_MemberList_onload,this);
            this.member_list.addEventHandler("oncellclick",this.member_list_oncellclick,this);
            this.search_box.form.member_info.addEventHandler("onitemchanged",this.search_box_member_info_onitemchanged,this);
            this.search_box.form.Edit00.addEventHandler("onkeyup",this.search_box_Edit00_onkeyup,this);
            this.search_box.form.Edit00.addEventHandler("onchanged",this.search_box_Edit00_onchanged,this);
            this.search_box.form.member_grade.addEventHandler("onitemchanged",this.search_box_member_grade_onitemchanged,this);
            this.search_box.form.Calendar00.addEventHandler("onchanged",this.search_box_Calendar00_onchanged,this);
            this.search_box.form.Calendar00_00.addEventHandler("onchanged",this.search_box_Calendar00_00_onchanged,this);
            this.search_box.form.Static00.addEventHandler("onclick",this.search_box_Static00_onclick,this);
            this.search_box.form.search_btn.addEventHandler("onclick",this.search_box_search_btn_onclick,this);
            this.search_box.form.reset_btn.addEventHandler("onclick",this.search_box_reset_btn_onclick,this);
            this.search_box.form.MaskEdit00.addEventHandler("onkeyup",this.search_box_MaskEdit00_onkeyup,this);
            this.insert_member.addEventHandler("onclick",this.Button00_onclick,this);
        };
        this.loadIncludeScript("Form_MemberList.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
