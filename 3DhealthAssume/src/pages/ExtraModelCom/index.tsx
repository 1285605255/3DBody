/**

 * @author MikyMei

 * @date 2021-11-22 15:14

 */


import React, {useEffect, useState, useRef} from 'react';
import styles from './index.less'
import BodyModel from "@/pages/ExtraModelCom/Components/BodyMOdel";
import {
  Avatar,
  Badge,
  Carousel,
  Col,
  Divider,
  Row,
  Tag,
  Tooltip,
  Spin,
  Select,
  Empty,
  Rate,
  Table,
  Radio,
  Button, Space
} from "antd";
import {AntDesignOutlined, CloseCircleOutlined, HeartFilled, HeartOutlined, LoadingOutlined} from "@ant-design/icons";
import {connect, Dispatch} from "umi";
import {JudgeHealthRelationship, MatchOrga} from "@/utils/dataReStructure";
import WholeBodyOrga from "@/pages/ExtraModelCom/Components/WholeBodyOrga";
import MixLineCharts from "@/pages/ExtraModelCom/Components/MixLineCharts";
import MixLineCharts2 from "@/pages/ExtraModelCom/Components/MixLineCharts2";
import MixLineCharts3 from "@/pages/ExtraModelCom/Components/MixLineCharts3";
import MyTable from "@/pages/ExtraModelCom/Components/MyTable";

const {Option} = Select;

const NormalProject: React.FC = (props: { bodyModelInfo: any, dispatch: Dispatch }) => {


  const {bodyModelInfo, dispatch} = props;

  const {
    personalInfo,
    allOrgaList,
    personalHealthScore,
    personalScoreHistory,
    commonScoreHistory,
    keyHealthIndex,
    abnormalOrgaTop4,
    abnormalOrgaTop4Detail,
    loadStatus,

    /**
     * 以下主要用于点击器官之后进行的
     * */

    selectedOrga,
    currentOrgaScoreHistory,
    currentOrgaCommonHistory,
    currentOrgaHealthAdvice,
    currentIindexDetail,
    illList,
    wholeOrgaIll
  } = bodyModelInfo;
  const loadIcon = <LoadingOutlined style={{fontSize: 48}} spin/>;


  const bodyRef = useRef(null);
  const [currentOrga, setCurrentOrga] = useState<any>('');
  const [orgaDescription, setOrgaDescription] = useState<any>('');
  const [illTypeList, setIlltypelist] = useState<any>([]);
  const [bodyModel, setBodyModel] = useState<any>();
  const [choosenPart, setChoosenPart] = useState<any>(); // 当前选中的身体部位， 默认直接选中第一个，没有的话，就渲染一个无异常部位
  const [partOptions, setPartOptions] = useState<any>(); // 将身体的所有异常部位渲染成一个options数组，
  const [orgaOptions, setOrgaOptions] = useState<any>(); // 以身体的部位为key值，value为器官卡片的数组，在数据请求完成后，一次渲染
  const [optionsCard, setOptionsCard] = useState<any>([]); // 主要用于存储已经被高亮的器官卡片样式，当进行其他操作的时候，再恢复，如：关闭器官的信息窗口，点击其他身体部位，选择其他器官卡片

  const [visible, setVisible] = useState<any>(false)
  const [modalTitle, setModalTitle] = useState<any>('');
  const [rightColumnContent, setRightColumnContent] = useState<any>();


  const enlargeItem = async (value: any) => {

    /**
     * 在这里做一个处理，保证有异常标识的在传进去给放大
     * 在这里，除了器官名字，就是带剖面的模型，其他的都要去匹配
     * */


    await bodyRef.current.resetSlider();
    await bodyRef.current.testEnlarge(value);

    // 执行另外的操作
    // setTimeout(()=>{
    //   bodyRef.current.testAutoInteracte();
    // }, 3000)


  }


  /**
   * 未了宣传视频做的自动触发
   * */
  // useEffect(async ()=>{
  //
  //   await setTimeout(async ()=>{
  //     await bodyRef.current.testAutoInteracte2();
  //   },5000)
  //
  //   await setTimeout(()=>{
  //     enlargeItem(['胃', '面片_胃_胃炎', '面片_胃_胃癌', '面片_胃_胃溃疡', '胃_剖面', '面片_胃_慢性胃炎', '面片_胃_出血性胃炎', '面片_胃_残胃炎', '面片_胃_反流性胃炎', '面片_胃_糜烂性胃炎', '面片_胃_萎缩性胃炎', '面片_胃_胃吻合口炎', '面片_胃_胃复合性溃疡', '面片_胃_消化性溃疡', '面片_胃_胃部癌变'])
  //   },18000)
  //
  // },[])


  const closeInfoWindow = () => {
    if (optionsCard.length > 0 && choosenPart != "全身") {
      bodyRef.current.testClose();
    }
  }

  useEffect(() => {
    /**
     * 在这里进行加载地时候，加入一个修改全局加载地状态，loading
     *
     * */

    if (dispatch) {
      dispatch({
        type: "bodyModel/changeLoadStatus",
        payload: {
          newLoadStatus: true
        }
      })
    }

    setBodyModel(<BodyModel onRef={bodyRef} orgaDescription={orgaDescription} currentOrga={currentOrga}
                            illtypelist={illTypeList}>
    </BodyModel>)
  }, [])


  useEffect(() => {
    GetAllBodyHealth();
  }, [])

  /*
  * 当获得了top4一场器官的时候，再去分别获得详细信息
  * */

  useEffect(() => {

    /**
     * 当第一次进入页面加载的时候，获得了个人健康所需的数据，就动态生成这些内容，
     * 主要有个人信息生成
     * 器官卡片生成
     * 健康信息生成
     * 四个指标生成
     * 异常气管生成
     * */
    if (JSON.stringify(allOrgaList) != "{}" && !partOptions) {
      GenerateOrgaRelated()
    }

  }, [abnormalOrgaTop4]);

  const OpenWholeOrga = (e: any, iconName: any, orgaName: any, orgaAll: any) => {
    e.currentTarget.style.boxShadow = '0px 0px 10px #d2a845 inset';
    /**
     * 要改变的项目是当前选中的，框的阴影图， 名字字体颜色，成绩字体颜色高亮, 在关闭信息窗的时候恢复，和点击其他的时候恢复
     * */
    e.currentTarget.children[0].children[0].children[0].children[0].src = `./img/allOrgaIcon/yellowOne/${iconName}.png`;
    e.currentTarget.children[0].children[1].children[0].style.color = "#d2a845";
    // e.currentTarget.children[0].children[2].style.color = "#d2a845";
    e.currentTarget.children[0].children[2].style.opacity = 1;
    e.currentTarget.children[0].children[2].style.textShadow = "0 0 10px currentColor";

    optionsCard.push(e.currentTarget);
    RestoreStyle();

    if (dispatch) {
      const orgaParams = {
        orgaName: orgaAll.name
      }

      dispatch({
        type: "bodyModel/getSelectedOrgaDetail",
        payload: {
          orgaAll,
          orgaParams,
        }
      });

    }

    GetWholeOrgaDetail(orgaName);
  }

  const GetWholeOrgaDetail = (orgaName: any) => {
    if (dispatch) {
      dispatch({
        type: "bodyModel/getWholeOrgaIllDetail",
        payload: {
          params: {
            orgaName
          }
        }
      })
    }

    setModalTitle(`${orgaName}异常标识`);
    setVisible(true);
  }

  const CloseOrgaModal = () => {
    // if (dispatch) {
    //   dispatch({
    //     type: "bodyModel/initSelectedOrga",
    //     payload: {
    //       newSelectedOrga: null
    //     }
    //   })
    // }
    setVisible(false);
  }


  const ScoreColor = (score: any) => {

    if (score > 80) {
      return {color: "#FF9C00"}
    }
    if (score > 60) {
      return {color: "#00FFDE"}
    } else {
      return {color: "#CD360A"}
    }


  }

  /**
   * 渲染器官和申生成器官的卡片
   * */
  const GenerateOrgaRelated = () => {

    const partList = Object.keys(allOrgaList);
    const partOptionsTemp: any[] = [];
    if (partList.length > 0) {
      partList.map((item: any, index: any) => {
        partOptionsTemp.push(
          <Option key={index} value={item}>{item}</Option>
        )
      })
    } else {
      partOptionsTemp.push(
        <Option key={"暂无异常部位"} value={"暂无异常部位"}>暂无异常部位</Option>
      )
    }

    setPartOptions(partOptionsTemp);
    partList[0] ? setChoosenPart(partList[0]) : null;

    /**
     * 在这里生成具体的器官带点击功能的卡片
     * */
    const orgaCardList: any = {};

    if (partList.length > 0) {
      for (let key in allOrgaList) {
        orgaCardList[`${key}`] = [];
        allOrgaList[`${key}`].map((item: any) => {

          const orgaRelated = MatchOrga(item.name);

          orgaCardList[`${key}`].push(
            <div key={item.name} className={styles.signleOption_unchecked}
                 onClick={(e) => {
                   key != "全身" ? ClickSignleOrga(e, item.name, orgaRelated.meshName, orgaRelated.iconName, item) : OpenWholeOrga(e, orgaRelated.iconName, item.name, item)
                 }}>
              <Row gutter={24} className={styles.optionContent}>
                <Col className={styles.optionIcon}>
                  <Badge className={styles.badgeIcon} count={item.exceptionCount || 0} size="small" offset={[-6, 6]}
                         color={"#ff9c01"}>
                    <img className={styles.optionIconImg}
                         src={`./img/allOrgaIcon/greenOne/${orgaRelated.iconName}.png`}/>
                  </Badge>

                </Col>
                <Col className={styles.optionDesc}>
                  <Row className={styles.optionName}>{item.name || ''}</Row>
                  <Row className={styles.indexCount}><span
                    className={styles.yellowText}>{item.exceptionCount || 0}</span>&nbsp;种异常标识</Row>
                </Col>
                <Col className={styles.optionScore}
                     style={ScoreColor(item.score || 0)}
                >
                  {item.score || 0}
                </Col>
              </Row>
            </div>
          )

        })
      }
    }
    setOrgaOptions(orgaCardList);

  }

  /**
   * 判断当前是否有已经被选中的器官卡片，如果有就恢复
   * */

  const RestoreStyle = (type?: any) => {
    if (optionsCard.length > 1 || (type && type === "restore" && optionsCard.length >= 1)) {
      optionsCard[0].children[0].children[0].children[0].children[0].src = optionsCard[0].children[0].children[0].children[0].children[0].src.replace(/yellowOne/, "greenOne");

      optionsCard[0].style.boxShadow = '0 0 0px #ffffff';
      optionsCard[0].children[0].children[1].children[0].style.color = "#fcfcfc";
      optionsCard[0].children[0].children[1].children[0].style.opacity = 0.8;
      // optionsCard[0].children[0].children[2].style.color = "#00FFDE";
      optionsCard[0].children[0].children[2].style.opacity = 0.7;
      optionsCard[0].children[0].children[2].style.textShadow = "0px 0px 0px";
      optionsCard.splice(0, 1);
    }
  }


  /**
   * 点击器官卡片进行的操作：改变卡片的样式，打开指定模型（改变模型位置，请求器官的数据）
   * */
  const ClickSignleOrga = (e: any, orgaName: any, meshName: any, iconName: any, orgaAll: any) => {


    console.log( "点击事件",e, orgaName, meshName, iconName, orgaAll);
    // RestoreStyle();
    e.currentTarget.style.boxShadow = '0px 0px 10px #d2a845 inset';
    /**
     * 要改变的项目是当前选中的，框的阴影图， 名字字体颜色，成绩字体颜色高亮, 在关闭信息窗的时候恢复，和点击其他的时候恢复
     * */
    e.currentTarget.children[0].children[0].children[0].children[0].src = `./img/allOrgaIcon/yellowOne/${iconName}.png`;
    e.currentTarget.children[0].children[1].children[0].style.color = "#d2a845";
    // e.currentTarget.children[0].children[2].style.color = "#d2a845";
    e.currentTarget.children[0].children[2].style.opacity = 1;
    e.currentTarget.children[0].children[2].style.textShadow = "0 0 10px currentColor";


    /**
     * 在这里判断是否已经打开，如果是，就关闭,判断是否是重复点击
     * */


    if (dispatch && optionsCard[0] != e.currentTarget) {


      const orgaParams = {
        orgaName: orgaAll.name
      }
      const indexParams = {
        indexName: orgaAll.name
      }
      dispatch({
        type: "bodyModel/getSelectedOrgaDetail",
        payload: {
          orgaAll,
          orgaParams,
          indexParams
        }
      });

    }

    optionsCard.push(e.currentTarget);


    RestoreStyle();
    enlargeItem(meshName);


  }


  const GetAllBodyHealth = () => {
    if (dispatch) {
      const params = {
        personalHealthInfoParams: {
          user_id: "2017014713"
        },
        personalScoreHistoryParams: {
          user_id: "2017014713"
        },

        keyHealthIndexParams: {
          user_id: "2017014713"
        },
      }
      dispatch({
        type: "bodyModel/getAllPersonalHealthInformation",
        payload: {
          params,
        }
      })
    }
  }


  /**
   * 主要用于右侧动态生成内容
   * */

  useEffect(() => {
    if (personalHealthScore && personalScoreHistory && commonScoreHistory && keyHealthIndex && abnormalOrgaTop4) {
      GenerateRightPerson();
      // GeneratRightOrga()
    }

  }, [personalHealthScore, personalScoreHistory, commonScoreHistory, keyHealthIndex, abnormalOrgaTop4,])

  useEffect(() => {
    if (selectedOrga && illList) {
      GeneratRightOrga();
    } else {
      if (personalHealthScore && personalScoreHistory && commonScoreHistory && keyHealthIndex && abnormalOrgaTop4) {
        GenerateRightPerson();
        // GeneratRightOrga()
        RestoreStyle("restore");
      }

    }
  }, [selectedOrga, illList])

  const Generate4Index = (topList: any) => {

    const cardlist: any = [];
    const result: any = [];


    topList.map(top => {
      const orgaRelated = MatchOrga(top.name);
      /**
       * 在这里将每个item进行判断当前得分与给定的健康范围地关系，判读关系文本和展示图标
       * */

      const healthRelation = JudgeHealthRelationship(top);


      cardlist.push(
        <div key={top.name} className={styles.singleTop}>

          <img
            key={orgaRelated.iconName}
            className={styles.topIcon}
            src={`./img/indexIcon/${healthRelation.iconType}/${orgaRelated.iconName}.png`}
          />
          <div
            key={orgaRelated.name}
            className={styles.descText}
          >
            <div className={styles.topText}>{orgaRelated.orgaName}得分&nbsp;
              <span className={styles.rankType}>
                {healthRelation.desc}
              </span>
            </div>
            <div className={styles.bottomText}>健康范围</div>
          </div>
          <div className={styles.indexScore}>
            {top.score}
          </div>
        </div>
      );
    })

    result.push(
      <div className={styles.topResult}>
        <div className={styles.top2Card}>{cardlist.slice(0, Math.floor(cardlist.length / 2))}</div>
        <div className={styles.bottom2Card}>{cardlist.slice(Math.floor(cardlist.length / 2), cardlist.length)}</div>

      </div>
    );
    return result;

  };

  const GenerateTop4Orga = (top4list: any) => {
    const cardlist: any = [];
    const result: any = [];

    const oldList = top4list.concat();


    /**
     * 进行选择排序，从第二个开始遍历，知道遇到比第一个低的，就交换位置
     * */
    if (oldList.length > 1) {
      for (let i = 1; i < oldList.length; i++) {
        if (oldList[i].score < oldList[0].score) {
          const tempTop = oldList[i];
          oldList[i] = oldList[0];
          oldList[0] = tempTop
        }
      }
    }


    oldList.map((top: any, index: any) => {
      const orgaRelated = MatchOrga(top.name);
      if (index === 0) {
        // 最低地，要黄色
        cardlist.push(
          <div key={top.name} className={styles.abnormalOrga}>
            <div className={styles.leftCardColumn}>
              <Row className={styles.topOrgaName1}>
                <Tooltip placement="right" title={`Top1${top.name}`}>
                  Top1{top.name}
                </Tooltip>
              </Row>
              <Row className={styles.orgaIconRow}>
                <img className={styles.abnormalOrgaIcon}
                     src={`./img/allOrgaIcon/yellowOne/${orgaRelated.iconName}.png`}/>
              </Row>


            </div>
            <div className={styles.RightCardColumn}>
              <MixLineCharts3
                mainlyScoreHistory={[...top.historyScore]}
                commonScoreHistory={[...top.commonScore]}
                lineData={{
                  XData: ["2016", "2017", "2018", "2019", "2020"],
                  data: [50, 20, 30, 40, 100], data2: [10, 30, 40, 90, 20]
                }}/>
            </div>

          </div>
        )
      } else {
        cardlist.push(
          <div key={top.name} className={styles.abnormalOrga}>
            <div className={styles.leftCardColumn}>
              <Row className={styles.topOrgaName}>{top.name}</Row>
              <Row className={styles.orgaIconRow}>
                <img className={styles.abnormalOrgaIcon}
                     src={`./img/allOrgaIcon/greenOne/${orgaRelated.iconName}.png`}/>
                {/*<span className={styles.abnormalScoreNumber}>{top.score}</span>*/}
              </Row>


            </div>
            <div className={styles.RightCardColumn}>
              <MixLineCharts2
                mainlyScoreHistory={[...top.historyScore]}
                commonScoreHistory={[...top.commonScore]}
                lineData={{
                  XData: ["2016", "2017", "2018", "2019", "2020"],
                  data: [50, 20, 30, 40, 100], data2: [10, 30, 40, 90, 20]
                }}/>
            </div>

          </div>
        )
        ;
      }


    })

    result.push(
      <div className={styles.topResult}>
        <div className={styles.top2Card}>{cardlist.slice(0, Math.floor(cardlist.length / 2))}</div>
        <div className={styles.bottom2Card}>{cardlist.slice(Math.floor(cardlist.length / 2), cardlist.length)}</div>

      </div>
    );
    return result;

  }

  const GenerateRightPerson = () => {
    setRightColumnContent(
      <div className={styles.rightColumn}>
        <div className={styles.rightTop}>
          <div className={styles.topTitle}>基本健康信息</div>
          <div className={styles.topCharts}>
            <div className={styles.healthScore}>
              <div className={styles.scoreNumber}>{(personalHealthScore || 0).toFixed(1)}</div>
              <div className={styles.scoreDesc}>健康得分</div>
            </div>
            <div className={styles.healthCharts}>

              <MixLineCharts
                mainlyScoreHistory={[personalScoreHistory]}
                commonScoreHistory={[commonScoreHistory]}
                lineData={{
                  XData: ["2016", "2017", "2018", "2019", "2020"],
                  data: [50, 20, 30, 40, 100],
                  data2: [10, 30, 40, 90, 20]
                }}/>
            </div>
          </div>
          <div className={styles.indexFour}>

            {Generate4Index(keyHealthIndex)}
          </div>


        </div>
        <div className={styles.rightBottom}>
          <div className={styles.bottomTitle}>异常器官Top4</div>
          <div className={styles.bottomCharts}>
            {GenerateTop4Orga(abnormalOrgaTop4Detail)}
          </div>
        </div>
      </div>
    )
  }

  /**
   * 将建议遍历生成一些减小一列表
   * */
  const GenerateAdviceList = (list: any) => {
    const advice: any = [];
    if (list.length > 0) {
      list.map((item: any, index: any) => {
        advice.push(
          <Row key={index} className={styles.signleAdvice}>
            <Col className={styles.adviceHead}>
              <div className={styles.headIcon}/>
            </Col>
            <Col className={styles.adviceText}>{item}</Col>

          </Row>
        );
      })
    } else {
      advice.push(
        <Empty className={styles.emptyContent} description={"暂无建议"}/>
      )
    }


    return advice;
  }

  /**
   * 切换异常标识
   * */
  const changeIndex = (e: any) => {
    /**
     * 在这里会进行的操作是，获得异常标识地表哥内容，和后期地打开相应动画，
     * */


    if (dispatch) {
      dispatch({
        type: "bodyModel/getSelectedIndexProject",
        payload: {
          indexParams: {
            indexName: e.target.value
          }

        }
      })
    }

    StartAnimation(e.target.value);

  }


  const StartAnimation = (keyName: any) => {


    /**
     * 需要判断当前选中的部位是否是全身性器官，因为全身性器官没有具体的模型动画
     * */

    if (choosenPart !== "全身") {
      bodyRef.current.setInfoTabs();
      bodyRef.current.testPlay(keyName);
    }


  }


  const GenerateRadioButton = (illIndexList: any) => {
    const buttonList: any = [];
    let IllListTemp: any = [];
    const result: any = [];
    if (Array.isArray(illIndexList)) {
      IllListTemp = illIndexList;
    } else {
      IllListTemp = illIndexList.illType || []
    }
    if (IllListTemp.length > 0) {
      IllListTemp.map((item: any, index: any) => {
        buttonList.push(
          <Radio.Button
            onClick={() => {
              choosenPart !== "全身" ? bodyRef.current.sliderDivIndex(index) : ""
            }}
            key={item.illName || item.name}
            className={styles.radioButton}
            value={item.illName || item.name}>{item.illName || item.name}</Radio.Button>
        )
      })


      if (dispatch) {
        dispatch({
          type: "bodyModel/getSelectedIndexProject",
          payload: {
            indexParams: {
              indexName: IllListTemp[0].illName || IllListTemp[0].name
            }
          }
        })
        if (IllListTemp[0].illName) {
          bodyRef.current.setIndex(IllListTemp[0].illName);
        }


      }

      result.push(
        <Radio.Group
          defaultValue={IllListTemp[0].illName || IllListTemp[0].name}
          className={styles.radioGroup}
          onChange={changeIndex}
          optionType="button"
        >
          <Space size={"middle"}>
            {buttonList}

          </Space>

        </Radio.Group>
      )
    }


    return result;


  }

  const GeneratRightOrga = () => {
    const illListTemp = choosenPart === "全身" ? wholeOrgaIll : illList;


    /**
     * 如果是数组，那就是全身，数组中的元素是疾病
     * 如果是对象，那内容就是illtype
     * */

    setRightColumnContent(
      <div className={styles.rightColumn}>
        <div className={styles.rightOrgaTop}>
          <div className={styles.orgaTopTitle}>{selectedOrga.name || ''}健康信息</div>
          <div className={styles.topOrgaCharts}>
            <div className={styles.orgaHealthScore}>
              <div className={styles.orgaScoreNumber}>{(selectedOrga.score || 0).toFixed(1)}</div>
              <div className={styles.orgaScoreDesc}>健康得分</div>
            </div>
            <div className={styles.orgaHealthCharts}>

              <MixLineCharts
                mainlyScoreHistory={[...currentOrgaScoreHistory]}
                commonScoreHistory={[...currentOrgaCommonHistory]}
                lineData={{
                  XData: ["2016", "2017", "2018", "2019", "2020"],
                  data: [50, 20, 30, 40, 100],
                  data2: [10, 30, 40, 90, 20]
                }}/>
            </div>
          </div>
          <div className={styles.abnormalIndex}>
            <Row className={styles.abnormalList}>
              异常标识
            </Row>
            <Divider className={styles.indexDivider}/>
            <Row className={styles.indexTag}>
              {GenerateRadioButton(illListTemp)}
            </Row>
          </div>
          <div className={styles.healthAdvice}>
            <Row className={styles.adviceTitle}>
              健康建议
            </Row>
            <Divider className={styles.indexDivider}/>
            <Row className={styles.adviceContent}>

              {GenerateAdviceList(currentOrgaHealthAdvice)}
            </Row>
          </div>

        </div>
        <div className={styles.rightOrgaBottom}>
          <div className={styles.orgaBottomTitle}>部位异常标识</div>
          <div className={styles.indexTable}>
            <MyTable/>
          </div>
        </div>
      </div>
    )
  }


  return (
    <Spin className={styles.spinnerIcon} spinning={loadStatus} indicator={loadIcon} size="large">
      <div className={styles.mainContainer}>
        {bodyModel}
        <div className={styles.siderColoumn}>
          <div className={styles.userCard}>
            <Col className={styles.avaterIcon}>
              <Avatar size={64} className={styles.avaterContent}>{personalInfo.name || ''}</Avatar>
            </Col>
            <Col className={styles.infoDetail}>
              <Row gutter={24} className={styles.topRow}>
                <Col span={4} className={styles.genderIcon}>
                  {
                    (personalInfo.gender && ["男", "man", "male"].includes(personalInfo.gender)) ?
                      <img className={styles.genderIcon} src={"./img/gendleMale.png"}/> :
                      <img className={styles.genderIcon} src={"./img/groupMan.png"}/>
                  }
                </Col>
                <Col span={18} className={styles.checkTime}>
                  {personalInfo.last_check_time || ''}
                </Col>
              </Row>
              <Row className={styles.bottomRow}>
                <Col className={styles.personHeight}>
                  <Tag className={styles.countTag}>{personalInfo.height || 188}&nbsp;cm</Tag>
                  <Tag className={styles.countTag}>{personalInfo.weight || 77}&nbsp;kg</Tag>
                </Col>
                <Col className={styles.personWeight}></Col>
              </Row>
            </Col>

          </div>
          <div className={styles.orgaList}>
            <div className={styles.partName}>
              <Select className={styles.partSelect}
                      key={choosenPart}
                      defaultValue={choosenPart}
                      autoFocus={true}
                      bordered={false}
                      onChange={(value: any) => {
                        bodyRef.current.ResetCompare();
                        bodyRef.current.resetSlider();
                        closeInfoWindow();
                        setChoosenPart(value);
                        if (dispatch) {
                          dispatch({
                            type: "bodyModel/initSelectedOrga",
                            payload: {
                              newSelectedOrga: null
                            }
                          })
                        }
                      }}
                      dropdownClassName={styles.dropdownClassName}
              >
                {partOptions}
              </Select>
            </div>
            <div className={styles.orgaOptions}>
              {choosenPart ? orgaOptions[`${choosenPart}`] : <Empty/>}

            </div>
          </div>
        </div>
        {rightColumnContent}
        <WholeBodyOrga
          visible={visible}
          onCancel={CloseOrgaModal}
          modalTitle={modalTitle}
        />
      </div>
    </Spin>
  )
}


export default connect(({bodyModel}) => ({
  bodyModelInfo: bodyModel,
}))(NormalProject);
