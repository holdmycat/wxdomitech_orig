var appdata = getApp().globalData;
var config = require('../../utils/config.js')
var app = getApp();
var httpclient = require('../../utils/http');
let isRefesh = false; //正在下拉更多
let isloadmore = false; //正在下载更多
let istop = true;
const limit = 5;

Page({

  /**
   * Page initial data
   */
  data: {
    isttest:false,
    type:'0',
    wxid:'',
    start: 0,
    loadmoreing: true,
    apptype: config.apptype().list,
    mydata:[],
    wH: 300,
    isTop: true, //滚动条顶部
    loadMore: true,
    topNum: 0,
    itemfilterarray: config.itemfilterarray().list,
    upimgurl: "",
    logourl: appdata.httpimg + 'logo.png',
    registarray: config.registarray().list,
    busimgurl: appdata.httpimg + 'business.png',
    webimgurl: appdata.httpimg + 'webproject.png',
    meinfo:config.meInfo().list,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this;
    if (this.data.topNum != 0) {
      this.setData({ topNum: 0 })
    }
    console.log(appdata.windowHeight);
    var height = 0;
    if(this.data.isttest == false) {
    
      if(options.type != '0') {
          height = appdata.windowHeight - 160 - 10;
      }
      else {
        height = appdata.windowHeight - 160 - 40 - 20 - 10;
      }
      this.setData({
        upimgurl: appdata.httpimg + 'bg.png',
        wxid: appdata.userinfo.wxid,
        wH: height,
        type:options.type,
        //wxid: 'oHkhN5VfRCoLLwPgVSG0m7dmhAW8',
      });

      //向服务器发送申请数据
      this.onPullDownRefresh2();
    }
    else {
      wx.getSystemInfo({
        success: function (res) {
          getApp().globalData.windowWidth = res.windowWidth;
          getApp().globalData.windowHeight = res.windowHeight;
          //通过云函数login获取wxid，最终获取用户信息,成功获取个人信息，调用主页逻辑接口requestmainpage.
          height = res.windowHeight - 160 - 10;
          that.setData({
            upimgurl: appdata.httpimg + 'bg.png',
            wxid: appdata.userinfo.wxid,
            wH: height,
            type: 2,
            wxid: 'oHkhN5VfRCoLLwPgVSG0m7dmhAW8',
          });

          //向服务器发送申请数据
          that.onPullDownRefresh2();
          return;
        }
      }); 
    }
   
   
   
  },
  onPullDownRefresh: function () {
    this.onPullDownRefresh2()
  },
  stopPullDownRefresh: function () {
    wx.stopPullDownRefresh({
      complete: function (res) {
        wx.hideToast()
        console.log(res, new Date())
      }
    })
  },

  onPullDownRefresh2() {
    isRefesh = true;
    isloadmore = false;
    istop = false;
    // wx.showToast({
    //   title: 'loading...',
    //   icon: 'loading',
    //   mask:true,
    // })

    let self = this;
    setTimeout(() => {
      //pageIndex++;
      self.getData();

    }, 2000)
  },
  
  bindPickerChange:function (e) {
    console.log(e);
    var id = e.detail.value;
    switch (e.currentTarget.id) {
      case '0':{
        
        if (this.data.itemfilterarray[0].index != id) {
          this.data.itemfilterarray[0].index = id;
        } 
        //向服务器发送筛选申请
        break;
      }
      case '1':{
        if (this.data.itemfilterarray[1].index != id) {
          this.data.itemfilterarray[1].index = id;
        } 
          //向服务器发送筛选申请
        break;
      }
      case '2':{
        if (this.data.itemfilterarray[2].index != id) {
          this.data.itemfilterarray[2].index = id;
        } 
          //向服务器发送筛选申请
        break;
      }
    }
    this.onPullDownRefresh2();
    this.setData({
      itemfilterarray: this.data.itemfilterarray,
    }); 
  },

  //滚动条到top
  doScrollTop(e) {
    istop = this.data.isTop
    if (e.detail.scrollTop < 10) {

      if (!istop) {
        this.setData({
          isTop: true
        })
      }
    } else {
      if (istop) {
        this.setData({
          isTop: false
        })
      }
    }
  },

  /**
   * 更多
   */
  loadmore() {
    let self = this;
  
    isloadmore = true;

    self.setData({
      loadMore: isloadmore,
    })
    setTimeout(() => {
      //pageIndex++;

      self.getData();

    }, 2000)
  },

  getData() {
    var body = {};
    if(isRefesh) {
      this.setData({
        mydata:[],
        start:0,
      });
    }
    console.log('isRefesh', isRefesh);

    console.log('start', this.data.start);
    
    switch (this.data.type) {
      case '0':{
        this.mypros();
        break;
      }
      case '1':{
        this.mysales();
        break;
      }
      case '2':{
        this.mybonus ();
        break;
      }
    }
  },

  mypros:function () {
    var body = {
      wxid: appdata.userinfo.wxid,
      upwxid: appdata.userinfo.upwxid,
      start: this.data.start,
      limit: 5,
      belong: this.data.itemfilterarray[0].index,
      state: this.data.itemfilterarray[1].index,
      apptype: this.data.itemfilterarray[2].index,
    }
    if (appdata.isdebug) {
      console.log('body', body);
    }
    var url = appdata.httpaddr + 'getmypro';
    httpclient.httpPost(url, body, (error, data) => {
      console.log(data);
      if (appdata.isdebug) {
        console.log('data', data);
      }
      //wx.hideLoading();
      let mydata = this.data.mydata;
      if (isRefesh) {
        this.stopPullDownRefresh();
        this.data.mydata = data.rows;
        this.data.start = 0;
      } else {
        for (let i = 0; i < data.rows.length; i++) {
          mydata.push(data.rows[i])
        }
      }
     
      this.data.start += data.rows.length;
      this.setData({
        loadMore: false,
        mydata: this.data.mydata,
        start: this.data.start,
      })
      isRefesh = false;
      isloadmore = false;
      if (appdata.isdebug) {
        console.log('数组长度', this.data.start);
        console.log('数组内容', this.data.mydata);
      }
    });
  },

  mysales : function () {
    var url = appdata.httpaddr + 'getsecid/' + this.data.wxid + '/' + this.data.start + '/5';
    console.log('url', url);
    httpclient.httpClient(url, (error, data)=>{
      //wx.hideLoading();
      console.log(data);
      let mydata = this.data.mydata;
      if (isRefesh) {
        this.stopPullDownRefresh();
        this.data.mydata = data.rows.rows;
        this.data.start = 0;
      } else {
        for (let i = 0; i < data.rows.rows.length; i++) {
          mydata.push(data.rows.rows[i])
        }
      }
      console.log('data.rows.rows', data.rows.rows);
      this.data.start += data.rows.rows.length;
      this.setData({
        loadMore: false,
        mydata: this.data.mydata,
        start: this.data.start,
      })
      isRefesh = false;
      isloadmore = false;
      if (appdata.isdebug) {
        console.log('数组长度', this.data.start);
        console.log('数组内容', this.data.mydata);
      }
    });
  },

  mybonus : function () {
    var url = appdata.httpaddr + 'getbonus/' + this.data.wxid + '/' + this.data.start + '/5';
    if(appdata.isdebug)
      console.log('url', url);
    httpclient.httpClient(url, (error, data) => {
      if (appdata.isdebug)
        console.log(data);
      let mydata = this.data.mydata;
      if (isRefesh) {
        this.stopPullDownRefresh();
        this.data.mydata = data.rows.rows;
        this.data.start = 0;
      } else {
        for (let i = 0; i < data.rows.rows.length; i++) {
          mydata.push(data.rows.rows[i])
        }
      }
      if (appdata.isdebug)
        console.log('data.rows.rows', data.rows.rows);
      this.data.start += data.rows.rows.length;
      this.setData({
        loadMore: false,
        mydata: this.data.mydata,
        start: this.data.start,
      })
      isRefesh = false;
      isloadmore = false;
      if (appdata.isdebug) {
        console.log('数组长度', this.data.start);
        console.log('数组内容', this.data.mydata);
      }
    });
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },


  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})