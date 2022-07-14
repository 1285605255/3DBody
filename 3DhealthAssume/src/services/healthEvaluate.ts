/**

 * @author MikyMei

 * @date 2022-01-07 13:49

 */


import {request} from 'umi';

const headers = {
  Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQyMTQ1MzM1LCJqdGkiOiIyMmNkM2Q3M2M2OTc0OWY3ODBlNTc4N2IxY2QzNDM4MyIsInVzZXJfaWQiOjN9.ICsegk7iRf4Mv9Orlp4bl_tOlXNFIm_gBOmpwxXpsXQ'
}


/**
 * 携带的token，一周有效，测试账号：test01， 密码：1233456
 *
 * */
// const  headers= {"Authorization": "Bearer" +" "+"IuRp3mTXp9djH9aVIQLxFdnTKH1VVDaNkVaOdKSBrJVV5giwBcV0blW1gs1oYJ8X"};

export async function GetPersonalHealthInfo(params: any) {

  const data = [
    {
      name: "路明明",
      gender: "男",
      last_check_score: 94,
      last_check_time: "2017-12-08",
      user_id: "2017014713",
      BMI: 3.5, // 这个主要用来确定用户应该加载的模型
    }
  ]
  return data;


  // return request('/api2/health/3d/user_basic_info/', {
  //   method: 'GET',
  //   params,
  //   headers
  //
  // });
}

export async function GetAllOrgaList(params: any) {
  // return {
  //   code: 2000,
  //   data: [
  //     {
  //       "上身部位": [
  //         {name: "皮肤", exceptionCount: 4, score: 68}
  //       ],
  //       "骨骼部位": [
  //         {name: "腕骨", exceptionCount: 2, score: 52},
  //         {name: "颈椎", exceptionCount: 3, score: 53},
  //         {name: "锁骨", exceptionCount: 4, score: 54},
  //         {name: "颅骨", exceptionCount: 5, score: 55},
  //         {name: "牙齿_上", exceptionCount: 6, score: 56},
  //         {name: "股骨", exceptionCount: 7, score: 57},
  //         {name: "腓骨", exceptionCount: 8, score: 58},
  //         {name: "肱骨", exceptionCount: 9, score: 59},
  //         {name: "踝关节", exceptionCount: 1, score: 60},
  //         {name: "下颌骨", exceptionCount: 2, score: 61},
  //         {name: "牙齿_下", exceptionCount: 3, score: 62},
  //         {name: "手", exceptionCount: 4, score: 63},
  //         {name: "脚", exceptionCount: 5, score: 64},
  //         {name: "骨盆", exceptionCount: 6, score: 65},
  //         {name: "桡骨", exceptionCount: 7, score: 66},
  //         {name: "肋骨", exceptionCount: 8, score: 67},
  //         {name: "骶骨", exceptionCount: 9, score: 68},
  //         {name: "肩胛骨", exceptionCount: 1, score: 69},
  //         {name: "胸骨", exceptionCount: 2, score: 70},
  //         {name: "跗骨", exceptionCount: 3, score: 71},
  //         {name: "胫骨", exceptionCount: 4, score: 72},
  //         {name: "尺骨", exceptionCount: 5, score: 73},
  //         {name: "脊柱", exceptionCount: 6, score: 74},
  //         {name: "跟骨", exceptionCount: 1, score: 50},
  //       ],
  //       "内脏部位": [
  //         {name: "生殖系统", exceptionCount: 1, score: 46},
  //         {name: "静脉", exceptionCount: 2, score: 52},
  //         {name: "动脉", exceptionCount: 3, score: 53},
  //         {name: "大脑", exceptionCount: 4, score: 54},
  //         {name: "消化系统", exceptionCount: 5, score: 55},
  //         {name: "小肠", exceptionCount: 6, score: 56},
  //         {name: "胃部", exceptionCount: 7, score: 57},
  //         {name: "肝脏", exceptionCount: 8, score: 58},
  //         {name: "支气管", exceptionCount: 9, score: 59},
  //         {name: "肺", exceptionCount: 1, score: 60},
  //         {name: "肾脏", exceptionCount: 2, score: 61},
  //         {name: "心脏", exceptionCount: 3, score: 62},
  //         // {name: "心脏(动画)", exceptionCount: 3, score: 62},
  //
  //       ],
  //       "全身性器官": [
  //         {name: "甲状腺", exceptionCount: 1, score: 47},
  //         {name: "垂体", exceptionCount: 2, score: 52},
  //         {name: "胸腺", exceptionCount: 3, score: 53},
  //
  //
  //       ]
  //
  //
  //     }]
  // }

  return {
    code: 2000,
    data: [
      {
        "腹部": [{name: "胃", exceptionCount: 2, score: 52},
          {name: "小肠", exceptionCount: 3, score: 53},
          {name: "肝脏", exceptionCount: 4, score: 54},
          {name: "大肠", exceptionCount: 1, score: 55},
          {name: "肛", exceptionCount: 2, score: 56},
          {name: "肾脏", exceptionCount: 3, score: 57},
          {name: "输尿管", exceptionCount: 4, score: 58},
          {name: "膀胱", exceptionCount: 2, score: 59},
          {name: "尿道", exceptionCount: 3, score: 60},
          {name: "腰椎关节", exceptionCount: 4, score: 61},
          {name: "腰肌", exceptionCount: 1, score: 62},
          {name: "睾丸", exceptionCount: 2, score: 63},
          // {name: "睾丸", exceptionCount: 3, score: 64},
          {name: "输精管", exceptionCount: 4, score: 65},
          {name: "前列腺", exceptionCount: 2, score: 66},],

        "上肢": [{name: "肩关节", exceptionCount: 4, score: 68},
          {name: "肩肌", exceptionCount: 1, score: 69},
          {name: "肘肌", exceptionCount: 2, score: 70},
          {name: "手肘", exceptionCount: 3, score: 71},
          {name: "手腕", exceptionCount: 4, score: 72},
          {name: "手指", exceptionCount: 2, score: 73},],
        "神经": [{name: "中枢神经系统", exceptionCount: 3, score: 74},
          {name: "周围神经系统", exceptionCount: 4, score: 75},],
        "头面部": [{name: "牙", exceptionCount: 1, score: 76},
          {name: "口", exceptionCount: 2, score: 77},
          {name: "咽", exceptionCount: 3, score: 78},
          {name: "喉和会厌", exceptionCount: 4, score: 79},
          {name: "鼻", exceptionCount: 2, score: 80},
          {name: "血_脑屏障", exceptionCount: 3, score: 81},
          {name: "头颈部", exceptionCount: 4, score: 82},
          {name: "血_眼屏障", exceptionCount: 1, score: 83},
          {name: "耳", exceptionCount: 2, score: 84},
          {name: "面部关节", exceptionCount: 3, score: 85},
          {name: "面部肌肉", exceptionCount: 4, score: 86},
          {name: "颈肌", exceptionCount: 2, score: 87},
          {name: "颈椎", exceptionCount: 3, score: 88},],
        "下肢": [{name: "髋肌", exceptionCount: 4, score: 89},
          {name: "髋部", exceptionCount: 1, score: 90},
          {name: "骶骨", exceptionCount: 2, score: 91},
          {name: "骨盆肌", exceptionCount: 3, score: 92},
          {name: "股骨", exceptionCount: 4, score: 93},
          {name: "膝关节", exceptionCount: 2, score: 94},
          {name: "膝肌", exceptionCount: 3, score: 95},
          {name: "足关节", exceptionCount: 4, score: 96},],
        "胸部": [{name: "食管", exceptionCount: 1, score: 97},
          // {name: "血管", exceptionCount: 3, score: 67},
          {name: "心脏", exceptionCount: 2, score: 98},
          {name: "肺脏", exceptionCount: 3, score: 99},
          {name: "支气管", exceptionCount: 4, score: 100},
          {name: "气管", exceptionCount: 2, score: 90},
          {name: "血_胸腺屏障", exceptionCount: 3, score: 87},
          {name: "胸椎", exceptionCount: 4, score: 86},],
        "全身": [{name: "血管", exceptionCount: 3, score: 67},
          {name: "皮肤", exceptionCount: 1, score: 88},],
      }
    ]


  }

  // return request('/api2/getAllPermissionList', {
  //   method: 'GET',
  //   params,
  // });
}

export async function GetPersonalScoreHistory(params: any) {

  const data = [
    {
      checkup_id: 1636690,
      checkup_time: "2017-12-08",
      score: 94,

    }
  ]

  return data;

  // return request('/api2/health/health/user_year_score_chart/', {
  //   method: 'GET',
  //   params,
  //   headers
  // });
}

//
export async function GetCommonScoreHistory(params: any) {

  return {
    avg: 78.8697
  }
  // return request('/api2/health/health/avg_score_total/', {
  //   method: 'GET',
  //   params,
  //   headers
  // });
}

//
export async function GetKeyHealthIndex(params: any) {

  const data = [
    {
      name: "心率",
      min: 55,
      max: 105,
      score: 55,
    },
    {
      name: "血压",
      max: 120,
      min: 50,
      score: "120 / 80",
    },
    {
      name: "血糖",
      min: 4.0,
      max: 7.0,
      score: 7.5,
    },
    {
      name: "BMI",
      min: 4.0,
      max: 7.0,
      score: 3.5,
    },
  ]

  return {code: 200, data};

  // return request('/api2/health/health/avg_score_total/', {
  //   method: 'GET',
  //   params,
  // });
}

export async function AddNewRole(params: any) {
  // return request('/api2/account/permission/manage/', {
  //   method: 'POST',
  //   data: params,
  // });
}


/**
 * 下面的两个方法，都是获得器官的得分历史和同质人群的历史得分
 * */
export async function GetOrgaScoreHistory(params: any) {

  return {
    code: 200,
    data: [
      {
        "checkup_id": 1636690,
        "checkup_time": "2017-12-08",
        "score": 54,
      },
      {
        "checkup_id": 1636691,
        "checkup_time": "2018-12-08",
        "score": 61,
      },
      {
        "checkup_id": 1636692,
        "checkup_time": "2019-12-08",
        "score": 90,
      },
      {
        "checkup_id": 1636692,
        "checkup_time": "2020-12-08",
        "score": 50,
      },
      {
        "checkup_id": 1636692,
        "checkup_time": "2021-12-08",
        "score": 46,
      }
    ]
  }

}


export async function GetOrgaCommonScoreHistory(params: any) {

  return {
    code: 200,
    data: [
      {
        "avg": 78.34
      }
    ]
  }
}


export async function GetOrgaDetailInfo(params: any) {
  let illType: any;

  if (params.orgaName.includes("胃")) {
    illType = [
      {
        illName: "胃癌",
        illDesc: "胃良性肿瘤一类源于胃壁黏膜上皮组织的腺瘤或息肉样腺瘤。另一类源于胃壁间叶组织的平滑肌瘤、纤维瘤、神经纤维瘤、脂肪瘤、血管瘤等。"
      },
      {
        illName: "胃炎",
        illDesc: "胃炎（gastritis）是各种原因引起的胃黏膜炎症，为最常见的消化系统疾病之一。"
      },
      {
        illName: "胃溃疡",
        illDesc: "胃溃疡是指发生在胃角、胃窦、贲门和裂孔疝等部位的溃疡，是消化性溃疡的一种。"
      },

    ]
  } else {
    illType = [
      {
        illName: "异常指标1",
        illDesc: "这是一段关于异常指标1的描述。"
      },
      {
        illName: "异常指标2",
        illDesc: "这是一段关于异常指标2的描述。"
      }
    ]
  }

  return {
    code: 200,
    data: [
      {
        name: params.orgaName,
        desc: "这是一段相关的器官描述，有后台传过来",
        orgaPicture: [
          "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F1101%252F04b2a765j00r1v3t0000kc000cy00cyc.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1644569985&t=f21fa8d0b5c762e2828aa76c5ba08869",
          "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F10474177116%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1644570012&t=d0ecd4ca78873c88cadb40eab6215047",
          "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp9.itc.cn%2Fimages01%2F20210611%2Fa2ad1613d0944d55ab1f462f4105f877.png&refer=http%3A%2F%2Fp9.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1644570058&t=f1916a151febb1f6359dd9a71c613cce"

        ],
        illType: illType,

      }
    ]
  }

  /*
  *
  *   return request('/api2/health/health/avg_score_total/', {
    method: 'GET',
    params,
    headers
  });
  *
  * */
}

export async function GetSignleWholeOrgaIll(params: any) {

  return {
    code: 200,
    data: [

      [
        {
          name: "白血病",
          videoUrl: "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4",
          illDesc: "白血病是一类造血干细胞恶性克隆性疾病。克隆性白血病细胞因为增殖失控、分化障碍、凋亡受阻等机制在骨髓和其他造血组织中大量增殖累积，并浸润其他非造血组织和器官，同时抑制正常造血功能。临床可见不同程度的贫血、出血、感染发热以及肝、脾、淋巴结肿大和骨骼疼痛。"
        },
        {
          name: "系统性红斑狼疮",
          videoUrl: "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4",
          illDesc: "系统性红斑狼疮（SLE）是一种多发于青年女性的累及多脏器的自身免疫性炎症性结缔组织病，早期、轻型和不典型的病例日渐增多。"
        },
        {
          name: "类风湿关节炎",
          videoUrl: "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4",
          illDesc: "类风湿关节炎（RA）是一种病因未明的慢性、以炎性滑膜炎为主的系统性疾病。其特征是手、足小关节的多关节、对称性、侵袭性关节炎症，经常伴有关节外器官受累及血清类风湿因子阳性，可以导致关节畸形及功能丧失。"
        },
        {
          name: "混合性结缔组织病",
          videoUrl: "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4",
          illDesc: "1972年Sharp等首先提出一种同时或不同时具有系统性红斑狼疮（SLE）、多发性肌炎（PM）、硬皮病（SSc）、类风湿关节炎（RA）等疾病的混和表现，血中有高滴度效价的斑点型ANA和高滴度U1RNP抗体的疾病，命名为混合性结缔组织病（MCTD）。"
        },
        {
          name: "贝赫切特综合征",
          videoUrl: "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4",
          illDesc: "贝赫切特综合征又称白塞病，是一种全身性免疫系统疾病，属于血管炎的一种。其可侵害人体多个器官，包括口腔、皮肤、关节肌肉、眼睛、血管、心脏、肺和神经系统等，主要表现为反复口腔和会阴部溃疡、皮疹、下肢结节红斑、眼部虹膜炎、食管溃疡、小肠或结肠溃疡及关节肿痛等。"
        },

      ]

    ]
  }

}

export async function GetOrgaHealthAdvice(params: any) {

  return {
    code: 200,
    data: [
      "饮食宜软，易消化，少食刺激性及过冷、过热、过硬的食物，定时定量进餐，细嚼慢咽，戒烟酒，少用对胃有刺激的药物，必要时检查胃镜。",
      "（奥美拉唑/埃索美拉唑20mg　Bid＋阿莫西林1000mg Bid＋克拉霉素0.5　Bid ＋枸橼酸铋钾220mg Bid，正规服用14天，停药一月后复查呼气试验），随访胃镜。",
      "每年随访胃镜，消化科随诊。"
    ]
  }
}

export async function GetSpecificIndexDetail(params: any) {
  return {
    code: 200,
    data: [
      {
        projectName: `${params.indexName}项目一`,
        resultKeyWords: {content: "“贲门”增生性息肉", direction: ""},
        normalRank: "--", careDegree: 2.5
      },
      {
        projectName: `${params.indexName}项目二`,
        resultKeyWords: {content: 249, direction: "up"},
        normalRank: "70～200ng/ml",
        careDegree: 3
      },
      {
        projectName: `${params.indexName}项目三`,
        resultKeyWords: {content: 33.1, direction: "down"},
        normalRank: "1～28.2ng/ml",
        careDegree: 4.5
      },
    ]
  }
}
