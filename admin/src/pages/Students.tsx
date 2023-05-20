import { Modal, Table } from 'antd';
import React from 'react';
import { Form, Button, Upload, Input } from 'antd';
import { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { ref, update } from "firebase/database";
import {db} from "../firebase";
import ImageComponent from '../components/additional/ImageComponent';
import { onValue } from 'firebase/database'
import { students } from '../helpers/studentList';
import AddStudentModal from '../components/additional/AddStudentModal';

  const MyFormItemContext = React.createContext<(string | number)[]>([]);

  interface MyFormItemGroupProps {
    prefix: string | number | (string | number)[];
    children: React.ReactNode;
  }
  
  function toArr(str: string | number | (string | number)[]): (string | number)[] {
    return Array.isArray(str) ? str : [str];
  }
  
  // const MyFormItemGroup = ({ prefix, children }: MyFormItemGroupProps) => {
  //   const prefixPath = React.useContext(MyFormItemContext);
  //   const concatPath = React.useMemo(() => [...prefixPath, ...toArr(prefix)], [prefixPath, prefix]);
  
  //   return <MyFormItemContext.Provider value={concatPath}>{children}</MyFormItemContext.Provider>;
  // };
  
  // const MyFormItem = ({ name, ...props }: FormItemProps) => {
  //   const prefixPath = React.useContext(MyFormItemContext);
  //   const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;
  
  //   return <Form.Item name={concatName} {...props} />;
  // };

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

  
  // const [fileList, setFileList] = useState<UploadFile[]>([
  //   {
  //     uid: '-1',
  //     name: 'image.png',
  //     status: 'done',
  //     url: <ImageComponent filename={filename} />,
  //   }
  // ]);


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
    const [isModalOpenEdit, setIsModalEditOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const showModalEdit = () => {
        setIsModalEditOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        setIsModalEditOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsModalEditOpen(false);
    };
    const onFinish = (value: object) => {
        console.log(value);
    };

   
// -----------------------------------------------------------------------------------------------------
    
    interface Item {
      key: string;
      firstname: string;
      lastname: string;
      middlename: string;
      faculty: string;
      major: string;
      starting_year: number;
      year: number;
    }

    const [postData, setPostData] = useState<Item[]>([]);

    useEffect(() => {
      const postsRef = ref(db, 'persons');

      onValue(postsRef, (snapshot) => {
        const data = snapshot.val();
        const transformedData = data
          ? Object.keys(data).map((key) => ({ key, ...data[key] }))
          : [];
        setPostData(transformedData);
        
        
      });

    }, []);

    const [selectedStudent, setSelectedStudent] = useState<Item | null>(null);
    const [editedStudent, setEditedStudent] = useState<Item | null>(null);
    const filename = selectedStudent?.key.concat(".png")

    const handleEdit = (student: Item) => {
      setSelectedStudent(student);
      setEditedStudent({ ...student });
      showModalEdit();
    };

    const handleModalClose = () => {
      setSelectedStudent(null);
      // setEditedStudent(null);
      handleCancel();
    };
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setEditedStudent((prevStudent: Item | null): Item | null => ({
        ...(prevStudent as Item),
        [name]: value,
      }));
    };

    const handleSave = () => {
      if(selectedStudent && editedStudent){
      // Update the student object with edited values
      // setSelectedStudent(editedStudent);
      setSelectedStudent((prevStudent) => ({
        ...prevStudent,
        ...editedStudent,
      }));

      // Create an object with only the properties to be updated
      const updates: Partial<Item> = {
        faculty: editedStudent.faculty,
        firstname: editedStudent.firstname,
        lastname: editedStudent.lastname,
        major: editedStudent.major,
        middlename: editedStudent.middlename,
        starting_year: editedStudent.starting_year,
        year: editedStudent.year,
      };

      //save object to Realtime Database
      update(ref(db, `persons/${selectedStudent.key}`), updates)
        .then(() => {
          console.log('Data successfully updated in the Realtime Database.');
          console.log(selectedStudent.key)
          handleModalClose();
        })
        .catch((error) => {
          console.error('Error updating data in the Realtime Database:', error);
        });
  
      // Perform additional save logic if needed
      }
    };
    
    const columns = [
        {
          title: 'ФИО',
          dataIndex: 'firstname', 
          key: 'firstname',
        },
        {
          title: 'Факультет, специальность',
          dataIndex: 'major',
          key: 'major',
        },
        {
          title: 'ID студента',
          dataIndex: 'key',
          key: 'key',
        },
        {
            dataIndex: 'Actions',
            key: 'actions',
            render: (_: any, record: Item) => {
              return(
                <Button type="primary" onClick={() => handleEdit(record)}>
                  Edit
                </Button>
              )
              },
          },
      ];  
    return ( 
        <>
        {/* <Button type="primary" onClick={showModal}>Добавить студента
        </Button> */}
        {AddStudentModal && <AddStudentModal/>}
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-circle"
                // fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            {/* <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                
                
            </Modal> */}
            <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
                <Form.Item label="First Name">
                  <Input name = "firstname" onChange={handleInputChange}/>
                </Form.Item>
                <Form.Item label="Last Name">
                  <Input name = "lastname" onChange={handleInputChange}/>
                </Form.Item>

              <Button type="primary" htmlType="submit" onClick={handleSave}>
                Submit
              </Button>
            </Form>
        </Modal>


        <Modal title="Basic Modal" open={isModalOpenEdit} onOk={handleOk} onCancel={handleCancel}>
            {/* <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-circle"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload> */}
            <ImageComponent filename= {filename!} />
            <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
                <Form.Item label="First Name">
                  <Input name = "firstname" value={editedStudent?.firstname} onChange={handleInputChange}/>
                </Form.Item>
                <Form.Item label="Last Name">
                  <Input name = "lastname" value={editedStudent?.lastname} onChange={handleInputChange}/>
                </Form.Item>

              <Button type="primary" htmlType="submit" onClick={handleSave}>
                Submit
              </Button>
            </Form>
        </Modal>
        <Table dataSource={postData} columns={columns} />
        
        </>
     );
}

 
export default Students;
