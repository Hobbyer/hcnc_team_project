package user.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import user.mapper.UserMapper;
import user.mapper.UserProductMapper;

@Service
public class UserService {
	
	@Autowired
	private UserMapper userMapper;
	
	@Autowired
	private UserProductMapper userProductMapper;
	
	public List<Map<String,Object>> selectProductListSearchByUser(String keyword){
		return userMapper.selectProductListSearchByUser(keyword);
	}
	
	//메인출력용 서비스 분리
	
	// 메인 - 신상품 8개 (캐싱)
	@Cacheable(value = "mainNewProducts", key = "'new-' + #mainCateId + '-' + #subCateId")
	public List<Map<String, Object>> selectMainNewProducts(String mainCateId, String subCateId) {
		final int pageSize = 8;
		
		Map<String, Object> params = new HashMap<>();
		params.put("offset", 0);
		params.put("pageSize", pageSize);
		params.put("sortType", "");
		params.put("mainCateId", mainCateId);
		params.put("subCateId", subCateId);
		
		List<Map<String, Object>> newProducts = userProductMapper.selectNewProListByUser(params);
		
		if (newProducts.size() < pageSize) {
			int needCount = pageSize - newProducts.size();
			params.put("pageSize", needCount);
			List<Map<String, Object>> normalProducts = userProductMapper.selectNormalProListByRecent(params);
			newProducts.addAll(normalProducts);
		}
		
		return newProducts;
	}
	
	// 메인 - 추천상품 4개 (캐싱)
	@Cacheable(value = "mainRecommendProducts", key = "'recommend-' + #mainCateId + '-' + #subCateId")
	public List<Map<String, Object>> selectMainRecommendProducts(String mainCateId, String subCateId) {
		final int pageSize = 4;
		
		Map<String, Object> params = new HashMap<>();
		params.put("offset", 0);
		params.put("pageSize", pageSize);
		params.put("sortType", "");
		params.put("mainCateId", mainCateId);
		params.put("subCateId", subCateId);
		
		return userProductMapper.selectRecommendProListByUser(params);
	}
	
	// 메인 - 인기상품 8개 (캐싱)
	@Cacheable(value = "mainHotProducts", key = "'hot-' + #mainCateId + '-' + #subCateId")
	public List<Map<String, Object>> selectMainHotProducts(String mainCateId, String subCateId) {
		final int pageSize = 8;
		
		Map<String, Object> params = new HashMap<>();
		params.put("offset", 0);
		params.put("pageSize", pageSize);
		params.put("sortType", "");
		params.put("mainCateId", mainCateId);
		params.put("subCateId", subCateId);
		
		List<Map<String, Object>> hotProducts = userProductMapper.selectHotProListByUser(params);
		
		if (hotProducts.size() < pageSize) {
			int needCount = pageSize - hotProducts.size();
			params.put("pageSize", needCount);
			List<Map<String, Object>> normalProducts = userProductMapper.selectNormalProListByViewCnt(params);
			hotProducts.addAll(normalProducts);
		}
		
		return hotProducts;
	}
}