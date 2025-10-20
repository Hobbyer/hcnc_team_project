package user.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import user.service.UserWishService;

@Controller
public class UserWishController {

	@Autowired
	private UserWishService userWishService;
	
	// 페이지 로드
	@RequestMapping(value="/wishView.do")
	public String wishView() {
		return "wish/wish";
	}

    // 위시리스트 리스트 조회
	@RequestMapping(value="/selectWishlistByUser.do")
	public ModelAndView selectWishlistByUser(@RequestParam HashMap<String, Object> param, HttpSession session) {
	    ModelAndView mav = new ModelAndView("jsonView");
	    
	    System.out.println("위시리스트 조회 파라미터: " + param);
	    
	    @SuppressWarnings("unchecked")
			Map<String, Object> userInfo = (Map<String, Object>) session.getAttribute("userInfo");
	    if(userInfo != null) {
	    	String memberId = (String) userInfo.get("MEMBER_ID");
	    	param.put("memberId", memberId);
	    }
	    
	    try {
	        List<HashMap<String, Object>> wishlist = userWishService.selectWishlistByUser(param);
	        
	        HashMap<String, Object> stats = new HashMap<String, Object>();
	        stats.put("totalCount", wishlist.size());
	        
	        // 안전한 방법으로 통계 계산
	        int totalValue = 0;
	        int discountCount = 0;
	        
	        for(HashMap<String, Object> item : wishlist) {
	            try {
	                Object priceObj = item.get("PRODUCT_PRICE");
	                Object saledPriceObj = item.get("SALED_PRICE");
	                
	                int price = 0;
	                int saledPrice = 0;
	                
	                if (priceObj != null) {
	                    price = ((Number) priceObj).intValue();
	                }
	                
	                if (saledPriceObj != null) {
	                    saledPrice = ((Number) saledPriceObj).intValue();
	                }
	                
	                totalValue += (saledPrice > 0) ? saledPrice : price;
	                
	                if (saledPrice > 0 && saledPrice < price) {
	                    discountCount++;
	                }
	            } catch (Exception itemError) {
	                // 개별 아이템 처리 중 에러가 발생해도 전체를 중단하지 않음
	                System.out.println("아이템 처리 중 에러: " + itemError.getMessage());
	            }
	        }
	        
	        stats.put("totalValue", totalValue);
	        stats.put("discountCount", discountCount);
	        
	        mav.addObject("wishlist", wishlist);
	        mav.addObject("stats", stats);
	        mav.addObject("success", true);
	        
	    } catch (Exception e) {
	        e.printStackTrace();
	        mav.addObject("success", false);
	        mav.addObject("message", "위시리스트 조회 중 오류가 발생했습니다: " + e.getMessage());
	    }
	    
	    return mav;
	}
    
    // 카테고리별 개수 조회
	@RequestMapping(value="/getCategoryCount.do")
	public ModelAndView getCategoryCount(@RequestParam HashMap<String, Object> param, HttpSession session) {
	    ModelAndView mav = new ModelAndView("jsonView");
	    
	    System.out.println("카테고리 개수 조회 파라미터: " + param);
	    
	    @SuppressWarnings("unchecked")
		Map<String, Object> userInfo = (Map<String, Object>) session.getAttribute("userInfo");
	    if(userInfo != null) {
	    	String memberId = (String) userInfo.get("MEMBER_ID");
	    	param.put("memberId", memberId);
	    }
	    
	    try {
	        List<HashMap<String, Object>> categoryList = userWishService.getCategoryCount(param);
	        
	        HashMap<String, Object> categoryCount = new HashMap<String, Object>();
	        
	        for(HashMap<String, Object> category : categoryList) {
	            try {
	                String categoryId = String.valueOf(category.get("category"));
	                Object countObj = category.get("count");
	                
	                int count = 0;
	                if (countObj != null) {
	                    count = ((Number) countObj).intValue();
	                }
	                
	                categoryCount.put(categoryId, count);
	            } catch (Exception itemError) {
	                System.out.println("카테고리 처리 중 에러: " + itemError.getMessage());
	            }
	        }
	        
	        mav.addObject("success", true);
	        mav.addObject("categoryCount", categoryCount);
	        
	    } catch (Exception e) {
	        e.printStackTrace();
	        mav.addObject("success", false);
	        mav.addObject("message", "카테고리 개수 조회 중 오류가 발생했습니다: " + e.getMessage());
	    }
	    
	    return mav;
	}
	
	// 전체 카테고리 목록 조회
	@RequestMapping(value="/selectCategoriesListByUser.do")
	public ModelAndView getCategories() {
		ModelAndView mav = new ModelAndView("jsonView");
		
		try {
			List<HashMap<String, Object>> categories = userWishService.selectCategoriesListByUser();
			mav.addObject("success", true);
			mav.addObject("categories", categories);
		} catch (Exception e) {
			e.printStackTrace();
			mav.addObject("success", false);
			mav.addObject("message", "카테고리 조회 중 오류가 발생했습니다!");
		}
		
		return mav;
	}
    
    // 장바구니 추가
    @RequestMapping(value="/addToCart.do")
    public ModelAndView addToCart(@RequestParam HashMap<String, Object> param) {
        ModelAndView mav = new ModelAndView("jsonView");
        
        System.out.println("장바구니 추가 파라미터: " + param);
        
        try {

            // 필수 파라미터 체크
            if (param.get("productId") == null || param.get("memberId") == null) {
                mav.addObject("success", false);
                mav.addObject("message", "필수 파라미터가 누락되었습니다.");
                return mav;
            }
            
            // quantity가 없으면 기본값 1로 설정
            if (param.get("quantity") == null) {
                param.put("quantity", 1);
            }
            
            // 이미 장바구니에 있는지 먼저 확인
            HashMap<String, Object> existingItem = userWishService.checkCartItem(param);
            
            // 서비스에서 처리 (중복 체크 포함)

            int result = userWishService.addToCart(param);
            
            if(result > 0) {
                mav.addObject("success", true);

                if (existingItem != null) {
                    // 이미 있던 상품의 수량이 증가된 경우
                    mav.addObject("message", "이미 장바구니에 담긴 상품입니다. 수량이 증가되었습니다.");
                    mav.addObject("isExisting", true);
                } else {
                    // 새로 추가된 경우
                    mav.addObject("message", "상품이 장바구니에 추가되었습니다.");
                    mav.addObject("isExisting", false);
                }

            } else {
                mav.addObject("success", false);
                mav.addObject("message", "장바구니 추가에 실패했습니다.");
            }
            
        } catch (Exception e) {
            e.printStackTrace();
            mav.addObject("success", false);
            mav.addObject("message", "장바구니 추가 중 오류가 발생했습니다: " + e.getMessage());
        }
        
        return mav;
    }

}
