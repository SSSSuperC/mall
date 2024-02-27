package com.cmall.mall.controller;

import com.cmall.mall.entity.R;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//测试
@RestController
@RequestMapping("/cmall")
public class TestController
{
    //测试
    @GetMapping("/test")
    public R test()
    {
        return R.ok("成功");
    }
}
