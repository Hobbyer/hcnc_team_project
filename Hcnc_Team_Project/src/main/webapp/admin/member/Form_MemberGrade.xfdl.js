(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_MemberGrade");
            this.set_titletext("New Form");
            this.set_background("#F4F7FE");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_grade", this);
            obj._setContents("<ColumnInfo><Column id=\"GRADE_CODE\" type=\"STRING\" size=\"256\"/><Column id=\"GRADE_NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_gradeList", this);
            obj._setContents("<ColumnInfo><Column id=\"MEMBER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"USER_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"EMAIL_ADDR\" type=\"STRING\" size=\"256\"/><Column id=\"GRADE_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"PRICE_AMOUNT\" type=\"STRING\" size=\"256\"/><Column id=\"INPUT_DT\" type=\"STRING\" size=\"256\"/><Column id=\"GRADE_CODE\" type=\"STRING\" size=\"256\"/><Column id=\"PHONE_NUMBER\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_search", this);
            obj._setContents("<ColumnInfo><Column id=\"GRADE_CODE\" type=\"STRING\" size=\"256\"/><Column id=\"USER_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"EMAIL_ADDR\" type=\"STRING\" size=\"256\"/><Column id=\"SDATE\" type=\"STRING\" size=\"256\"/><Column id=\"EDATE\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_upCnt", this);
            obj._setContents("<ColumnInfo><Column id=\"UPDATED\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_grade_edit", this);
            obj._setContents("<ColumnInfo><Column id=\"GRADE_CODE\" type=\"STRING\" size=\"256\"/><Column id=\"GRADE_NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Static("grade_search_box","40","17","1200","203",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_background("white");
            obj.set_text("");
            obj.set_borderRadius("8px");
            obj.set_rtl("");
            this.addChild(obj.name, obj);

            obj = new Radio("member_grade","110","53","1000","34",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_innerdataset("ds_grade");
            obj.set_codecolumn("GRADE_CODE");
            obj.set_datacolumn("GRADE_NAME");
            obj.set_direction("vertical");
            obj.set_font("12px/normal \"Noto Sans KR Black\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","54","57","36","27",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("등급");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            this.addChild(obj.name, obj);

            obj = new Edit("grade_name","90","106","230","35",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_border("1px solid black");
            obj.set_borderRadius("8px");
            this.addChild(obj.name, obj);

            obj = new Edit("grade_emil","400","106","230","35",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_border("1px solid black");
            obj.set_borderRadius("8px");
            this.addChild(obj.name, obj);

            obj = new Calendar("Calendar00","710","108","230","32",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_border("1px solid black");
            obj.set_borderRadius("8px");
            this.addChild(obj.name, obj);

            obj = new Calendar("Calendar00_00","965","109","230","32",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_border("1px solid black");
            obj.set_borderRadius("8px");
            this.addChild(obj.name, obj);

            obj = new Static("Static01","950","112","17","24",null,null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_text("~");
            obj.set_font("bold 12px \"Noto Sans KR Black\"");
            this.addChild(obj.name, obj);

            obj = new Button("search_btn","540","165","97","35",null,null,null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_text("검색");
            obj.set_background("#667eea");
            obj.set_font("12px/normal \"Noto Sans KR Black\"");
            obj.set_color("#ffffff");
            obj.set_borderRadius("4px");
            obj.set_border("0px solid #667eea");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);

            obj = new Button("reset_btn","650","165","97","35",null,null,null,null,null,null,this);
            obj.set_taborder("9");
            obj.set_text("초기화");
            obj.set_background("#f5f5f5");
            obj.set_borderRadius("4px");
            obj.set_font("12px/normal \"Noto Sans KR Black\"");
            obj.set_border("1px solid #e0e0e0");
            obj.set_color("#666666");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);

            obj = new Grid("grid_list","40","230","1200",null,null,"20",null,null,null,null,this);
            obj.set_taborder("10");
            obj.set_background("#FFFFFF");
            obj.set_border("0px none");
            obj.set_borderRadius("10px");
            obj.set_autofittype("col");
            obj.set_binddataset("ds_gradeList");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"52\"/><Column size=\"165\"/><Column size=\"136\"/><Column size=\"164\"/><Column size=\"162\"/><Column size=\"145\"/><Column size=\"237\"/><Column size=\"179\"/></Columns><Rows><Row size=\"48\" band=\"head\"/><Row size=\"40\"/></Rows><Band id=\"head\"><Cell text=\"NO\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"1\" text=\"아이디\" textAlign=\"CENTER\" font=\"11pt/normal &quot;LG Smart UI Bold&quot;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"2\" text=\"이름\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"3\" text=\"이메일\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"4\" text=\"전화번호\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"5\" text=\"구매액\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"6\" text=\"가입일\" textAlign=\"CENTER\" font=\"11pt/normal &quot;LG Smart UI Bold&quot;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"7\" text=\"등급변경\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\" font=\"11pt/normal &quot;LG Smart UI Bold&quot;\"/></Band><Band id=\"body\"><Cell text=\"expr:currow + 1\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"1\" text=\"bind:MEMBER_ID\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"2\" text=\"bind:USER_NAME\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"3\" text=\"bind:EMAIL_ADDR\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"4\" text=\"bind:PHONE_NUMBER\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\" displaytype=\"mask\" edittype=\"mask\" maskedittype=\"string\" maskeditformat=\"###-####-####\"/><Cell col=\"5\" edittype=\"normal\" text=\"bind:PRICE_AMOUNT\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"6\" text=\"bind:INPUT_DT\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"7\" text=\"bind:GRADE_CODE\" displaytype=\"combocontrol\" edittype=\"combo\" combocodecol=\"GRADE_CODE\" combodatacol=\"GRADE_NAME\" combodataset=\"ds_grade_edit\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Button("update_grade","1121","165","99","35",null,null,null,null,null,null,this);
            obj.set_taborder("11");
            obj.set_text("등급 변경");
            obj.set_background("#667eea");
            obj.set_borderRadius("4px");
            obj.set_color("#ffffff");
            obj.set_font("12px/normal \"Noto Sans KR Black\"");
            obj.set_border("0px solid #667eea");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_01","54","110","26","27",null,null,null,null,null,null,this);
            obj.set_taborder("12");
            obj.set_text("이름");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_01_00","347","110","43","27",null,null,null,null,null,null,this);
            obj.set_taborder("13");
            obj.set_text("이메일");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_01_00_00","659","110","43","27",null,null,null,null,null,null,this);
            obj.set_taborder("14");
            obj.set_text("가입일");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static02","1111","200","129","23",null,null,null,null,null,null,this);
            obj.set_taborder("15");
            obj.set_text("*등급을 선택하고 클릭");
            obj.set_font("12px/normal \"Noto Sans KR Black\"");
            obj.set_textAlign("center");
            obj.set_color("red");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1280,720,this,function(p){});
            obj.set_mobileorientation("landscape");
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item0","grid_list","binddataset","ds_user","");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item1","member_grade","value","ds_search","GRADE_CODE");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item2","grade_name","value","ds_search","USER_NAME");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item3","grade_emil","value","ds_search","EMAIL_ADDR");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item4","Calendar00","value","ds_search","SDATE");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item5","Calendar00_00","value","ds_search","EDATE");
            this.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.addIncludeScript("Form_MemberGrade.xfdl","common::common.xjs");
        this.registerScript("Form_MemberGrade.xfdl", function() {
        this.executeIncludeScript("common::common.xjs"); /*include "common::common.xjs"*/;
        this.Form_MemberGrade_onload = function(obj,e)
        {
        	this.fn_gradeSearch();
        	this.fn_GradeManageSearch();
        };


        //회원 등급 관리 리스트 조회
        this.fn_GradeManageSearch = function(){

        	var strSvcID = "selectGradeManageList"
        	var setURL = "svc::/selectGradeManageByAdmin.do?time=" + new Date().getTime();
        	var strInDatasets = "ds_search=ds_search";
        	var strOutDatasets = "ds_gradeList=ds_gradeList";
        	var strArg = "";
        	var callBack = "fn_callBack";
        	var inAsync = true;

        	this.transaction(strSvcID,setURL,strInDatasets,strOutDatasets,strArg,callBack,inAsync);
        }

        //회원 등급 조회 //관리자 제외
        this.fn_gradeSearch = function(){

        	var strSvcID = "selectGradeExceptionAdminList"
        	var setURL = "svc::/selectGradeExceptionAdminListByAdmin.do?time=" + new Date().getTime();
        	var strInDatasets = "";
        	var strOutDatasets = "ds_grade=ds_grade";
        	var strArg = "";
        	var callBack = "fn_callBack";
        	var inAsync = true;

        	this.transaction(strSvcID,setURL,strInDatasets,strOutDatasets,strArg,callBack,inAsync);
        }

        //등급 변경하기
        this.inse_onclick = function(obj,e)
        {

        	// 그리드 안의 변경된 셀만(행 추가 삭제와 비슷)
        	var strSvcID = "updateMemberGrade";
        	var setURL = "svc::/updateMemberGradeByAdmin.do?time=" + new Date().getTime();
        	var strInDatasets = "ds_gradeList=ds_gradeList:u"; // 수정된 데이터만 서버로 보냄
        	var strOutDatasets = "ds_upCnt = ds_upCnt";
        	var strArg = "";
        	var callBack = "fn_callBack";
        	var inAsync = true;

        	this.transaction(strSvcID, setURL, strInDatasets, strOutDatasets, strArg, callBack, inAsync);

        };


        // 공통 콜백
        this.fn_callBack = function(svcID, errorCode, errorMSG){

        	if(errorCode == -1){
        		this.alert(errorMSG)
        	}

        	switch(svcID){
        	case "selectGradeManageList" :
        		console.log(this.ds_gradeList.saveXML());
        		break;

        	case "selectGradeExceptionAdminList" :
        		console.log(this.ds_grade.saveXML());

        		//전체 제외하고 등급 조회하기
        		// 그리드용 Dataset 생성 ("전체" 제외)
        		this.ds_grade_edit.clearData();
        		for(var i=0; i<this.ds_grade.getRowCount(); i++){
        			var gradeCode = this.ds_grade.getColumn(i, "GRADE_CODE");
        			if(gradeCode != "") {  // "전체" 제외
        				var nRow = this.ds_grade_edit.addRow();
        				this.ds_grade_edit.setColumn(nRow, "GRADE_CODE", gradeCode);
        				this.ds_grade_edit.setColumn(nRow, "GRADE_NAME",
        					this.ds_grade.getColumn(i, "GRADE_NAME"));
        			}
        		}
        		break;

        	case "updateMemberGrade" :
        		console.log(this.ds_upCnt.saveXML())
        		if(this.ds_upCnt.getColumn(0,"UPDATED") > 0 ){

        			this.alert("등급이 변경되었습니다")
        			this.reload();

        		}else{
        			this.alert("변경된 정보가 없습니다")
        		}
        		break;
        	}

        }

        //검색하기
        this.Button00_onclick = function(obj,e)
        {
            this.fn_GradeManageSearch();
        };

        //초기화
        this.Button00_00_onclick = function(obj,e)
        {
        	this.reload();
        };

        //등급 선택시 자동 조회
        this.member_grade_onitemchanged = function(obj,e)
        {
        	this.fn_GradeManageSearch()
        };

        //등급 이름 자동 검색
        this.grade_name_onkeyup = function(obj,e)
        {
        	if(e.keycode == 13){
        		this.fn_GradeManageSearch();
        	}
        };

        //등급 이메일 자동 검색
        this.grade_emil_onkeyup = function(obj,e)
        {
        	if(e.keycode == 13){
        		this.fn_GradeManageSearch();
        	}
        };

        //시작일
        this.Calendar00_onchanged = function(obj,e)
        {
        	var startDate = this.Calendar00.value;
            var endDate   = this.Calendar00_00.value;

            if (!startDate) return; // 시작일 없으면 처리 중단

            // 종료일이 있고, 종료일이 시작일보다 빠른 경우
            if (endDate && endDate < startDate) {
                this.alert("시작일은 종료일보다 느릴 수 없습니다.");
                this.Calendar00_00.set_value(startDate);
                endDate = startDate;
            }

            // 시작일은 00시 00분
            this.ds_search.setColumn(0, "SDATE", startDate + "000000");

            // 종료일이 있으면 23시 59분까지 설정
            if (endDate) {
                this.ds_search.setColumn(0, "EDATE", endDate + "235959");
            }

        	//자동 검색
        	this.fn_GradeManageSearch();
        };

        //종료일
        this.Calendar00_00_onchanged = function(obj,e)
        {
        	var startDate = this.Calendar00.value;
            var endDate   = this.Calendar00_00.value;

            if (!endDate) return; // 종료일 없으면 처리 중단

            // 종료일이 시작일보다 빠른 경우
            if (startDate && endDate < startDate) {
                this.alert("종료일은 시작일보다 빠를 수 없습니다.");
                this.Calendar00_00.set_value(startDate);
                endDate = startDate;
            }

            // 종료일은 23시 59분
            this.ds_search.setColumn(0, "EDATE", endDate + "235959");

            // 시작일이 있으면 00시 00분까지 세팅
            if (startDate) {
                this.ds_search.setColumn(0, "SDATE", startDate + "000000");
            }

        	//자동 검색
        	this.fn_GradeManageSearch();
        };



        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_MemberGrade_onload,this);
            this.grade_search_box.addEventHandler("onclick",this.grade_search_box_onclick,this);
            this.member_grade.addEventHandler("onitemchanged",this.member_grade_onitemchanged,this);
            this.grade_name.addEventHandler("onkeyup",this.grade_name_onkeyup,this);
            this.grade_emil.addEventHandler("onkeyup",this.grade_emil_onkeyup,this);
            this.Calendar00.addEventHandler("onchanged",this.Calendar00_onchanged,this);
            this.Calendar00_00.addEventHandler("onchanged",this.Calendar00_00_onchanged,this);
            this.search_btn.addEventHandler("onclick",this.Button00_onclick,this);
            this.reset_btn.addEventHandler("onclick",this.Button00_00_onclick,this);
            this.update_grade.addEventHandler("onclick",this.inse_onclick,this);
        };
        this.loadIncludeScript("Form_MemberGrade.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
