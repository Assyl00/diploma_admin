import StudentCard from '../components/student/StudentCard'
import {db} from "../firebase";
import { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database";
import moment from 'moment';

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
          ? Object.keys(data).map((key) => ({ key, ...data[key] })).reverse()
          : [];
        setPostData(transformedData);
        
        
      });

    }, []);

    return (  
        <>
			<main className="section" style={{paddingTop: 200}}>
			<div className="container">
				<ul className="projects">
					{postData.map((postData) => {
						return (
							<StudentCard
								key={postData.key}
								firstname={postData.firstname}
								lastname={postData.lastname}
								id={postData.id}
								enter_or_exit={postData.enter_or_exit}
								enter_time={moment(postData.enter_time).format('DD.MM.YYYY' + ' ' + 'HH:mm')}
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