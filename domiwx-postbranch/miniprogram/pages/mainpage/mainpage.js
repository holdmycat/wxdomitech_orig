// miniprogram/pages/mainpage/mainpage.js
var testconfig = require('../../utils/testconfig.js')
var config = require('../../utils/config.js')
var app = getApp();
var appdata = app.globalData;
const httputil = require('../../utils/http.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isuser:false,
    inittime:0,
    activecmpindex:0,
    isfull: false,
    apptype: config.apptype().list,
    cursucpro:{},//当前成功案例
    activeIndex:0,
    swiperHeight:0,
    videoHeight:0,
    videoWidth:0,
    scrollHeight:0,
    indicatorDots: true,
    autoplayv1:false,
    autoplay: true,
    interval: 5000,
    windowheight:0,
    duration: 500,
    bannerlist: [],
    businessArray:[],//发布需求， 转发赚佣金
    dealpro:[],
    //cmpIntroArray:[],
    tabbar: {
      "color": "#999999",
      "selectedColor": "#7788dd",
      "backgroundColor": "#ffffff",
      "shadow": 'shadow',
      "list": [{
        "key": "home",
        "iconPath": "/images/icon_home.png",
        "selectedIconPath": "/images/icon_home_active.png",
        "iconType": "",
        "text": "首页"
      },
      // {
      //   "key": "post",
      //   "iconPath": "/images/icon_tag.png",
      //   "selectedIconPath": "/images/icon_tag_active.png",
      //   "iconType": "",
      //   "text": "发布需求"
      // },
      {
        "key": "share",
        "iconPath": "/images/share.png",
        "iconType": "big overflow circle shadow",
        "text": "转发赚钱"
      },
      {
        "key": "contact",
        "iconPath": "/images/icon_notebook.png",
        "selectedIconPath": "/images/icon_notebook_active.png",
        "iconType": "",
        "text": "联系我们"
      },
      // {
      //   "key": "me",
      //   "iconPath": "/images/icon_me.png",
      //   "selectedIconPath": "/images/icon_me_active.png",
      //   "iconType": "",
      //   "text": "个人信息"
      // }
      ]
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.loginprocess(options, that.requestmainpage);
  },
  
  //请求主页信息
  requestmainpage: function () {
    httputil.httpClient(app.globalData.httpaddr + 'mainpage', (error, data) => {
        //console.log('请求主页信息', data);
        if (data.errorcode == 0) {
          
          //保存广告信息
          var advert = appdata.advert = data.data.advert;
          for (var i = 0; i < advert.length; i++) {
            appdata.advert[i].bgurl = appdata.httpimg + 'bc/' + advert[i].bgurl;
          }

          //保存成功案例
          //appdata.portfolia = data.data.portfolia;
          //保存公司介绍
          // var cmpinfo = appdata.cmpinfo = data.data.cmpinfo;
          // for (var i = 0; i < cmpinfo.length; i++) {
          //   appdata.cmpinfo[i].bgurl = appdata.httpimg + 'cmpinfo/' + cmpinfo[i].bgurl;
          //   appdata.cmpinfo[i].videourl = appdata.httpaddr + cmpinfo[i].videourl;
          // }
          //console.log('公司介绍:', appdata.cmpinfo);
          //保存成功案例
          var sucpro = appdata.portfolia = data.data.portfolia;
          for (var i = 0; i < sucpro.length; i++) {
            var t = sucpro[i];
            for (var j = 0; j < t.list.length; j++) {
              var m = t.list[j];
              m.imgurl = appdata.httpimg + 'sucpro/' + m.imgurl;
              m.videourl = appdata.httpaddr + m.videourl;
            }
          }
          if(appdata.isdebug) {
            console.log('成功案例', sucpro);
          }
          //初始化页面信息
          this.initmainpage();
        }
        else {
          wx.showToast({
            title: '数据错误',
            duration:1500,
            mask:true,
          })
        }
    });
  },
  //初始化主页信息
  initmainpage:function () {
    var that = this;
    var tmpheight = app.globalData.windowWidth * 640 / 1136;
    var tmpVideoHeight = app.globalData.windowHeight * 0.8;
    var tmpVideoWidth = tmpVideoHeight * 640 / 1136;
    that.setData({
      windowheight: getApp().globalData.windowHeight,
      swiperHeight: tmpheight,
      bannerlist: getApp().globalData.advert,
      apptype:config.apptype().list,
      scrollHeight: app.globalData.windowHeight - 40,
      videoHeight:tmpVideoHeight,//vertical
      videoWidth:tmpVideoWidth,//vertical
      //isuser:appdata.userinfo.isuser,
      //businessArray: testconfig.testbusiness().list,
      //dealpro:appdata.dealpro,
      cursucpro: appdata.portfolia[0],
      //cmpIntroArray: getApp().globalData.cmpinfo,
    });

    if (app.globalData.isdebug) {
      console.log('window 宽度', app.globalData.windowWidth);
      console.log('window 高度', app.globalData.windowHeight);
      console.log('广告位高度swiperHeight', that.data.swiperHeight);
      console.log('广告位信息', that.data.bannerlist);
      console.log('滚动条高度', that.data.scrollHeight);
      console.log('全局信息', appdata);
      //console.log('成交信息', that.data.dealpro);
      //console.log(that.data.cursucpro.list[0].imgarray[0]);
      //console.log('商务信息', that.data.businessArray);
      console.log('当前类型案例', that.data.cursucpro);
    }
   
  },

  tapposter : function (e) {
    var id = e.currentTarget.id;
    switch (id) {
      case '0':{//发布需求
        this.postrequest();
        break;
      }
      case '1':{//转发赚佣金
        break;
      }
    }
  },

  postrequest:function(){
    if (appdata.userinfo.isuser == true) {
      //直接进入发布项目页面.
      wx.navigateTo({
        url: '../poster/poster',
      })
    }
    else {
      wx.showModal({
        title: '即将打开注册页面',
        content: '完成注册，即可发布项目:)',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../register/register?desindex=0',
            })
          }
          else if (res.cancel) {
          }
        }
      })
    }
  },

  hidebg:function(e) {
    console.log(e);
    var that = this;
    // console.log(that.data.cmpIntroArray[e.currentTarget.id].pagename);
    that.data.isfull = !that.data.isfull;
    that.setData({
      isfull: that.data.isfull,
    });
  },
  //点击产品cmpinfo
  tapcmp : function (e) {
    console.log(e);
    //activecmpindex = e.currentTarget.id;
    this.videoContext.seek(0);
    var that = this;
    // console.log(that.data.cmpIntroArray[e.currentTarget.id].pagename);
    that.data.isfull = !that.data.isfull;
    that.setData ({
        isfull : that.data.isfull,
        activecmpindex: e.currentTarget.id,
    });
    
    console.log('full', that.data.isfull);
    // wx.navigateTo({
    //   url: that.data.cmpIntroArray[e.currentTarget.id],
    // })
  },

  tapsucpro:function(e) {


//    console.log(e);
    //activecmpindex = e.currentTarget.id;
    this.videoContext.seek(0);
    var that = this;
    // console.log(that.data.cmpIntroArray[e.currentTarget.id].pagename);
    that.data.isfull = !that.data.isfull;
    that.setData({
      isfull: that.data.isfull,
      activecmpindex: e.currentTarget.id,
    });

//    console.log('full', that.data.isfull);
      // var that = this;
      // // console.log('cursurpro type', that.data.cursucpro.list[e.currentTarget.id]);
      // var isvertical = 1;
      // if (that.data.activeIndex == '2' || that.data.activeIndex == '3')
      //   isvertical = 0;
      //   // console.log('isvertical', isvertical);
      //   // console.log('that.data.activeIndex', that.data.activeIndex);

      // wx.navigateTo({        
      //   url: '../proinfo/proinfo?iteminfo=' + 
      //   JSON.stringify(that.data.cursucpro.list[e.currentTarget.id]) + 
      //   '&isvertical=' + 
      //   isvertical,
      // })
  },
  // url: '../proinfo/proinfo?wxid=' + appdata.userinfo.wxid + '&iteminfo=' + JSON.stringify(that.data.cursucpro.list[e.currentTarget.id]),
    //打开proinfo + 参数(当前选中的项目信息)

  tabClick: function (e) {
    var tmp = e.currentTarget.id;

    this.setData({
      activeIndex: e.currentTarget.id,
      cursucpro: app.globalData.portfolia[tmp],
    })
    
    if(appdata.isdebug) {
      console.log('当前选中成功案例', this.data.cursucpro);
    }
  },

  swiperChange : function(e) {
    //console.log('swiperChange', e);
  },

  pressSwiperItem:function(e) {
//    console.log('mainPage::pressSwiperItem', e);
  },

  tabChange : function (e) {
    
    var key = e.detail.key
    var that = this;
    switch (key) {
      case 'home':{
        break;
      }
      case 'post':{
        this.postrequest();
        break;
      }
      case 'share':{
        
        break;
      }
      case 'contact':{
        wx.navigateTo({
          url: '../contactus/contactus',
        })
        break;
      }
      case 'me':{
        //判断是否完成注册
        if(appdata.userinfo.isuser == true) {
          wx.navigateTo({
            url: '../me/me',
          })
        }
        else {
          wx.showModal({
            title: '即将打开注册页面',
            content: '完成注册，即可发布项目:)',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../register/register?desindex=1',
                })
              }
              else if (res.cancel) {
              }
            }
          })  
        }
        break;
      }
    }
  },

  upper:function(e){},

  lower : function(e) {},

  bindpause: function (e) {
    this.videoContext.pause();
  },

  bindPlay: function (e) {
    this.videoContext.play();
  },
  bindended: function (e) {
    // this.setData({
    //   isShowVideo: false,
    // })
    
  },

  closevideo:function(e) {
    //console.log(e);
    this.videoContext.pause();
    this.setData({
      isfull:false,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoContext = wx.createVideoContext('bc-video')
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
  //  console.log('onHide');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
 //   console.log('unload');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
   // console.log('onPullDownRefresh');

    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  onShow:function () {
//    console.log('onShow');
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
      //获取当前页面
      switch(res.from) {
        
        case 'menu':{
          break;
        }
        case 'button':{
          break;
        }
      }    
      //console.log(res);
  },
})




//判断是否已经完成注册，如果没有，那么需要弹出注册页面.
        // httputil.httpClient(app.globalData.httpaddr + 'checkregisted/' + appdata.userinfo.wxid,
        //                    (error, data) => {
        //     if (data.errorcode == 0) {
        //       console.log('服务器返回检测是否注册数据:', data.data);
        //       //用户已经注册
        //       if (data.data == true) {


        //       }
        //       //用户没有注册
        //       else {
        //         //需要弹出注册页面
        //         // wx.showToast({
        //         //   title: 'yeah',
        //         //   duration: 1000,
        //         //   icon: 'none',
        //         // });


        //       }
        //     }
        //     else {
        //       wx.showToast({
        //         title: '数据错误',
        //         duration: 1000,
        //         icon: 'none',
        //       });
        //     }

        //   });
        // // wx.navigateTo({
        // //   url: '../poster/poster',
        // // })
        // break;



  // test:function () {
  //   console.log(123);
  // },

  // test1: function (callback) {
  //   callback();
  // },

// presslogin: function (e) {
//   //console.log (e);
//   //this.testFunction();
//   var that = this;
//   wx.showLoading({
//     title: 'loading...',
//     mask: true,
//   })

//   wx.getSystemInfo({
//     success: function (res) {
//       //console.log(res);
//       getApp().globalData.windowWidth = res.windowWidth;
//       getApp().globalData.windowHeight = res.windowHeight;
//       //申请openid
//       cache.checkLocalStorage('login', res => {
//         if (res.errorcode == 0) {
//           wx.getStorage({
//             key: 'login',
//             success: function (res) {
//               console.log(res.data);
//               appdata.userinfo.wxid = res.data;
//               console.log('appdata.userinfo.wxid', appdata.userinfo.wxid);
//               that.requestlogin();
//             },
//           })
//         }
//         else {
//           //向云服务器发送login申请
//           cache.callCloudFunc('login', (res) => {
//             //console.log(res);
//             if (res.errorcode == 0) {
//               console.log(res.res.result.openid);
//               wx.setStorage({
//                 key: 'login',
//                 data: res.res.result.openid,
//               });
//               appdata.userinfo.wxid = res.data;
//               that.requestlogin();

//             }
//             else {
//               console.error(errorode)
//             }
//           })
//         }
//       });
//     },
//     fail: function (res) {
//       wx.hideLoading();
//       wx.showToast({
//         title: 'login time out',
//         icon: 'error',
//         duration: 2000,
//       })
//       console.error('login time out, please retry');
//     }
//   })
// },

// requestloginv1: function (wxid, upwxid, isshare) {
//   //console.log('requestlogin::appdata', appdata);
//   httputil.httpClient(app.globalData.httpaddr + 'login/' +
//     appdata.userinfo.wxid + '/' +
//     appdata.userinfo.upwxid, (error, data) => {
//       if (data.errorcode == 0) {
//         //console.log('服务器返回登陆数据:', data.data);

//         //保存个人信息
//         appdata.userinfo = data.data.myInfo;

//         //保存广告信息
//         var advert = appdata.advert = data.data.advert;
//         for (var i = 0; i < advert.length; i++) {
//           appdata.advert[i].bgurl = appdata.httpimg + 'bc/' + advert[i].bgurl;
//         }

//         //保存公司介绍
//         var cmpinfo = appdata.cmpinfo = data.data.cmpinfo;
//         for (var i = 0; i < cmpinfo.length; i++) {
//           appdata.cmpinfo[i].bgurl = appdata.httpimg + 'cmpinfo/' + cmpinfo[i].bgurl;
//         }
//         //console.log('公司介绍:', appdata.cmpinfo);
//         //保存成功案例
//         var sucpro = appdata.sucpro = data.data.sucpro;
//         for (var i = 0; i < sucpro.length; i++) {
//           var t = sucpro[i];
//           for (var j = 0; j < t.list.length; j++) {
//             var m = t.list[j];
//             m.fronticonurl = appdata.httpimg + 'sucpro/' + m.fronticonurl;
//             for (var k = 0; k < m.imgarray.length; k++) {
//               m.imgarray[k] = appdata.httpimg + 'sucpro/' + m.imgarray[k];
//             }
//           }
//         }
//         //console.log('成功案例v2:', appdata.sucpro);
//         this.initmainpage();
//       }
//       wx.hideLoading();
//     });
// },