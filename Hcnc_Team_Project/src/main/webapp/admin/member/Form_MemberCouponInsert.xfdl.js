(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_MemberCouponInsert");
            this.set_titletext("New Form");
            this.set_background("#F4F7FE");
            this.set_color("#ffffff");
            this.set_borderRadius("10px");
            if (Form == this.constructor)
            {
                this._setFormPosition(560,540);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_insert", this);
            obj._setContents("<ColumnInfo><Column id=\"MEMBER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"COUPON_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"DISCOUNT_TYPE\" type=\"STRING\" size=\"256\"/><Column id=\"DISCOUNT_VALUE\" type=\"STRING\" size=\"256\"/><Column id=\"MIN_ORDER_PRICE\" type=\"STRING\" size=\"256\"/><Column id=\"EXPIRY_DT\" type=\"STRING\" size=\"256\"/><Column id=\"COUPON_TYPE\" type=\"STRING\" size=\"256\"/><Column id=\"COUPON_CODE\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_insCnt", this);
            obj._setContents("<ColumnInfo><Column id=\"INSERTED\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_type", this);
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"256\"/><Column id=\"DISCOUNT_TYPE\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"CODE\">%</Col><Col id=\"DISCOUNT_TYPE\">R</Col></Row><Row><Col id=\"CODE\">￦</Col><Col id=\"DISCOUNT_TYPE\">G</Col></Row></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Static("grade_search_box00","10","10","538","520",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_background("white");
            obj.set_text("");
            obj.set_borderRadius("8px");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","20","20","100","30",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("쿠폰 지급");
            obj.set_textAlign("center");
            obj.set_font("20px/normal \"Noto Sans KR Black\"");
            obj.set_color("#444444");
            this.addChild(obj.name, obj);

            obj = new Static("Static01","127","70","63","32",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("쿠폰 이름");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            obj.set_color("#444444");
            obj.set_padding("0px 0px 8px 0px");
            this.addChild(obj.name, obj);

            obj = new Static("Static02","126","136","56","24",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("할인 유형");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            obj.set_color("#444444");
            obj.set_padding("0px 0px 8px 0px");
            this.addChild(obj.name, obj);

            obj = new Static("Static03","125","200","57","25",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("할인 정도");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            obj.set_color("#444444");
            obj.set_padding("0px 0px 8px 0px");
            this.addChild(obj.name, obj);

            obj = new Static("Static04","38","256","144","29",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("쿠폰 사용 가능 최소 금액");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            obj.set_color("#444444");
            obj.set_padding("0px 0px 8px 0px");
            this.addChild(obj.name, obj);

            obj = new Static("Static06","111","318","72","24",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_text("쿠폰 만료일");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            obj.set_color("#444444");
            obj.set_padding("0px 0px 8px 0px");
            this.addChild(obj.name, obj);

            obj = new Static("Static07","120","379","60","21",null,null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_text("쿠폰 유형");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            obj.set_color("#444444");
            obj.set_padding("0px 0px 8px 0px");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit00","203","60","260","40",null,null,null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_border("2px solid #e0e0e0");
            obj.set_borderRadius("10px");
            obj.set_background("#fafafa");
            obj.set_padding("14px 20px 14px 20px");
            obj.set_font("14px/normal \"맑은 고딕\"");
            obj.set_color("#333333");
            this.addChild(obj.name, obj);

            obj = new Radio("Radio00","203","120","260","47",null,null,null,null,null,null,this);
            obj.set_taborder("9");
            obj.set_innerdataset("ds_type");
            obj.set_codecolumn("DISCOUNT_TYPE");
            obj.set_datacolumn("CODE");
            obj.set_direction("vertical");
            obj.set_font("12px/normal \"Noto Sans KR Black\"");
            obj.set_background("#f8f9fa");
            obj.set_borderRadius("10px");
            obj.set_padding("12px 20px 12px 20px");
            obj.set_color("#555555");
            obj.set_border("2px solid #e0e0e0");
            this.addChild(obj.name, obj);

            obj = new Calendar("Calendar00","202","308","262","39",null,null,null,null,null,null,this);
            obj.set_taborder("10");
            obj.set_border("2px solid #e0e0e0");
            obj.set_borderRadius("10px");
            obj.set_background("#fafafa");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit03","203","369","260","40",null,null,null,null,null,null,this);
            obj.set_taborder("11");
            obj.set_border("2px solid #e0e0e0");
            obj.set_borderRadius("10px");
            obj.set_background("#fafafa");
            obj.set_padding("14px 20px 14px 20px");
            obj.set_color("#333333");
            obj.set_font("14px/normal \"맑은 고딕\"");
            this.addChild(obj.name, obj);

            obj = new Button("Button00","205","450","148","45",null,null,null,null,null,null,this);
            obj.set_taborder("12");
            obj.set_text("지급하기");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            obj.set_background("#667eea");
            obj.set_borderRadius("4px");
            obj.set_color("white");
            this.addChild(obj.name, obj);

            obj = new Spin("Spin00","203","191","260","39",null,null,null,null,null,null,this);
            obj.set_taborder("13");
            obj.set_border("2px solid #e0e0e0");
            obj.set_borderRadius("10px");
            obj.set_background("#fafafa");
            obj.set_color("#333333");
            obj.set_min("0");
            obj.set_max("2147483647");
            obj.set_value("");
            this.addChild(obj.name, obj);

            obj = new Spin("Spin01","203","250","260","37",null,null,null,null,null,null,this);
            obj.set_taborder("14");
            obj.set_border("2px solid #e0e0e0");
            obj.set_borderRadius("10px");
            obj.set_background("#fafafa");
            obj.set_color("#333333");
            obj.set_min("0");
            obj.set_max("2147483647");
            obj.set_value("");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_00","440","488","90","25",null,null,null,null,null,null,this);
            obj.set_taborder("15");
            obj.set_text("ESC[닫기]");
            obj.set_color("#ef4444");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            obj.set_textAlign("center");
            this.addChild(obj.name, obj);

            obj = new Static("Static02_00","418","418","46","18",null,null,null,null,null,null,this);
            obj.set_taborder("16");
            obj.set_text("필수입력");
            obj.set_color("#444444");
            obj.set_font("12px/normal \"Noto Sans KR Black\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_00_01_00","407","418","11","17",null,null,null,null,null,null,this);
            obj.set_taborder("17");
            obj.set_text("*");
            obj.set_color("RED");
            obj.set_textAlign("center");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_00_01_00_00","183","136","11","17",null,null,null,null,null,null,this);
            obj.set_taborder("18");
            obj.set_text("*");
            obj.set_color("RED");
            obj.set_textAlign("center");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_00_01_00_00_00","181","200","11","17",null,null,null,null,null,null,this);
            obj.set_taborder("19");
            obj.set_text("*");
            obj.set_color("RED");
            obj.set_textAlign("center");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_00_01_00_00_00_00","184","73","11","17",null,null,null,null,null,null,this);
            obj.set_taborder("20");
            obj.set_text("*");
            obj.set_color("RED");
            obj.set_textAlign("center");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_00_01_00_00_00_01","179","320","11","17",null,null,null,null,null,null,this);
            obj.set_taborder("21");
            obj.set_text("*");
            obj.set_color("RED");
            obj.set_textAlign("center");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_00_01_00_00_00_01_00","178","382","11","17",null,null,null,null,null,null,this);
            obj.set_taborder("22");
            obj.set_text("*");
            obj.set_color("RED");
            obj.set_textAlign("center");
            obj.set_font("14px/normal \"Noto Sans KR Black\"");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",560,540,this,function(p){});
            obj.set_mobileorientation("landscape");
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item0","Edit00","value","ds_insert","COUPON_NAME");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item1","Radio00","value","ds_insert","DISCOUNT_TYPE");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item2","Spin00","value","ds_insert","DISCOUNT_VALUE");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item3","Spin01","value","ds_insert","MIN_ORDER_PRICE");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item4","Calendar00","value","ds_insert","EXPIRY_DT");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item5","Edit03","value","ds_insert","COUPON_TYPE");
            this.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.addIncludeScript("Form_MemberCouponInsert.xfdl","common::common.xjs");
        this.registerScript("Form_MemberCouponInsert.xfdl", function() {
        this.executeIncludeScript("common::common.xjs"); /*include "common::common.xjs"*/;
        this.Form_MemberCouponInsert_onload = function(obj,e)
        {
        	// 부모 폼으로부터 전달된 파라미터에 직접 접근
            var memberId = this.parent.MEMBER_ID;
        	this.ds_insert.setColumn(0, "MEMBER_ID", memberId);
        };


        //지급하기 버튼
        this.Button00_onclick = function(obj,e)
        {
        	// 1. 필수값 체크
            var couponName = (this.ds_insert.getColumn(0, "COUPON_NAME") || "").trim();
            var discountType = this.ds_insert.getColumn(0, "DISCOUNT_TYPE");
            var discountValue = this.ds_insert.getColumn(0, "DISCOUNT_VALUE");
            var minOrderPrice = this.ds_insert.getColumn(0, "MIN_ORDER_PRICE");
            var expiryDt = this.ds_insert.getColumn(0, "EXPIRY_DT");
            var couponType = (this.ds_insert.getColumn(0, "COUPON_TYPE") || "").trim();

            if(!couponName) {
                this.alert("쿠폰 이름을 입력하세요");
                return;
            }

            if(!discountType) {
                this.alert("할인 유형을 선택하세요");
                return;
            }

            if(!discountValue || discountValue <= 0) {
                this.alert("할인 정도를 입력하세요");
                return;
            }

            if(!expiryDt) {
                this.alert("만료일을 선택하세요");
                return;
            }

            if(!couponType) {
                this.alert("쿠폰 유형을 입력하세요");
                return;
            }

            // 2. 만료일 검증 (오늘보다 미래)
            var today = new Date();
            var todayStr = today.getFullYear() +
        	String(today.getMonth() + 1).padStart(2, '0') +
        	String(today.getDate()).padStart(2, '0');

            var expiryDate = String(expiryDt).substring(0, 8); // yyyyMMdd

            if(expiryDate <= todayStr) {
                this.alert("만료일은 오늘 이후로 설정해야 합니다");
                return;
            }

            // 3. trim된 값 재저장
            this.ds_insert.setColumn(0, "COUPON_NAME", couponName);
            this.ds_insert.setColumn(0, "COUPON_TYPE", couponType);

            // 4. 쿠폰 코드 자동 생성 (없으면)
            if(!this.ds_insert.getColumn(0, "COUPON_CODE")) {
                var couponCode = "CPN" + new Date().getTime();
                this.ds_insert.setColumn(0, "COUPON_CODE", couponCode);
            }

            // 5. 서버 전송
            this.fn_couponInsert();
        };


        //쿠폰 지급 트랜잭션
        this.fn_couponInsert=function(){

        	var strSvcID = "insertCoupon"
        	var setURL = "svc::/insertCouponByAdmin.do?time=" + new Date().getTime();
        	var strInDatasets = "ds_insert=ds_insert";
        	var strOutDatasets = "ds_insCnt=ds_insCnt";
        	var strArg = "";
        	var callBack = "fn_callBack";
        	var inAsync = true;

        	this.transaction(strSvcID,setURL,strInDatasets,strOutDatasets,strArg,callBack,inAsync);
        }

        // 콜백함수
        this.fn_callBack = function(svcID, errorCode, errorMSG){

        	if(errorCode == -1){
        		this.alert(errorMSG)
        	}
        	switch(svcID){
        	case "insertCoupon" :

        		if(this.ds_insCnt.getColumn(0,"INSERTED") == "1"){
        			alert("지급 완료")
        			this.close("ok:::");
        		}else{
        			alert("지급 실패")
        		}
        		break;
        	}
        }

        //esc 누르면 닫힘
        this.Form_MemberCouponInsert_onkeyup = function(obj,e)
        {
        	if(e.keycode == 27){
        		this.close();
        	}
        };

        //눌러도 닫힘
        this.Static00_onclick = function(obj,e)
        {
        	this.close();
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_MemberCouponInsert_onload,this);
            this.addEventHandler("onkeyup",this.Form_MemberCouponInsert_onkeyup,this);
            this.grade_search_box00.addEventHandler("onclick",this.grade_search_box00_onclick,this);
            this.Button00.addEventHandler("onclick",this.Button00_onclick,this);
            this.Static00_00.addEventHandler("onclick",this.Static00_onclick,this);
        };
        this.loadIncludeScript("Form_MemberCouponInsert.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
