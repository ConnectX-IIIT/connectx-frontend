import React from "react";
import DefaultUserPhoto from "../../assets/profile/user_profile_default_icon.svg";
import DefaultCoverPhoto from "../../assets/profile/user_profile_default_cover.svg";
import "../../styles/Connection/ConnectionIndividualComponent.css";

function ConnectionIndividualComponent({ user }) {

  const handlePhoto = (photo, index) => {

    if (photo) {
      return photo
    }
    if (index) {
      return DefaultUserPhoto;
    } else {
      return DefaultCoverPhoto;
    }

  }

  return (
    <div className="ConnectionIndividualComponent">
      <div>
        <img src={handlePhoto(user.backgroundPicture, 0)} alt="cover" />
        <img src={handlePhoto(user.profilePicture, 1)} alt="User" />
      </div>
      <div className="ConnectionIndividualComponentDetails">
        <div>{user.name}</div>
        <div>{user.batch}</div>
        <div>
          {user.description}
        </div>
      </div>
      <button className="ConnectionIndividualComponentButton">Message</button>
    </div>
  );
}

export default ConnectionIndividualComponent;
