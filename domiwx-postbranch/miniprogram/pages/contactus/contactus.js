// miniprogram/pages/contactus/contactus.js
var appdata = getApp().globalData;
var config = require('../../utils/config.js')
var app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    upimgurl: "",
    logourl: appdata.httpimg + 'logo.png',
    registarray: config.registarray().list,
    busimgurl: appdata.httpimg + 'business.png',
    webimgurl: appdata.httpimg + 'webproject.png',


  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      upimgurl: appdata.httpimg + 'bg.png',
    });
  },

  taphome:function(e) {
      wx.navigateBack({
        url: '../mainpage/mainpage',
      })
  },

  tapphone:function(e) {
    wx.makePhoneCall({
      phoneNumber: '0315-2172239',
    })
  },

  //图片预览
  previewImage: function (e) {
    var that = this;
    var id = e.currentTarget.id;
    var imgUrls= [
      that.data.busimgurl,
      that.data.webimgurl
    ]
//    console.log(imgUrls[id], imgUrls);
    wx.previewImage({
      current: imgUrls[id],
      urls: imgUrls
    });
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})