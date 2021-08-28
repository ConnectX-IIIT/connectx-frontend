import React, { useState } from "react";

import "../../styles/ProfilePage/ProfileEditPage.css";
import deleteIcon from "../../assets/create_post/ic_close.svg";
import CreatePostInput from "../CreatePost/CreatePostInput";

function ProfileEditPage() {
  const [postDetails, setPostDetails] = useState({
    name: "",
    mail: "",
    phoneNumber: "",
    about: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPostDetails({
      ...postDetails,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(postDetails);
  };

  return (
    <div className="PostMainContainer rounded-md">
      <div className="flex justify-between mb-4">
        <h2 className="font-manrope font-semibold text-xl">Create Post</h2>
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
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        method="post"
        className="flex flex-col"
      >
        <CreatePostInput
          inputType="text"
          inputName="name"
          inputValue={postDetails.name}
          onChangeFunction={handleInput}
          labelContent="Name"
          isInput={true}
        />
        <CreatePostInput
          inputType="mail"
          inputName="mail"
          inputValue={postDetails.mail}
          onChangeFunction={handleInput}
          labelContent="Mail"
          isInput={true}
        />
        <CreatePostInput
          inputType="number"
          inputName="phoneNumber"
          inputValue={postDetails.phoneNumber}
          onChangeFunction={handleInput}
          labelContent="Phone Number"
          isInput={true}
        />
        <CreatePostInput
          inputType="text"
          inputName="about"
          inputValue={postDetails.about}
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
