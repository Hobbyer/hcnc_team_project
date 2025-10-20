package user.web;

import java.security.MessageDigest;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.util.MultiValueMap;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.ModelAndView;
import lombok.Data;

import user.mail.UserMailService;
import user.service.UserMemberService;

@Controller
public class UserMemberController {
	@Autowired
	private UserMemberService userMemberService;
	@Autowired
	private UserMailService mailService;

	private static final String CLIENT_ID = "f8098d531cc49f4deb438dc740363565";
    private static final String REDIRECT_URI = "http://localhost:8080/kakaoLogin.do";
	
	// 이메일 인증번호를 서버메모리에 저장하기위한 Class
	public class CodeInfo {
	    private int code;           // 인증번호
	    private long createdTime;   // 발급 시간 (밀리초)

	    public CodeInfo(int code, long createdTime) {
	        this.code = code;
	        this.createdTime = createdTime;
	    }

	    public int getCode() {
	        return code;
	    }

	    public long getCreatedTime() {
	        return createdTime;
	    }
	}
	
	public class TokenInfo {
	    private String code;           // 인증번호
	    private long createdTime;   // 발급 시간 (밀리초)

	    public TokenInfo(String code, long createdTime) {
	        this.code = code;
	        this.createdTime = createdTime;
	    }

	    public String getCode() {
	        return code;
	    }

	    public long getCreatedTime() {
	        return createdTime;
	    }
	}
	
	private static final Map<String, CodeInfo> emailAuthMap = new ConcurrentHashMap();
	private static final Map<String, TokenInfo> socialAuthMap = new ConcurrentHashMap();
	
	public void saveAuthCode(String email, int code) {
	    emailAuthMap.put(email, new CodeInfo(code, System.currentTimeMillis()));
	}
	
	public void saveSocialAuthToken(String key ,String token) {
		socialAuthMap.put(key, new TokenInfo(token, System.currentTimeMillis()));
	}
	
	public boolean verifyAuthCode(String email, int inputCode) {
	    CodeInfo info = emailAuthMap.get(email);
		if (info != null && info.getCode() == inputCode) {
        emailAuthMap.remove(email);
        return true;
    }
    	return false;
	}
	
	public String verifyAuthToken(String uuid) {
		TokenInfo info = socialAuthMap.get(uuid);
		if (info != null) {
			return info.getCode();
		}
		return "";
	}
	
	public static int RandomCode () {
		int number = (int)(Math.random() * 900000) + 100000;
		return number;
	}
	
	 public static String sha256(String input) {
	        try {
	            MessageDigest md = MessageDigest.getInstance("SHA-256");
	            byte[] hash = md.digest(input.getBytes("UTF-8"));

	            StringBuilder hexString = new StringBuilder();
	            for (byte b : hash) {
	                String hex = String.format("%02x", b);
	                hexString.append(hex);
	            }
	            return hexString.toString();

	        } catch (Exception e) {
	            throw new RuntimeException(e);
	        }
	}

	private void sendVerificationEmail(String to, ModelAndView mv) throws Exception {
		String subject = "DOO.D 이메일 인증번호";
		String text = "DOO.D 이메일 인증번호: ";
		int code = RandomCode();
		System.out.println(code);
		saveAuthCode(to, code);
		mailService.sendMail(to, subject, text + code); 
		mv.addObject("status", 200);
		mv.addObject("to", to);
	}
	
	// LOGIN 로그인
	@RequestMapping(value="/login.do", method = RequestMethod.GET)
	public ModelAndView loginPage() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("sign/login");
		return mv;
	}
	
	@RequestMapping("/selectLoginByUser.do")
	public ModelAndView selectLoginByUser(@RequestParam("id") String id,
            @RequestParam("password") String password, HttpServletRequest request) {
		ModelAndView mv = new ModelAndView();
		Map<String, Object> login = new HashMap();
		login.put("id",id);
		login.put("password",sha256(password));
		try{
			Map<String, Object> info = userMemberService.selectLoginByUser(login);
			if(info == null) {
				mv.addObject("status", 404);
			}
			if("O".equals(info.get("PASSWORD"))) {
				HttpSession session = request.getSession();
				userMemberService.updateLastLoginByUser(id);
				Map<String, Object> user = userMemberService.selectUserInfoByUser(id);
				info.put("userType", "user");
				session.setAttribute("userInfo", user);
				mv.addObject("status", 200);
				mv.addObject("result", info);
			}
		}catch (Exception e){
			System.out.println(e);
			mv.addObject("status", 500);
		}
		mv.setViewName("jsonView");
		return mv;
	}

	@RequestMapping(value = "/kakaoLogin.do", method = RequestMethod.GET)
    public ModelAndView kakaoLogin(@RequestParam String code,HttpServletRequest request) {
        ModelAndView mv = new ModelAndView(); // AJAX 응답을 위한 설정
        
        RestTemplate restTemplate = new RestTemplate();
        
        // HTTP 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        
        // HTTP 바디 설정 (카카오 API에 보낼 파라미터)
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", CLIENT_ID);
        params.add("redirect_uri", REDIRECT_URI);
        params.add("code", code);
        
        // 요청 엔티티 생성
        HttpEntity<MultiValueMap<String, String>> kakaoRequest = new HttpEntity<>(params, headers);

        try {
            // 카카오 토큰 API에 POST 요청
            String kakaoTokenUrl = "https://kauth.kakao.com/oauth/token";
            ResponseEntity<String> response = restTemplate.exchange(
                kakaoTokenUrl,
                HttpMethod.POST,
                kakaoRequest,
                String.class
            );
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> tokenInfo = objectMapper.readValue(response.getBody(), Map.class);
            String tokenOrigin = (String) tokenInfo.get("id_token");
			String token = tokenOrigin.split("\\.")[0];
            int count = userMemberService.selectIdCheckByUser(token);
            if(count == 0) {
            	mv.addObject("status", 200);
                System.out.println(response.getBody());
                mv.addObject("data", tokenInfo);
                String uuid = UUID.randomUUID().toString().replace("-", "").substring(0, 8);
                
                saveSocialAuthToken(uuid,token);
                mv.setViewName("redirect:/sign.do?uuid="+uuid);
                return mv;
            }
            if(count == 1) {
            	HttpSession session = request.getSession();
            	userMemberService.updateLastLoginByUser(token);
				Map<String, Object> user = userMemberService.selectUserInfoByUser(token);
				session.setAttribute("userInfo", user);
				mv.addObject("status", 200);
				mv.setViewName("redirect:/main.do");
				return mv;
            }
        } catch (Exception e) {
            // 실패 응답 처리
            mv.addObject("status", 500);
            mv.addObject("message", "카카오 토큰을 가져오는 데 실패했습니다.");
            e.printStackTrace();
        }

        return mv;
    }
	
	// FIND 회원정보 찾기
	@RequestMapping("/findId.do")
	public ModelAndView findIdPage() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("sign/find-id");
		return mv;
	}

	@RequestMapping("/findPw.do")
	public ModelAndView findPwPage() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("sign/find-pw");
		return mv;
	}

	@RequestMapping("/updatePasswordByUser.do")
	public ModelAndView updateUserPassword(
		@RequestParam("id") String id,
		@RequestParam("password") String password
	) {
		ModelAndView mv = new ModelAndView();
		Map<String, Object> param = new HashMap();
		param.put("id",id);
		param.put("password",sha256(password));
		int count = userMemberService.updatePasswordByUser(param);
		if(count == 1){
			mv.addObject("status",200);
		} else{
			mv.addObject("status",409);
		}
		mv.setViewName("jsonView");
		return mv;
	}
	
	// SIGN 회원가입
	@RequestMapping(value="/sign.do",method = RequestMethod.GET)
	public ModelAndView signUser (@RequestParam(value="uuid", required=false) String uuid) {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("sign/sign-up");
		return mv;
	}

	@RequestMapping(value = "/insertSignUpByUser.do", method = RequestMethod.POST)
    public ModelAndView insertSignUpByUser(
            @RequestParam("id") String id,
            @RequestParam("password") String password,
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("phone") String phone,
            @RequestParam("birth") String birth,
            @RequestParam("gender") String gender,
            @RequestParam("loginType") String loginType,
            @RequestParam("uuid") String uuid
    ) {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("jsonView");
        Map<String, Object> sign = new HashMap();
        sign.put("id", id);
        sign.put("password", sha256(password));
        sign.put("name", name);
        sign.put("email", email);
        sign.put("phone", phone);
        sign.put("birth", birth);
        sign.put("gender", gender);
        sign.put("loginType",loginType);
        
        try {
        	if(loginType.equals("KAKAO")) {
        		String token = verifyAuthToken(uuid);
        		sign.put("id", token);
        	};
        	int count = userMemberService.insertSignUpByUser(sign);
        	if(count == 1) {
        		mv.addObject("status", 200);
        	} else {
        		mv.addObject("status", 500);
        	}
        } catch (Exception e) {
        	mv.addObject("status", 500);
        	System.out.println(e);
        }
        return mv;
    }

	@RequestMapping("/selectIdCheckByUser.do")
	public ModelAndView selectIdCheckByUser (@RequestParam("id") String id) {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");
		try{
			int idCnt = userMemberService.selectIdCheckByUser(id);
			mv.addObject("count", idCnt);
			if(idCnt == 0){
				mv.addObject("status", 200);
			} else {
				mv.addObject("status", 409);
			}
		}catch(Exception e){
			System.out.println(e);
		}
		return mv;
	}

	@RequestMapping("/selectEmailCheckByUser.do")
	public ModelAndView selectEmailCheckByUser(
	        @RequestParam("to") String to,
			@RequestParam(value="type") String type,
			@RequestParam(value="id", required=false) String id
        ) {
	    ModelAndView mv = new ModelAndView("mailResult");
	    mv.setViewName("jsonView");
	    try {
			if(type.equals("sign")){
				int emailChk = userMemberService.selectEmailCheckByUser(to);	
				if(emailChk == 0){
					sendVerificationEmail(to,mv);
				} else {
					mv.addObject("status", 409);
				}
			}
			if(type.equals("find-id")){
				int emailChk = userMemberService.selectEmailCheckByUser(to);
				if(emailChk == 1){
					sendVerificationEmail(to,mv);
				} else {
					mv.addObject("status", 409);
				}
			}
			if(type.equals("find-pw") && id != null){
				int emailChk = userMemberService.selectEmailCheckByUser(to);
				int idCnt = userMemberService.selectIdCheckByUser(id);
				if(emailChk + idCnt == 2){
					sendVerificationEmail(to,mv);
				} else {
					mv.addObject("status", 409);
				}
			}
		} catch (Exception e) {
			System.out.println(e);
		}
	    return mv;
	}
	
	@RequestMapping("/selectVerifyAuthByUser.do")
	public ModelAndView selectVerifyAuthByUser(
			@RequestParam("to") String to,
			@RequestParam("code") int code,
			@RequestParam("type") String type
			) {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("jsonView");
		boolean isSame = verifyAuthCode(to,code);
		mv.addObject("result", isSame);
		mv.addObject("resultInfo", null);
		String[] findTypes = {"find-id", "find-pw"};
		if(Arrays.asList(findTypes).contains(type) && isSame){
			Map<String, Object> info = userMemberService.selectFindIdByUser(to);
			mv.addObject("resultInfo", info);
		}
		return mv;
	}
	
	@RequestMapping("/mypage/updateWithDrawByUser.do")
	public ModelAndView updateWithDrawByUser(HttpServletRequest request) {
		ModelAndView mv = new ModelAndView("jsonView");
		try {
			HttpSession session = request.getSession(false);
			if(session != null) {
				Map<String,Object> userInfo = (Map<String, Object>) session.getAttribute("userInfo");
				String id = (String) userInfo.get("MEMBER_ID");
				int count = userMemberService.updateWithDrawByUser(id);
				if(count == 1) {
					session.invalidate();
					mv.addObject("status",200);
				} else {
					mv.addObject("status",400);	
				}
			} else {
				mv.addObject("status",404);
			}
						
		} catch (Exception e) {
			System.out.println(e);
		}
		return mv;
	}
	
	 @GetMapping("/logoutByUser.do")
	    public String logout(HttpSession session) {
	        session.invalidate(); // 세션 삭제
	        return "redirect:/main.do"; // 로그아웃 후 메인 페이지로 이동
	    }
	
}
