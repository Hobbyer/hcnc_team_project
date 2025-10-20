<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<jsp:include page="../layout/headertop.jsp" />
<%-- <link type="text/css" rel="stylesheet" href="<c:url value='/css/egovframework/cart.css'/>" /> --%>
<jsp:include page="../layout/header.jsp" />
<%-- <jsp:include page="../layout/menu.jsp" /> --%>

<style>
	/* 옵션 변경 모달 */
	.option-modal {
	    position: fixed;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 100%;
	    background: rgba(0, 0, 0, 0.5);
	    z-index: 1000;
	    display: none;
	}
	
	.option-modal-content {
	    position: absolute;
	    top: 50%;
	    left: 50%;
	    transform: translate(-50%, -50%);
	    background: #ffffff;
	    width: 90%;
	    max-width: 500px;
	    border-radius: 12px;
	    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
	    overflow: hidden;
	}
	
	.option-modal-content h2 {
	    background: linear-gradient(135deg, #DC0630 0%, #b8052a 100%);
	    color: white;
	    margin: 0;
	    padding: 20px 30px;
	    font-size: 18px;
	    font-weight: 600;
	}
	
	.option-close {
	    position: absolute;
	    top: 20px;
	    right: 25px;
	    font-size: 24px;
	    color: white;
	    cursor: pointer;
	    z-index: 1001;
	    transition: opacity 0.3s;
	}
	
	.option-close:hover {
	    opacity: 0.7;
	}
	
	.option-modal-body {
	    padding: 30px;
	}
	
	#option-selects-container {
	    margin-bottom: 20px;
	}
	
	.option-group {
	    margin-bottom: 20px;
	}
	
	.option-group label {
	    display: block;
	    color: #DC0630;
	    font-weight: 600;
	    margin-bottom: 8px;
	    font-size: 14px;
	}
	
	.option-group select {
	    width: 100%;
	    padding: 12px 15px;
	    border: 2px solid #f1f1f1;
	    border-radius: 8px;
	    font-size: 14px;
	    transition: all 0.3s ease;
	    background: #ffffff;
	    cursor: pointer;
	}
	
	.option-group select:focus {
	    outline: none;
	    border-color: #DC0630;
	    box-shadow: 0 0 0 3px rgba(220, 6, 48, 0.1);
	}
	
	.option-modal-buttons {
	    display: flex;
	    gap: 10px;
	    margin-top: 30px;
	    padding-top: 20px;
	    border-top: 1px solid #f1f1f1;
	}
	
	.option-modal-buttons button {
	    flex: 1;
	    padding: 12px 20px;
	    border: none;
	    border-radius: 8px;
	    font-size: 14px;
	    font-weight: 500;
	    cursor: pointer;
	    transition: all 0.3s ease;
	}
	
	.btn-option-change {
	    background: #DC0630;
	    color: white;
	}
	
	.btn-option-change:hover {
	    background: #b8052a;
	}
	
	.btn-option-cancel {
	    background: #6c757d;
	    color: white;
	}
	
	.btn-option-cancel:hover {
	    background: #545b62;
	}
</style>

<script>
	//모달 닫기 이벤트
	$(document).ready(function() {
	    // X 버튼
	    $(".option-close").on("click", function() {
	        $("#optionChangeModal").hide();
	    });
	    
	    // 취소 버튼
	    $(".btn-option-cancel").on("click", function() {
	        $("#optionChangeModal").hide();
	    });
	    
	    // 변경 버튼
	    $(".btn-option-change").on("click", function() {
	        var selectedOptions = [];
	        var allSelected = true;
	        
	        // 모든 셀렉트박스 확인
	        $(".option-select-modal").each(function() {
	            var value = $(this).val();
	            if(!value) {
	                allSelected = false;
	                return false;
	            }
	            
	            selectedOptions.push({
	                optionId: value,
	                optionName: $(this).data("option-name"),
	                optionValue: $(this).find("option:selected").data("option-value"),
	                additionalPrice: parseInt($(this).find("option:selected").data("price")) || 0
	            });
	        });
	        
	        if(!allSelected) {
	            alert("모든 옵션을 선택해주세요.");
	            return;
	        }
	        
	        // 옵션 변경 서버 요청
	        changeCartItemOption(currentCartItemId, selectedOptions);
	    });
	    
	    // 배경 클릭 시 모달 닫기
	    $("#optionChangeModal").on("click", function(e) {
	        if($(e.target).hasClass("option-modal")) {
	            $(this).hide();
	        }
	    });
	});
</script>

 <script>
    	// 페이지 로드
    	$(function(){
    		selectCartList();
    	})

    	const urlParams = new URLSearchParams(window.location.search);
    	
		const cartId = urlParams.get('cartId');
    
    	// 장바구니 리스트 조회
    	const selectCartList = () => {
    		
    		var param = {
    				cartId : cartId
    		};
    		
    		$.ajax({
    			url: "/selectCartListByUser.do"
    			, type: "post"
    			, data: param
    			, dataType: "json"
    			, success: function(res){
    				console.log(res.cartList);
    				
    				var list = res.cartList;
    				
    				console.log(list);
    				
    				// 장바구니가 비어있는 경우 처리
						if(!list || list.length === 0) {
								showEmptyCart();
								return;
						}
						
						// 기존 테이블 표시
						$(".cart-table").show();
						$(".cart-footer").show();
						$("#empty-cart").hide();
    				
    				var allCheck = true;
    				
    				var html = '';
    				for(var i = 0; i < list.length; i++){
    				    if(list[i].IS_CHECKED == 'N'){
    				        allCheck = false;
    				    }

    				    html += '<tr>';
    				    if(list[i].IS_CHECKED == 'N'){
    				        html += '<td class="col-check"><input type="checkbox" class="check" id="'+ list[i].CART_ITEM_ID +'-checkbox" onchange="updateChkBox(' + list[i].CART_ITEM_ID + ')"></td>';
    				    } else {
    				        html += '<td class="col-check"><input type="checkbox" class="check" id="'+ list[i].CART_ITEM_ID +'-checkbox" checked onchange="updateChkBox(' + list[i].CART_ITEM_ID + ')"></td>';
    				    }
    				    html += '<td class="col-img"><img src="'+ list[i].IMAGE_URL +'" width="50"></td>';
    				    html += '<td class="col-name"><span>' + list[i].PRODUCT_NAME + '</span></td>';
    				    
    				    if(list[i].options.length > 0){
    				    	html += '<td class="col-option" id="option-cell-' + list[i].CART_ITEM_ID + '" style="text-align: left;">';
    		                for(var j=0; j < list[i].options.length; j++){
    		                	var additionalPrice = list[i].options[j].ADDITIONAL_PRICE;
    		                	html += '<span class="span-option-'+ list[i].CART_ITEM_ID +'" data-additional-price="'+ additionalPrice +'">['+ list[i].options[j].OPTION_NAME +'] '+ list[i].options[j].OPTION_VALUE + ' (+'+ additionalPrice.toLocaleString() +'원)</span></br>';
    		                }
    		                html += '</td>';
    		                html += '<td><a style="font-size: 12px; cursor: pointer;" onclick="optionChange('+ list[i].CART_ITEM_ID +', '+ list[i].PRODUCT_ID +')">옵션변경</a></td>'
    				    } else {
    				        html += '<td class="col-option" colspan="2"><span> - </span> </td>';
    				    }
    				    html += '<td class="col-price"><span id="'+ list[i].CART_ITEM_ID +'-price">' + list[i].PRICE.toLocaleString() + '</span><span>원</span></td>';
    				    html += '<td class="col-qty">';
    				    html += '<div class="qty-box">';
    				    html += '<button type="button" class="btn-qty" onclick="countDown('+ list[i].CART_ITEM_ID +')">-</button>';
    				    html += '<input class="quantity" id="'+ list[i].CART_ITEM_ID +'-quantity" type="number" value="' + list[i].QUANTITY + '" min="1" onchange="updateCnt('+ list[i].CART_ITEM_ID +')">';
    				    html += '<button type="button" class="btn-qty" onclick="countUp('+ list[i].CART_ITEM_ID +')">+</button>';
    				    html += '</div>';
    				    html += '</td>';
    				    html += '<td class="col-total"><span id="'+ list[i].CART_ITEM_ID +'-total">' + list[i].SUB_TOTAL.toLocaleString() + '</span><span>원</span></td>';
    				    
    				    // 위시리스트 상태에 따른 하트 아이콘 설정
    				    var heartIcon = '';
    				    if(list[i].IS_WISHLIST == 'Y'){
    				        heartIcon = '<c:if test="${userInfo != null}"><i class="bi bi-suit-heart-fill wishlist-heart" style="color: red; cursor: pointer;" onclick="toggleWishlist(' + list[i].CART_ITEM_ID + ', ' + list[i].PRODUCT_ID + ')"></i></c:if>';
    				    } else {
    				        heartIcon = '<c:if test="${userInfo != null}"><i class="bi bi-suit-heart wishlist-heart" style="cursor: pointer;" onclick="toggleWishlist(' + list[i].CART_ITEM_ID + ', ' + list[i].PRODUCT_ID + ')"></i></c:if>';
    				    }
    				    
    				    html += '<td class="col-actions"><i class="bi bi-x-lg" style="cursor: pointer;" onclick="deleteProduct(' + list[i].CART_ITEM_ID + ')"></i> ' + heartIcon + '</td>';
    				    html += '</tr>';
    				}

    				$("#cart-body").html(html);
    				
    				var checkData = '';
    				if(allCheck){
    					checkData = '<input type="checkbox" class="allCheck" id="headCheck" checked onchange="updateAllCheck()">'
    				} else {
    					checkData = '<input type="checkbox" class="allCheck" id="headCheck" onchange="updateAllCheck()">'
    				}
    				
    				$("#allCheck-box").html(checkData);
    				
    				calculateTotalPrice();
    				
    				/* if(res.cartTotalPrice != null){
    					$("#sum-products").text(res.cartTotalPrice.SUM_SUB.toLocaleString() + "원");
    				} else {
    					$("#sum-products").text("0원");
    				} */
    			}
    			, error: function(err){
    				alert("장바구니 리스트 조회 통신 실패");
    			}
    		});
    	}
    	
    	// 빈 장바구니 상태 표시 함수
    	const showEmptyCart = () => {
    	    // 기존 테이블과 푸터 숨기기
    	    $(".cart-table").hide();
    	    $(".cart-footer").hide();
    	    
    	 // 빈 상태 메시지 표시
    	    var emptyHtml = '<div id="empty-cart" class="empty-cart">' +
    	            '<div class="empty-cart-icon">' +
    	                '<i class="bi bi-cart-x"></i>' +
    	            '</div>' +
    	            '<div class="empty-cart-message">' +
    	                '<h3>장바구니가 비어 있습니다</h3>' +
    	                '<p>상품을 담고 주문해보세요!</p>' +
    	            '</div>' +
    	            '<div class="empty-cart-actions">' +
    	                '<button class="cart-btn shopping-btn" onclick="history.back()">' +
    	                    '<i class="bi bi-bag"></i>' +
    	                    '쇼핑 계속하기' +
    	                '</button>' +
    	            '</div>' +
    	        '</div>';
    	    
    	    // cart-grid 다음에 빈 상태 메시지 삽입
    	    if($("#empty-cart").length === 0) {
    	        $(".cart-grid").after(emptyHtml);
    	    } else {
    	        $("#empty-cart").show();
    	    }
    	}

    	// 쇼핑 계속하기 버튼 함수
    	const goToShopping = () => {
    	    window.location.href = "/"; // 메인 페이지로 이동 (또는 상품 목록 페이지)
    	}
    	
    	const optionChange = (cart_item_id, product_id) => {
    		
    		// 선택 상품 옵션 조회
    		$.ajax({
    			url: "/selectProductOptions.do",
    			type: "post",
    			data: { productId: product_id },
    			dataType: "json",
    			success: function(res) {
    		        var optionInfo = res.options;
    		        console.log(optionInfo);
    		        
    		        $("#product-name").text(optionInfo[0].PRODUCT_NAME);
    		        
    		     	// 1단계: 어떤 옵션명들이 있는지 찾기
    				var options = [];
    				for (var i = 0; i < optionInfo.length; i++) {
    				    var optionName = optionInfo[i].OPTION_NAME;
    				    
    				    // 중복 체크해서 없으면 추가
    				    var duplicate = false;
    				    for (var j = 0; j < options.length; j++) {
    				        if (options[j] == optionName) {
    				            duplicate = true;
    				            break;
    				        }
    				    }
    				    if (!duplicate) {
    				        options.push(optionName);
    				    }
    				}
    	
    				// 2단계: HTML 생성
    				var optionContainer = '';
    				for(var i = 0; i < options.length; i++){
    				    optionContainer += '<div class="option-group">';
    				    optionContainer += '<span class="option-label">' + options[i] + ' </span>';
    				    optionContainer += '<select class="option-select" id="'+ optionInfo[i].OPTION_ID +'_select" data-option-name="' + options[i] + '">';
    				    optionContainer += '<option value="non-select">옵션을 선택해주세요.</option>';
    				    
    				    // 해당 옵션명의 값들만 추가
    				    for(var j = 0; j < optionInfo.length; j++){
    				        if(options[i] == optionInfo[j].OPTION_NAME){
    				        	var optionId = optionInfo[j].OPTION_ID
    				        	var optionName = options[i];
    				            var optionValue = optionInfo[j].OPTION_VALUE;
    				            var additionalPrice = optionInfo[j].ADDITIONAL_PRICE;
    				            var displayText = optionValue;
    				            
    				            if(additionalPrice > 0){
    				                displayText += ' (+' + additionalPrice + '원)';
    				            }
    				            
    				            optionContainer += '<option value="['+ optionName +'] ' + optionValue + '" data-option-id="'+ optionId +'" data-price="' + additionalPrice + '">';
    				            optionContainer += displayText + '</option>';
    				        }
    				    }
    				    
    				    optionContainer += '</select>';
    				    optionContainer += '</div>';
    				}
    				
    				$("#option-selects-container").html(optionContainer);
    				
    				var buttonHtml = '<button type="button" class="btn-option-change" onclick="updateOption('+ cart_item_id +')">변경</button>';
    				buttonHtml += '<button type="button" class="btn-option-cancel">취소</button>';
    	                
    				$("#option-modal-buttons").html(buttonHtml);
    		        
    		        $("#optionChangeModal").show();
    		    },
    		    error: function(){
    		    	
    		    }
    		})
    		
    		
    		// 모달 표시
            $("#optionChangeModal").show();
    	}
    	
    	
    	// 옵션 변경 ajax (서버통신)
		const updateOption = (cart_item_id) => {
			var option = '';
		    var optionIds = [];
		    var optionTotalPrice = 0;
		      
		    var hasOption = true;
		    
		    // 모든 select 요소를 직접 찾기
		    var allSelects = document.querySelectorAll('.option-select');
		    
		    for(var i = 0; i < allSelects.length; i++){
		        var selectElement = allSelects[i];
		        
		        if(selectElement.value === 'non-select' || selectElement.value === '') {
		            hasOption = false;
		            break;
		        }
		        
		        var selectedOption = selectElement.options[selectElement.selectedIndex];
		        var optionId = selectedOption.getAttribute('data-option-id');
		        var optionName = selectElement.getAttribute('data-option-name');
		        
		        // 실제 선택된 옵션 정보 추출
		        var optionPrice = parseInt(selectedOption.getAttribute('data-price')) || 0;
		        
		       	console.log("optionID=" + optionId);
		        
		     	// optionId가 optionIds 배열에 없으면 추가
		        if(optionIds.indexOf(optionId) === -1) {
		            optionIds.push(optionId);
		            
		            optionTotalPrice += optionPrice;
		        }
		        
		        option += selectElement.value + ' \n';
		        
		    }
		    
		    
		    if(hasOption && allSelects.length > 0 || allSelects.length <= 0){
		    	isProcessing = true; // 플래그 설정 (버튼 광클 금지!)
		    	
		        var param = {
		    		cartId: cartId,
					cartItemId: cart_item_id,
		            option: option,
		            optionIds: optionIds,
		            optionPrice : optionTotalPrice
		        };
		        
		        $.ajax({
			        url: "/updateOption.do"
			        , type: "post"
			        , data: param
			        , dataType: "json"
			        , traditional: true
			        , success: function(res){
			        	if(res.success){
			                alert("옵션이 적용되었습니다.");
			                
			                window.location.reload();
			            } else {
			                if(res.errorCode === 'DUPLICATE') {
			                    alert("이미 동일한 옵션이 장바구니에 있습니다.");
			                } else {
			                    alert("옵션 변경에 실패했습니다: " + res.message);
			                }
			            }
			        }
			        , error: function(err){
			            alert("옵션 변경 통신 실패");
			        }
			    });
		        
		        
		    } else if(!hasOption && allSelects.length > 0) {
		        alert("모든 옵션을 선택해주세요.");
		    } else {
		    	return;
		    }
		}
    	
    
        // 수량 버튼
        const countDown = (cart_item_id) => {
		    var quantity = Number($("#" + cart_item_id + "-quantity").val());
		    
		    if (quantity > 1) {
		        $("#" + cart_item_id + "-quantity").val(quantity - 1);
		        updateCnt(cart_item_id);
		    }
		}
		
		const countUp = (cart_item_id) => {
		    var quantity = Number($("#" + cart_item_id + "-quantity").val());
		    $("#" + cart_item_id + "-quantity").val(quantity + 1);
		    updateCnt(cart_item_id);
		}

        // 상품 수량 디비 저장
        var updateTimers = {}; // 각 아이템별 타이머 저장
        const updateCnt = (cart_item_id) => {
            if(updateTimers[cart_item_id]) {
                clearTimeout(updateTimers[cart_item_id]);
            }
            
            var quantity = Number($("#" + cart_item_id + "-quantity").val());
            
            if (quantity <= 0) {
                quantity = 1;
                $("#" + cart_item_id + "-quantity").val(1);
            }
            
            var totalAdditionalPrice = 0;
            $('.span-option-' + cart_item_id).each(function() {
                totalAdditionalPrice += parseInt($(this).data('additional-price')) || 0;
            });
            
            var price = Number($("#" + cart_item_id + "-price").text().replace(/[^\d.-]/g, ''));
            var subTotal = (price + totalAdditionalPrice) * quantity;
            
            $("#" + cart_item_id + "-total").text(subTotal.toLocaleString());
            calculateTotalPrice();
            
            // DB 업데이트
            updateTimers[cart_item_id] = setTimeout(function() {
                var param = {
                    quantity: quantity,
                    cartId: cartId,
                    cartItemId: cart_item_id,
                    subTotal: subTotal
                };
                
                $.ajax({
                    url: "/updateQuantity.do",
                    type: "post",
                    data: param,
                    dataType: "json",
                    success: function(res) {
                    	
                    },
                    error: function(err) {
                        alert("상품 수량 저장 중 오류가 발생했습니다.");
                    }
                });
                
                delete updateTimers[cart_item_id];
            }, 500);
        }
        
        const calculateTotalPrice = () => {
            var sumSubTotal = 0;
            
            // 체크된 상품들만 합산
            $("#cart-body tr").each(function() {
                var $row = $(this);
                var $checkbox = $row.find('input[type="checkbox"]');
                
                // 체크된 경우만 계산
                if($checkbox.prop('checked')) {
                    var cartItemId = $checkbox.attr('id').replace('-checkbox', '');
                    var subTotal = Number($("#" + cartItemId + "-total").text().replace(/[^\d.-]/g, ''));
                    sumSubTotal += subTotal;
                }
            });
            
            var shippingFee = Number( $("#sum-ship-normal").data('value') );
            var sumFinal = sumSubTotal + shippingFee;
            
            // 화면에 표시
            $("#sum-products").text(sumSubTotal.toLocaleString() + "원");
            $("#sum-final").text(sumFinal.toLocaleString() + "원");

        }
        

        // 개별 체크박스 수정
        const updateChkBox = (cart_item_id) => {
        	
        	var checkboxValue = $("#"+ cart_item_id + "-checkbox").prop("checked");
   			
        	console.log(checkboxValue);
        	
        	var is_checked = '';
        	
        	if(checkboxValue){
        		is_checked = 'Y';
        		   		
        	} else {
        		is_checked = 'N';
        		
        	}
        	
        	var param = {
        		cartId : cartId
        		, cartItemId : cart_item_id
        		, isChecked : is_checked	
        	};
        	
        	$.ajax({
        		url: "/updateChkBox.do"
        		, type: "post"
        		, data: param
        		, dataType: "json"
        		, success: function(res){
        			
        			calculateTotalPrice();
        			
        			// 장바구니 전체 금액 조회 결과 //
        			/* if(res.cartTotalPrice != null){
        				$("#sum-products").text(res.cartTotalPrice.SUM_SUB.toLocaleString() + "원");
        			} else {
        				$("#sum-products").text("0원"); 
        			} */
        			
        		}
        		, error: function(){
        			
        		}
        	});
        	
        }
        
        // 삭제
        const deleteProduct = (cart_item_id) => {
        	if(confirm("삭제하시겠습니까?")){
	        	var param = {
        			cartItemId : cart_item_id
	        		, cartId : cartId
	        	};
	        	
	        	$.ajax({
	        		url: "/deleteProduct.do"
	        		, type: "post"
	        		, data: param
	        		, dataType: "json"
	        		, success: function(){
	        			
	        			alert("삭제 되었습니다.");
	                    // 페이지 새로고침 대신 장바구니 리스트 다시 조회
	                    selectCartList();
	     
	        		}
	        		, error: function(){
	        			alert("개별 삭제 통신 실패");
	        		}
	        	});
        	}
        }

        // 전체 선택
        $(document).on("change", ".allCheck", function(){
        	const checked = $(this).prop("checked");
        	$(".check").prop("checked", checked)

        });
        
        $(document).on("change", ".check", function(){
        	const total = $(".check").length;
        	const checked = $(".check:checked").length;
        	
        	$(".allCheck").prop("checked", total > 0 && total === checked);
        });


        // 전체 선택 상품 디비 저장

        const updateAllCheck = () => {
        	
        	var isCheck = $("#headCheck").prop("checked");

        	
        	if(isCheck){
        		is_checked = 'Y';
        		   		
        	} else {
        		is_checked = 'N';
        		
        	}
        	
        	var param = {
        			cartId : cartId
        			, isChecked : is_checked
        	};
        	
        	$.ajax({
        		url: "/updateChkBox.do"
        		, type: "post"
        		, data: param
        		, dataType: "json"
        		, success: function(res){
        			calculateTotalPrice();
        			
        			/* if(res.cartTotalPrice != null){
        				$("#sum-products").text(res.cartTotalPrice.SUM_SUB.toLocaleString() + "원");
        			} else {
        				$("#sum-products").text("0원");
        			} */
        		}
        		, error: function(){
        			
        		}
        	});
        }
        
        var isProcessing = false;
        // 선택 상품 삭제
		const deleteSelected = () => {
			if(isProcessing){
				return;
			}
			
			// 체크된 상품 개수 확인
     	    var checkedCount = $(".check:checked").length;
     	    
     	    if(checkedCount === 0) {
     	        alert("삭제할 상품을 선택해주세요.");
     	        return;
     	    }
			
			if(confirm("선택 상품을 장바구니에서 삭제하시겠습니까?")){
			
				var selectedItems = true;
				var param = {
					cartId : cartId
					, selectedItems : selectedItems
				};
				
				isProcessing = true;
				
				$.ajax({
					url: "/deleteProduct.do"
					, type: "post"
					, data: param
					, dataType: "json"
					, success: function(){
						alert("삭제 되었습니다.");
				        			
			            // 페이지 새로고침 대신 장바구니 리스트 다시 조회
			            selectCartList();
					}
					, error: function(){
	        			alert("개별 삭제 통신 실패");
					}
					, complete: function(){
						isProcessing = false;
					}
				});
			}
		}
		
		// 장바구니 전체 삭제
		const deleteCart = () => {
			if(isProcessing){
				return;
			}
			
			if(confirm("장바구니에 담긴 상품을 전체 삭제하시겠습니까?")){
			
				var param = {
					cartId : cartId
				};
				
				isProcessing = true;
				$.ajax({
					url: "/deleteProduct.do"
					, type: "post"
					, data: param
					, dataType: "json"
					, success: function(){
						alert("삭제 되었습니다.");
	        			
			            // 페이지 새로고침 대신 장바구니 리스트 다시 조회
			            selectCartList();
					}
					, error: function(){
	        			alert("전체 삭제 통신 실패");
					}
					, complete: function(){
						isProcessing = false;
					}
				});
			}
		}

		

        // 위시리스트 토글 기능
        const toggleWishlist = (cart_item_id, product_id) => {
            var isCurrentlyInWishlist = false;
            
            // 현재 하트 상태 확인
            $("#cart-body tr").each(function() {
                var $row = $(this);
                var $heart = $row.find('.wishlist-heart');
                
                // 해당 행인지 확인 (체크박스 id로 판단)
                if ($row.find('input[type="checkbox"]').attr('id') === cart_item_id + '-checkbox') {
                    isCurrentlyInWishlist = $heart.hasClass('bi-suit-heart-fill');
                    return false; // break
                }
            });
            
            // 확인 메시지 표시
            var message = isCurrentlyInWishlist ? 
                '이 상품의 모든 옵션이 위시리스트에서 제거됩니다. 계속하시겠습니까?' : 
                '이 상품의 모든 옵션이 위시리스트에 추가됩니다. 계속하시겠습니까?';
            
            if (!confirm(message)) {
                return;
            }
            
            var param = {
                productId: product_id,
                cartItemId: cart_item_id,
                action: isCurrentlyInWishlist ? 'remove' : 'add'
            };
            
            $.ajax({
                url: "/toggleWishlist.do",
                type: "post",
                data: param,
                dataType: "json",
                success: function(res) {
                    if (res.success) {
                        // 같은 상품의 모든 옵션 하트 아이콘 업데이트
                        $("#cart-body tr").each(function() {
                            var $row = $(this);
                            var $heart = $row.find('.wishlist-heart');
                            var rowProductId = null;
                            
                            // onclick 속성에서 product_id 추출
                            var onclickAttr = $heart.attr('onclick');
                            if (onclickAttr) {
                                var matches = onclickAttr.match(/toggleWishlist\(\d+,\s*(\d+)\)/);
                                if (matches) {
                                    rowProductId = parseInt(matches[1]);
                                }
                            }
                            
                            // 같은 상품 ID인 경우 하트 상태 업데이트
                            if (rowProductId === product_id) {
                                if (res.isInWishlist) {
                                    // 위시리스트에 추가됨 - 색칠된 하트로 변경
                                    $heart.removeClass('bi-suit-heart').addClass('bi-suit-heart-fill');
                                    $heart.css('color', 'red');
                                } else {
                                    // 위시리스트에서 제거됨 - 빈 하트로 변경
                                    $heart.removeClass('bi-suit-heart-fill').addClass('bi-suit-heart');
                                    $heart.css('color', '');
                                }
                            }
                        });
                        
                        var resultMessage = res.isInWishlist ? '위시리스트에 추가되었습니다.' : '위시리스트에서 제거되었습니다.';
                        alert(resultMessage);
                        
                    } else {
                        alert('위시리스트 처리에 실패했습니다: ' + res.message);
                    }
                },
                error: function(err) {
                    alert('위시리스트 처리 통신 실패');
                }
            });
        }
        

        
        // 주문 번호 생성
        var orderCounter = 0;
        
        function generateUniqueOrderNumber(){
        	orderCounter++;
        	var timestamp = new Date().getTime().toString().slice(-10); //뒤 10자리
        	var counter = ('0000' + orderCounter).slice(-4); //4자리 카운터
        	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        	var randomPart = '';
        	
        	// 남은 6자리를 랜덤으로 채움
        	for(var i = 0; i < 6; i++){
        		var randomIndex = Math.floor(Math.random() * chars.length);
        		randomPart += chars.charAt(randomIndex);
        	}
        	
        	return timestamp + counter + randomPart; //총 20자
        }
        
     	// 주문하기 버튼
        function orderRequest(){
     		if(isProcessing){
     			return;
     		}
     		
     		// 체크된 상품 개수 확인
     	    var checkedCount = $(".check:checked").length;
     	    
     	    if(checkedCount === 0) {
     	        alert("주문할 상품을 선택해주세요.");
     	        return;
     	    }
     		
     		isProcessing = true;
        	var orderNumber = generateUniqueOrderNumber();
        	
        	window.location.href="orderView.do?cartId="+ cartId + "&orderNum=" + orderNumber;
        	
        	isProcessing = false;
        }
    </script>
    
<!-- 옵션변경 모달 -->
<div id="optionChangeModal" class="option-modal" style="display: none;">
    <div class="option-modal-content">
        <span class="option-close">&times;</span>
        <h2>옵션 변경</h2>
        <div class="option-modal-body">
        	<div id="product-name"></div>
            <div id="option-selects-container">
                <!-- 옵션 셀렉트박스들이 동적으로 생성됩니다 -->
            </div>
            <div class="option-modal-buttons" id="option-modal-buttons">

            </div>
        </div>
    </div>
</div>

  <div class="container cart">
  	<div class="inner">
  	<div class="cart-container">
	    <div class="breadcrumb">
	        <div class="container">
	            <div class="breadcrumb-content">
	                <a href="/">홈</a> >
	                <span class="breadcrumb-current">장바구니</span>
	            </div>
	        </div>
	    </div>
	    <div>
	    <h1>[ C A R T ]</h1>
			</div>
	
	    <!-- 장바구니 상품 테이블 -->
	    <div class="cart-grid">
	      <div>
	        <table class="cart-table">
	          <thead>
	            <tr>
	              <th class="col-check" id="allCheck-box"></th>
	              <th class="col-img col-name" colspan="2">상품정보</th>
	              <th class="col-option" colspan="2">옵션</th>
	              <th class="col-price">가격</th>
	              <th class="col-qty">수량</th>
	              <th class="col-total">총금액</th>
	              <c:if test="${userInfo != null}">
	              	<th class="col-actions">삭제/관심</th>
	              </c:if>
	              <c:if test="${userInfo == null}">
	              	<th class="col-actions">삭제</th>
	              </c:if>
	            </tr>
	          </thead>
	          <tbody id="cart-body">
	          	<!-- JS 렌더링 -->
	          </tbody>
	        </table>
	      </div>
	
	    </div>
	
		<div class="cart-footer">
			<div class="footer-btn">
			        <button class="cart-btn" id="btnContinue" onclick="history.back()">계속 쇼핑하기</button>
			        <button class="btn-outline" id="btnDeleteSelected" onclick="deleteSelected()">
			        	<i class="bi bi-bag-x"></i>
			        	선택상품 삭제하기</button>
			        <button class="btn-outline" id="btnClear" onclick="deleteCart()">
			        	<i class="bi bi-trash3"></i>
			        	장바구니 비우기</button>
		        <div class="orderInfo">
		        	<div>
			        	<i class="bi bi-exclamation-circle"></i>
			        	<span>안내사항</span>
		        	</div>
		        	<p>- 상품 쿠폰 및 적립금 사용은 [주문서 작성/결제]에서 적용됩니다.</p>
		        	<p>- 장바구니는 회원에 한해 직접 삭제할 때까지 보관됩니다. 더 오래 보관 하시려면 위시리스트에 담아주세요.</p>
		        </div>
			</div>
		
			<div class="footer-total">
		      <h4>결제 예정 금액</h4>
		      <div class="sum-row"><span>주문금액</span><span id="sum-products" class="price"></span></div>
		      <div class="sum-row small"><span>일반배송비</span><span id="sum-ship-normal" data-value=3000>3,000원</span></div>
		      <div class="sum-total"><span>결제금액</span><span id="sum-final" class="price">0원</span></div>
		      <button class="order-btn" id="btnOrder" onclick="orderRequest()">주문하기</button>
		    </div>
	    </div>
	  </div>
  	</div>
  </div>
  
<jsp:include page="../layout/footer.jsp" />