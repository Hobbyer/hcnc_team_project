(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_MemberDetail");
            this.set_titletext("New Form");
            this.set_background("#F4F7FE");
            if (Form == this.constructor)
            {
                this._setFormPosition(1350,700);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_memberDt", this);
            obj.set_useclientlayout("true");
            obj._setContents("<ColumnInfo><Column id=\"MEMBER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"USER_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"EMAIL_ADDR\" type=\"STRING\" size=\"256\"/><Column id=\"PHONE_NUMBER\" type=\"STRING\" size=\"256\"/><Column id=\"BIRTH\" type=\"STRING\" size=\"256\"/><Column id=\"GENDER\" type=\"STRING\" size=\"256\"/><Column id=\"GRADE_CODE\" type=\"STRING\" size=\"256\"/><Column id=\"MEMBER_TYPE\" type=\"STRING\" size=\"256\"/><Column id=\"LOGIN_TYPE\" type=\"STRING\" size=\"256\"/><Column id=\"FIRST_LOGIN_DT\" type=\"STRING\" size=\"256\"/><Column id=\"LAST_LOGIN_DT\" type=\"STRING\" size=\"256\"/><Column id=\"STATUS\" type=\"STRING\" size=\"256\"/><Column id=\"PRICE_AMOUNT\" type=\"STRING\" size=\"256\"/><Column id=\"INPUT_DT\" type=\"STRING\" size=\"256\"/><Column id=\"UPDATE_DT\" type=\"STRING\" size=\"256\"/><Column id=\"PASSWORD\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_gender", this);
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"256\"/><Column id=\"GENDER\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"CODE\">남자</Col><Col id=\"GENDER\">Male</Col></Row><Row><Col id=\"CODE\">여자</Col><Col id=\"GENDER\">Female</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_type", this);
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"256\"/><Column id=\"MEMBER_TYPE\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"CODE\">회원</Col><Col id=\"MEMBER_TYPE\">user</Col></Row><Row><Col id=\"CODE\">관리자</Col><Col id=\"MEMBER_TYPE\">admin</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_grade", this);
            obj._setContents("<ColumnInfo><Column id=\"GRADE_CODE\" type=\"STRING\" size=\"256\"/><Column id=\"GRADE_NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_status", this);
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"256\"/><Column id=\"STATUS\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"STATUS\">Y</Col><Col id=\"CODE\">이용중</Col></Row><Row><Col id=\"STATUS\">N</Col><Col id=\"CODE\">탈퇴</Col></Row><Row><Col id=\"STATUS\">R</Col><Col id=\"CODE\">휴면</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_upCnt", this);
            obj._setContents("<ColumnInfo><Column id=\"UPDATED\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Div("detail_box","40","18","1270","662",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("");
            obj.set_borderRadius("8px");
            obj.set_background("#fff");
            obj.set_boxShadow("0 2px 6px rgba(0,0,0,0.05)");
            this.addChild(obj.name, obj);

            obj = new Static("m","84","85","40","28",null,null,null,null,null,null,this.detail_box.form);
            obj.set_taborder("0");
            obj.set_text("아이디");
            obj.set_font("15px/normal \"Noto Sans KR Black\"");
            this.detail_box.addChild(obj.name, obj);

            obj = new Static("m2","95","239","29","28",null,null,null,null,null,null,this.detail_box.form);
            obj.set_taborder("1");
            obj.set_text("이름");
            obj.set_font("15px/normal \"Noto Sans KR Black\"");
            this.detail_box.addChild(obj.name, obj);

            obj = new Static("Static00_00_00_00","84","316","40","28",null,null,null,null,null,null,this.detail_box.form);
            obj.set_taborder("2");
            obj.set_text("이메일");
            obj.set_font("15px/normal \"Noto Sans KR Black\"");
            this.detail_box.addChild(obj.name, obj);

            obj = new Static("Static00","1109","159","34","16",null,null,null,null,null,null,this.detail_box.form);
            obj.set_taborder("3");
            obj.set_text("~");
            this.detail_box.addChild(obj.name, obj);

            obj = new Static("Static01","14","12","170","38",null,null,null,null,null,null,this.detail_box.form);
            obj.set_taborder("4");
            obj.set_text("회원 및 관리자 상세");
            obj.set_textAlign("center");
            obj.set_font("20px/normal \"Noto Sans KR Black\"");
            this.detail_box.addChild(obj.name, obj);

            obj = new Static("Static00_00_00_00_00","65","393","59","28",null,null,null,null,null,null,this.detail_box.form);
            obj.set_taborder("5");
            obj.set_text("휴대전화");
            obj.set_font("15px/normal \"Noto Sans KR Black\"");
            this.detail_box.addChild(obj.name, obj);

            obj = new Static("Static00_00_00_00_00_00","95","470","29","28",null,null,null,null,null,null,this.detail_box.form);
            obj.set_taborder("6");
            obj.set_text("생일");
            obj.set_font("15px/normal \"Noto Sans KR Black\"");
            this.detail_box.addChild(obj.name, obj);

            obj = new Static("Static00_00_00_00_00_00_00","507","85","28","28",null,null,null,null,null,null,this.detail_box.form);
            obj.set_taborder("7");
            obj.set_text("성별");
            obj.set_font("15px/normal \"Noto Sans KR Black\"");
            this.detail_box.addChild(obj.name, obj);

            obj = new Static("Static00_00_00_00_00_00_00_00","507","161","28","28",null,null,null,null,null,null,this.detail_box.form);
            obj.set_taborder("8");
            obj.set_text("등급");
            obj.set_font("15px/normal \"Noto Sans KR Black\"");
            this.detail_box.addChild(obj.name, obj);

            obj = new Static("Static00_00_00_00_00_00_00_00_00","478","237","57","28",null,null,null,null,null,null,this.detail_box.form);
            obj.set_taborder("9");
            obj.set_text("회원타입");
            obj.set_font("15px/normal \"Noto Sans KR Black\"");
            this.detail_box.addChild(obj.name, obj);

            obj = new Button("close_btn","705","566","119","46",null,null,null,null,null,null,this.detail_box.form);
            obj.set_taborder("10");
            obj.set_text("뒤로가기");
            obj.set_background("#f5f5f5");
            obj.set_borderRadius("8px");
            obj.set_color("#666666");
            obj.set_font("13px/normal \"Noto Sans KR Black\"");
            obj.set_border("1px solid #e0e0e0");
            obj.set_padding("14px 32px 14px 32px");
            this.detail_box.addChild(obj.name, obj);

            obj = new Static("m00","468","313","77","28",null,null,null,null,null,null,this.detail_box.form);
            obj.set_taborder("11");
            obj.set_text("로그인 타입");
            obj.set_font("15px/normal \"Noto Sans KR Black\"");
            this.detail_box.addChild(obj.name, obj);

            obj = new Static("m00_00","455","389","90","28",null,null,null,null,null,null,this.detail_box.form);
            obj.set_taborder("12");
            obj.set_text("첫 로그인 날짜");
            obj.set_font("15px/normal \"Noto Sans KR Black\"");
            this.detail_box.addChild(obj.name, obj);

            obj = new Static("m00_00_00","423","464","125","28",null,null,null,null,null,null,this.detail_box.form);
            obj.set_taborder("13");
            obj.set_text("마지막 로그인 날짜");
            obj.set_font("15px/normal \"Noto Sans KR Black\"");
            this.detail_box.addChild(obj.name, obj);

            obj = new Static("m00_00_00_00","900","84","61","28",null,null,null,null,null,null,this.detail_box.form);
            obj.set_taborder("14");
            obj.set_text("회원 상태");
            obj.set_font("15px/normal \"Noto Sans KR Black\"");
            this.detail_box.addChild(obj.name, obj);

            obj = new Static("m00_00_00_00_00","905","161","61","28",null,null,null,null,null,null,this.detail_box.form);
            obj.set_taborder("15");
            obj.set_text("누적 금액");
            obj.set_font("15px/normal \"Noto Sans KR Black\"");
            this.detail_box.addChild(obj.name, obj);

            obj = new Static("m00_00_00_00_00_00","904","237","61","28",null,null,null,null,null,null,this.detail_box.form);
            obj.set_taborder("16");
            obj.set_text("가입 날짜");
            obj.set_font("15px/normal \"Noto Sans KR Black\"");
            this.detail_box.addChild(obj.name, obj);

            obj = new Static("m00_00_00_00_00_00_00","880","316","91","28",null,null,null,null,null,null,this.detail_box.form);
            obj.set_taborder("17");
            obj.set_text("최종 수정 날짜");
            obj.set_font("15px/normal \"Noto Sans KR Black\"");
            this.detail_box.addChild(obj.name, obj);

            obj = new Radio("gender_radio","564","79","231","43",null,null,null,null,null,null,this.detail_box.form);
            obj.set_readonly("true");
            obj.set_taborder("18");
            obj.set_innerdataset("ds_gender");
            obj.set_codecolumn("GENDER");
            obj.set_datacolumn("CODE");
            obj.set_direction("vertical");
            obj.set_font("16px/normal \"Noto Sans KR Black\"");
            obj.set_background("#f8f9fa");
            obj.set_border("1px solid #e5e7eb");
            obj.set_borderRadius("8px");
            obj.set_padding("8px 16px 8px 16px");
            obj.set_wordSpacing("20px");
            this.detail_box.addChild(obj.name, obj);

            obj = new Radio("type_radio","566","230","233","43",null,null,null,null,null,null,this.detail_box.form);
            obj.set_readonly("true");
            obj.set_taborder("19");
            obj.set_innerdataset("ds_type");
            obj.set_codecolumn("MEMBER_TYPE");
            obj.set_datacolumn("CODE");
            obj.set_direction("vertical");
            obj.set_font("16px/normal \"Noto Sans KR Black\"");
            obj.set_background("#f8f9fa");
            obj.set_border("1px solid #e5e7eb");
            obj.set_borderRadius("8px");
            obj.set_padding("8px 16px 8px 16px");
            obj.set_wordSpacing("20px");
            this.detail_box.addChild(obj.name, obj);

            obj = new Radio("status_radio","994","82","260","44",null,null,null,null,null,null,this.detail_box.form);
            obj.set_readonly("true");
            obj.set_taborder("20");
            obj.set_innerdataset("ds_status");
            obj.set_codecolumn("STATUS");
            obj.set_datacolumn("CODE");
            obj.set_direction("vertical");
            obj.set_font("16px/normal \"Noto Sans KR Black\"");
            obj.set_background("#f8f9fa");
            obj.set_border("1px solid #e5e7eb");
            obj.set_borderRadius("8px");
            obj.set_padding("8px 16px 8px 16px");
            obj.set_wordSpacing("20px");
            this.detail_box.addChild(obj.name, obj);

            obj = new Edit("detail_loginType00","565","304","233","46",null,null,null,null,null,null,this.detail_box.form);
            obj.set_readonly("true");
            obj.set_taborder("21");
            obj.set_border("1px solid #e0e0e0");
            obj.set_borderRadius("8px");
            obj.set_background("#fafafa");
            obj.set_color("#333333");
            obj.set_font("14px/normal \"맑은 고딕\"");
            obj.set_padding("12px 16px 12px 16px");
            this.detail_box.addChild(obj.name, obj);

            obj = new Edit("detail_price_amount00","993","156","263","43",null,null,null,null,null,null,this.detail_box.form);
            obj.set_readonly("true");
            obj.set_taborder("22");
            obj.set_border("1px solid #e0e0e0");
            obj.set_borderRadius("8px");
            obj.set_background("#fafafa");
            obj.set_color("#333333");
            obj.set_font("14px/normal \"맑은 고딕\"");
            obj.set_padding("12px 16px 12px 16px");
            this.detail_box.addChild(obj.name, obj);

            obj = new Calendar("dstail_input_dt00","991","224","265","48",null,null,null,null,null,null,this.detail_box.form);
            obj.set_readonly("true");
            obj.set_taborder("23");
            obj.set_border("1px solid #e0e0e0");
            obj.set_borderRadius("8px");
            obj.set_background("#fafafa");
            obj.set_color("#333333");
            obj.set_font("14px/normal \"맑은 고딕\"");
            obj.set_padding("12px 16px 12px 16px");
            this.detail_box.addChild(obj.name, obj);

            obj = new Calendar("dstail_update_dt","991","302","263","48",null,null,null,null,null,null,this.detail_box.form);
            obj.set_readonly("true");
            obj.set_taborder("24");
            obj.set_border("1px solid #e0e0e0");
            obj.set_borderRadius("8px");
            obj.set_background("#fafafa");
            obj.set_color("#333333");
            obj.set_font("14px/normal \"맑은 고딕\"");
            obj.set_padding("12px 16px 12px 16px");
            this.detail_box.addChild(obj.name, obj);

            obj = new Combo("grade_combo00","565","151","234","47",null,null,null,null,null,null,this.detail_box.form);
            obj.set_readonly("true");
            obj.set_taborder("25");
            obj.set_innerdataset("ds_grade");
            obj.set_codecolumn("GRADE_CODE");
            obj.set_datacolumn("GRADE_NAME");
            obj.set_border("1px solid #e0e0e0");
            obj.set_borderRadius("8px");
            obj.set_background("#fafafa");
            obj.set_color("#333333");
            obj.set_font("14px/normal \"맑은 고딕\"");
            obj.set_padding("12px 16px 12px 16px");
            obj.set_text("Combo00");
            this.detail_box.addChild(obj.name, obj);

            obj = new Edit("detail_email00","155","308","231","42",null,null,null,null,null,null,this.detail_box.form);
            obj.set_readonly("true");
            obj.set_taborder("26");
            obj.set_border("1px solid #e0e0e0");
            obj.set_borderRadius("8px");
            obj.set_background("#fafafa");
            obj.set_color("#333333");
            obj.set_font("14px/normal \"맑은 고딕\"");
            obj.set_padding("12px 16px 12px 16px");
            this.detail_box.addChild(obj.name, obj);

            obj = new Edit("dstail_name00","155","232","231","42",null,null,null,null,null,null,this.detail_box.form);
            obj.set_readonly("true");
            obj.set_taborder("27");
            obj.set_border("1px solid #e0e0e0");
            obj.set_borderRadius("8px");
            obj.set_font("14px/normal \"맑은 고딕\"");
            obj.set_color("#333333");
            obj.set_background("#fafafa");
            obj.set_padding("12px 16px 12px 16px");
            this.detail_box.addChild(obj.name, obj);

            obj = new Edit("detail_id00","154","81","232","41",null,null,null,null,null,null,this.detail_box.form);
            obj.set_readonly("true");
            obj.set_taborder("28");
            obj.set_border("1px solid #e0e0e0");
            obj.set_borderRadius("8px");
            obj.set_background("#fafafa");
            obj.set_padding("12px 16px 12px 16px");
            obj.set_color("#333333");
            obj.set_font("14px/normal \"맑은 고딕\"");
            this.detail_box.addChild(obj.name, obj);

            obj = new Static("m01","68","162","56","28",null,null,null,null,null,null,this.detail_box.form);
            obj.set_taborder("29");
            obj.set_text("비밀번호");
            obj.set_font("15px/normal \"Noto Sans KR Black\"");
            this.detail_box.addChild(obj.name, obj);

            obj = new Edit("detail_password","155","156","231","42",null,null,null,null,null,null,this.detail_box.form);
            obj.set_readonly("true");
            obj.set_taborder("30");
            obj.set_password("true");
            obj.set_border("1px solid #e0e0e0");
            obj.set_borderRadius("8px");
            obj.set_background("#fafafa");
            obj.set_color("#333333");
            obj.set_font("14px/normal \"맑은 고딕\"");
            obj.set_padding("12px 16px 12px 16px");
            this.detail_box.addChild(obj.name, obj);

            obj = new Button("update_btn","565","566","120","46",null,null,null,null,null,null,this.detail_box.form);
            obj.set_taborder("31");
            obj.set_text("수정하기");
            obj.set_background("#667ee");
            obj.set_borderRadius("8px");
            obj.set_color("#ffffff");
            obj.set_font("13px/normal \"Noto Sans KR Black\"");
            obj.set_padding("14px 32px 14px 32px");
            this.detail_box.addChild(obj.name, obj);

            obj = new Calendar("detail_birth","155","460","230","42",null,null,null,null,null,null,this.detail_box.form);
            obj.set_readonly("true");
            obj.set_taborder("32");
            obj.set_border("1px solid #e0e0e0");
            obj.set_borderRadius("8px");
            obj.set_background("#fafafa");
            obj.set_font("14px/normal \"맑은 고딕\"");
            obj.set_padding("12px 16px 12px 16px");
            this.detail_box.addChild(obj.name, obj);

            obj = new Calendar("detail_first_login_dt","567","379","231","46",null,null,null,null,null,null,this.detail_box.form);
            obj.set_readonly("true");
            obj.set_taborder("33");
            obj.set_border("1px solid #e0e0e0");
            obj.set_borderRadius("8px");
            obj.set_background("#fafafa");
            obj.set_padding("12px 16px 12px 16px");
            obj.set_font("14px/normal \"맑은 고딕\"");
            this.detail_box.addChild(obj.name, obj);

            obj = new Calendar("detail_last_login_dt","566","457","232","44",null,null,null,null,null,null,this.detail_box.form);
            obj.set_readonly("true");
            obj.set_taborder("34");
            obj.set_border("1px solid #e0e0e0");
            obj.set_borderRadius("8px");
            obj.set_background("#fafafa");
            obj.set_font("14px/normal \"맑은 고딕\"");
            obj.set_padding("12px 16px 12px 16px");
            this.detail_box.addChild(obj.name, obj);

            obj = new MaskEdit("detail_phoneNumber00","154","384","231","42",null,null,null,null,null,null,this.detail_box.form);
            obj.set_taborder("35");
            obj.set_border("1px solid #e0e0e0");
            obj.set_borderRadius("8px");
            obj.set_readonly("true");
            obj.set_format("###-####-####");
            obj.set_type("string");
            obj.set_background("#fafafa");
            obj.set_color("#333333");
            obj.set_font("14px/normal \"맑은 고딕\"");
            obj.set_padding("12px 16px 12px 16px");
            this.detail_box.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1350,700,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item2","detail_box.form.gender_radio","value","ds_memberDt","GENDER");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item7","detail_box.form.type_radio","value","ds_memberDt","MEMBER_TYPE");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item8","detail_box.form.status_radio","value","ds_memberDt","STATUS");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item9","detail_box.form.detail_loginType00","value","ds_memberDt","LOGIN_TYPE");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item12","detail_box.form.detail_price_amount00","value","ds_memberDt","PRICE_AMOUNT");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item13","detail_box.form.dstail_input_dt00","value","ds_memberDt","INPUT_DT");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item14","detail_box.form.dstail_update_dt","value","ds_memberDt","UPDATE_DT");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item6","detail_box.form.grade_combo00","value","ds_memberDt","GRADE_CODE");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item3","detail_box.form.detail_email00","value","ds_memberDt","EMAIL_ADDR");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item1","detail_box.form.dstail_name00","value","ds_memberDt","USER_NAME");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item0","detail_box.form.detail_id00","value","ds_memberDt","MEMBER_ID");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item15","detail_box.form.detail_password","value","ds_memberDt","PASSWORD");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item5","detail_box.form.detail_birth","value","ds_memberDt","BIRTH");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item10","detail_box.form.detail_first_login_dt","value","ds_memberDt","FIRST_LOGIN_DT");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item11","detail_box.form.detail_last_login_dt","value","ds_memberDt","LAST_LOGIN_DT");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item4","detail_box.form.detail_phoneNumber00","value","ds_memberDt","PHONE_NUMBER");
            this.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.addIncludeScript("Form_MemberDetail.xfdl","common::common.xjs");
        this.registerScript("Form_MemberDetail.xfdl", function() {
        this.executeIncludeScript("common::common.xjs"); /*include "common::common.xjs"*/;
        this.memberId=""; //전역변수 선언
        this.Form_MemberDetail_onload = function(obj,e)
        {
        	// 부모 Frame에서 arguments 꺼내오기
            var ownerFrame = this.getOwnerFrame();
            var memberId = ownerFrame.arguments["MEMBER_ID"];

        	this.fn_memberDetail(memberId);
        	this.fn_gradeSearch();

        	// 🎨 읽기 전용 필드 스타일 설정
            this.fn_setReadonlyStyle();

        	// 🆕 추가: 수정하기 버튼 초기 색상
        	this.detail_box.form.update_btn.set_background("#667eea");
        	this.detail_box.form.update_btn.set_color("#ffffff");
        };

        // =====  읽기 전용 필드 스타일 =====
        this.fn_setReadonlyStyle = function()
        {
            // 수정 불가능한 필드들 (아이디, 가입날짜, 로그인타입 등)
            var readonlyFields = [
                this.detail_box.form.detail_id,
                this.detail_box.form.detail_join_dt,
                this.detail_box.form.detail_total_amount,
                this.detail_box.form.detail_login_type
            ];

            for(var i=0; i<readonlyFields.length; i++) {
                if(readonlyFields[i]) {
                    readonlyFields[i].set_background("#f0f0f0");
                    readonlyFields[i].set_color("#999999");
                    readonlyFields[i].set_enable(false);
                }
            }
        };


        //상세 조회 함수
        this.fn_memberDetail = function(memberId){

        	var strSvcID = "selectMemberDetail"
        	var setURL = "svc::/selectMemberDetailByAdmin.do?time=" + new Date().getTime();
        	var strInDatasets = "";
        	var strOutDatasets = "ds_memberDt=ds_memberDt";
        	var strArg = "memberId="+memberId;
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

        //수정함수
        this.fn_memeberUpdate = function(memberId){

        	// 1. 값 가져오기 + trim
        	var userName = (this.ds_memberDt.getColumn(0,"USER_NAME") || "").trim();
        	var password = (this.ds_memberDt.getColumn(0,"PASSWORD") || "").trim();
        	var emailAddr = (this.ds_memberDt.getColumn(0,"EMAIL_ADDR") || "").trim();
        	var phoneNumber = (this.ds_memberDt.getColumn(0,"PHONE_NUMBER") || "").trim();

        	// 2. 필수값 체크
        	if(!userName) {
        		this.alert("이름을 입력하세요");
        		return;
        	}

        	if(!emailAddr) {
        		this.alert("이메일을 입력하세요");
        		return;
        	}

        	if(!phoneNumber) {
        		this.alert("전화번호를 입력하세요");
        		return;
        	}

        	// 3. 이름 검증 varchar(50)
        	if(userName.length > 50) {
        		this.alert("이름은 50자 이하로 입력해주세요");
        		return;
        	}
        	// 이름은 중간 공백 허용

        	// 4. 비밀번호 검증 (비밀번호 변경한 경우만)
        	// 이미 암호화된 값인지 확인 (64자리 hex 문자열)
        	if(password && !password.match(/^[0-9a-f]{64}$/)) {
        		// 새로 입력한 비밀번호인 경우
        		if(password.length < 8 || password.length > 20) {
        			this.alert("비밀번호는 8~20자로 입력해주세요");
        			return;
        		}

        		var pwRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;
        		if(!pwRegex.test(password)) {
        			this.alert("비밀번호는 영문과 숫자를 포함해야 합니다");
        			return;
        		}
        	}

        	// 5. 이메일 검증 varchar(100)
        	if(emailAddr.length > 100) {
        		this.alert("이메일은 100자 이하로 입력해주세요");
        		return;
        	}

        	if(emailAddr.indexOf(' ') !== -1) {
        		this.alert("이메일에 공백을 사용할 수 없습니다");
        		return;
        	}

        	var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        	if(!emailRegex.test(emailAddr)) {
        		this.alert("올바른 이메일 형식이 아닙니다");
        		return;
        	}

        	// 6. trim된 값 다시 저장
        	this.ds_memberDt.setColumn(0, "USER_NAME", userName);
        	this.ds_memberDt.setColumn(0, "PASSWORD", password);
        	this.ds_memberDt.setColumn(0, "EMAIL_ADDR", emailAddr);
        	this.ds_memberDt.setColumn(0, "PHONE_NUMBER", phoneNumber);

        	// 7. 서버 전송
        	var strSvcID = "memberUpdate"
        	var setURL = "svc::/memberUpdateByAdmin.do?time=" + new Date().getTime();
        	var strInDatasets = "ds_memberDt=ds_memberDt";
        	var strOutDatasets = "ds_upCnt=ds_upCnt";
        	var strArg = "memberId="+memberId;
        	var callBack = "fn_callBack";
        	var inAsync = true;

        	this.transaction(strSvcID,setURL,strInDatasets,strOutDatasets,strArg,callBack,inAsync);
        }

        //등급에서 전체 제외하고 등급 목록
        this.fn_filterGradeList = function()
        {
            var filteredData = [];

            for(var i=0; i<this.ds_grade.getRowCount(); i++){
                var gradeCode = this.ds_grade.getColumn(i, "GRADE_CODE");

                if(gradeCode != "") {
                    filteredData.push({
                        GRADE_CODE: gradeCode,
                        GRADE_NAME: this.ds_grade.getColumn(i, "GRADE_NAME")
                    });
                }
            }

            this.ds_grade.clearData();

            for(var i=0; i<filteredData.length; i++){
                var nRow = this.ds_grade.addRow();
                this.ds_grade.setColumn(nRow, "GRADE_CODE", filteredData[i].GRADE_CODE);
                this.ds_grade.setColumn(nRow, "GRADE_NAME", filteredData[i].GRADE_NAME);
            }
        };


        // 콜백
        this.fn_callBack = function(svcID, errorCode, errorMSG){

        	if(errorCode == -1){
        		this.alert(errorMSG)
        	}

        	switch(svcID){
        	case "selectMemberDetail" :
        		console.log(this.ds_memberDt.saveXML());
        		break;

        	case "selectMemberGradeList" :
        		console.log(this.ds_grade.saveXML())
        		this.fn_filterGradeList();
        		break;

        	case "memberUpdate" :
        		console.log(this.ds_upCnt.saveXML())

        		if(this.ds_upCnt.getColumn(0,"UPDATED") > 0){
        			this.alert("수정완료")
        			this.getOwnerFrame().set_formurl("member::Form_MemberList.xfdl");
        		}else{
        			this.alert("등록실패")
        		}
        		break;

        	}
        }

        //수정 모드로 변하기
        // ============================================================
        // 함수명: fn_setEditable
        // 목적: 화면의 입력 필드들을 "수정 가능 모드" 또는 "읽기 전용 모드"로 전환
        // 매개변수: editable (true = 수정 가능, false = 읽기 전용)
        // ============================================================
        this.fn_setEditable = function(editable)
        {
            // ============================================================
            // 1단계: 수정 가능한 필드 목록 정의
            // ============================================================

            // 💡 개념: 배열(Array)이란?
            // - 여러 개의 값을 하나의 변수에 담는 자료구조
            // - [값1, 값2, 값3] 형태로 작성
            // - 반복문으로 한번에 처리 가능

            var editableFields = [
                // 각 요소는 화면의 입력 필드를 가리키는 객체
                this.detail_box.form.dstail_name00,              // 이름 입력 필드
                this.detail_box.form.detail_email00,             // 이메일 입력 필드
                this.detail_box.form.detail_phoneNumber00,       // 휴대전화 입력 필드
                this.detail_box.form.detail_password,            // 비밀번호 입력 필드
                this.detail_box.form.detail_birth,               // 생일 캘린더 필드
                this.detail_box.form.detail_first_login_dt,      // 첫 로그인 날짜 필드
                this.detail_box.form.detail_last_login_dt        // 마지막 로그인 날짜 필드
            ];

            // 💡 왜 배열로 만들까?
            // → 같은 작업(readonly 설정, 스타일 변경)을 반복할 수 있어서 코드가 간결해짐!


            // ============================================================
            // 2단계: 반복문으로 Edit/Calendar 필드 readonly 설정
            // ============================================================

            // 💡 개념: for문이란?
            // - 같은 작업을 여러 번 반복하는 문법
            // - for(시작; 조건; 증가) { 반복할 코드 }

            for(var i=0; i<editableFields.length; i++) {
                // i는 0부터 시작해서 1씩 증가
                // editableFields.length는 배열의 길이 (여기서는 7개)
                // i가 0, 1, 2, 3, 4, 5, 6일 때 7번 반복

                // 💡 개념: if문으로 null 체크
                // - 필드가 존재하는지 확인 (없으면 에러 발생 방지)
                if(editableFields[i]) {
                    // editableFields[i]는 배열의 i번째 요소
                    // i=0일 때 → dstail_name00
                    // i=1일 때 → detail_email00
                    // ...

                    // 💡 개념: set_readonly()
                    // - true: 읽기 전용 (수정 불가)
                    // - false: 수정 가능

                    // 💡 개념: !editable의 의미
                    // - !는 NOT 연산자 (반대로 만듦)
                    // - editable이 true면 → !editable은 false
                    // - editable이 false면 → !editable은 true

                    // 예시:
                    // 사용자가 "수정하기" 버튼 클릭 → editable = true
                    // → !editable = false → readonly를 false로 설정 → 수정 가능!
                    editableFields[i].set_readonly(!editable);
                }
            }


            // ============================================================
            // 3단계: 콤보박스(등급) readonly 설정
            // ============================================================

            // 💡 왜 따로 처리할까?
            // - 콤보박스는 Edit/Calendar와 다른 컴포넌트 타입
            // - 배열에 섞어서 넣으면 복잡해서 따로 처리

            if(this.detail_box.form.grade_combo00) {
                // 콤보박스가 존재하면
                this.detail_box.form.grade_combo00.set_readonly(!editable);
            }


            // ============================================================
            // 4단계: 라디오 버튼들 readonly 설정
            // ============================================================

            // 💡 라디오 버튼이란?
            // - 여러 선택지 중 하나만 선택하는 UI (성별: 남자/여자)

            // 회원타입 라디오 (회원/관리자)
            if(this.detail_box.form.type_radio) {
                this.detail_box.form.type_radio.set_readonly(!editable);
            }

            // 회원상태 라디오 (이용중/탈퇴/휴면)
            if(this.detail_box.form.status_radio) {
                this.detail_box.form.status_radio.set_readonly(!editable);
            }

            // 성별 라디오 (남자/여자)
            if(this.detail_box.form.gender_radio) {
                this.detail_box.form.gender_radio.set_readonly(!editable);
            }


            // ============================================================
            // 5단계: 시각적 피드백 (스타일 변경)
            // ============================================================

            // 💡 개념: 조건문 if-else
            // - if(조건) { 조건이 참일 때 실행 }
            // - else { 조건이 거짓일 때 실행 }

            if(editable) {
                // ========================================================
                // Case 1: 수정 모드 (editable = true)
                // - 사용자가 "수정하기" 버튼을 눌렀을 때
                // ========================================================

                // -------------------------------------------------------
                // 5-1. Edit/Calendar 필드 스타일 (수정 가능 상태)
                // -------------------------------------------------------
                for(var i=0; i<editableFields.length; i++) {
                    if(editableFields[i]) {
                        // 💡 배경색을 흰색으로 변경
                        // - #ffffff는 흰색을 의미하는 16진수 색상 코드
                        // - 수정 가능하다는 것을 시각적으로 표현
                        editableFields[i].set_background("#ffffff");

                        // 💡 테두리를 파란색으로 변경
                        // - 1px: 테두리 두께 1픽셀
                        // - solid: 실선 (점선이 아닌)
                        // - #667eea: 파란색 색상 코드
                        // - "지금 수정할 수 있어요!"라는 시각적 신호
                        editableFields[i].set_border("1px solid #667eea");
                    }
                }

                // -------------------------------------------------------
                // 5-2. 콤보박스 스타일 (수정 가능 상태)
                // -------------------------------------------------------
                if(this.detail_box.form.grade_combo00) {
                    this.detail_box.form.grade_combo00.set_background("#ffffff");
                    this.detail_box.form.grade_combo00.set_border("1px solid #667eea");
                }

                // -------------------------------------------------------
                // 5-3. 라디오 버튼 스타일 (수정 가능 상태)
                // -------------------------------------------------------

                // 💡 라디오는 연한 파란색 배경
                // - #eef2ff는 아주 연한 파란색 (파란 계열이라는 힌트)
                // - 흰색(#ffffff)보다 살짝 색깔이 있어서 라디오임을 표현

                if(this.detail_box.form.type_radio) {
                    this.detail_box.form.type_radio.set_background("#eef2ff");
                    this.detail_box.form.type_radio.set_border("1px solid #667eea");
                }

                if(this.detail_box.form.status_radio) {
                    this.detail_box.form.status_radio.set_background("#eef2ff");
                    this.detail_box.form.status_radio.set_border("1px solid #667eea");
                }

                if(this.detail_box.form.gender_radio) {
                    this.detail_box.form.gender_radio.set_background("#eef2ff");
                    this.detail_box.form.gender_radio.set_border("1px solid #667eea");
                }

            } else {
                // ========================================================
                // Case 2: 읽기 모드 (editable = false)
                // - 페이지를 처음 열었을 때 또는 저장 후
                // ========================================================

                // -------------------------------------------------------
                // 5-4. Edit/Calendar 필드 스타일 (읽기 전용 상태)
                // -------------------------------------------------------
                for(var i=0; i<editableFields.length; i++) {
                    if(editableFields[i]) {
                        // 💡 배경색을 연한 회색으로 변경
                        // - #fafafa는 아주 연한 회색
                        // - "지금은 수정할 수 없어요"라는 시각적 신호
                        editableFields[i].set_background("#fafafa");

                        // 💡 테두리를 회색으로 변경
                        // - #e0e0e0는 밝은 회색
                        // - 부드럽고 조용한 느낌 (활성 상태 아님)
                        editableFields[i].set_border("1px solid #e0e0e0");
                    }
                }

                // -------------------------------------------------------
                // 5-5. 콤보박스 스타일 (읽기 전용 상태)
                // -------------------------------------------------------
                if(this.detail_box.form.grade_combo00) {
                    this.detail_box.form.grade_combo00.set_background("#fafafa");
                    this.detail_box.form.grade_combo00.set_border("1px solid #e0e0e0");
                }

                // -------------------------------------------------------
                // 5-6. 라디오 버튼 스타일 (읽기 전용 상태)
                // -------------------------------------------------------

                // 💡 라디오는 조금 더 진한 회색 배경
                // - #f8f9fa는 #fafafa보다 살짝 진한 회색
                // - #e5e7eb는 테두리 색 (중간 회색)

                if(this.detail_box.form.type_radio) {
                    this.detail_box.form.type_radio.set_background("#f8f9fa");
                    this.detail_box.form.type_radio.set_border("1px solid #e5e7eb");
                }

                if(this.detail_box.form.status_radio) {
                    this.detail_box.form.status_radio.set_background("#f8f9fa");
                    this.detail_box.form.status_radio.set_border("1px solid #e5e7eb");
                }

                if(this.detail_box.form.gender_radio) {
                    this.detail_box.form.gender_radio.set_background("#f8f9fa");
                    this.detail_box.form.gender_radio.set_border("1px solid #e5e7eb");
                }
            }

            // ============================================================
            // 함수 종료
            // ============================================================

            // 💡 이 함수의 흐름 정리:
            // 1. 수정 가능한 필드들을 배열에 담기
            // 2. 반복문으로 모든 필드의 readonly 설정
            // 3. 콤보박스, 라디오 버튼도 readonly 설정
            // 4. if-else로 모드에 따라 색상 변경
            //    - 수정 모드(true): 흰색 배경 + 파란 테두리
            //    - 읽기 모드(false): 회색 배경 + 회색 테두리
        };

        // =====수정하기 버튼 함수 =====
        this.detail_box_Button00_onclick = function(obj,e)
        {
            if (obj.text == "수정하기") {
                this.fn_setEditable(true);
                obj.set_text("저장하기");
                // 🎨 버튼 색상 변경
                obj.set_background("#10b981"); // 초록색

            } else {
                this.fn_memeberUpdate();
                this.fn_setEditable(false);
                obj.set_text("수정하기");
                // 🎨 버튼 색상 복귀
                obj.set_background("#667eea"); // 파란색
            }
        };

        //뒤로가기 버튼
        this.insert_box_close_btn_onclick = function(obj,e)
        {
        	this.getOwnerFrame().set_formurl("member::Form_MemberList.xfdl");
        };



        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_MemberDetail_onload,this);
            this.detail_box.form.Static01.addEventHandler("onclick",this.insert_box_Static01_onclick,this);
            this.detail_box.form.Static00_00_00_00_00.addEventHandler("onclick",this.detail_box_Static00_00_00_00_00_onclick,this);
            this.detail_box.form.close_btn.addEventHandler("onclick",this.insert_box_close_btn_onclick,this);
            this.detail_box.form.gender_radio.addEventHandler("onitemchanged",this.detail_box_gender_radio_onitemchanged,this);
            this.detail_box.form.dstail_name00.addEventHandler("onchanged",this.insert_box_insert_name_onchanged,this);
            this.detail_box.form.update_btn.addEventHandler("onclick",this.detail_box_Button00_onclick,this);
        };
        this.loadIncludeScript("Form_MemberDetail.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
