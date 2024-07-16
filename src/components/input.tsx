import React from 'react';
import { Form, Input } from 'antd';

const FormInput: React.FC = () => (
  <Form
    name="wrap"
    labelCol={{ flex: '110px' }}
    labelAlign="left"
    labelWrap
    wrapperCol={{ flex: 1 }}
    colon={false}
    style={{ maxWidth: 600 }}
  >
    <Form.Item label="Title" rules={[{ required: true }]}>
      <Input required type='text'/>
    </Form.Item>

    <Form.Item label="Discription" rules={[{ required: true }]}>
      <Input required type='text'/>
    </Form.Item>

    <Form.Item label="Price" rules={[{ required: true }]}>
      <Input type='number' required/>
    </Form.Item>

    <Form.Item label="Color" rules={[{ required: true }]}>
      <Input type='color' required/>
    </Form.Item>
  </Form>
);

export default FormInput;