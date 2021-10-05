import Cookies from 'js-cookie';
import React from 'react'
import { useHistory } from 'react-router-dom';
import "../../styles/ProfilePage/LogOut.css";

const ProfilePageLogOut = () => {
    const history = useHistory();

    const handleLogout = (e) => {
        e.preventDefault();
        Cookies.remove('token');
        history.replace('/');
        window.location.reload();
    }

    return (
        <div>
            <button className="logOutBttn">
                <div className="logOut" onClick={handleLogout}>Log out</div>
            </button>
        </div>
    )
}

export default ProfilePageLogOut
