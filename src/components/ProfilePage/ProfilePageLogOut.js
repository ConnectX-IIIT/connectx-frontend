import Cookies from 'js-cookie';
import React from 'react'
import "../../styles/ProfilePage/LogOut.css";

const ProfilePageLogOut = () => {

    const handleLogout = (e) => {
        e.preventDefault();
        Cookies.remove('token');
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
