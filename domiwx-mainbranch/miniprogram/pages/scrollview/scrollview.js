// miniprogram/pages/scrollview/scrollview.js
var appdata = getApp().globalData;
var config = require('../../utils/config.js')
var httpclient = require ('../../utils/http');

var app = getApp();
let isRefesh = false; //正在下拉更多
let isloadmore = false; //正在下载更多
let istop = true;
const requestnum = 5;

Page({

  /**
   * Page initial data
   */
  data: {
    itemindex:0,
    mydata: [],
    loadmoreing: true,
    wH: 500,
    mydata: [],
    isTop: true, //滚动条顶部
    loadMore: true,
    topNum: 0
  },

  onLoad: function () {
    if (this.data.topNum != 0) {
      this.setData({ topNum: 0 })
    }
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          wH: res.windowHeight - 200,
          upimgurl: appdata.httpimg + 'bg.png',
        });
      }
    });
    this.onPullDownRefresh2();
  },
  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
    this.onPullDownRefresh2()
  },
  
  onPullDownRefresh2() {
    isRefesh = true;
    isloadmore = false;
    istop = false;
    wx.showToast({
      title: 'loading...',
      icon: 'loading'
    })

    let self = this;
    setTimeout(() => {
      //pageIndex++;
      self.getData();

    }, 2000)
  },
  stopPullDownRefresh: function () {
    wx.stopPullDownRefresh({
      complete: function (res) {
        wx.hideToast()
        console.log(res, new Date())
      }
    })
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
    wx.showLoading({
      title: 'loading',
    })
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
    var url = appdata.httpaddr + 'getmypro?wxid=' +
              'oHkhN5VfRCoLLwPgVSG0m7dmhAW8' + '&offset=' + this.data.itemindex + '&limit=' + requestnum;
    
    //receive data from server
    httpclient.httpClient(url, (error, data) => {
      if (appdata.isdebug) {
        console.log('data', data);
      }
    });
    //deal with the data logic

    if(appdata.isdebug) {
      console.log ('url', url);
    }

    wx.hideLoading();
    let mydata = this.data.mydata;
    if (isRefesh) {
      this.stopPullDownRefresh();
      mydata = [0, 1, 2, 3];
    } else {
        if(mydata.length > 5) {

        }
        else {
          for (let i = 0; i < 5; i++) {
            mydata.push(i)
          }
        }
     
    }
    this.setData({
      loadMore: false,
      mydata
    })
    isRefesh = false;
    isloadmore = false;
  },
  
  tabClick: function (e) {
    if (this.data.topNum != 0) {
      this.setData({ topNum: 0 })
    }
    let id = e.currentTarget.id
    if (id == 1) {
      this.setData({
        mydata: []
      })
    } else {
      this.onPullDownRefresh2();
    }
    this.setData({
      //sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
})