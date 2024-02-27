// pages/search/index.js
//导入request请求工具类
import {getBaseUrl,requestUtil} from '../../utils/requestUtil.js';
import regeneratorRuntime from '../../lib/runtime/runtime.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList:[],
    inputValue:"",
    isFocus:false
  },

  TimeoutId:-1,

  handleInput(e)
  {
    //console.log(e);
    const {value} = e.detail;
    if(!value.trim())
    {
      this.setData({
        productList:[],
        isFocus:false
      })
      return;
    }

    this.setData({
      isFocus:true
    })

    clearTimeout(this.TimeoutId);
    this.TimeoutId = setTimeout(()=>{
      this.search(value)
    },1000)
    
  },
  //点击 取消按钮
  handleCancel(){
    this.setData({
      productList:[],
      inputValue:"",
      isFocus:false
    })
  },

   // 获取商品详情
    async search(q){
      const result = await requestUtil({
        url:'/product/search',
        data:{q}
      });
      //console.log(result)
      this.setData({
        productList:result.message
      })
      
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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