package admin.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import admin.mapper.ReviewAwardMapper;

@Service
public class ReviewAwardService {
    
    @Autowired
    private ReviewAwardMapper reviewAwardMapper;
    
    // 관리자 리뷰 리스트 조회
    public List<Map<String, Object>> selectProductReviewListByAdmin(Map<String, Object> param) {
    	if(param.get("POINT_ISSUED") != null) {
	        param.put("POINT_ISSUED", String.valueOf(param.get("POINT_ISSUED")));
	    }
	    
	    if(param.get("SEARCH_COMBO") != null) {
	        param.put("SEARCH_COMBO", String.valueOf(param.get("SEARCH_COMBO")));
	    }
	    
	    if(param.get("SEARCH_DATA") != null) {
	        param.put("SEARCH_DATA", String.valueOf(param.get("SEARCH_DATA")));
	    }
	    
        return reviewAwardMapper.selectProductReviewListByAdmin(param);
    }
    
	public List<Map<String, Object>> selectReviewImageByAdmin(String reviewId) {
		// TODO Auto-generated method stub
		return reviewAwardMapper.selectReviewImageByAdmin(reviewId);
	}  
    
    // 수동 포인트 지급
    @Transactional 
    public int insertReviewRewardPointsByAdmin(Map<String, Object> review) {
        System.out.println("수동 포인트 지급 시작: " + review);
        int result = reviewAwardMapper.insertReviewRewardPointsByAdmin(review);
        System.out.println("수동 포인트 지급 결과: " + result);
        return result;
    }


}