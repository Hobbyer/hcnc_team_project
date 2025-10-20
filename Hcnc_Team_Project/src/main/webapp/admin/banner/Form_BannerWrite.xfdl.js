(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_BannerWrite");
            this.set_titletext("New Form");
            this.set_background("#F4F7FE");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_bwrite", this);
            obj._setContents("<ColumnInfo><Column id=\"BANNER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"BANNER_TYPE\" type=\"STRING\" size=\"256\"/><Column id=\"BANNER_TITLE\" type=\"STRING\" size=\"256\"/><Column id=\"IMG_ORIGIN_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"IMG_ATTACHED_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"IMG_PATH\" type=\"STRING\" size=\"256\"/><Column id=\"IS_VISIBLE\" type=\"STRING\" size=\"256\"/><Column id=\"LINKED_URL\" type=\"STRING\" size=\"256\"/><Column id=\"SORT_NUMBER\" type=\"STRING\" size=\"256\"/><Column id=\"INPUT_DT\" type=\"STRING\" size=\"256\"/><Column id=\"UPDATE_DT\" type=\"STRING\" size=\"256\"/><Column id=\"INPUT_ID\" type=\"STRING\" size=\"256\"/><Column id=\"UPDATE_ID\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_view_top", this);
            obj._setContents("");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_banner_type", this);
            obj._setContents("");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_file", this);
            obj._setContents("<ColumnInfo><Column id=\"IMG_ORIGIN_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"IMG_ATTACHED_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"IMG_PATH\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_active", this);
            obj._setContents("<ColumnInfo><Column id=\"datacolumn\" type=\"STRING\" size=\"256\"/><Column id=\"codecolumn\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"datacolumn\">출력</Col><Col id=\"codecolumn\">Y</Col></Row><Row><Col id=\"datacolumn\">미출력</Col><Col id=\"codecolumn\">N</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new FileDialog("FileDialog", this);
            this.addChild(obj.name, obj);


            obj = new FileUpTransfer("FileUpTransfer", this);
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Static("stat_bg","40","40",null,"520","40",null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_background("#ffffff");
            obj.set_borderRadius("10px");
            obj.set_text("");
            this.addChild(obj.name, obj);

            obj = new Button("btn_done",null,"582","140","48","40",null,null,null,null,null,this);
            obj.set_taborder("9");
            obj.set_text("저장");
            obj.set_background("#135dae");
            obj.set_color("#ffffff");
            obj.set_borderRadius("5px");
            obj.set_border("0px none");
            obj.set_font("normal bold 10pt/normal \"Noto Sans KR Medium\"");
            this.addChild(obj.name, obj);

            obj = new Button("btn_cancle","40","580","140","48",null,null,null,null,null,null,this);
            obj.set_taborder("10");
            obj.set_text("취소");
            obj.set_background("#ffffff");
            obj.set_color("#ff3d3d");
            obj.set_borderRadius("5px");
            obj.set_border("1px solid #ff3d3d");
            obj.set_font("normal bold 10pt/normal \"Noto Sans KR Medium\"");
            this.addChild(obj.name, obj);

            obj = new Static("txt_th","80","116","100","36",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("노출여부");
            obj.set_font("normal 12pt/normal \"Noto Sans KR Black\"");
            obj.set_color("#a3aed0");
            this.addChild(obj.name, obj);

            obj = new Static("txt_thbanner","80","278","100","36",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("배너타입");
            obj.set_font("normal 12pt/normal \"Noto Sans KR Black\"");
            obj.set_color("#a3aed0");
            this.addChild(obj.name, obj);

            obj = new Static("txt_thtitle","80","330","100","36",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("배너 제목");
            obj.set_font("normal 12pt/normal \"Noto Sans KR Black\"");
            obj.set_color("#a3aed0");
            this.addChild(obj.name, obj);

            obj = new Static("txt_th_file","80","446","100","36",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("첨부파일");
            obj.set_font("normal 12pt/normal \"Noto Sans KR Black\"");
            obj.set_color("#a3aed0");
            this.addChild(obj.name, obj);

            obj = new Static("txt_date","80","224","100","36",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("등록일");
            obj.set_font("normal 12pt/normal \"Noto Sans KR Black\"");
            obj.set_color("#a3aed0");
            this.addChild(obj.name, obj);

            obj = new Static("txt_th_link","80","388","100","36",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_text("링크");
            obj.set_font("normal 12pt/normal \"Noto Sans KR Black\"");
            obj.set_color("#a3aed0");
            this.addChild(obj.name, obj);

            obj = new Edit("input_title","200","332",null,"44","100",null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_border("1px solid #cccccc");
            obj.set_borderRadius("5px");
            this.addChild(obj.name, obj);

            obj = new Edit("edit_link","200","386",null,"44","100",null,null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_borderRadius("5px");
            obj.set_border("1px solid #cccccc");
            this.addChild(obj.name, obj);

            obj = new Static("txt_date_td","200","224","120","36",null,null,null,null,null,null,this);
            obj.set_taborder("11");
            obj.set_text("-");
            obj.set_font("normal 14pt/normal \"Noto Sans KR\"");
            this.addChild(obj.name, obj);

            obj = new Static("txt_date00","80","62","100","36",null,null,null,null,null,null,this);
            obj.set_taborder("12");
            obj.set_text("상위노출");
            obj.set_font("normal 12pt/normal \"Noto Sans KR Black\"");
            obj.set_color("#a3aed0");
            this.addChild(obj.name, obj);

            obj = new Static("txt_update_dt","630","224","120","36",null,null,null,null,null,null,this);
            obj.set_taborder("13");
            obj.set_text("수정일");
            obj.set_font("normal 12pt/normal \"Noto Sans KR Black\"");
            obj.set_color("#a3aed0");
            this.addChild(obj.name, obj);

            obj = new Static("txt_update_td","750","224","372","36",null,null,null,null,null,null,this);
            obj.set_taborder("14");
            obj.set_text("-");
            obj.set_font("normal 14pt/normal \"Noto Sans KR\"");
            this.addChild(obj.name, obj);

            obj = new Static("txt_date02","80","171","100","36",null,null,null,null,null,null,this);
            obj.set_taborder("15");
            obj.set_text("작성자");
            obj.set_font("normal 12pt/normal \"Noto Sans KR Black\"");
            obj.set_color("#a3aed0");
            this.addChild(obj.name, obj);

            obj = new Static("txt_inputid","200","171","250","36",null,null,null,null,null,null,this);
            obj.set_taborder("16");
            obj.set_text("-");
            obj.set_font("normal 14pt/normal \"Noto Sans KR\"");
            this.addChild(obj.name, obj);

            obj = new Static("txt_date01_00","628","171","120","36",null,null,null,null,null,null,this);
            obj.set_taborder("17");
            obj.set_text("최종작성자");
            obj.set_font("normal 12pt/normal \"Noto Sans KR Black\"");
            obj.set_color("#a3aed0");
            this.addChild(obj.name, obj);

            obj = new Static("txt_updateid","748","171","372","36",null,null,null,null,null,null,this);
            obj.set_taborder("18");
            obj.set_text("-");
            obj.set_font("normal 14pt/normal \"Noto Sans KR\"");
            this.addChild(obj.name, obj);

            obj = new Div("Div00","80","160",null,"1","80",null,null,null,null,null,this);
            obj.set_taborder("20");
            obj.set_text("Div00");
            obj.set_background("#f5f5f5");
            this.addChild(obj.name, obj);

            obj = new Div("Div01","80","105",null,"1","80",null,null,null,null,null,this);
            obj.set_taborder("19");
            obj.set_text("Div01");
            obj.set_background("#f5f5f5");
            this.addChild(obj.name, obj);

            obj = new Div("Div02","80","215",null,"1","80",null,null,null,null,null,this);
            obj.set_taborder("21");
            obj.set_text("Div02");
            obj.set_background("#f5f5f5");
            this.addChild(obj.name, obj);

            obj = new Div("Div03","80","270",null,"1","80",null,null,null,null,null,this);
            obj.set_taborder("22");
            obj.set_text("Div03");
            obj.set_background("#f5f5f5");
            this.addChild(obj.name, obj);

            obj = new Div("Div04","80","325",null,"1","80",null,null,null,null,null,this);
            obj.set_taborder("23");
            obj.set_text("Div04");
            obj.set_background("#f5f5f5");
            this.addChild(obj.name, obj);

            obj = new Div("Div05","80","380",null,"1","80",null,null,null,null,null,this);
            obj.set_taborder("24");
            obj.set_text("Div05");
            obj.set_background("#f5f5f5");
            this.addChild(obj.name, obj);

            obj = new Div("Div06","80","435",null,"1","80",null,null,null,null,null,this);
            obj.set_taborder("25");
            obj.set_text("Div06");
            obj.set_background("#f5f5f5");
            this.addChild(obj.name, obj);

            obj = new Radio("radio_view_type","200","120","200","31",null,null,null,null,null,null,this);
            obj.set_taborder("26");
            obj.set_innerdataset("ds_active");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_direction("vertical");
            obj.set_font("normal 12pt/normal \"Noto Sans KR Medium\"");
            obj.set_text("출력");
            obj.set_value("1");
            obj.set_index("0");
            this.addChild(obj.name, obj);

            obj = new CheckBox("check_top","200","62","190","38",null,null,null,null,null,null,this);
            obj.set_taborder("27");
            obj.set_text("체크시 우선 노출");
            obj.set_font("normal 12pt/normal \"Noto Sans KR Medium\"");
            this.addChild(obj.name, obj);

            obj = new Radio("radio_banner_type","200","281","560","31",null,null,null,null,null,null,this);
            obj.set_taborder("28");
            obj.set_direction("vertical");
            obj.set_font("normal 12pt/normal \"Noto Sans KR Medium\"");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            var radio_banner_type_innerdataset = new nexacro.NormalDataset("radio_banner_type_innerdataset", obj);
            radio_banner_type_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">main</Col><Col id=\"datacolumn\">메인배너</Col></Row><Row><Col id=\"codecolumn\">top</Col><Col id=\"datacolumn\">탑배너</Col></Row><Row><Col id=\"codecolumn\">popup</Col><Col id=\"datacolumn\">팝업배너</Col></Row></Rows>");
            obj.set_innerdataset(radio_banner_type_innerdataset);
            obj.set_text("메인배너");
            obj.set_value("main");
            obj.set_index("0");
            this.addChild(obj.name, obj);

            obj = new Button("btn_selectFile",null,"443","140","44","100",null,null,null,null,null,this);
            obj.set_taborder("29");
            obj.set_text("파일찾기");
            obj.set_background("#135dae");
            obj.set_border("0px none");
            obj.set_borderRadius("5px");
            obj.set_color("#ffffff");
            obj.set_font("normal 10pt/normal \"Noto Sans KR Black\"");
            this.addChild(obj.name, obj);

            obj = new TextArea("file_name","200","444",null,"43","250",null,null,null,null,null,this);
            obj.set_taborder("30");
            obj.set_borderRadius("5px");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1280,720,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item1","file_name","value","ds_file","IMG_ORIGIN_NAME");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item2","check_top","enable","ds_view_top","");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item3","check_top","truevalue","ds_view_top","1");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item4","check_top","falsevalue","ds_view_top","");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item5","check_top","text","ds_view_top","");
            this.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Form_BannerWrite.xfdl", function() {
        this.memberId="";

        var objDate = new nexacro.Date();
        var mm = (objDate.getMonth() + 1).toString().padLeft(2, "0");
        var dd = objDate.getDate().toString().padLeft(2, "0");
        var TODAY = objDate.getFullYear() + "." + mm + "." + dd;
        var TODAYNUM = objDate.getFullYear() + mm + dd;

        // 업로드 상태확인용
        this.isUploading = false;
        this.uploadCompleted = false;

        this.Form_BannerWrite_onload = function(obj, e) {
            trace("배너 추가페이지 >>>");

            //arguments
            var ownerFrame = this.getOwnerFrame();
            var bannerId = null;
            var memberId = null;

            if (ownerFrame && ownerFrame.arguments) {
                bannerId = ownerFrame.arguments["BANNER_ID"];
                memberId = ownerFrame.arguments["MEMBER_ID"];
            }

            // memberId가 없으면 전역 Dataset에서 가져오기 (백업)
            if (!memberId && nexacro.getApplication().gds_adminInfo && nexacro.getApplication().gds_adminInfo.rowcount > 0) {
                memberId = nexacro.getApplication().gds_adminInfo.getColumn(0, "MEMBER_ID");
            }

            this.memberId = memberId;

            // 모드 설정
            this.mode = bannerId ? "update" : "insert";
            trace("memberId: " + this.memberId);
            trace("TODAY: " + TODAY);
            trace("모드확인용임"+this.mode);
            trace("bannerId: " + bannerId);

            if (this.mode === "update") {
                trace("업데이트모드임 - 배너 데이터 조회 시작");
                // 서버에서 배너 데이터 가져오기
                this.fnSelectBannerDetail(bannerId);

            } else {
                trace("Insert모드임");
                if (this.ds_bwrite.rowcount === 0) {
                    this.ds_bwrite.addRow();
                }
                this.check_top.set_value(true);
                this.txt_date_td.set_text(TODAY);
                this.txt_inputid.set_text(this.memberId);
                this.txt_update_td.set_text(TODAY);
                this.txt_updateid.set_text(this.memberId);

                this.ds_bwrite.setColumn(0, "INPUT_DT", TODAY);
                this.ds_bwrite.setColumn(0, "INPUT_ID", this.memberId);
                this.ds_bwrite.setColumn(0, "UPDATE_DT", TODAY);
                this.ds_bwrite.setColumn(0, "UPDATE_ID", this.memberId);

                this.uploadCompleted = false;
            }
        };

        // 배너 상세 조회 함수
        this.fnSelectBannerDetail = function(bannerId) {
            var strSvcID = "selectBannerDetail";
            var strURL = "svc::selectBannerDetailByAdmin.do";
            var strInDatasets = "";
            var strOutDatasets = "ds_bwrite=ds_bwrite";
            var strArg = "BANNER_ID=" + bannerId;
            var strCallback = "fnCallback";


            this.transaction(strSvcID, strURL, strInDatasets, strOutDatasets, strArg, strCallback);
        };

        // 라디오 TOP일때만 디스에이블처리
        this.radio_banner_type_onitemchanged = function(obj, e) {
            if (obj.value === "top") {
                this.btn_selectFile.set_enable(false);
                this.file_name.set_value("탑배너는 이미지를 사용하지 않습니다.");
            } else {
                this.btn_selectFile.set_enable(true);
                this.file_name.set_value("");
            }
        };

        this.btn_cancle_onclick = function(obj,e)
        {
        	this.getOwnerFrame().set_formurl("banner::Form_BannerList.xfdl");
        };

        // 넥사파일 선택 버튼 클릭
        this.btn_selectFile_onclick = function(obj, e) {
            if (this.isUploading) {
                alert("파일 업로드 중입니다. 잠시 후 다시 시도해주세요.");
                return;
            }
            this.FileDialog.open('nexacro17', FileDialog.LOAD);
        };

        // 넥사 파일 선택 후 처리
        this.FileDialog_onclose = function(obj, e) {
            var files = e.virtualfiles;
            if (files && files.length > 0) {
                var nexafile = files[files.length - 1];

                // 이미지 파일 확장자 검증
                var ext = nexafile.filename.split('.').pop().toLowerCase();
                var allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
                if (allowedExtensions.indexOf(ext) === -1) {
                    alert("이미지 파일만 업로드 가능합니다. (jpg, jpeg, png, gif)");
                    return;
                }

                // 업로드 상태 설정
                this.isUploading = true;
                this.uploadCompleted = false;

                this.FileUpTransfer.clearFileList();
                this.FileUpTransfer.addFile("bFile", nexafile);

                this.FileUpTransfer.url = "svc::previewBannerFile.do";
                this.FileUpTransfer.upload();

            } else {
                this.file_name.set_value("선택된 파일이 없습니다.");
            }
        };

        // 완료 버튼
        this.btn_done_onclick = function(obj, e) {
            if (this.isUploading) {
                alert("파일 업로드 중입니다. 잠시 후 다시 시도해주세요.");
                return;
            }

            var sortNumber = this.check_top.value ? 1 : 0;
            this.ds_bwrite.setColumn(0, "SORT_NUMBER", sortNumber);
            this.ds_bwrite.setColumn(0, "BANNER_TYPE", this.radio_banner_type.value);
            this.ds_bwrite.setColumn(0, "BANNER_TITLE", this.input_title.text);
            this.ds_bwrite.setColumn(0, "IS_VISIBLE", this.radio_view_type.value);
            this.ds_bwrite.setColumn(0, "LINKED_URL", this.edit_link.text);

            var finalMode = this.mode;
            if (!finalMode) {
                var bannerId = this.ds_bwrite.getColumn(0, "BANNER_ID");
                finalMode = bannerId ? "update" : "insert";
                this.mode = finalMode;
            }

            // top 타입이 아닐 때만 파일 검증
            if (this.radio_banner_type.value !== "top") {
                if (finalMode === "insert" && this.ds_file.rowcount === 0) {
                    alert("이미지를 업로드해주세요.");
                    return;
                }
            }

            if (!this.radio_view_type.value || !this.radio_banner_type.value ||
                !this.input_title.text || this.ds_bwrite.rowcount < 1) {
                alert("모든 항목을 입력해 주세요.");
                return;
            }

            if(finalMode === "insert"){
                if (!this.ds_bwrite.getColumn(0, "INPUT_ID")) {
                    this.ds_bwrite.setColumn(0, "INPUT_ID", this.memberId);
                    this.ds_bwrite.setColumn(0, "UPDATE_ID", this.memberId);
                }
            } else if(finalMode === "update") {
                this.ds_bwrite.setColumn(0, "UPDATE_ID", this.memberId);
            }

            if(finalMode === "insert"){
                this.fnInsertBanner();
            } else {
                this.fnUpdateBanner();
            }
        };

        // FileUpTransfer 콜백 (진행 중)
        this.FileUpTransfer_onprogress = function(obj, e) {
            trace("업로드 진행: " + e.loaded + "/" + e.total);
        };

        // FileUpTransfer 업로드 성공 시 서버 전송
        this.FileUpTransfer_onsuccess = function(obj, e) {
            if (this.uploadCompleted) {
                return;
            }

            var fileUrl = e.datasets[0]._rawRecords[0][1];
            var originalName = e.datasets[0]._rawRecords[0][0];

                trace("fileUrl: " + fileUrl);
                trace("originalName: " + originalName);

            if (fileUrl) {
                if (this.ds_file.rowcount === 0) {
                    this.ds_file.addRow();
                }
                this.ds_file.clearData();

                var nRow = this.ds_file.addRow();

                this.ds_file.setColumn(nRow, "IMG_PATH", fileUrl);
                this.ds_file.setColumn(nRow, "IMG_ORIGIN_NAME", originalName);

                // 디버깅 로그
                trace("=== 파일 업로드 완료 ===");
                trace("ds_file rowcount: " + this.ds_file.rowcount);
                trace("ds_file RowType: " + this.ds_file.getRowType(nRow));
                trace("IMG_PATH: " + fileUrl);
                trace("IMG_ORIGIN_NAME: " + originalName);

                this.file_name.set_value(originalName);

                this.uploadCompleted = true;
                this.isUploading = false;

                alert("파일 업로드 완료: " + originalName);
            }
        };

        // 업로드 실패 시 처리
        this.FileUpTransfer_onerror = function(obj, e) {
            this.isUploading = false;
            this.uploadCompleted = false;
            alert("파일 업로드에 실패했습니다: " + e.errormsg);
        };

        // 서버 전송 - insert
        this.fnInsertBanner = function() {
            var strSvcID = "insertBanner";
            var strURL = "svc::insertBannerByAdmin.do";
            var strInDatasets = "ds_bwrite=ds_bwrite ds_file=ds_file";
            var strOutDatasets = "";
            var strArg = "";
            var strCallback = "fnCallback";

            this.transaction(strSvcID, strURL, strInDatasets, strOutDatasets, strArg, strCallback);
        };

        // 서버 전송 - update
        this.fnUpdateBanner = function() {
            var strSvcID = "updateBanner";
            var strURL = "svc::updateBannerByAdmin.do";
            var strInDatasets = "ds_bwrite=ds_bwrite";
            var strOutDatasets = ""; // update는 결과 데이터를 받아올 필요 없음
            var strArg = "";
            var strCallback = "fnCallback";
            // 파일이 수정됬을때만 업데이트되도록
            if (this.uploadCompleted && this.ds_file.rowcount > 0) {
                strInDatasets += " ds_file=ds_file";
            }

            this.transaction(strSvcID, strURL, strInDatasets, strOutDatasets, strArg, strCallback);
        };

        // 서버 콜백
        this.fnCallback = function(svc, err, errMsg) {
            if (err < 0) {
                alert("에러 발생: " + errMsg);
                return;
            }
            switch(svc) {
                case "selectBannerDetail":
        			trace("배너 상세 조회 완료");

        			if(this.ds_bwrite.getRowCount() > 0) {
                        this.ds_bwrite.setRowType(0, Dataset.ROWTYPE_NORMAL);
                    }

        			var sortNumber = this.ds_bwrite.getColumn(0, "SORT_NUMBER");
        			this.check_top.set_value(sortNumber == "1" || sortNumber == 1);
        			this.radio_view_type.set_value(this.ds_bwrite.getColumn(0, "IS_VISIBLE"));
        			this.radio_banner_type.set_enable(false);
        			this.radio_banner_type.set_value(this.ds_bwrite.getColumn(0, "BANNER_TYPE"));
        			this.input_title.set_value(this.ds_bwrite.getColumn(0, "BANNER_TITLE"));
        			this.edit_link.set_value(this.ds_bwrite.getColumn(0, "LINKED_URL"));

        			// 등록일, 등록자 표시 (컴포넌트 ID 수정)
        			this.txt_date_td.set_text(this.ds_bwrite.getColumn(0, "INPUT_DT"));
        			this.txt_inputid.set_text(this.ds_bwrite.getColumn(0, "INPUT_ID"));

        			// 수정일, 수정자
        			this.txt_update_td.set_text(TODAY);
        			this.txt_updateid.set_text(this.memberId);
        			this.ds_bwrite.setColumn(0, "UPDATE_DT", TODAY);
        			this.ds_bwrite.setColumn(0, "UPDATE_ID", this.memberId);

        			this.uploadCompleted = true;
        			this.file_name.set_value(this.ds_bwrite.getColumn(0, "IMG_ORIGIN_NAME"));

        			if (this.ds_bwrite.getColumn(0, "BANNER_TYPE") === "top") {
        				this.btn_selectFile.set_enable(false);
        				this.file_name.set_value("탑배너는 이미지를 사용하지 않습니다.");
        			}
        			break;
                case "insertBanner":
                    alert("배너 등록 완료");
                    this.getOwnerFrame().set_formurl("banner::Form_BannerList.xfdl");
                    break;
                case "updateBanner":
                    alert("배너 수정 완료");
                    this.getOwnerFrame().set_formurl("banner::Form_BannerList.xfdl");
                    break;
            }
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_BannerWrite_onload,this);
            this.btn_done.addEventHandler("onclick",this.btn_done_onclick,this);
            this.btn_cancle.addEventHandler("onclick",this.btn_cancle_onclick,this);
            this.txt_thbanner.addEventHandler("onclick",this.txt_th00_onclick,this);
            this.txt_thtitle.addEventHandler("onclick",this.txt_th00_onclick,this);
            this.txt_th_file.addEventHandler("onclick",this.txt_th00_onclick,this);
            this.txt_date.addEventHandler("onclick",this.txt_th00_onclick,this);
            this.txt_th_link.addEventHandler("onclick",this.txt_th00_onclick,this);
            this.txt_date_td.addEventHandler("onclick",this.txt_th00_onclick,this);
            this.txt_date00.addEventHandler("onclick",this.txt_th00_onclick,this);
            this.txt_update_dt.addEventHandler("onclick",this.txt_th00_onclick,this);
            this.txt_date02.addEventHandler("onclick",this.txt_th00_onclick,this);
            this.txt_inputid.addEventHandler("onclick",this.txt_th00_onclick,this);
            this.txt_date01_00.addEventHandler("onclick",this.txt_th00_onclick,this);
            this.radio_view_type.addEventHandler("onitemchanged",this.radio_view_type_onitemchanged,this);
            this.radio_banner_type.addEventHandler("onitemchanged",this.radio_banner_type_onitemchanged,this);
            this.btn_selectFile.addEventHandler("onclick",this.btn_selectFile_onclick,this);
            this.FileDialog.addEventHandler("onclose",this.FileDialog_onclose,this);
            this.FileUpTransfer.addEventHandler("onerror",this.FileUpTransfer_onerror,this);
            this.FileUpTransfer.addEventHandler("onprogress",this.FileUpTransfer_onprogress,this);
            this.FileUpTransfer.addEventHandler("onsuccess",this.FileUpTransfer_onsuccess,this);
        };
        this.loadIncludeScript("Form_BannerWrite.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
