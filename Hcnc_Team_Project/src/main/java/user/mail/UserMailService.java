package user.mail;
import java.util.Properties;
import javax.mail.*;
import javax.mail.internet.*;
import org.springframework.stereotype.Service;

@Service
public class UserMailService {
		private final String host = "smtp.naver.com";
	    private final String username = "wpvos123@naver.com";
	    private final String password = "DLQD7YBGS949";

	    

	    public void sendMail(String to, String subject, String text) {
	        // SMTP 서버 설정
	        Properties props = new Properties();
	        props.put("mail.smtp.host", host);
	        props.put("mail.smtp.port", "465");
	        props.put("mail.smtp.auth", "true");
	        props.put("mail.smtp.ssl.enable", "true");
	        props.put("mail.smtp.starttls.enable", "true");
	        props.put("mail.smtp.ssl.trust", host);

	        // 인증 정보 등록
	        Session session = Session.getInstance(props, new Authenticator() {
	            protected PasswordAuthentication getPasswordAuthentication() {
	                return new PasswordAuthentication(username, password);
	            }
	        });

	        try {
	            // 메일 메시지 구성
	            Message message = new MimeMessage(session);
	            message.setFrom(new InternetAddress(username, "메일 발신자"));
	            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
	            message.setSubject(subject);
	            message.setText(text);

	            // 전송
	            Transport.send(message);

	            System.out.println("메일 전송 성공!");
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	    }
}
