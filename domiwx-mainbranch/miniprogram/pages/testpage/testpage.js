// miniprogram/pages/testpage/testpage.js
const register = require('../common/register/register.js');
const httputil = require('../../utils/http.js');
var app = getApp();
var appdata = getApp().globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    registerdata: register.mergeData({
      isShow:true,
      title:"定制标题",
    }),
    tabbar: {
      "color": "#999999",
      "selectedColor": "#7788dd",
      "backgroundColor": "#ffffff",
      "shadow": 'shadow',
      "list": [{
        "key": "home",
        "iconPath": "/images/icon_home.png",
        "selectedIconPath": "/images/icon_home_active.png",
        "text": "首页"
      },
      {
        "key": "share",
        "iconPath": "/images/icon_tag.png",
        "selectedIconPath": "/images/icon_tag_active.png",
        "text": "转发赚佣金"
      },
      {
        "key": "post",
        "iconType": "big overflow circle shadow",
        "text": "发布需求"
      },
      {
        "key": "discover",
        "iconPath": "/images/icon_notebook.png",
        "selectedIconPath": "/images/icon_notebook_active.png",
        "text": "发现"
      },
      {
        "key": "me",
        "iconPath": "/images/icon_me.png",
        "selectedIconPath": "/images/icon_me_active.png",
        "text": "个人信息"
      }
      ]
    },
    signupimg:"/images/videobg.png",
    videoList:[
      {
        id:"0",
      },
      {
        id:"1",
      },
      {
        id:"2",
      },
      {
        id:"3",
      },
      {
        id:"0",
      },
      {
        id:"1",
      },
      {
        id:"2",
      },
      {
        id:"3",
      },
    ],
  },

  handleContact(e) {
    console.log(e.path)
    console.log(e.query)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    new register (this, 'registerdata');
    //注册回调函数
    this.data.registerdata.backaction = "backaction";
    
  },

  //创建项目
  createpro : function () {

    var rongzi = {
        state:1,
        type:0,
        major:0,
        phone:'12312312',
        num:134.32,
        collateralvalue:2323.34,
        remarks:'',
        collateralimgarray:['','','',],
        licenseimg:'',
        creditreportimgarray:['','',''],
    };

    httputil.httpPost(appdata.httpaddrv2 + 'createprov1', rongzi, (error, data)=> {
        console.log(data);
    });
  },
  //获取项目信息
  getpro : function () {
    var getproject={
      state:1,
      type:0,
    };
    httputil.httpPost(appdata.httpaddrv2 + 'getprojectv1', getproject, (error, data)=> {
        console.log(data);
    });
  },
  //编辑项目
  editpro: function () {
      var rongzi = {
          proId:35,
          state:1,
          type:0,
          major:0,
          phone:'12312312',
          num:134.32,
          collateralvalue:2323.34,
          remarks:'',
          collateralimgarray:['','','',],
          licenseimg:'',
          creditreportimgarray:['','',''],
      };
      
      httputil.httpPost(appdata.httpaddrv2 + 'editprov1', {'projectinfo':JSON.stringify(rongzi)}, (error, data)=> {
          console.log(data);
      });
  },
  //删除项目
  delpro : function () {
    var del = {
      proId: 35,
      state:1,
      type:0,
    };
    httputil.httpPost(appdata.httpaddrv2 + 'deleteprov1', del, (error, data) => {
      console.log(data);
    });
  },

  testtemplate:function (e) {
      // console.log(e);
      // this.data.registerdata.isShow = true;
      // this.setData({
      //   registerdata:this.data.registerdata,
      // });
//
    httputil.httpClient(app.globalData.httpaddr + 'checkregisted/' +
      'oHkhN5VfRCoLLwPgVSG0m7dmhAW8', (error, data) => {
        if (data.errorcode == 0) {
          console.log('服务器返回检测是否注册数据:', data.data);
          //用户已经注册
          if(data.data == true) {
                //直接进入发布项目页面.
          }
          //用户没有注册
          else {
                //需要弹出注册页面
          }
        }
        else {
            wx.showToast({
              title: '数据错误',
              duration:1000,
              icon:'none',
            });
        }
        
      });
    // httputil.httpClient(app.globalData.httpaddr + 'checkregisted/' +
    //   appdata.userinfo.wxid, (error, data) => {
    //     if (data.errorcode == 0) {
    //       console.log('服务器返回检测是否注册数据:', data.data);

        
    //     }
    //     wx.hideLoading();
    //   });
      
  },

  

  tabChange : function(e) {
      console.log(e.detail.key);
  },
  backaction:function(e) {
    console.log('backaction', e);
    this.data.registerdata.isShow = false;
    this.setData ( {
        registerdata:this.data.registerdata,
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