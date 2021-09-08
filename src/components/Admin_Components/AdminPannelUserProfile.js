import React from "react";
import "../../styles/Admin/AdminPannelUserProfile.css";
import DefaultCoverPhoto from "../../assets/_rough/achi photo part 2.jpg";
import DefaultProfilePhoto from "../../assets/_rough/achi photo part 3.jpg";
import AdminPannelButton from "./AdminPannelButton";
const AdminPannelUserProfile = () => {
  return (
    <div className="admin-pannel-user-profile-right-wrapper">
      <div className="user-profile-image-wrapper">
        <img
          src={DefaultCoverPhoto}
          alt=""
          className="user-profile-cover-photo"
        />
        <img
          src={DefaultProfilePhoto}
          alt=""
          className="user-profile-profile-photo"
        />
      </div>
      <div className="user-profile-info-wrapper">
        <p className="user-profile-user-name">Raj Noobda</p>
        <p className="user-profile-user-batch">WatchMan</p>
        <p className="user-profile-user-year">2000-2028</p>
        <p className="user-profile-user-description">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque sequi
          pariatur ullam perspiciatis repudiandae amet, odio adipisci
        </p>
        <p className="user-profile-user-contact">
          <p className="user-profile-phone">4946234949</p>
          <p className="user-profile-email">rajnoobda@iiitm.ac.in</p>
        </p>
        <div className="user-profile-buttons-wrapper">
          <AdminPannelButton
            innerContent="Approve"
            buttonColor="#1792DD"
            paddingX="3.35vw"
            isBorder
          />
          <AdminPannelButton
            innerContent="Raise an Issue"
            buttonColor="#00910E"
            paddingX="2.35vw"
            isBorder
          />
          <AdminPannelButton
            innerContent="Reject"
            buttonColor="#DD1717"
            paddingX="0vw"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPannelUserProfile;
