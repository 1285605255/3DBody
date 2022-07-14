import {Effect, Reducer} from 'umi';
import {Row, Tag} from "antd";
import styles from "@/pages/ExtraModelCom/index.less";
import React from "react";
import {
  GetAllOrgaList,
  GetCommonScoreHistory,
  GetKeyHealthIndex,
  GetOrgaCommonScoreHistory,
  GetOrgaDetailInfo,
  GetOrgaHealthAdvice,
  GetOrgaScoreHistory,
  GetPersonalHealthInfo,
  GetPersonalScoreHistory,
  GetSignleWholeOrgaIll, GetSpecificIndexDetail
} from "@/services/healthEvaluate";
import {GetTop4AbnormalOrga, GetTop4Detail} from "@/utils/dataReStructure";


export type StateType = {
  orgaName?: any;
  orgaDesc?: any;
  illList?: any;
  infoDisplay?: any;
  infoTop?: any;
  infoRight?: any;

  loadStatus?: any; // 定义一个全局地变量，用于页面加载状态，主要是根据模型地加载地完成度
  /**
   * 下面的变量均为请求接口得来的数据
   * 1，刚进入页面的请求
   * */

  personalInfo?: any;
  allOrgaList?: any; // 所有有的异常器官，包括异常器官内部的得分，异常指标数目， 包括全身性的异常标识
  personalHealthScore?: any; // 个人健康的分
  personalScoreHistory?: any; // 个人健康历史的分，以年为单位，
  commonScoreHistory?: any; // 同质人群健康历史的分，以年为单位，
  keyHealthIndex?: any;// 四种人体健康指标，BMI,心率，血糖，血压
  abnormalOrgaTop4?: any;// 异常器官中最差的四个
  abnormalOrgaTop4Detail?: any; // 异常器官中最差四个地详细信息，包括他们的历史的分和同质人群得分

  wholeOrgaIll?: any; // 全身性一个异常器官的所有异常标识

  selectedOrga?: any; // 当前选中的器官，里面会包含当前器官的再初次进入页面请求道的基础信息，如，健康得分，异常标识
  currentOrgaScoreHistory?: any; // 当前器官的历史的分
  currentOrgaCommonHistory?: any; // 当前器官的同质人群历史的分
  currentOrgaHealthAdvice?: any; // 当前器官的医生建议，数组，
  currentIindexDetail?: any; // 当前一场表示地异常指标


  /**
   * 2,点击器官需要的请求
   * */


};

export type ModelType = {
  namespace: string;
  state: StateType;
  effects: {
    getAllPersonalHealthInformation: Effect;  // 刚进入页面时，请求所有的个人健康相关信息接口
    getOrgaDetail: Effect;
    getWholeOrgaIllDetail: Effect;
    getSelectedOrgaDetail: Effect;
    getSelectedIndexProject: Effect; // 获得当前的选中的指标的项目细节

  };
  reducers: {
    initOrgaInfo: Reducer<StateType>;
    initIllList: Reducer<StateType>;

    initAllPersonalHealthInformation: Reducer<StateType>; // 初始化所有的个人健康信息

    changeLoadStatus: Reducer<StateType>;
    initWholeOrgaIll: Reducer<StateType>;

    initSelectedOrga: Reducer<StateType>;
    initSelectedOrgaDetail: Reducer<StateType>;
    initSelectedIndexDetail: Reducer<StateType>;
  };
};

const Model: ModelType = {
  namespace: 'bodyModel',

  state: {
    orgaName: '55',
    orgaDesc: '55',
    illList: {},
    infoDisplay: 'none',
    infoTop: "50px",
    infoRight: "50px",
    loadStatus: false,

    personalInfo: {},
    allOrgaList: {}, // 以部位进行器官分类， 部位为属性名，value为数组，数组中的元素为器官的相关信息对象
    personalHealthScore: '', // 个人健康的分, 字符串即可
    personalScoreHistory: [], // 数组里面的元素为对象如：{2015:78}, 需要注意个人与同质人群的一致性，当数据缺失的时候补齐
    commonScoreHistory: [], // 同质人群健康历史的分，以年为单位，
    keyHealthIndex: {},// 四种人体健康指标，key值为指标的名字如： BMI:{score：55， min:30, max:65}
    abnormalOrgaTop4: [], // 异常器官中最差的四个,
    abnormalOrgaTop4Detail: [], // 异常器官中最差的四个, "心脏":{score:55, commonHistory:[], scoreHistory:[]}， 在第二次调用的时候调用·

    wholeOrgaIll: [],


    selectedOrga: null, // 当前选中的器官，里面会包含当前器官的再初次进入页面请求道的基础信息，如，健康得分，异常标识
    currentOrgaScoreHistory: [], // 当前器官的历史的分
    currentOrgaCommonHistory: [], // 当前器官的同质人群历史的分
    currentOrgaHealthAdvice: [], // 当前器官的医生建议，数组，
    currentIindexDetail: [], // 当前一场表示地异常指标
  },

  effects: {


    * getAllPersonalHealthInformation({payload}, {call, put})  {
      const newPersonalHealthInfo = yield call(GetPersonalHealthInfo, payload.params.personalHealthInfoParams);
      const newAllOrgaList = yield call(GetAllOrgaList, payload.params.allOrgaListParams);
      const newPersonalScoreHistory = yield call(GetPersonalScoreHistory, payload.params.personalScoreHistoryParams);
      const newCommonScoreHistory = yield call(GetCommonScoreHistory, payload.params.personalScoreHistoryParams);// 个人的历年参数一样
      const newKeyHealthIndex = yield call(GetKeyHealthIndex, payload.params.keyHealthIndexParams);// 个人的历年参数一样

      /**
       * 获取四个，top4地器官的相关信息
       * */
      const newAbnormalTop4 = GetTop4AbnormalOrga(newAllOrgaList.data[0]);
      const tempList = JSON.parse(JSON.stringify(newAbnormalTop4));
      if (tempList.length > 0) {
        yield call(GetTop4Detail, tempList);
      }


      if (newPersonalHealthInfo[0]
        && newAllOrgaList.data[0]
        && newPersonalScoreHistory[0]
        && newCommonScoreHistory
        && newKeyHealthIndex.data) {

        yield put({
          type: "initAllPersonalHealthInformation",
          payload: {
            PersonalHealthInfo: newPersonalHealthInfo[0],
            AllOrgaList: newAllOrgaList.data[0],
            PersonalScoreHistory: newPersonalScoreHistory[0],
            CommonScoreHistory: newCommonScoreHistory,
            KeyHealthIndex: newKeyHealthIndex.data,
            AbnorMalTop4: newAbnormalTop4,
            PersonalHealthScore: newPersonalHealthInfo[0].last_check_score || 0,
            AbnormalTop4Detail: tempList,
          }
        })
      }


    },

    * getOrgaDetail({payload}, {call, put}) {
      const detailResponse = yield call(GetOrgaDetailInfo, payload.orgaParams);
      if (detailResponse.code === 200) {
        yield put({
          type: "initIllList",
          payload: {
            newIllList: detailResponse.data[0],
          }
        })
      }
    },

    * getWholeOrgaIllDetail({payload}, {call, put}) {
      const illDetailResponse = yield call(GetSignleWholeOrgaIll, payload.params);

      if (illDetailResponse.code === 200) {

        yield put({
          type: "initWholeOrgaIll",
          payload: {
            newWholeOrgaIll: illDetailResponse.data[0]
          }
        })
      }
    },

    * getSelectedOrgaDetail({payload}, {call, put}) {
      const scoreHistoryResponse = yield call(GetOrgaScoreHistory, payload.orgaParams);
      const commonHistoryResponse = yield call(GetOrgaCommonScoreHistory, payload.orgaParams);
      const healthAdviceResponse = yield call(GetOrgaHealthAdvice, payload.orgaParams);
      // 在初始化的时候，请求第一个异常标识地异常项目

      yield put({
        type: "initSelectedOrgaDetail",
        payload: {
          newOrgaHistory: scoreHistoryResponse.data || [],
          newCommonHistory: commonHistoryResponse.data || [],
          newHealthAdvice: healthAdviceResponse.data || [],
        }
      });
      yield put({
        type: "initSelectedOrga",
        payload: {newSelectedOrga: payload.orgaAll}
      })
    },

    * getSelectedIndexProject({payload}, {call, put}) {
      /**
       * 获得当前选中指标地
       * */

      const indexDetailResponse = yield call(GetSpecificIndexDetail, payload.indexParams);
      yield put({
        type: "initSelectedIndexDetail",
        payload: {
          newIndexDetail: indexDetailResponse.data || [],
        }
      })

    }


  },

  reducers: {

    initOrgaInfo(state, {payload}) {
      return {
        ...state,
        orgaName: payload.newOrgaName,
        orgaDesc: payload.newOrgaDesc,
        illList: payload.newIllList,
      };
    },

    initIllList(state, {payload}) {
      return {
        ...state,
        illList: payload.newIllList,
      };
    },

    initAllPersonalHealthInformation(state, {payload}) {
      return {
        ...state,
        personalInfo: payload.PersonalHealthInfo,
        allOrgaList: payload.AllOrgaList,
        personalHealthScore: payload.PersonalHealthScore,
        personalScoreHistory: payload.PersonalScoreHistory,
        commonScoreHistory: payload.CommonScoreHistory,
        keyHealthIndex: payload.KeyHealthIndex,
        abnormalOrgaTop4: payload.AbnorMalTop4,
        abnormalOrgaTop4Detail: payload.AbnormalTop4Detail
      }
    },

    changeLoadStatus(state, {payload}) {
      return {...state, loadStatus: payload.newLoadStatus}
    },

    initWholeOrgaIll(state, {payload}) {
      return {
        ...state,
        wholeOrgaIll: payload.newWholeOrgaIll,
      }
    },

    initSelectedOrga(state, {payload}) {
      let orgaTemp: any;
      if (payload.newSelectedOrga === state.selectedOrga) {
        orgaTemp = null;
      } else {
        orgaTemp = payload.newSelectedOrga;
      }
      return {
        ...state,
        selectedOrga: orgaTemp,
      }
    },

    initSelectedOrgaDetail(state, {payload}) {
      return {
        ...state,
        currentOrgaScoreHistory: payload.newOrgaHistory, // 当前器官的历史的分
        currentOrgaCommonHistory: payload.newCommonHistory, // 当前器官的同质人群历史的分
        currentOrgaHealthAdvice: payload.newHealthAdvice, // 当前器官的医生建议，数组，
        // currentIindexDetail: payload.newIndexDetail, // 当前一场表示地异常指标,buzai
      }
    },

    initSelectedIndexDetail(state, {payload}) {
      return {
        ...state,
        currentIindexDetail: payload.newIndexDetail, // 当前一场表示地异常指标

      }
    }

  },
};

export default Model;

