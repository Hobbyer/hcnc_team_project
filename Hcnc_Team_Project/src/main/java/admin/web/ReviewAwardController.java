package admin.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.annotation.ParamVariable;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;
import admin.service.ReviewAwardService;

@Controller
public class ReviewAwardController {
    
    @Autowired
    private ReviewAwardService reviewAwardService;
    
    // 리뷰 리스트 조회
    @RequestMapping(value="/selectProductReviewListByAdmin.do")
    public NexacroResult selectProductReviewListByAdmin(
    		@ParamDataSet(name = "ds_search", required = false) Map<String, Object> param) {
    	NexacroResult result = new NexacroResult();
		try {
			System.out.println("받은 param: " + param);
			List<Map<String, Object>> list = reviewAwardService.selectProductReviewListByAdmin(param);
			result.addDataSet("ds_review_list", list);
			System.out.println("조회된 결과 수: " + list.size());
		}catch (Exception e){
			System.out.println("에러 발생!");
	        e.printStackTrace();
	        result.setErrorCode(-1);
	        result.setErrorMsg("리뷰목록 조회 중 오류");
		}
		return result;
    }
    
    @RequestMapping(value="/selectReviewImageByAdmin.do")
    public NexacroResult selectReviewImages(
    		@ParamVariable(name="REVIEW_ID") String reviewId) {
        NexacroResult result = new NexacroResult();
        try {
            List<Map<String, Object>> list = reviewAwardService.selectReviewImageByAdmin(reviewId);
            result.addDataSet("ds_review_image", list);
        } catch (Exception e) {
            result.setErrorCode(-1);
            result.setErrorMsg("리뷰 이미지 조회 중 오류");
        }
        return result;
    }
    
    // 수동 포인트 지급
    @RequestMapping(value="/insertReviewRewardPointsByAdmin.do")
    public NexacroResult insertReviewRewardPointsByAdmin(
            @ParamDataSet(name="ds_addpoint", required=false) List<Map<String, Object>> dsAddpoint) {
        
        NexacroResult result = new NexacroResult();
        int inserted = 0;
        
        try {
            if (dsAddpoint != null) {
                for (Map<String, Object> review : dsAddpoint) {
                    inserted += reviewAwardService.insertReviewRewardPointsByAdmin(review);
                }
            }
            result.setErrorCode(0);
            result.setErrorMsg("포인트 지급 완료");
            result.addVariable("insertedCount", inserted);
        } catch (Exception e) {
            result.setErrorCode(-1);
            result.setErrorMsg(e.getMessage());
        }
        
        return result;
    }
}