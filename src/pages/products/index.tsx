import { CreateModal } from "../../components/modal";
import { Button, ConfigProvider, Form, Input, Divider, Radio, Table, Space, message, Popconfirm } from'antd';
import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

type DataType = {
  key: string;
  name: string;
  price: number;
  categoriye: string;
  discription: string;
  color: string;
  image: string;
}

export default function Products() {
  const [data, setData] = useState<[] | DataType[]>([]);
  const [datacolumns, setDataColumns] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');
  const [filteredData, setFilteredData] = useState<DataType[]>([]);
  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filterdatavalue = data.filter((item : any) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    )
    setFilteredData(filterdatavalue);
  }, [searchText, data]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const items: DataType[] = querySnapshot.docs.map(doc => ({
        key: doc.id,
        ...doc.data(),
      })) as DataType[];
      setData(items);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
    setLoading(false);
  };

  const handleDelete = async (key: string) => {
    try {
      await deleteDoc(doc(db, "products", key));
      message.success('Item deleted successfully');
      fetchData();
    } catch (error) {
      console.error("Error deleting document: ", error);
      message.error('Error deleting item');
    }
  };

  const columns : any = [
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: 'price',
      dataIndex: 'price',
    },
    {
      title: 'categorya',
      dataIndex: 'categorya',
    },
    {
      title: 'discription',
      dataIndex: 'discription',
    },
    {
      title: 'color',
      dataIndex: 'color',
    },
    {
      title: 'Image',
      dataIndex: 'image',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_ : any, record : any) => (
        <Space size="middle">
          <Button type="primary">Edit</Button>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <Button type="primary" danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]
  
  // TableColumnsType<DataType> 
  useEffect(()=>{
    filteredData?.map((item:any) => {
      const columnss: any = [
        {
          key: item.key,
          name: item.name,
          price: item.price,
          categorya: item.category,
          discription: item.description,
          color: item.color,
          image: 'Image',
        },
      ]
      setDataColumns(columnss);
      
    })
  }, [filteredData])

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  const onFinish = (value: object) => {
    console.log(value);
  };


  return (
    <ConfigProvider>
      <div className="w-full bg-white">
        <div className="w-full px-[30px] flex justify-between items-center h-[80px] bg-white">
          <Form
            onFinish={onFinish}
            className="flex gap-[50px]"
            name="wrap"
            labelCol={{ flex: '110px' }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            colon={false}
            style={{ maxWidth: 600 }}
          >
            <Form.Item label="Search" name={'categoriya'} rules={[{ required: true }]}>
            <Input
              placeholder="Search by name"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              style={{ marginBottom: 16 }}
            />
            </Form.Item>
            <Form.Item label=" ">
              <Button type="primary" htmlType="submit">
                Search
              </Button>
            </Form.Item>
            <Form.Item label=" ">
              <Button onClick={()=>setSearchText('')} type="primary">
                Reset
              </Button>
            </Form.Item>
          </Form>
          <CreateModal />
        </div>

        <div className="px-[30px]">
          <Radio.Group
            onChange={({ target: { value } }) => {
              setSelectionType(value);
            }}
            value={selectionType}
          >
            <Radio value="checkbox">Checkbox</Radio>
            <Radio value="radio">Radio</Radio>
          </Radio.Group>
          <Divider />
          <Table
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
            columns={columns}
            dataSource={datacolumns}
            loading={loading}
          />
        </div>
      </div>
    </ConfigProvider>
  );
}
