// pages/cart/index.js

//导入request请求工具类
import {getBaseUrl,requestUtil} from '../../utils/requestUtil.js';
import regeneratorRuntime from '../../lib/runtime/runtime.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    baseUrl:'',
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },



  /**
   * 生命周期函数--监听页面加载
   */

  onLoad(options) {
    const baseUrl = getBaseUrl();
    this.setData({
      baseUrl
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
    const address=wx.getStorageSync('address');
    const cart=wx.getStorageSync('cart')||[];
    this.setCart(cart);
    this.setData({
      address,
    })
  },

  handleChooseAddress(){
    wx.chooseAddress({
      success:(result) =>{
        //console.log(result);
        wx.setStorageSync('address', result);
      }
    })
  },

  handlePay(){
    const {address,totalNum} = this.data;
    if(!address)
    {
      wx.showToast({
        title: '您未选择收货地址',
        icon:'none'
      })
      return;
    }
    if(totalNum === 0)
    {
      wx.showToast({
        title: '您未选择商品',
        icon:'none'
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    })
  },

  //商品数量管理功能
  handleItemNumEdit(e)
  {
    const {id,operation} = e.currentTarget.dataset;
    // console.log(id);
    let {cart} = this.data;
    let index = cart.findIndex(v=>v.id===id);
    if(cart[index].num===1 && operation=== -1)
    {
      wx.showModal({
        title: '提醒',
        content:'您是否要将该商品移出购物车',
        cancelColor:'cancelColor',
        success:(res)=>{
          if(res.confirm)
          {
            cart.splice(index,1);
            this.setCart(cart);
          }
        }
      })
    }
    else
    {
      cart[index].num+=operation;
      this.setCart(cart);
    }
    
  },

  //商品选中事件处理
  handleItemChange(e){
    // console.log(e);
    const {id} = e.currentTarget.dataset;
    // console.log(id);
    let {cart} = this.data;
    let index = cart.findIndex(v=>v.id===id);
    // console.log(index);
    cart[index].checked = !cart[index].checked;
    this.setCart(cart);
  },

  //商品全选事件处理
  handleItemAllCheck(){
    let{cart,allChecked} = this.data;
    allChecked = !allChecked;
    cart.forEach(v=>v.checked=allChecked);
    this.setCart(cart);
  },

  

  //设置购物车状态 重新计算底部工具栏 全选 总价 总数量 缓存
  setCart(cart){
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v=>{
      if(v.checked)
      {
        totalNum+=v.num;
        totalPrice +=v.price*v.num;
      }
      else{
        allChecked = false;
      }
    })
    allChecked = cart.length!=0?allChecked:false;
    this.setData({
      cart,
      allChecked,
      totalNum,
      totalPrice
    })
    //cart设置到缓存中
    wx.setStorageSync('cart', cart);
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