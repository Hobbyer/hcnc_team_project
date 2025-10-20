(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_MemberRegHistory");
            this.set_titletext("New Form");
            this.set_background("#F4F7FE");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_loginType", this);
            obj._setContents("<ColumnInfo><Column id=\"NAME\" type=\"STRING\" size=\"256\"/><Column id=\"LOGIN_TYPE\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"NAME\">전체</Col><Col id=\"LOGIN_TYPE\"/></Row><Row><Col id=\"NAME\">홈페이지</Col><Col id=\"LOGIN_TYPE\">IDPW</Col></Row><Row><Col id=\"NAME\">카카오</Col><Col id=\"LOGIN_TYPE\">KAKAO</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_list", this);
            obj._setContents("<ColumnInfo><Column id=\"MEMBER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"USER_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"PHONE_NUMBER\" type=\"STRING\" size=\"256\"/><Column id=\"LOGIN_TYPE\" type=\"STRING\" size=\"256\"/><Column id=\"INPUT_DT\" type=\"STRING\" size=\"256\"/><Column id=\"LOGIN_NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_search", this);
            obj._setContents("<ColumnInfo><Column id=\"LOGIN_TYPE\" type=\"STRING\" size=\"256\"/><Column id=\"MEMBER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"USER_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"PHONE_NUMBER\" type=\"STRING\" size=\"256\"/><Column id=\"INPUT_START_DT\" type=\"STRING\" size=\"256\"/><Column id=\"INPUT_END_DT\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_stats", this);
            obj._setContents("<ColumnInfo><Column id=\"LOGIN_TYPE\" type=\"STRING\" size=\"256\"/><Column id=\"RATE\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Static("reg_search_box","40","17","1200","143",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_background("white");
            obj.set_text("");
            obj.set_borderRadius("8px");
            this.addChild(obj.name, obj);

            obj = new Grid("black_list","500","170","740",null,null,"20",null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_background("#FFFFFF");
            obj.set_border("0px none");
            obj.set_borderRadius("10px");
            obj.set_autofittype("col");
            obj.set_binddataset("ds_list");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"52\"/><Column size=\"165\"/><Column size=\"127\"/><Column size=\"185\"/><Column size=\"171\"/><Column size=\"230\"/></Columns><Rows><Row size=\"48\" band=\"head\"/><Row size=\"40\"/></Rows><Band id=\"head\"><Cell text=\"NO\" textAlign=\"CENTER\" font=\"11pt/normal &quot;LG Smart UI Bold&quot;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"1\" text=\"아이디\" textAlign=\"CENTER\" font=\"11pt/normal &quot;LG Smart UI Bold&quot;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"2\" text=\"이름\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"3\" text=\"전화번호\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"4\" text=\"회원가입 경로\" textAlign=\"CENTER\" font=\"11pt/normal &quot;LG Smart UI Bold&quot;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"5\" text=\"회원등록일\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\" font=\"11pt/normal &quot;LG Smart UI Bold&quot;\"/></Band><Band id=\"body\"><Cell text=\"expr:currow + 1\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"1\" text=\"bind:MEMBER_ID\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"2\" text=\"bind:USER_NAME\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"3\" text=\"bind:PHONE_NUMBER\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\" textAlign=\"center\" displaytype=\"mask\" edittype=\"mask\" maskedittype=\"string\" maskeditformat=\"###-####-####\"/><Cell col=\"4\" text=\"bind:LOGIN_NAME\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"5\" text=\"bind:INPUT_DT\" displaytype=\"normal\" edittype=\"none\" combocodecol=\"GRADE_CODE\" combodatacol=\"GRADE_NAME\" combodataset=\"ds_grade\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\" textAlign=\"center\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","56","36","54","32",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("가입 경로");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_00","430","90","60","32",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("전화번호");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_01","60","90","40","32",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("아이디");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_01_00","450","37","27","32",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("이름");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_00_00","800","37","70","32",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_text("회원 등록일");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            this.addChild(obj.name, obj);

            obj = new Radio("login_type","133","40","256","26",null,null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_innerdataset("ds_loginType");
            obj.set_codecolumn("LOGIN_TYPE");
            obj.set_datacolumn("NAME");
            obj.set_direction("vertical");
            obj.set_font("12px/normal \"Noto Sans KR Black\"");
            this.addChild(obj.name, obj);

            obj = new Edit("search_member_id","123","92","256","28",null,null,null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_borderRadius("8px");
            obj.set_border("1px solid black");
            this.addChild(obj.name, obj);

            obj = new Edit("search_user_name","510","40","256","28",null,null,null,null,null,null,this);
            obj.set_taborder("9");
            obj.set_borderRadius("8px");
            obj.set_border("1px solid black");
            this.addChild(obj.name, obj);

            obj = new MaskEdit("search_phoneNumber","510","91","254","31",null,null,null,null,null,null,this);
            obj.set_taborder("10");
            obj.set_border("1px solid black");
            obj.set_borderRadius("8px");
            obj.set_format("###-####-####");
            obj.set_type("string");
            this.addChild(obj.name, obj);

            obj = new Calendar("Calendar00","880","40","160","30",null,null,null,null,null,null,this);
            obj.set_taborder("11");
            obj.set_border("1px solid black");
            obj.set_borderRadius("8px");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_02","1050","43","20","22",null,null,null,null,null,null,this);
            obj.set_taborder("12");
            obj.set_text("~");
            obj.set_font("bold 14px/normal \"Gulim\"");
            this.addChild(obj.name, obj);

            obj = new Calendar("Calendar01","1070","40","160","30",null,null,null,null,null,null,this);
            obj.set_taborder("13");
            obj.set_border("1px solid black");
            obj.set_borderRadius("8px");
            this.addChild(obj.name, obj);

            obj = new Button("search_btn","895","92","125","36",null,null,null,null,null,null,this);
            obj.set_taborder("14");
            obj.set_text("검색하기");
            obj.set_background("#667eea");
            obj.set_borderRadius("8px");
            obj.set_font("12px/normal \"Noto Sans KR Black\"");
            obj.set_color("#ffffff");
            obj.set_border("0px solid #667eea");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);

            obj = new Button("reset_btn","1040","92","130","36",null,null,null,null,null,null,this);
            obj.set_taborder("15");
            obj.set_text("초기화");
            obj.set_background("#f5f5f5");
            obj.set_borderRadius("8px");
            obj.set_font("12px/normal \"Noto Sans KR Black\"");
            obj.set_border("1px solid #e0e0e0");
            obj.set_color("#666666");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);

            obj = new PieChart("LoginStats","28","180","462","514",null,null,null,null,null,null,this);
            obj.set_taborder("16");
            obj.set_binddataset("ds_stats");
            obj._setContents({
            	"title": {
            		"id": "title",
            		"text": "회원 비율",
            		"textfont": "20pt/normal \"LG Smart UI Bold\"",
            		"padding": "0px 0px 5px"
            	},
            	"legend": {
            		"id": "legend",
            		"padding": "3px 10px 3px 10px",
            		"itemtextfont": "9pt '맑은 고딕'",
            		"itemtextcolor": "#4c4c4c"
            	},
            	"tooltip": {
            		"id": "tooltip",
            		"background": "#4b4b4b",
            		"linestyle": "0px none",
            		"textcolor": "#ffffff",
            		"textfont": "10pt/normal '맑은 고딕'",
            		"padding": "5px"
            	},
            	"board": {
            		"id": "board"
            	},
            	"seriesset": [
            		{
            			"id": "series0",
            			"radius": 150,
            			"innerradius": 70,
            			"linestyle": "2px solid #ffffff",
            			"itemtextvisible": true,
            			"itemtextfont": "16pt/normal \"LG Smart UI Bold\"",
            			"valuecolumn": "bind:RATE"
            		}
            	]
            });
            obj.set_categorycolumn("bind:LOGIN_TYPE");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1280,720,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item0","black_list","binddataset","ds_list","");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item1","login_type","value","ds_search","LOGIN_TYPE");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item2","search_member_id","value","ds_search","MEMBER_ID");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item3","search_user_name","value","ds_search","USER_NAME");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item7","Calendar00","value","ds_search","INPUT_START_DT");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item8","Calendar01","value","ds_search","INPUT_END_DT");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item4","search_phoneNumber","value","ds_search","PHONE_NUMBER");
            this.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Form_MemberRegHistory.xfdl", function() {
        this.Form_MemberRegHistory_onload = function(obj,e)
        {
        	this.fn_selectMemberRegHistoryList();
        	this.fn_selectLoginTypeStats();
        };


        //가입 이력 조회
        this.fn_selectMemberRegHistoryList = function(){

        	var strSvcID = "selectMemberRegHistoryList"
        	var setURL = "svc::/selectMemberRegHistoryListByAdmin.do?time=" + new Date().getTime();
        	var strInDatasets = "ds_search=ds_search";
        	var strOutDatasets = "ds_list=ds_list";
        	var strArg = "";
        	var callBack = "fn_callBack";
        	var inAsync = true;

        	this.transaction(strSvcID,setURL,strInDatasets,strOutDatasets,strArg,callBack,inAsync);
        }

        //회원 통계 조회
        this.fn_selectLoginTypeStats = function(){

        	var strSvcID = "selectLoginTypeStats"
        	var setURL = "svc::/selectLoginTypeStatsByAdmin.do?time=" + new Date().getTime();
        	var strInDatasets = "";
        	var strOutDatasets = "ds_stats=ds_stats";
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
        	case "selectMemberRegHistoryList" :
        		console.log(this.ds_list.saveXML());
        		break;
        	case "selectLoginTypeStats" :
        		console.log(this.ds_stats.saveXML());
        		break;
        	}

        }

        //검색버튼
        this.search_btn_onclick = function(obj,e)
        {
        	this.fn_selectMemberRegHistoryList();
        };


        //초기화
        this.reset_btn_onclick = function(obj,e)
        {
        	this.reload();
        };


        //로그인 타입
        this.login_type_onitemchanged = function(obj,e)
        {
        	this.fn_selectMemberRegHistoryList();
        };

        //아이디 //에딧 타입은 onkeyup
        this.search_member_id_onkeyup = function(obj,e)
        {
        	if(e.keycode == 13){
        		this.fn_selectMemberRegHistoryList();
        	}
        };

        //이름
        this.search_user_name_onkeyup = function(obj,e)
        {
        	if(e.keycode == 13){
        		this.fn_selectMemberRegHistoryList();
        	}
        };

        //전화번호
        this.search_phoneNumber_onkeyup = function(obj,e)
        {
        	if(e.keycode == 13){
        		this.fn_selectMemberRegHistoryList();
        	}
        };

        // 시작일 변경 이벤트
        this.Calendar00_onchanged = function(obj, e)
        {
            var startDate = this.Calendar00.value;
            var endDate   = this.Calendar01.value;

            if (!startDate) return; // 시작일 없으면 처리 중단

            // 종료일이 있고, 종료일이 시작일보다 빠른 경우
            if (endDate && endDate < startDate) {
                this.alert("종료일은 시작일보다 빠를 수 없습니다.");
                this.Calendar01.set_value(startDate);
                endDate = startDate;
            }

            // 시작일은 00시 00분
            this.ds_search.setColumn(0, "INPUT_START_DT", startDate + "000000");

            // 종료일이 있으면 23시 59분까지 설정
            if (endDate) {
                this.ds_search.setColumn(0, "INPUT_END_DT", endDate + "235959");
            }

        	//자동 검색
        	this.fn_selectMemberRegHistoryList();
        };

        // 종료일 변경 이벤트
        this.Calendar01_onchanged = function(obj, e)
        {
            var startDate = this.Calendar00.value;
            var endDate   = this.Calendar01.value;

            if (!endDate) return; // 종료일 없으면 처리 중단

            // 종료일이 시작일보다 빠른 경우
            if (startDate && endDate < startDate) {
                this.alert("종료일은 시작일보다 빠를 수 없습니다.");
                this.Calendar01.set_value(startDate);
                endDate = startDate;
            }

            // 종료일은 23시 59분
            this.ds_search.setColumn(0, "INPUT_END_DT", endDate + "235959");

            // 시작일이 있으면 00시 00분까지 세팅
            if (startDate) {
                this.ds_search.setColumn(0, "INPUT_START_DT", startDate + "000000");
            }

        	//자동 검색
        	this.fn_selectMemberRegHistoryList();
        };


        //차트 막대 클릭하면 검색되기
        //온 시리즈 클릭 이벤트
        this.LoginStats_onseriesclick = function(obj,e)
        {
        	var index = e.itemindex

        	if(index == 1){
        		var kakao = "KAKAO"
        		this.ds_search.setColumn(0,"LOGIN_TYPE",kakao)
        		this.fn_selectMemberRegHistoryList();
        	}else{
        		var idpw= "IDPW"
        		this.ds_search.setColumn(0,"LOGIN_TYPE",idpw)
        		this.fn_selectMemberRegHistoryList();
        	}

        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_MemberRegHistory_onload,this);
            this.reg_search_box.addEventHandler("onclick",this.reg_search_box_onclick,this);
            this.black_list.addEventHandler("oncellclick",this.black_list_oncellclick,this);
            this.Static00.addEventHandler("onclick",this.Static00_onclick,this);
            this.login_type.addEventHandler("onitemchanged",this.login_type_onitemchanged,this);
            this.search_member_id.addEventHandler("onchanged",this.search_member_id_onchanged,this);
            this.search_member_id.addEventHandler("onkeyup",this.search_member_id_onkeyup,this);
            this.search_user_name.addEventHandler("onchanged",this.search_user_name_onchanged,this);
            this.search_user_name.addEventHandler("onkeyup",this.search_user_name_onkeyup,this);
            this.search_phoneNumber.addEventHandler("onkeyup",this.search_phoneNumber_onkeyup,this);
            this.Calendar00.addEventHandler("onchanged",this.Calendar00_onchanged,this);
            this.Calendar01.addEventHandler("onchanged",this.Calendar01_onchanged,this);
            this.search_btn.addEventHandler("onclick",this.search_btn_onclick,this);
            this.reset_btn.addEventHandler("onclick",this.reset_btn_onclick,this);
            this.LoginStats.addEventHandler("onseriesclick",this.LoginStats_onseriesclick,this);
        };
        this.loadIncludeScript("Form_MemberRegHistory.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
