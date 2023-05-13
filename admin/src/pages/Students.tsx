import { Modal, Table } from 'antd';
import React from 'react';
import { students } from '../helpers/studentList';
import { Form, Button, Space, message, Upload, Input } from 'antd';
import { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import type { FormItemProps } from 'antd';
import { onValue, ref } from "firebase/database";
import {db} from "../firebase";
import Student from '../components/student/Student'

  const MyFormItemContext = React.createContext<(string | number)[]>([]);

  interface MyFormItemGroupProps {
    prefix: string | number | (string | number)[];
    children: React.ReactNode;
  }
  
  function toArr(str: string | number | (string | number)[]): (string | number)[] {
    return Array.isArray(str) ? str : [str];
  }
  
  const MyFormItemGroup = ({ prefix, children }: MyFormItemGroupProps) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatPath = React.useMemo(() => [...prefixPath, ...toArr(prefix)], [prefixPath, prefix]);
  
    return <MyFormItemContext.Provider value={concatPath}>{children}</MyFormItemContext.Provider>;
  };
  
  const MyFormItem = ({ name, ...props }: FormItemProps) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;
  
    return <Form.Item name={concatName} {...props} />;
  };

  const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
  
  const Students: React.FC= () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-5',
      name: 'image.png',
      status: 'error',
    },
  ]);
// --------------------------------------------------------------------

	// const getUsers = async () => {
	// 	const data = collection(db as any, 'persons')
	// 	const citySnapshot = await getDocs(data);
	// 	const cityList = citySnapshot.docs.map(doc => doc.data());
	// 	//   setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
	// 	// console.log(data)
	// };

	// console.log(usersCollectionRef)s
  // const [projects, setProjects]: any = useState([]);

  // useEffect(() => {
  //   const query = ref(db, "projects");
  //   return onValue(query, (snapshot) => {
  //     const data = snapshot.val();

  //     if (snapshot.exists()) {
  //       Object.values(data).map((project) => {
  //         setProjects((projects: any) => [...projects, project]);
  //       });
  //     }
  //   });
  // }, []);

    // -----------------------------------------------------------
  // const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onFinish = (value: object) => {
        console.log(value);
    };

 

    const columns = [
        {
          title: 'ФИО',
          dataIndex: 'name', 
          key: 'name',
          // render: () =>( <Button type="primary" 
          //   onClick={showModal}>
          //       {dataIndex}</Button>)
        },
        {
          title: 'Факультет, специальность',
          dataIndex: 'faculty',
          key: 'faculty',
        },
        {
          title: 'ID студента',
          dataIndex: 'id',
          key: 'id',
        },
        {
          dataIndex: '',
          key: 'x',
          render: () =>( <Button type="primary" 
            onClick={showModal}>
                Edit</Button>)
        },
      ];  
    return ( 
        <>
        <Button type="primary" onClick={showModal}>Добавить студента
        </Button>
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-circle"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
            <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
            <MyFormItemGroup prefix={['user']}>
              <MyFormItemGroup prefix={['name']}>
                <MyFormItem name="firstName" label="First Name">
                  <Input />
                </MyFormItem>
                <MyFormItem name="lastName" label="Last Name">
                  <Input />
                </MyFormItem>
              </MyFormItemGroup>

              <MyFormItem name="age" label="Age">
                <Input />
              </MyFormItem>
            </MyFormItemGroup>

            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            </Form>
        </Modal>
        <Table dataSource={students} columns={columns} />;
        
        </>
     );
}

 
export default Students;