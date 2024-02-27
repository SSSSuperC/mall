// pages/category/index.js
//导入request请求工具类
import {getBaseUrl,requestUtil} from '../../utils/requestUtil.js';
import regeneratorRuntime from '../../lib/runtime/runtime.js';


// pages/product_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl:'',
    productObj:{},
    activeIndex:0
  },

  productInfo:{

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const baseUrl = getBaseUrl();
    this.setData({
      baseUrl
    })
    this.getProductDetail(options.id)
  },

  //点击事件 商品加入购物车
  handleCarAdd(){
    this.setCartAdd();
    wx.showToast({
      title: '添加购物车成功',
      icon:'success',
      mask:'true'
    })
  },

  //点击立即购买
  handleBuy(){
    this.setCartAdd();
    wx.switchTab({
      url: '/pages/cart/index',
    })
  },

  //添加购物车内容封装
  setCartAdd()
  {
    let cart = wx.getStorageSync('cart')||[];
    //console.log("cart = "+cart);
    let index = cart.findIndex(v=>v.id===this.productInfo.id);
    if(index == -1)//购物车不存在当前商品
    {
      this.productInfo.num = 1;
      this.productInfo.checked=true;
      cart.push(this.productInfo);
    }
    else//购物车存在该商品
    {
      cart[index].num++;
    }
    wx.setStorageSync('cart', cart);//把购物车添加到缓存中
  },

  handleItemTap(e)
  {
    const {index} = e.currentTarget.dataset;
    // console.log(index);
    this.setData({
      activeIndex:index
    })
  },

  // 获取商品详情
  async getProductDetail(id){
    const result = await requestUtil({
      url:'/product/detail',
      data:{id},
      method:"GET"
    });
    this.productInfo = result.message;
    this.setData({
      productObj:result.message,
    })
    
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