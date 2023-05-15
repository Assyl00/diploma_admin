import './App.css';
import "./styles/main.css";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
// import {db}  from "./firebase";
import { onValue, ref } from "firebase/database";

import { useState, useEffect } from "react";

import Navbar from "./components/navbar/Navbar";
import Monitoring from './pages/Monitoring';
import Students from './pages/Students';
import Student from './pages/Student';
import Realtime from './pages/Realtime';

function App() {
  	// const usersCollectionRef = ref(db, "persons");

	// useEffect(() => {
	
	// 	// getUsers()
	// 	onValue(usersCollectionRef, (snapshot) => {
	// 		const data = snapshot.val();
	  
	// 		console.log(data)
	// 	  });
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
