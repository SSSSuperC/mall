package com.cmall;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.cmall.mall.mapper")
public class CmallApplication {

    public static void main(String[] args) {
        SpringApplication.run(CmallApplication.class, args);
    }

}
