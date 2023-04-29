import {useParams} from "react-router-dom";
import {students} from "./../helpers/studentList"

const Project = () => {
	const {id}: any = useParams();
	const student = students[id];

    return (
		<main className="section">
			<div className="container">
				<div className="project-details">
					<h1 className="title-1">{student.name}</h1>

					<img
						alt={student.id}
						className="project-details__cover"
					/>

					<div className="project-details__desc">
						<p>Skills: {student.name}</p>
                        <p>Surname: {student.surname}</p>
                        <p>Faculty: {student.faculty}</p>
                        <p>Scpeciality: {student.speciality}</p>
                        <p>ID: {student.id}</p>
					</div>

				</div>
			</div>
		</main>
	);
}

export default Project;