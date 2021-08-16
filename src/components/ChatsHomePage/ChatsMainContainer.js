import React, { useState } from "react";
import "../../styles/Chats/ChatsMainContainer.css";
import CreatePostInput from "./../CreatePost/CreatePostInput";
import SearchIcon from "../../assets/home/top_navbar/ic_search_icon.svg";
import UserProfile from "../../assets/profile/user_profile_default_icon.svg";
import ChatIndividual from "./ChatIndividual";
import ChatSingleTextComponent from "./ChatSingleTextComponent";

function MessageMainContainer() {
  const [userSearch, setUserSearch] = useState({
    chatSearch: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserSearch({
      ...userSearch,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userSearch);
  };
  return (
    <div className="mx-auto font-manrope grid border MessageMainContainer">
      <div
        className="scrollbarHidden"
        style={{
          borderRight: "1px solid #555555",
        }}
      >
        <div
          className=" sticky rounded-l-md top-0"
          style={{ backgroundColor: "#F5F5F5", padding: "0.68vw 0" }}
        >
          <CreatePostInput
            inputType="text"
            inputName="chatSearch"
            inputValue={userSearch.chatSearch}
            onChangeFunction={handleInput}
            labelContent="Search People"
            isInput
            style={{
              width: "calc(100% - 1vw)",
              margin: "0 auto",
            }}
          />
          <img
            src={SearchIcon}
            alt="search"
            className="absolute w-4 object-contain"
            style={{
              top: "40%",
              right: "5%",
            }}
          />
        </div>
        <ChatIndividual />
      </div>
      <div className="overflow-auto scrollbarHidden">
        <div
          className=" sticky top-0 flex items-center"
          style={{
            backgroundColor: "#F5F5F5",
            padding: "0.68vw 1vw",
            height: "66.89px",
          }}
        >
          <img src={UserProfile} alt="profile" className="ImgChatSection" />
          <h2 className="font-manrope font-semibold text-xl">2020-IMT</h2>
        </div>
        <div className="w-full p-4">
          <ChatSingleTextComponent />
        </div>
      </div>
    </div>
  );
}

export default MessageMainContainer;
