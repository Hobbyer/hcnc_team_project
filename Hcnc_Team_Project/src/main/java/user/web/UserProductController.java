package user.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.jna.platform.win32.Netapi32Util.UserInfo;

import user.service.UserCategoryService;
import user.service.UserProductService;

@Controller
public class UserProductController {
	
	@Autowired
	private UserProductService userProductService;
	
	@Autowired
	private UserCategoryService userCategoryService;

	@RequestMapping(value="/productDetailView.do")
	public ModelAndView productDetailView(@RequestParam("productId") Long productId) throws JsonProcessingException {
		
		ModelAndView mav = new ModelAndView();
		
		List<HashMap<String, Object>> productDetail = userProductService.selectProductByUser(productId);
		
		List<HashMap<String, Object>> productOptionInfo = userProductService.slectOptionInfoByUser(productId);
		
		mav.addObject("productDetail", productDetail);
		mav.addObject("optionInfo", productOptionInfo);
		
		// JavaScript에서 사용할 수 있도록 JSON 형태로도 전달
	    ObjectMapper mapper = new ObjectMapper();
	    mav.addObject("productDetailJson", mapper.writeValueAsString(productDetail));
	    mav.addObject("optionInfoJson", mapper.writeValueAsString(productOptionInfo));
	    
		mav.setViewName("product/detail");
		
		return mav;
	}
	///////////////////////////////////////////////////////////////
	
	@RequestMapping(value="/insertCartItem.do")
	public ModelAndView insertCartItemByUser(HttpServletRequest request, HttpSession session) {
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		// optionIds 배열 따로 받기
		String[] optionIdsStr = request.getParameterValues("optionIds");
		List<Long> optionIds = new ArrayList<Long>();
		if (optionIdsStr != null) {
			for (String id : optionIdsStr) {
				optionIds.add(Long.parseLong(id));
			}
		}
		
		// 나머지 파라미터 데이터 Map으로 처리
		Map<String, Object> param = new HashMap<>();
		
		@SuppressWarnings("unchecked")
		Map<String, Object> userInfo = (Map<String, Object>) session.getAttribute("userInfo");
		if(userInfo != null) {
			String memberId = (String) userInfo.get("MEMBER_ID");
			param.put("memberId", memberId);
		} else {
			param.put("memberId", request.getParameter("guestId"));
		}
		
	    param.put("productId", request.getParameter("productId"));
	    param.put("option", request.getParameter("option"));
	    param.put("price", request.getParameter("price"));
	    param.put("quantity", request.getParameter("quantity"));
	    param.put("subTotal", request.getParameter("subTotal"));
		
		
	    System.out.println("옵션 IDs: " + optionIds);
	    System.out.println("파라미터: " + param);
	    
	    HashMap<String, Object> resultData = userProductService.insertCartItemByUser(param, optionIds);
	    
	    mav.addObject("resultData", resultData);
	    
		return mav;
	}
	
	@RequestMapping(value="/buyNow.do")
	public ModelAndView buyNow(HttpServletRequest request, HttpSession session) {
			ModelAndView mav = new ModelAndView("jsonView");
			
			// optionIds 배열 따로 받기
			String[] optionIdsStr = request.getParameterValues("optionIds");
			List<Long> optionIds = new ArrayList<Long>();
			if (optionIdsStr != null) {
				for (String id : optionIdsStr) {
					optionIds.add(Long.parseLong(id));
				}
			}
			
			// 나머지 파라미터 데이터 Map으로 처리
			Map<String, Object> param = new HashMap<>();
			
			@SuppressWarnings("unchecked")
			Map<String, Object> userInfo = (Map<String, Object>) session.getAttribute("userInfo");
			if(userInfo != null) {
				String memberId = (String) userInfo.get("MEMBER_ID");
				param.put("memberId", memberId);
			} else {
				param.put("memberId", request.getParameter("guestId"));
			}

			param.put("tempId", request.getParameter("tempId"));
	    param.put("productId", request.getParameter("productId"));
	    param.put("option", request.getParameter("option"));
	    param.put("price", request.getParameter("price"));
	    param.put("quantity", request.getParameter("quantity"));
	    param.put("subTotal", request.getParameter("subTotal"));
		
	    
	    HashMap<String, Object> resultData = userProductService.insertCartItemByUser(param, optionIds);
	    
	    Long cartId = (Long) resultData.get("cartId");
	    
	    mav.addObject("cartId", cartId);
		
		return mav;
	}
	
	@RequestMapping(value="/selectProductQnAList.do")
	public ModelAndView selectProductQnAListByUser(@RequestParam Map<String, Object> param) {
		ModelAndView mav = new ModelAndView("jsonView");
		
		List<HashMap<String, Object>> qnaList = userProductService.selectProductQnAListByUser(param);
		
		mav.addObject("qnaList", qnaList);
		
		return mav;
	}
	
	@RequestMapping(value="/insertQnA.do")
	public ModelAndView insertQnAByUser(@RequestParam Map<String, Object> param, RedirectAttributes redirectAttributes, HttpSession session) {
		ModelAndView mav = new ModelAndView();

		@SuppressWarnings("unchecked")
		Map<String, Object> userInfo = (Map<String, Object>) session.getAttribute("userInfo");
	    if(userInfo != null) {
	    	String memberId = (String) userInfo.get("MEMBER_ID");
	    	param.put("memberId", memberId);
	    }
		
		String productId = (String) param.get("productId");
		
		int insertQnA = userProductService.insertQnAByUser(param);
		
		redirectAttributes.addFlashAttribute("message", "등록이 완료되었습니다.");
		redirectAttributes.addFlashAttribute("messageType", "insertSuccess");
		
		mav.setViewName("redirect:/productDetailView.do?productId=" + productId);
		
		return mav;
	}
	
	@RequestMapping(value="/selectQnADetail.do")
	public ModelAndView selectQnADetailByUser(@RequestParam Map<String, Object> param, HttpSession session) {
		ModelAndView mav = new ModelAndView("jsonView");
		
		String memberId = "";
		@SuppressWarnings("unchecked")
		Map<String, Object> userInfo = (Map<String, Object>) session.getAttribute("userInfo");
		if(userInfo != null) {
			memberId = (String) userInfo.get("MEMBER_ID");
		}
		
		System.out.println(param);
		
		HashMap<String, Object> qnaDetail = userProductService.selectQnADetailByUser(param);
		String qnaWriter = (String) qnaDetail.get("MEMBER_ID");
		
		if(memberId.equals(qnaWriter)) {
			mav.addObject("sameMember", true);
		} else {
			mav.addObject("sameMember", false);
		}
		
		mav.addObject("qnaDetail", qnaDetail);
		
		return mav;
	}
	
	@RequestMapping(value="/updateProductQnA.do")
	public ModelAndView updateProductQnAByUser(@RequestParam Map<String, Object> param) {
		ModelAndView mav = new ModelAndView("jsonView");
		
		System.out.println(param);
		
		userProductService.updateProductQnAByUser(param);
		
		return mav;
	}
	
	@RequestMapping(value="/deleteProductQnA.do")
	public ModelAndView deleteQnAByUser(@RequestParam Map<String, Object> param) {
		ModelAndView mav = new ModelAndView("jsonView");
		
		System.out.println(param);
		
		userProductService.deleteQnAByUser(param);
				
		return mav;
		
	}
	
	@RequestMapping(value="/selectProductDescription.do")
	public ModelAndView selectProductDescriptionByUser(@RequestParam Map<String, Object> param) {
		ModelAndView mav = new ModelAndView("jsonView");
		
		System.out.println("description 조회 : " + param);
		
		HashMap<String, Object> description = userProductService.selectProductDescriptionByUser(param);
		if(description != null) {
			mav.addObject("description", description);
		} else {
			mav.addObject("description", "데이터 없습니다.");
		}
		return mav;
	}
	
	// hot, new, recommend 공통 메서드
	private ModelAndView productListCommon(
	        List<Map<String, Object>> products,
	        int page,
	        int pageSize,
	        String sortType,
	        String mainCateId,
	        String subCateId,
	        String viewName) {
	    
	    ModelAndView mav = new ModelAndView();
	    
	    // totalCount는 products.size()로 계산
	    int totalCount = products.size();
	    
	    // 페이지네이션 계산
	    int totalPages = (int) Math.ceil((double) totalCount / pageSize);
	    int pageGroupSize = 5;
	    int startPage = ((page - 1) / pageGroupSize) * pageGroupSize + 1;
	    int endPage = Math.min(startPage + pageGroupSize - 1, totalPages);
	    
	    // 데이터 추가
	    mav.addObject("productList", products);
	    mav.addObject("totalCount", totalCount);
	    mav.addObject("currentPage", page);
	    mav.addObject("pageSize", pageSize);
	    mav.addObject("totalPages", totalPages);
	    mav.addObject("startPage", startPage);
	    mav.addObject("endPage", endPage);
	    mav.addObject("sortType", sortType);
	    mav.addObject("mainCateId", mainCateId);
	    mav.addObject("subCateId", subCateId);
	    
	    mav.setViewName(viewName);
	    
	    return mav;
	}

	// 신규
	@RequestMapping("/newlist.do")
	public ModelAndView selectNewProductList(
	        @RequestParam(defaultValue = "1") int page,
	        @RequestParam(defaultValue = "16") int pageSize,
	        @RequestParam(required = false) String sortType,
	        @RequestParam(required = false) String mainCateId,
	        @RequestParam(required = false) String subCateId) {
	    
	    List<Map<String, Object>> products = userProductService.selectNewProductList(page, pageSize, sortType, mainCateId, subCateId);
	    
	    return productListCommon(products, page, pageSize, sortType, mainCateId, subCateId, "product/new");
	}

	// 추천
	@RequestMapping("/recommendlist.do")
	public ModelAndView selectRecommendProductList(
	        @RequestParam(defaultValue = "1") int page,
	        @RequestParam(defaultValue = "16") int pageSize,
	        @RequestParam(required = false) String sortType,
	        @RequestParam(required = false) String mainCateId,
	        @RequestParam(required = false) String subCateId) {
	    
	    List<Map<String, Object>> products = userProductService.selectRecommendProductList(page, pageSize, sortType, mainCateId, subCateId);
	    
	    return productListCommon(products, page, pageSize, sortType, mainCateId, subCateId, "product/recommend");
	}

	// 인기
	@RequestMapping("/hotlist.do")
	public ModelAndView selectHotProductList(
	        @RequestParam(defaultValue = "1") int page,
	        @RequestParam(defaultValue = "16") int pageSize,
	        @RequestParam(required = false) String sortType,
	        @RequestParam(required = false) String mainCateId,
	        @RequestParam(required = false) String subCateId) {
	    
	    List<Map<String, Object>> products = userProductService.selectHotProductList(page, pageSize, sortType, mainCateId, subCateId);
	    
	    return productListCommon(products, page, pageSize, sortType, mainCateId, subCateId, "product/hot");
	}

	// 카테고리별
	@RequestMapping(value="/product/list.do")
	public ModelAndView selectCategoryProductList(
	        @RequestParam(defaultValue = "1") int page,
	        @RequestParam(defaultValue = "16") int pageSize,
	        @RequestParam(required = false) String sortType,
	        @RequestParam(required = false) String mainCateId,
	        @RequestParam(required = false) String subCateId) {
	    
	    ModelAndView mav = new ModelAndView();
	    
	    List<Map<String, Object>> products = userProductService.selectCategoryProductList(page, pageSize, sortType, mainCateId, subCateId);
	    int totalCount = products.size();
	    
	    // 페이지네이션 
	    int totalPages = (int) Math.ceil((double) totalCount / pageSize);
	    int pageGroupSize = 5;
	    int startPage = ((page - 1) / pageGroupSize) * pageGroupSize + 1;
	    int endPage = Math.min(startPage + pageGroupSize - 1, totalPages);
	    
	    // 기본 데이터
	    mav.addObject("productList", products);
	    mav.addObject("totalCount", totalCount);
	    mav.addObject("currentPage", page);
	    mav.addObject("pageSize", pageSize);
	    mav.addObject("totalPages", totalPages);
	    mav.addObject("startPage", startPage);
	    mav.addObject("endPage", endPage);
	    mav.addObject("sortType", sortType);
	    mav.addObject("mainCateId", mainCateId);
	    mav.addObject("subCateId", subCateId);
	    
	    if (mainCateId != null && !mainCateId.isEmpty()) {
	        int mainCateIdInt = Integer.parseInt(mainCateId);
	        
	        List<Map<String, Object>> allMainCategories = userCategoryService.selectMainCategoryListByUser();
	        Map<String, Object> mainCategory = null;
	        for (Map<String, Object> main : allMainCategories) {
	            int id = ((Number) main.get("MAIN_CATE_ID")).intValue();
	            if (id == mainCateIdInt) {
	                mainCategory = main;
	                break;
	            }
	        }
	        
	        List<Map<String, Object>> subCategories = userCategoryService.selectSubCategoryListByUser(mainCateIdInt);
	        
	        mav.addObject("mainCategory", mainCategory);
	        mav.addObject("subCategories", subCategories);
	    }
	    
	    mav.setViewName("product/list");
	    
	    return mav;
	}
}
	
