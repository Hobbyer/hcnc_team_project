package admin.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import admin.mapper.ProductMapper;

@Service
public class ProductService {

    @Autowired
    private ProductMapper productMapper;

    
    //상품목록 조회
    // ProductService.java
    public List<Map<String,Object>> selectProductListByAdmin(Map<String,Object> p) {

        String startDt = (String) p.get("START_DATE");
        String endDt   = (String) p.get("END_DATE");
        String today   = java.time.LocalDate.now().toString(); // "yyyy-MM-dd"

        if (startDt == null && endDt == null) {
            // 날짜 미입력: 전체 조회 허용
        } else if (startDt != null && endDt == null) {
        	throw new IllegalArgumentException("검색일 오류: 시작일과 종료일을 입력해 주십시오.");
            // 시작일만 있음: 통과 (원하면 startDt > today 방지 로직 추가 가능)
        } else if (startDt == null && endDt != null) {
            // 종료일만 있음: 미래 금지
            if (endDt.compareTo(today) > 0) {
                throw new IllegalArgumentException("검색 조건 오류: 미래 날짜는 선택할 수 없습니다.");
            }
        } else {
            // 둘 다 있음: 기존 범위 검증
            if (startDt.compareTo(endDt) > 0) {
                throw new IllegalArgumentException("검색 조건 오류: 시작일이 종료일보다 늦습니다.");
            }
            if (endDt.compareTo(today) > 0) {
                throw new IllegalArgumentException("검색 조건 오류: 미래 날짜는 선택할 수 없습니다.");
            }
            java.time.LocalDate s = java.time.LocalDate.parse(startDt);
            java.time.LocalDate e = java.time.LocalDate.parse(endDt);
            long days = java.time.temporal.ChronoUnit.DAYS.between(s, e);
            if (days > 365) {
                throw new IllegalArgumentException("검색 조건 오류: 조회 기간은 최대 1년까지만 가능합니다.");
            }
        }

        return productMapper.selectProductListByAdmin(p);
    }

    
    
    
    // 상품목록 카테고리 콤보
	public List<Map<String, Object>> selectMainCategoryComboByAdmin() {
		return productMapper.selectMainCategoryComboByAdmin();
	}

	public List<Map<String, Object>> selectSubCategoryComboByAdmin(int mainCateId) {
		return productMapper.selectSubCategoryComboByAdmin(mainCateId);
	}
	
	
	
	
	
	// ----- 카테고리 -----
	public List<Map<String,Object>> selectMainCategoryByAdmin() {
	    return productMapper.selectMainCategoryByAdmin();
	}
	public List<Map<String,Object>> selectSubCategoryByAdmin() {
	    return productMapper.selectSubCategoryByAdmin();
	}
	public void insertCategoryByAdmin(Map<String,Object> p) {
		  String type = (String)p.get("TYPE");

		    if ("main".equals(type)) {
		        int dupCnt = productMapper.checkDuplicateMainCateNm(p);
		        if (dupCnt > 0) {
		            throw new IllegalArgumentException("이미 존재하는 대분류명입니다.");
		        }
		    } else {
		        int dupCnt = productMapper.checkDuplicateSubCateNm(p);
		        if (dupCnt > 0) {
		            throw new IllegalArgumentException("이미 존재하는 중분류명입니다.");
		        }
		    }

		    productMapper.insertCategoryByAdmin(p);
	}
	public void updateCategoryByAdmin(Map<String,Object> p) {

	    String type = (String)p.get("TYPE");

	    if ("main".equals(type)) {
	        int dupCnt = productMapper.checkDuplicateMainCateNm(p);
	        if (dupCnt > 0) {
	            throw new IllegalArgumentException("이미 존재하는 대분류명입니다.");
	        }
	    } else {
	        int dupCnt = productMapper.checkDuplicateSubCateNm(p);
	        if (dupCnt > 0) {
	            throw new IllegalArgumentException("이미 존재하는 중분류명입니다.");
	        }
	    }

	    productMapper.updateCategoryByAdmin(p);
	}
	public void deleteCategoryByAdmin(Map<String,Object> p) {
	    productMapper.deleteCategoryByAdmin(p);
	}


	
	// ------ 옵션 -------

    public List<Map<String,Object>> selectOptionByAdmin(Map<String,Object> p) {
        return productMapper.selectOptionByAdmin(p);
    }

    public void updateOptionVisibleByAdmin(Map<String,Object> p) {
        productMapper.updateOptionVisibleByAdmin(p);
    }

	public void updateProductVisibleByAdmin(Map<String, Object> p) {
		productMapper.updateProductVisibleByAdmin(p);
	}
	
    public void insertOption(Map<String,Object> p) {
        productMapper.insertOption(p);
    }
    
	public void updateOption(Map<String, Object> option) {
		productMapper.updateOption(option);
	}

	public Map<String, Object> selectOptionOneByAdmin(Long optionId) {
		return productMapper.selectOptionOneByAdmin(optionId);
	}

	public List<Map<String, Object>> selectProductListOptionByAdmin(Map<String, Object> cond) {
		return productMapper.selectProductListOptionByAdmin(cond);
	}

	
	
	
	// ----- 재고 -----
	public void updateInventory(Map<String, Object> p) {
		 productMapper.updateInventory(p);
	}

	public List<Map<String, Object>> selectStockMovementsListByAdmin(Map<String, Object> cond) {
		
		 String startDt = (String) cond.get("START_DATE");
	        String endDt   = (String) cond.get("END_DATE");
	        String today   = java.time.LocalDate.now().toString(); // "yyyy-MM-dd"

	        if (startDt == null && endDt == null) {
	            // 날짜 미입력: 전체 조회 허용
	        } else if (startDt != null && endDt == null) {
	        	throw new IllegalArgumentException("검색일 오류: 시작일과 종료일을 입력해 주십시오.");
	            // 시작일만 있음: 통과 (원하면 startDt > today 방지 로직 추가 가능)
	        } else if (startDt == null && endDt != null) {
	            // 종료일만 있음: 미래 금지
	            if (endDt.compareTo(today) > 0) {
	                throw new IllegalArgumentException("검색 조건 오류: 미래 날짜는 선택할 수 없습니다.");
	            }
	        } else {
	            // 둘 다 있음: 기존 범위 검증
	            if (startDt.compareTo(endDt) > 0) {
	                throw new IllegalArgumentException("검색 조건 오류: 시작일이 종료일보다 늦습니다.");
	            }
	            if (endDt.compareTo(today) > 0) {
	                throw new IllegalArgumentException("검색 조건 오류: 미래 날짜는 선택할 수 없습니다.");
	            }
	            java.time.LocalDate s = java.time.LocalDate.parse(startDt);
	            java.time.LocalDate e = java.time.LocalDate.parse(endDt);
	            long days = java.time.temporal.ChronoUnit.DAYS.between(s, e);
	            if (days > 365) {
	                throw new IllegalArgumentException("검색 조건 오류: 조회 기간은 최대 1년까지만 가능합니다.");
	            }
	        }
		
		return productMapper.selectStockMovementsListByAdmin(cond);
	}


	
	
	
	

	// ----- 상품 진열 순서 관리 -----
	public List<Map<String, Object>> productDisplayOrderListByAdmin(Map<String, Object> cond) {
		return productMapper.productDisplayOrderListByAdmin(cond);
	}

	public void updateProductSort(Map<String, Object> row) {
		 productMapper.updateProductSort(row);
	}

	
}
