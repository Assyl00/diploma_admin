import { SetStateAction, useState } from 'react';
import { Modal, Form, Input, Button, Upload, UploadFile, Space } from 'antd';
import { DatePicker, Select } from 'antd';
import {db} from "../../firebase";
import { ref, push } from "firebase/database";
import { RcFile, UploadProps } from 'antd/es/upload';
import { PlusOutlined } from '@ant-design/icons';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const yearFormat = 'YYYY';

const AddStudentModal = () => {
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

  const StudentForm = () => {
    const [formData, setFormData] = useState<Item>({
      key: '',
      firstname: '',
      lastname: '',
      middlename: '',
      degree: '',
      faculty: '',
      major: '',
      starting_year: 0,
      // Initialize other fields here
    });
  }
  
    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //   const { name, value } = e.target;
    //   setFormData((prevData) => ({
    //     ...prevData,
    //     [name]: value,
    //   }));
    // };
  
    // const handleSubmit = (event: React.FormEvent) => {
    //   event.preventDefault();
  
    //   const newStudent: Item = formData;
  
    //   // Save the new student to Firebase
    //   push(ref(db, 'students'), newStudent);
  
    //   // Clear the form inputs
    //   setFormData({
    //     key: '',
    //     firstname: '',
    //     lastname: '',
    //     middlename: '',
    //     degree: '',
    //     faculty: '',
    //     major: '',
    //     starting_year: 0,
    //     // Reset other fields here
    //   });
    // };

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

  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const handleAddStudent = async (values: any) => {
    try {
      // Add student to Firebase database
      const postsRef = ref(db, 'persons');
      await push(postsRef, values);

      // Reset form fields
      form.resetFields();

      // Close the modal
      setVisible(false);
    } catch (error) {
      console.log('Error adding student:', error);
    }
  };

  const { Option } = Select;
  const [prevSelectValue, setPrevSelectValue] = useState('');
  const [showFit, setShowFit] = useState(false);

  const handlePrevSelectChange = (value: string) => {
    // const { name, value } = e.target;
    // setFormData((prevData) => ({
    //   ...prevData,
    //   [name]: value,
    // }));
    
    setPrevSelectValue(value);

    // Set the condition based on the selected value
    // setShowFit(value === 'FIT');
  };

  const generateIdNumber = (value: string) => {
    const currentYear = new Date().getFullYear();
    const lastTwoYearDigits = currentYear.toString().slice(-2);
    const degreeInitial = value.charAt(0).toUpperCase();
    const facultyCode = "01"; // Replace with your logic to get the code for the faculty
    const majorCode = "02"; // Replace with your logic to get the code for the major
    const randomNumbers = Math.floor(Math.random() * 100).toString().padStart(2, "0");

    const id = `${lastTwoYearDigits}${degreeInitial}${facultyCode}${majorCode}${randomNumbers}`;
    return id;
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)} style={{ borderRadius: 0 }}>
        Add Student
      </Button>
      <Modal
        visible={visible}
        title="Add Student"
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setVisible(false)}>
            Cancel
          </Button>,
          <Button key="add" type="primary" onClick={form.submit}>
            Add
          </Button>,
        ]}
      >
        <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-circle"
                // fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
        <Form form={form} onFinish={handleAddStudent}>
          <Form.Item
            name="firstname"
            label="First Name"
            rules={[{ required: true, message: 'Please enter the first name' }]}
            
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastname"
            label="Last Name"
            rules={[{ required: true, message: 'Please enter the last name' }]}
          >
            <Input  />
          </Form.Item>
          <Form.Item
            name="middlename"
            label="Middle Name"
            rules={[{ required: false, message: 'Please enter the middle name' }]}
          >
            <Input  />
          </Form.Item>
          <Form.Item
            name="degree"
            label="Degree"
            rules={[{ required: true, message: 'Please enter the degree' }]}
          >
            <Select onChange={handlePrevSelectChange} >
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
            <Select onChange={handlePrevSelectChange}>
              <Option value="FIT">FIT</Option>
              <Option value="BS">BS</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="major"
            label="Major"
            rules={[{ required: true, message: 'Please enter the major' }]}
          >
            <Select defaultValue = " ">
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
          <Form.Item label="Starting year">
            <DatePicker format={yearFormat} picker="year"/>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddStudentModal;