import React, { useState } from "react";

import "../../styles/ProfilePage/ProfilePageImageContainer.css";

import photoIcon from "../../assets/profile_page/ic_camera.svg";
import DefaultCoverPhoto from "../../assets/profile/user_profile_default_cover.svg";
import DefaultProfilePhoto from "../../assets/profile/user_profile_default_icon.svg";
import photoIconWhite from "../../assets/profile_page/ic_camera_white.svg";
import { useStateValue } from "../../helper/state_provider";

function ProfilePageImageContainer() {

  const [{ userDetails }, dispatch] = useStateValue();
  const [updatedDetails, setUpdatedDetails] = useState({
    coverPhoto: "",
    profilePhoto: "",
  });

  const handlePhoto = (photo, index) => {
    if (photo) {
      return photo;
    }
    if (index) {
      return DefaultProfilePhoto;
    } else {
      return DefaultCoverPhoto;
    }
  }

  const previewFile = (index) => (e) => {
    let preview = document.getElementsByClassName("profile-page-images")[index];

    let file = document.getElementsByClassName("profile-page-photo-input")[
      index
    ].files[0];
    let reader = new FileReader();

    reader.onloadend = function () {
      preview.src = reader.result;
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.files[0],
    });
  };
  console.log(updatedDetails);

  return (
    <div className="profile-page-image-container">
      <input
        type="file"
        name={"coverPhoto"}
        onChange={previewFile(0)}
        className="profile-page-photo-input"
        accept=".png , .jpg , .jpeg "
      />
      <img
        src={handlePhoto(userDetails.backgroundPicture, 0)}
        alt="cover"
        className="profile-page-cover-photo profile-page-images"
      />
      <div
        className="profile-page-upload-photo"
        onClick={() => {
          document
            .getElementsByClassName("profile-page-photo-input")[0]
            .click();
        }}
      >
        <img src={photoIcon} alt="photo" />
        <div>Update cover photo</div>
      </div>
      <div
        className="profile-page-profile-photo-wrapper"
        onClick={() => {
          document
            .getElementsByClassName("profile-page-photo-input")[1]
            .click();
        }}
      >
        <img
          src={handlePhoto(userDetails.profilePicture, 1)}
          alt="cover"
          className="profile-page-profile-photo profile-page-images"
        />
        <input
          type="file"
          name="profilePhoto"
          onChange={previewFile(1)}
          className="profile-page-photo-input"
          accept=".png , .jpg , .jpeg "
        />
        <div className="profile-page-profile-photo-edit">
          <img src={photoIconWhite} alt="photo" />
        </div>
      </div>
    </div>
  );
}

export default ProfilePageImageContainer;
