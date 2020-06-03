// miniprogram/pages/me/me.js
var appdata = getApp().globalData;
var config = require('../../utils/config.js')
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    upimgurl: "",
    logourl: appdata.httpimg + 'logo.png',
    registarray: config.registarray().list,
    iteminfos: config.meInfo().list,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      upimgurl: appdata.httpimg + 'bg.png',
    });
    console.log(this.data.iteminfos.length);
  },

  tapme : function(e) {
    console.log(e);
    switch(e.currentTarget.id) {
      case '0':{
        wx.navigateTo({
          url: '../itemlist/itemlist',
        })
        break;
      }
      case '1':{
        break;
      }
      case '2':{
        break;
      }
    }
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