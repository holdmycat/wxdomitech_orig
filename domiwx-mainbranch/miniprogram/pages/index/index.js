//index.js
const app = getApp()

Page({
  data: {
    height:0,
    character_width:0,
    characterHeight:0,
    topicHeight:0,
  },

  bindGetUserInfo : function(e) {
    console.log (e)
  },
  onLoad: function() {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        app.globalData.windowHeight = res.windowHeight;
        app.globalData.windowWidth = res.windowWidth;
        var tmpw = 0.6 * res.windowWidth;
        that.data.characterHeight = tmpw * 609 / 449;
        that.setData({
          height: res.windowHeight,
          character_width: tmpw,
          characterHeight: that.data.characterHeight,
          topicHeight: 0.8*res.windowWidth * 295 / 414,
        })
        //console.log(res.windowHeight);
      }
    });

    
  },
})


// testFunction() {
//   wx.cloud.callFunction({
//     name: 'add',
//     data: {
//       a: 1,
//       b: 2
//     },
//     success: res => {
//       wx.showToast({
//         title: '调用成功',
//       })
//       this.setData({
//         result: JSON.stringify(res.result)
//       })
//       console.log(res.result);
//     },
//     fail: err => {
//       wx.showToast({
//         icon: 'none',
//         title: '调用失败',
//       })
//       console.error('[云函数] [sum] 调用失败：', err)
//     }
//   })
// },