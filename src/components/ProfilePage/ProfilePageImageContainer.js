import React, { useEffect, useState } from "react";

import "../../styles/ProfilePage/ProfilePageImageContainer.css";
import photoIcon from "../../assets/profile_page/ic_camera.svg";
import photoIconWhite from "../../assets/profile_page/ic_camera_white.svg";
import { handlePhoto } from "../HomePageComponents/helper/handle_photo";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { uploadProfilePic } from "../general_helper/photo_upload/upload_profile_picture";
import { uploadBackgroundPic } from "../general_helper/photo_upload/upload_background_picture";
import { useStateValue } from "../../helper/state_provider";

function ProfilePageImageContainer({ isYourProfile, userDetails }) {
  const history = useHistory();
  const [, dispatch] = useStateValue();
  const [updatedDetails, setUpdatedDetails] = useState({
    photoIndex: null,
    coverPhoto: "",
    profilePhoto: "",
  });

  useEffect(() => {
    if (
      (updatedDetails.coverPhoto || updatedDetails.profilePhoto) &&
      (updatedDetails.photoIndex === 0 || updatedDetails.photoIndex === 1)
    ) {
      uploadPhoto(updatedDetails.photoIndex);
    }
  }, [updatedDetails]); // eslint-disable-line react-hooks/exhaustive-deps

  const uploadPhoto = async (index) => {
    const token = Cookies.get("token");

    if (!token) {
      history.push("/signin");
    }

    if (!updatedDetails.profilePhoto && !updatedDetails.coverPhoto) {
      return;
    }

    let pictureURL;
    const photoHeight = document.getElementsByClassName("profile-page-images")[
      index
    ].naturalHeight;
    const photoWidth = document.getElementsByClassName("profile-page-images")[
      index
    ].naturalWidth;
    const formData = new FormData();
    formData.append("height", photoHeight);
    formData.append("width", photoWidth);

    if (index) {
      formData.append("photo", updatedDetails.profilePhoto);
      formData.append("type", true);

      pictureURL = await uploadProfilePic(userDetails, token, formData);
    } else {
      formData.append("photo", updatedDetails.coverPhoto);
      formData.append("type", false);

      pictureURL = await uploadBackgroundPic(userDetails, token, formData);
    }

    if (index) {
      await dispatch({
        type: "UPDATE_PROFILE",
        url: pictureURL,
      });
    } else {
      await dispatch({
        type: "UPDATE_BACKGROUND",
        url: pictureURL,
      });
    }

    setUpdatedDetails({
      coverPhoto: "",
      profilePhoto: "",
      photoIndex: null,
    });
  };

  const previewFile = (index) => (e) => {
    let preview = document.getElementsByClassName("profile-page-images")[index];

    let file = document.getElementsByClassName("profile-page-photo-input")[
      index
    ].files[0];
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
        style={isYourProfile ? { display: "flex" } : { display: "none" }}
        onClick={() => {
          document
            .getElementsByClassName("profile-page-photo-input")[0]
            .click();
        }}
      >
        <img src={photoIcon} alt="edit profile" />
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
        <div
          className="profile-page-profile-photo-edit"
          style={isYourProfile ? { display: "flex" } : { display: "none" }}
        >
          <img src={photoIconWhite} alt="edit profile" />
        </div>
      </div>
      <div style={!isYourProfile ? { display: "block" } : { display: "none" }}>
        <button
          className="logOutBttn"
          style={{
            color: "#C9031B",
            borderColor: "#C9031B",
            marginLeft: "auto",
            display: "block",
            marginTop: "1vw",
          }}
        >
          <div
            className="logOut"
            style={{
              color: "#C9031B",
            }}
            onClick={() => {
              document
                .getElementsByClassName("home-main-report-wrapper")[0]
                .classList.toggle("hidden");
            }}
          >
            Report User
          </div>
        </button>
      </div>
    </div>
  );
}

export default ProfilePageImageContainer;
