package com.cmall.mall.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.List;

/**
 * 商品大类
 */
@TableName("t_bigType")
@Data
public class BigType {

    private Integer id; // 编号

    private String name; // 名称

    private String remark; // 备注

    private String image="default.jpg"; // 封面图片

    //TableField select = false是指该属性为附属属性，查询时不查询
    @TableField(select = false)
    private List<SmallType> smallTypeList;//商品小类集合


}
