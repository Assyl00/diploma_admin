import { SetStateAction, useState } from 'react';
import { Modal, Form, Input, Button, Upload, UploadFile } from 'antd';
import { DatePicker, Select } from 'antd';
import {db} from "../../firebase";
import { ref, set } from "firebase/database";
import { RcFile, UploadProps } from 'antd/es/upload';
import { PlusOutlined } from '@ant-design/icons';
<<<<<<< HEAD
=======
import moment, { Moment } from 'moment';
import dayjs, { Dayjs } from 'dayjs';
import { storageRef } from "../../firebase";
import "./style.css";
>>>>>>> 61ab21c0aeed1a3c192c87bd19debeecf77dab70

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
      url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    },
    {
      uid: '-5',
      name: 'image.png',
      status: 'error',
    },
  ]);

<<<<<<< HEAD
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
=======

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

  const [selectedOption, setSelectedOption] = useState<string>('');


  const handleSelectChange = (value: string | undefined) => {
    setSelectedOption(value || '');
  };
  
  const [selectedFacultyOption, setselectedFacultyOption] = useState<string>('');

  const handleFacultySelectChange = (value: string) => {
    handlePrevSelectChange(value);
    setselectedFacultyOption(value);
  };
>>>>>>> 61ab21c0aeed1a3c192c87bd19debeecf77dab70

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
      // const db = getDatabase();
      const customId = generateIdNumber(selectedOption);

      const newPersonRef = ref(db, 'persons/' + customId);

      const formattedData = {
        id: customId,
        ...values,
        starting_year: selectedDate?.year().toString(),
      };
      await set(newPersonRef, formattedData);

      form.resetFields();

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
    const currentYear = selectedDate?.format('YY');
    const degreeInitial = value.charAt(0).toUpperCase();
    const facultyCode = selectedFacultyOption;
    const randomNumbers = Math.floor(Math.random() * 100).toString().padStart(4, "0");

    const id = `${currentYear}${degreeInitial}${facultyCode}${randomNumbers}`;
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
                action={storageRef.child('19B030067').toString()}
                listType="picture-circle"
                // fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
        <Form layout="vertical" form={form} onFinish={handleAddStudent} >
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
            name="sex"
            label="Sex"
            rules={[{ required: true, message: 'Please enter the sex' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="starting_year" label="Starting year">
            <DatePicker style={{ width: '100%' }} value={selectedDate} onChange={handleDateChange} format={yearFormat} picker="year" />
          </Form.Item>
          <Form.Item 
            name="degree"
            label="Degree"
            rules={[{ required: true, message: 'Please enter the degree' }]}
          >
<<<<<<< HEAD
            <Select onChange={handlePrevSelectChange} >
=======
            <Select onChange={handleSelectChange}>
>>>>>>> 61ab21c0aeed1a3c192c87bd19debeecf77dab70
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
<<<<<<< HEAD
            <Select onChange={handlePrevSelectChange}>
              <Option value="FIT">FIT</Option>
              <Option value="BS">BS</Option>
=======
            <Select onChange={handleFacultySelectChange}>
              <Option value="01">FIT</Option>
              <Option value="02">BS</Option>
>>>>>>> 61ab21c0aeed1a3c192c87bd19debeecf77dab70
            </Select>
          </Form.Item>
          <Form.Item
            name="major"
            label="Major"
            rules={[{ required: true, message: 'Please enter the major' }]}
          >
<<<<<<< HEAD
            <Select defaultValue = " ">
              {prevSelectValue === 'FIT' ? (
=======
            <Select>
              {prevSelectValue === '01' ? (
>>>>>>> 61ab21c0aeed1a3c192c87bd19debeecf77dab70
                <>
                  <Select.Option value="IS">IS</Select.Option>
                  <Select.Option value="CSS">CSS</Select.Option>
                </>
              ): 
              <>
              {prevSelectValue === '02' && (
                <>
                <Select.Option value="Finance">Finance</Select.Option>
                <Select.Option value="Marketing">Marketing</Select.Option>
              </>
              )}
              </>
              }
            </Select>
          </Form.Item>
        </Form>
        <p>{selectedDate ? selectedDate.format('YY') : 'Нет даты'}</p>
        <p>{generateIdNumber(selectedOption)}</p>
        <p>Выбранное значение Select 2: {selectedFacultyOption}</p>
      </Modal>
    </>
  );
}

export default AddStudentModal;