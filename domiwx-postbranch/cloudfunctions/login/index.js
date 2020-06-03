// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
 // var value = process.env;
  //console.log(value);
  return { 
    openid: wxContext.OPENID,
    //value,
    //appid: wxContext.APPID,
  }
}