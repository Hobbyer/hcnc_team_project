package user.web;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import user.service.UserBannerService;
import user.service.UserProductService;
import user.service.UserService;

@Controller
public class UserController {
	
	@Autowired
	private UserService userService; 
	@Autowired
	private UserBannerService userBannerService; 
	@Autowired
	private UserProductService userProductService; 
	
	@RequestMapping("/main.do")
	public ModelAndView userMain() { 
	    ModelAndView mv = new ModelAndView();
	    
	    //배너
	    List<Map<String,Object>> bannerList = userBannerService.selectBannerListByUser();
	    
	    // 배너 타입별로 분리
	    List<Map<String,Object>> mainBanners = new ArrayList<>();
	    List<Map<String,Object>> topBanners = new ArrayList<>();
	    List<Map<String,Object>> popupBanners = new ArrayList<>();
	    
	    //상품
	    List<Map<String, Object>> newProducts = userService.selectMainNewProducts(null, null);
	    List<Map<String, Object>> recommendProducts = userService.selectMainRecommendProducts(null, null);
	    List<Map<String, Object>> hotProducts = userService.selectMainHotProducts(null, null);
	    
	    for(Map<String,Object> banner : bannerList) {
	        String type = (String) banner.get("BANNER_TYPE");
	        switch(type) {
	            case "main": mainBanners.add(banner); 
	            break;
	            case "top": topBanners.add(banner);
	            break;
	            case "popup": popupBanners.add(banner); 
	            break;
	        }
	    }
	        
	    mv.addObject("mainBanners", mainBanners);
	    mv.addObject("topBanners", topBanners);
	    mv.addObject("popupBanners", popupBanners);
	    
	    mv.addObject("newProducts", newProducts);
	    mv.addObject("recommendProducts", recommendProducts);
	    mv.addObject("hotProducts", hotProducts);
	    
	    mv.setViewName("main/main");
	    return mv;
	}
	
	@RequestMapping("/testPay.do")
	public ModelAndView userTestPay() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("payment/pay-test");
		return mv;
	}
	
	@RequestMapping("/success.do")
	public ModelAndView userPayCheckout() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("payment/success");
		return mv;
	}
	
	@RequestMapping("/search.do")
	public ModelAndView selectProductListSearchByUser(@RequestParam(value="keyword",required=false) String keyword) {
		ModelAndView mv = new ModelAndView();
		try {
			if(keyword != null && keyword != "") {
				String decodeResult = URLDecoder.decode(keyword,"UTF-8");
				
				List<Map<String,Object>> list = userService.selectProductListSearchByUser(decodeResult);
				mv.addObject("status",200);
				mv.addObject("productList",list);
				mv.addObject("totalCount",list.size());
			} else {
				mv.addObject("status",404);	
			}	
		} catch (Exception e) {
			// TODO: handle exception
			mv.addObject("status",400);
		}
		
		mv.setViewName("search/search");
		return mv;
	}
}