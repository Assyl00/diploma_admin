import "./style.css"
import { NavLink } from 'react-router-dom';
import img from "./../../KBTU_logo.jpg";

const Navbar = () => {
    const activeLink = 'nav-list__link nav-list__link--active';
	const normalLink = 'nav-list__link';

    return (  
        <nav className="nav">
            <div className="container">
                
            <div className="nav-row">
					<NavLink to="/" className="logo">
                        <img src={img} alt="kbtu logo" className="logo__img" />
					</NavLink>

					<ul className="nav-list">
						<li className="nav-list__item">
							<NavLink
								to="/"
								className={({ isActive }) =>
									isActive ? activeLink : normalLink
								}
							>
								Monitoring
							</NavLink>
						</li>

						<li className="nav-list__item">
							<NavLink
								to="/students"
								className={({ isActive }) =>
									isActive ? activeLink : normalLink
								}
							>
								Students
							</NavLink>
						</li>
						{/* <li className="nav-list__item">
							<NavLink
								to="/"
								className={({ isActive }) =>
									isActive ? activeLink : normalLink
								}
							>
								Sign out
							</NavLink>
						</li> */}
					</ul>
				</div>
            </div>
        </nav>
);
}
 
export default Navbar;