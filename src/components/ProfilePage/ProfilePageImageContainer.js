import React, { useEffect, useState } from "react";

import "../../styles/ProfilePage/ProfilePageImageContainer.css";
import photoIcon from "../../assets/profile_page/ic_camera.svg";
import photoIconWhite from "../../assets/profile_page/ic_camera_white.svg";
import { useStateValue } from "../../helper/state_provider";
import { handlePhoto } from "../HomePageComponents/helper/handle_photo";
import { useHistory } from "react-router-dom";
import { uploadPhoto } from "./helper/upload_photo";

function ProfilePageImageContainer() {

  const history = useHistory();
  const [{ userDetails }, dispatch] = useStateValue();
  const [updatedDetails, setUpdatedDetails] = useState({
    photoIndex: null,
    coverPhoto: "",
    profilePhoto: "",
  });

  useEffect(() => {
    if ((updatedDetails.coverPhoto || updatedDetails.profilePhoto) && (updatedDetails.photoIndex === 0 || updatedDetails.photoIndex === 1)) {
      uploadPhoto(userDetails, history, dispatch, updatedDetails, setUpdatedDetails, updatedDetails.photoIndex);
    }
  }, [updatedDetails])

  const previewFile = (index) => (e) => {
    let preview = document.getElementsByClassName("profile-page-images")[index];

    let file = document.getElementsByClassName("profile-page-photo-input")[index].files[0];
    let reader = new FileReader();

    reader.onloadend = function () {
      preview.src = reader.result;
      setUpdatedDetails({
        ...updatedDetails,
        [e.target.name]: e.target.files[0],
        photoIndex: index,
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }

  };

  return (
    <div className="profile-page-image-container">
      <input
        type="file"
        name="coverPhoto"
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
