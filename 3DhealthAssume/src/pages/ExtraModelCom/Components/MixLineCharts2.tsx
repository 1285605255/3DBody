/**

 * @author MikyMei

 * @date 2022-01-17 15:49

 */
import React, {useRef, useEffect} from 'react';
import styles from './MixLineChart.less'
import {RestructureCommonScore, RestructurePersonalScore} from "@/utils/dataReStructure";


const MixLineChart: React.FC<any> = (props) => {

  const {
    mainlyScoreHistory,
    commonScoreHistory,
    lineData
  } = props;
  const inputEl = useRef(null);


  const personalResult = RestructurePersonalScore(mainlyScoreHistory);
  const commonResult = RestructureCommonScore(commonScoreHistory,mainlyScoreHistory.length); // 因为平均数历年来都一样，因此只有一个数


  useEffect(() => {
    // eslint-disable-next-line global-require
    const echarts = require("echarts")
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(inputEl.current, 'macarons')

    let option;


    // eslint-disable-next-line prefer-const
    option = {
      grid: {
        x: 40,
        y: 40,
        x2: 15,
        y2: 25,

      },

      color: ['#00FFE8', '#F6F6F6'],
      legend: {
        icon: "rect",
        right: 0,
        itemHeight: 8,
        itemWidth: 14,
        top: 5,
        textStyle: {
          fontSize: '0.875 rem',
          fontWeight: 400,
          color: "white",
          opacity: 0.5
        },
        data: ["用户", "同质人群"]
      },
      xAxis: {
        type: 'category',
        data: personalResult.XData, // 目前因为只有一个年份的数据，所以暂且先用假数据
        // data: lineData.XData,
        boundaryGap: false,
        axisTick: {
          show: false,
        },


        axisLabel: {
          margin: 8,
          fontSize: "14px",
          fontFamily: "PingFang_SC",
          fontWeight: 400,
          color: "#C0C4CC",
          opacity: 0.8,
          align: "center"
        },
        splitLine: {
          show: false,
        },
        lineStyle: {
          color: "rgb(243 243 245)",
        }


      },
      yAxis: {
        scale: true,
        type: 'value',
        axisLabel: {
          margin: 12,
          fontSize: "14px",
          fontFamily: "PingFang_SC",
          fontWeight: 400,
          color: "#C0C4CC",
          opacity: 0.8,
        },
        max: 100,
        min:0,
        interval:50,


        splitLine: {
          lineStyle: {
            type: "dashed",
            color: "#FFFFFF",
            opacity: 0.2,
          }
        }


      },
      tooltip: {
        trigger: 'axis',
        backgroundColor:null,
        textStyle: {
          color:'rgba(255,255,255,1)',
        },
        className: styles.chartTooltip,
        borderColor:'#00DEC5',

      },
      // lineStyle:{
      //   color:'#0066FF'
      // },
      series: [
        /**
         * 在这里采用双折线，两个的area颜色不同
         * */
        {
          name: '用户',

          // symbol: 'image://https://midsp-front-1253940515.cos.ap-shanghai.myqcloud.com/assets/3.svg',
          symbolSize: 0,
          data: personalResult.Data,
          // data: lineData.data,
          type: 'line',
          smooth: true,

          itemStyle: {

            // normal: {
              lineStyle: {
                color: '#00FFE8',
                width: 1
              }
            // }
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#00FFE8'
              },
              {
                offset: 1,
                color: '#368e7f'
              }
            ])
          },
        },
        {
          name: '同质人群',
          // symbol: 'image://https://midsp-front-1253940515.cos.ap-shanghai.myqcloud.com/assets/3.svg',
          symbolSize: 0,
          data: commonResult.Data,
          // data: lineData.data2,
          type: 'line',
          smooth: true,

          itemStyle: {
            // normal: {
              lineStyle: {
                color: '#D3D3D3',
                width: 1
              }
            // }
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#b1b1b1'
              },
              {
                offset: 1,
                color: '#FFFFFF'
              }
            ])
          },
        }

      ]
    };
    option && myChart.setOption(option);
  })

  return (
    <div style={{width: "100%", height: "100%",}}>
      <div className={styles.submain} ref={inputEl} style={{width: "100%", height: "100%"}}/>
    </div>
  )
}
export default MixLineChart
