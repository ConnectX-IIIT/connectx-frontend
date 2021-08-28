import React, { useEffect, useState } from "react";
import emailValidator from "email-validator";
import "../../styles/ProfilePage/ProfileEditPage.css";
import deleteIcon from "../../assets/create_post/ic_close.svg";
import CreatePostInput from "../CreatePost/CreatePostInput";
import { useStateValue } from "../../helper/state_provider";
import Cookies from "js-cookie";
import instance from "../../helper/axios";

function ProfileEditPage() {

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
  }, [userDetails])

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let name = userData.name;
    let email = userData.email;
    let mobile = userData.mobile;
    let description = userData.description;

    if (!name || !email || !mobile || !description) {
      return alert("Please fill all the details!");
    }

    if (name === userDetails.name && email === userDetails.email && mobile === userDetails.mobile && description === userDetails.description) {
      document.getElementById("ProfilePageEditProfile").classList.toggle("hidden");
      return;
    }

    let emailValidation = emailValidator.validate(email);

    if (!emailValidation) {
      return alert("Enter a valid email");
    }

    const token = Cookies.get("token");

    try {
      const updateDetailsRes = await instance.post(`/user/updatedetails`,
        { userName: name, userEmail: email, mobile, description },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )

      if (updateDetailsRes.status === 201) {
        Cookies.set("token", updateDetailsRes.data.token, { expires: 30, secure: true });
      }

      dispatch({
        type: 'UPDATE_USER_DETAILS',
        name,
        email,
        mobile,
        description
      });

      document.getElementById("ProfilePageEditProfile").classList.toggle("hidden");

    } catch (error) {
      if (error.response.status === 500) {
        return alert(`Server error occured!`);
      }
      if (error.response.status === 400) {
        return alert(`User already exists with updated email!`);
      }
      if (error.response.status === 401) {
        return alert(`Enter a valid email!`);
      }
      return alert(`Your session has expired, please login again!`);
    }

    console.log(userData);
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
