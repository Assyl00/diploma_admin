import './App.css';
import "./styles/main.css";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {db}  from "./firebase";
import { onValue, ref } from "firebase/database";

import { useState, useEffect } from "react";

import Navbar from "./components/navbar/Navbar";
import Monitoring from './pages/Monitoring';
import Students from './pages/Students';
import Student from './pages/Student';

function App() {
	// const [persons, setUsers] = useState([]);
  	const usersCollectionRef = ref(db, "persons");


	// const getUsers = async () => {
	// 	const data = collection(db as any, 'persons')
	// 	const citySnapshot = await getDocs(data);
	// 	const cityList = citySnapshot.docs.map(doc => doc.data());
	// 	  setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
	// 	console.log(data)
	// };

	// console.log(usersCollectionRef)
	useEffect(() => {
	
		// getUsers()
		onValue(usersCollectionRef, (snapshot) => {
			const data = snapshot.val();
	  
			console.log(data)
		  });
	  }, []);

	// const usersCollectionRef = collection(db, "users");

	// useEffect(() => {
	// 	const getUsers = async () => {
	// 	  const data = await getDocs(usersCollectionRef);
	// 	  setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
	// 	};
	
	// 	getUsers();
	//   }, []);

  return (
    <div className="App">
      <Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Monitoring />} />
					<Route path="/students" element={<Students />} />
					<Route path="/student/:id" element={<Student />} />
				</Routes>
			</Router>
    </div>
  );
}

export default App;
