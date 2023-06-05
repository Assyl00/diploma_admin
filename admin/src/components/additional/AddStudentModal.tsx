import { ChangeEvent, SetStateAction, useState } from 'react';
import { Modal, Form, Input, Button, Upload, UploadFile, message } from 'antd';
import { DatePicker, Select } from 'antd';
import {db, storage} from "../../firebase";
import { child, ref, set } from "firebase/database";
import { RcFile, UploadProps } from 'antd/es/upload';
import { PlusOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';
import { ref as storageRef, uploadBytes } from "firebase/storage";
import "./style.css";

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



  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dayjs());

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setSelectedDate(date);
  };

  const [selectedOption, setSelectedOption] = useState<string>('B');

  const handleSelectChange = (value: string) => {
    setSelectedOption(value || 'B');
  };
  
  const [selectedFacultyOption, setselectedFacultyOption] = useState<string>('01');

  const handleFacultySelectChange = (value: string) => {
    handlePrevSelectChange(value);
    setselectedFacultyOption(value);
  };

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
<<<<<<< HEAD
      // const db = getDatabase();
      const customId = generateIdNumber(selectedOption);
      // handleFileUpload(customId);
=======
      const customId = id;
>>>>>>> 4a1fec7cdbc3ee0f21b26ab2023206af1ab8cb71

      const newPersonRef = ref(db, 'persons/' + customId);

      const formattedData = {
        id: customId,
        ...values,
        starting_year: selectedDate?.year().toString(),
      };
      await set(newPersonRef, formattedData);

      form.resetFields();

      setVisible(false);
      console.log(formattedData.id);
      
    } catch (error) {
      console.log('Error adding student:', error);
    }
  };

  const { Option } = Select;
  const [prevSelectValue, setPrevSelectValue] = useState('01');
  const [showFit, setShowFit] = useState(false);

  const handlePrevSelectChange = (value: string) => {
    setPrevSelectValue(value);
  };

  const generateIdNumber = (value: string | undefined) => {
    value==undefined?value="B":value.toUpperCase();
    const currentYear = selectedDate?.format('YY');
    let degreeInitial = value.charAt(0).toUpperCase();
    degreeInitial==undefined?degreeInitial="B":degreeInitial.charAt(0).toUpperCase();
    const facultyCode = selectedFacultyOption
    const randomNumbers = Math.floor(Math.random() * 100).toString().padStart(4, "0");

    const id = `${currentYear}${degreeInitial}${facultyCode}${randomNumbers}`;
    return id;
  };


  let id = generateIdNumber(selectedOption);

const idNumber = generateIdNumber(selectedOption);

const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
  try {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const fileName = id;

    const storageReference = storageRef(storage,  fileName + '.png');
    await uploadBytes(storageReference, file);

    console.log('Image uploaded successfully!');
    console.log(fileName)
  } catch (error) {
    console.error('Error uploading image:', error);
  }
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

        <div>
          <input className='file_upload' type="file" onChange={handleFileUpload} />
        </div>
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
            initialValue={"Male"}
          >
            <Select>
              <Option value="M">Male</Option>
              <Option value="F">Female</Option>
            </Select>
          </Form.Item>
          <Form.Item name="starting_year" label="Starting year" initialValue={selectedDate}>
            <DatePicker style={{ width: '100%' }} value={selectedDate} onChange={handleDateChange} format={yearFormat} picker="year" />
          </Form.Item>
          <Form.Item 
            name="degree"
            label="Degree"
            rules={[{ required: true, message: 'Please enter the degree' }]}
            initialValue={"Bachelor"}
          >
            <Select onChange={handleSelectChange}>
              <Option value="B">Bachelor</Option>
              <Option value="M">Master</Option>
              <Option value="P">PhD</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="faculty"
            label="Faculty"
            rules={[{ required: true, message: 'Please enter the faculty' }]}
            initialValue={"01"}
          >
            <Select onChange={handleFacultySelectChange}>
              <Option value="01">FIT</Option>
              <Option value="02">BS</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="major"
            label="Major"
            rules={[{ required: true, message: 'Please enter the major' }]}
            initialValue={"IS"}
          >
            <Select>
              {prevSelectValue === '01' ? (
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
<<<<<<< HEAD
        <p>{selectedDate ? selectedDate.format('YY') : 'Нет даты'}</p>
        {/* <p>{generateIdNumber(selectedOption)}</p> */}
        <p>{idNumber}</p>
        <p>Выбранное значение Select 2: {selectedFacultyOption}</p>
=======
>>>>>>> 4a1fec7cdbc3ee0f21b26ab2023206af1ab8cb71
      </Modal>
    </>
  );
}

export default AddStudentModal;