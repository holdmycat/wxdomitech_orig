// miniprogram/pages/releaserequirement/releaserequirement.js
var appdata = getApp().globalData;
var config = require('../../utils/config.js')
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
      iteminfo:{
        type:0,//需求类型
        basicinfo:{
          apptype:0,
          username://用户姓名
          {
            content:"",
            showerror:false,
          },
          phonenumber: //用户手机号
          {
            content:"",
            showerror:false,
          },
          topic:{
            content:"",
            showerror:false,
          },
          uploadcode:{
              content:'乙方是否提交源码',
              checked:false,
          },
          designpro: {
            content: '乙方是否制作设计方案',
            checked: false,
          },
          requiredoc: {
            content: '乙方是否需要出需求文档',
            checked: false,
          },
          uploadlogo: {
            content: '乙方是否设计logo',
            checked: false,
          },
        },//概要需求
        detailinfo:{},//详细需求
        checkprocedure:{},//验收模式
        valueaddedservice:{},//增值服务
      },
      phonecode: {
        totaltiem: 60,//每次发送的循环周期.
        cansend: true,//是否可以发送验证码.
        checkcode: "",//服务器返回的验证码.
        isverified: false,//是否验证通过.
        content: '获取验证码',
      },
      contentheight:0,
      requirearray:config.requirearray().list,
    apptype: config.apptype().list,
      producttypeindex:0,
      activeindex:-1,
      releaselength: config.requirearray().list.length,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      appdata.windowHeight = 603;
      that.setData ( {
        contentheight: (appdata.windowHeight - 120)*0.8,
      });
      //console.log(that.data.activeindex);
      //console.log(that.data.producttype);
  },

  //保存需求类型
  taprequire:function(e) {
    var that = this;
    var tmp = e.currentTarget.id;
    that.data.iteminfo.type = 0;
    console.log(e);
    if(tmp == "1"){
      that.data.iteminfo.type = 1;
    }

    that.setData ({
        iteminfo:that.data.iteminfo,
    })

  },

  //标题-----begin
  //----标题失去焦点
  inputlosefocus:function(e) {
    //console.log(e);
    var tmp = 2;
    //0:概要需求->姓名
    //1:概要需求->手机号
    //5：详细需求-> 标题
    var id = e.currentTarget.id;

    switch (id) {
      case "0":{//姓名
        this.data.iteminfo.basicinfo.username.content = e.detail.value;
        this.setbasicinfo(this.data.iteminfo.basicinfo.username, tmp);
        break;
      }
      case "1":{//手机号
        tmp = 11;
        this.data.iteminfo.basicinfo.phonenumber.content = e.detail.value;
        this.setbasicinfo(this.data.iteminfo.basicinfo.phonenumber, tmp);
        break;
      }
      case "2":{//验证码
        break;
      }
      case "5":{//标题
        tmp = 5;
        this.data.iteminfo.basicinfo.topic.content = e.detail.value;
        this.setbasicinfo(this.data.iteminfo.basicinfo.topic, tmp);
        break;
      }
    }
    this.setData({
      iteminfo: this.data.iteminfo,
    });
  },
  //标题-------end

  setbasicinfo:function (obj, _t) {
    if (obj.content.length < _t) {
      obj.showerror = true;
    }
    else {
      obj.showerror = false;
    }
  },

  //获取手机号验证码
  tapphonecode : function (e) {
    if (this.data.phonecode.cansend == false)
      return;
    console.log(22);
      //判断手机号长度
      if(this.data.iteminfo.basicinfo.phonenumber.content.length < 11) {

        wx.showToast({
          title: '数据错误',
          icon:"none",
          duration:1000,
        })
        this.data.iteminfo.basicinfo.phonenumber.showerror = true;
        this.setData ({
          iteminfo: this.data.iteminfo,
        });
        return;
      }

      //调用倒计时接口
      var pages = getCurrentPages();
      var currentPage = pages[pages.length - 1]    //获取当前页面的对象
      var url = currentPage.route 
      //app.timecounting(url);
      wx.showToast({
        title: '验证码获取成功',
        icon: "success",
        duration: 1000,
      })
      this.data.phonecode.cansend = false;
      this.data.phonecode.content= "(60s)";
      this.data.phonecode.totaltime = 60;
      var t1 = setInterval(() => {
        this.data.phonecode.totaltime = this.data.phonecode.totaltime - 1;
        if (this.data.phonecode.totaltime <= 0) {
          clearInterval(t1);
          this.data.phonecode.cansend = true;
          this.data.phonecode.content = "获取验证码";
          this.data.phonecode.totaltime = 60;
          this.data.phonecode.isverified = false;
        }
        else {
          this.data.phonecode.content = "(剩余" + this.data.phonecode.totaltime + "秒)";
        }

        this.setData({
          phonecode:this.data.phonecode,
        });

      }, 1000);
      
  },

  //提交服务器校验码验证是否正确.
  verifyphonecode:function (e) {

  },

  //发布概要需求
  broadcastsimplerequest:function (e) {
    //校验所有数据是否合法

    //姓名

    //手机号

    //是否校验成功

    //标题

    //以上全部正确, 提交发布.
    wx.showToast({
      title: '发布成功',
      duration:1000,
    })
  },
  //是否提交代码----begin
  checkupload:function(e) {
    //console.log(e);
    this.data.iteminfo.basicinfo.uploadcode.checked = !this.data.iteminfo.basicinfo.uploadcode.checked;
    this.setData({
      iteminfo:this.data.iteminfo,
    });
    //console.log(this.data.iteminfo.basicinfo.uploadcode.checked);
  },
  //是否提交代码----end

  //是否提交设计方案----begin
  checkdesignpro: function (e) {
    //console.log(e);
    this.data.iteminfo.basicinfo.designpro.checked = !this.data.iteminfo.basicinfo.designpro.checked;
    this.setData({
      iteminfo: this.data.iteminfo,
    });
    //console.log(this.data.iteminfo.basicinfo.designpro.checked);
  },
  //是否提交设计方案----end

  //是否提交需求文档----begin
  checkrequiredoc:function (e) {
    this.data.iteminfo.basicinfo.requiredoc.checked = !this.data.iteminfo.basicinfo.requiredoc.checked;
    this.setData({
      iteminfo: this.data.iteminfo,
    });
  },
  //是否提交需求文档----end

  //是否提交需求文档----begin
  checkuploadlogo: function (e) {
    this.data.iteminfo.basicinfo.uploadlogo.checked = !this.data.iteminfo.basicinfo.uploadlogo.checked;
    this.setData({
      iteminfo: this.data.iteminfo,
    });
  },
  //是否提交需求文档----end
  


  tappre:function(e) {
    var that = this;
    if (that.data.activeindex <= -1)
      return;
    else {
      that.setData({
        activeindex: that.data.activeindex - 1,
      });
    }
  },


  changeapptype:function (e) {
    var id = e.detail.value;
    console.log(e);
    this.setData ({
        producttypeindex:id,
    });
  },

  tapnext:function(e) {
      var that = this;
      if(that.data.activeindex >=that.data.releaselength)
        return;
      else {
        that.setData({
            activeindex:that.data.activeindex+1,
        });
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