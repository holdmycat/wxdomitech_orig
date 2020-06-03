// miniprogram/pages/proinfo/proinfo.js
var appdata = getApp().globalData;
var testconfig = require('../../utils/testconfig.js')
var config = require('../../utils/config.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isvertical:1,
    curtext:'',
    activeIndex:0,
    areatype: config.areatype().list,
    businessarray: config.businessarray().list,
    productdetail: ["产品描述","产品功能","产品模块"],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    iteminfo:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this; 
    console.log(options);
    that.data.iteminfo = JSON.parse(options.iteminfo);
    that.setData({
      iteminfo: that.data.iteminfo,
      curtext: that.data.iteminfo.itemdescription,
      isvertical:options.isvertical,
    });

      //open page by sharing.
    if(options.wxid != undefined) {
      app.loginprocess (options, this.initproinfo);
    }
    else {
      if (appdata.isdebug) {
        console.log('项目信息:', this.data.iteminfo);
        console.log('wxid', options.wxid);
        console.log('是否是竖版', that.data.isvertical);
      }
    }
  },

  initproinfo : function () {
  },

  tabClick: function (e) {
    var that = this;
    var tmp = e.currentTarget.id;
    var tmpt='';
    switch (tmp) {
      case '0':{
        tmpt = that.data.iteminfo.itemdescription;
        break;
      }
      case '1':{
        tmpt = that.data.iteminfo.basicmodule;
        break;
      }
      case '2':{
        tmpt = that.data.iteminfo.productionmodule;
        break;
      }
    };
    
    that.setData({
      curtext: tmpt,
      activeIndex: e.currentTarget.id,
    });
  },
  swiperChange:function (){

  },

  tapposter : function () {
      wx.reLaunch({
        url: '../poster/poster',
      })
  },

  contactus : function () {
    wx.reLaunch({
      url: '../contactus/contactus',
    })
  },

  returnmainpage:function () {
    wx.reLaunch({
      url: '../mainpage/mainpage',
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
  onShareAppMessage: function (res) {
    var that = this;
    var wxid = appdata.userinfo.wxid;
    if(appdata.isdebug) {
      console.log ('用户wxid', wxid);
    }
    //获取当前页面
    switch (res.from) {
      case 'menu': {
        return {
          title:'哆米软件',
          path:'/pages/proinfo/proinfo?wxid=' + wxid + '&iteminfo=' + that.data.iteminfo,
        }
        break;
      }
      case 'button': {
        break;
      }
    }    
  }
})