package admin.service;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

import admin.mapper.BannerMapper;
import admin.util.UploadFile;
import admin.util.UploadFile.ImageType;
import admin.util.UploadResult;

@Service
public class BannerService {
    
    @Autowired
    private BannerMapper bannerMapper;
    @Autowired
    private UploadFile uploadFile;
    
    public List<Map<String, Object>> selectBannerListByAdmin(Map<String, Object> dsSearch) {
        return bannerMapper.selectBannerListByAdmin(dsSearch);
    }
    

    public NexacroResult previewBannerFile(MultipartFile file) {
        NexacroResult result = new NexacroResult();
        
        if (file == null || file.isEmpty()) {
            result.setErrorCode(9901);
            result.setErrorMsg("파일이 없습니다.");
            return result;
        }
        
        try {
            // PREVIEW 폴더에 임시 저장
            UploadResult ur = uploadFile.uploadToFile(file, ImageType.PREVIEW);
            String fileUrl = ur.getFileName();
            
            Map<String, Object> fileInfo = new HashMap<>();
            fileInfo.put("IMG_PATH", fileUrl);
            fileInfo.put("IMG_ORIGIN_NAME", file.getOriginalFilename());
            
            result.addDataSet("ds_file", fileInfo);
            result.setErrorCode(0);
            result.setErrorMsg("미리보기 업로드 성공");
            System.out.println("저 컴퓨터서버에 저장되는건 확인완료");
            
        } catch (Exception e) {
            e.printStackTrace();
            result.setErrorCode(-1);
            result.setErrorMsg("업로드 실패: " + e.getMessage());
        }
        
        return result;
    }
    
    // Insert 로직을 Service로 이동 형창씨꺼
    public NexacroResult insertBannerByAdmin(Map<String, Object> dsBWrite, List<Map<String, Object>> dsFile) {
        NexacroResult result = new NexacroResult();
        try {
            if (dsBWrite != null) {
                // 파일이 있으면 preview → banner 폴더로 이동
                if (dsFile != null && !dsFile.isEmpty()) {
                    String fileUrl = (String) dsFile.get(0).get("IMG_PATH");
                    
                    // preview에서 banner로 파일 이동
                    uploadFile.moveFile(fileUrl, ImageType.BANNER);
                    
                    // 이동된 파일명 추출
                    String fileName = uploadFile.extractFileName(fileUrl);
                    String finalPath = "http://192.168.0.150:5000/dood/banner/" + fileName;
                    
                    // dsBWrite에 IMG_PATH 설정
                    dsBWrite.put("IMG_PATH", finalPath);
                    dsBWrite.put("IMG_ORIGIN_NAME", dsFile.get(0).get("IMG_ORIGIN_NAME"));
                    dsBWrite.put("IMG_ATTACHED_NAME", fileName);
                }
                
                // URL 정규화 처리
                normalizeLinkedUrl(dsBWrite);
                
                int insertCount = bannerMapper.insertBannerByAdmin(dsBWrite);
                if (insertCount > 0) {
                    result.setErrorCode(0);
                    result.setErrorMsg("배너 작성 완료");
                } else {
                    result.setErrorCode(-1);
                    result.setErrorMsg("배너 작성 실패");
                }
            } else {
                result.setErrorCode(-1);
                result.setErrorMsg("데이터가 없습니다.");
            }
        } catch(Exception e) {
            e.printStackTrace();
            result.setErrorCode(-1);
            result.setErrorMsg("배너 작성 실패");
        }
        return result;
    }
    
    // Update 로직
    public NexacroResult updateBannerByAdmin(Map<String, Object> dsBUpdate, List<Map<String, Object>> dsFile) {
        NexacroResult result = new NexacroResult();
        try{
            // 새 파일이 업로드된 경우에만 파일 이동
            if (dsFile != null && !dsFile.isEmpty()) {
                String fileUrl = (String) dsFile.get(0).get("IMG_PATH");
                
                // preview에서 banner로 파일 이동 : 조건추거
                if (fileUrl != null && fileUrl.contains("/preview/")) {
                    uploadFile.moveFile(fileUrl, ImageType.BANNER);
                    
                    String fileName = uploadFile.extractFileName(fileUrl);
                    String finalPath = "http://192.168.0.150:5000/dood/banner/" + fileName;
                    
                    // dsBUpdate에 IMG_PATH 설정
                    dsBUpdate.put("IMG_PATH", finalPath);
                    dsBUpdate.put("IMG_ORIGIN_NAME", dsFile.get(0).get("IMG_ORIGIN_NAME"));
                    dsBUpdate.put("IMG_ATTACHED_NAME", fileName);
                }
                
                String fileName = uploadFile.extractFileName(fileUrl);
                String finalPath = "http://192.168.0.150:5000/dood/banner/" + fileName;
                
                // dsBUpdate에 IMG_PATH 설정
                dsBUpdate.put("IMG_PATH", finalPath);
                dsBUpdate.put("IMG_ORIGIN_NAME", dsFile.get(0).get("IMG_ORIGIN_NAME"));
                dsBUpdate.put("IMG_ATTACHED_NAME", fileName);
            }
            // 파일이 없으면 기존 이미지 유지
            
            // URL 정규화 처리
            normalizeLinkedUrl(dsBUpdate);
            
            int updateCount = bannerMapper.updateBannerByAdmin(dsBUpdate);
            if (updateCount > 0) {
                result.setErrorCode(0);
                result.setErrorMsg("배너 수정 완료");
            } else {
                result.setErrorCode(-1);
                result.setErrorMsg("배너 수정 실패");
            }
        } catch(Exception e){
            e.printStackTrace();
            result.setErrorCode(-1);
            result.setErrorMsg("배너 수정 실패");
        }
        return result;
    }
    
    private void normalizeLinkedUrl(Map<String, Object> bannerData) {
        String linkedUrl = (String) bannerData.get("LINKED_URL");
        if (linkedUrl != null && !linkedUrl.trim().isEmpty()) {
            linkedUrl = addProtocolIfNeeded(linkedUrl);
            bannerData.put("LINKED_URL", linkedUrl);
        }
    }
    
    private String addProtocolIfNeeded(String url) {
        url = url.trim();
        
        if (url.startsWith("http://") || url.startsWith("https://")) {
            return url;
        }
        
        if (url.startsWith("www.")) {
            return "https://" + url;
        } else {
            return "https://www." + url;
        }
    }


    public Map<String, Object> selectBannerDetailByAdmin(String bannerId) {
        return bannerMapper.selectBannerDetailByAdmin(bannerId);
    }

    public NexacroResult deleteBannerByAdmin(List<Map<String, Object>> bannerList) {
        NexacroResult result = new NexacroResult();
        try {
            int deleteCnt = 0;
            
            for (Map<String, Object> banner : bannerList) {                
                
            	String bannerId = String.valueOf(banner.get("BANNER_ID"));
                
                Map<String, Object> existingBanner = bannerMapper.selectBannerDetailByAdmin(bannerId);
                
                if (existingBanner != null) {
                    // 이미지 파일 삭제
                    String imgPath = (String) existingBanner.get("IMG_PATH"); // 컬럼명 수정
                    if (imgPath != null && !imgPath.isEmpty()) {
                        try {
                            String fileName = uploadFile.extractFileName(imgPath);
                            uploadFile.deleteFile(fileName, ImageType.BANNER);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                    
                    bannerMapper.deleteBannerByAdmin(banner);
                    deleteCnt++;
                }
            }
            
            result.setErrorCode(0);
            result.setErrorMsg(deleteCnt + "건 삭제 완료");
            
        } catch (Exception e) {
            e.printStackTrace();
            result.setErrorCode(-1);
            result.setErrorMsg("배너 삭제 실패");
        }
        return result;
    }
	

}