// miniprogram/pages/startup/startup.js
var app = getApp();
var appdata = app.globalData;
const cache = require('../../utils/cache.js');
const httputil = require('../../utils/http.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    logourl: appdata.httpimg +'logo.png',
  },

  onLoad : function (options) {
    var that = this;
    //wx.clearStorageSync();
    //如果没有去云函数获取，然后保存。
    
  },

  presslogin : function (e) {
    //console.log (e);
    //this.testFunction();
    var that = this;
    wx.showLoading({
      title: '初始化',
    })
    
    wx.getSystemInfo({
      success: function(res) {
        //console.log(res);
        getApp().globalData.windowWidth = res.windowWidth;
        getApp().globalData.windowHeight = res.windowHeight;
        //申请openid
        cache.checkLocalStorage('login', res => {
          if (res.errorcode == 0) {
            wx.getStorage({
              key: 'login',
              success: function (res) {
                console.log(res.data);
                appdata.userinfo.wxid = res.data;
                that.requestlogin();
              },
            })
          }
          else {
            //向云服务器发送login申请
            cache.callCloudFunc('login', (res) => {
              //console.log(res);
              if (res.errorcode == 0) {
                console.log(res.res.result.openid);
                wx.setStorage({
                  key: 'login',
                  data: res.res.result.openid,
                });
                appdata.userinfo.wxid = res.data;
                that.requestlogin();
              }
              else {
                console.error(errorode)
              }
            })
          }
        });          
      },
      fail:function(res){
        wx.hideLoading();
        wx.showToast({
          title: 'login time out',
          icon:'error',
          duration:2000,
        })
        console.error('login time out, please restry');
      }
    })
  },

  requestlogin:function() {
    console.log('requestlogin::appdata', appdata);
    httputil.httpClient( app.globalData.httpaddr + 'login/', (error, data) => {
        if(data.errorcode == 0) {
          console.log ('服务器返回登陆数据:',data.data);

          //保存广告信息
          var advert = appdata.advert = data.data.advert;
          for(var i = 0; i < advert.length; i++) {
            appdata.advert[i].bgurl = appdata.httpimg + 'bc/' + advert[i].bgurl;
          }

          //保存产品介绍
          var cmpinfo = appdata.cmpinfo = data.data.cmpinfo;
          for (var i = 0; i < cmpinfo.length; i++) {
            appdata.cmpinfo[i].bgurl = appdata.httpimg + 'cmpinfo/' + cmpinfo[i].bgurl;
          }
          console.log('公司介绍:', appdata.cmpinfo);

          //保存成功案例v2
          var sucpros = appdata.sucpros = data.data.sucpros;
          for(var i = 0; i< sucpros.length; i++) {
            var m = sucpros[i];
            m.frontIconUrl = appdata.httpimg + 'sucpro/' + m.frontIconUrl;
            m.videoUrl = appdata.httpimg + 'sucpro/' + m.videoUrl;
            appdata.sucpros[i] = m;
          }
          console.log('成功案例v2:', appdata.sucpros);
          // wx.navigateTo({
          //   url: '../mainpage/mainpage',
          // })
        }
        wx.hideLoading();
    });
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





// wx.getImageInfo({
//   src: res.result.result.data[0].basicInfo.logo,
//   success: function (ret) {
//     var path = ret.path;
//     wx.getFileSystemManager().readFile({
//       filePath: path,
//       encoding: 'base64', //编码格式
//       success: res => { //成功的回调
//         var imageurl = 'data:image/png;base64,' + res.data;
//         t.logopng = res.data;
//         wx.setStorage({
//           key: 'login',
//           data: t,
//         })
//       },
//       fail: res => {
//         console.log(res);
//       }
//     })
//   }
// }); 






  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
  //   var that = this;
  //   console.log ('----进入startUp');
  //   //wx.clearStorageSync();
  //   //判断本地是否有缓存
  //   cache.checkLocalStorage ('login', res=>{
  //     if(res.errorcode == 0) {
  //         //本地有缓存
  //         //console.log(res);
  //         //比较版本号码 -> 判断是否需要版本更新.
  //         getApp().globalData.logindata = res.res.data;
  //         // cache.callCloudFunc('login', (res1) => {
  //         //   console.log(res1);
  //         //   getApp().globalData.logindata = res.data;
  //         //   that.setData({
  //         //     logourl: res.res.data.logourl,
  //         //   });

  //         // var servervcode = res1.res.result.result.data[0].vcode;
  //         // var localvcode = res.res.data.vcode;
  //         // //更新服务器数据
  //         // if(servervcode > localvcode) {
  //         //   console.log(123);
  //         //   this.cachingLogin();
  //         // }
  //         // //引用本地缓存
  //         // else if(servervcode == localvcode) {
  //         //   console.log(0);
  //         //   getApp().globalData.logindata = res.data;
  //         //   that.setData({
  //         //     logourl: res.res.data.logourl,
  //         //   });
  //         // }
  //         // //逻辑错误
  //         // else {
  //         //   console.error('logic error');
  //         // }
  //       //}); 
  //     }
  //     else {
  //       wx.showLoading({
  //         title: 'loading...',
  //       })
  //       //向服务器发送login申请
  //       cache.callCloudFunc ('login', (res)=>{
  //         //console.log(res);
  //         if (res.errorcode == 0) {
  //           that.cachingLogin(res);
  //         }
  //         else {
  //           console.error(errorode)
  //         }
  //       })
  //     }
  //   })
  // },

  // cachingLogin : function (res) {
  //   var that = this;
  //   var imageurl = res.res.result.result.data[0].logourl;
  //   that.setData({
  //     logourl: imageurl,
  //   });
  //   //获取图片base64码
  //   cache.cachingServerImage(imageurl, res1 => {
  //     //console.log(res1)
  //     if (res1.errorcode == 0) {
  //       wx.hideLoading();
  //       //缓存本地login数据 -> 并在globalData中保存一份.
  //       var t = new Object();
  //       t.appid = res.res.result.appid;
  //       t.openid = res.res.result.openid;
  //       t.logourl = res1.url;
  //       t.vcode = res.res.result.result.data[0].vcode;
  //       wx.setStorage({
  //         key: 'login',
  //         data: t,
  //       });
  //       getApp().globalData.logindata = t;
  //       //console.log(t);
  //     }
  //   });
  // },