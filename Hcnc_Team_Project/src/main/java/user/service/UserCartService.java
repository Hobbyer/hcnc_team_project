package user.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import user.mapper.UserCartMapper;


@Service

public class UserCartService {
	
	@Autowired
	private UserCartMapper cartMapper;
	
	@Transactional
	public List<HashMap<String, Object>> selectCartListByUser(HashMap<String, Object> param){
		
		List<HashMap<String, Object>> selectCartItems = cartMapper.selectCartListByUser(param);
		
		// cartItemId 기준으로 그룹화
		Map<Long, HashMap<String, Object>> cartItemMap = new LinkedHashMap<>();
		
		for(HashMap<String, Object> row: selectCartItems) {
			Long cartItemId = (Long) row.get("CART_ITEM_ID");
			
			// 해당 cartItemId가 cartItemMap에 없는 경우
			if(!cartItemMap.containsKey(cartItemId)) {
				HashMap<String, Object> item = new HashMap<>();
				
				item.put("PRODUCT_ID", row.get("PRODUCT_ID"));
				item.put("PRODUCT_NAME", row.get("PRODUCT_NAME"));
				item.put("PRODUCT_OPTION", row.get("PRODUCT_OPTION"));
				item.put("PRICE", row.get("PRICE"));
				item.put("QUANTITY", row.get("QUANTITY"));
				item.put("SUB_TOTAL", row.get("SUB_TOTAL"));
				item.put("IS_CHECKED", row.get("IS_CHECKED"));
				item.put("CART_ITEM_ID", cartItemId);
				item.put("IS_WISHLIST", row.get("IS_WISHLIST"));
				item.put("IMAGE_ID", row.get("IMAGE_ID"));
				item.put("IMAGE_URL", row.get("IMAGE_URL"));
				
				// 옵션이 있는 경우 담을 리스트 추가해놓기
				item.put("options", new ArrayList<HashMap<String, Object>>());

				cartItemMap.put(cartItemId, item);
			}
			
			// 옵션 정보 추가 (옵션이 있는 경우만)
			if(row.get("OPTION_ID") != null) {
				HashMap<String, Object> option = new HashMap<>();
				
				option.put("OPTION_ID", row.get("OPTION_ID"));
				option.put("OPTION_NAME", row.get("OPTION_NAME"));
				option.put("OPTION_VALUE", row.get("OPTION_VALUE"));
				option.put("ADDITIONAL_PRICE", row.get("ADDITIONAL_PRICE"));
	            
				@SuppressWarnings("unchecked")
				List<HashMap<String, Object>> options =
	            		(List<HashMap<String, Object>>) cartItemMap.get(cartItemId).get("options");
	            
	            options.add(option);
			}
		}
		
		// Map의 values를 List로 반환
		return new ArrayList<>(cartItemMap.values());
	}

	public int updateQuantity(HashMap<String, Object> param) {
		return cartMapper.updateQuantity(param);
		
	}

	public int deleteProduct(HashMap<String, Object> param) {
		return cartMapper.deleteProduct(param);
		
	}

	public int updateChkBox(HashMap<String, Object> param) {
		return cartMapper.updateChkBox(param);
	}

	public HashMap<String, Object> selectedTotalPriceByUser(HashMap<String, Object> param) {
		return cartMapper.selectedTotalPriceByUser(param);
	}

	@Transactional
	public HashMap<String, Object> updateOptionByUser(HashMap<String, Object> param, List<Long> optionIds) {
		HashMap<String, Object> result = new HashMap<>();
		
		try {
			int updateOption = cartMapper.updateOptionByUser(param);
			
			if(updateOption > 0) {
			
				int deleteCartItemOption = cartMapper.deleteCartItemOptionByUser(param);
				
				int insertCartItemOption = 1;
				if(optionIds != null && optionIds.size() > 0) {
					for(int i=0; i < optionIds.size(); i++) {
						Long optionId = optionIds.get(i);
						
						param.put("optionId", optionId);
						int insertResult = cartMapper.insertCartItemOptionByUser(param);
						
						if(insertResult == 0) {
							System.out.println("옵션 ID 등록 실패");
							insertCartItemOption = 0;
						}
					}
				}
				
				if(updateOption == 0 || deleteCartItemOption == 0 || insertCartItemOption == 0) {
					result.put("success", false);
		            result.put("message", "옵션 변경 실패");
				} else {
					result.put("success", true);
				}
			} else {
				result.put("success", false);
	            result.put("message", "옵션 변경 실패");
			}
		} catch(DuplicateKeyException e) {
	        result.put("success", false);
	        result.put("message", "이미 동일한 옵션이 장바구니에 있습니다.");
	        result.put("errorCode", "DUPLICATE");
	    }
		
	    return result;
	}

	// 위시리스트 토글 (추가/제거)
	@Transactional
	public HashMap<String, Object> toggleWishlist(HashMap<String, Object> param) throws Exception {
	    HashMap<String, Object> result = new HashMap<>();
	    
	    try {
	        boolean isCurrentlyInWishlist = checkWishlistStatus(param);
	        
	        if (isCurrentlyInWishlist) {
	            // 제거
	            cartMapper.deleteFromWishlist(param);
	            result.put("isInWishlist", false);
	        } else {
	            // 추가 - 2단계로 처리
	            // 1. WISH 테이블에 위시리스트 있는지 확인하고 없으면 생성
	            HashMap<String, Object> wishInfo = cartMapper.selectWishByMemberId(param);
	            if (wishInfo == null) {
	                cartMapper.insertWish(param); // WISH 테이블에 레코드 생성
	            }
	            // 2. WISH_ITEMS에 상품 추가
	            cartMapper.insertToWishlist(param);
	            result.put("isInWishlist", true);
	        }
	        
	        result.put("success", true);
	        
	    } catch (Exception e) {
	        result.put("success", false);
	        result.put("message", "처리 중 오류 발생: " + e.getMessage());
	    }
	    
	    return result;
	}

	// 위시리스트 상태 확인
	public boolean checkWishlistStatus(HashMap<String, Object> param) throws Exception {
	    HashMap<String, Object> wishlistItem = cartMapper.selectWishlistItem(param);
	    return wishlistItem != null;
	}
}