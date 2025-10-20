package admin.mapper;

import java.util.List;
import java.util.Map;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("reviewAwardMapper")
public interface ReviewAwardMapper {
    
    List<Map<String, Object>> selectProductReviewListByAdmin(Map<String, Object> param);
    
	List<Map<String, Object>> selectReviewImageByAdmin(String reviewId); //디테일은 list에서 바로불러가고 이미지추가불러오기
    
    int insertReviewRewardPointsByAdmin(Map<String, Object> param);


}