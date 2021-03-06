// miniprogram/pages/mainpage/mainpage.js

var app = getApp();
var appdata = app.globalData;

const httputil = require('../../utils/http.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoHeight:0,
    videoWidth:0,
    videoLeft:0,
    activecmpindex:0,
    curIndex: 0,
    logoaddr:'',
    swiperHeight:0,
    bannerList:[],
    list:[
    ],
    videoItemInfo:{
      width:0,
      height:0,
      frontIconWidth:0,
      frontIconHeight:0,
      fontHeight:0,//字体高度
      iconAppHeight:0,//app类型高度
    },
    curVideoList:[
    ],
    totalVideoList:[
    ],
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
    videoListHeight:0
  },

  selected: function (e) { 
    var id = e.currentTarget.id;
    var nId = parseInt(id);
    var tmp = this.data.list;
    if(this.data.curIndex != -1) {
      tmp[this.data.curIndex].state = 0;
    }
    tmp[nId].state = 1;
    var tmp1 = this.data.totalVideoList[nId]
    if(nId > this.data.totalVideoList.length - 1) {
      var tmp2 = {
        list:[]
      }
      this.setData({
        list:tmp,
        curIndex:nId,
        curVideoList:tmp2
      });
    }
    else {
      this.setData({
        list:tmp,
        curIndex:nId,
        curVideoList:tmp1
      });
    }
    
  },
   
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: 'loading...',
      mask:true
    })
    var tmp = this.data.videoItemInfo;
    this.data.swiperHeight = app.globalData.windowWidth/1.7;
    var tmp1 = app.globalData.windowHeight - this.data.swiperHeight - 10 - 60 - 15 - 40- 18;//scrollview高度
    
    
    tmp.width = app.globalData.windowWidth*0.9;
    tmp.height = tmp.width / 1.4;

    tmp.frontIconWidth = tmp.width*0.98;
    tmp.frontIconHeight = tmp.frontIconWidth/2;

    tmp.fontHeight = (tmp.height - tmp.width*0.5)*0.3;
    tmp.iconAppHeight = (tmp.height- tmp.width*0.5)*0.5 - tmp.fontHeight;

    var tmpVideoHeight = app.globalData.windowHeight * 0.8;
    var tmpVideoWidth = tmpVideoHeight * 640 / 1136;
    var tmpVideoLeft = (app.globalData.windowWidth - tmpVideoWidth) * 0.5;
    
    this.setData({
      videoItemInfo:tmp,
      videoListHeight:tmp1,
      videoHeight:tmpVideoHeight,
      videoWidth:tmpVideoWidth,
      videoLeft:tmpVideoLeft,
      logoaddr:appdata.logourl,
      swiperHeight: this.data.swiperHeight
    })
    var _this = this;
    httputil.httpClient(app.globalData.httpaddr + 'mainpage', (error, data) => {
      console.log('请求主页信息', data);
      if (data.errorcode == 0) {
        //服务器返回视频数据
        var tmp = data.data.sucpros;

        for(var i = 0; i < tmp.length; i++) {
            var m = tmp[i].list;
            for(var j = 0; j< m.length; j++) {
                m[j].frontIconUrl = appdata.httpaddr + m[j].frontIconUrl;
                m[j].videoUrl = appdata.httpaddr + m[j].videoUrl;
                m[j].iconUrl = appdata.httpaddr + m[j].iconUrl;
                
            }
        }

        //初始化主页面
        var tmp1 = tmp[_this.data.curIndex];
        appdata.sucpros = tmp;
        var tmpList = this.data.list = appdata.tabs = data.data.tabs;

        //初始化swiper
        var tmpSwiperList = this.data.bannerList = appdata.bannerList = data.data.bannerList;
        for(var i = 0; i < tmpSwiperList.length; i++) {
          tmpSwiperList[i].imgurl = appdata.httpaddr +  appdata.bannerList[i].imgurl;
          console.log('zxf:' + tmpSwiperList[i].imgurl);
        }
         
        for(var i = 0; i < tmpList.length; i++) {
          tmpList[i].imgurl = appdata.httpaddr +  appdata.tabs[i].imgurl;
        }

        _this.setData({
          totalVideoList:tmp,
          curVideoList:tmp1,
          list:tmpList,
          bannerList:tmpSwiperList
        })
        wx.hideLoading({
          complete: (res) => {},
        })
        
      }
      else {
        wx.hideLoading({
          complete: (res) => {},
        })
        wx.showToast({
          title: '数据错误',
          duration:1500,
          mask:true,
        })
      }
  });

  },

  downLoadAndroid:function(){
    console.log('download android');
  },

  downLoadIos:function(){
    console.log('download ios');
  },

  tabChange : function (e) {
    console.log(123)
    var key = e.detail.key
    console.log("key:" + key)
    var that = this;
    switch (key) {
      case 'home':{
        break;
      }
      case 'contact':{
        wx.navigateTo({
          url: '../contactus/contactus',
        })
        break;
      }
     
    }
  },


  tapsucpro:function(e) {
    console.log(e)
    var id = e.currentTarget.id;
    var nId = parseInt(id);
    //this.videoContext.seek(0);
    this.setData({
      activecmpindex: nId,
    });
    var type = this.data.curIndex;
    var index = nId;
    var des = "../videoDetail/videoDetail?type=" + type + "&index=" + index;
    wx.navigateTo({
      url: des,
    })
  },

  // tapsucpro:function(e) {
  //   console.log(e)
  //   var id = e.currentTarget.id;
  //   var nId = parseInt(id);
  //   this.videoContext.seek(0);
  //   var that = this;
  //   that.data.isfull = !that.data.isfull;
  //   that.setData({
  //     isfull: that.data.isfull,
  //     activecmpindex: nId,
  //   });
  // },

  // closevideo:function(e) {
  //   //console.log(e);
  //   this.videoContext.pause();
  //   this.setData({
  //     isfull:false,
  //   })
  // },

  
      








  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //this.videoContext = wx.createVideoContext('bc-video')
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
    console.log("onShareAppMessage")
  }
})