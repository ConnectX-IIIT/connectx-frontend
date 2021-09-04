import React from 'react'
import "../../styles/Admin/AdminPannelUserProfile.css"
import DefaultCoverPhoto from"../../assets/_rough/achi photo part 2.jpg"
const AdminPannelUserProfile = () => {
    return (
        <div className="admin-pannel-user-profile-right-wrapper">
            <div className="user-profile-image-wrapper" >
                <img src={DefaultCoverPhoto} alt="" className="user-profile-cover-photo"/>
            </div>
        </div>
    )
}

export default AdminPannelUserProfile
