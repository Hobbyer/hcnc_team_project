(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_MemberWithdrawHistory");
            this.set_titletext("New Form");
            this.set_background("#F4F7FE");
            this.set_borderRadius("8px");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_loginType", this);
            obj._setContents("<ColumnInfo><Column id=\"NAME\" type=\"STRING\" size=\"256\"/><Column id=\"LOGIN_TYPE\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"NAME\">전체</Col></Row><Row><Col id=\"NAME\">홈페이지</Col><Col id=\"LOGIN_TYPE\">IDPW</Col></Row><Row><Col id=\"NAME\">카카오</Col><Col id=\"LOGIN_TYPE\">KAKAO</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_list", this);
            obj._setContents("<ColumnInfo><Column id=\"MEMBER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"USER_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"PHONE_NUMBER\" type=\"STRING\" size=\"256\"/><Column id=\"LOGIN_TYPE\" type=\"STRING\" size=\"256\"/><Column id=\"INPUT_DT\" type=\"STRING\" size=\"256\"/><Column id=\"DELETE_DT\" type=\"STRING\" size=\"256\"/><Column id=\"LOGIN_NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_search", this);
            obj._setContents("<ColumnInfo><Column id=\"LOGIN_TYPE\" type=\"STRING\" size=\"256\"/><Column id=\"MEMBER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"USER_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"PHONE_NUMBER\" type=\"STRING\" size=\"256\"/><Column id=\"DELETE_START_DT\" type=\"STRING\" size=\"256\"/><Column id=\"DELETE_END_DT\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_stats", this);
            obj._setContents("<ColumnInfo><Column id=\"CNT\" type=\"STRING\" size=\"256\"/><Column id=\"DELETE_MONTH\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Static("withDraw_search_box","40","17","1200","133",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_background("white");
            obj.set_text("");
            obj.set_borderRadius("8px");
            this.addChild(obj.name, obj);

            obj = new Grid("black_list","550","164","690",null,null,"20",null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_background("#FFFFFF");
            obj.set_border("0px none");
            obj.set_borderRadius("10px");
            obj.set_autofittype("col");
            obj.set_binddataset("ds_list");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"52\"/><Column size=\"157\"/><Column size=\"114\"/><Column size=\"147\"/><Column size=\"129\"/><Column size=\"220\"/><Column size=\"212\"/></Columns><Rows><Row size=\"48\" band=\"head\"/><Row size=\"40\"/></Rows><Band id=\"head\"><Cell text=\"NO\" textAlign=\"CENTER\" font=\"11pt/normal &quot;LG Smart UI Bold&quot;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"1\" text=\"아이디\" textAlign=\"CENTER\" font=\"11pt/normal &quot;LG Smart UI Bold&quot;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"2\" text=\"이름\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"3\" text=\"전화번호\" textAlign=\"CENTER\" font=\"11pt/normal &quot;LG Smart UI Bold&quot;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"4\" text=\"로그인 유형\" textAlign=\"CENTER\" font=\"11pt/normal &quot;LG Smart UI Bold&quot;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"5\" text=\"회원등록일\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\" font=\"11pt/normal &quot;LG Smart UI Bold&quot;\"/><Cell col=\"6\" text=\"회원탈퇴일\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\" font=\"11pt/normal &quot;LG Smart UI Bold&quot;\"/></Band><Band id=\"body\"><Cell text=\"expr:currow + 1\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"1\" text=\"bind:MEMBER_ID\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"2\" text=\"bind:USER_NAME\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"3\" text=\"bind:PHONE_NUMBER\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\" textAlign=\"center\" displaytype=\"mask\" edittype=\"mask\" maskedittype=\"string\" maskeditformat=\"###-####-####\"/><Cell col=\"4\" text=\"bind:LOGIN_NAME\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"5\" text=\"bind:INPUT_DT\" displaytype=\"normal\" edittype=\"none\" combocodecol=\"GRADE_CODE\" combodatacol=\"GRADE_NAME\" combodataset=\"ds_grade\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\" textAlign=\"center\"/><Cell col=\"6\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\" textAlign=\"center\" text=\"bind:DELETE_DT\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","66","36","54","32",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("가입 유형");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_01","80","90","40","32",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("아이디");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_01_00","470","37","27","32",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("이름");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_00","450","90","60","32",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("전화번호");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_00_00","790","37","70","32",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_text("회원 탈퇴일");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            this.addChild(obj.name, obj);

            obj = new Calendar("Calendar00","868","40","162","29",null,null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_border("1px solid black");
            obj.set_borderRadius("8px");
            this.addChild(obj.name, obj);

            obj = new Calendar("Calendar00_00","1058","41","162","29",null,null,null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_border("1px solid black");
            obj.set_borderRadius("8px");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_02","1040","43","20","22",null,null,null,null,null,null,this);
            obj.set_taborder("9");
            obj.set_text("~");
            obj.set_font("bold 14px/normal \"Gulim\"");
            this.addChild(obj.name, obj);

            obj = new Button("search_btn","860","90","130","37",null,null,null,null,null,null,this);
            obj.set_taborder("10");
            obj.set_text("검색하기");
            obj.set_background("#667eea");
            obj.set_borderRadius("8px");
            obj.set_color("#ffffff");
            obj.set_font("12px/normal \"Noto Sans KR Black\"");
            obj.set_border("0px solid #667eea");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);

            obj = new Button("Button01","1010","90","130","37",null,null,null,null,null,null,this);
            obj.set_taborder("11");
            obj.set_text("초기화");
            obj.set_background("#f5f5f5");
            obj.set_borderRadius("8px");
            obj.set_font("12px/normal \"Noto Sans KR Black\"");
            obj.set_border("1px solid #e0e0e0");
            obj.set_color("#666666");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);

            obj = new Radio("Radio00","142","38","224","29",null,null,null,null,null,null,this);
            obj.set_taborder("12");
            obj.set_innerdataset("ds_loginType");
            obj.set_codecolumn("LOGIN_TYPE");
            obj.set_datacolumn("NAME");
            obj.set_direction("vertical");
            obj.set_font("12px/normal \"Noto Sans KR Black\"");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit00","142","92","218","28",null,null,null,null,null,null,this);
            obj.set_taborder("13");
            obj.set_border("1px solid black");
            obj.set_borderRadius("8px");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit00_00","532","39","208","28",null,null,null,null,null,null,this);
            obj.set_taborder("14");
            obj.set_border("1px solid black");
            obj.set_borderRadius("8px");
            this.addChild(obj.name, obj);

            obj = new MaskEdit("MaskEdit00","532","90","208","28",null,null,null,null,null,null,this);
            obj.set_taborder("15");
            obj.set_border("1px solid black");
            obj.set_borderRadius("8px");
            obj.set_format("###-####-####");
            obj.set_type("string");
            this.addChild(obj.name, obj);

            obj = new BasicChart("BasicChart00","10","164","520","536",null,null,null,null,null,null,this);
            obj.set_taborder("16");
            obj.set_binddataset("ds_stats");
            obj._setContents({
            	"legend": {
            		"id": "legend",
            		"padding": "3px 10px 3px 10px",
            		"itemtextfont": "9pt '맑은 고딕'",
            		"itemtextcolor": "#4c4c4c",
            		"visible": false
            	},
            	"hrangebar": {
            		"id": "hrangebar",
            		"trackbarpadding": "1px",
            		"background": "#eaeaea",
            		"linestyle": "1px solid #d5d5d5",
            		"trackbarlinestyle": "0px none",
            		"trackbarfillstyle": "#c9c9c9",
            		"size": "12",
            		"visible": false
            	},
            	"vrangebar": {
            		"id": "vrangebar",
            		"trackbarpadding": "1px",
            		"background": "#eaeaea",
            		"linestyle": "1px solid #d5d5d5",
            		"trackbarlinestyle": "0px none",
            		"trackbarfillstyle": "#c9c9c9",
            		"size": "12",
            		"visible": false
            	},
            	"tooltip": {
            		"id": "tooltip",
            		"background": "#4b4b4b",
            		"linestyle": "0px none",
            		"textcolor": "white",
            		"textfont": "10pt/normal '맑은 고딕'",
            		"padding": "5px"
            	},
            	"board": {
            		"id": "board"
            	},
            	"categoryaxis": {
            		"id": "categoryaxis",
            		"titletext": "월별",
            		"titletextcolor": "#4c4c4c",
            		"titletextfont": "bold 14px/normal \"Noto Sans KR Black\"",
            		"labeltextcolor": "#6f6f6f",
            		"labeltextfont": "bold 12px/normal \"Noto Sans KR Black\"",
            		"axislinestyle": "1px solid #525252",
            		"ticklinestyle": "1px solid #525252",
            		"boardlinestyle": "1px solid #d0d0d0",
            		"titlegap": "8"
            	},
            	"seriesset": [
            		{
            			"id": "series0",
            			"titletext": "series",
            			"barvisible": true,
            			"barsize": "65",
            			"itemtextvisible": true,
            			"itemtextcolor": "#003860",
            			"itemtextfont": "16px/normal \"Noto Sans KR Black\"",
            			"valuecolumn": "bind:CNT",
            			"stacktype": "none",
            			"linevisible": false
            		}
            	],
            	"valueaxes": [
            		{
            			"id": "valueaxis0",
            			"titletext": "탈퇴 회원 수",
            			"boardlinevisible": true,
            			"boardlinestyle": "1px solid #d0d0d0",
            			"labeltextcolor": "#6f6f6f",
            			"labeltextfont": "bold 12px/normal \"Noto Sans KR Black\"",
            			"titletextcolor": "#4c4c4c",
            			"titletextfont": "bold 14px/normal \"Noto Sans KR Black\"",
            			"ticklinestyle": "1px solid #525252",
            			"axislinestyle": "1px solid #525252",
            			"titlegap": "12"
            		}
            	],
            	"title": {
            		"id": "title",
            		"text": "탈퇴 회원 통계",
            		"textfont": "20px/normal \"Noto Sans KR Black\"",
            		"padding": "0px 0px 5px",
            		"linestyle": "0px none"
            	}
            });
            obj.set_categorycolumn("bind:DELETE_MONTH");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1280,720,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item0","black_list","binddataset","ds_list","");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item1","Radio00","value","ds_search","LOGIN_TYPE");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item2","Edit00","value","ds_search","MEMBER_ID");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item3","Edit00_00","value","ds_search","USER_NAME");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item4","MaskEdit00","value","ds_search","PHONE_NUMBER");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item5","Calendar00","value","ds_search","DELETE_START_DT");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item6","Calendar00_00","value","ds_search","DELETE_END_DT");
            this.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Form_MemberWithdrawHistory.xfdl", function() {
        this.Form_MemberWithdrawHistory_onload = function(obj,e)
        {
        	this.fn_selectWithdrawMemberList();
        	this.fn_selectMemberWithdrawCnt();
        };



        //가입 이력 조회
        this.fn_selectWithdrawMemberList = function(){

        	var strSvcID = "selectWithdrawMemberList"
        	var setURL = "svc::/selectWithdrawMemberListByAdmin.do?time=" + new Date().getTime();
        	var strInDatasets = "ds_search=ds_search";
        	var strOutDatasets = "ds_list=ds_list";
        	var strArg = "";
        	var callBack = "fn_callBack";
        	var inAsync = true;

        	this.transaction(strSvcID,setURL,strInDatasets,strOutDatasets,strArg,callBack,inAsync);
        }

        //탈퇴 통계 조회
        this.fn_selectMemberWithdrawCnt = function(){

        	var strSvcID = "selectMemberWithdrawCnt"
        	var setURL = "svc::/selectMemberWithdrawCntByAdmin.do?time=" + new Date().getTime();
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
        	case "selectWithdrawMemberList" :
        		console.log(this.ds_list.saveXML());
        		break;

        	case "selectMemberWithdrawCnt" :
        		console.log(this.ds_stats.saveXML());
        		break;
        	}

        }

        //검색버튼
        this.search_btn_onclick = function(obj,e)
        {
        	this.fn_selectWithdrawMemberList();
        };

        //초기화
        this.Button01_onclick = function(obj,e)
        {
        	this.reload();
        };

        //로그인 타입 선택시 바로바로
        this.Radio00_onitemchanged = function(obj,e)
        {
        	this.fn_selectWithdrawMemberList();
        };

        //아이디 검색
        this.Edit00_onkeyup = function(obj,e)
        {
        	if(e.keycode == 13){
        		this.fn_selectWithdrawMemberList();
        	}
        };

        //이름 검색
        this.Edit00_00_onkeyup = function(obj,e)
        {
        	if(e.keycode == 13){
        		this.fn_selectWithdrawMemberList();
        	}
        };

        //전화번호 검색
        this.MaskEdit00_onkeyup = function(obj,e)
        {
        	if(e.keycode == 13){
        		this.fn_selectWithdrawMemberList();
        	}
        };

        //회원 탈퇴 시작일
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

            // 시작일은 00시 00분
            this.ds_search.setColumn(0, "DELETE_START_DT", startDate + "000000");

            // 종료일이 있으면 23시 59분까지 설정
            if (endDate) {
                this.ds_search.setColumn(0, "DELETE_END_DT", endDate + "235959");
            }

        	//자동 검색
        	this.fn_selectWithdrawMemberList();
        };

        //회원 탈퇴 종료일
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
            this.ds_search.setColumn(0, "DELETE_END_DT", endDate + "235959");

            // 시작일이 있으면 00시 00분까지 세팅
            if (startDate) {
                this.ds_search.setColumn(0, "DELETE_START_DT", startDate + "000000");
            }

        	//자동 검색
        	this.fn_selectWithdrawMemberList();
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_MemberWithdrawHistory_onload,this);
            this.withDraw_search_box.addEventHandler("onclick",this.reg_search_box_onclick,this);
            this.black_list.addEventHandler("oncellclick",this.black_list_oncellclick,this);
            this.Static00.addEventHandler("onclick",this.Static00_onclick,this);
            this.Calendar00.addEventHandler("onchanged",this.Calendar00_onchanged,this);
            this.Calendar00_00.addEventHandler("onchanged",this.Calendar00_00_onchanged,this);
            this.search_btn.addEventHandler("onclick",this.search_btn_onclick,this);
            this.Button01.addEventHandler("onclick",this.Button01_onclick,this);
            this.Radio00.addEventHandler("onitemchanged",this.Radio00_onitemchanged,this);
            this.Edit00.addEventHandler("onchanged",this.Edit00_onchanged,this);
            this.Edit00.addEventHandler("onkeyup",this.Edit00_onkeyup,this);
            this.Edit00_00.addEventHandler("onkeyup",this.Edit00_00_onkeyup,this);
            this.MaskEdit00.addEventHandler("onchanged",this.MaskEdit00_onchanged,this);
            this.MaskEdit00.addEventHandler("onkeyup",this.MaskEdit00_onkeyup,this);
        };
        this.loadIncludeScript("Form_MemberWithdrawHistory.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
