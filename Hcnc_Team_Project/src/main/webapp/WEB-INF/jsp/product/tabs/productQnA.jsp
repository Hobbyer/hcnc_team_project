<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif;
            background-color: #fafafa;
            color: #333;
            line-height: 1.6;
        }

        .qna-section {
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 2px 12px rgba(220, 6, 48, 0.08);
            border: 1px solid rgba(220, 6, 48, 0.1);
            overflow: hidden;
            margin: 20px 0;
        }

        /* 헤더 영역 */
        .qna-header {
            padding: 30px 30px 20px 30px;
            background: linear-gradient(135deg, #ffffff 0%, rgba(220, 6, 48, 0.02) 100%);
            border-bottom: 1px solid rgba(220, 6, 48, 0.1);
        }

        .qna-header h3 {
            color: #DC0630;
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
        }

		.qna-header h3::before {
		    content: '';
		}
		
		.qna-header h3 i {
		    margin-right: 8px;
		    font-size: 18px;
		    color: #DC0630;
		}

        .qna-header p {
            color: #666;
            font-size: 14px;
            margin: 0;
        }

        /* 버튼 영역 */
        .review-btn-area {
            padding: 20px 30px 20px 30px;
            display: flex;
            justify-content: flex-end;
            background: #ffffff;
        }

        .review-btn-area button {
            background: #DC0630;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(220, 6, 48, 0.2);
        }

        .review-btn-area button:hover {
            background: #b8052a;
            box-shadow: 0 4px 16px rgba(220, 6, 48, 0.3);
        }

        .review-btn-area button:active {
            transform: translateY(0);
        }

        /* 테이블 */
        .qnaTable {
            width: 100%;
            border-collapse: collapse;
            background: #ffffff;
            margin: 0;
        }

        .qnaTable thead {
            background: linear-gradient(135deg, #DC0630 0%, #b8052a 100%);
            display: table-header-group;
        }

        .qnaTable thead th {
	        color: white !important;
		    font-weight: 600;
		    padding: 18px 20px;
		    text-align: center;
		    font-size: 14px;
		    letter-spacing: 0.3px;
		    border: none;
		    display: table-cell;
		    visibility: visible;
        }
        
        .qnaTable thead tr {
	    	display: table-row;
		}

        .qnaTable tbody td {
            padding: 20px;
            border-bottom: 1px solid rgba(220, 6, 48, 0.08);
            vertical-align: middle;
            font-size: 14px;
            background: #ffffff;
            transition: background-color 0.2s ease;
        }

        .qnaTable tbody tr:hover {
            background: rgba(220, 6, 48, 0.02);
        }

        .qnaTable tbody td:first-child {
            text-align: center;
            font-weight: 600;
            color: #DC0630;
            width: 10%;
        }

        .qnaTable tbody td:nth-child(2) {
            font-weight: 500;
            color: #333;
            cursor: pointer;
            width: 60%;
        }

        .qnaTable tbody td:nth-child(2):hover {
            color: #DC0630;
        }

        .qnaTable tbody td:nth-child(3) {
            text-align: center;
            color: #666;
            width: 15%;
        }

        .qnaTable tbody td:nth-child(4) {
            text-align: center;
            color: #999;
            font-size: 13px;
            width: 15%;
        }

        .qnaTable tbody tr:last-child td {
            border-bottom: none;
        }

        /* 빈 상태 메시지 */
        .empty-message {
            text-align: center;
            color: #999;
            padding: 40px 20px !important;
        }

        /* 모달 스타일 */
        .qna-modal {
		    position: fixed;
		    top: 0;
		    left: 0;
		    width: 100%;
		    height: 100%;
		    background: rgba(0, 0, 0, 0.5); /* backdrop-filter 제거 */
		    z-index: 1000;
		    display: none;
		    /* backdrop-filter: blur(4px); 제거 - 성능 저하 원인 */
		}

        .qna-modal-content {
		    position: absolute;
		    top: 50%;
		    left: 50%;
		    transform: translate(-50%, -50%);
		    background: #ffffff;
		    width: 90%;
		    max-width: 600px;
		    border-radius: 16px;
		    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
		    overflow: hidden;
		    /* animation 제거 또는 간소화 */
		    will-change: transform; /* GPU 가속 */
		}

		@keyframes modalSlideIn {
		    from {
		        opacity: 0;
		        transform: translate(-50%, -48%);
		    }
		    to {
		        opacity: 1;
		        transform: translate(-50%, -50%);
		    }
		}
		
		/* 모달이 표시될 때만 애니메이션 적용 */
		.qna-modal.show .qna-modal-content {
		    animation: modalSlideIn 0.2s ease-out;
		}

        .qna-close {
            position: absolute;
            top: 20px;
            right: 25px;
            font-size: 24px;
            color: #999;
            cursor: pointer;
            z-index: 1001;
            transition: color 0.3s ease;
        }

        .qna-close:hover {
            color: #DC0630;
        }

		/* 작성자 텍스트 스타일 */
		.author-text {
		    padding: 14px 16px;
		    background: #f8f9fa;
		    border: 2px solid #e9ecef;
		    border-radius: 8px;
		    color: #495057;
		    font-size: 14px;
		    font-weight: 500;
		}

        .qna-modal-content h2 {
            color: #DC0630;
		    margin: 0;
		    padding: 10px;
		    font-size: 25px;
		    font-weight: 600;
		    text-align: center;
		    letter-spacing: 0.5px;
		    position: relative;
        }
        
        .qna-modal-content h2::after {
		    content: '';
		    position: absolute;
		    bottom: 0;
		    left: 50%;
		    transform: translateX(-50%);
		    width: 60px;
		    height: 3px;
		    background: rgba(255, 255, 255, 0.3);
		    border-radius: 2px;
		}

        .modal-body {
            padding: 30px;
        }

        /* 폼 스타일 */
        .form-group {
            margin-bottom: 24px;
        }

        .form-group label {
            display: block;
            color: #DC0630;
            font-weight: 500;
            margin-bottom: 8px;
            font-size: 14px;
        }

        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 14px 16px;
            border: 2px solid #f1f1f1;
            border-radius: 8px;
            font-size: 14px;
            transition: all 0.3s ease;
            background: #ffffff;
            color: #333;
        }

        .form-group input:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #DC0630;
            box-shadow: 0 0 0 3px rgba(220, 6, 48, 0.1);
        }

        .form-group textarea {
            min-height: 120px;
            max-height: 300px;
            resize: vertical;
        }

        .detail-text,
        .detail-content {
            background: #f8f9fa !important;
            border: 2px solid #e9ecef !important;
            color: #495057 !important;
            cursor: not-allowed;
        }

        /* 답변 내용 */
        .answer-content {
            background: linear-gradient(135deg, rgba(220, 6, 48, 0.05) 0%, rgba(220, 6, 48, 0.02) 100%);
            border-left: 4px solid #DC0630;
            padding: 16px;
            border-radius: 8px;
            margin-top: 8px;
            font-size: 14px;
            line-height: 1.6;
        }

        /* 버튼 스타일 */
        .form-button {
            display: flex;
            justify-content: flex-end;
            gap: 12px;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #f1f1f1;
        }

        .form-button button {
            padding: 12px 20px;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .form-button button[type="submit"],
        #qnaUpdateBtn {
            background: #DC0630;
            color: white;
        }

        .form-button button[type="submit"]:hover,
        #qnaUpdateBtn:hover {
            background: #b8052a;
            transform: translateY(-2px);
        }

        #qnaEditBtn {
            background: #28a745;
            color: white;
        }

        #qnaEditBtn:hover {
            background: #218838;
        }

        #qnaDeleteBtn {
            background: #dc3545;
            color: white;
        }

        #qnaDeleteBtn:hover {
            background: #c82333;
        }

        #qnaCancelBtn,
        .btn-cancel {
            background: #6c757d;
            color: white;
        }

        #qnaCancelBtn:hover,
        .btn-cancel:hover {
            background: #545b62;
        }

        /* 반응형 디자인 */
        @media (max-width: 768px) {
            .qna-header,
            .review-btn-area,
            .modal-body {
                padding-left: 20px;
                padding-right: 20px;
            }

            .qnaTable thead th,
            .qnaTable tbody td {
                padding: 12px 8px;
                font-size: 13px;
            }

            .qnaTable tbody td:nth-child(2) {
                width: 50%;
            }

            .qnaTable tbody td:nth-child(3),
            .qnaTable tbody td:nth-child(4) {
                width: 20%;
            }

            .qna-modal-content {
                width: 95%;
                margin: 20px;
            }

            .form-button {
                flex-direction: column;
                gap: 8px;
            }

            .form-button button {
                width: 100%;
            }
        }

        /* 로딩 상태 */
        .loading {
            text-align: center;
            padding: 40px;
            color: #DC0630;
        }

        .loading::after {
            content: '';
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 2px solid #DC0630;
            border-radius: 50%;
            border-top-color: transparent;
            animation: spin 1s ease-in-out infinite;
            margin-left: 10px;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    </style>
<!-- QnA 리스트 -->
<div class="qna-section">
	<div class="qna-header">
	    <h3><i class="bi bi-chat-dots"></i>상품 Q&A</h3>
	    <p> 상품에 대한 궁금한 점을 문의해 주세요. 빠른 시간 내에 답변드리겠습니다.</p>
	</div>
	<div class="review-btn-area" id="qnaButtonArea" style="display: flex; justify-content: right;">
		<button type="button" onclick="QnaTab.formModalShow()">상품 문의하기</button>
	</div>
	<table class="qnaTable">
		<thead>
			<tr>
				<th scope="col" width="10%" style="color: white !important; background: transparent !important;">NO</th>
				<th scope="col" width="60%" style="color: white !important; background: transparent !important;">TITLE</th>
				<th scope="col" width="15%" style="color: white !important; background: transparent !important;">WRITER</th>
				<th scope="col" width="15%" style="color: white !important; background: transparent !important;">DATE</th>
			</tr>
		</thead>
		<tbody id="productQnAList">
			
		</tbody>
	</table>
</div>

<!-- QnA 모달들 -->
<!-- 문의 작성 모달 -->
<div id="qnaModal" class="qna-modal" style="display: none;">
  <div class="qna-modal-content">
    <span class="qna-close">&times;</span>
    <h2>상품 문의하기</h2>
    <div class="modal-body">
	    <form id="qnaForm" action="/insertQnA.do" method="post">
	      <div class="form-group">
	        <input type="text" id="qnaProduct" name="productId" placeholder="상품" required hidden>
	      </div>
	      <div class="form-group">
	        <input type="text" id="qnaTitle" name="qnaTitle" placeholder="제목" required maxlength="150">
	      </div>
	      <div class="form-group">
	        <textarea id="qnaContent" name="qnaContent" placeholder="내용" required style="max-height: 300px; min-height: 300px" maxlength="9999"></textarea>
	      </div>
	      <div class="form-button">
	      	<button type="submit" id="qnaSubmitBtn">문의하기</button>
	      </div>
	    </form>
    </div>
  </div>
</div>

<!-- 문의 상세/수정 모달 -->
<div id="qnaDetailModal" class="qna-modal" style="display: none;">
  <div class="qna-modal-content">
    <span class="qna-close">&times;</span>
    <h2>상품 문의 상세</h2>
    <div class="qna-detail-content">
      <div class="form-group">
        <label>제목</label>
        <input id="qnaDetailTitle" class="detail-text" readonly>
        <input id="qnaTitleInput" style="display: none" maxlength="150">
      </div>
      <div class="form-group">
        <label>작성자</label>
        <div id="qnaDetailWriter" class="author-text"></div>
      </div>
      <div class="form-group">
        <label>내용</label>
        <textarea id="qnaDetailContent" class="detail-content" readonly style="max-height: 300px; min-height: 300px;"></textarea>
        <textarea id="qnaContentInput" class="editable-content" style="display: none;" maxlength="9999"></textarea>
      </div>
      <div class="form-group" id="qnaAnswerDiv">
      
      </div>
      <div class="form-button" id="qnaDetailButtons">
        <button type="button" id="qnaEditBtn" style="display: none;">수정</button>
        <button type="button" id="qnaUpdateBtn" style="display: none;">수정완료</button>
        <button type="button" id="qnaDeleteBtn" style="display: none;">삭제</button>
        <button type="button" id="qnaCancelBtn" style="display: none;">취소</button>
        <button type="button" class="btn-cancel" id="qnaDetailCloseBtn">닫기</button>
      </div>
    </div>
  </div>
</div>

<c:if test="${empty userInfo}">
    <script>
        $("#qnaButtonArea").hide();
    </script>
</c:if>

<script>
	var currentQnaId = null;

	$(document).ready(function() {
		// 제목 글자 수 도달 시 경고
		$('#qnaTitle').on('input', function() {
			var currentLength = $(this).val().length;
			
			if(currentLength >= 150) {
				alert('제목은 최대 150자까지 입력 가능합니다.');
			}
		});
		
		$('#qnaTitleInput').on('input', function() {
			var currentLength = $(this).val().length;
			
			if(currentLength >= 150) {
				alert('제목은 최대 150자까지 입력 가능합니다.');
			}
		});
		
		// 내용 글자 수 제한 경고
		$('#qnaContent').on('input', function() {
			var currentLength = $(this).val().length;
			
			if(currentLength >= 9999) {
				alert('입력 가능한 글자 수를 초과하여 작성하였습니다.');
			}
		});
		
		$('#qnaContentInput').on('input', function() {
			var currentLength = $(this).val().length;
			
			if(currentLength >= 9999) {
				alert('입력 가능한 글자 수를 초과하여 작성하였습니다.');
			}
		});
		
		// 수정 버튼
		$('#qnaEditBtn').on('click', function() {
			updateTagChange("updateActive");
		});
		
		// 수정완료 버튼
		$('#qnaUpdateBtn').on('click', function() {
			if(currentQnaId) {
				updateProductQnA(currentQnaId);
			}
		});
		
		// 취소 버튼
		$('#qnaCancelBtn').on('click', function() {
			updateTagChange("updateCancel");
		});
		
		// 삭제 버튼
		$('#qnaDeleteBtn').on('click', function() {
			if(currentQnaId) {
				deleteQnA(currentQnaId);
			}
		});
		
		// 모달 닫기 이벤트
		$('.qna-close, .btn-cancel').on('click', function(){
			$('#qnaModal').hide();
			$('#qnaDetailModal').hide();
			updateTagChange("");
		});
	});

	const QnaTab = {
			// 문의 작성 모달 열기			
			formModalShow: function(){
				$('#qnaModal').show();
			},
			
			// 상세 모달 열기 (수정/삭제용)
			qnaDetail: function(qnaId){
				currentQnaId = qnaId; // 현재 QnA ID 저장
				
				// AJAX로 QnA 상세 정보 가져오기
				$.ajax({
					url: '/selectQnADetail.do',
					type: 'post',
					data: { qnaId: qnaId },
					dataType: "json",
					success: function(res) {
						var qna = res.qnaDetail;
						var memberTF = res.sameMember;
						
						// 모달에 데이터 채우기
						$('#qnaDetailTitle').val(qna.QNA_TITLE);
						$('#qnaDetailWriter').text(qna.MEMBER_ID);
						$('#qnaDetailContent').val(qna.QNA_CONTENT);
						$('#qnaTitleInput').val(qna.QNA_TITLE);
						$('#qnaContentInput').val(qna.QNA_CONTENT);
						
						// 답변 내용 처리
						if(qna.ANSWER_CONTENT != null){
							var qnaAnswerHtml = 
								'<label>답변 내용 :</label>' +
								'<div id="qnaAnswerContent" class="answer-content">' + qna.ANSWER_CONTENT + '</div>';
							$("#qnaAnswerDiv").html(qnaAnswerHtml);
						} else {
							$("#qnaAnswerDiv").empty();
						}
						
						// 권한에 따른 버튼 표시 (이벤트 재바인딩 제거)
						if(memberTF) {
							$('#qnaEditBtn').show();
							$('#qnaDeleteBtn').show();
						} else {
							$('#qnaEditBtn').hide();
							$('#qnaDeleteBtn').hide();
						}
						
						// 모달 표시 (약간의 지연으로 부드럽게)
						requestAnimationFrame(function() {
							$('#qnaDetailModal').show();
						});
					},
					error: function() {
						alert('QnA 상세 정보를 불러오는데 실패했습니다.');
					}
				});
			}
		}
	
	function updateProductQnA(qnaId) {
		var title = $("#qnaTitleInput").val().trim();
		var content = $("#qnaContentInput").val().trim();
		
		if(!title || !content) {
			alert("제목과 내용을 입력해주세요.");
			return;
		}
		
		var param = {
			qnaId: qnaId,
			title: title,
			content: content
		};
		
		$.ajax({
			url: "/updateProductQnA.do",
			type: "post",
			data: param,
			dataType: "json",
			success: function(){
				alert("수정완료되었습니다.");
				
				$('#qnaDetailTitle').val(title);
				$('#qnaDetailContent').val(content);
				
				updateTagChange("updateComplete");
				
				// 목록 새로고침
				loadQnAList();
			},
			error: function(){
				alert("QnA수정중 오류가 발생했습니다.");
			}
		});
	}
	
	
	function deleteQnA(qnaId){
		if(confirm("상품 문의 내역을 삭제하시겠습니까?")){
			$.ajax({
				url: "/deleteProductQnA.do",
				type: "post",
				data: { qnaId: qnaId, productId: productId },
				dataType: "json",
				success: function(){
					alert("상품문의 삭제처리 되었습니다.");
					$('#qnaDetailModal').hide();
					loadQnAList(); // reload 대신 목록만 갱신
				},
				error: function(){
					alert("삭제 중 오류가 발생했습니다.");
				}
			});
		} 
	}
    
    // 태그 동적 변경
    function updateTagChange(type) {
		if(type === "updateActive"){
			$("#qnaDetailTitle").hide();
			$("#qnaTitleInput").show();
			$('#qnaDetailContent').hide();
			$('#qnaContentInput').show();
			$('#qnaEditBtn').hide();
			$('#qnaUpdateBtn').show();
			$('#qnaDeleteBtn').hide();
			$('#qnaCancelBtn').show();
		} else {
			$("#qnaDetailTitle").show();
			$("#qnaTitleInput").hide();
			$('#qnaDetailContent').show();
			$('#qnaContentInput').hide();
			$('#qnaEditBtn').show();
			$('#qnaUpdateBtn').hide();
			$('#qnaDeleteBtn').show();
			$('#qnaCancelBtn').hide();
		}
    }
</script>

<!-- 상품 QnA 등록시 처리하기 위함 -->
<c:if test="${not empty message}">
	<script>
		if("${messageType}" === "insertSuccess"){
			alert("${message}");
		} else {
			alert("오류: ${message}");
		}
	</script>
</c:if>

<!-- 상품 QnA -->	
<script>

	var urlParams = new URLSearchParams(window.location.search);
	
	var productId = urlParams.get('productId');
	
	$(function(){
		$("#qnaProduct").val(productId);
	});

	// QnA 문의하기 버튼 광클 금지
	var isSubmitting = false;
	
	$('#qnaForm').submit(function(e){
		if (isSubmitting) {
			e.preventDefault();
			return false;
		}
		
		isSubmitting = true;
		$('#qnaSubmitBtn').prop('disabled', true).text('상품 문의 등록중...');
		
		return true;
	});
	
	function loadQnAList(){
		return $.ajax({
			url: "/selectProductQnAList.do"
			, type: "post"
			, data: { productId : productId }
			, dataType: "json"
			, success: function(res){
				var qnaList = res.qnaList;
				updateQnAList(qnaList);
				updateQnAListCnt(qnaList.length);
			}
	        , error: function(xhr, status, error) {
	            console.log('QnA 리스트 로드 실패:', error);
	        }
		});
	}
	
    // updateQnAList함수 - ㄻ가 건듦 250925 11:31
    function updateQnAList(qnaList){
        var list = '';
        if(qnaList.length === 0){
            list = '<tr><td colspan="4" class="empty-message">해당 상품의 문의 내역이 없습니다.</td></tr>';
        } else {
            for(var i = 0; i < qnaList.length; i++){
            	// 제목을 30자로 제한
                var title = qnaList[i].QNA_TITLE;
                var displayTitle = title.length > 30 ? title.substring(0, 30) + '...' : title;
            	
                list += 
                    '<tr>' +
                        '<td>' + (i + 1) + '</td>' +
                        '<td onclick="QnaTab.qnaDetail('+ qnaList[i].PRODUCT_QNA_ID +')" style="cursor: pointer;">' + displayTitle + '</td>' +
                        '<td>' + qnaList[i].MEMBER_ID + '</td>' +
                        '<td>' + qnaList[i].INPUT_DT + '</td>' +
                    '</tr>';
            }
        }    
        $("#productQnAList").html(list);
    }
	
	function updateQnAListCnt(qnaListCnt){
		$("#productQnACnt").text('(' + qnaListCnt + ')');
	}
	
</script>