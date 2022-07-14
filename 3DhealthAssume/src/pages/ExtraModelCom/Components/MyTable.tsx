/**

 * @author MikyMei

 * @date 2022-01-20 13:26

 */

import React, {useEffect, useState, useRef} from 'react';
import {Rate, Table} from "antd";
import {Dispatch} from "@@/plugin-dva/connect";
import {connect} from "umi";
import styles from "@/pages/ExtraModelCom/index.less";
import {HeartFilled} from "@ant-design/icons";


const MyTable: React.FC = (props: any) => {
  const {bodyModelInfo, dispatch} = props;
  const {currentIindexDetail}=bodyModelInfo;

  const columns = [
    {
      title: "项目名",
      dataIndex: "projectName",
      key: "projectName",
      ellipsis:true,
    },
    {
      title: "结果或关键词",
      dataIndex: "resultKeyWords",
      key: "resultKeyWords",
      ellipsis:true,

      render: (text: any, record: any, index: any) => {
        // (record.resultKeyWords.direction&&record.resultKeyWords.direction==="up")?return

        if (record.resultKeyWords.direction) {
          return <span>
           {record.resultKeyWords.content}&nbsp;&nbsp;
            {record.resultKeyWords.direction === "up" ? <img src={"./img/upArrow.png"}/> :
              <img src={"./img/downArrow.png"}/>}
         </span>
        } else {
          return <span>{record.resultKeyWords.content}</span>
        }
      }
    },
    {
      title: "正常值范围",
      dataIndex: "normalRank",
      key: "normalRank",
      ellipsis:true,

    },
    {
      title: "关心程度",
      dataIndex: "careDegree",
      key: "careDegree",
      width: 200,
      render: (text: any, record: any) => {

        return <Rate allowHalf disabled className={record.careDegree > 2.5 ? styles.heartIcon : styles.heartIcon2}
                     defaultValue={record.careDegree} character={() => <HeartFilled/>}/>

      }
    }
  ]


  return (
    <Table
      dataSource={currentIindexDetail}
      columns={columns}
      pagination={false}
      bordered
      scroll={{y: '75%'}}
      className={styles.abnormalTable}/>
  )
}

export default connect(({bodyModel}) => ({
  bodyModelInfo: bodyModel,
}))(MyTable);

