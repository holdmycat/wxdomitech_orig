//app.js
const cache = require('/utils/cache.js');
const httputil = require('/utils/http.js');

App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: "domitech-software-54dff5",//这个就是环境id
        traceUser: true,
      })
    }
     
    this.globalData = {
        //手机校验码-> 离开页面仍然需要继续校验，需要把数据做全局保存
        // phonecode: {
        //   totaltiem: 60,//每次发送的循环周期.
        //   cansend: true,//是否可以发送验证码.
        //   checkcode: "",//服务器返回的验证码.
        //   isverified: false,//是否验证通过.
        //   content:'获取验证码',
        // },
        isdebug:true,
        windowHeight:0,//高度
        windowWidth:0,//宽度
        userinfo:{},//用戶信息
        httpaddr: 'http://127.0.0.1:6001/',
        httpimg: 'http://127.0.0.1:6001/domiwx/',
        // httpaddr:'https://see-future.com/',
        // httpimg: 'https://see-future.com/domiwx/',
    }
  },
 
  UserInfo: function () {
      return getApp().globalData.userinfo;
  },

  loginprocess: function (options, callback) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        getApp().globalData.windowWidth = res.windowWidth;
        getApp().globalData.windowHeight = res.windowHeight;
        //通过云函数login获取wxid，最终获取用户信息,成功获取个人信息，调用主页逻辑接口requestmainpage.
        that.getwxid(options, callback);
      }
    }); 
  },
  //通过云函数login获取wxid
  getwxid: function (options, callback) {
    var that = this;
    wx.showLoading({
      title: 'loading...',
      mask: true,
    })
    //调用云函数，获取wxid
    cache.callCloudFunc('login', (res) => {
      if(getApp().globalData.isdebug)
        console.log(res);
      if (res.errorcode == 0) {
        console.log(res.res.result.openid);
        var wxid = res.res.result.openid;
        var upwxid = '-1';
        var isshare = '-1';
        //----------判断来源
        if (options.wxid == undefined) {//自己搜索打开
          //如果有用户，上级不改变， 如果没有此用户，上级为空。
        }
        else {//分享打开
          upwxid = options.wxid;//上级wxid
          isshare = '0';
          //如果有用户，上级不改变， 如果没有此用户，上级为分享传入的wxid.
        }

        //向服务器发起登录请求
        that.requestlogin(wxid, upwxid, isshare, callback);
      }
      else {
        wx.hideLoading();
        wx.showToast({
          title: '云函数login error',
          duration: 1500,
          mask: true,
        })
      }
    })
  },
  
  //请求登录
  requestlogin: function (wxid, upwxid, isshare, callback) {
    var that = this;
    var app = getApp();
    var appdata = getApp().globalData;
    httputil.httpClient(appdata.httpaddr + 'login/' +
      wxid + '/' +
      upwxid + '/' + isshare, (error, data) => {
        console.log(data);
        if (data.errorcode == 0) {
          //保存个人信息
          appdata.userinfo = data.data.myInfo;
          if (appdata.isdebug) {
            console.log('个人信息', appdata.userinfo);
          }
          //请求主页信息
          callback();
          wx.hideLoading();
        }
        else {
          wx.showToast({
            title: '数据错误',
            duration: 1500,
            mask: true,
          })
          wx.hideLoading();
        }
      });
  },  
})
