import React, { useEffect, useState } from "react";
import "../../styles/ProfilePage/ProfileEditPage.css";
import deleteIcon from "../../assets/create_post/ic_close.svg";
import CreatePostInput from "../CreatePost/CreatePostInput";
import { useStateValue } from "../../helper/state_provider";
import { updateUserDetails } from "./helper/update_user_details";
import { useHistory } from "react-router-dom";

function ProfileEditPage() {
  const history = useHistory();
  const [{ userDetails }, dispatch] = useStateValue();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
    description: "",
  });

  useEffect(() => {
    if (userDetails.name) {
      setUserData({
        name: userDetails.name,
        email: userDetails.email,
        mobile: userDetails.mobile,
        description: userDetails.description,
      });
    }
  }, [userDetails]);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <div className="PostMainContainer rounded-md">
      <div className="flex justify-between mb-4">
        <h2 className="font-manrope font-semibold text-xl">Edit Profile</h2>
        <img
          src={deleteIcon}
          alt="delete"
          onClick={() => {
            document
              .getElementById("ProfilePageEditProfile")
              .classList.toggle("hidden");
          }}
          className="cursor-pointer"
        />
      </div>
      <form
        action=""
        onSubmit={(e) =>
          updateUserDetails(userDetails, history, userData, dispatch)(e)
        }
        encType="multipart/form-data"
        method="post"
        className="flex flex-col"
      >
        <CreatePostInput
          inputType="text"
          inputName="name"
          inputValue={userData.name}
          onChangeFunction={handleInput}
          labelContent="Name"
          isInput={true}
        />
        <CreatePostInput
          inputType="mail"
          inputName="email"
          inputValue={userData.email}
          onChangeFunction={handleInput}
          labelContent="Mail"
          isInput={true}
        />
        <CreatePostInput
          inputType="number"
          inputName="mobile"
          inputValue={userData.mobile}
          onChangeFunction={handleInput}
          labelContent="Phone Number"
          isInput={true}
        />
        <CreatePostInput
          inputType="text"
          inputName="description"
          inputValue={userData.description}
          onChangeFunction={handleInput}
          labelContent="Post Description"
        />

        <button
          className="w-28 rounded h-9 font-manrope font-semibold text-white transition-colors duration-200 hover:bg-blue-500 my-8 m-auto"
          style={{ backgroundColor: "#C4C4C4" }}
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default ProfileEditPage;
