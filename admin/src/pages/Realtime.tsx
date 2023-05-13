// import StartFirebase from '../firebase';
// import React, { useEffect, useState } from 'react'
// import {ref, onValue} from 'firebase/database'
// import {Table} from 'antd'
// import firebase from 'firebase/app';

// const db = StartFirebase();

//     const tableData = [];

//     const fetchData = async () => {
//         const snapshot = await firebase.database().ref(db).once('value');
//         return snapshot.val();
//       };

//     const columns = [
//         {
//           title: 'ФИО',
//           dataIndex: 'name', 
//           key: 'name',
//           // render: () =>( <Button type="primary" 
//           //   onClick={showModal}>
//           //       {dataIndex}</Button>)
//         },
//         {
//           title: 'Факультет, специальность',
//           dataIndex: 'faculty',
//           key: 'faculty',
//         },
//         {
//           title: 'ID студента',
//           dataIndex: 'id',
//           key: 'id',
//         }
//       ];


// const TableComponent = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetchData().then((data) => setData(data));
//   }, []);

//   return (
//   <>
//     <Table dataSource={data} columns={columns}/>
//   </>);
// };
