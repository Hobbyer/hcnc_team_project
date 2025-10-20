(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_MemberPointAndCoupon");
            this.set_titletext("New Form");
            this.set_background("#F4F7FE");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_list", this);
            obj._setContents("<ColumnInfo><Column id=\"MEMBER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"USER_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"PHONE_NUMBER\" type=\"STRING\" size=\"256\"/><Column id=\"POINT\" type=\"STRING\" size=\"256\"/><Column id=\"COUPON_CNT\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_search", this);
            obj._setContents("<ColumnInfo><Column id=\"MEMBER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"USER_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"PHONE_NUMBER\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Static("point_search_box","40","17","1200","93",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_background("white");
            obj.set_text("");
            obj.set_borderRadius("8px");
            this.addChild(obj.name, obj);

            obj = new Edit("member_name","100","47","200","33",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_border("1px solid black");
            obj.set_borderRadius("8px");
            this.addChild(obj.name, obj);

            obj = new Edit("user_name","400","47","200","33",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_border("1px solid black");
            obj.set_borderRadius("8px");
            this.addChild(obj.name, obj);

            obj = new Grid("pointAndCoupon","40","130","1200",null,null,"20",null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_background("#FFFFFF");
            obj.set_border("0px none");
            obj.set_borderRadius("10px");
            obj.set_autofittype("col");
            obj.set_binddataset("ds_list");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"52\"/><Column size=\"194\"/><Column size=\"136\"/><Column size=\"178\"/><Column size=\"132\"/><Column size=\"119\"/><Column size=\"162\"/><Column size=\"123\"/></Columns><Rows><Row size=\"48\" band=\"head\"/><Row size=\"40\"/></Rows><Band id=\"head\"><Cell text=\"NO\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"1\" text=\"아이디\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"2\" text=\"이름\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"3\" text=\"전화번호\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"4\" text=\"포인트 잔액\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"5\" text=\"포인트 상세\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"6\" text=\"사용가능 쿠폰수\" textAlign=\"CENTER\" font=\"11pt/normal &quot;LG Smart UI Bold&quot;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"7\" text=\"쿠폰 상세\" textAlign=\"CENTER\" font=\"11pt/normal &quot;LG Smart UI Bold&quot;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/></Band><Band id=\"body\"><Cell text=\"expr:currow + 1\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\" textAlign=\"center\"/><Cell col=\"1\" text=\"bind:MEMBER_ID\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"2\" text=\"bind:USER_NAME\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"3\" text=\"bind:PHONE_NUMBER\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\" displaytype=\"mask\" edittype=\"mask\" maskedittype=\"string\" maskeditformat=\"###-####-####\"/><Cell col=\"4\" edittype=\"normal\" text=\"bind:POINT\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"5\" displaytype=\"buttoncontrol\" edittype=\"button\" text=\"상세 포인트 내역\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"6\" text=\"bind:COUPON_CNT\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"7\" displaytype=\"buttoncontrol\" edittype=\"button\" text=\"상세 쿠폰 내역\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Button("select_btn","990","44","100","41",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("조회하기");
            obj.set_background("#667eea");
            obj.set_borderRadius("8px");
            obj.set_color("#ffffff");
            obj.set_font("12px/normal \"Noto Sans KR Black\"");
            obj.set_border("0px solid #667eea");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);

            obj = new Button("cancel_btn","1110","43","100","41",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("초기화");
            obj.set_background(" #f5f5f5");
            obj.set_borderRadius("8px");
            obj.set_font("12px/normal \"Noto Sans KR Black\"");
            obj.set_border("1px solid #e0e0e0");
            obj.set_color("#666666");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);

            obj = new MaskEdit("MaskEdit00","720","47","200","33",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_border("1px solid black");
            obj.set_borderRadius("8px");
            obj.set_format("###-####-####");
            obj.set_type("string");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","50","49","42","28",null,null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_text("아이디");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_00","360","49","28","28",null,null,null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_text("이름");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_00_00","653","52","57","24",null,null,null,null,null,null,this);
            obj.set_taborder("9");
            obj.set_text("전화번호");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1280,720,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item0","member_name","value","ds_search","MEMBER_ID");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item1","user_name","value","ds_search","USER_NAME");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item3","pointAndCoupon","binddataset","ds_user","");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item2","MaskEdit00","value","ds_search","PHONE_NUMBER");
            this.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Form_MemberPointAndCoupon.xfdl", function() {
        this.Form_MemberPointAndCoupon_onload = function(obj,e)
        {
        	this.fn_selectPointAndCoupon();
        };


        //회원 포인트 쿠폰 관리 리스트 조회
        this.fn_selectPointAndCoupon= function(){

        	var strSvcID = "selectPointAndCouponList"
        	var setURL = "svc::/selectPointAndCouponListByAdmin.do?time=" + new Date().getTime();
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
        	case "selectPointAndCouponList" :
        		console.log(this.ds_list.saveXML());
        		break;

        	}

        }

        //검색하기
        this.select_btn_onclick = function(obj,e)
        {
        	this.fn_selectPointAndCoupon();
        };

        //초기화 하기
        this.cancel_btn_onclick = function(obj,e)
        {
        	this.reload();
        };

        //상세 버튼 클릭시 각각의 상세페이지로 이동
        //5 포인트 상세 , 7 쿠폰상세
        this.pointAndCoupon_oncellclick = function(obj,e)
        {

        	if(e.cell == 5){
        		var memberId = this.ds_list.getColumn(e.row,"MEMBER_ID")

        		//부모페이지 자식페이지 값 전달하기 arguments
        		this.getOwnerFrame().arguments = {"MEMBER_ID" : memberId}

        		this.getOwnerFrame().set_formurl("member::Form_MemberPointDetail.xfdl");
        	}else if(e.cell == 7){
        		var memberId = this.ds_list.getColumn(e.row,"MEMBER_ID")

        		//부모페이지 자식페이지 값 전달하기 arguments
        		this.getOwnerFrame().arguments = {"MEMBER_ID" : memberId}

        		this.getOwnerFrame().set_formurl("member::Form_memberCouponDetail.xfdl");
        	}
        };

        //아이디 검색
        this.member_name_onkeyup = function(obj,e)
        {
        	if(e.keycode == 13){
        		this.fn_selectPointAndCoupon();
        	}
        };

        //이름 검색
        this.user_name_onkeyup = function(obj,e)
        {
        	if(e.keycode == 13){
        		this.fn_selectPointAndCoupon();
        	}
        };

        //전화번호
        this.MaskEdit00_onkeyup = function(obj,e)
        {
        	if(e.keycode == 13){
        		this.fn_selectPointAndCoupon();
        	}
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_MemberPointAndCoupon_onload,this);
            this.member_name.addEventHandler("onchanged",this.member_name_onchanged,this);
            this.member_name.addEventHandler("onkeyup",this.member_name_onkeyup,this);
            this.user_name.addEventHandler("onchanged",this.grade_emil_onchanged,this);
            this.user_name.addEventHandler("onkeyup",this.user_name_onkeyup,this);
            this.pointAndCoupon.addEventHandler("oncellclick",this.pointAndCoupon_oncellclick,this);
            this.select_btn.addEventHandler("onclick",this.select_btn_onclick,this);
            this.cancel_btn.addEventHandler("onclick",this.cancel_btn_onclick,this);
            this.MaskEdit00.addEventHandler("onkeyup",this.MaskEdit00_onkeyup,this);
        };
        this.loadIncludeScript("Form_MemberPointAndCoupon.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
