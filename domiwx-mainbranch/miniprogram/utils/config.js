module.exports = {
  apptype: apptype,
  areatype: areatype,
  businessarray: businessarray,
  requirearray: requirearray,
  postarray: postarray,
  workdurationarray: workdurationarray,
  registarray: registarray,
  meInfo: meInfo,
  itemfilterarray:itemfilterarray,
  apptypename: apptypename,
}

//UI:个人信息
function meInfo() {
  var arr = {
    list: [
      {
        iconaddr: '../../images/item.png',
        name: '我的项目',
        hasSec: true,//是否有二级界面
        linkpage: '',
        rightarrowaddr: '../../images/rightarrow.png',

      },
      {
        iconaddr: '../../images/businessman.png',
        name: '我的业务员',
        hasSec: true,//是否有二级界面
        linkpage: '',
        rightarrowaddr: '../../images/rightarrow.png',

      },
      {
        iconaddr: '../../images/money.png',
        name: '我的收益',
        hasSec: true,//是否有二级界面
        linkpage: '',
        rightarrowaddr: '../../images/rightarrow.png',

      }
    ]
  }

  return arr;

}

//UI：发布需求
function postarray() {
  var arr = {
    list: [
     
      {
        "iconurl": getApp().globalData.httpimg + 'icons/1.png',
        "name": "应用类型*",
      },
      {
        "iconurl": getApp().globalData.httpimg + 'icons/2.png',
        "name": "预计工期*",
      },
      {
        "iconurl": getApp().globalData.httpimg + 'icons/5.png',
        "name": "您的标题*(至少输入5个字)",
      },
    ]
  }
  return arr;
}

//UI:注册
function registarray() {
  var arr = {
    list: [

      {
        "iconurl": getApp().globalData.httpimg + 'icons/2.png',
        "name": "您的姓名*",
      },
      {
        "iconurl": getApp().globalData.httpimg + 'icons/3.png',
        "name": "您的手机号*",
      },
      {
        "iconurl": getApp().globalData.httpimg + 'icons/4.png',
        "name": "您的验证码",
      },
    ]
  }
  return arr;
}

//数据 ： 工期
function workdurationarray() {
  var arr = {
    list: [
      "30个工作日以下",
      "30 - 60个工作日",
      "60 - 90个工作日",
      "90个工作日以上",
    ]
  }
  return arr;
}

//数据：项目列表
function itemfilterarray () {
  var arr = {
    list: [
      {
          id:0,
          index:0,
          name:'归属:',
          array:[
              '全部',
              '我的项目',
              '业务员项目'
          ],
      },
      {
          id:1,
          index: 0,
          name:'进度:',
          array:[
            '全部',
            '提审',
            '接洽',
            '成交',
            
          ],

      },
      {
          id:2,
          index: 0,
          name:'类型:',
          array:[
            '全部',
            '微信',
            'APP',
            '游戏',
            'AR/VR,'
          ],
      }
    ]
  }
  return arr;
}

//app 类型
function apptype() {
  var arr = {
    list: [
     {
       name:'微信',
       url:'../../images/wx.png',
     },
     {
       name:'APP',
       url:'../../images/app.png'
     },
     {
       name:'游戏',
       url:'../../images/game.png'
     },
     {
       name:'AR/VR',
       url:'../../images/vr.png'
     },
    ]
  }
  return arr;
}

function apptypename() {
  var arr = {
    list: [
      '微信',
      'APP',
      '游戏',
      'AR/VR',
    ]
  }
  return arr;
}

//项目领域 : 电商，音乐，美食，旅游.
function areatype() {
  var arr = {
    list: [
      "美食类",//0
      "金融类",//1
      "电商类",//2
      "数据统计",//3
      "音乐类",//4
      "旅游类",//5
    ]
  }
  return arr;
}

function businessarray() {
  var arr = {
    list: [
      {
        "_id": 0,
        "name": "发布需求",
      },
      {
        "_id": 1,
        "name": "转发赚佣金",
      },
    ]
  }
  return arr;
}

//deprecated
function requirearray() {
  var arr = {
    list: [
      // {
      //   "_id": 0,
      //   "name": "选择企划类型",
      // },
      {
        "_id": 1,
        "name": "完善基本信息",
      },
      {
        "_id": 2,
        "name": "填写详细要求",
      },
      {
        "_id": 3,
        "name": "设置验收阶段",
      },
      {
        "_id": 4,
        "name": "选择增值服务",
      },
      {
        "_id": 5,
        "name": "确认并发布",
      },
    ]
  }
  return arr;
}
