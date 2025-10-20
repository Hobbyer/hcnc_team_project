(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_ProductReg");
            this.set_titletext("상품등록");
            this.set_background("#f4f7fe");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,2070);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Static("sta_title","40","20","400","50",null,null,null,null,null,null,this);
            obj.set_text("상품 등록");
            obj.set_font("bold 18pt \'Gulim\'");
            obj.set_color("#000000");
            obj.set_textAlign("left");
            this.addChild(obj.name, obj);

            obj = new Static("box_display","30","70","1220","120",null,null,null,null,null,null,this);
            obj.set_background("#ffffff");
            obj.set_border("1px solid #dcdcdc");
            obj.set_borderRadius("8px");
            this.addChild(obj.name, obj);

            obj = new Static("sta_display00_00","50","75","300","30",null,null,null,null,null,null,this);
            obj.set_text("표시 설정");
            obj.set_font("bold 11pt \'Gulim\'");
            obj.set_color("#000000");
            this.addChild(obj.name, obj);

            obj = new Static("sta_display00","60","105","100","30",null,null,null,null,null,null,this);
            obj.set_text("진열상태");
            obj.set_font("normal 10pt \'Gulim\'");
            obj.set_color("#111111");
            obj.set_textAlign("center");
            obj.set_background("#f4f4f4");
            obj.set_borderRadius("6px");
            this.addChild(obj.name, obj);

            obj = new Static("sta_display00_01","60","145","100","30",null,null,null,null,null,null,this);
            obj.set_text("판매상태");
            obj.set_font("normal 10pt \'Gulim\'");
            obj.set_color("#111111");
            obj.set_textAlign("center");
            obj.set_background("#f4f4f4");
            obj.set_borderRadius("6px");
            this.addChild(obj.name, obj);

            obj = new Radio("rdo_display","156","87","195","64",null,null,null,null,null,null,this);
            obj.set_innerdataset("ds_display");
            obj.set_codecolumn("code");
            obj.set_datacolumn("name");
            obj.set_direction("vertical");
            obj.set_taborder("38");
            obj.set_text("진열함");
            obj.set_value("Y");
            obj.set_index("0");
            this.addChild(obj.name, obj);

            obj = new Radio("rdo_sale","156","125","394","64",null,null,null,null,null,null,this);
            obj.set_innerdataset("ds_sale");
            obj.set_codecolumn("code");
            obj.set_datacolumn("name");
            obj.set_direction("vertical");
            obj.set_taborder("39");
            obj.set_text("기본");
            obj.set_value("nomal");
            obj.set_index("0");
            this.addChild(obj.name, obj);

            obj = new Static("box_category","30","210","1220","100",null,null,null,null,null,null,this);
            obj.set_background("#ffffff");
            obj.set_border("1px solid #dcdcdc");
            obj.set_borderRadius("8px");
            this.addChild(obj.name, obj);

            obj = new Static("sta_display00_00_00","50","215","300","30",null,null,null,null,null,null,this);
            obj.set_text("상품 분류");
            obj.set_font("bold 11pt \'Gulim\'");
            obj.set_color("#000000");
            this.addChild(obj.name, obj);

            obj = new Static("sta_display00_02","60","250","100","30",null,null,null,null,null,null,this);
            obj.set_text("대분류");
            obj.set_font("normal 10pt \'Gulim\'");
            obj.set_color("#111111");
            obj.set_textAlign("center");
            obj.set_background("#f4f4f4");
            obj.set_borderRadius("6px");
            this.addChild(obj.name, obj);

            obj = new Combo("cmb_maincate","180","250","250","30",null,null,null,null,null,null,this);
            obj.set_innerdataset("ds_cate_main");
            obj.set_codecolumn("mainCateId");
            obj.set_datacolumn("mainCateNm");
            this.addChild(obj.name, obj);

            obj = new Static("sta_display00_01_00","460","250","100","30",null,null,null,null,null,null,this);
            obj.set_text("중분류");
            obj.set_font("normal 10pt \'Gulim\'");
            obj.set_color("#111111");
            obj.set_textAlign("center");
            obj.set_background("#f4f4f4");
            obj.set_borderRadius("6px");
            this.addChild(obj.name, obj);

            obj = new Combo("cmb_subcate","580","250","250","30",null,null,null,null,null,null,this);
            obj.set_innerdataset("ds_cate_sub");
            obj.set_codecolumn("subCateId");
            obj.set_datacolumn("subCateNm");
            this.addChild(obj.name, obj);

            obj = new Static("box_basic","30","330","1220","210",null,null,null,null,null,null,this);
            obj.set_background("#ffffff");
            obj.set_border("1px solid #dcdcdc");
            obj.set_borderRadius("8px");
            this.addChild(obj.name, obj);

            obj = new Static("sta_display00_00_00_00","50","335","300","30",null,null,null,null,null,null,this);
            obj.set_text("기본 정보");
            obj.set_font("bold 11pt \'Gulim\'");
            obj.set_color("#000000");
            this.addChild(obj.name, obj);

            obj = new Static("sta_display00_02_00","60","370","100","30",null,null,null,null,null,null,this);
            obj.set_text("상품명");
            obj.set_font("normal 10pt \'Gulim\'");
            obj.set_color("#111111");
            obj.set_textAlign("center");
            obj.set_background("#f4f4f4");
            obj.set_borderRadius("6px");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_name","180","370","400","30",null,null,null,null,null,null,this);
            obj.set_displaynulltext("상품명 입력");
            this.addChild(obj.name, obj);

            obj = new Static("sta_display00_01_00_00","60","410","100","30",null,null,null,null,null,null,this);
            obj.set_text("상품코드");
            obj.set_font("normal 10pt \'Gulim\'");
            obj.set_color("#111111");
            obj.set_textAlign("center");
            obj.set_background("#f4f4f4");
            obj.set_borderRadius("6px");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_code","180","410","400","30",null,null,null,null,null,null,this);
            obj.set_displaynulltext("ex) PRO001");
            obj.set_text("자동생성");
            this.addChild(obj.name, obj);

            obj = new Static("sta_display00_01_00_00_00","60","450","100","60",null,null,null,null,null,null,this);
            obj.set_text("상품설명");
            obj.set_font("normal 10pt \'Gulim\'");
            obj.set_color("#111111");
            obj.set_textAlign("center");
            obj.set_background("#f4f4f4");
            obj.set_borderRadius("6px");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_content","180","450","850","60",null,null,null,null,null,null,this);
            obj.set_displaynulltext("상품 단순설명");
            this.addChild(obj.name, obj);

            obj = new Static("box_saleinfo","30","560","1220","160",null,null,null,null,null,null,this);
            obj.set_background("#ffffff");
            obj.set_border("1px solid #dcdcdc");
            obj.set_borderRadius("8px");
            this.addChild(obj.name, obj);

            obj = new Static("sta_display00_00_00_00_00","50","565","300","30",null,null,null,null,null,null,this);
            obj.set_text("판매 정보");
            obj.set_font("bold 11pt \'Gulim\'");
            obj.set_color("#000000");
            this.addChild(obj.name, obj);

            obj = new Static("sta_display00_02_00_00","60","600","100","30",null,null,null,null,null,null,this);
            obj.set_text("판매가");
            obj.set_font("normal 10pt \'Gulim\'");
            obj.set_color("#111111");
            obj.set_textAlign("center");
            obj.set_background("#f4f4f4");
            obj.set_borderRadius("6px");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_price","180","600","200","30",null,null,null,null,null,null,this);
            obj.set_textAlign("right");
            obj.set_displaynulltext("0");
            this.addChild(obj.name, obj);

            obj = new Static("sta_display00_01_00_00_01_01","420","600","100","30",null,null,null,null,null,null,this);
            obj.set_text("원가");
            obj.set_font("normal 10pt \'Gulim\'");
            obj.set_color("#111111");
            obj.set_textAlign("center");
            obj.set_background("#f4f4f4");
            obj.set_borderRadius("6px");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_costprice","540","600","200","30",null,null,null,null,null,null,this);
            obj.set_textAlign("right");
            obj.set_displaynulltext("0");
            this.addChild(obj.name, obj);

            obj = new Static("sta_display00_01_00_00_01","60","640","100","30",null,null,null,null,null,null,this);
            obj.set_text("수량");
            obj.set_font("normal 10pt \'Gulim\'");
            obj.set_color("#111111");
            obj.set_textAlign("center");
            obj.set_background("#f4f4f4");
            obj.set_borderRadius("6px");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_stock","180","640","200","30",null,null,null,null,null,null,this);
            obj.set_textAlign("right");
            obj.set_displaynulltext("0");
            this.addChild(obj.name, obj);

            obj = new Static("sta_display00_01_00_00_01_00","420","640","100","30",null,null,null,null,null,null,this);
            obj.set_text("무게");
            obj.set_font("normal 10pt \'Gulim\'");
            obj.set_color("#111111");
            obj.set_textAlign("center");
            obj.set_background("#f4f4f4");
            obj.set_borderRadius("6px");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_weight","540","640","200","30",null,null,null,null,null,null,this);
            obj.set_textAlign("right");
            obj.set_displaynulltext("0");
            this.addChild(obj.name, obj);

            obj = new Static("box_saleinfo00","30","740","1220","500",null,null,null,null,null,null,this);
            obj.set_background("#ffffff");
            obj.set_border("1px solid #dcdcdc");
            obj.set_borderRadius("8px");
            this.addChild(obj.name, obj);

            obj = new Static("sta_display00_00_00_00_00_00","50","745","300","30",null,null,null,null,null,null,this);
            obj.set_text("상품 게시글");
            obj.set_font("bold 11pt \'Gulim\'");
            obj.set_color("#000000");
            this.addChild(obj.name, obj);

            obj = new WebBrowser("web_postContent","50","780","1180","440",null,null,null,null,null,null,this);
            this.addChild(obj.name, obj);

            obj = new Static("box_saleinfo01","30","1270","1220","220",null,null,null,null,null,null,this);
            obj.set_background("#ffffff");
            obj.set_border("1px solid #dcdcdc");
            obj.set_borderRadius("8px");
            this.addChild(obj.name, obj);

            obj = new Static("sta_display00_00_00_00_00_00_00","50","1275","300","30",null,null,null,null,null,null,this);
            obj.set_text("이미지 정보");
            obj.set_font("bold 11pt \'Gulim\'");
            obj.set_color("#000000");
            this.addChild(obj.name, obj);

            obj = new Button("btn_selectFile","1080","1300","150","40",null,null,null,null,null,null,this);
            obj.set_text("파일찾기");
            obj.set_background("#000000");
            obj.set_color("#ffffff");
            obj.set_borderRadius("6px");
            obj.set_font("bold 10pt \'Gulim\'");
            this.addChild(obj.name, obj);

            obj = new Static("Static01","60","1305","300","25",null,null,null,null,null,null,this);
            obj.set_text("* 최대 4개 첨부가능");
            obj.set_font("normal 9pt \'Gulim\'");
            obj.set_color("#555555");
            this.addChild(obj.name, obj);

            obj = new Button("btn_save","930","1700","150","45",null,null,null,null,null,null,this);
            obj.set_text("저장");
            obj.set_background("#000000");
            obj.set_color("#ffffff");
            obj.set_borderRadius("8px");
            obj.set_font("bold 10pt \'Gulim\'");
            this.addChild(obj.name, obj);

            obj = new Button("btn_cancel","1100","1700","150","45",null,null,null,null,null,null,this);
            obj.set_text("취소");
            obj.set_background("#ffffff");
            obj.set_color("#000000");
            obj.set_border("1px solid #000000");
            obj.set_borderRadius("8px");
            obj.set_font("bold 10pt \'Gulim\'");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1280,2070,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.addIncludeScript("Form_ProductReg_copy0.xfdl","common::common.xjs");
        this.registerScript("Form_ProductReg_copy0.xfdl", function() {
        this.executeIncludeScript("common::common.xjs"); /*include "common::common.xjs"*/;


        var mode = "create";
        this.Form_ProductReg_onload = function(obj,e)
        {
        	this.categories.request("SEARCH", "GET", "http://localhost:8080/selectProductCategoryListByAdmin.do");
            this.setMemberId();
        	var sUrl = "http://localhost:8080/ckedit.do;";
        	this.web_postContent.set_url(sUrl);
        	// 모드 처리 param
        };

        // 저장 버튼 클릭
        this.btn_save_onclick = function(obj,e)
        {

        	function emptyCheck(value,errorMsg) {
        		if(value == null || value == ""){
        			this.alert(errorMsg);
        			return true;
        		}
        		return false;
        	}


        	if(emptyCheck(this.cmb_subcate.value, "중분류를 선택해주세요."))return;
        	if(emptyCheck(this.edt_name.value,"상품명을 입력하세요."))return;
        	if(emptyCheck(this.edt_code.value,"상품 코드를 입력하세요."))return;
        	if(emptyCheck(this.edt_content.value,"상품 상세설명을 입력하세요."))return;
        	if(emptyCheck(this.edt_price.value,"판매가를 입력하세요."))return;
        	if(emptyCheck(this.edt_costprice.value,"원가를 입력하세요."))return;
        	if(emptyCheck(this.edt_weight.value,"상품무게를 입력하세요."))return;
        	if(emptyCheck(this.edt_stock.value,"수량을 입력하세요."))return;


        	this.fn_confirmCustom("상품을 등록하시겠습니까?",

        		function(ok){
        			if(!ok) return;


        		// CKEditor 본문 가져오기
        		var desc = this.getEditorContent();

        		// ds_product 구성 (단일행)
        		this.ds_product.clearData();
        		var nRow = this.ds_product.addRow();

        		this.ds_product.setColumn(nRow, "SUB_CATE_ID", this.cmb_subcate.value);
        		this.ds_product.setColumn(nRow, "PRODUCT_NAME", this.edt_name.value);
        		this.ds_product.setColumn(nRow, "PRODUCT_CODE", this.edt_code.value);
        		this.ds_product.setColumn(nRow, "PRODUCT_CONTENT", this.edt_content.value);
        		this.ds_product.setColumn(nRow, "PRODUCT_PRICE", this.edt_price.value);
        		this.ds_product.setColumn(nRow, "COST_PRICE", this.edt_costprice.value);
        		this.ds_product.setColumn(nRow, "PRODUCT_WEIGHT", this.edt_weight.value);
        		this.ds_product.setColumn(nRow, "IS_VISIBLE", this.rdo_display.value);
        		//this.ds_product.setColumn(nRow, "INPUT_ID", "admin");
        		this.ds_product.setColumn(nRow, "SORT_NUMBER", 0);
        		this.ds_product.setColumn(nRow, "DETAIL_DESCRIPTION", desc);
        		this.ds_product.setColumn(nRow, "PRODUCT_TYPE", this.rdo_sale.value);
        		this.ds_product.setColumn(nRow, "STOCK", this.edt_stock.value);


        		// 트랜잭션 호출
        		var strSvcId = "insertProductCreateByAdmin";
        		var strUrl = "svc::insertProductCreateByAdmin.do";

        		// IN/OUT Dataset 매핑
        		var strIn  = "ds_product=ds_product preview=preview";
        		var strOut = "createStatus=createStatus";

        		var strArg = "";
        		var callBack = "fn_callback";
        		var bAsync = true;

        		this.transaction(strSvcId, strUrl, strIn, strOut, strArg, callBack, bAsync);

        		}.bind(this)
        	);
        };

        // 취소 버튼
        this.btn_cancel_onclick = function(obj,e) {
            this.go("product::Form_Product.xfdl");
        };

        // 이미지등록버튼
        this.btn_selectFile_onclick = function(obj,e)
        {
        	var previewRowCount = this.preview.getRowCount();
        	if(previewRowCount >= 4){
        		this.alert("이미지는 4개까지 등록가능합니다");
        		return;
        	}
        	this.productImage.open('nexacro17', 1);
        };

        // 콜백
        this.fn_callback = function(svcID, errCode, errMsg) {
            if (errCode < 0) { this.alert("오류: " + errMsg); return; }

            switch(svcID){
            }
        };

        // 대분류 로직
        this.categoriesJsonSuccess = function(obj,e)
        {

        	var result = this.categories.getResponse();
        	var parseRes = JSON.parse(result);
        	parseRes.forEach(function(res) {
            var target = this.ds_cate_main;
            var rowIndex = target.addRow();

            target.setColumn(rowIndex, "mainCateId", res.mainCateId);
            target.setColumn(rowIndex, "mainCateNm", res.mainCateNm);
            target.setColumn(rowIndex, "isActive", res.isActive);
            target.setColumn(rowIndex, "sortNumber", res.sortNumber);

            var subCategoriesJson = JSON.stringify(res.subCategories);
            target.setColumn(rowIndex, "subCategories", subCategoriesJson);

        	}, this);

        	this.cmb_maincate.set_index(0);
        	this.subCateSolt(0);

        };
        // 중분류 로직
        this.cmb_maincate_onitemchanged = function(obj,e)
        {
        	this.subCateSolt(e.postindex);
        };

        this.subCateSolt = function(index){
        	var selectIndex = index;
        	var sub = this.ds_cate_main.getColumn(selectIndex,"subCategories");
        	var parseRes = JSON.parse(sub);
        	var target = this.ds_cate_sub;
        	target.clearData();
        	parseRes.forEach(function(res) {
            var rowIndex = target.addRow();
            target.setColumn(rowIndex, "subCateId", res.subCateId);
            target.setColumn(rowIndex, "subCateNm", res.subCateNm);
        	}, this);
        	this.cmb_subcate.set_index(0);
        }


        ////////// CK EDITOR ///////////

        // 사용자 ID 설정
        this.setMemberId = function()
        {
            // 전역변수에서 USER_ID 가져오기 (전역변수 이름에 따라 수정)
            var sUserId = nexacro.getApplication().gds_adminInfo.getColumn(0, "MEMBER_ID"); // 또는 gds_user.getColumn(0, "USER_ID") 등


            if(sUserId) { //전역변수에서 받아온 내용이 있으면 넣어주고 아니면 예외 trace
                this.ds_product.setColumn(0, "INPUT_ID", sUserId);
                trace("사용자 ID 설정: " + sUserId);
            } else {
                trace("사용자 ID를 가져올 수 없습니다.");
                // 필요시 로그인 페이지로 이동하거나 오류 처리
            }
        };

        // 웹브라우저 로드 완료 후 실행
        this.web_postContent_onloadcompleted = function(obj,e)
        {
            trace("에디터 로드 완료");
            this.setTimer(1, 2000);
        };

        // 타이머 이벤트
        this.ProductReg_ontimer = function(obj,e)
        {
            if(e.timerid == 1) {
                this.killTimer(1);
                trace("에디터 준비 완료");

                // 초기 메시지 설정
                this.setEditorContent("<p>내용을 입력해주세요.</p>");
            }
        };

        this.getEditorContent = function()
        {
            try {
                var sContent = this.web_postContent.callMethod("getEditorContent", "");

                trace("=== 에디터 내용 디버깅 ===");
                trace("가져온 내용: " + sContent);
                trace("내용 타입: " + typeof sContent);

                if(!sContent || sContent === "undefined" || sContent === "null" || sContent === null) {
                    return "";
                }

                return String(sContent);

            } catch(e) {
                trace("에디터 내용 가져오기 실패: " + e.message);
                return "";
            }
        };

        // 에디터 내용 설정
        this.setEditorContent = function(sContent)
        {
            try {
                if(!sContent) {
                    sContent = "";
                }

                var result = this.web_postContent.callMethod("setEditorContent", sContent);
                trace("에디터 내용 설정 결과: " + result);

            } catch(e) {
                trace("에디터 내용 설정 실패: " + e.message);
            }
        };

        // 에디터 준비 상태 확인
        this.isEditorReady = function()
        {
            try {
                var result = this.web_postContent.callMethod("isEditorReady", "");
                return result === true || result === "true";
            } catch(e) {
                trace("에디터 준비 상태 확인 실패: " + e.message);
                return false;
            }
        };
        //
        this.Button00_onclick = function(obj,e)
        {
        	this.productImage.open('nexacro17', FileDialog.LOAD);
        };

        this.FileDialog00_onclose = function(obj,e)
        {
        	this.productImageTransfer.addFile("file",e.virtualfiles[0]);
        	this.productImageTransfer.upload('http://localhost:8080/previewProductCreateByAdmin.do');
        };

        this.FileUpTransfer00_onprogress = function(obj,e)
        {
        };

        this.FileUpTransfer00_onsuccess = function(obj,e)
        {

        	var imageUrl = e.datasets[0]._rawRecords[0][0];
        	var nRow = this.preview.addRow();
        	trace("생성",nRow);
        	this.fn_createNewImageViewer(nRow,imageUrl);

        };

        this.FileUpTransfer00_onerror = function(obj,e)
        {
        	trace(e.errormsg);
        	trace(e.statuscode);
        };

        this.fn_createNewImageViewer = function(rowIndex, imageUrl)
        {
            try {
                var imageViewerId = "ImageViewer_" + rowIndex + "_" + Date.now();
                var newImageViewer = new ImageViewer();

                // 위치 계산 (4열 그리드 형태로 배치)
                var baseLeft = 240;   // 시작 X 좌표
                var baseTop = 1356;   // 시작 Y 좌표
                var width = 219;      // ImageViewer 너비
                var height = 214;     // ImageViewer 높이
                var spacing = 15;     // 간격

                var col = rowIndex;  // 4열로 배치
                var row = rowIndex; //Math.floor(rowIndex / 4);

                var left = baseLeft + col * (width + spacing);
                var top = baseTop + row * (height + spacing);
                trace(left);
                // ImageViewer 초기화
                newImageViewer.init(
                    imageViewerId,  // ID
                    left,           // left
                    baseTop,            // top
                    width,          // width
                    height          // height
                );

                // ImageViewer 속성 설정
                newImageViewer.set_image(imageUrl);
                newImageViewer.set_stretch("fit");
                newImageViewer.set_imagealign("center");
                newImageViewer.set_cursor("pointer");


                // 클릭 이벤트 - 이미지 삭제
                newImageViewer.addEventHandler("onclick", function(obj, e) {
                    var result = confirm("이 이미지를 삭제하시겠습니까?");
                    if (result) {
                        this.fn_removeImageViewer(imageViewerId);
                    }
                }.bind(this));


                // Form에 ImageViewer 추가
                this.addChild(imageViewerId, newImageViewer);

                // 화면에 표시
                newImageViewer.show();

                // Dataset에 ViewerID 저장 (나중에 참조용)
                this.preview.setColumn(rowIndex, "fileName", imageViewerId);
        		this.preview.setColumn(rowIndex, "fileUrl", imageUrl);

                trace("ImageViewer 생성 완료: " + imageViewerId + " at (" + left + ", " + top + ")");

                // Form의 스크롤 영역 조정 (이미지가 많아지면)
                //this.fn_adjustFormSize(row);

            } catch (ex) {
                trace("ImageViewer 생성 오류: " + ex.message);
            }
        };

        // ImageViewer 삭제
        this.fn_removeImageViewer = function(viewerId)
        {
            try {
                // ImageViewer 컴포넌트 제거
                if (this.components[viewerId]) {
                    this.removeChild(viewerId);
                    trace("ImageViewer 삭제: " + viewerId);
                }

                // Dataset에서 해당 행 삭제
        		var target = this.preview.findRow("fileName",viewerId);
        		this.preview.deleteRow(target);

                // 나머지 ImageViewer들 위치 재조정
                this.fn_rearrangeImageViewers();

                alert("이미지가 삭제되었습니다.");

            } catch (ex) {
                trace("ImageViewer 삭제 오류: " + ex.message);
            }
        };
        // 삭제 후 재배치
        this.fn_rearrangeImageViewers = function()
        {
            try {
                var baseLeft = 240;
                var baseTop = 1356;
                var width = 219;
                var height = 214;
                var spacing = 15;

                var rowCount = this.preview.getRowCount();
        		trace("재배치"+rowCount);
                for (var i = 0; i < rowCount; i++) {
                    var viewerId = this.preview.getColumn(i, "fileName");
                    var comp = this.components[viewerId];
                    if (comp) {
        				//var layOutIndex = i - 1
                        var col = i % 4;
                        var row = Math.floor(i / 4);

                        var left = baseLeft + col * (width + spacing);
                        var top  = baseTop  + row * (height + spacing);

                        comp.move(left, top, width, height);
                        trace("재배치: " + viewerId + " → (" + left + ", " + top + ")");
                    }
                }
            } catch (ex) {
                trace("fn_rearrangeImageViewers 오류: " + ex.message);
            }
        };


        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_ProductReg_onload,this);
            this.addEventHandler("ontimer",this.ProductReg_ontimer,this);
            this.rdo_display.addEventHandler("onitemchanged",this.rdo_display_onitemchanged,this);
            this.rdo_sale.addEventHandler("onitemchanged",this.rdo_sale_onitemchanged,this);
            this.cmb_maincate.addEventHandler("onitemchanged",this.cmb_maincate_onitemchanged,this);
            this.web_postContent.addEventHandler("onloadcompleted",this.web_postContent_onloadcompleted,this);
            this.web_postContent.addEventHandler("onusernotify",this.web_postContent_onusernotify,this);
            this.btn_selectFile.addEventHandler("onclick",this.btn_selectFile_onclick,this);
            this.btn_save.addEventHandler("onclick",this.btn_save_onclick,this);
            this.btn_cancel.addEventHandler("onclick",this.btn_cancel_onclick,this);
        };
        this.loadIncludeScript("Form_ProductReg_copy0.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
