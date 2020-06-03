//0->进入poster
//1->进入me

var appdata = getApp().globalData;
var config = require('../../utils/config.js')
var app = getApp();
const httputil = require('../../utils/http.js');

// miniprogram/pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    desindex:0,
    disablepostbtn:false,
    upimgurl: "",
    registarray: config.registarray().list,
    registerdata:{
      username:'',//用户名
      phonenumber:'',//手机号
      verifycode:'',//验证码
    },
    checkcode:{
        totaltime:60,
        s1:'获取验证码',
        enablebtn:true,
    },
    topicerror:false,
    phoneerror:false,
    verifycodeerror:false,
   
    // enablecheckcode:false,//获取校验码
    // enableverify:false,//验证
    // enableconfirm:false,//确定
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.desindex != undefined) {
      this.data.desindex = options.desindex;
    }
    else {
      this.data.desindex = 0;
    }
    this.setData({
      upimgurl: appdata.httpimg + 'bg.png',
      desindex:this.data.desindex,
    });
  },
  
  inputphonenum:function (e) {
    console.log(e.detail.value);
    this.data.registerdata.phonenumber = e.detail.value;
    this.setData({
      registerdata:this.data.registerdata,
    });
  },
  inputlosefocus : function (e) {
    var id = e.currentTarget.id;
    switch (id){
      case "0":{//姓名
        this.data.registerdata.username = e.detail.value;
        if(e.detail.value.length < 2) {
          wx.showToast({
            title: '姓名太短',
            icon:'none',
            duration:1000,
          })
          this.setData({
            topicerror:true,
          })
        }
        else {
          this.setData({
            topicerror: false,
            registerdata: this.data.registerdata,
          })
        }
        break;
      }
      // case "1":{//手机号
      //   this.data.registerdata.phonenumber = e.detail.value;
      //   if (e.detail.value.length != 11) {
      //     wx.showToast({
      //       title: '手机号非法',
      //       duration: 1000,
      //     })
      //     this.setData({
      //       phoneerror: true,
      //     })
      //   }
      //   else {
      //     console.log('##########save registerdata:phone');
      //     this.setData({
      //       phoneerror: false,
      //       registerdata: this.data.registerdata,
      //     })
      //   }
      //   break;
      // }
      case "2":{//验证码
        this.data.registerdata.verifycode = e.detail.value;
        if (e.detail.value.length < 2) {
          wx.showToast({
            title: '数据错误',
            duration: 1000,
          })
          this.setData({
            verifycodeerror: true,
          })
        }
        else {
          this.setData({
            verifycodeerror: false,
            registerdata: this.data.registerdata,
          })
        }
      }
    }
  },

  //todo
  // tapcheckcode : function(e) {
  //   this.data.checkcode.enablebtn = false;
  //   //获取验证码按钮失效60秒
  //   var t1 = setInterval(() => {
  //     this.data.checkcode.totaltime = this.data.checkcode.totaltime - 1;
  //     if (this.data.checkcode.totaltime <= 0) {
  //       clearInterval(t1);
  //       this.data.checkcode.s1 = '获取验证码';
  //       this.data.totaltime = 60;
  //       this.data.enablebtn = true;
  //       this.setData({
  //         checkcode: this.data.checkcode,
  //       });
  //       return;
  //     }
  //     this.data.checkcode.s1 = '剩余' + this.data.checkcode.totaltime + '秒'
  //     this.setData({
  //       checkcode: this.data.checkcode,
  //     });
  //   }, 1000);
  // },

  //获取验证码
  tapcheckcode : function (e) {
    //判断当前手机号是否是11位数
    if(appdata.isdebug)
      console.log('##########tapcheckcode,phonenum: ', this.data.registerdata.phonenumber);
    if(this.data.registerdata.phonenumber.length != 11) {
      wx.showToast({
        title: '手机号非法',
        duration:1000,
        mask:true,
        icon:'none',
      })
      return;
    }
   
    this.data.checkcode.enablebtn = false;
    this.data.checkcode.s1 = '剩余' + this.data.checkcode.totaltime + '秒'
    this.setData({
      checkcode: this.data.checkcode,
    });

    // 向服务器发送验证码申请.
    var url = appdata.httpaddr + 'sendSMS/' + this.data.registerdata.phonenumber
    httputil.httpClient (url, (error, data) =>{
      if (appdata.isdebug)
          console.log('sendSMS',data);
      // 如果发送申请成功，那么开始倒计时。
      if (data.errorcode == 0) {
       
      
        //获取验证码按钮失效60秒
        var t1 = setInterval(() => {
          this.data.checkcode.totaltime = this.data.checkcode.totaltime - 1;
          if (this.data.checkcode.totaltime <= 0) {
            clearInterval(t1);
            this.setData({
              s1: '获取验证码',
              totaltime: 60,
              enablebtn: true,
            });
            return;
          }
          this.data.checkcode.s1 = '剩余' + this.data.checkcode.totaltime + '秒'
          this.setData({
              checkcode:this.data.checkcode,
          });
        }, 1000);
      }
      else {
        wx.showToast({
          title: '数据错误',
          duration:1000,
          icon:'none',
          mask:true,
        })
      }
    });
  },
  
  postrequest : function (e) {
    //console.log(e);
    //验证用户姓名
    var that = this;
    if (this.data.registerdata.username.length < 2) {
      wx.showToast({
        title: '用户名太短',
        duration: 1000,
        mask:true,
      })
      return;
    }

    //验证手机号判断当前手机号是否是11位数
    if (this.data.registerdata.phonenumber.length != 11) {
      wx.showToast({
        title: '手机号非法',
        duration: 1000,
        mask:true,
      })
      return;
    }
   
    this.setData({
      disablepostbtn: true,
    })
    wx.showLoading({
      title: '验证...',
      mask:true,
    })
    //验证验证码
    var url = appdata.httpaddr + 'checkCode/' + this.data.registerdata.phonenumber + '/' + this.data.registerdata.verifycode
    httputil.httpClient(url, (errorcode, data) => {
      console.log('checkCode', errorcode, data);
      //验证成功
      if (data.errorcode == 0) {
       
          //向服务器发送注册申请          
          var url = appdata.httpaddr + 'register';
          var user={
            name:this.data.registerdata.username,
            phone:this.data.registerdata.phonenumber,
            wxid:appdata.userinfo.wxid,
            upwxid:appdata.userinfo.upwxid,
          }
          
          //向服务器发送注册申请
          httputil.httpPost(url, user, (errorcode, data)=> {
            console.log(data);
            if (data.errorcode == 0) {
              wx.hideLoading();
              wx.showToast({
                title: '注册成功',
                duration: 1500,
                mask:true,
              })
              appdata.userinfo.isuser = true;
              setTimeout(function () {
                  wx.navigateBack({
                  })
              }, 1500)
            }
            else if (data.errorcode == -1){
              wx.showToast({
                title: '注册失败,返回主页',
                duration: 1500,
                icon:'none',
                mask:true,
              })
              setTimeout(function () {
                wx.navigateBack({
                })
              }, 1500)
            }
          });       
      }
      else {
        //校验失败 -> 返回主页.
        wx.hideLoading();
        wx.showToast({
          title: '校验失败',
          duration: 1500,
          mask: true,
        })
        setTimeout(function () {
          this.data.checkcode ={
            totaltime: 60,
            s1: '获取验证码',
            enablebtn: true,
          }
          this.setData({
            checkcode:this.data.checkcode,
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