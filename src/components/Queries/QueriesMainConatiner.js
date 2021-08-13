import React, { useState } from "react";
import CreatePostInput from "./../CreatePost/CreatePostInput";
import ProfilePhoto from "../../assets/profile/user_profile_default_icon.svg";

function QueriesMainConatiner() {
  const [UserQueries, setUserQueries] = useState({
    askedQuestion: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserQueries({ ...UserQueries, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(UserQueries);
  };

  return (
    <div
      className="flex flex-col max-w-screen-lg font-manrope mx-auto"
      style={{ marginTop: "calc(81px + 1.2vw)", width: "50vw" }}
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: "7% 93%",
        }}
      >
        <img
          src={ProfilePhoto}
          alt="profile"
          className="object-cover w-11 h-11"
        />
        <CreatePostInput
          inputType="text"
          inputName="askedQuestion"
          inputValue={UserQueries.askedQuestion}
          onChangeFunction={handleInput}
          labelContent="Ask Something"
          isInput
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
}

export default QueriesMainConatiner;
