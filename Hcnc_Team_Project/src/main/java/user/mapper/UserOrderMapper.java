package user.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("UserOrderMapper")
public interface UserOrderMapper {

	List<HashMap<String, Object>> selectOrderRequestItemListByUser(Long cartId);

	HashMap<String, Object> selectItemCntByUser(Long cartId);

	HashMap<String, Object> selectOrderMemberBasicInfoByUser(Map<String, Object> param);

	Integer selectMemberPointByUser(Map<String, Object> param);

	List<HashMap<String, Object>> selectMemberCouponListByUser(Map<String, Object> param);

	List<HashMap<String, Object>> selectMemberAddressListByUser(Map<String, Object> param);

	int orderDataSaveByUser(Map<String, Object> order);

	Long getOrderIdByUser(Map<String, Object> order);

	int insertOrderItemsByUser(Map<String, Object> item);

	int insertPointByUser(Map<String, Object> order);

	int updateCouponByUser(Map<String, Object> order);

	List<Map<String, Object>> selectOrderItemOptionListByUser(Map<String, Object> item);

	int updateQuantityByUser(Map<String, Object> option);

	int deleteCartItemByUser(Map<String, Object> item);

	HashMap<String, Object> selectSuccessOrderByUser(String orderNumber);

	int deleteCartByUser(Map<String, Object> order);

	List<HashMap<String, Object>> selectOrderHistoryByUser(String memberId);

	List<HashMap<String, Object>> orderItemCountByUser(String memberId);

	List<HashMap<String, Object>> selectOrderDetailByUser(HashMap<String, Object> param);

    HashMap<String, Object> selectDeliveryTrackingByUser(HashMap<String, Object> param);

    int updateMemberPriceAmount(Map<String, Object> order);

}
