module.exports = {
  cachingServerImage: cachingServerImage,
  checkLocalStorage: checkLocalStorage,
  callCloudFunc: callCloudFunc,
}

function callCloudFunc (cloudfunc, callback) {
  wx.cloud.callFunction({
    name: cloudfunc,
    complete: res => {
      if (res.errMsg == "cloud.callFunction:ok") {
        callback({errorcode:0, res:res});
      }
      else if (res.errMsg == 'getStorage:fail data not found') {
        callback({ errorcode: -1, res: res });
      }
      else {
        callback({ errorcode: -2, res: res });
      }
    }
  }) 
}

//检测指定cloudfunc是否具备缓存
function checkLocalStorage (cloudfunc, callback) {
  wx.getStorage({
    key: cloudfunc,
    success: function (res) {
      //console.log(res);
      callback({ errorcode: 0, res: res });
    },
    fail: function (res) {
      //console.log(res);
      if(res.errMsg == 'getStorage:fail data not found') {
        callback({ errorcode: -1, res: res });
      }
    }
  })
}

//缓存服务器图片，并转换成base64
function cachingServerImage (url, callback)  {
  wx.getImageInfo({
    src: url,
    success: function (ret) {
      var path = ret.path;
      wx.getFileSystemManager().readFile({
        filePath: path,
        encoding: 'base64', //编码格式
        success: res => { //成功的回调
          var imageurl = 'data:image/png;base64,' + res.data;
          callback({ errorcode: 0, errormsg: 'null', url: imageurl });
        },
        fail: res => {
          console.log(res);
          callback({ errorcode: -1, errormsg: res, url: '' });
        }
      })
    }
  });
}


