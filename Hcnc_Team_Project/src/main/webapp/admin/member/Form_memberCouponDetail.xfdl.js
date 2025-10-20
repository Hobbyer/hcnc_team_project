(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_memberCouponDetail");
            this.set_titletext("New Form");
            this.set_background("#F4F7FE");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_list", this);
            obj._setContents("<ColumnInfo><Column id=\"COUPON_CODE\" type=\"STRING\" size=\"256\"/><Column id=\"COUPON_TYPE\" type=\"STRING\" size=\"256\"/><Column id=\"DISCOUNT_UNIT\" type=\"STRING\" size=\"256\"/><Column id=\"DISCOUNT_VALUE\" type=\"STRING\" size=\"256\"/><Column id=\"MIN_ORDER_PRICE\" type=\"STRING\" size=\"256\"/><Column id=\"ISSUED_DT\" type=\"STRING\" size=\"256\"/><Column id=\"EXPIRY_DT\" type=\"STRING\" size=\"256\"/><Column id=\"IS_USED\" type=\"STRING\" size=\"256\"/><Column id=\"USED_DT\" type=\"STRING\" size=\"256\"/><Column id=\"ORDER_NUMBER\" type=\"STRING\" size=\"256\"/><Column id=\"COUPON_NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_search", this);
            obj._setContents("<ColumnInfo><Column id=\"IS_USED\" type=\"STRING\" size=\"256\"/><Column id=\"COUPON_TYPE\" type=\"STRING\" size=\"256\"/><Column id=\"MEMBER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"SEARCH_START_DATE\" type=\"STRING\" size=\"256\"/><Column id=\"SEARCH_END_DATE\" type=\"STRING\" size=\"256\"/><Column id=\"SEARCH_DATE\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_use", this);
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"256\"/><Column id=\"IS_USED\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"CODE\">전체</Col></Row><Row><Col id=\"CODE\">사용</Col><Col id=\"IS_USED\">Y</Col></Row><Row><Col id=\"CODE\">미사용</Col><Col id=\"IS_USED\">N</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_date", this);
            obj._setContents("<ColumnInfo><Column id=\"SEARCH_DATE\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"SEARCH_DATE\">발급일자</Col></Row><Row><Col id=\"SEARCH_DATE\">만료일자</Col></Row></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Static("point_detail_box","40","14","1200","156",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_background("white");
            obj.set_text("");
            obj.set_borderRadius("8px");
            this.addChild(obj.name, obj);

            obj = new Grid("coupon","40","180","1200",null,null,"60",null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_background("#FFFFFF");
            obj.set_border("0px none");
            obj.set_borderRadius("10px");
            obj.set_autofittype("col");
            obj.set_binddataset("ds_list");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"52\"/><Column size=\"162\"/><Column size=\"160\"/><Column size=\"145\"/><Column size=\"84\"/><Column size=\"83\"/><Column size=\"117\"/><Column size=\"159\"/><Column size=\"144\"/><Column size=\"70\"/><Column size=\"117\"/><Column size=\"164\"/></Columns><Rows><Row size=\"48\" band=\"head\"/><Row size=\"40\"/></Rows><Band id=\"head\"><Cell text=\"NO\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"1\" text=\"쿠폰코드\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"2\" text=\"쿠폰 명\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"3\" text=\"쿠폰종류\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"4\" text=\"할인방식\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"5\" text=\"할인값\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"6\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\" text=\"최소주문액\"/><Cell col=\"7\" text=\"발급일\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"8\" text=\"만료일\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"9\" text=\"사용여부\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"10\" text=\"사용일자\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/><Cell col=\"11\" text=\"주문번호\" textAlign=\"CENTER\" font=\"bold 11pt &apos;LG Smart UI Bold&apos;\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #eeeeee, 0px none\" color=\"#222222\"/></Band><Band id=\"body\"><Cell text=\"expr:currow + 1\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\" textAlign=\"center\"/><Cell col=\"1\" text=\"bind:COUPON_CODE\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"2\" text=\"bind:COUPON_NAME\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\" textAlign=\"center\"/><Cell col=\"3\" text=\"bind:COUPON_TYPE\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"4\" text=\"bind:DISCOUNT_UNIT\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"5\" edittype=\"normal\" text=\"bind:DISCOUNT_VALUE\" textAlign=\"center\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\"/><Cell col=\"6\" displaytype=\"normal\" edittype=\"none\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\" text=\"bind:MIN_ORDER_PRICE\" textAlign=\"center\"/><Cell col=\"7\" text=\"bind:ISSUED_DT\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\" textAlign=\"center\"/><Cell col=\"8\" text=\"bind:EXPIRY_DT\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\" textAlign=\"center\"/><Cell col=\"9\" text=\"bind:IS_USED\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\" textAlign=\"center\"/><Cell col=\"10\" text=\"bind:USED_DT\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\" textAlign=\"center\" calendardisplaynulltype=\"none\" displaytype=\"date\"/><Cell col=\"11\" text=\"bind:ORDER_NUMBER\" font=\"12px/normal &quot;Noto Sans KR Black&quot;\" textAlign=\"center\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Radio("Radio00","130","31","204","24",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_innerdataset("ds_use");
            obj.set_codecolumn("IS_USED");
            obj.set_datacolumn("CODE");
            obj.set_direction("vertical");
            obj.set_font("12px/normal \"Noto Sans KR Black\"");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit00","126","70","324","30",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_border("1px solid black");
            obj.set_borderRadius("8px");
            this.addChild(obj.name, obj);

            obj = new Calendar("Calendar00","607","69","213","32",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_border("1px solid black");
            obj.set_borderRadius("8px");
            this.addChild(obj.name, obj);

            obj = new Calendar("Calendar01","850","69","204","31",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_border("1px solid black");
            obj.set_borderRadius("8px");
            this.addChild(obj.name, obj);

            obj = new Button("back_btn","556","670","104","34",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_text("뒤로가기");
            obj.set_background("#667eea");
            obj.set_borderRadius("8px");
            obj.set_color("#ffffff");
            obj.set_font("11px/normal \"Noto Sans KR Black\"");
            obj.set_border("0px solid #667eea");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);

            obj = new Button("Button00","562","125","78","31",null,null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_text("조회하기");
            obj.set_background("#667eea");
            obj.set_borderRadius("8px");
            obj.set_color("#ffffff");
            obj.set_font("11px/normal \"Noto Sans KR Black\"");
            obj.set_border("0px solid #667eea");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);

            obj = new Button("Button01","652","126","78","30",null,null,null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_text("초기화");
            obj.set_background(" #f5f5f5");
            obj.set_borderRadius("8px");
            obj.set_font("11px/normal \"Noto Sans KR Black\"");
            obj.set_border("1px solid #e0e0e0");
            obj.set_color("#666666");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);

            obj = new Button("Button02","670","670","98","34",null,null,null,null,null,null,this);
            obj.set_taborder("9");
            obj.set_text("쿠폰 지급");
            obj.set_borderRadius("8px");
            obj.set_color("#666666");
            obj.set_font("11px/normal \"Noto Sans KR Black\"");
            obj.set_background(" #f5f5f5");
            obj.set_border("1px solid #e0e0e0");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);

            obj = new Static("Static01","53","31","54","24",null,null,null,null,null,null,this);
            obj.set_taborder("10");
            obj.set_text("사용여부");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static01_00","53","73","57","24",null,null,null,null,null,null,this);
            obj.set_taborder("11");
            obj.set_text("쿠폰종류");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static02","831","75","19","21",null,null,null,null,null,null,this);
            obj.set_taborder("12");
            obj.set_text("~");
            obj.set_font("bold 14px/normal \"Noto Sans KR Black\"");
            this.addChild(obj.name, obj);

            obj = new Combo("Combo00","491","70","109","32",null,null,null,null,null,null,this);
            obj.set_taborder("13");
            obj.set_innerdataset("ds_date");
            obj.set_codecolumn("SEARCH_DATE");
            obj.set_datacolumn("SEARCH_DATE");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            obj.set_border("1px solid black");
            obj.set_borderRadius("8px");
            obj.set_text("Combo00");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1280,720,this,function(p){});
            obj.set_mobileorientation("landscape");
            obj.set_stepcount("0");
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item0","coupon","binddataset","ds_user","");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item1","Radio00","value","ds_search","IS_USED");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item2","Edit00","value","ds_search","COUPON_TYPE");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item3","Calendar00","value","ds_search","SEARCH_START_DATE");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item4","Calendar01","value","ds_search","SEARCH_END_DATE");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item5","Combo00","value","ds_search","SEARCH_DATE");
            this.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Form_memberCouponDetail.xfdl", function() {
        this.memberId="";
        this.Form_memberCouponDetail_onload = function(obj,e)
        {

        	// 부모 Frame에서 arguments 꺼내오기
        	var ownerFrame = this.getOwnerFrame();
        	var memberId = ownerFrame.arguments["MEMBER_ID"];

        	this.ds_search.setColumn(0, "MEMBER_ID", memberId);

        	//콤보 박스 초기값 설정
        	this.Combo00.set_index(0);

        	this.fn_selectPointDetailList();
        };


        //회원 포인트 상세 리스트 조회
        this.fn_selectPointDetailList= function(){

        	var strSvcID = "selectCouponDetail"
        	var setURL = "svc::/selectCouponDetailListByAdmin.do?time=" + new Date().getTime();
        	var strInDatasets = "ds_search=ds_search";
        	var strOutDatasets = "ds_list=ds_list";
        	var strArg = ""
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
        	case "selectCouponDetail" :
        		console.log(this.ds_list.saveXML());
        		break;

        	}

        }

        //뒤로가기
        this.back_btn_onclick = function(obj,e)
        {
        	this.getOwnerFrame().set_formurl("member::Form_MemberPointAndCoupon.xfdl");
        };

        //검색하기
        this.Button00_onclick = function(obj,e)
        {
        	this.fn_selectPointDetailList();
        };

        //초기화
        this.Button01_onclick = function(obj,e)
        {
        	this.reload();
        };


        //쿠폰 지급 눌렀을 때 팝업창 띄우기
        this.Button02_onclick = function(obj,e)
        {
        	var memberId = this.ds_search.getColumn(0, "MEMBER_ID");

            var surl = "member::Form_MemberCouponInsert.xfdl";
            var param = { MEMBER_ID: memberId };

            // 디버깅용 로그 추가
            trace("팝업 호출 시 전달할 MEMBER_ID: " + memberId);

            var popup = new nexacro.ChildFrame();
            popup.init("updatePop", 0, 0, 800, 700, null, null, surl);
            popup.set_dragmovetype("all");
            popup.set_showtitlebar(true);
            popup.set_titletext("쿠폰 지급");

            // 두 번째 인자로 param을 전달
            popup.showModal(this.getOwnerFrame(), param, this, "fn_popCallback");
        };


        //팝업 콜백
        this.fn_popCallback = function(svcID, strVal){
        	switch(svcID){
        	case "updatePop":
        		this.fn_selectPointDetailList();
        		break;
        	}
        };

        //라디오 선택
        this.Radio00_onitemchanged = function(obj,e)
        {
        	this.fn_selectPointDetailList();
        };

        //쿠폰 종류
        this.Edit00_onkeyup = function(obj,e)
        {
        	if(e.keycode == 13){
        		this.fn_selectPointDetailList();
        	}
        };

        //날짜 시작일 (Calendar00) - 바인딩으로 SEARCH_START_DATE에 자동 저장됨
        this.Calendar00_onchanged = function(obj,e)
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

            // 시작일은 00시 00분 (바인딩된 컬럼명으로 변경)
            this.ds_search.setColumn(0, "SEARCH_START_DATE", startDate + "000000");

            // 종료일이 있으면 23시 59분까지 설정
            if (endDate) {
                this.ds_search.setColumn(0, "SEARCH_END_DATE", endDate + "235959");
            }

        	//자동 검색
        	this.fn_selectPointDetailList();
        };

        //날짜 종료일 (Calendar01) - 바인딩으로 SEARCH_END_DATE에 자동 저장됨
        this.Calendar01_onchanged = function(obj,e)
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

            // 종료일은 23시 59분 (바인딩된 컬럼명으로 변경)
            this.ds_search.setColumn(0, "SEARCH_END_DATE", endDate + "235959");

            // 시작일이 있으면 00시 00분까지 세팅
            if (startDate) {
                this.ds_search.setColumn(0, "SEARCH_START_DATE", startDate + "000000");
            }

        	//자동 검색
        	this.fn_selectPointDetailList();
        };

        //날짜는 그대로 두고 검색하고 싶은 콤보박스 선택하면 자동 검색됨
        this.Combo00_onitemchanged = function(obj,e)
        {
        	this.fn_selectPointDetailList();
        };
        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_memberCouponDetail_onload,this);
            this.coupon.addEventHandler("oncellclick",this.pointAndCoupon_oncellclick,this);
            this.Radio00.addEventHandler("onitemchanged",this.Radio00_onitemchanged,this);
            this.Edit00.addEventHandler("onkeyup",this.Edit00_onkeyup,this);
            this.Calendar00.addEventHandler("onchanged",this.Calendar00_onchanged,this);
            this.Calendar01.addEventHandler("onchanged",this.Calendar01_onchanged,this);
            this.back_btn.addEventHandler("onclick",this.back_btn_onclick,this);
            this.Button00.addEventHandler("onclick",this.Button00_onclick,this);
            this.Button01.addEventHandler("onclick",this.Button01_onclick,this);
            this.Button02.addEventHandler("onclick",this.Button02_onclick,this);
            this.Combo00.addEventHandler("onitemchanged",this.Combo00_onitemchanged,this);
        };
        this.loadIncludeScript("Form_memberCouponDetail.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
