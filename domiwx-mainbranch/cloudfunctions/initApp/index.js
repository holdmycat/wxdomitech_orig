// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
 
  // const countResult = await db.collection('boadcast').count();
  // const tasks = []

    //获取广告信息
    const result = await db.collection('boadcast').get();

    //获取业务信息
    const business = await db.collection('businessInfo').get();
    
    // //获取公司介绍
    // const cmpInfo = await db.collection('cmpIntro').get();

    return { result, business};
    
  // for (let i = 0; i < countResult; i++) {
  //   const promise = db.collection('boadcast').get()
  //   tasks.push(promise)
  // }

  // return (await Promise.all(tasks)).reduce((acc, cur) => {
  //   return {
  //     data: acc.data.concat(cur.data),
  //     errMsg: acc.errMsg,
  //   }
  // })


}