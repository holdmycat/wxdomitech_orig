// miniprogram/pages/poster/poster.js
var appdata = getApp().globalData;
var config = require('../../utils/config.js')
var app = getApp();
const httputil = require('../../utils/http.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    poster:{
      wxid:'',
      upwxid:'-1',
      apptype:0,//产品类型
      workduration:0,//工期
      topic:"",//标题
      descrip:"",//项目简介
      price:0,
      state:1,//1提审，2接洽....
    },
    topicerror:false,
    upimgurl:"",
    producttypeindex: 1,
    requirearray: config.requirearray().list,
    apptype: config.apptype().list,
    apptypename: config.apptypename().list,
    workdurationarray: config.workdurationarray().list,
    postarray: config.postarray().list,
    arrowurl:"../../images/arrow.png",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.poster.wxid = appdata.userinfo.wxid;
    this.data.poster.upwxid = appdata.userinfo.upwxid;
    this.setData({
      upimgurl: appdata.httpimg + 'bg.png',
      poster:this.data.poster,
    });
    if(appdata.isdebug) {
      console.log ('poster info', this.data.poster);
    }
    //console.log(this.data.poster.wxid);
  },
  
  textareabindblur:function(e) {
    this.data.poster.descrip = e.detail.value;
    if(appdata.isdebug) {
      console.log ('poster description', this.data.poster.descrip);
    }
    this.setData ({
        poster:this.data.poster,
    })
  },

  inputlosefocus:function (e) {
      console.log(e);
      var id = e.currentTarget.id;
    
      switch(id) { 
        case "0":{//标题
          this.data.poster.topic = e.detail.value;
          if (this.data.poster.topic.length < 5) {
            this.data.topicerror = true;
            wx.showToast({
              title: '标题太短<5个字>',
              duration:1000,
            })
          }
          else {
            this.data.topicerror = false;
          }
          this.setData({
              topicerror: this.data.topicerror,
              poster:this.data.poster,
          });
          break;
        }
       

      }
  },

  changeworkduration : function (e) {
    var id = e.detail.value;
    console.log(e);
    this.data.poster.workduration = id;
    this.setData({
      poster: this.data.poster,
    });
  },

  changeapptype:function (e) {
    var id = e.detail.value;
    console.log(e);
    this.data.poster.apptype = parseInt(id);
    

    this.setData({
      poster: this.data.poster,
    });
    console.log(this.data.poster.apptype);
  },

  returnmainpage:function(e) {
      wx.reLaunch({
        url: '../mainpage/mainpage',
      })
  },
  postrequest:function (e) {
  
    //检测标题
    if(this.data.poster.topic.length < 5){
      this.data.nameerror = true;
      wx.showToast({
        title: '数据错误',
        duration: 1000,
        mask:true,
      })
      this.setData({
        nameerror: this.data.nameerror,
      });
      return;
    }

    if(appdata.isdebug) {
      console.log ('poster info', this.data.poster);
    }
    this.data.poster.apptype += 1;
    this.setData ({
      poster:this.data.poster,
    })
    if(appdata.isdebug)
      console.log('poster', this.data.poster);
    httputil.httpPost(appdata.httpaddr + 'createitem', this.data.poster, (error, data) =>{
      if (data.errorcode == 0) {
         
          //插入数据库成功.
          wx.showToast({
            title: '发布成功',
            icon:'success',
            duration:1500,
            mask:true,
          });

          setTimeout(function () {
            //申请最新信息
            wx.navigateBack({
              url: '../mainpage/mainpage',
            })
          }, 1500)
      }
      else {
          //插入失败.
        wx.showToast({
          title: '发布失敗',
          duration: 1500,
        });
        setTimeout(function () {
          //申请最新信息
          wx.navigateBack({
            url: '../mainpage/mainpage',
          })
        }, 1500)
      }
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