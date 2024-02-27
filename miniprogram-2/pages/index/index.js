//导入request请求工具类
import {getBaseUrl,requestUtil} from '../../utils/requestUtil.js';
import regeneratorRuntime from '../../lib/runtime/runtime.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数组
    swiperList:[],
    baseUrl:'',
    //商品展示页数组
    bigTypeList:[],
    bigTypeList_row1:[],
    bigTypeList_row2:[],
    hotProductList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    const baseUrl = getBaseUrl();
    this.setData({
      baseUrl
    })
    //发送异步请求，获取后端数据
    // wx.request({
    //   url: 'http://localhost:8080/product/findSwiper',
    //   method:'GET',
    //   success:(result)=>{
    //     console.log(result)
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   }
    // })
    
    this.getSwiperList();
    this.getBigTypeList();
    this.getHotProductList();
  },

  //大类点击事件 跳转商品分类页面
  handleTypeJump(e){
    const {index} = e.currentTarget.dataset;
    // console.log("index = " + index)
    const app = getApp();
    app.globalData.index = index;
    wx.switchTab({
      url: '/pages/category/index',
    })
  },

  async getSwiperList(){
//     requestUtil({url: '/product/findSwiper',method:"GET"})
// .then(result=>{ 
//   const baseUrl = getBaseUrl;
//   this.setData({
//   swiperList:result.message
//   })
// })
    const result = await requestUtil({
      url:'/product/findSwiper',
      method:"GET"
    });
    this.setData({
      swiperList:result.message,
    })
  },

  // 获取热卖商品
  async getHotProductList(){
        const result = await requestUtil({
          url:'/product/findHot',
          method:"GET"
        });
        this.setData({
          hotProductList:result.message,
        })
      },


  async getBigTypeList(){
    const result = await requestUtil({
      url:'/bigType/findAll',
      method:"GET"
    });
    //console.log(result)
    const bigTypeList = result.message;
    const bigTypeList_row1 = bigTypeList.filter((item,index)=>{
      return index<5;
    })
    const bigTypeList_row2 = bigTypeList.filter((item,index)=>{
      return index>=5;
    })
    this.setData({
      bigTypeList,
      bigTypeList_row1,
      bigTypeList_row2,
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})