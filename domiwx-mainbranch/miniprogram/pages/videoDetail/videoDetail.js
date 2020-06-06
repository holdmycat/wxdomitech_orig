// miniprogram/pages/videoDetail/videoDetail.js
var app = getApp();
var appdata = app.globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:"",
    index:"",
    videoContent:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type = parseInt(options.type);
    var index = parseInt(options.index);

    var tmpContent = appdata.sucpros[type].list[index];
    this.setData({
      type:type,
      index:index,
      videoContent:tmpContent
    })
    console.log("videoContent:" + this.data.videoContent.frontIconUrl);
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
    console.log(res)

    return {
      title: this.data.videoContent.name,
      path: '/pages/videoDetail/videoDetail?type=' + this.data.type + "&index=" + this.data.index,
     
      success: function (res) {
     // 转发成功
          console.log('success');
	      
       },
      fail: function (res) {
        // 分享失败
        console.log('fail');
      
      },
      complete: function() {
       
      }
    }

  }
})