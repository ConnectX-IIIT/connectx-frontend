import React from "react";
import "../../styles/ProfilePage/ProfilePage.css";

import photoIcon from "../../assets/profile_page/ic_camera.svg";
import DefaultCoverPhoto from "../../assets/_rough/achi photo part 2.jpg";
import DefaultProfilePhoto from "../../assets/_rough/Jethalal-1200.jpg";
import photoIconWhite from "../../assets/profile_page/ic_camera_white.svg";

function ProfilePageImageContainer() {
  return (
    <div className="profile-page-image-container">
      <img
        src={DefaultCoverPhoto}
        alt="cover"
        className="profile-page-cover-photo"
      />
      <div className="profile-page-upload-photo">
        <img src={photoIcon} alt="photo" />
        <div>Update cover photo</div>
      </div>
      <div className="profile-page-profile-photo-wrapper">
        <img
          src={DefaultProfilePhoto}
          alt="cover"
          className="profile-page-profile-photo"
        />
        <div className="profile-page-profile-photo-edit">
          <img src={photoIconWhite} alt="photo" />
        </div>
      </div>
    </div>
  );
}

function ProfilePage() {
  return (
    <div className="profile-page-wrapper">
      <ProfilePageImageContainer />
    </div>
  );
}

export default ProfilePage;
