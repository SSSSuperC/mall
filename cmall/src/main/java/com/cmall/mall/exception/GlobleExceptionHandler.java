package com.cmall.mall.exception;

import com.cmall.mall.entity.R;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@ControllerAdvice
@ResponseBody
public class GlobleExceptionHandler {
    @ExceptionHandler(value = Exception.class)
    public R exceptionHandler(HttpServletRequest request,Exception e)
    {
        return R.error("服务端异常 请联系管理员" + "<br/>" + e.getMessage());
    }
}
