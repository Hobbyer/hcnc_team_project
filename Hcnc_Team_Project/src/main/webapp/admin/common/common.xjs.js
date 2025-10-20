//XJS=common.xjs
(function()
{
    return function(path)
    {
        var obj;
    
        // User Script
        this.registerScript(path, function() {
        // ==============================
        // 공통 트랜잭션 함수
        // ==============================
        this.gfn_transction = function(rtnId, url, inDs, outDs, strVal){
            this.transaction(
                rtnId,
                "svc::/" + url + "?time=" + new Date().getTime(),
                inDs,
                outDs,
                strVal,
                "fn_callback",
                true
            );
        };


        // ==============================
        // 공통 알럿창 (AlertCustom)
        // ==============================
        function alertCustom(form, msg, type)
        {
            // 기존 알럿 제거
            if (form.div_alertBg && form.div_alertBg.destroy) form.div_alertBg.destroy();

            // 1. 배경
            var bg = new Div("div_alertBg", 0, 0, null, null, 0, 0, null, null, null, null, form);
            bg.set_background("rgba(0,0,0,0.45)");
            bg.set_tabstop(true);
            form.addChild("div_alertBg", bg);
            bg.show();

            // 2. 알럿 본체
            var div = new Div("div_alertBox", 0, 0, 380, 180, null, null, null, null, null, null, bg);
            div.set_background("#ffffff");
            div.set_border("2px solid #056e70");
            div.set_borderRadius("12px");
            div.set_opacity(0.98);
            bg.addChild("div_alertBox", div);

        	// 1. 중앙 좌표 계산 (Form 기준)
        	var cx = (form.getOffsetWidth()  - div.getOffsetWidth())  / 2 - 190;
        	var cy = (form.getOffsetHeight() - div.getOffsetHeight()) / 2 - 100;

        	// 2. 화면 벗어나는 경우 방지
        	if (cx < 0) cx = 0;
        	if (cy < 0) cy = 0;

        	// 3. 이동 및 표시
        	div.move(cx, cy);
        	div.show();


            // 3. 메시지
            var stMsg = new Static("st_msg", 20, 50, 340, 60, null, null, null, null, null, null, div);
            stMsg.set_text(msg);
            stMsg.set_font("bold 12px 'Gulim'");
            stMsg.set_color("#333333");
            stMsg.set_textAlign("center");
            stMsg.set_wordWrap("char");
            stMsg.set_verticalAlign("middle");
            stMsg.set_background("transparent");
            div.addChild("st_msg", stMsg);
            stMsg.show();

            // 4. 확인 버튼
            var btnOk = new Button("btn_ok", 140, 120, 100, 35, null, null, null, null, null, null, div);
            btnOk.set_text("확인");
            btnOk.set_background("#056e70");
            btnOk.set_color("#ffffff");
            btnOk.set_font("bold 11px 'Gulim'");
            btnOk.set_borderRadius("8px");
            btnOk.set_cursor("pointer");
            div.addChild("btn_ok", btnOk);
            btnOk.show();

            btnOk.addEventHandler("onclick", function(){
                if (form.div_alertBg && form.div_alertBg.destroy) form.div_alertBg.destroy();
            }, form);

            bg.setFocus();
            bg.bringToFront();
        }


        // ==============================
        // 커스텀 컨펌창 (ConfirmCustom)
        // ==============================
        this.fn_confirmCustom = function (msg, callback)
        {
            var form = this;

            // 기존 창 제거
            if (form.div_confirmBg && form.div_confirmBg.destroy) form.div_confirmBg.destroy();

            // 1. 배경
            var bg = new Div("div_confirmBg", 0, 0, null, null, 0, 0, null, null, null, null, form);
            bg.set_background("rgba(0,0,0,0.45)");
            bg.set_tabstop(true);
            form.addChild("div_confirmBg", bg);
            bg.show();

            // 2. 본체
            var div = new Div("div_confirmBox", 0, 0, 360, 190, null, null, null, null, null, null, bg);
            div.set_background("#ffffff");
            div.set_border("2px solid #056e70");
            div.set_borderRadius("12px");
            div.set_opacity(0.98);
            bg.addChild("div_confirmBox", div);

        	// 1. 중앙 좌표 계산 (Form 기준)
        	var cx = (form.getOffsetWidth()  - div.getOffsetWidth())  / 2 - 190;
        	var cy = (form.getOffsetHeight() - div.getOffsetHeight()) / 2 - 100;

        	// 2. 화면 벗어나는 경우 방지
        	if (cx < 0) cx = 0;
        	if (cy < 0) cy = 0;

        	// 3. 이동 및 표시
        	div.move(cx, cy);
        	div.show();



            // 3. 메시지
            var stMsg = new Static("st_msg", 30, 45, 300, 60, null, null, null, null, null, null, div);
            stMsg.set_text(msg);
            stMsg.set_font("bold 12px 'Gulim'");
            stMsg.set_color("#333333");
            stMsg.set_textAlign("center");
            stMsg.set_wordWrap("char");
            stMsg.set_verticalAlign("middle");
            div.addChild("st_msg", stMsg);
            stMsg.show();

            // 4. 버튼
            var btnOk = new Button("btn_ok", 65, 120, 100, 35, null, null, null, null, null, null, div);
            btnOk.set_text("확인");
            btnOk.set_background("#056e70");
            btnOk.set_color("#ffffff");
            btnOk.set_font("bold 11px 'Gulim'");
            btnOk.set_borderRadius("8px");
            div.addChild("btn_ok", btnOk);
            btnOk.show();

            var btnCancel = new Button("btn_cancel", 195, 120, 100, 35, null, null, null, null, null, null, div);
            btnCancel.set_text("취소");
            btnCancel.set_background("#dddddd");
            btnCancel.set_color("#000000");
            btnCancel.set_font("bold 11px 'Gulim'");
            btnCancel.set_borderRadius("8px");
            div.addChild("btn_cancel", btnCancel);
            btnCancel.show();

            // 5. 닫기 처리
            function closeConfirm(ok) {
                if (form.div_confirmBg && form.div_confirmBg.destroy) form.div_confirmBg.destroy();
                if (typeof callback === "function") callback(ok);
            }

            // 6. 이벤트 연결
            btnOk.addEventHandler("onclick", function(){ closeConfirm(true); }, form);
            btnCancel.addEventHandler("onclick", function(){ closeConfirm(false); }, form);

            bg.addEventHandler("onkeydown", function(obj, e){
                if (e.keycode == 13) closeConfirm(true);
                if (e.keycode == 27) closeConfirm(false);
            }, form);

            bg.setFocus();
            bg.bringToFront();
        }


        // ==============================
        // 공통 alert 함수 등록
        // ==============================
        nexacro.Form.prototype.alert = function(msg){
            alertCustom(this, msg);
        };

        });
    
        this.loadIncludeScript(path);
        
        obj = null;
    };
}
)();
