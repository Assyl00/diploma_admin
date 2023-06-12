import { Modal, Select, Table } from 'antd';
import React from 'react';
import { Form, Button, Input } from 'antd';
import { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { ref, update } from "firebase/database";
import {db} from "../firebase";
import ImageComponent from '../components/additional/ImageComponent';
import { onValue } from 'firebase/database'
import AddStudentModal from '../components/additional/AddStudentModal';
import '../components/student/style.css'

  const MyFormItemContext = React.createContext<(string | number)[]>([]);
  const { Search } = Input;
  const onSearch = (value: string) => console.log(value);

  interface MyFormItemGroupProps {
    prefix: string | number | (string | number)[];
    children: React.ReactNode;
  }
  
  function toArr(str: string | number | (string | number)[]): (string | number)[] {
    return Array.isArray(str) ? str : [str];
  }
  
  const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
  
  const StudentsTable = () => {
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
      degree: string;
      faculty: string;
      major: string;
      starting_year: number;
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
    const filename = selectedStudent?.key

    const handleEdit = (student: Item) => {
      setSelectedStudent(student);
      setEditedStudent({ ...student });
      showModalEdit();
    };

    const handleModalClose = () => {
      setSelectedStudent(null);
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
      setSelectedStudent((prevStudent) => ({
        ...prevStudent,
        ...editedStudent,
      }));

      const updates: Partial<Item> = {
        faculty: editedStudent.faculty,
        firstname: editedStudent.firstname,
        lastname: editedStudent.lastname,
        degree: editedStudent.degree,
        major: editedStudent.major,
        middlename: editedStudent.middlename,
        starting_year: editedStudent.starting_year,
      };

      update(ref(db, `persons/${selectedStudent.key}`), updates)
        .then(() => {
          console.log('Data successfully updated in the Realtime Database.');
          console.log(selectedStudent.key)
          handleModalClose();
        })
        .catch((error) => {
          console.error('Error updating data in the Realtime Database:', error);
        });
  
      }
    };
    
    const columns = [
        {
          title: 'Имя',
          dataIndex: 'firstname', 
          key: 'firstname',
        },
        {
          title: 'Фамилия',
          dataIndex: 'lastname', 
          key: 'lastname',
        },
        {
          title: 'Специальность',
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
      const [searchText, setSearchText] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredData = postData.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const { Option } = Select;
  const [prevSelectValue, setPrevSelectValue] = useState('');

  const handlePrevSelectChange = (value: string) => {
    setPrevSelectValue(value);
  };

  return ( 
        <>
        <div style={{height:148}}></div>
        {AddStudentModal && <AddStudentModal/>}
        <Search placeholder="Enter some info about student" allowClear onSearch={onSearch} style={{ boxSizing: 'border-box', borderRadius: 0 }} value={searchText} onChange={handleSearch} />

        <Modal title="Edit Student" open={isModalOpenEdit}  onCancel={handleCancel} footer={null}>
            <ImageComponent filename= {filename!}/>
            <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
                <Form.Item label="First Name">
                  <Input name = "firstname" value={editedStudent?.firstname} onChange={handleInputChange}/>
                </Form.Item>
                <Form.Item label="Last Name">
                  <Input name = "lastname" value={editedStudent?.lastname} onChange={handleInputChange}/>
                </Form.Item>
                <Form.Item label="Middle Name">
                  <Input name = "middlename" value={editedStudent?.middlename} onChange={handleInputChange}/>
                </Form.Item>
                <Form.Item
                  name="degree"
                  label="Degree"
                  rules={[{ required: true, message: 'Please enter the degree' }]}
                >
                  <Select onChange={handlePrevSelectChange} defaultValue = {editedStudent?.degree} disabled>
                    <Option value="Bachelor">Bachelor</Option>
                    <Option value="Master">Master</Option>
                    <Option value="PhD">PhD</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="faculty"
                  label="Faculty"
                  rules={[{ required: true, message: 'Please enter the faculty' }]}
                >
                  <Select onChange={handlePrevSelectChange} defaultValue = {editedStudent?.faculty} disabled>
                    <Option value="FIT">FIT</Option>
                    <Option value="BS">BS</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="major"
                  label="Major"
                  rules={[{ required: true, message: 'Please enter the major' }]}
                >
                  <Select defaultValue = {editedStudent?.major} disabled>
                    {prevSelectValue === 'FIT' ? (
                      <>
                        <Select.Option value="IS">IS</Select.Option>
                        <Select.Option value="CSS">CSS</Select.Option>
                      </>
                    ): 
                    <>
                    {prevSelectValue === 'BS' && (
                      <>
                      <Select.Option value="Finance">Finance</Select.Option>
                      <Select.Option value="Marketing">Marketing</Select.Option>
                    </>
                    )}
                    </>
                    }
                  </Select>
                </Form.Item>
                <Form.Item label="ID">
                  <Input name = "id" value={editedStudent?.key} onChange={handleInputChange} disabled/>
                </Form.Item>
              <Button type="primary" htmlType="submit" onClick={handleSave} >
                Submit
              </Button>
            </Form>
        </Modal>
        <Table dataSource={filteredData} columns={columns} />
        </>
     );
}

export default StudentsTable;
