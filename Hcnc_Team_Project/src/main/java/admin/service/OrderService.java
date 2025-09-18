package admin.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import admin.mapper.OrderMapper;

@Service
public class OrderService {
	
	@Autowired
	private OrderMapper orderMapper;
	
	// 주문 상세조회
	public List<Map<String, Object>> selectOrderDetailListByAdmin(Map<String, Object> dsSearch) {
		return orderMapper.selectOrderDetailListByAdmin(dsSearch);
	}

	// 결제내역 조회
	public List<Map<String, Object>> selectPaymentListByAdmin(Map<String, Object> dsSearch) {
		return orderMapper.selectPaymentListByAdmin(dsSearch);
	}

	// 결제 상태 업데이트
	public void updatePaymentListByAdmin(Map<String, Object> row) {
		orderMapper.updatePaymentListByAdmin(row);
	}

	// 배송리스트 조회
	public List<Map<String, Object>> selectShipListByAdmin(Map<String, Object> dsSearch) {
		return orderMapper.selectShipListByAdmin(dsSearch);
	}

	// 배송 상태 업데이트
	public void updateShipListByAdmin(Map<String, Object> row) {
		orderMapper.updateShipListByAdmin(row);
	}

	// 배송 새로운 데이터 생성
	public void insertShipListByAdmin(Map<String, Object> row) {
		orderMapper.insertShipListByAdmin(row);
	}

	public List<Map<String, Object>> selectOrderItemByAdmin(Map<String, Object> dsSearch) {
		return orderMapper.selectOrderItemByAdmin(dsSearch);
	}
	

	
}
