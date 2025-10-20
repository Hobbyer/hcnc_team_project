package admin.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("OrderMapper")
public interface OrderMapper {

	// 주문내역 상세조회
	List<Map<String, Object>> selectOrderDetailListByAdmin(Map<String, Object> dsSearch);

	// 결제내역 전체 +검색 조회
	List<Map<String, Object>> selectPaymentListByAdmin(Map<String, Object> dsSearch);

	// 결제 업데이트 처리
	void updatePaymentListByAdmin(Map<String, Object> row);

	// 배송내역 조회
	List<Map<String, Object>> selectShipListByAdmin(Map<String, Object> dsSearch);

	// 배송 업데이트
	void updateShipListByAdmin(Map<String, Object> row);

	// 배송 인서트 
	void insertShipListByAdmin(Map<String, Object> row);

	// 주문 상품 조회 
	List<Map<String, Object>> selectOrderItemByAdmin(Map<String, Object> dsSearch);

	// 배송비 조회
	List<Map<String, Object>> selectPostCarrierByAdmin(Map<String, Object> dsSearch);

	// 택배사 조회쿼리
	List<Map<String, Object>> selectPostCateByAdmin();

	// 택배비 업데이트
	void updatePostPriceListByAdmin(Map<String, Object> row);

	// 주문코멘트를 발송 완료로 바꿀거임
	void updateOrderCommentByAdmin(Map<String, Object> row);

	// 대쉬보드에 나올 신규 주문 건수
	int selectNewOrderCountByAdmin();

	// 결제대기 건수
	int selectPendingPaymentCountByAdmin();

	// 배송대기 건수
	int selectPendingShipCountByAdmin();

	// 리스트 조회
	List<Map<String, Object>> selectDashStatByAdmin(); 
	

}
