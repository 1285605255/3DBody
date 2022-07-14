/**

 * @author MikyMei

 * @date 2022-01-13 16:22

 */

import React, {useEffect, useState, useRef} from 'react';
import styles from './WholeBody.less';
import {Modal, Form, Button, Tabs, Divider, Tooltip} from "antd";
import {connect, Dispatch} from "umi";
import {CloseCircleOutlined} from "@ant-design/icons";
import DPlayer from 'dplayer';
import VideoPlayer from './VideoPlayer'

const {TabPane} = Tabs;

const WholeBodyOrga: React.FC = (props: any) => {


  const {visible, onCancel, modalTitle, bodyModelInfo, dispatch,} = props;
  const {wholeOrgaIll} = bodyModelInfo;

  const [indexContent, setIndexContent] = useState<any>([]);
  const [playerList, setPlayerList]=useState<any>([]);

  useEffect(() => {
    if (wholeOrgaIll.length > 0) {
      generateLiiList();
    }

  }, [wholeOrgaIll])



  const CloseModalAndPlayer=()=>{
    onCancel();
    playerList.map(player=>{
      player.pause();
    })
  }


  /**
   * 切换选项卡时的内容，关闭其他的播放器
   * */
  const PausBeforePlayer=()=>{
    if (playerList){
      playerList.map(player=>{
        player.pause();
      })
    }
  }

  const generateLiiList = () => {
    const tempList:any=[];


    wholeOrgaIll.map((item: any, index: any) => {
      tempList.push(
        <TabPane tab={
          <Tooltip placement="right" title={item.name||''}>
            {item.name||''}
          </Tooltip>
        } key={item.name||''}>
          <div className={styles.videoDesc}>
            <div id={item.name} className={styles.videoContent}>

              <VideoPlayer playerList={playerList} videoUrl={item.videoUrl||''}/>

            </div>
            {/*<Divider className={styles.videoDivider}/>*/}
            <div className={styles.descContent}>
              <Tabs defaultActiveKey="1">
                <TabPane tab="介绍" key="1">
                  <div className={styles.tabContent}>
                    {item.illDesc||''}
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </TabPane>
      );


    })

    setIndexContent(tempList);

  }








  return (
    <Modal
      className={styles.orgaModal}
      title={modalTitle}
      closeIcon={<CloseCircleOutlined className={styles.orgaModalIcon}/>}
      onCancel={CloseModalAndPlayer}
      visible={visible}
      onOk={onCancel}
      footer={null}
    >


      <Tabs defaultActiveKey="1"
            tabPosition={"left"}
            className={styles.modalTabs}
            onChange={PausBeforePlayer}
      >
        {indexContent}

      </Tabs>
    </Modal>
  )
}


export default connect(({bodyModel}) => ({
  bodyModelInfo: bodyModel,
}))(WholeBodyOrga);
