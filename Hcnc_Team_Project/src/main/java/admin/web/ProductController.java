package admin.web;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest; // javax 유지

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.annotation.ParamVariable;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

import admin.service.ProductService;

@Controller
public class ProductController {

	@Autowired
	private ProductService productService;
	
	
	
	// ----------상품관리-----------
	
	// 상품 목록 조회
	@RequestMapping("/selectProductListByAdmin.do")
	public NexacroResult selectProductListByAdmin(
			@ParamDataSet(name = "ds_searchCond", required = false) Map<String, Object> cond) {
		System.out.println(cond);
		// null 방지
		if (cond == null)
			cond = new HashMap<>();

		// 'all'/'allS' 같은 프론트 기본값은 서버에서 무시 처리
		Object qs = cond.get("QUANTITY_STATUS");
		if (qs != null && "allS".equalsIgnoreCase(String.valueOf(qs))) {
			cond.remove("QUANTITY_STATUS");
		}
		Object iv = cond.get("IS_VISIBLE");
		if (iv != null && "all".equalsIgnoreCase(String.valueOf(iv))) {
			cond.remove("IS_VISIBLE");
		}

		// 날짜 값 정규화 (유효하지 않으면 제거)
		String sd = normalizeYmd(cond.get("START_DATE"));
		String ed = normalizeYmd(cond.get("END_DATE"));
		if (sd == null)
			cond.remove("START_DATE");
		else
			cond.put("START_DATE", sd);
		if (ed == null)
			cond.remove("END_DATE");
		else
			cond.put("END_DATE", ed);

		System.out.println(">>> [Controller cond] " + cond);

		NexacroResult rs = new NexacroResult();
		
		try {
			List<Map<String, Object>> list = productService.selectProductListByAdmin(cond);
			rs.addDataSet("ds_out_proList", list);
		} catch (IllegalArgumentException e) {
			rs.setErrorCode(-1);
			rs.setErrorMsg(e.getMessage());
		} catch (Exception e) {
			rs.setErrorCode(-99);
			rs.setErrorMsg("상품 목록 조회 중 오류가 발생했습니다.");
			e.printStackTrace();
		}
		
		return rs;
	}

	
	
	
	// 추가: 'yyyy-MM-dd'만 통과시키는 헬퍼
	private String normalizeYmd(Object x) {
		if (x == null)
			return null;
		String s = String.valueOf(x).trim();
		return s.matches("\\d{4}-\\d{2}-\\d{2}") ? s : null;
	}

	
	
	// 대분류 콤보
	@RequestMapping("/selectMainCategoryComboByAdmin.do")
	public NexacroResult selectMainCategoryComboByAdmin() {
		NexacroResult result = new NexacroResult();
		List<Map<String, Object>> list = productService.selectMainCategoryComboByAdmin();
		result.addDataSet("ds_mainCate", list);
		return result;
	}

	// 중분류 콤보 (대분류 선택시)
	@RequestMapping("/selectSubCategoryComboByAdmin.do")
	public NexacroResult selectSubCategoryComboByAdmin(@ParamVariable(name = "MAIN_CATE_ID") int mainCateId) {
		NexacroResult result = new NexacroResult();
		List<Map<String, Object>> list = productService.selectSubCategoryComboByAdmin(mainCateId);
		result.addDataSet("ds_subCate", list);
		return result;
	}

	
	
	
	
	
	
	
	// ----------------- 상품 진열 순서 관리 -----------------
	
	// 상품 진열순서관리 리스트
	@RequestMapping("/productDisplayOrderListByAdmin.do")
	public NexacroResult productDisplayOrderListByAdmin(
	        @ParamVariable(name = "displayType", required = false) String displayType) {

		if(displayType == null || displayType.isEmpty()) {
			displayType = "normal";
		}
		
	    Map<String,Object> cond = new HashMap<>();
	    cond.put("displayType", displayType);

	    List<Map<String, Object>> list = productService.productDisplayOrderListByAdmin(cond);

	    NexacroResult result = new NexacroResult();
	    result.addDataSet("ds_out_proList", list);
	    return result;
	}

	
	
	
	// 진열순서 변경
	@RequestMapping("/updateProductSort.do")
	public NexacroResult updateProductSort(
	        @ParamDataSet(name="ds_sortSave", required=false) List<Map<String,Object>> list) {

	    if(list != null) {
	        for(Map<String,Object> row : list) {
	            productService.updateProductSort(row);
	        }
	    }
	    return new NexacroResult();
	}

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	// ---------------- 재고 ------------------
	
	//재고저장 관리
	@RequestMapping("/updateInventory.do")
	public NexacroResult updateInventory(
			@ParamDataSet(name = "ds_qu") Map<String, Object> p,
			HttpServletRequest request) {
	    NexacroResult result = new NexacroResult();

//	    String loginId = (String) request.getSession().getAttribute("loginId");
//	    if (loginId == null) loginId = "system";
//	
//	    p.put("UPDATE_ID", loginId);
	
	    productService.updateInventory(p);
	
	    return result;
		
	}
	
	
	
	// ----------------- 재고/입출고리스트 관리 -----------------
	
	// 재고/입출고 리스트  조회
	@RequestMapping("/selectStockMovementsListByAdmin.do")
	public NexacroResult selectStockMovementsListByAdmin(
			@ParamDataSet(name = "ds_searchCond", required = false) Map<String, Object> cond) {
		// null 방지
		if (cond == null)
			cond = new HashMap<>();

		// 'all'/'allS' 같은 프론트 기본값은 서버에서 무시 처리
		Object qs = cond.get("QUANTITY_STATUS");
		if (qs != null && "allS".equalsIgnoreCase(String.valueOf(qs))) {
			cond.remove("QUANTITY_STATUS");
		}
		Object iv = cond.get("IS_VISIBLE");
		if (iv != null && "all".equalsIgnoreCase(String.valueOf(iv))) {
			cond.remove("IS_VISIBLE");
		}

		// 날짜 값 정규화 (유효하지 않으면 제거, 상품목록조회의 normalizeYmd 적용)
		String sd = normalizeYmd(cond.get("START_DATE"));
		String ed = normalizeYmd(cond.get("END_DATE"));
		if (sd == null)
			cond.remove("START_DATE");
		else
			cond.put("START_DATE", sd);
		if (ed == null)
			cond.remove("END_DATE");
		else
			cond.put("END_DATE", ed);

		System.out.println(">>> [재고입출고, Controller cond] " + cond);

		List<Map<String, Object>> list = productService.selectStockMovementsListByAdmin(cond);

		NexacroResult rs = new NexacroResult();
		rs.addDataSet("ds_out_proList", list);
		return rs;
	}


	
	
	
		
		
		
		
	// ----------------- 카테고리 관리 -----------------

	// 대분류 조회
	@RequestMapping("/selectMainCategoryByAdmin.do")
	public NexacroResult selectMainCategoryByAdmin() {
		NexacroResult result = new NexacroResult();
		result.addDataSet("ds_mainCate", productService.selectMainCategoryByAdmin());
		return result;
	}

	// 중분류 조회
	@RequestMapping("/selectSubCategoryByAdmin.do")
	public NexacroResult selectSubCategoryByAdmin() {
		NexacroResult result = new NexacroResult();
		result.addDataSet("ds_subCate", productService.selectSubCategoryByAdmin());
		return result;
	}

	// 추가
	@RequestMapping("/insertCategoryByAdmin.do")
	public NexacroResult insertCategoryByAdmin(@ParamDataSet(name = "ds_in") Map<String, Object> param) {
		NexacroResult result = new NexacroResult();
		try {
			productService.insertCategoryByAdmin(param);
			result.setErrorCode(0);
			result.setErrorMsg("등록이 완료되었습니다.");
		} catch (IllegalArgumentException e) {
			result.setErrorCode(-1);
			result.setErrorMsg(e.getMessage());
		} catch (Exception e) {
			e.printStackTrace();
			result.setErrorCode(-1);
			result.setErrorMsg("등록 중 오류가 발생했습니다.");
		}
		return result;
	}

	// 수정
	@RequestMapping("/updateCategoryByAdmin.do")
	public NexacroResult updateCategoryByAdmin(@ParamDataSet(name = "ds_in") Map<String, Object> param) {
		NexacroResult result = new NexacroResult();
		try {
			productService.updateCategoryByAdmin(param);
			result.setErrorCode(0);
			result.setErrorMsg("수정이 완료되었습니다.");
		} catch (IllegalArgumentException e) {
			result.setErrorCode(-1);
			result.setErrorMsg(e.getMessage());
		} catch (Exception e) {
			e.printStackTrace();
			result.setErrorCode(-1);
			result.setErrorMsg("수정 중 오류가 발생했습니다.");
		}
		return result;
	}

	// 삭제
	@RequestMapping("/deleteCategoryByAdmin.do")
	public NexacroResult deleteCategoryByAdmin(@ParamDataSet(name = "ds_in") Map<String, Object> param) {
		productService.deleteCategoryByAdmin(param);
		return new NexacroResult();
	}

	// 상품 진열상태 변경
	@RequestMapping("/updateProductVisibleByAdmin.do")
	public NexacroResult updateProductVisibleByAdmin(@ParamDataSet(name = "ds_in") List<Map<String, Object>> dsIn) {

		for (Map<String, Object> row : dsIn) {
			productService.updateProductVisibleByAdmin(row);
		}
		return new NexacroResult();
	}

	
	
	
	
	
	// ----------------- 옵션 관리 -----------------

	// 옵션 목록 리스트 조회,검색
	@RequestMapping("/selectOptionByAdmin.do")
	public NexacroResult selectOptionByAdmin(
			@ParamDataSet(name = "ds_searchCond", required = false) Map<String, Object> cond) {
		NexacroResult result = new NexacroResult();

		// null 방지
		if (cond == null)
			cond = new HashMap<>();

		result.addDataSet("ds_out_opList", productService.selectOptionByAdmin(cond));
		return result;
	}

	
	
	// 옵션등록에서 상품검색시 필요한 상품조회
	@RequestMapping("/selectProductListOptionByAdmin.do")
	public NexacroResult selectProductListOptionByAdmin(
			@ParamDataSet(name = "ds_searchCond", required = false) Map<String, Object> cond) {

		if (cond == null)
			cond = new HashMap<>();
		List<Map<String, Object>> list = productService.selectProductListOptionByAdmin(cond);

		NexacroResult rs = new NexacroResult();
		rs.addDataSet("ds_prod", list);
		return rs;
	}

	
	
	
	// 옵션 진열상태 변경 (선택된 행들 일괄 처리)
	@RequestMapping("/updateOptionVisibleByAdmin.do")
	public NexacroResult updateOptionVisibleByAdmin(@ParamDataSet(name = "ds_in") List<Map<String, Object>> dsIn) {

		for (Map<String, Object> row : dsIn) {

			// row 예시: {OPTION_ID=5, IS_VISIBLE="N"}
			productService.updateOptionVisibleByAdmin(row);
		}

		return new NexacroResult(); // 성공 여부만 반환
	}

	// 옵션 단건 조회(옵션 저장시 타입 노멀값으로 가져오기위해)
	@RequestMapping("/selectOptionOneByAdmin.do")
	public NexacroResult selectOptionOneByAdmin(@ParamVariable(name = "OPTION_ID") Long optionId) {

		NexacroResult result = new NexacroResult();
		Map<String, Object> option = productService.selectOptionOneByAdmin(optionId);
		if (option != null) {
			result.addDataSet("ds_optionReg", Collections.singletonList(option));
		}
		return result;
	}

	// 옵션 저장
	@RequestMapping("/saveOptionByAdmin.do")
	public NexacroResult saveOptionByAdmin(@ParamDataSet(name = "ds_optionReg") List<Map<String, Object>> optionList,
			HttpServletRequest request) {

		NexacroResult result = new NexacroResult();

		try {

			//String loginId = (String) request.getSession().getAttribute("loginId");

			for (Map<String, Object> option : optionList) {
				Object optionId = option.get("OPTION_ID");

				if (optionId != null && !"".equals(optionId.toString())) {
					// PK 있으면 update
					productService.updateOption(option);
				} else {
					// PK 없으면 insert
					productService.insertOption(option);
				}
			}

			result.setErrorCode(0);
			result.setErrorMsg("옵션 저장 성공");

		} catch (Exception e) {
			result.setErrorCode(-1);
			result.setErrorMsg("옵션 저장 실패" + e.getMessage());

		}

		return result;
	}

	
	
	
	
	

	
	
	
	
	
	
	
	
	
}
