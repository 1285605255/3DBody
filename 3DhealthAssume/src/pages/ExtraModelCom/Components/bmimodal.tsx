/**

 * @author MikyMei

 * @date 2022-03-18 19:52

 */
import {Modal, Form, InputNumber} from "antd";
import React from "react";

const BmiModal: React.FC = (props: any) => {

  const {form, onOk, onCancel, visible} = props;


  return (
    <>
      <Modal
        visible={visible}
        title={"BMI参数"}
        onOk={onOk}
        onCancel={onCancel}
      >
        <Form form={form} hideRequiredMark={true}>
          <Form.Item
            name={"BMI"}
            label={"BMI"}
            rules={[{required: true, message: '请输入你的BMI指标！'}]}
          >
            <InputNumber<string>
              style={{width: 200}}
              min="0"
              max="50"
              step="0.1"
              stringMode
            />

          </Form.Item>

        </Form>

      </Modal>
    </>
  )
}

export default BmiModal;
