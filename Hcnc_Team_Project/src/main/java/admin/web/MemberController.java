package admin.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.annotation.ParamVariable;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

import admin.service.MemberService;
import admin.util.PasswordUtil;
import user.mail.UserMailService;

@Controller
public class MemberController {

	@Autowired
	private MemberService memberService;

	@Autowired
	private UserMailService mailService;

	// 메모리에 임시비밀번호 저장하기 위한 변수
	private static final Map<String, Long> tempPasswordCache = new ConcurrentHashMap<>();

	// 관리자 로그인
	// By GJ.09.10
	@RequestMapping(value = "/adminLoginCheckByAdmin.do")
	public NexacroResult adminCheckLogin(HttpServletRequest request) {
		NexacroResult result = new NexacroResult();
		result.addDataSet("ds_isLogin", new HashMap<String, Object>());
		System.out.println("ㅎㅇ");
		try {
			HttpSession session = request.getSession(false);
			if (session == null) {
				return result;
	
			}
			Map<String, Object> isLogin = (Map<String, Object>) session.getAttribute("adminInfo");
			if (isLogin == null) {
				// 로그인 정보 없음
				return result;
			} else {
				// 새로고침해서 다시 닉네임 띄우게 자바단에서 해결
				result.addDataSet("ds_loginChk", isLogin);
			}

			result.addDataSet("ds_isLogin", isLogin);
			return result;

		} catch (Exception e) {
			System.out.println(e);
			return result;
		}
	}

	// 쿠키 관리 통합 메서드
	private void handleRememberMeCookie(HttpServletResponse response, String saveId, String memberId) {
		Cookie cookie = new Cookie("ADMIN_ID", "Y".equals(saveId) ? memberId : "");
		cookie.setPath("/");
		cookie.setHttpOnly(false); // 넥사크로 쿠키 접근 허용
		cookie.setMaxAge("Y".equals(saveId) ? 30 * 24 * 60 * 60 : 0);
		response.addCookie(cookie);
	}

	// 로그인
	@RequestMapping(value = "/adminLoginByAdmin.do")
	public NexacroResult adminLogin(@ParamDataSet(name = "ds_admin") Map<String, Object> param,
			@ParamVariable(name = "SAVE_ID") String saveId, HttpServletRequest request, HttpServletResponse response) {

		NexacroResult result = new NexacroResult();

		try {
			String memberId = String.valueOf(param.get("MEMBER_ID"));

			// 먼저 만료 체크
			if (tempPasswordCache.containsKey(memberId)) {
				long expireTime = tempPasswordCache.get(memberId);
				long currentTime = System.currentTimeMillis();

				if (currentTime > expireTime) {
					// 만료됨 - 캐시에서 제거
					tempPasswordCache.remove(memberId);

					// DB에서도 비밀번호 무효화
					try {
						// EMAIL 먼저 조회
						Map<String, Object> memberDetail = memberService.selectMemberDetail(memberId);

						if (memberDetail != null) {
							Map<String, Object> invalidateParam = new HashMap<>();
							invalidateParam.put("MEMBER_ID", memberId);
							invalidateParam.put("EMAIL", memberDetail.get("EMAIL_ADDR")); // ⭐ EMAIL 추가
							invalidateParam.put("NEW_PASSWORD",
									PasswordUtil.encryptSHA256(java.util.UUID.randomUUID().toString()));

							int updated = memberService.updatePasswordByAdmin(invalidateParam);

							if (updated > 0) {
								System.out.println("=============================================");
								System.out.println("[임시 비밀번호 만료 처리]");
								System.out.println("회원 아이디: " + memberId);
								System.out.println("DB 비밀번호 무효화 완료");
								System.out.println("=============================================");
							}
						}
					} catch (Exception e) {
						System.err.println("임시 비밀번호 무효화 실패: " + e.getMessage());
						e.printStackTrace();
					}
					result.setErrorCode(-1);
					result.setErrorMsg("임시 비밀번호가 만료되었습니다.\n비밀번호 찾기를 다시 진행해주세요.");
					return result;
				}
			}

			// 비밀번호 암호화
			String password = String.valueOf(param.get("PASSWORD"));
			String crypto = PasswordUtil.encryptSHA256(password);
			param.put("PASSWORD", crypto);

			Map<String, Object> adminInfo = memberService.adminLogin(param);

			if (adminInfo != null && "O".equals(adminInfo.get("PASSWORD").toString())) {

				// 로그인 성공 후 임시 비밀번호인지 확인
				if (tempPasswordCache.containsKey(memberId)) {
					adminInfo.put("TEMP_PW_ALERT", "Y");
				}

				// 세션 생성
				HttpSession session = request.getSession();
				session.setAttribute("adminInfo", adminInfo);

				handleRememberMeCookie(response, saveId, memberId);

				result.addDataSet("ds_loginChk", adminInfo);
			}
		} catch (Exception e) {
			result.setErrorCode(-1);
			result.setErrorMsg("로그인 실패");
		}
		return result;
	}

	// 로그아웃
	@RequestMapping(value = "/adminLogoutByAdmin.do")
	public NexacroResult adminLogout(HttpServletRequest request, HttpServletResponse response) {
		NexacroResult result = new NexacroResult();
		try {
			// 세션 무효화
			HttpSession session = request.getSession(false);
			if (session != null) {
				session.invalidate();
			}

			// 쿠키 삭제
			Cookie cookie = new Cookie("ADMIN_ID", "");
			cookie.setPath("/");
			cookie.setMaxAge(0); // 즉시 삭제
			response.addCookie(cookie);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	// 회원 조회
	// By.PJ 09.15
	@RequestMapping(value = "/selectMemberListByAdmin.do")
	public NexacroResult selectMemberList(
			@ParamDataSet(name = "ds_search", required = false) Map<String, Object> param) {

		NexacroResult result = new NexacroResult();

		try {

			List<Map<String, Object>> selectList = memberService.selectMemberList(param);
			result.addDataSet("ds_list", selectList);

		} catch (Exception e) {
			System.out.println(e);
			result.setErrorCode(-1);
			result.setErrorMsg("회원조회 중 오류");
		}
		return result;
	};

	// 회원등급 조회
	// BY.PJ 09.15, 09.16
	@RequestMapping(value = "/selectMemberGradeListByAdmin.do")
	public NexacroResult selectMemberGradeList() {

		NexacroResult result = new NexacroResult();

		try {
			// 회원등급 전체 조회 (param 필요 없음)
			List<Map<String, Object>> gradeList = memberService.selectMemberGradeList();

			// ds_grade라는 이름으로 넥사크로에 전달
			result.addDataSet("ds_grade", gradeList);

		} catch (Exception e) {
			System.out.println(e);
			result.setErrorCode(-1);
			result.setErrorMsg("회원등급 조회 실패 >>> " + e.getMessage());
		}
		return result;
	}

	// 관리자 등록 및 암호화
	// BY.PJ 09.16
	@RequestMapping(value = "/insertMemberByAdmin.do")
	public NexacroResult insertMember(@ParamDataSet(name = "ds_member", required = false) Map<String, Object> param) {
		// 1.넥사크로에서 전송된 DataSet을 Map으로 받음
		// 1-1. 받아오는 데이터 셋과 이름이 일치해야한다.
		// 1-2. Map<String, Object> param 이렇게 받아올게요 라는 뜻
		NexacroResult result = new NexacroResult();

		// 비밀번호 param에서 꺼내서 암호화로 덮어쓰기
		String password = String.valueOf(param.get("PASSWORD"));
		String crypto = PasswordUtil.encryptSHA256(password);

		param.put("PASSWORD", crypto);

		try {

			// 아아디, 비밀번호, 휴대전화, 이메일 중복체크
			int duplicate = memberService.isDuplicated(param);

			if (duplicate > 0) {
				result.setErrorCode(-1);
				result.setErrorMsg("중복된 아이디, 이메일 또는 전화번호가 있습니다");

				return result;
			}

			Map<String, Object> dsInsCnt = new HashMap<>();

			int inserted = memberService.insertMember(param);

			dsInsCnt.put("INSERTED", inserted);
			result.addDataSet("ds_insCnt", dsInsCnt);

		} catch (Exception e) {
			System.out.println(e);
			result.setErrorCode(-1);
			result.setErrorMsg("등록실패");
		}
		return result;

	}

	// 회원 목록 상세 보기
	// By.PJ 09.17
	@RequestMapping(value = "/selectMemberDetailByAdmin.do")
	public NexacroResult selectMemberDetail(@ParamVariable(name = "memberId", required = false) String memberId) {

		NexacroResult result = new NexacroResult();

		try {

			Map<String, Object> memberDetail = memberService.selectMemberDetail(memberId);

			result.addDataSet("ds_memberDt", memberDetail);

		} catch (Exception e) {
			System.out.println(e);
			result.setErrorCode(-1);
			result.setErrorMsg("상세조회 중 오류발생");
		}
		return result;
	};

	// 문자열을 yyyyMMddHHmmss (14자리) 로 맞춰주는 헬퍼
	// 넥사크로에서 캘린더값읆 문자열로 받아오는데 14자리로 고정
	private String normalizeDateString(Object obj) {
		if (obj == null)
			return null;
		String s = obj.toString();
		if (s.length() >= 14) {
			return s.substring(0, 14); // yyyyMMddHHmmss
		} else if (s.length() == 8) {
			return s + "000000"; // yyyyMMdd → yyyyMMdd000000
		} else {
			return null; // 잘못된 값
		}
	}

	// 회원 정보 수정
	// By.PJ 09. 17
	@RequestMapping(value = "/memberUpdateByAdmin.do")
	public NexacroResult memberUpdate(@ParamDataSet(name = "ds_memberDt", required = false) Map<String, Object> param) {

		NexacroResult result = new NexacroResult();

		try {

			// 날짜 파라미터 변환
			param.put("FIRST_LOGIN_DT", normalizeDateString(param.get("FIRST_LOGIN_DT")));
			param.put("LAST_LOGIN_DT", normalizeDateString(param.get("LAST_LOGIN_DT")));
			param.put("BIRTH", normalizeDateString(param.get("BIRTH")));

			// 비밀번호 암호화 및 이미 암호화 되있다면 패스(비밀번호 변경하지 않았을시 암호화한걸 또 암호화 하는 거 방지)
			if (param.get("PASSWORD") != null && !"".equals(param.get("PASSWORD").toString())) {
				String password = String.valueOf(param.get("PASSWORD"));

				// 이미 해시된 64자리 hex 문자열이면 암호화 스킵
				if (!password.matches("^[0-9a-f]{64}$")) {
					String crypto = PasswordUtil.encryptSHA256(password);
					param.put("PASSWORD", crypto);
				}
			}

			// 중복체크
			int duplicated = memberService.updateDuplicated(param);
			if (duplicated > 0) {
				result.setErrorCode(-1);
				result.setErrorMsg("중복된 이메일 또는 전화번호가 있습니다");
				return result;
			}

			// UPDATE 실행
			int updated = memberService.memberUpdate(param);
			Map<String, Object> dsUpCnt = new HashMap<>();
			dsUpCnt.put("UPDATED", updated);
			result.addDataSet("ds_upCnt", dsUpCnt);

		} catch (Exception e) {
			e.printStackTrace();
			result.setErrorCode(-1);
			result.setErrorMsg("회원 수정 중 오류 발생");
		}
		return result;
	}

	// 회원 등급 관리 리스트 조회
	// By.PJ 09.18
	@RequestMapping(value = "/selectGradeManageByAdmin.do")
	public NexacroResult selectGradeManage(
			@ParamDataSet(name = "ds_search", required = false) Map<String, Object> param) {

		NexacroResult result = new NexacroResult();

		try {

			List<Map<String, Object>> selectGradeMange = memberService.selectGradeManage(param);

			result.addDataSet("ds_gradeList", selectGradeMange);

		} catch (Exception e) {
			System.out.println(e);
			result.setErrorCode(-1);
			result.setErrorMsg("회원조회 중 오류");
		}
		return result;
	};

	// 관리자 뺴고 회원만 등급 조회
	// BY.PJ 09.18
	@RequestMapping(value = "/selectGradeExceptionAdminListByAdmin.do")
	public NexacroResult selectGradeExceptionAdminList() {

		NexacroResult result = new NexacroResult();

		try {

			List<Map<String, Object>> gradeExAdminList = memberService.selectGradeExceptionAdminList();

			result.addDataSet("ds_grade", gradeExAdminList);

		} catch (Exception e) {
			System.out.println(e);
			result.setErrorCode(-1);
			result.setErrorMsg("회원등급 조회 실패 >>> " + e.getMessage());
		}
		return result;
	}

	// 회원 등급 변경 행 수정
	// By.PJ 09.18
	@RequestMapping(value = "/updateMemberGradeByAdmin.do")
	public NexacroResult updateMemberGrade(
			@ParamDataSet(name = "ds_gradeList", required = false) List<Map<String, Object>> memberGradeMangeList) {
		NexacroResult result = new NexacroResult();
		int updated = 0;

		try {
			for (Map<String, Object> updateGrade : memberGradeMangeList) {
				String rowType = String.valueOf(updateGrade.get("DataSetRowType"));

				if ("2".equals(rowType)) {
					updated = memberService.updateMemberGrade(updateGrade);
				}

			}
			Map<String, Object> dsUpCnt = new HashMap<>();

			dsUpCnt.put("UPDATED", updated);

			result.addDataSet("ds_upCnt", dsUpCnt);
		} catch (Exception e) {
			System.out.println("insert error: " + e.getMessage());
			result.setErrorCode(-1);
			result.setErrorMsg(e.getMessage());
		}
		return result;
	}

	// 휴면/탈퇴 회원 조회
	// By. PJ 09.19
	@RequestMapping(value = "/selectDormantWithdrawnMembersByAdmin.do")
	public NexacroResult selectDormantWithdrawnMembers(
			@ParamDataSet(name = "ds_search", required = false) Map<String, Object> param) {

		NexacroResult result = new NexacroResult();

		try {
			// 휴면/탈퇴 회원 목록 조회
			List<Map<String, Object>> memberList = memberService.selectDormantWithdrawnMembers(param);

			result.addDataSet("ds_list", memberList);

		} catch (Exception e) {
			System.out.println(e);
			result.setErrorCode(-1);
			result.setErrorMsg("휴면/탈퇴 회원 조회 중 오류");
		}
		return result;
	}

	// 휴면 회원 복구 (다시 활성화 R -> Y)
	// By. 09.19 Pj
	@RequestMapping(value = "/reactivateDormantMemberByAdmin.do")
	public NexacroResult reactivateDormantMember(
			@ParamDataSet(name = "ds_list", required = false) List<Map<String, Object>> param) {

		NexacroResult result = new NexacroResult();

		try {

			int updated = memberService.reactivateDormantMember(param);

			Map<String, Object> dsUpCnt = new HashMap<>();
			dsUpCnt.put("UPDATED", updated);
			result.addDataSet("ds_upCnt", dsUpCnt);

		} catch (Exception e) {
			System.out.println(e);
			result.setErrorCode(-1);
			result.setErrorMsg("휴면 회원 복구 중 오류");
		}
		return result;
	}

	// 회원 탈퇴 상태 처리 (STATUS를 N으로 변경)
	// By.09.19 Pj
	@RequestMapping(value = "/withdrawMemberByAdmin.do")
	public NexacroResult withdrawMember(
			@ParamDataSet(name = "ds_list", required = false) List<Map<String, Object>> param) {

		NexacroResult result = new NexacroResult();

		try {
			int deleted = memberService.withdrawMember(param);

			Map<String, Object> dsDelCnt = new HashMap<>();
			dsDelCnt.put("DELETED", deleted);
			result.addDataSet("ds_delCnt", dsDelCnt);

		} catch (Exception e) {
			System.out.println(e);
			result.setErrorCode(-1);
			result.setErrorMsg("회원 탈퇴 처리 중 오류");
		}
		return result;
	}

	// 회원 포인트, 쿠폰 리스트 조회
	// By. PJ 09.22
	@RequestMapping(value = "/selectPointAndCouponListByAdmin.do")
	public NexacroResult selectPointAndCouponList(
			@ParamDataSet(name = "ds_search", required = false) Map<String, Object> param) {

		NexacroResult result = new NexacroResult();

		try {

			List<Map<String, Object>> pointAndCouponList = memberService.selectPointAndCouponList(param);

			result.addDataSet("ds_list", pointAndCouponList);

		} catch (Exception e) {
			System.out.println(e);
			result.setErrorCode(-1);
			result.setErrorMsg("쿠폰 및 포인트 조회 중  오류");
		}
		return result;
	}

	// 포인트 사용 유형 리스트 조회
	// By.PJ 09.22
	@RequestMapping(value = "/selectMemberChageTypeListByAdmin.do")
	public NexacroResult selectMemberChageTypeList(
			@ParamDataSet(name = "ds_search", required = false) Map<String, Object> param) {

		NexacroResult result = new NexacroResult();

		try {
			List<Map<String, Object>> selectChageTypeList = memberService.selectMemberChageTypeList(param);
			result.addDataSet("ds_type", selectChageTypeList);

		} catch (Exception e) {
			e.printStackTrace();
			result.setErrorCode(-1);
			result.setErrorMsg("회원 포인트 유형 조회 실패 >>> " + e.getMessage());
		}
		return result;
	}

	// 해당 회원의 포인트 상세 조회(ds_search에 MEMBER_ID담아서 보내주기 )
	// By.PJ 09.22
	@RequestMapping(value = "/selectPointDetailListByAdmin.do")
	public NexacroResult selectPointDetailList(
			@ParamDataSet(name = "ds_search", required = false) Map<String, Object> param) {

		NexacroResult result = new NexacroResult();
		try {
			List<Map<String, Object>> pointDetailList = memberService.selectPointDetailList(param);
			result.addDataSet("ds_list", pointDetailList);
		} catch (Exception e) {
			e.printStackTrace();
			result.setErrorCode(-1);
			result.setErrorMsg("포인트 상세조회 중 오류 발생");
		}
		return result;
	}

	// 해당 회원의 쿠폰 상세 조회
	// By.PJ 09.22
	@RequestMapping(value = "/selectCouponDetailListByAdmin.do")
	public NexacroResult selectCouponDetailList(
			@ParamDataSet(name = "ds_search", required = false) Map<String, Object> param) {

		NexacroResult result = new NexacroResult();
		try {
			List<Map<String, Object>> couponDetailList = memberService.selectCouponDetailList(param);
			result.addDataSet("ds_list", couponDetailList);
		} catch (Exception e) {
			e.printStackTrace();
			result.setErrorCode(-1);
			result.setErrorMsg("포인트 상세조회 중 오류 발생");
		}
		return result;
	}

	// 포인트 적립 및 차감
	// By. PJ 09.23
	@RequestMapping(value = "/insertMemberPointByAdmin.do")
	public NexacroResult insertMemberPoint(
			@ParamDataSet(name = "ds_list", required = false) List<Map<String, Object>> insertPointList) {
		NexacroResult result = new NexacroResult();
		int inserted = 0;

		try {

			for (Map<String, Object> point : insertPointList) {
				String rowType = String.valueOf(point.get("DataSetRowType"));

				if ("1".equals(rowType)) {
					inserted = memberService.insertPoint(point);
				}

			}
			Map<String, Object> dsInsCnt = new HashMap<>();

			dsInsCnt.put("INSERTED", inserted);

			result.addDataSet("ds_insCnt", dsInsCnt);
		} catch (Exception e) {
			System.out.println("insert error: " + e.getMessage());
			result.setErrorCode(-1);
			result.setErrorMsg(e.getMessage());
		}
		return result;
	}

	// 쿠폰 지급(관리자가 강제 insert 엮을게 필요함)
	// By.PJ 09.23
	@RequestMapping(value = "/insertCouponByAdmin.do")
	public NexacroResult insertCoupon(@ParamDataSet(name = "ds_insert", required = false) Map<String, Object> param) {

		NexacroResult result = new NexacroResult();

		try {

			Map<String, Object> dsInsCnt = new HashMap<>();

			int inserted = memberService.insertCoupon(param);

			dsInsCnt.put("INSERTED", inserted);
			result.addDataSet("ds_insCnt", dsInsCnt);

		} catch (Exception e) {
			System.out.println(e);
			result.setErrorCode(-1);
			result.setErrorMsg("쿠폰 지급중 오류");
		}
		return result;
	}

	// 블랙이 된 회원 리스트 조회
	// By. PJ 09.24
	@RequestMapping(value = "/selectBlackListByAdmin.do")
	public NexacroResult selectBlackListByAdmin(
			@ParamDataSet(name = "ds_search", required = false) Map<String, Object> param) {

		NexacroResult result = new NexacroResult();

		try {

			List<Map<String, Object>> selectBlackList = memberService.selectBlackListByAdmin(param);

			result.addDataSet("ds_list", selectBlackList);

		} catch (Exception e) {
			System.out.println(e);
			result.setErrorCode(-1);
			result.setErrorMsg("블랙리스트 조회 중 오류");
		}
		return result;
	}

	// 블랙리스트 상세 조회(신고내역)
	// By. PJ 09.25
	@RequestMapping(value = "/selectBlackDetailListByAdmin.do")
	public NexacroResult selectBlackDetailListByAdmin(
			@ParamVariable(name = "memberId", required = false) String memberId) {

		NexacroResult result = new NexacroResult();

		try {

			List<Map<String, Object>> selectBlackListDetail = memberService.selectBlackDetailListByAdmin(memberId);

			result.addDataSet("ds_list", selectBlackListDetail);

		} catch (Exception e) {
			System.out.println(e);
			result.setErrorCode(-1);
			result.setErrorMsg("블랙리스트 상세 조회 중 오류");
		}
		return result;
	};

	// 블랙 헤제(신고취소로 상태를 바꿔서 5개 미만으로 줄여서 하는 방식)
	// 신고 처리 변경 행 수정
	// By.PJ 09.25
	@RequestMapping(value = "/updateMemberBlackStatusListByAdmin.do")
	public NexacroResult updateMemberBlackStatusListByAdmin(
			@ParamDataSet(name = "ds_list", required = false) List<Map<String, Object>> updateList) {
		NexacroResult result = new NexacroResult();
		int updated = 0;

		try {
			for (Map<String, Object> row : updateList) {
				String rowType = String.valueOf(row.get("DataSetRowType"));

				if ("2".equals(rowType)) { // 수정된 행만 처리
					updated = memberService.updateMemberBlackStatusListByAdmin(row);

				}
			}

			Map<String, Object> dsUpCnt = new HashMap<>();
			dsUpCnt.put("UPDATED", updated);
			result.addDataSet("ds_upCnt", dsUpCnt);

		} catch (Exception e) {
			result.setErrorCode(-1);
			result.setErrorMsg("신고 상태 변경 중 오류");
		}
		return result;
	}

	// 회원 가입 이력 조회
	// By. PJ 09.26
	@RequestMapping(value = "/selectMemberRegHistoryListByAdmin.do")
	public NexacroResult selectMemberRegHistoryListByAdmin(
			@ParamDataSet(name = "ds_search", required = false) Map<String, Object> param) {

		NexacroResult result = new NexacroResult();

		try {

			List<Map<String, Object>> selectMemberRegList = memberService.selectMemberRegHistoryListByAdmin(param);

			result.addDataSet("ds_list", selectMemberRegList);

		} catch (Exception e) {
			System.out.println(e);
			result.setErrorCode(-1);
			result.setErrorMsg("회원 가입 이력 조회중  오류");
		}
		return result;
	}

	// 회원 가입 이력 - 통계
	// By. 09.29 Pang
	@RequestMapping(value = "/selectLoginTypeStatsByAdmin.do")
	public NexacroResult selectLoginTypeStats() {
		NexacroResult result = new NexacroResult();
		try {
			List<Map<String, Object>> statsList = memberService.selectLoginTypeStatsByAdmin();
			result.addDataSet("ds_stats", statsList);
		} catch (Exception e) {
			result.setErrorCode(-1);
			result.setErrorMsg("통계 조회 중 오류");
		}
		return result;
	}

	// 회원 탈퇴 이력 조회
	// By. PJ 09.29 Pang
	@RequestMapping(value = "/selectWithdrawMemberListByAdmin.do")
	public NexacroResult selectWithdrawMemberListByAdmin(
			@ParamDataSet(name = "ds_search", required = false) Map<String, Object> param) {

		NexacroResult result = new NexacroResult();

		try {

			List<Map<String, Object>> selectWithdrawMember = memberService.selectWithdrawMemberListByAdmin(param);

			result.addDataSet("ds_list", selectWithdrawMember);

		} catch (Exception e) {
			System.out.println(e);
			result.setErrorCode(-1);
			result.setErrorMsg("회원 탈퇴 이력 조회중  오류");
		}
		return result;
	}

	// 회원 탈퇴 이력 - 통계
	// By. 09.30 Pang
	@RequestMapping(value = "/selectMemberWithdrawCntByAdmin.do")
	public NexacroResult selectMemberWithdrawCntByAdmin() {
		NexacroResult result = new NexacroResult();
		try {
			List<Map<String, Object>> statsList = memberService.selectMemberWithdrawCntByAdmin();
			result.addDataSet("ds_stats", statsList);
		} catch (Exception e) {
			result.setErrorCode(-1);
			result.setErrorMsg("통계 조회 중 오류");
		}
		return result;
	}

	// 비밀번호 찾기 (임시 비밀번호 발급)
	// By. PJ 10.01
	@RequestMapping(value = "/findPasswordByAdmin.do")
	public NexacroResult findPassword(
			@ParamDataSet(name = "ds_findPassword", required = false) Map<String, Object> param,
			HttpServletResponse response) {

		NexacroResult result = new NexacroResult();
		Map<String, Object> resultMap = new HashMap<>();

		try {
			// 회원 정보 확인 (아이디와 이메일 일치 여부)
			Map<String, Object> memberInfo = memberService.findMemberByIdAndEmailByAdmin(param);

			if (memberInfo != null) {
				// 임시 비밀번호 생성
				String tempPassword = generateTempPassword();

				// 임시 비밀번호 암호화
				String encryptedPassword = PasswordUtil.encryptSHA256(tempPassword);

				// DB에 임시 비밀번호 저장
				param.put("NEW_PASSWORD", encryptedPassword);

				int updated = memberService.updatePasswordByAdmin(param);

				if (updated > 0) {
					// 이메일 발송
					try {
						String toEmail = param.get("EMAIL").toString();
						String memberId = memberInfo.get("MEMBER_ID").toString();

						// 임시비밀번호 유효기간 1분
						long expireTime = System.currentTimeMillis() + (1 * 60 * 1000);
						tempPasswordCache.put(memberId, expireTime);

						String subject = "DDD.D 관리자 임시 비밀번호 발급";
						String emailBody = buildPasswordEmailBody(memberId, tempPassword);

						mailService.sendMail(toEmail, subject, emailBody);

						resultMap.put("RESULT", "SUCCESS");

					} catch (Exception mailEx) {
						System.err.println("이메일 발송 실패: " + mailEx.getMessage());
						mailEx.printStackTrace();
						resultMap.put("RESULT", "MAIL_FAIL");
					}
				} else {
					resultMap.put("RESULT", "UPDATE_FAIL");
				}
			} else {
				resultMap.put("RESULT", "NOT_FOUND");
			}

			result.addDataSet("ds_findResult", resultMap);

		} catch (Exception e) {
			e.printStackTrace();
			result.setErrorCode(-1);
			result.setErrorMsg("비밀번호 찾기 중 오류 발생: " + e.getMessage());
		}

		return result;
	}


	/**
	 * 임시 비밀번호 이메일 본문 생성 By. PJ 10.02
	 */
	private String buildPasswordEmailBody(String memberId, String tempPassword) {
		StringBuilder sb = new StringBuilder();
		sb.append("안녕하세요. DDD.D 관리자 페이지입니다.\n\n");
		sb.append("임시 비밀번호 발급 요청에 따라 새로운 비밀번호를 발급해드립니다.\n\n");
		sb.append("━━━━━━━━━━━━━━━━━━━━━━\n");
		sb.append("아이디: ").append(memberId).append("\n");
		sb.append("임시 비밀번호: ").append(tempPassword).append("\n");
		sb.append("유효기간: 1분\n");
		sb.append("━━━━━━━━━━━━━━━━━━━━━━\n\n");
		sb.append("※ 보안을 위해 로그인 후 반드시 비밀번호를 변경해주세요.\n");
		sb.append("※ 본인이 요청하지 않은 경우 즉시 관리자에게 문의하세요.\n\n");
		sb.append("감사합니다.\n");
		sb.append("DDD.D 관리팀");
		return sb.toString();
	};

	/**
	 * 임시 비밀번호 생성 (10자리) //by.Pj 10.01
	 */
	private String generateTempPassword() {
		String upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		String lowerCase = "abcdefghijklmnopqrstuvwxyz";
		String numbers = "0123456789";
		String special = "!@#$";
		String allChars = upperCase + lowerCase + numbers + special;

		StringBuilder tempPassword = new StringBuilder();
		java.util.Random random = new java.util.Random();

		// 각 카테고리에서 최소 1개씩
		tempPassword.append(upperCase.charAt(random.nextInt(upperCase.length())));
		tempPassword.append(lowerCase.charAt(random.nextInt(lowerCase.length())));
		tempPassword.append(numbers.charAt(random.nextInt(numbers.length())));
		tempPassword.append(special.charAt(random.nextInt(special.length())));

		// 나머지 6자리
		for (int i = 0; i < 6; i++) {
			tempPassword.append(allChars.charAt(random.nextInt(allChars.length())));
		}

		// 문자 섞기
		char[] arr = tempPassword.toString().toCharArray();
		for (int i = arr.length - 1; i > 0; i--) {
			int j = random.nextInt(i + 1);
			char temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
		}

		return new String(arr);
	}

}
