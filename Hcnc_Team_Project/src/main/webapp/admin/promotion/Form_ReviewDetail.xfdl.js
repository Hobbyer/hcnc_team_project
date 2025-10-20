(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_ReviewDetail");
            this.set_titletext("New Form");
            this.set_background("#F4F7FE");
            if (Form == this.constructor)
            {
                this._setFormPosition(560,630);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_review_info", this);
            obj._setContents("<ColumnInfo><Column id=\"REVIEW_ID\" type=\"STRING\" size=\"256\"/><Column id=\"MEMBER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"PRODUCT_ID\" type=\"STRING\" size=\"256\"/><Column id=\"PRODUCT_CODE\" type=\"STRING\" size=\"256\"/><Column id=\"PRODUCT_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"REVIEW_TITLE\" type=\"STRING\" size=\"256\"/><Column id=\"REVIEW_CONTENT\" type=\"STRING\" size=\"256\"/><Column id=\"STAR_POINT\" type=\"STRING\" size=\"256\"/><Column id=\"INPUT_DT\" type=\"STRING\" size=\"256\"/><Column id=\"REVIEW_STATUS\" type=\"STRING\" size=\"256\"/><Column id=\"POINT_ISSUED\" type=\"STRING\" size=\"256\"/><Column id=\"ORDER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"ISSUED_DT\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_addpoint", this);
            obj._setContents("<ColumnInfo><Column id=\"MEMBER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"CHANGE_TYPE\" type=\"STRING\" size=\"256\"/><Column id=\"POINT\" type=\"STRING\" size=\"256\"/><Column id=\"DESCRIPTION\" type=\"STRING\" size=\"256\"/><Column id=\"ORDER_ID\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_point_value", this);
            obj._setContents("");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_review_image", this);
            obj._setContents("<ColumnInfo><ConstColumn id=\"REVIEW_IMG_ID\" type=\"STRING\" size=\"30\"/><ConstColumn id=\"REVIEW_ID\" type=\"STRING\" size=\"30\"/><ConstColumn id=\"IMG_ORIGIN_NAME\" type=\"STRING\" size=\"30\"/><ConstColumn id=\"IMG_ATTACHED_NAME\" type=\"STRING\" size=\"30\"/><ConstColumn id=\"IMG_PATH\" type=\"STRING\" size=\"30\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Static("sta_h4","30","20","492","40",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("리뷰 상세내역");
            obj.set_font("normal 16pt/normal \"Noto Sans KR Black\"");
            obj.set_color("black");
            this.addChild(obj.name, obj);

            obj = new Static("stc_bg","30","70",null,null,"30","30",null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_background("#ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("th_sta_review_num","55","122",null,"40","415",null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("리뷰번호");
            obj.set_font("normal 12pt/normal \"Noto Sans KR Black\"");
            obj.set_color("black");
            this.addChild(obj.name, obj);

            obj = new Static("td_sta_review_num","135","122",null,"40","85",null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("리뷰정보");
            obj.set_font("normal 10pt/normal \"Noto Sans KR Medium\"");
            obj.set_color("black");
            this.addChild(obj.name, obj);

            obj = new Static("th_sta_review_product_code","55","164",null,"40","415",null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("상품코드");
            obj.set_font("normal 12pt/normal \"Noto Sans KR Black\"");
            obj.set_color("black");
            this.addChild(obj.name, obj);

            obj = new Static("td_sta_review_product_code","135","164",null,"40","85",null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("리뷰정보");
            obj.set_font("normal 10pt/normal \"Noto Sans KR Medium\"");
            obj.set_color("black");
            this.addChild(obj.name, obj);

            obj = new Static("th_sta_review_product_name","55","206",null,"40","415",null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_text("상품명");
            obj.set_font("normal 12pt/normal \"Noto Sans KR Black\"");
            obj.set_color("black");
            this.addChild(obj.name, obj);

            obj = new Static("td_sta_review_product_name","135","206",null,"40","85",null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_text("리뷰정보");
            obj.set_font("normal 10pt/normal \"Noto Sans KR Medium\"");
            obj.set_color("black");
            this.addChild(obj.name, obj);

            obj = new Static("th_sta_review_member_id","55","248",null,"40","415",null,null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_text("회원ID");
            obj.set_font("normal 12pt/normal \"Noto Sans KR Black\"");
            obj.set_color("black");
            this.addChild(obj.name, obj);

            obj = new Static("td_sta_review_member_id","135","248",null,"40","320",null,null,null,null,null,this);
            obj.set_taborder("9");
            obj.set_text("리뷰정보");
            obj.set_font("normal 10pt/normal \"Noto Sans KR Medium\"");
            obj.set_color("black");
            this.addChild(obj.name, obj);

            obj = new Static("th_sta_review_star","275","246",null,"40","195",null,null,null,null,null,this);
            obj.set_taborder("10");
            obj.set_text("별점");
            obj.set_font("normal 12pt/normal \"Noto Sans KR Black\"");
            obj.set_color("black");
            this.addChild(obj.name, obj);

            obj = new Static("td_sta_review_star","355","246",null,"40","80",null,null,null,null,null,this);
            obj.set_taborder("11");
            obj.set_text("리뷰정보");
            obj.set_font("normal 10pt/normal \"Noto Sans KR Medium\"");
            obj.set_color("black");
            this.addChild(obj.name, obj);

            obj = new Static("td_sta_review_issued_state","135","80",null,"40","330",null,null,null,null,null,this);
            obj.set_taborder("12");
            obj.set_text("리뷰정보");
            obj.set_font("normal 10pt/normal \"Noto Sans KR Medium\"");
            obj.set_color("black");
            this.addChild(obj.name, obj);

            obj = new Static("th_sta_review_issued_state","55","80",null,"40","415",null,null,null,null,null,this);
            obj.set_taborder("13");
            obj.set_text("지급상태");
            obj.set_font("normal 12pt/normal \"Noto Sans KR Black\"");
            obj.set_color("black");
            this.addChild(obj.name, obj);

            obj = new Static("th_sta_review_issued_dt","275","82",null,"40","195",null,null,null,null,null,this);
            obj.set_taborder("14");
            obj.set_text("지급일");
            obj.set_font("normal 12pt/normal \"Noto Sans KR Black\"");
            obj.set_color("black");
            this.addChild(obj.name, obj);

            obj = new Static("td_sta_review_issued_dt","355","82",null,"40","40",null,null,null,null,null,this);
            obj.set_taborder("15");
            obj.set_text("리뷰정보");
            obj.set_font("normal 10pt/normal \"Noto Sans KR Medium\"");
            obj.set_color("black");
            this.addChild(obj.name, obj);

            obj = new Static("th_sta_review_title","55","290",null,"40","415",null,null,null,null,null,this);
            obj.set_taborder("16");
            obj.set_text("리뷰제목");
            obj.set_font("normal 12pt/normal \"Noto Sans KR Black\"");
            obj.set_color("black");
            this.addChild(obj.name, obj);

            obj = new Static("td_sta_review_title","135","290",null,"40","85",null,null,null,null,null,this);
            obj.set_taborder("17");
            obj.set_text("리뷰정보");
            obj.set_font("normal 10pt/normal \"Noto Sans KR Medium\"");
            obj.set_color("black");
            this.addChild(obj.name, obj);

            obj = new Static("th_sta_review_content","55","332",null,"40","320",null,null,null,null,null,this);
            obj.set_taborder("18");
            obj.set_text("리뷰내용 및 작성일");
            obj.set_font("normal 12pt/normal \"Noto Sans KR Black\"");
            obj.set_color("black");
            this.addChild(obj.name, obj);

            obj = new Button("btn_addpoint","220","545","100","30",null,null,null,null,null,null,this);
            obj.set_taborder("19");
            obj.set_text("포인트 지급");
            obj.set_borderRadius("5px");
            obj.set_background("#135dae");
            obj.set_color("white");
            obj.set_font("normal 11pt/normal \"Noto Sans KR Medium\"");
            obj.set_textAlign("center");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);

            obj = new Button("btn_close","339","545","100","30",null,null,null,null,null,null,this);
            obj.set_taborder("20");
            obj.set_text("닫기");
            obj.set_borderRadius("5px");
            obj.set_background("#f87171");
            obj.set_color("white");
            obj.set_font("normal 11pt/normal \"Noto Sans KR Medium\"");
            obj.set_textAlign("center");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);

            obj = new Edit("edit_point_value","100","545","100","30",null,null,null,null,null,null,this);
            obj.set_taborder("21");
            obj.set_borderRadius("5px");
            this.addChild(obj.name, obj);

            obj = new Static("td_sta_review_content","60","434",null,"96","54",null,null,null,null,null,this);
            obj.set_taborder("22");
            obj.set_text("리뷰정보");
            obj.set_font("normal 10pt/normal \"Noto Sans KR Medium\"");
            obj.set_color("black");
            obj.set_borderRadius("5px");
            obj.set_border("1px solid #cccCCC");
            this.addChild(obj.name, obj);

            obj = new Static("td_sta_review_input_dt","405","332",null,"40","60",null,null,null,null,null,this);
            obj.set_taborder("23");
            obj.set_text("리뷰정보");
            obj.set_font("normal 10pt/normal \"Noto Sans KR Medium\"");
            obj.set_color("black");
            obj.set_textAlign("right");
            this.addChild(obj.name, obj);

            obj = new ImageViewer("img_review_01","60","372","52","52",null,null,null,null,null,null,this);
            obj.set_taborder("24");
            obj.set_borderRadius("5px");
            obj.set_stretch("fit");
            this.addChild(obj.name, obj);

            obj = new ImageViewer("img_review_02","125","372","52","52",null,null,null,null,null,null,this);
            obj.set_taborder("25");
            obj.set_borderRadius("5px");
            obj.set_border("1px solid #cccccc");
            obj.set_stretch("fit");
            this.addChild(obj.name, obj);

            obj = new ImageViewer("img_review_03","190","372","52","52",null,null,null,null,null,null,this);
            obj.set_taborder("26");
            obj.set_borderRadius("5px");
            obj.set_border("1px solid #cccccc");
            obj.set_stretch("fit");
            this.addChild(obj.name, obj);

            obj = new ImageViewer("img_review_04","255","372","52","52",null,null,null,null,null,null,this);
            obj.set_taborder("27");
            obj.set_borderRadius("5px");
            obj.set_border("1px solid #cccccc");
            obj.set_stretch("fit");
            this.addChild(obj.name, obj);

            obj = new ImageViewer("img_review_05","320","372","52","52",null,null,null,null,null,null,this);
            obj.set_taborder("28");
            obj.set_borderRadius("5px");
            obj.set_border("1px solid #cccccc");
            obj.set_stretch("fit");
            this.addChild(obj.name, obj);

            obj = new ImageViewer("img_review_06","385","372","52","52",null,null,null,null,null,null,this);
            obj.set_taborder("29");
            obj.set_borderRadius("5px");
            obj.set_border("1px solid #cccccc");
            obj.set_stretch("fit");
            this.addChild(obj.name, obj);

            obj = new ImageViewer("img_review_07","450","372","52","52",null,null,null,null,null,null,this);
            obj.set_taborder("30");
            obj.set_borderRadius("5px");
            obj.set_border("1px solid #cccccc");
            obj.set_stretch("fit");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",560,630,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item1","sta_h4","text","gds_menu","MENU_NM");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item3","td_sta_review_num","text","ds_review_list","REVIEW_ID");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item5","td_sta_review_product_code","text","ds_review_list","PRODUCT_CODE");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item7","td_sta_review_product_name","text","ds_review_list","PRODUCT_NAME");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item9","td_sta_review_member_id","text","ds_review_list","MEMBER_ID");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item11","td_sta_review_star","text","ds_review_info","STAR_POINT");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item12","td_sta_review_issued_state","text","ds_review_info","REVIEW_STATUS");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item15","td_sta_review_issued_dt","text","ds_review_info","ISSUED_DT");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item17","td_sta_review_title","text","ds_review_list","REVIEW_TITLE");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item0","td_sta_review_content","text","ds_review_info","REVIEW_CONTENT");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item2","td_sta_review_input_dt","text","ds_review_info","INPUT_DT");
            this.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Form_ReviewDetail.xfdl", function() {
        this.Form_ReviewDetail_onload = function(obj,e)
        {
            trace("팝업 Form onload, arguments: " + JSON.stringify(this.parent.arguments));

            // 부모에서 전달한 리뷰 정보 초기화
            if(this.parent.arguments){
                this.selectedReview = this.parent.arguments;

                var pointIssued = this.selectedReview.POINT_ISSUED;

                this.td_sta_review_issued_state.set_text(pointIssued);
                this.td_sta_review_num.set_text(this.selectedReview.REVIEW_ID);
                this.td_sta_review_member_id.set_text(this.selectedReview.MEMBER_ID);
                this.td_sta_review_product_code.set_text(this.selectedReview.PRODUCT_CODE);
                this.td_sta_review_product_name.set_text(this.selectedReview.PRODUCT_NAME);

                var REVIEW_TITLE = this.selectedReview.REVIEW_TITLE;
                if (REVIEW_TITLE != null && REVIEW_TITLE != "")
                {
                    this.td_sta_review_title.set_text(REVIEW_TITLE);
                } else {
                    this.td_sta_review_title.set_text('[사용자가 작성한 리뷰입니다]');
                }

                this.td_sta_review_content.set_text(this.selectedReview.REVIEW_CONTENT);
                this.td_sta_review_star.set_text(this.selectedReview.STAR_POINT);
                this.td_sta_review_issued_dt.set_text(this.selectedReview.ISSUED_DT || "-");
                this.td_sta_review_input_dt.set_text(this.selectedReview.INPUT_DT);

        		this.fnLoadReviewImages(); //이미지추가

                if(pointIssued == '지급'){
                    this.edit_point_value.set_enable(false);
                    this.edit_point_value.set_value("지급완료");
                    this.btn_addpoint.set_enable(false);
                } else {
                    this.edit_point_value.set_enable(true);
                    this.edit_point_value.set_value(300);
                    this.btn_addpoint.set_enable(true);
                }
            }
        };

        this.btn_close_onclick = function(obj, e) {
            trace("btn_close_onclick 호출");
            this.close();
        };

        // 포인트 지급 버튼 클릭
        this.btn_addpoint_onclick = function(obj, e) {
            trace("현재 selectedReview 상태: " + JSON.stringify(this.selectedReview));

            if(!this.selectedReview){
                this.alert("리뷰를 선택하세요.");
                trace("선택 리뷰 없음");
                return;
            }

            // 포인트 값 검증
            var pointValue = this.edit_point_value.value;
            trace("포인트 값: " + pointValue);

            if(!pointValue || pointValue == "" || isNaN(pointValue) || parseInt(pointValue) <= 0){
                trace("포인트 검증 실패!");
                this.alert("올바른 포인트 값을 입력하세요.");
                return;
            }

            // 다이얼로그
            var dMsg = "선택한 리뷰에 " + pointValue + "포인트를 지급하시겠습니까? 지급된 포인트는 수정이 불가능합니다.";
            var result = this.confirm(dMsg);

            trace("confirm 결과: " + result);

            if(result == true){
                trace("YES 선택 - 지급 진행");
                this.fn_prepareAddPointDataset();
                this.fn_callAddPointTransaction();
            } else {
                trace("NO 선택 - 취소");
            }
        };

        // 다이얼로그 콜백
        this.fn_pointConfirmCallback = function(returnValue) {
            trace("fn_pointConfirmCallback 호출, returnValue: " + returnValue);

            if(returnValue == "YES"){
                this.fn_prepareAddPointDataset();
                this.fn_callAddPointTransaction();
            } else {
                this.alert("포인트 지급 취소");
            }
        };

        this.fnImageCallback = function(svc, err, errMsg) {
        	var defaultImg = "https://placehold.co/200x200?text=NO_IMAGE";

            if (err < 0) {
                trace("이미지 조회 실패: " + errMsg);
                for(var i = 1; i <= 7; i++) {
                    this["img_review_0" + i].set_image(defaultImg);
                    this["img_review_0" + i].set_visible(true);
                }
                return;
            }

            var imgCount = this.ds_review_image.getRowCount();
            trace("조회된 이미지 개수: " + imgCount);

            for(var i = 1; i <= 7; i++) {
                if(i <= imgCount) {
                    var imgPath = this.ds_review_image.getColumn(i-1, "IMG_PATH");
                    trace("ImageViewer " + i + "에 설정: " + imgPath);
                    this["img_review_0" + i].set_image("url('" + imgPath + "')");
                } else {
                    this["img_review_0" + i].set_image(defaultImg);
                }
                this["img_review_0" + i].set_visible(true);
            }
        };
        //리뷰에 ^이미지담기(위)
        this.fn_prepareAddPointDataset = function() {
            trace("fn_prepareAddPointDataset 호출");

            this.ds_addpoint.clearData();
            trace("Dataset 초기화 완료");

            if(!this.selectedReview){
                this.alert("리뷰를 선택하세요.");
                trace("선택 리뷰 없음, Dataset에 데이터 추가 중지");
                return;
            }

            var pointValue = this.edit_point_value.value;
            var row = this.ds_addpoint.addRow();
            this.ds_addpoint.setColumn(row, "MEMBER_ID", this.selectedReview.MEMBER_ID);
            this.ds_addpoint.setColumn(row, "CHANGE_TYPE", "적립");
            this.ds_addpoint.setColumn(row, "POINT", pointValue);
            this.ds_addpoint.setColumn(row, "DESCRIPTION", "[리뷰 이벤트 수동 지급]" + this.selectedReview.ORDER_ID + ":" + this.selectedReview.REVIEW_ID);
            this.ds_addpoint.setColumn(row, "ORDER_ID", this.selectedReview.ORDER_ID);

            // 디버깅 로그 추가
            trace("Dataset 설정 완료:");
            trace("MEMBER_ID: " + this.ds_addpoint.getColumn(row, "MEMBER_ID"));
            trace("CHANGE_TYPE: " + this.ds_addpoint.getColumn(row, "CHANGE_TYPE"));
            trace("POINT: " + this.ds_addpoint.getColumn(row, "POINT"));
            trace("DESCRIPTION: " + this.ds_addpoint.getColumn(row, "DESCRIPTION"));
            trace("ORDER_ID: " + this.ds_addpoint.getColumn(row, "ORDER_ID"));
        };

        // 수동 INSERT 서버 전송
        this.fn_callAddPointTransaction = function() {
            trace("fn_callAddPointTransaction 호출");

            if(this.ds_addpoint.getRowCount() <= 0){
                this.alert("리뷰정보가 없습니다.");
                return;
            }

            var strSvcID = "insertReviewRewardPointsByAdmin";
            var setURL = "svc::insertReviewRewardPointsByAdmin.do";
            var strInDatasets = "ds_addpoint=ds_addpoint";
            var strOutDatasets = "";
            var strArg = "";
            var callBack = "fncallBack";
            var inAsync = true;

            this.transaction(strSvcID, setURL, strInDatasets, strOutDatasets, strArg, callBack, inAsync);
        };

        this.fnLoadReviewImages = function() {
            var strSvcID = "selectReviewImages";
            var strURL = "svc::selectReviewImageByAdmin.do";
            var strInDatasets = "";
            var strOutDatasets = "ds_review_image=ds_review_image";
            var strArg = "REVIEW_ID=" + this.selectedReview.REVIEW_ID;
            var strCallback = "fnImageCallback";

            this.transaction(strSvcID, strURL, strInDatasets, strOutDatasets, strArg, strCallback);
        };

        // 공통 콜백
        this.fncallBack = function(svcID, errorCode, errorMSG) {
            trace("fn_callBack 호출, svcID: " + svcID + ", errorCode: " + errorCode + ", errorMSG: " + errorMSG);

            if(errorCode == -1){
                this.alert("포인트 지급 실패: " + errorMSG);
                return;
            }

            switch(svcID){
                case "insertReviewRewardPointsByAdmin":
                    this.alert("포인트 지급 완료");
                    this.close("REFRESH_NEEDED");
                    break;
            }
        };
        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_ReviewDetail_onload,this);
            this.sta_h4.addEventHandler("onclick",this.static_board_onclick,this);
            this.th_sta_review_num.addEventHandler("onclick",this.static_board_onclick,this);
            this.th_sta_review_product_code.addEventHandler("onclick",this.static_board_onclick,this);
            this.th_sta_review_product_name.addEventHandler("onclick",this.static_board_onclick,this);
            this.th_sta_review_member_id.addEventHandler("onclick",this.static_board_onclick,this);
            this.th_sta_review_star.addEventHandler("onclick",this.static_board_onclick,this);
            this.th_sta_review_issued_state.addEventHandler("onclick",this.static_board_onclick,this);
            this.th_sta_review_issued_dt.addEventHandler("onclick",this.static_board_onclick,this);
            this.th_sta_review_title.addEventHandler("onclick",this.static_board_onclick,this);
            this.th_sta_review_content.addEventHandler("onclick",this.static_board_onclick,this);
            this.btn_addpoint.addEventHandler("onclick",this.btn_addpoint_onclick,this);
            this.btn_close.addEventHandler("onclick",this.btn_close_onclick,this);
        };
        this.loadIncludeScript("Form_ReviewDetail.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
