/**

 * @author MikyMei

 * @date 2022-01-14 16:06

 */


import DPlayer from 'dplayer';
import React, {useEffect, useState, useRef} from 'react';
import {connect} from "umi";

const VideoPlayer: React.FC = (props: any) => {
  const {videoUrl, playerList}=props;
  const inputEl = useRef(null);

  useEffect(()=>{
    const dp = new DPlayer({
          container: inputEl.current,
          video: {
            url: videoUrl,
          },
        });
        // dp.play();
    playerList.push(dp);

  },[])

  return (
    <div ref={inputEl} style={{width:'100%', height:'100%'}}>

    </div>
  )

}


export default VideoPlayer;
