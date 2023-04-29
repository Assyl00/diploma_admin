import { NavLink } from 'react-router-dom';
import './style.css';

type StudProps = {
    title: string[];
    index: number;
  };

const Project = ({ title, index }: StudProps) => {
	return (
		<NavLink to={`/student/${index}`}>
			<li className="student">
				{/* <img src={img} alt={title} className="project__img" /> */}
				<h3 className="student__title">{title}</h3>
			</li>
		</NavLink>
	);
};

export default Project;
