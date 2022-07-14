/**

 * @author MikyMei

 * @date 2022-01-14 16:06

 */

// import  Hls from 'hls.js';
import DPlayer from 'dplayer';

import React, {useEffect, useState, useRef} from 'react';
import {connect} from "umi";

const VideoPlayer: React.FC = (props: any) => {
  const {HDvideoUrl, SCvideoUrl,SDvideoUrl,  playerList} = props;
  const inputEl = useRef(null);



  useEffect(() => {
    const dp = new DPlayer({
      container: inputEl.current,
      // theme:"#616161",
      video: {

        // url: videoUrl,
        quality: [
          {
            name: '超清',
            url: SCvideoUrl,
            type: 'normal',
          },
          {
            name: '高清',
            url: HDvideoUrl,
            type: 'normal', // 不同播放器
            // customType: {
            //   customHls: function (video: any, player: any) {
            //     console.log(" ppppp",player);
            //     const hls = new Hls();
            //     console.log(" ppppp",hls);
            //     hls.loadSource(video.src);
            //     hls.attachMedia(video);
            //   },
            // },
          },
          {
            name: '标清',
            url: SDvideoUrl,
            type: 'normal',
          },


        ],
        defaultQuality: 0,
        pic: ' https://keogp-front-1253940515.cos.ap-shanghai.myqcloud.com/asset/doctor.png',
        thumbnails: ' https://keogp-front-1253940515.cos.ap-shanghai.myqcloud.com/asset/doctor.png',
      },
    });
    // dp.play();
    playerList.push(dp);

  }, [])

  return (
    <div ref={inputEl} style={{width: '100%', height: '100%'}}>

    </div>
  )

}


export default VideoPlayer;
