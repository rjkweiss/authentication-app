import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useEffect, useState, useRef } from "react";

const ProfileButton = ({ user }) => {

    const dispatch = useDispatch();

    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    // toggle profile open
    const openMenu = () => {
        setShowMenu((prevState) => !prevState);
    }

    useEffect(() => {
        const closeMenu = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setShowMenu(false);
            }

            // add event clicker
            document.addEventListener('click', closeMenu);

            // clean event clicker
            return () => document.removeEventListener('click', closeMenu);
        };
    }, [showMenu]);

    // handle logout
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    return (
        <div ref={menuRef} className="user-profile">
            <i className="fa-solid fa-user" onClick={openMenu}></i>
            {/* dropdown */}
            {showMenu &&
                <div className="dropdown">
                    <ul>
                        <li>username: {user.username}</li>
                        <li>email: {user.email}</li>
                        <li>
                            <button type="submit" onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </div>
            }
        </div>
    );
};

export default ProfileButton;
