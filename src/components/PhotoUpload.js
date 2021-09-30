import React, { useState } from "react";
import Button from "./signUpCompontents/Button";
import DefaultUserProfile from "../assets/profile/user_profile_default_icon.svg";
import DefaultUserCover from "../assets/profile/user_profile_default_cover.svg";
import ChangePhotoIcon from "../assets/profile/change_photo_icon.svg";
import "../styles/ExtraDetailsPage/PhotoUpload.css";
import { useStateValue } from "../helper/state_provider";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { uploadProfilePic } from "./general_helper/photo_upload/upload_profile_picture";
import { uploadBackgroundPic } from "./general_helper/photo_upload/upload_background_picture";

function PhotoUpload() {
  const history = useHistory();
  const [{ userDetails }] = useStateValue();

  const [userRegistration, setUserRegistration] = useState({
    photo: "",
    coverPhoto: "",
  });

  const previewFile = (index) => (e) => {
    let preview = document.getElementsByClassName("UserProfileImage")[index];

    let file =
      document.getElementsByClassName("PhotoUploadInput")[index].files[0];
    let reader = new FileReader();

    reader.onloadend = function () {
      preview.src = reader.result;
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }
    setUserRegistration({
      ...userRegistration,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userRegistration.photo && !userRegistration.coverPhoto) {
      return;
    }

    const token = Cookies.get("token");

    if (!token) {
      history.replace("/signin");
    }

    if (userRegistration.photo) {
      const photoHeight =
        document.getElementsByClassName("UserProfileImage")[1].naturalHeight;
      const photoWidth =
        document.getElementsByClassName("UserProfileImage")[1].naturalWidth;
      const formDataForProfile = new FormData();
      formDataForProfile.append("photo", userRegistration.photo);
      formDataForProfile.append("height", photoHeight);
      formDataForProfile.append("width", photoWidth);
      formDataForProfile.append("type", true);

      await uploadProfilePic(userDetails, token, formDataForProfile);
    }

    if (userRegistration.coverPhoto) {
      const coverPhotoHeight =
        document.getElementsByClassName("UserProfileImage")[0].naturalHeight;
      const coverPhotoWidth =
        document.getElementsByClassName("UserProfileImage")[0].naturalWidth;
      const formDataForCover = new FormData();
      formDataForCover.append("photo", userRegistration.coverPhoto);
      formDataForCover.append("height", coverPhotoHeight);
      formDataForCover.append("width", coverPhotoWidth);
      formDataForCover.append("type", false);

      await uploadBackgroundPic(userDetails, token, formDataForCover);
    }

    history.replace("/home");
  };

  return (
    <div className="PhotoUpload">
      <form
        action=""
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="PhotoUplaodForm"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <img
            src={ChangePhotoIcon}
            alt="change_profile"
            style={{
              position: "absolute",
              bottom: "-15%",
              right: "8%",
              cursor: "pointer",
            }}
            onClick={() => {
              document.getElementsByClassName("PhotoUploadInput")[0].click();
            }}
          />
          <input
            type="file"
            name="coverPhoto"
            onChange={previewFile(0)}
            className="PhotoUploadInput"
            style={{ display: "none" }}
            accept=".png , .jpg , .jpeg "
          />
          <img
            src={DefaultUserCover}
            alt="User Profile"
            className="UserProfileImage"
            id="UserProfileCover"
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <img
            src={ChangePhotoIcon}
            alt="change_profile"
            style={{
              position: "absolute",
              bottom: "54%",
              right: "34%",
              cursor: "pointer",
              width: "33px",
              zIndex: "1",
            }}
            onClick={() => {
              document.getElementsByClassName("PhotoUploadInput")[1].click();
            }}
          />
          <input
            type="file"
            name="photo"
            onChange={previewFile(1)}
            className="PhotoUploadInput"
            style={{ display: "none" }}
            accept=".png , .jpg , .jpeg "
          />
          <img
            src={DefaultUserProfile}
            alt="User Profile"
            className="UserProfileImage"
            id="UserProfilePhoto"
          />
        </div>
        <div id="photoUploadContent">
          <p
            style={{
              fontWeight: "600",
              fontSize: "20px",
              color: "#383838",
            }}
          >
            {userDetails.name}
          </p>
          <p
            style={{
              fontWeight: "500",
              fontSize: "15px",
              color: "#BDBFC4",
            }}
          >
            {userDetails.email}
          </p>
        </div>
        <Button />
      </form>
    </div>
  );
}

export default PhotoUpload;
