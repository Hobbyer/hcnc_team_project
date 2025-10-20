package user.mapper;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("UserMemberMapper")
public interface UserMemberMapper {
	public int selectIdCheckByUser(String id);

	public int selectEmailCheckByUser(String email);

	public int insertSignUpByUser(Map<String, Object> sign);

	public Map<String, Object> selectLoginByUser(Map<String, Object> login);

	public Map<String, Object> selectFindIdByUser(String email);
	
	public Map<String, Object> selectUserInfoByUser(String id);

	public List<Map<String, Object>> selectMypageShippingInfoByUser(String id);

	public int updatePasswordByUser(Map<String, Object> param);

	public int updateMemberByUser(Map<String, Object> param);

	public int updateWithDrawByUser(String id);

	public int updateLastLoginByUser(String id);

	public List<Map<String, Object>> selectPointListByUser(String id);

	public List<Map<String, Object>> selectCouponListByUser(String id);

	public int selectTotalPointByUser(String id);

	public int selectTotalSpendByUser(String id);
}