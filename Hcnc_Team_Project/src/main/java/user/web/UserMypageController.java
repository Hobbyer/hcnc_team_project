package user.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import admin.util.PasswordUtil;
import user.mail.UserMailService;
import user.service.UserMemberService;


@Controller
@RequestMapping("/mypage")
public class UserMypageController {
    @Autowired
	private UserMemberService userMemberService;
	@Autowired
	private UserMailService mailService;

    @RequestMapping(value="/home.do",method = RequestMethod.GET)
	public ModelAndView myPage (HttpServletRequest request) {
		ModelAndView mv = new ModelAndView();
		ObjectMapper objectMapper = new ObjectMapper();
		HttpSession session = request.getSession(false);
		try {
			if(session != null) {
				Map<String, Object> info = (Map<String, Object>) session.getAttribute("userInfo");
				if(info != null) {
					mv.addObject("status",200);
					String id = (String) info.get("MEMBER_ID");
					Map<String, Object> user = userMemberService.selectUserInfoByUser(id);
                    List<Map<String, Object>> orders = userMemberService.selectMypageShippingInfoByUser(id);
					mv.addObject("user",user);
                    mv.addObject("orders",objectMapper.writeValueAsString(orders));
                    System.out.println(orders);
					mv.setViewName("mypage/mypage");
				}
				mv.setViewName("redirect:/login.do");
			} else {
				mv.setViewName("redirect:/login.do");
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
		mv.setViewName("mypage/mypage");
		return mv;
	}
    
    @RequestMapping(value="/update.do",method = RequestMethod.GET)
	public ModelAndView memberUpdatePage(HttpServletRequest request) {
    	ModelAndView mv = new ModelAndView();
		ObjectMapper objectMapper = new ObjectMapper();
		HttpSession session = request.getSession(false);
		try {
			if(session != null) {
				Map<String, Object> info = (Map<String, Object>) session.getAttribute("userInfo");
				if(info != null) {
					mv.addObject("status",200);
					String id = (String) info.get("MEMBER_ID");
					Map<String, Object> user = userMemberService.selectUserInfoByUser(id);
					mv.addObject("user",objectMapper.writeValueAsString(user));
					mv.setViewName("mypage/mypage");
				}
				mv.setViewName("redirect:/login.do");
			} 
		} catch (Exception e) {
			// TODO: handle exception
		}
    	
    	mv.setViewName("mypage/update");
    	return mv;
    }
    
    @RequestMapping("/updateMemberByUser.do")
	public ModelAndView updateMemberByUser(
            @RequestParam(value="password",required=false) String password,
            @RequestParam(value="name", required=false) String name,
            @RequestParam(value="email", required=false) String email,
            @RequestParam(value="phone", required=false) String phone,
            @RequestParam(value="birth", required=false) String birth,
			HttpServletRequest request
    ) {
		ModelAndView mv = new ModelAndView("jsonView");
		HttpSession session = request.getSession(false);
        try{
            Map<String, Object> users = (Map<String, Object>) session.getAttribute("userInfo");
            Map<String, Object> info = new HashMap();
			String id = (String) users.get("MEMBER_ID");
            if(password != null && !password.equals("")) {
            	System.out.println(password);
            	info.put("password",PasswordUtil.encryptSHA256(password));
        	}
			info.put("id",id);
            info.put("name",name);
            info.put("email",email);
            info.put("phone",phone);
            info.put("birth",birth);
			
            int count = userMemberService.updateMemberByUser(info);
            if(count == 1) {
            	mv.addObject("status",200);
            }
        }catch(Exception e){
            System.out.println(e);
        }
		
		return mv;
	}
    
    @RequestMapping(value="/point.do",method = RequestMethod.GET)
	public ModelAndView myPagePoint(HttpServletRequest request) {
    	ModelAndView mv = new ModelAndView();
		HttpSession session = request.getSession(false);
		try {
			Map<String, Object> users = (Map<String, Object>) session.getAttribute("userInfo");
			String id = (String) users.get("MEMBER_ID");
			String userName = (String) users.get("USER_NAME");
			int pointTotal = userMemberService.selectTotalPointByUser(id);
			int spendTotal = userMemberService.selectTotalSpendByUser(id);
			List<Map<String, Object>> pointList = userMemberService.selectPointListByUser(id);
			List<Map<String, Object>> couponList = userMemberService.selectCouponListByUser(id);
			mv.addObject("pointTotal", pointTotal);
			mv.addObject("userName", userName);
			mv.addObject("spendTotal", spendTotal);
			mv.addObject("pointList", pointList);
			mv.addObject("couponList", couponList);
		} catch (Exception e) {
			// TODO: handle exception
		}
		
    	mv.setViewName("point/pointList");
    	return mv;
    }
}