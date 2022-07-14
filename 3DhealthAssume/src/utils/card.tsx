import { Checkbox, Card } from 'antd'

const card: React.FC = () => {
    return (
      <div id="CardBox" className="site-card-border-less-wrapper">
        <Card  id="Card" title="心脏" bordered={false} style={{ width: 300, position: 'absolute', zIndex: 100, marginLeft: "58%", marginTop: "2%" }}>
          <p>心脏（英语：heart），常简称心，是一种在人类和其他动物都有的肌造器官</p>
          <p>它的功用是推动循环系统中血管的血液。血液提供身体氧气以及养分，同时也协助身体移除代谢废弃物</p>
          <p>心脏位于胸部纵隔腔的中间偏左部位（以人体自己的方向看）</p>
        </Card>
      </div>
    )
  }
  export default card