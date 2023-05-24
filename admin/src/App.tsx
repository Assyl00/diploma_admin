import './App.css';
import "./styles/main.css";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
// import {db}  from "./firebase";
import { onValue, ref } from "firebase/database";

import { useState, useEffect } from "react";

import Navbar from "./components/navbar/Navbar";
import Monitoring from './pages/Monitoring';
import StudentsTable from './pages/StudentsTable';
import Student from './pages/StudentInfo';

function App() {
  	// const usersCollectionRef = ref(db, "persons");

	// useEffect(() => {
	
	// 	// getUsers()
	// 	onValue(usersCollectionRef, (snapshot) => {
	// 		const data = snapshot.val();
	  
	// 		console.log(data)
	// 	  });
	//   }, []);

  document.title = 'Face ID Admin';
  return (
    <div className="App">
		
      <Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Monitoring />} />
				<Route path="/students" element={<StudentsTable />} />
			</Routes>
	  </Router>
    </div>
  );
}

export default App;



					{/* <Route path="/student/:id" element={<Student />} /> */}
