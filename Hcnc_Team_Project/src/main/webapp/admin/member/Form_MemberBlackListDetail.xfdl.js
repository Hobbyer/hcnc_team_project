(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_MemberBlackListDetail");
            this.set_titletext("New Form");
            this.set_background("#F4F7FE");
            if (Form == this.constructor)
            {
                this._setFormPosition(710,540);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_list", this);
            obj._setContents("<ColumnInfo><Column id=\"MEMBER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"REPORT_TYPE\" type=\"STRING\" size=\"256\"/><Column id=\"REPORT_CONTENT\" type=\"STRING\" size=\"256\"/><Column id=\"INPUT_DT\" type=\"STRING\" size=\"256\"/><Column id=\"REPORT_STATUS\" type=\"STRING\" size=\"256\"/><Column id=\"REPORT_ID\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_status", this);
            obj._setContents("<ColumnInfo><Column id=\"REPORT_STATUS\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"REPORT_STATUS\">신고처리</Col></Row><Row><Col id=\"REPORT_STATUS\">신고취소</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_upCnt", this);
            obj._setContents("<ColumnInfo><Column id=\"UPDATED\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Div("Div00","10","40","690","445",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_background("lightGray");
            obj.set_borderRadius("12px");
            obj.set_text("");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","630","500","60","25",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("ESC[닫기]");
            obj.set_color("RED");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static01","20","10","70","25",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("신고 내역");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            this.addChild(obj.name, obj);

            obj = new Grid("black_list","20","50","670","420",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_background("#FFFFFF");
            obj.set_border("0px none");
            obj.set_borderRadius("10px");
            obj.set_autofittype("col");
            obj.set_binddataset("ds_list");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"43\"/><Column size=\"91\"/><Column size=\"74\"/><Column size=\"214\"/><Column size=\"106\"/><Column size=\"144\"/></Columns><Rows><Row size=\"48\" band=\"head\"/><Row size=\"40\"/></Rows><Band id=\"head\"><Cell text=\"NO\" textAlign=\"CENTER\" font=\"11pt/normal &quot;Noto Sans KR Black&quot;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"1\" text=\"아이디\" textAlign=\"CENTER\" font=\"11pt/normal &quot;Noto Sans KR Black&quot;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"2\" text=\"신고유형\" textAlign=\"CENTER\" font=\"11pt/normal &quot;Noto Sans KR Black&quot;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"3\" text=\"신고내용\" textAlign=\"CENTER\" font=\"11pt/normal &quot;Noto Sans KR Black&quot;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"4\" text=\"상태\" textAlign=\"CENTER\" font=\"11pt/normal &quot;Noto Sans KR Black&quot;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"5\" text=\"신고일자\" textAlign=\"CENTER\" font=\"11pt/normal &quot;Noto Sans KR Black&quot;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/></Band><Band id=\"body\"><Cell text=\"expr:currow + 1\" textAlign=\"center\" font=\"12px/normal &quot;LG Smart UI Bold&quot;\"/><Cell col=\"1\" text=\"bind:MEMBER_ID\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"2\" text=\"bind:REPORT_TYPE\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"3\" text=\"bind:REPORT_CONTENT\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"4\" text=\"bind:REPORT_STATUS\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\" displaytype=\"combocontrol\" edittype=\"combo\" combocodecol=\"REPORT_STATUS\" combodatacol=\"REPORT_STATUS\" combodataset=\"ds_status\"/><Cell col=\"5\" text=\"bind:INPUT_DT\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Button("status_change_btn","303","495","95","35",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("상태 변경");
            obj.set_background("#667eea");
            obj.set_borderRadius("8px");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            obj.set_color("#ffffff");
            obj.set_border("0px solid #667eea");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",710,540,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item0","black_list","binddataset","ds_user","");
            this.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Form_MemberBlackListDetail.xfdl", function() {
        this.Form_MemberBlackListDetail_onload = function(obj,e)
        {
        	// 부모 폼으로부터 전달된 파라미터에 직접 접근
            var memberId = this.parent.MEMBER_ID;
        	trace("ㅇㅇ :" + memberId)

        	this.fn_selectBlackListDetail(memberId);

        };

        //블랙 리스트 신고 내역 조회
        this.fn_selectBlackListDetail= function(memberId){

        	var strSvcID = "selectBlackDetailList"
        	var setURL = "svc::/selectBlackDetailListByAdmin.do?time=" + new Date().getTime();
        	var strInDatasets = "";
        	var strOutDatasets = "ds_list=ds_list";
        	//단일값으로 memberId를 보내서 BOARD_WRITER에 담는다
        	var strArg = "memberId="+memberId;
        	var callBack = "fn_callBack";
        	var inAsync = true;

        	this.transaction(strSvcID,setURL,strInDatasets,strOutDatasets,strArg,callBack,inAsync);
        }

        //상태변경
        this.status_change_btn_onclick = function(obj,e)
        {
        	var strSvcID = "updateMemberBlackStatusList";
        	var setURL = "svc::/updateMemberBlackStatusListByAdmin.do?time=" + new Date().getTime();
        	var strInDatasets = "ds_list=ds_list:u"; // 수정된 데이터만 서버로 보냄
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
        	case "selectBlackDetailList" :
        		console.log(this.ds_list.saveXML());
        		break;


        	case "updateMemberBlackStatusList" :
        		if(this.ds_upCnt.getColumn(0,"UPDATED")>0){
        			this.alert('상태가 변경 되었습니다')
        			this.close();
        		}else{
        			this.alert('상태가 변경 되지 않았습니다 다시 확인하세요')
        			this.reload();
        		}

        	}

        }

        //esc 눌렀을때 닫힘
        this.Form_MemberBlackListDetail_onkeyup = function(obj,e)
        {
        	if(e.keycode == 27){
        		this.close();
        	}
        };

        //그냥 클릭해도 닫히게
        this.Static00_onclick = function(obj,e)
        {
        	this.close();
        };


        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onkeyup",this.Form_MemberBlackListDetail_onkeyup,this);
            this.addEventHandler("onload",this.Form_MemberBlackListDetail_onload,this);
            this.Static00.addEventHandler("onclick",this.Static00_onclick,this);
            this.black_list.addEventHandler("oncellclick",this.black_list_oncellclick,this);
            this.status_change_btn.addEventHandler("onclick",this.status_change_btn_onclick,this);
        };
        this.loadIncludeScript("Form_MemberBlackListDetail.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
