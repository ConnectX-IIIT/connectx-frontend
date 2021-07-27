import React, { useState } from "react";
import Button from "./signUpCompontents/Button";
import DefaultUserProfile from "../assets/profile/user_profile_default_icon.svg";
import DefaultUserCover from "../assets/profile/user_profile_default_cover.svg";
import ChangePhotoIcon from "../assets/profile/change_photo_icon.svg";
import "../styles/ExtraDetailsPage/PhotoUpload.css";
import axios from "axios";
import { useStateValue } from "../helper/state_provider";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

function PhotoUpload() {
  const history = useHistory();
  const [{ userDetails }, dispatch] = useStateValue();
  const [userRegistration, setUserRegistration] = useState({
    photo: "",
    coverPhoto: "",
  });

  // const handleInput = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   setUserRegistration({ ...userRegistration, [name]: value });
  // };
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
    console.log(userRegistration);

    let userId = userDetails._id;
    let photo = userRegistration.photo;

    const token = Cookies.get("token");

    if (!photo) {
      return alert("Please fill all details properly!");
    }

    try {
      const res = await axios.post(`http://localhost:5000/user/uploadprofile`, {
        headers: {
          Authorization: `${token}`,
        },
        body: {
          photo,
          userId,
        },
      });

      console.log(res);
    } catch (error) {
      return alert(`${error.response.data.error}`);
    }
  };

  // const TriggerUpload = (index) => {
  //   if (index === 0)
  //     document.getElementsByClassName("PhotoUploadInput")[0].click();
  //   else document.getElementsByClassName("PhotoUploadInput")[1].click();
  // };

  return (
    <div className="PhotoUpload">
      <form
        action=""
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
            name="photo"
            onChange={previewFile(0)}
            className="PhotoUploadInput"
            style={{ display: "none" }}
            accept=".png , .jpg , .jpeg "
          />
          <img
            src={DefaultUserCover}
            alt="Image preview"
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
            alt="Image preview"
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
            Akash Gupta
          </p>
          <p
            style={{
              fontWeight: "500",
              fontSize: "15px",
              color: "#BDBFC4",
            }}
          >
            abcdefgh@xyz.com
          </p>
        </div>
        <Button />
      </form>
    </div>
  );
}

export default PhotoUpload;
