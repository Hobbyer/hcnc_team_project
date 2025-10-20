package user.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import user.mapper.UserProductMapper;

@Service
@Transactional
public class UserProductService {
	
	@Autowired
	private UserProductMapper userProductMapper;

	/*
	 * public List<HashMap<String, Object>> selectProductByUser(Long productId) { //
	 * TODO Auto-generated method stub return
	 * userProductMapper.selectProductByUser(productId); }
	 */
	
	public List<HashMap<String, Object>> selectProductByUser(Long productId) {
		
		List<HashMap<String, Object>> selectProduct = userProductMapper.selectProductByUser(productId);
		
		// cartItemId 기준으로 그룹화
		Map<Long, HashMap<String, Object>> productMap = new LinkedHashMap<>();
		
		for(HashMap<String, Object> row: selectProduct) {
			Long product = (Long) row.get("PRODUCT_ID");
			
			// 해당 cartItemId가 cartItemMap에 없는 경우
			if(!productMap.containsKey(product)) {
				HashMap<String, Object> item = new HashMap<>();
				
				item.put("PRODUCT_CODE", row.get("PRODUCT_CODE"));
	            item.put("PRODUCT_NAME", row.get("PRODUCT_NAME"));
	            item.put("PRODUCT_PRICE", row.get("PRODUCT_PRICE"));
	            item.put("SALED_PRICE", row.get("SALED_PRICE"));
	            item.put("PRODUCT_CONTENT", row.get("PRODUCT_CONTENT"));
	            item.put("PRODUCT_WEIGHT", row.get("PRODUCT_WEIGHT"));
	            item.put("IS_VISIBLE", row.get("IS_VISIBLE"));
	            
	            // 옵션이 있는 경우 담을 리스트 추가해놓기
	            item.put("imgs", new ArrayList<HashMap<String, Object>>());
			
	            productMap.put(product, item);
			}
			
			// 옵션 정보 추가 (옵션이 있는 경우만)
			if(row.get("IMAGE_ID") != null) {
				HashMap<String, Object> img = new HashMap<>();
				
				img.put("IMAGE_ID", row.get("IMAGE_ID"));
				img.put("IMAGE_URL", row.get("IMAGE_URL"));
				img.put("ALT_TEXT", row.get("ALT_TEXT"));
				img.put("SORT_NUMBER", row.get("SORT_NUMBER"));
				img.put("IS_MAIN", row.get("IS_MAIN"));
	            
	            @SuppressWarnings("unchecked")
				List<HashMap<String, Object>> imgs =
	            		(List<HashMap<String, Object>>) productMap.get(product).get("imgs");
	            
	            imgs.add(img);
			}
		}
		
		// Map의 values를 List로 반환
		return new ArrayList<>(productMap.values());
	}

	public HashMap<String, Object> insertCartItemByUser(Map<String, Object> param, List<Long> optionIds) {
		HashMap<String, Object> resultData = new HashMap<String, Object>();
		int result = 0;
		// 1. CART_ID 조회
		Long  cartIdSelect = userProductMapper.selectCartIdByUser(param);
		try {
			if(cartIdSelect != null && param.get("tempId") == null) {
				param.put("cartId", cartIdSelect);
			} else {
				userProductMapper.insertCartsByUser(param);
			}
			
			// CART_ITEMS 데이터 insert
			// INSERT 후 param Map에 cartItemId가 자동으로 추가됨
			userProductMapper.insertCartItemByUser(param);
			Long cartItemId = Long.parseLong(param.get("cartItemId").toString());
			
			System.out.println("cartItemId : " + cartItemId);
			
			// CART_ITEM_OPTIONS 데이터 insert
			boolean cartItemOptions = true;
			if(optionIds.size() > 0) {
				Map<String, Object> optionId = new HashMap<String, Object>();
				
				optionId.put("cartItemId", cartItemId);
				
				for(int i=0; i < optionIds.size(); i++) {
					
					optionId.put("optionId", optionIds.get(i));
					
					int optionInsert =  userProductMapper.insertCartItemOptionByUser(optionId);
					
					if(optionInsert != 1) {
						cartItemOptions = false;
					}
				}
			}
			
			if(cartItemOptions) {
				result = 1;
				System.out.println("옵션처리 성공!");
			} else {
				result = 0;
				System.out.println("옵션처리 실패x");
			}
			
			resultData.put("result", result);
			resultData.put("cartId", param.get("cartId"));
		} catch(DuplicateKeyException e) {
			result = 2;
			resultData.put("result", result);
			resultData.put("cartId", cartIdSelect);
		}
		return resultData;
	}

	public List<HashMap<String, Object>> slectOptionInfoByUser(Long productId) {
		// TODO Auto-generated method stub
		return userProductMapper.slectOptionInfoByUser(productId);
	}

	public int insertQnAByUser(Map<String, Object> param) {
		// TODO Auto-generated method stub
		return userProductMapper.insertQnAByUser(param);
	}
	
	public List<HashMap<String, Object>> selectProductQnAListByUser(Map<String, Object> param) {
		// TODO Auto-generated method stub
		return userProductMapper.selectProductQnAListByUser(param);
	}

	public HashMap<String, Object> selectQnADetailByUser(Map<String, Object> param) {
		// TODO Auto-generated method stub
		return userProductMapper.selectQnADetailByUser(param);
	}

	public int updateProductQnAByUser(Map<String, Object> param) {
		// TODO Auto-generated method stub
		return userProductMapper.updateProductQnAByUser(param);
	}

	public int deleteQnAByUser(Map<String, Object> param) {
		// TODO Auto-generated method stub
		return userProductMapper.deleteQnAByUser(param);
	}


	public HashMap<String, Object> selectProductDescriptionByUser(Map<String, Object> param) {
		// TODO Auto-generated method stub
		return userProductMapper.selectProductDescriptionByUser(param);
	}
	
	// 서브 상세리스트 > 메인출력용 분리 사유: 캐싱
	// 신상품 리스트 조회
	public List<Map<String, Object>> selectNewProductList(int page, int pageSize, String sortType, String mainCateId, String subCateId) {
	    int offset = (page - 1) * pageSize;
	    
	    Map<String, Object> params = new HashMap<>();
	    params.put("offset", offset);
	    params.put("pageSize", pageSize);
	    params.put("sortType", sortType);
	    params.put("mainCateId", mainCateId);
	    params.put("subCateId", subCateId);
	    
	    List<Map<String, Object>> newProducts = userProductMapper.selectNewProListByUser(params);
	    
	    // 부족하면 일반상품 최신순으로 채우기
	    if (newProducts.size() < pageSize) {
	        int needCount = pageSize - newProducts.size();
	        params.put("offset", 0);
	        params.put("pageSize", needCount);
	        List<Map<String, Object>> normalProducts = userProductMapper.selectNormalProListByRecent(params);
	        newProducts.addAll(normalProducts);
	        
	        // 합친 후 다시 정렬
	        if (sortType != null) {
	            switch (sortType) {
	                case "name":
	                    newProducts.sort((a, b) -> {
	                        String nameA = (String) a.get("PRODUCT_NAME");
	                        String nameB = (String) b.get("PRODUCT_NAME");
	                        return nameA.compareTo(nameB);
	                    });
	                    break;
	                case "lowPrice":
	                    newProducts.sort((a, b) -> {
	                        Number priceA = (Number) (a.get("SALED_PRICE") != null ? a.get("SALED_PRICE") : a.get("PRODUCT_PRICE"));
	                        Number priceB = (Number) (b.get("SALED_PRICE") != null ? b.get("SALED_PRICE") : b.get("PRODUCT_PRICE"));
	                        return Double.compare(priceA.doubleValue(), priceB.doubleValue());
	                    });
	                    break;
	                case "highPrice":
	                    newProducts.sort((a, b) -> {
	                        Number priceA = (Number) (a.get("SALED_PRICE") != null ? a.get("SALED_PRICE") : a.get("PRODUCT_PRICE"));
	                        Number priceB = (Number) (b.get("SALED_PRICE") != null ? b.get("SALED_PRICE") : b.get("PRODUCT_PRICE"));
	                        return Double.compare(priceB.doubleValue(), priceA.doubleValue());
	                    });
	                    break;
	            }
	        }
	    }
	    
	    return newProducts;
	}

	// 인기상품 리스트 조회
	public List<Map<String, Object>> selectHotProductList(int page, int pageSize, String sortType, String mainCateId, String subCateId) {
	    int offset = (page - 1) * pageSize;
	    
	    Map<String, Object> params = new HashMap<>();
	    params.put("offset", offset);
	    params.put("pageSize", pageSize);
	    params.put("sortType", sortType);
	    params.put("mainCateId", mainCateId);
	    params.put("subCateId", subCateId);
	    
	    List<Map<String, Object>> hotProducts = userProductMapper.selectHotProListByUser(params);
	    
	    // 부족하면 조회수 높은 상품으로 채우기
	    if (hotProducts.size() < pageSize) {
	        int needCount = pageSize - hotProducts.size();
	        params.put("offset", 0);
	        params.put("pageSize", needCount);
	        List<Map<String, Object>> normalProducts = userProductMapper.selectNormalProListByViewCnt(params);
	        hotProducts.addAll(normalProducts);
	        
	        // 합친 후 다시 정렬
	        if (sortType != null) {
	            switch (sortType) {
	                case "name":
	                    hotProducts.sort((a, b) -> {
	                        String nameA = (String) a.get("PRODUCT_NAME");
	                        String nameB = (String) b.get("PRODUCT_NAME");
	                        return nameA.compareTo(nameB);
	                    });
	                    break;
	                case "lowPrice":
	                    hotProducts.sort((a, b) -> {
	                        Number priceA = (Number) (a.get("SALED_PRICE") != null ? a.get("SALED_PRICE") : a.get("PRODUCT_PRICE"));
	                        Number priceB = (Number) (b.get("SALED_PRICE") != null ? b.get("SALED_PRICE") : b.get("PRODUCT_PRICE"));
	                        return Double.compare(priceA.doubleValue(), priceB.doubleValue());
	                    });
	                    break;
	                case "highPrice":
	                    hotProducts.sort((a, b) -> {
	                        Number priceA = (Number) (a.get("SALED_PRICE") != null ? a.get("SALED_PRICE") : a.get("PRODUCT_PRICE"));
	                        Number priceB = (Number) (b.get("SALED_PRICE") != null ? b.get("SALED_PRICE") : b.get("PRODUCT_PRICE"));
	                        return Double.compare(priceB.doubleValue(), priceA.doubleValue());
	                    });
	                    break;
	            }
	        }
	    }
	    
	    return hotProducts;
	}

	// 추천상품 리스트 조회
	public List<Map<String, Object>> selectRecommendProductList(int page, int pageSize, String sortType, String mainCateId, String subCateId) {
	    int offset = (page - 1) * pageSize;
	    
	    Map<String, Object> params = new HashMap<>();
	    params.put("offset", offset);
	    params.put("pageSize", pageSize);
	    params.put("sortType", sortType);
	    params.put("mainCateId", mainCateId);
	    params.put("subCateId", subCateId);
	    
	    return userProductMapper.selectRecommendProListByUser(params);
	}

	// 카테고리별 리스트 조회
	public List<Map<String, Object>> selectCategoryProductList(int page, int pageSize, String sortType, String mainCateId, String subCateId) {
	    int offset = (page - 1) * pageSize;
	    
	    Map<String, Object> params = new HashMap<>();
	    params.put("offset", offset);
	    params.put("pageSize", pageSize);
	    params.put("sortType", sortType);
	    params.put("mainCateId", mainCateId);
	    params.put("subCateId", subCateId);
	    
	    return userProductMapper.selectCategoryProductsListByUser(params);
	}

	

}
