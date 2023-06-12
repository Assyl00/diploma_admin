import './style.css';
import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { db } from '../../firebase';
import ImageComponent from '../additional/ImageComponent';

interface Item {
	key: string;
	firstname: string;
	lastname: string;
	id: number;
	enter_or_exit: string;
	enter_time: string;
  }

const StudentCard = ({key, firstname, lastname, id, enter_or_exit, enter_time}: Item) => {
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
			<li className="student">
				<ImageComponent filename= {`${id!}`} />
				<div className='student__card'>
					<p>{firstname}</p>
					<p>{lastname}</p>
					<p>{id}</p>
					<p>{enter_or_exit}</p>
					<p>{enter_time}</p>
				</div>
			</li>
	);
};

export default StudentCard;
