package com.cmall.mall.config;

import com.cmall.mall.interceptor.SysInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebAppConfigurer implements WebMvcConfigurer
{
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry)
    {
        registry.addResourceHandler("/image/swiper/**").addResourceLocations("file:C:\\Users\\陈衍鑫\\Desktop\\商城项目\\cmall\\swiperImgs\\");
        registry.addResourceHandler("/image/bigType/**").addResourceLocations("file:C:\\Users\\陈衍鑫\\Desktop\\商城项目\\cmall\\bigTypeImgs\\");
        registry.addResourceHandler("/image/product/**").addResourceLocations("file:C:\\Users\\陈衍鑫\\Desktop\\商城项目\\cmall\\productImgs\\");
        registry.addResourceHandler("/image/productSwiperImgs/**").addResourceLocations("file:C:\\Users\\陈衍鑫\\Desktop\\商城项目\\cmall\\productSwiperImgs\\");
        registry.addResourceHandler("/image/productIntroImgs/**").addResourceLocations("file:C:\\Users\\陈衍鑫\\Desktop\\商城项目\\cmall\\productIntroImgs\\");
        registry.addResourceHandler("/image/productParaImgs/**").addResourceLocations("file:C:\\Users\\陈衍鑫\\Desktop\\商城项目\\cmall\\productParaImgs\\");
    }

    @Bean
    public SysInterceptor sysInterceptor()
    {
        return new SysInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        String[] patterns=new String[]
                {"/adminLogin","/product/**","/bigType/**","/user/wxlogin","/weixinpay/**","/image/**"};
        registry.addInterceptor(sysInterceptor())
                .addPathPatterns("/**")
                .excludePathPatterns(patterns);
    }
}
