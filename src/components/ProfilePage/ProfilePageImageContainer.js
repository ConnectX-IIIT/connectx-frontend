import React, { useEffect, useState } from "react";

import "../../styles/ProfilePage/ProfilePageImageContainer.css";
import photoIcon from "../../assets/profile_page/ic_camera.svg";
import photoIconWhite from "../../assets/profile_page/ic_camera_white.svg";
import { useStateValue } from "../../helper/state_provider";
import Cookies from "js-cookie";
import instance from "../../helper/axios";
import { handlePhoto } from "../Queries_Answer/QuestionSectionMainContainer";

function ProfilePageImageContainer() {

  const [{ userDetails }, dispatch] = useStateValue();
  const [updatedDetails, setUpdatedDetails] = useState({
    photoIndex: null,
    coverPhoto: "",
    profilePhoto: "",
  });

  const handleSubmit = async (index) => {

    const token = Cookies.get("token");

    if (!updatedDetails.profilePhoto && !updatedDetails.coverPhoto) {
      return;
    }

    const photoHeight = document.getElementsByClassName("profile-page-images")[index].naturalHeight;
    const photoWidth = document.getElementsByClassName("profile-page-images")[index].naturalWidth;
    let type;
    let photoURL;
    const formDataForProfile = new FormData();
    formDataForProfile.append("height", photoHeight);
    formDataForProfile.append("width", photoWidth);

    if (index) {
      formDataForProfile.append("photo", updatedDetails.profilePhoto);
      formDataForProfile.append("type", true);
      type = true;
      photoURL = userDetails.profilePicture;
    } else {
      formDataForProfile.append("photo", updatedDetails.coverPhoto);
      formDataForProfile.append("type", false);
      type = false;
      photoURL = userDetails.backgroundPicture;
    }

    try {
      if (photoURL) {
        await instance.post(
          `/user/removephoto`,
          {
            type,
            photoURL,
          },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
      }

      const uploadRes = await instance.post(`/user/upload`, formDataForProfile, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const pictureURL = await uploadRes.data.url;

      if (updatedDetails.photoIndex) {
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
        photoIndex: null
      });

    } catch (error) {
      if (error.response.status === 500) {
        return alert(`Server error occured!`);
      }
      if (error.response.status === 400) {
        return;
      }
      return alert(`Your session has expired, please login again!`);
    }
  };

  useEffect(() => {
    if ((updatedDetails.coverPhoto || updatedDetails.profilePhoto) && (updatedDetails.photoIndex === 0 || updatedDetails.photoIndex === 1)) {
      handleSubmit(updatedDetails.photoIndex);
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
