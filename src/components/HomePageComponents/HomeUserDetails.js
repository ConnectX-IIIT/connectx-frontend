import React from "react";
import DefaultCoverPhoto from "../../assets/profile/user_profile_default_cover.svg";
import DefaultProfilePhoto from "../../assets/profile/user_profile_default_icon.svg";
import "../../styles/HomePage/HomeMainContainer/HomeUserDetails.css";

function HomeUserDetails() {
  return (
    <div className="HomeUserDetails">
      <div id="UpperImageContainer">
        <img src={DefaultCoverPhoto} alt="Cover" />
        <img src={DefaultProfilePhoto} alt="profile" />
      </div>
    </div>
  );
}

export default HomeUserDetails;
