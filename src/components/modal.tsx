import React, { useState } from 'react';
import { Button, Modal, Radio, Input, Form, Select } from 'antd';
import Uploading from './upload-images';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase';

interface FileType {
  name: string;
}

interface FormValues {
  name: string;
  description: string;
  price: number;
  color: string;
  category: string;
  gender: string;
}

export const CreateModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [files, setFiles] = useState<FileType[]>([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const uploadfiles = async (): Promise<string[]> => {
    const uploadPromises = files.map(async (file) => {
      const storage = getStorage();
      const storageRef = ref(storage, 'products/' + file.name);

      try {
        await uploadBytes(storageRef, file as any)
        const url = await getDownloadURL(storageRef);
        return url;
      } catch (error) {
        console.error(error);
        throw error;
      }
    });

    try {
      const urls = await Promise.all(uploadPromises);
      
      return urls;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const onFinish = async (value: FormValues) => {
    console.log(value);
    try {
      const urls = await uploadfiles();
      const data = {
        ...value,
        images: urls,
      };
      console.log(data)
      const docRef = await addDoc(collection(db, "products"), data);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error(error);
    }
    console.log(files);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Maxsulot Qoshish
      </Button>
      <Modal title="Maxsulot Qoshish" open={isModalOpen} footer={null} onCancel={handleCancel}>
        <Form
          onFinish={onFinish}
          name="wrap"
          labelCol={{ flex: '110px' }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ maxWidth: 600 }}
        >
          <Form.Item name="name" rules={[{ required: true }]}>
            <Input placeholder="Maxsulot nomi..." type="text" />
          </Form.Item>

          <Form.Item name="description" rules={[{ required: true }]}>
            <Input placeholder="Description" type="text" />
          </Form.Item>

          <Form.Item name="price" rules={[{ required: true }]}>
            <Input placeholder="Maxsulot narhi..." type="number" />
          </Form.Item>

          <Form.Item name="color" rules={[{ required: true }]}>
            <Input type="color" />
          </Form.Item>
          
          <Form.Item name="category">
            <Select placeholder="Kategoriya">
              <Select.Option value="men">Mens</Select.Option>
              <Select.Option value="women">Women</Select.Option>
              <Select.Option value="umumiy">Umumiy</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item className="flex justify-center">
            <Uploading setFiles={setFiles} />
          </Form.Item>

          <Form.Item name="gender" className="flex justify-center">
            <Radio.Group>
              <Radio value="man">Erkak</Radio>
              <Radio value="women">Ayol</Radio>
              <Radio value="umumiy">Umumiy</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button onClick={handleCancel} type="primary" className="w-full" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
