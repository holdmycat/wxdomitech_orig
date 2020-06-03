module.exports = {
  testbroadcast: testbroadcast,
  testbusiness: testbusiness,
  testcmpIntro:testcmpIntro,
  testiteminfo:testiteminfo,
}


function testiteminfo () {

  var arr = {
      skilltype:"js/wx",
      playaddress:"123",
      fronticonurl:'http://127.0.0.1:5001/domiwx/sucpro/fronticon.jpg',
      id:0,
      producttype:0,
      areatype:0,
      date:"2018-11-08",
      cmpname:"常州xxx烤肉餐厅",
      workduration:75,
      imgnum:3,
      imgarray:[
        "http://127.0.0.1:5001/domiwx/sucpro/11.jpg",
        "http://127.0.0.1:5001/domiwx/sucpro/12.jpg",
        "http://127.0.0.1:5001/domiwx/sucpro/13.jpg"
      ],
      itemdescription: " 非常适合有一定用户基础的实体餐饮店，一方面可以通过小程序将最新的产品推荐给用户，通过打折等营销活动激活沉睡客户，裂变边现。",
      basicmodule: "本周推荐，最近流行，发现美食，立刻下单，个人信息，积分打折, 优惠卷等…",
      productmodule:"小程序， 服务器运维，企业后台管理页面",
  }
  return arr;
}

function testcmpIntro () {
  var arr = {
      list:[
        {
          "name":"公司简介",
          "iconurl":"https://646f-domitech-software-54dff5-1257641263.tcb.qcloud.la/cmpIntro/产品介绍-512.jpg?sign=0c6582a637377906711ffd41e8854cd5&t=1542767943",
          "pagename":'cmpIntro',
        },
        {
          "name": "转发赚钱",
          "iconurl": "https://646f-domitech-software-54dff5-1257641263.tcb.qcloud.la/cmpIntro/如何赚钱-512.jpg?sign=0c70f97ca75b081c0c3bb796653439d4&t=1542767958",
          "pagename": 'share',
        },
        {
          "name": "外包流程",
          "iconurl": "https://646f-domitech-software-54dff5-1257641263.tcb.qcloud.la/cmpIntro/外包流程-512.jpg?sign=126c136e740723340b3f7bd6c56acc8f&t=1542767970",
          "pagename": 'workprocedure',
        }
      ]
  }
  return arr;
}

function testbroadcast() {
    var arr = {
        list:[
            {
                "_id":0,
            "bgurl":"https://646f-domitech-software-54dff5-1257641263.tcb.qcloud.la/bc1.png?sign=d9f238e8254a9e0f40ca1300e21b9a85&t=1542683954",
                "pagename":"page0",
            },
            {
              "_id": 1,
              "bgurl": "https://646f-domitech-software-54dff5-1257641263.tcb.qcloud.la/bc1.png?sign=d9f238e8254a9e0f40ca1300e21b9a85&t=1542683954",
              "pagename": "page0",
            },
            {
              "_id": 2,
              "bgurl": "https://646f-domitech-software-54dff5-1257641263.tcb.qcloud.la/bc1.png?sign=d9f238e8254a9e0f40ca1300e21b9a85&t=1542683954",
              "pagename": "page0",
            }
        ]
    }
    return arr;
}

function testbusiness() {
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

