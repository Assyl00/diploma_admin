import './App.css';
import "./styles/main.css";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Monitoring from './pages/Monitoring';
import Students from './pages/Students';
import Student from './pages/Student';

function App() {
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
