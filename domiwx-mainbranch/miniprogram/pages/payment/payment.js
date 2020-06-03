// miniprogram/pages/payment/payment.js
const httputil = require('../../utils/http.js');
var appdata = getApp().globalData;
var config = require('../../utils/config.js')
var app = getApp();
const addr = 'http://127.0.0.1:6001/'
Page({

  /**
   * Page initial data
   */
  data: {
  
  },

  pay: function () {
    var openid = 'oHkhN5VfRCoLLwPgVSG0m7dmhAW8';
    var url = addr + 'requestpay/' + '11/' + openid;
    console.log(url);
    var pay_Sign = '';
    httputil.httpClient (url, (error, data) =>{

      console.log(data.data);
      wx.requestPayment({
        timeStamp: data.data.timeStamp,
        nonceStr: data.data.nonce_str,
        package: 'prepay_id='+data.data.prepay_id,
        signType: 'MD5',
        paySign: data.data.paySign,
        // trade_type:'JSAPI',
        // total_fee: '1',
        success:function(res) {
            console.log(res)
        },
        fail:function(e) {
            console.log(e);
        }
      })
    })  
  },
  
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    //app.loginprocess(options, this.pay);
    this.pay();
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
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

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