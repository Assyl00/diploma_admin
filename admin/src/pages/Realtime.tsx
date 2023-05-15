// import React, { useEffect, useState } from 'react';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/database';
// import { useTable, Column } from 'react-table';
// import {Table} from 'antd';

// type Data = {
//   firstname: string;
//   faculty: string;
//   lastname: string;
//   major: string;
//   year: number;
// };

// const fetchData = async () => {
//     const snapshot = await firebase.database().ref('https://face-atendance-default-rtdb.europe-west1.firebasedatabase.app/').once('value');
//     return snapshot.val();
//   };
  
//   const Realtime = () => {
//     const [data, setData] = useState<Data[]>([]);
  
//     useEffect(() => {
//       const fetchDataAndSetData = async () => {
//         const data = await fetchData();
//         setData(data);
//       };
  
//       fetchDataAndSetData();
//     }, []);
  

//   const columns: Column<Data>[]= [
//     {
//       Header: 'Faculty',
//       accessor: 'faculty',
//     },
//     {
//       Header: 'Name',
//       accessor: 'firstname',
//     },
//     {
//       Header: 'Lastname',
//       accessor: 'lastname',
//     },
//     {
//       Header: 'Major',
//       accessor: 'major',
//     },
//     {
//       Header: 'Year',
//       accessor: 'year',
//     },

//   ];

//   const tableInstance = useTable({ columns, data });

//   return (
//     <Table dataSource={data} columns={columns} />
//   );
// };

// export default Realtime;


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