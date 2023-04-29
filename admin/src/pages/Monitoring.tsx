import Header from "../components/header/Header"

import {students} from "./../helpers/studentList"
import Student from '../components/student/Student'

const Monitoring = () => {
    return (  
        <>
			<main className="section">
			<div className="container">
				<ul className="projects">
					{students.map((student, index) => {
						return (
							<Student
								key={index}
								title={[student.name, student.surname]}
								index={index}
							/>
						);
					})}
				</ul>
			</div>
		</main>
		</>
    );
}
 
export default Monitoring;