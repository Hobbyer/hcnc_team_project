package user.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("UserProductMapper")
public interface UserProductMapper {

	List<HashMap<String, Object>> selectProductByUser(Long productId);

	int insertCartItemByUser(Map<String, Object> param);
	
	List<HashMap<String, Object>> slectOptionInfoByUser(Long productId);

	int insertQnAByUser(Map<String, Object> param);
	
	List<HashMap<String, Object>> selectProductQnAListByUser(Map<String, Object> param);

	HashMap<String, Object> selectQnADetailByUser(Map<String, Object> param);

	int updateProductQnAByUser(Map<String, Object> param);

	int deleteQnAByUser(Map<String, Object> param);

	HashMap<String, Object> selectProductDescriptionByUser(Map<String, Object> param);

	int selectCategoryProductsCount(Map<String, Object> params);

	// 신상 
    List<Map<String, Object>> selectNewProListByUser(Map<String, Object> params);
    List<Map<String, Object>> selectNormalProListByRecent(Map<String, Object> params);//채움용
    
    // 추천 
    List<Map<String, Object>> selectRecommendProListByUser(Map<String, Object> params);
    
    // 인기
    List<Map<String, Object>> selectHotProListByUser(Map<String, Object> params);
    List<Map<String, Object>> selectNormalProListByViewCnt(Map<String, Object> params);//채움용
    
    // 카테고리별
    List<Map<String, Object>> selectCategoryProductsListByUser(Map<String, Object> params);


	int insertCartItemOptionByUser(Map<String, Object> optionId);

	Long selectCartIdByUser(Map<String, Object> param);

	int insertCartsByUser(Map<String, Object> param);


}
