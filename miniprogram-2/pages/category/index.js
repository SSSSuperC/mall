// pages/category/index.js
//导入request请求工具类
import {getBaseUrl,requestUtil} from '../../utils/requestUtil.js';
import regeneratorRuntime from '../../lib/runtime/runtime.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop:0,
    currentIndex:0,//当前选中菜单的索引
    baseUrl:'',
    leftMenuList:[],//左侧菜单数据
    rightContext:[]//右侧数据
  },
  //所有商品类别数据
  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const baseUrl = getBaseUrl();
    this.setData({
      baseUrl
    })
    this.getCates()
  },



  // 获取商品分类
  async getCates(){
    const result = await requestUtil({
      url:'/bigType/findCategories',
      mehtod:"GET"
    });
    this.Cates=result.message;
    let leftMenuList=this.Cates.map(v=>
      v.name
    )
    let rightContext = this.Cates[0].smallTypeList;
    this.setData({
      leftMenuList,
      rightContext,
      scrollTop:0
    })
    
  },

  // 从首页跳转获取商品分类
  async getCates2(index){
    const result = await requestUtil({
      url:'/bigType/findCategories',
      mehtod:"GET"
    });
    this.Cates=result.message;
    let leftMenuList=this.Cates.map(v=>
      v.name
    )
    let rightContext = this.Cates[index].smallTypeList;
    this.setData({
      leftMenuList,
      rightContext,
      scrollTop:0,
      currentIndex:index
    })
    
  },

  //左侧菜单点击切换事件
  handleMenuItemChange(e){
    // console.log(e)
    const {index} = e.currentTarget.dataset;
    let rightContext = this.Cates[index].smallTypeList;
    this.setData({
      currentIndex:index,
      rightContext
    })
    // console.log("index = "+index)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const app=getApp();
    const {index} = app.globalData;
    if(index!=-1) //从首页大类跳转
    {
      this.getCates2(index);
      app.globalData.index=-1;//重置
    }
    // console.log("index = " + index);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})