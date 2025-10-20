var urlParams = new URLSearchParams(window.location.search);
	
var productId = urlParams.get('productId');

// 수량 버튼 (새로운 옵션 시스템과 통합)
function countDown() {
  var quantity = parseInt($('#quantity').val()) || 1;
  if (quantity > 1) {
    $('#quantity').val(quantity - 1);
    
    updateCnt();
  }
}

function countUp() {
  var quantity = parseInt($('#quantity').val()) || 1;
  $('#quantity').val(quantity + 1);
  
  updateCnt();
}

function updateCnt() {
  var quantity = parseInt($('#quantity').val()) || 1;
  var newPrice = basePrice * quantity;
  
  if (quantity <= 1){
    $('#quantity').val(1);
  } else if (quantity >= 999999){
    $('#quantity').val(999999);
  }
  
  updateTotalPrice(newPrice);
  
}

function selectOption() {
  var selected = $("#options-select").val();
  console.log(selected);
}

var isProcessing = false;
function pushCart() {	
  if(isProcessing){
    console.log("처리 중 입니다...");
    return;
  }
  
  var guestId = null;
  if(localStorage.getItem("guestId") != null){
    guestId = localStorage.getItem("guestId");
  } else {
    guestId = "NoMember" + Date.now() + Math.random().toString(36).substring(2, 9);
    
    localStorage.setItem("guestId", guestId);
  }
  
    var option = '';
    var optionIds = [];
    var price = parseInt(document.getElementById("saled-price").getAttribute('data-price')) || 0;
    var quantity = parseInt($('#quantity').val()) || 1;
    var subTotal = parseInt(document.getElementById("totalPrice").getAttribute('data-price')) || 0;
      
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
        var optionName = selectElement.getAttribute('data-option-name');
        
        // 실제 선택된 옵션 정보 추출
        var optionPrice = parseInt(selectedOption.getAttribute('data-price')) || 0;
        
        // optionInfo에서 해당 옵션 찾기
        for(var j = 0; j < optionInfo.length; j++){
            if(optionInfo[j].OPTION_NAME === optionName && 
                selectElement.value.includes(optionInfo[j].OPTION_VALUE)){
                optionIds.push(optionInfo[j].OPTION_ID);
                break;
            }
        }
        
        option += selectElement.value + ' \n';
        
    }
    
    
    if(hasOption && allSelects.length > 0 || allSelects.length <= 0){
      isProcessing = true; // 플래그 설정 (버튼 광클 금지!)
      
        var param = {
          guestId: guestId,
            productId: productId,
            option: option,
            optionIds: optionIds,
            price: price,
            quantity: quantity,
            subTotal: subTotal
        };
        
        $.ajax({
            url: "/insertCartItem.do",
            type: "post",
            data: param,
            traditional: true,
            dataType: "json",
            success: function(res) {
                var result = res.resultData.result;
                var cartId = res.resultData.cartId;
                
                console.log(cartId);
                
                if (result == 1) {
                    confirm("장바구니에 상품이 담겼습니다. 장바구니로 이동하겠습니까?") ? location.href = "/cartView.do?cartId="+ cartId : null;
                } else if (result == 2) {
                    confirm("이미 장바구니에 담긴 상품입니다. 장바구니로 이동하겠습니까?") ? location.href = "/cartView.do?cartId="+ cartId : null;
                }
            },
            error: function() {
                alert("장바구니 담기 중 오류가 발생했습니다.");
            },
            complete: function() {
                // 완료 후 플래그 해제 및 버튼 복원
                isProcessing = false;
                $('#add-to-cart').prop('disabled', false).text('장바구니 담기');
                $('#buy-now').prop('disabled', false).text('바로구매');
            }
        });
    } else if(!hasOption && allSelects.length > 0) {
        alert("모든 옵션을 선택해주세요.");
    } else {
      return;
    }
}

function pushWish(){
  $.ajax({
      url: "/toggleWishlist.do",
      type: "post",
      data: {productId : productId},
      dataType: "json",
      success: function(res){
          if(res.success) {
              // 메시지가 없을 경우 기본 메시지 사용
              var message = res.message;
              if (!message || message === null || message === 'null') {
                  message = res.isWished ? "위시리스트에 추가되었습니다." : "위시리스트에서 제거되었습니다.";
              }
              
          } else {
              var errorMessage = res.message;
              if (!errorMessage || errorMessage === null || errorMessage === 'null') {
                  errorMessage = "처리 중 오류가 발생했습니다.";
              }
          }
      },
      error: function(err){}
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

function buyNow(){
  if(isProcessing){
    console.log("처리 중 입니다...");
    return;
  }

  var guestId = null;
  if(localStorage.getItem("guestId") != null){
    guestId = localStorage.getItem("guestId");
  } else {
    guestId = "NoMember" + Date.now() + Math.random().toString(36).substring(2, 9);
    
    localStorage.setItem("guestId", guestId);
  }
  
  var tempId = "Temp" + Date.now() + Math.random().toString(36).substring(2, 9);
  var orderNumber = generateUniqueOrderNumber();
  
  var option = '';
    var optionIds = [];
    var price = parseInt(document.getElementById("saled-price").getAttribute('data-price')) || 0;
    var quantity = parseInt($('#quantity').val()) || 1;
    var subTotal = parseInt(document.getElementById("totalPrice").getAttribute('data-price')) || 0;
      
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
        var optionName = selectElement.getAttribute('data-option-name');
        
        // 실제 선택된 옵션 정보 추출
        var optionPrice = parseInt(selectedOption.getAttribute('data-price')) || 0;
        
        // optionInfo에서 해당 옵션 찾기
        for(var j = 0; j < optionInfo.length; j++){
            if(optionInfo[j].OPTION_NAME === optionName && 
                selectElement.value.includes(optionInfo[j].OPTION_VALUE)){
                optionIds.push(optionInfo[j].OPTION_ID);
                break;
            }
        }
        
        option += selectElement.value + ' \n';
        
    }
    
    if(hasOption && allSelects.length > 0 || allSelects.length <= 0){
      isProcessing = true; // 플래그 설정 (버튼 광클 금지!)
      
        var param = {
            tempId: tempId,
            productId: productId,
            option: option,
            optionIds: optionIds,
            price: price,
            quantity: quantity,
            subTotal: subTotal,
        };
        
        
        $.ajax({
            url: "/buyNow.do",
            type: "post",
            data: param,
            traditional: true,
            dataType: "json",
            success: function(res) {
                var cartId = res.cartId;
                
                window.location.href="orderView.do?cartId=" + cartId + "&orderNum=" + orderNumber;
                
                sessionStorage.setItem("tempId", tempId);
                
            },
            error: function() {
                alert("오류 발생");
            },
            complete: function() {
                // 완료 후 플래그 해제 및 버튼 복원
                isProcessing = false;
            }
        });
    } else if(!hasOption && allSelects.length > 0) {
        alert("모든 옵션을 선택해주세요.");
    } else {
      return;
    }
}