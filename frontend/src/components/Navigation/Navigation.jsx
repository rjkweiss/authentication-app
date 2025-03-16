import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal/LoginFormPage";

import './Navigation.css';

const Navigation = () => {

    // get session user
    const sessionUser = useSelector((state) => state.session.user);

    return (
        <nav className="nav-menu">
            <ul>
                <NavLink to='/'>Home</NavLink>
                {!sessionUser ? (
                    <div className="action-links">
                        <NavLink to='/signup'>Signup</NavLink>
                        {/* <NavLink to='/login'>Login</NavLink> */}
                        <LoginFormModal />
                    </div>
                ): (
                    <div className="action-links">
                        <ProfileButton user={sessionUser}/>
                    </div>
                )}
            </ul>
        </nav>
    );
};

export default Navigation;
