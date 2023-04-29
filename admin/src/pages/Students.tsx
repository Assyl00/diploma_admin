import { Table } from 'antd';
import { students } from '../helpers/studentList';
import { Button, Space } from 'antd';

  const columns = [
    {
      title: 'ФИО',
      dataIndex: 'name',
      key: 'name',
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
  ];

const Sudents = () => {
    return ( 
        <>
        <Button type="primary">Добавить студента</Button>
        <Table dataSource={students} columns={columns} />;

          </>
     );
}
 
export default Sudents;