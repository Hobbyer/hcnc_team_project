(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Pop_ProductDetail");
            this.set_titletext("New Form");
            if (Form == this.constructor)
            {
                this._setFormPosition(400,300);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_item", this);
            obj._setContents("<ColumnInfo><Column id=\"PRODUCT_ID\" type=\"STRING\" size=\"256\"/><Column id=\"PRODUCT_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"QUANTITY\" type=\"STRING\" size=\"256\"/><Column id=\"PRODUCT_OPTION\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_search", this);
            obj._setContents("<ColumnInfo><Column id=\"ORDER_ID\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Grid("grid_list","0","0",null,null,"0","0",null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_binddataset("ds_item");
            obj.set_autofittype("col");
            obj.set_background("#FFFFFF");
            obj.set_border("0px none");
            obj.set_borderRadius("10px");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"58\"/><Column size=\"189\"/><Column size=\"74\"/><Column size=\"95\"/></Columns><Rows><Row size=\"40\" band=\"head\"/><Row size=\"34\"/></Rows><Band id=\"head\"><Cell text=\"제품ID\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\"/><Cell col=\"1\" text=\"제품명\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\"/><Cell col=\"2\" text=\"주문 옵션\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\"/><Cell col=\"3\" text=\"주문 수량\" font=\"normal 11pt/normal &quot;Noto Sans KR Medium&quot;\" background=\"white\" border=\"0px none,0px none,1px solid #eeeeee\"/></Band><Band id=\"body\"><Cell text=\"bind:PRODUCT_ID\" textAlign=\"center\" border=\"0px none,0px none,0.5px solid #eeeeee\" font=\"normal 10pt/normal &quot;Noto Sans KR DemiLight&quot;\"/><Cell col=\"1\" text=\"bind:PRODUCT_NAME\" textAlign=\"center\" border=\"0px none,0px none,0.5px solid #eeeeee\" font=\"normal 10pt/normal &quot;Noto Sans KR DemiLight&quot;\" edittype=\"none\"/><Cell col=\"2\" text=\"bind:PRODUCT_OPTION\" textAlign=\"center\" border=\"0px none,0px none,0.5px solid #eeeeee\" font=\"normal 10pt/normal &quot;Noto Sans KR DemiLight&quot;\" edittype=\"none\" cursor=\"pointer\"/><Cell col=\"3\" text=\"bind:QUANTITY\" textAlign=\"center\" border=\"0px none,0px none,0.5px solid #eeeeee\" font=\"normal 10pt/normal &quot;Noto Sans KR DemiLight&quot;\" edittype=\"none\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",400,300,this,function(p){});
            obj.set_mobileorientation("landscape");
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Pop_ProductDetail.xfdl", function() {

        this.Pop_ProductDetail_onload = function(obj,e)
        {
        	var orderId = this.parent["ORDER_ID"];
        	this.ds_search.setColumn(0,"ORDER_ID", orderId);
        	this.fnSearchOrderItem();
        };

        this.fnSearchOrderItem = function(){

        	var strSvcID       = "selectOrderItem";
            var strURL         = "svc::selectOrderItemByAdmin.do";
            var strInDatasets  = "ds_search=ds_search";
            var strOutDatasets = "ds_item=ds_item";
            var strArg         = "";
            var strCallback    = "fnCallback";

            this.transaction(strSvcID, strURL, strInDatasets, strOutDatasets, strArg, strCallback);
        }

        this.fnCallback = function(svcID, errCode, errMsg) {
            if (errCode < 0) {
                this.alert("에러: " + errMsg);
                return;
            }

            switch(svcID) {
                case "selectOrderItem":
                    trace("조회 완료");
                    break;
            }
        };
        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Pop_ProductDetail_onload,this);
            this.grid_list.addEventHandler("onheadclick",this.grid_list_onheadclick,this);
            this.grid_list.addEventHandler("oncellclick",this.grid_list_oncellclick,this);
        };
        this.loadIncludeScript("Pop_ProductDetail.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
