import React, {useEffect} from 'react';

import { useIntl } from 'umi';
import 'echarts-gl'
import * as echarts from 'echarts';
// import Data from '../../public/assets/hexagon.json'
import Data from '../../public/assets/shanghai.json'
import Data2 from '../../public/assets/china.json'





const data = [
  {
  name: '黄浦区',
  value: [121.490317,
    31.222771, 25],

},
  {
    name: '徐汇区',
    value: [121.43752,
      31.179973, 9]
  },

  {
    name: '长宁区',
    value: [121.4222,
      31.218123, 6]
  },
  {
    name: '静安区',
    value: [ 121.448224,
      31.229003, 8]
  },
  {
    name: '普陀区',
    value: [ 121.392042,
      31.257895, 5]
  },
  {
    name: '虹口区',
    value: [121.491832,
      31.26097, 5]
  },
  {
    name: '杨浦区',
    value: [121.522797,
      31.270755, 5]
  },
  {
    name: '闵行区',
    value: [121.375972,
      31.111658, 5]
  },
  {
    name: '宝山区',
    value: [121.489934,
      31.398896, 9]
  },
  {
    name: '嘉定区',
    value: [121.250333,
      31.383524, 9]
  },
  {
    name: '浦东新区',
    value: [121.567706,
      31.245944, 9]
  },
  {
    name: '金山区',
    value: [121.330736,
      30.724697, 9]
  },
  {
    name: '松江区',
    value: [ 121.223543,
      31.03047, 9]
  },
  {
    name: '青浦区',
    value: [121.113021,
      31.151209, 9]
  },
  {
    name: '奉贤区',
    value: [ 121.458472,
      30.912345, 9]
  },
  {
    name: '崇明区',
    value: [ 121.397516,
      31.626946, 9]
  },

]


export default (): React.ReactNode => {
  const intl = useIntl();

  const initEcharts = () => {
    // myChart = echarts.init(this.el, null, {
    //   renderer: 'canvas',
    //   height: '800px'
    // })
    echarts.registerMap('shanghai', {geoJSON:Data});

    const myChart = echarts.init(document.getElementById('container') as HTMLElement,null,
      {
        renderer: 'canvas',
        height: '1100px'
      });
    const option = {
      geo3D: {
        map: 'shanghai',
        show: true,
        zlevel: -20,

        boxWidth: 300,
        boxHeight: 100, // 设置地图在页面相对高度(也就是控制了柱状图bar的高度)
        regionHeight: 6, // 地图模型的高度，也就是厚度
        environment: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          // 配置环境的颜色，以及相关参数
          offset: 0, color: '#00aaff' // 天空颜色
        }, {
          offset: 0.7, color: '#4db69d' // 地面颜色
        }, {
          offset: 1, color: '#9ab1cd' // 地面颜色
        }], false),
        groundPlane:{ // 组件在嗲面的拜访的地方，场景更加有真是感和模型感
          show:false,
          color:'#4db69d',
        },
        shading: 'realistic',
        label: { // 标签的相关设置
          show: false, // (地图上的城市名称)是否显示标签 [ default: false ]
          distance: 5, // 标签距离图形的距离，在三维的散点图中这个距离是屏幕空间的像素值，其它图中这个距离是相对的三维距离
          // formatter:, // 标签内容格式器
          textStyle: { // 标签的字体样式
            color: '#000000', // 地图初始化区域字体颜色
            fontSize: 20, // 字体大小
            opacity: 1, // 字体透明度
            backgroundColor: 'transparent' // 字体背景色
          },
        },
        itemStyle: {
          color: 'rgba(95,158,160,0.5)',
          opacity: 0.5,
          borderWidth: 3,
          borderColor: '#000000'
        },
        emphasis: {
          label: {
            show: true,

            textStyle: {
              color: '#0c0b0b',
              fontSize: 14,
              backgroundColor: 'transparent' // 字体背景色
            }
          },
          borderColor: '#ADDEFF',
          borderWidth: 2,
          itemStyle: {
            color: '#38D2FF',
          }
        },
        // instancing:true,

        light: {
          main: {
            shadow: true,
            shadowQuality: 'ultra',
            intensity: 1,
            alpha: 40,
            beta: 300
          },

        },

        viewControl: {
          projection: 'perspective',
          autoRotate: false,
          damping: 0.8,
          rotateSensitivity: 1, // 旋转操作的灵敏度
          rotateMouseButton: 'left', // 旋转操作使用的鼠标按键
          zoomSensitivity: 1, // 缩放操作的灵敏度
          panSensitivity: 1, // 平移操作的灵敏度
          panMouseButton: 'right', // 平移操作使用的鼠标按键

          distance: 300, // 默认视角距离主体的距离
          center: [0, 0, 0],
          animation: true,
          animationDurationUpdate: 500,
          animationEasingUpdate: 'cubicInOut'
        },

      },

      // 控制不同数值范围的不同bar颜色
      visualMap: {
        max: 50,
        calculable: true,
        realtime: false,
        inRange: {
          color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
        },
        outOfRange: {
          colorAlpha: 0
        }
      },

      tooltip:{

        position:'top',
        // position: function (point, params, dom, rect, size) {
        //   return [point[0], '10%'];
        // },
        formatter(params:any){
          let res = '' + '<span style={{backgroundColor:`${params.color}`,opacity:"0.5", width:"10px",height:"10px", borderRadius:"5px" }}/>'+params.data.name;
          res += '<br/>' +"数量:"+ params.data.value[2];
          return res;
        },
        backgroundColor  :'rgba(50,50,50,0.7)',
        textStyle:{
          color:'white',
        }

      },

      series: [
        // bar
        {
          type: 'bar3D',
          coordinateSystem: 'geo3D',
          zlevel: 10,
          barSize: 5, // 柱子粗细
          minHeight:5,
          bevelSize:0.7,
          bevelSmoothness : 2,
          shading: 'realistic',
          itemStyle: {
            // color: '#67ebc0',
            opacity:0.8,
          },
          label: {
            show: true,
            position: 'top',
            textStyle: {
              fontsize:20,
              color: '#492525',
              backgroundColor: 'transparent',
              fontWeight:'blod',
            },
            realisticMaterial:{
              metalness:0.8,
            },
            formatter(params) {
              return params.value[2]
            }
          },
          data
        }

      ]
    }

    // 绘制图表
    myChart.setOption(option)
  }

  useEffect(()=>{
    initEcharts();
    countSmaller([2,4,5,6,2,3,10]);
  },[])


  const countSmaller = function(nums: any) {
    // 如果nums[i]》nums[i-1], 则count[i]=count[i+1]

    let countS=[];
    if(nums.length>0){

      for(let i=0; i<nums.length; i++){
        countS[i]=0;
        if(i>0&&nums[i]===nums[i-1]){
          countS[i]=countS[i-1]
        }else{

          for(let j=i+1; j<nums.length; j++){

            if(nums[j]<nums[i]){
              countS[i]=countS[i]+1;
            }

          }
        }

      }
    }else{
      countS=[];
    }
    return countS;

  };

  return (
    <div>
      <div id='container'></div>
    </div>
  );
};
