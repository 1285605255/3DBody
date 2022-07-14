import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import Card from './card'

// 创建一个html标签
function tag() {
    const div = document.createElement('div')
    const p = document.createElement('p')
    div.appendChild(p)
    div.id = "heart";
    div.innerHTML = `<Card/>`


  /**
   *
   *
   * */

    div.style.padding = '4px 10px';
    div.style.width = '300px';
    div.style.fontSize = '16px';
    div.style.position = 'absolute';
    div.style.backgroundColor = 'rgba(255,255,255,1)';
    div.style.borderRadius = '3px';
    div.style.color = '#000000';
    p.style.backgroundColor = 'rgba(255,255,255,1)';
    p.innerHTML = `心脏（英语：heart），常简称心，是一种在人类和其他动物都有的肌造器官`;
    p.style.color = '#000000';
    // div元素包装成为css2模型对象CSS2DObject
    const label = new CSS2DObject(div);
    div.style.pointerEvents = 'none';// 避免HTML标签遮挡三维场景的鼠标事件
    // 设置HTML元素标签在three.js世界坐标中位置
    label.position.set(1, 0, 1);
    return label;
}

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
// 相对鼠标的相对偏移
labelRenderer.domElement.style.top = '-16px';
labelRenderer.domElement.style.left = '0px';
// //设置.pointerEvents=none，以免模型标签HTML元素遮挡鼠标选择场景模型
labelRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(labelRenderer.domElement);

export { tag, labelRenderer };
