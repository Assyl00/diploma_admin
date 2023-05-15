import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { Modal, Button, Table } from 'antd';

interface Item {
    key: string;
    firstname: string;
    id: string;
  }

function Realtime() {
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
    
    const columns = [
        {
          title: 'ФИО',
          dataIndex: 'firstname', 
          key: 'firstname',
          // render: () =>( <Button type="primary" 
          //   onClick={showModal}>
          //       {dataIndex}</Button>)
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
      ];  

      
    
    return (

        <div>
        <Table dataSource={postData} columns={columns} />
        </div>
    //   <div>
    //     {data.map((item) => (
    //       <div key={item.key}>
    //         <h2>{item.firstname}</h2>
    //         <p>{item.lastname}</p>
    //       </div>
    //     ))}
    //   </div>
    );
}

export default Realtime;