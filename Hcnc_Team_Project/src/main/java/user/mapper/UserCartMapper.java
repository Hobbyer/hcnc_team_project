package user.mapper;

import java.util.HashMap;
import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("UserCartMapper")
public interface UserCartMapper {
	public List<HashMap<String, Object>> selectCartListByUser(HashMap<String, Object> param);

	public int updateQuantity(HashMap<String, Object> param);

	public int deleteProduct(HashMap<String, Object> param);

	public int updateChkBox(HashMap<String, Object> param);

	public HashMap<String, Object> selectedTotalPriceByUser(HashMap<String, Object> param);
}
