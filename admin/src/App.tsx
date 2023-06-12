import './App.css';
import "./styles/main.css";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Monitoring from './pages/Monitoring';
import StudentsTable from './pages/StudentsTable';

function App() {

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