import Header from "../components/header/Header"

import {students} from "./../helpers/studentList"
import Student from '../components/student/Student'
import {db} from "../firebase";
import { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database";

interface Item {
	key: string;
	firstname: string;
	lastname: string;
	id: number;
	enter_or_exit: string;
	enter_time: string;
}

const Monitoring = () => {
	const [postData, setPostData] = useState<Item[]>([]);

    useEffect(() => {
      const postsRef = ref(db, 'sessions');

      onValue(postsRef, (snapshot) => {
        const data = snapshot.val();
        const transformedData = data
          ? Object.keys(data).map((key) => ({ key, ...data[key] }))
          : [];
        setPostData(transformedData);
        
        
      });

    }, []);

    return (  
        <>
			<main className="section">
			<div className="container">
				<ul className="projects">
					{postData.map((postData) => {
						return (
							<Student
								key={postData.key}
								firstname={postData.firstname}
								lastname={postData.lastname}
								id={postData.id}
								enter_or_exit={postData.enter_or_exit}
								enter_time={postData.enter_time}
							/>
						)
					})}
				</ul>
			</div>
		</main>
		</>
    );
}
 
export default Monitoring;