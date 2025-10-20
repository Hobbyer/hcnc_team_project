package admin.mapper;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("ProductMapper")
public interface ProductMapper {
	
	//  ----- 상품관리 -----
    List<Map<String,Object>> selectProductListByAdmin(Map<String,Object> p);
    void insertProduct(Map<String,Object> p);

    void insertInventory(Map<String,Object> p);
	List<Map<String, Object>> selectMainCategoryComboByAdmin();
	List<Map<String, Object>> selectSubCategoryComboByAdmin(int mainCateId);
	
	// ----- 재고업데이트 -----
	void updateInventory(Map<String, Object> p);
	
	
	// ----- 카테고리 -----
	List<Map<String,Object>> selectMainCategoryByAdmin();
	List<Map<String,Object>> selectSubCategoryByAdmin();
	void insertCategoryByAdmin(Map<String,Object> p);
	void updateCategoryByAdmin(Map<String,Object> p);
	void deleteCategoryByAdmin(Map<String,Object> p);
	int checkDuplicateMainCateNm(Map<String,Object> p);
	int checkDuplicateSubCateNm(Map<String,Object> p);
	
	
	// ----- 옵션 -----
	List<Map<String, Object>> selectOptionByAdmin(Map<String, Object> p);
	void updateOptionVisibleByAdmin(Map<String,Object> p);
	void updateProductVisibleByAdmin(Map<String, Object> p);
	void updateOption(Map<String, Object> option);
	Map<String, Object> selectOptionOneByAdmin(Long optionId);
	List<Map<String, Object>> selectProductListOptionByAdmin(Map<String, Object> cond);
    void insertOption(Map<String,Object> p);
	
	
	
	
	// ---- 재고 입출고 리스트 ----
	List<Map<String, Object>> selectStockMovementsListByAdmin(Map<String, Object> cond);
	
	
	
	
	// ---- 상품진열순서리스트 ----
	List<Map<String, Object>> productDisplayOrderListByAdmin(Map<String, Object> cond);
	void updateProductSort(Map<String, Object> row);




	
}
