package user.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import user.mapper.UserCouponMapper;
import user.mapper.UserMemberMapper;

@Service
public class UserMemberService {
	@Autowired
	private UserMemberMapper userMemberMapper;
	
	@Autowired
	private UserCouponService userCouponService;
	
	public int selectIdCheckByUser(String id) {
		return userMemberMapper.selectIdCheckByUser(id);
	}

	public int selectEmailCheckByUser(String email) {
		return userMemberMapper.selectEmailCheckByUser(email);
	}

	public int insertSignUpByUser(Map<String, Object> sign) {
		int result = userMemberMapper.insertSignUpByUser(sign);
		if (result > 0) {
	        String memberId = (String) sign.get("id"); //회원가입시 아이디훔침
	        try {
	            userCouponService.insertSignUpCoupon(memberId);  //신규회원 쿠폰 발급용으로 추가함
	        } catch(Exception e) {
	        	System.out.println("신규회원 쿠폰 발급 실패: " + e.getMessage()); // 실패해도 회원가입은 유지최대한 들건들이기
	        }
	    }
	    return result;
	}

	public Map<String, Object> selectLoginByUser(Map<String, Object> login) {
		Map<String, Object> loginResult = userMemberMapper.selectLoginByUser(login);
		System.out.println("로그인 결과: " + loginResult);  // 디버깅용
	    
	    if (loginResult != null) {
	        // id와 MEMBER_ID 둘 다 체크
	        String memberId = (String) loginResult.get("MEMBER_ID");
	        if (memberId == null) {
	            memberId = (String) loginResult.get("id");
	        }
	        
	        System.out.println("회원 ID: " + memberId);  // 디버깅용
	        
	        if (memberId != null) {
	            try {
	                int issuedCount = userCouponService.insertAutoPromotionCoupon(memberId);
	                
	                if (issuedCount == 0) {
	                    System.out.println("진행중인 프로모션이 없거나 이미 모두 받으셨습니다.");
	                } else {
	                    System.out.println("프로모션 쿠폰 " + issuedCount + "개 발급 완료!");
	                }
	                
	            } catch(Exception e) {
	                System.out.println("프로모션 쿠폰 발급 실패: " + e.getMessage());
	                e.printStackTrace();
	            }
	        } else {
	            System.out.println("회원 ID를 찾을 수 없습니다.");
	        }
	    }
		return loginResult;
	}
	
	public Map<String, Object> selectFindIdByUser(String email) {
		return userMemberMapper.selectFindIdByUser(email);
	}

	public Map<String, Object> selectUserInfoByUser(String id) {
		return userMemberMapper.selectUserInfoByUser(id);
	}

	public int updatePasswordByUser(Map<String, Object> param) {
		return userMemberMapper.updatePasswordByUser(param);
	}

	public int updateMemberByUser(Map<String, Object> param) {
		return userMemberMapper.updateMemberByUser(param);
	}

	public List<Map<String, Object>> selectMypageShippingInfoByUser(String id){
		return userMemberMapper.selectMypageShippingInfoByUser(id);
	}

	public int updateWithDrawByUser(String id) {
		return userMemberMapper.updateWithDrawByUser(id);
	}

	public int updateLastLoginByUser(String id) {
		return userMemberMapper.updateLastLoginByUser(id);
	}

	public List<Map<String, Object>> selectPointListByUser(String id){
		return userMemberMapper.selectPointListByUser(id);
	}

	public List<Map<String, Object>> selectCouponListByUser(String id){
		return userMemberMapper.selectCouponListByUser(id);
	}

	public int selectTotalPointByUser(String id) {
		return userMemberMapper.selectTotalPointByUser(id);
	}

	public int selectTotalSpendByUser(String id) {
		return userMemberMapper.selectTotalSpendByUser(id);
	}
}
