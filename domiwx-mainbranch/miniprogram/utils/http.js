module.exports = {
  httpClient: httpClient,
  httpPost: httpPost,
}

function httpClient (url, callback) {
  wx.request({
    url,
    data: {},
    header: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      callback(null, res.data)
    }
  })
}

function httpPost(url, data, callback) {
  wx.request({
    url,
    data: data,
    method: "POST",
    header: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      callback(null, res.data)
    }
    , fail: function (error) {
      callback(error)
    }
  })
}


