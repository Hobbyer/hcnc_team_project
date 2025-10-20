package user.config;

import java.util.Arrays;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCache;
import org.springframework.cache.support.SimpleCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableCaching //메모리에 데이터를 미리 적재 spring cache
public class UserCacheConfig {
    
    @Bean
    public CacheManager cacheManager() {
        SimpleCacheManager cacheManager = new SimpleCacheManager();
        cacheManager.setCaches(Arrays.asList(
            new ConcurrentMapCache("categories"),//카테고리 서브카테고리
            new ConcurrentMapCache("subCategories"),
            new ConcurrentMapCache("banners"),//메인도
            new ConcurrentMapCache("mainNewProducts"),//메인 신상품
            new ConcurrentMapCache("mainRecommendProducts"),//메인 추천상품
            new ConcurrentMapCache("mainHotProducts")//메인 인기상품
        ));
        return cacheManager;
    }
}