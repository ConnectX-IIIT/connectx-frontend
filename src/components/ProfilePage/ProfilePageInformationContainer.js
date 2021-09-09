import React from "react";

import "../../styles/ProfilePage/ProfilePageInformationContainer.css";
import penIcon from "../../assets/profile/pen.svg";

function ProfilePageInformationContainer({ isYourProfile, userDetails }) {

  return (
    <div className="profile-page-information-container-wrapper">
      <div className="profile-page-information-container">
        <div>{userDetails.name}</div>
        <div></div>
        <div>{userDetails.batch}</div>
        <div></div>
        <div>
          {userDetails.joiningYear}-{userDetails.passingYear}
        </div>
        <button
          className="profile-page-edit-button"
          style={isYourProfile ? { display: "flex" } : { display: "none" }}
          onClick={() => {
            document
              .getElementById("ProfilePageEditProfile")
              .classList.toggle("hidden");
          }}
        >
          <img src={penIcon} alt="pen" />
          <p>Edit Profile</p>
        </button>
      </div>
      <div className="profile-page-description-container">
        {userDetails.description}
      </div>
      <div
        style={{
          background: "#FAFFF5",
          borderColor: "#5DAD0D",
          color: "#5DAD0D",
        }}
        className="profile-page-year-batch"
      >
        Alumni
      </div>
    </div>
  );
}

export default ProfilePageInformationContainer;
