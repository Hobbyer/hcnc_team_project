(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_Member_withdrawAndDormant");
            this.set_titletext("New Form");
            this.set_background("#F4F7FE");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_status", this);
            obj._setContents("<ColumnInfo><Column id=\"STATUS_CODE\" type=\"STRING\" size=\"256\"/><Column id=\"STATUS_NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"STATUS_CODE\"/><Col id=\"STATUS_NAME\">전체</Col></Row><Row><Col id=\"STATUS_CODE\">R</Col><Col id=\"STATUS_NAME\">휴면</Col></Row><Row><Col id=\"STATUS_CODE\">N</Col><Col id=\"STATUS_NAME\">탈퇴</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_search", this);
            obj._setContents("<ColumnInfo><Column id=\"STATUS\" type=\"STRING\" size=\"256\"/><Column id=\"USER_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"EMAIL_ADDR\" type=\"STRING\" size=\"256\"/><Column id=\"SEARCH_START_DATE\" type=\"STRING\" size=\"256\"/><Column id=\"SEARCH_END_DATE\" type=\"STRING\" size=\"256\"/><Column id=\"SEARCH_DATE\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_list", this);
            obj._setContents("<ColumnInfo><Column id=\"USER_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"EMAIL_ADDR\" type=\"STRING\" size=\"256\"/><Column id=\"PHONE_NUMBER\" type=\"STRING\" size=\"256\"/><Column id=\"PRICE_AMOUNT\" type=\"STRING\" size=\"256\"/><Column id=\"INPUT_DT\" type=\"STRING\" size=\"256\"/><Column id=\"STATUS_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"MEMBER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"LAST_LOGIN_DT\" type=\"STRING\" size=\"256\"/><Column id=\"DELETE_DT\" type=\"STRING\" size=\"256\"/><Column id=\"STATUS\" type=\"STRING\" size=\"256\"/><Column id=\"UPDATE_DT\" type=\"STRING\" size=\"256\"/><Column id=\"DAYS_SINCE_CHANGE\" type=\"STRING\" size=\"256\"/><Column id=\"CHK\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_upCnt", this);
            obj._setContents("<ColumnInfo><Column id=\"UPDATED\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_delCnt", this);
            obj._setContents("<ColumnInfo><Column id=\"DELETED\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_member", this);
            obj._setContents("<ColumnInfo><Column id=\"MEMBER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"STATUS\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_date", this);
            obj._setContents("<ColumnInfo><Column id=\"SEARCH_DATE\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"SEARCH_DATE\">가입일</Col></Row><Row><Col id=\"SEARCH_DATE\">휴면일</Col></Row><Row><Col id=\"SEARCH_DATE\">탈퇴일</Col></Row></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Static("search_box","40","10","1200","150",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_background("white");
            obj.set_text("");
            obj.set_borderRadius("8px");
            this.addChild(obj.name, obj);

            obj = new Static("status","46","20","48","40",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("상태");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            obj.set_textAlign("center");
            this.addChild(obj.name, obj);

            obj = new Static("status00","326","70","48","40",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("이메일");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            obj.set_textAlign("center");
            this.addChild(obj.name, obj);

            obj = new Static("status01","46","68","48","40",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("이름");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            obj.set_textAlign("center");
            this.addChild(obj.name, obj);

            obj = new Radio("Radio00","110","24","240","32",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_innerdataset("ds_status");
            obj.set_codecolumn("STATUS_CODE");
            obj.set_datacolumn("STATUS_NAME");
            obj.set_direction("vertical");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit00","110","74","200","32",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_border("1px solid black");
            obj.set_borderRadius("8px");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit00_00","385","74","200","32",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_border("1px solid black");
            obj.set_borderRadius("8px");
            this.addChild(obj.name, obj);

            obj = new Calendar("Calendar00","720","74","210","35",null,null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_border("1px solid black");
            obj.set_borderRadius("8px");
            this.addChild(obj.name, obj);

            obj = new Calendar("Calendar00_00","950","74","210","35",null,null,null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_border("1px solid black");
            obj.set_borderRadius("8px");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","925","79","30","23",null,null,null,null,null,null,this);
            obj.set_taborder("9");
            obj.set_text("~");
            obj.set_textAlign("center");
            obj.set_font("bold 12px/normal \"Noto Sans KR Black\"");
            this.addChild(obj.name, obj);

            obj = new Button("Button00","551","118","100","32",null,null,null,null,null,null,this);
            obj.set_taborder("10");
            obj.set_text("검색");
            obj.set_font("12px/normal \"Noto Sans KR Black\"");
            obj.set_background("#667eea");
            obj.set_borderRadius("8px");
            obj.set_color("#ffffff");
            obj.set_border("0px solid #667eea");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);

            obj = new Button("Button00_00","661","118",null,"31","520",null,null,null,null,null,this);
            obj.set_taborder("11");
            obj.set_text("초기화");
            obj.set_font("12px/normal \"Noto Sans KR Black\"");
            obj.set_background("#f5f5f5");
            obj.set_borderRadius("8px");
            obj.set_border("1px solid #e0e0e0");
            obj.set_color("#666666");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);

            obj = new Grid("grid_list","40","170","1200",null,null,"56",null,null,null,null,this);
            obj.set_taborder("12");
            obj.set_background("#FFFFFF");
            obj.set_border("0px none");
            obj.set_borderRadius("10px");
            obj.set_autofittype("col");
            obj.set_binddataset("ds_list");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"49\"/><Column size=\"52\"/><Column size=\"103\"/><Column size=\"169\"/><Column size=\"161\"/><Column size=\"112\"/><Column size=\"135\"/><Column size=\"138\"/><Column size=\"153\"/><Column size=\"131\"/></Columns><Rows><Row size=\"48\" band=\"head\"/><Row size=\"40\"/></Rows><Band id=\"head\"><Cell textAlign=\"CENTER\" font=\"11pt/normal &quot;LG Smart UI Bold&quot;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"1\" text=\"NO\" textAlign=\"CENTER\" font=\"11pt/normal &quot;LG Smart UI Bold&quot;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"2\" text=\"이름\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"3\" text=\"이메일\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"4\" text=\"전화번호 \" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"5\" text=\"상태 \" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"6\" text=\"구매액\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"7\" text=\"가입일\" textAlign=\"CENTER\" font=\"11pt/normal &quot;LG Smart UI Bold&quot;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"8\" text=\"휴면일\" textAlign=\"CENTER\" font=\"11pt/normal &quot;LG Smart UI Bold&quot;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"9\" text=\"탈퇴일\" textAlign=\"CENTER\" font=\"11pt/normal &quot;LG Smart UI Bold&quot;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/></Band><Band id=\"body\"><Cell displaytype=\"checkboxcontrol\" edittype=\"checkbox\" text=\"bind:CHK\"/><Cell col=\"1\" text=\"expr:currow + 1\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\" textAlign=\"center\"/><Cell col=\"2\" text=\"bind:USER_NAME\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"3\" text=\"bind:EMAIL_ADDR\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"4\" text=\"bind:PHONE_NUMBER\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\" displaytype=\"mask\" edittype=\"mask\" maskeditformat=\"###-####-####\" maskedittype=\"string\"/><Cell col=\"5\" text=\"bind:STATUS_NAME\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"6\" edittype=\"normal\" text=\"bind:PRICE_AMOUNT\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"7\" text=\"bind:INPUT_DT\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"8\" text=\"bind:LAST_LOGIN_DT\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"9\" text=\"bind:DELETE_DT\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Button("withdraw_btn","521","674","129","33",null,null,null,null,null,null,this);
            obj.set_taborder("13");
            obj.set_text("탈퇴처리");
            obj.set_background("#667eea");
            obj.set_borderRadius("8px");
            obj.set_color("#ffffff");
            obj.set_font("12px \"Noto Sans KR Black\"");
            obj.set_border("0px solid #667eea");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);

            obj = new Button("domant_btn","670","674","129","33",null,null,null,null,null,null,this);
            obj.set_taborder("14");
            obj.set_text("휴면복구");
            obj.set_background("#f5f5f5");
            obj.set_borderRadius("8px");
            obj.set_font("12px \"Noto Sans KR Black\"");
            obj.set_color("#666666");
            obj.set_border("1px solid #e0e0e0");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);

            obj = new Combo("Combo00","621","74","90","32",null,null,null,null,null,null,this);
            obj.set_taborder("15");
            obj.set_innerdataset("ds_date");
            obj.set_codecolumn("SEARCH_DATE");
            obj.set_datacolumn("SEARCH_DATE");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            obj.set_border("1px solid black");
            obj.set_borderRadius("8px");
            obj.set_text("");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1280,720,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item0","grid_list","binddataset","ds_user","");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item1","Radio00","value","ds_search","STATUS");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item2","Edit00","value","ds_search","USER_NAME");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item3","Edit00_00","value","ds_search","EMAIL_ADDR");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item4","Calendar00","value","ds_search","SEARCH_START_DATE");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item5","Calendar00_00","value","ds_search","SEARCH_END_DATE");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item6","Combo00","value","ds_search","SEARCH_DATE");
            this.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.addIncludeScript("Form_Member_withdrawAndDormant.xfdl","common::common.xjs");
        this.registerScript("Form_Member_withdrawAndDormant.xfdl", function() {
        this.executeIncludeScript("common::common.xjs"); /*include "common::common.xjs"*/;
        this.Form_Member_withdrawAndDormant_onload = function(obj,e)
        {
        	//콤보 박스 초기값 설정
        	this.Combo00.set_index(0);
        	this.fn_selectDormantWithdrawnMembers();
        };

        //검색버튼
        this.Button00_onclick = function(obj,e)
        {
        	this.fn_selectDormantWithdrawnMembers();
        };

        //초기화 버튼
        this.Button00_00_onclick = function(obj,e)
        {
        	this.reload();
        };

        //체크박스 체크하기
        this.grid_list_oncellclick = function(obj,e)
        {
        	if(e.cell == 0){
        		if(this.ds_list.getColumn(this.ds_list.rowposition,"CHK") == 0){
        			this.ds_list.setColumn(this.ds_list.rowposition,"CHK", "0");
        			return;
        		}else{
        			this.ds_list.setColumn(this.ds_list.rowposition,"CHK", "1");
        			return;
        		}
        	}
        };

        //휴면, 탈퇴 회원  리스트 조회
        this.fn_selectDormantWithdrawnMembers = function(){

        	var strSvcID = "selectDormantWithdrawnMembers"
        	var setURL = "svc::/selectDormantWithdrawnMembersByAdmin.do?time=" + new Date().getTime();
        	var strInDatasets = "ds_search=ds_search";
        	var strOutDatasets = "ds_list=ds_list";
        	var strArg = "";
        	var callBack = "fn_callBack";
        	var inAsync = true;

        	this.transaction(strSvcID,setURL,strInDatasets,strOutDatasets,strArg,callBack,inAsync);
        }

        //삭제 버튼
        this.withdraw_btn_onclick = function(obj,e)
        {

        	var checkBox = 0;
        	for(var i = 0; i < this.ds_list.getRowCount(); i++){
        		if(this.ds_list.getColumn(i, "CHK") == "1"){
        			checkBox++;
        		}
        	}

        	if(checkBox == "0"){
        		this.alert("체크박스를 선택하세요")
        		return;
        	}

        	// 트랜잭션 호출
        	var strSvcID = "withdrawMember"
        	var setURL = "svc::/withdrawMemberByAdmin.do?time=" + new Date().getTime();
        	var strInDatasets = "ds_list=ds_list";
        	var strOutDatasets = "ds_delCnt=ds_delCnt";
        	var strArg = "";
        	var callBack = "fn_callBack";
        	var inAsync = true;

        	this.transaction(strSvcID,setURL,strInDatasets,strOutDatasets,strArg,callBack,inAsync);
        };

        //휴면 복구 버튼
        this.Button01_00_onclick = function(obj,e)
        {
        	var checkBox = 0;
        	for(var i = 0; i < this.ds_list.getRowCount(); i++){
        		if(this.ds_list.getColumn(i, "CHK") == "1"){
        			checkBox++;
        		}
        	}

        	if(checkBox == "0"){
        		this.alert("체크박스를 선택하세요")
        		return;
        	}


            // 트랜잭션 호출
        	var strSvcID = "reactivateDormantMember"
        	var setURL = "svc::/reactivateDormantMemberByAdmin.do?time=" + new Date().getTime();
        	var strInDatasets = "ds_list=ds_list";
        	var strOutDatasets = "ds_upCnt=ds_upCnt ";
        	var strArg = "";
        	var callBack = "fn_callBack";
        	var inAsync = true;

        	this.transaction(strSvcID,setURL,strInDatasets,strOutDatasets,strArg,callBack,inAsync);

        };

        // 공통 콜백
        this.fn_callBack = function(svcID, errorCode, errorMSG){

        	if(errorCode == -1){
        		this.alert(errorMSG)
        	}

        	switch(svcID){
        	case "selectDormantWithdrawnMembers" :
        		console.log(this.ds_list.saveXML());
        		break;
        	case "withdrawMember" :
        		if(this.ds_delCnt.getColumn(0,"DELETED") > 0){
        			this.alert("회원이 탈퇴 처리되었습니다.")
        			this.fn_selectDormantWithdrawnMembers();
        		}else{
        			this.alert("이미 탈퇴 처리되거나 휴면 복귀한 회원입니다.")
        		}

        		break;
        	case "reactivateDormantMember" :
        		if(this.ds_upCnt.getColumn(0,"UPDATED") > 0){
        			alert("휴면 회원이 복구되었습니다.");
        			this.fn_selectDormantWithdrawnMembers();
        		}else{
        			this.alert("이미 탈퇴 처리되거나 휴면 복귀한 회원입니다.")
        		}
        		break;
        	}
        }

        //라디오 선택할때 자동조회
        this.Radio00_onitemchanged = function(obj,e)
        {
        	this.fn_selectDormantWithdrawnMembers();
        };

        //이름 검색
        this.Edit00_onkeyup = function(obj,e)
        {
        	if(e.keycode == 13){
        		this.fn_selectDormantWithdrawnMembers();
        	}
        };

        //이메일 검색
        this.Edit00_00_onkeyup = function(obj,e)
        {
        	if(e.keycode == 13){
        		this.fn_selectDormantWithdrawnMembers();
        	}
        };

        //날짜 시작일 (Calendar00) - 바인딩으로 SEARCH_START_DATE에 자동 저장됨
        this.Calendar00_onchanged = function(obj,e)
        {
        	var startDate = this.Calendar00.value;
            var endDate   = this.Calendar00_00.value;

            if (!startDate) return; // 시작일 없으면 처리 중단

            // 종료일이 있고, 종료일이 시작일보다 빠른 경우
            if (endDate && endDate < startDate) {
                this.alert("종료일은 시작일보다 빠를 수 없습니다.");
                this.Calendar00_00.set_value(startDate);
                endDate = startDate;
            }

            // 시작일은 00시 00분 (바인딩된 컬럼명으로 변경)
            this.ds_search.setColumn(0, "SEARCH_START_DATE", startDate + "000000");

            // 종료일이 있으면 23시 59분까지 설정
            if (endDate) {
                this.ds_search.setColumn(0, "SEARCH_END_DATE", endDate + "235959");
            }

        	//자동 검색
        	this.fn_selectDormantWithdrawnMembers();
        };

        //날짜 종료일 (Calendar00_00) - 바인딩으로 SEARCH_END_DATE에 자동 저장됨
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

            // 종료일은 23시 59분 (바인딩된 컬럼명으로 변경)
            this.ds_search.setColumn(0, "SEARCH_END_DATE", endDate + "235959");

            // 시작일이 있으면 00시 00분까지 세팅
            if (startDate) {
                this.ds_search.setColumn(0, "SEARCH_START_DATE", startDate + "000000");
            }

        	//자동 검색
        	this.fn_selectDormantWithdrawnMembers();
        };

        //날짜는 그대로 두고 범위 타입만 바꿔도 바로 검색할 수 있게
        this.Combo00_onitemchanged = function(obj,e)
        {
        	this.fn_selectDormantWithdrawnMembers();
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_Member_withdrawAndDormant_onload,this);
            this.status.addEventHandler("onclick",this.Static00_onclick,this);
            this.status00.addEventHandler("onclick",this.Static00_onclick,this);
            this.status01.addEventHandler("onclick",this.Static00_onclick,this);
            this.Radio00.addEventHandler("onitemchanged",this.Radio00_onitemchanged,this);
            this.Edit00.addEventHandler("onkeyup",this.Edit00_onkeyup,this);
            this.Edit00_00.addEventHandler("onkeyup",this.Edit00_00_onkeyup,this);
            this.Calendar00.addEventHandler("onchanged",this.Calendar00_onchanged,this);
            this.Calendar00_00.addEventHandler("onchanged",this.Calendar00_00_onchanged,this);
            this.Button00.addEventHandler("onclick",this.Button00_onclick,this);
            this.Button00_00.addEventHandler("onclick",this.Button00_00_onclick,this);
            this.grid_list.addEventHandler("oncellclick",this.grid_list_oncellclick,this);
            this.withdraw_btn.addEventHandler("onclick",this.withdraw_btn_onclick,this);
            this.domant_btn.addEventHandler("onclick",this.Button01_00_onclick,this);
            this.Combo00.addEventHandler("onitemchanged",this.Combo00_onitemchanged,this);
        };
        this.loadIncludeScript("Form_Member_withdrawAndDormant.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
