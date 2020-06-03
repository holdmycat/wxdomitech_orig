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
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    if (this.data.topNum != 0) {
      this.setData({ topNum: 0 })
    }
    this.setData({
      upimgurl: appdata.httpimg + 'bg.png',
      wxid:appdata.userinfo.wxid,
      //wxid:'oHkhN5VfRCoLLwPgVSG0m7dmhAW8',
    });

    //向服务器发送申请数据
    this.onPullDownRefresh2();
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
    wx.showToast({
      title: 'loading...',
      icon: 'loading',
      mask:true,
    })

    let self = this;
    setTimeout(() => {
      //pageIndex++;
      self.getData();

    }, 2000)
  },
  getData() {
      var body ={};
      var start = 0;
      if(!isRefesh) {
          start = this.data.start;
      }   
      body = {
        wxid:'oHkhN5VfRCoLLwPgVSG0m7dmhAW8',
        upwxid:'-1',
        start: start,
        limit:5,
        belong: this.data.itemfilterarray[0].index,
        state: this.data.itemfilterarray[1].index,
        apptype: this.data.itemfilterarray[2].index,
      }
      if(appdata.isdebug) {
        console.log('body', body);
      }
      var url = appdata.httpaddr + 'getmypro';
      httpclient.httpPost(url, body, (error, data) =>{
          console.log(data);
          if (appdata.isdebug) {
            console.log('data', data);
          }
          wx.hideLoading();
          let mydata = this.data.mydata;
          if (isRefesh) {
            this.stopPullDownRefresh();
            this.data.mydata = data.rows;
            //console.log(data.rows);

          } else {
            for (let i = 0; i < data.rows.length; i++) {
              mydata.push(data.rows[i])
            }
          }
          this.data.start += data.rows.length;
          this.setData({
            loadMore: false,
            mydata:this.data.mydata,
            start:this.data.start,
          })
          isRefesh = false;
          isloadmore = false;
          if(appdata.isdebug) {
            console.log('数组长度', this.data.start);
            console.log('数组内容', this.data.mydata);
          }
      });
  },
  bindPickerChange:function (e) {
      console.log(e);
      var id = e.detail.value;
      var type ='';//类型
      var index = '';//类型index

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