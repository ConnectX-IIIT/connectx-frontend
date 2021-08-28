import React, { useEffect, useState } from "react";

import "../../styles/ProfilePage/ProfilePageImageContainer.css";
import photoIcon from "../../assets/profile_page/ic_camera.svg";
import DefaultCoverPhoto from "../../assets/profile/user_profile_default_cover.svg";
import DefaultProfilePhoto from "../../assets/profile/user_profile_default_icon.svg";
import photoIconWhite from "../../assets/profile_page/ic_camera_white.svg";
import { useStateValue } from "../../helper/state_provider";
import Cookies from "js-cookie";
import instance from "../../helper/axios";

function ProfilePageImageContainer() {

  const [{ userDetails }, dispatch] = useStateValue();
  const [photoIndex, setPhotoIndex] = useState(2);
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
    console.log(photoHeight);
    console.log(photoWidth);
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

    setUpdatedDetails({
      coverPhoto: "",
      profilePhoto: "",
    });

    // try {
    //   if (photoURL) {
    //     await instance.post(
    //       `/user/remove`,
    //       {
    //         type,
    //         photoURL,
    //       },
    //       {
    //         headers: {
    //           Authorization: `${token}`,
    //         },
    //       }
    //     );
    //   }

    //   await instance.post(`/user/upload`, formDataForProfile, {
    //     headers: {
    //       Authorization: `${token}`,
    //     },
    //   });
    // } catch (error) {
    //   if (error.response.status === 500) {
    //     return alert(`Server error occured!`);
    //   }
    //   if (error.response.status === 400) {
    //     return;
    //   }
    //   return alert(`Your session has expired, please login again!`);
    // }
  };

  useEffect(() => {
    if ((updatedDetails.coverPhoto || updatedDetails.profilePhoto) && (photoIndex === 0 || photoIndex === 1)) {
      handleSubmit(photoIndex);
    }
  }, [updatedDetails, photoIndex])

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
    setPhotoIndex(index);
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
