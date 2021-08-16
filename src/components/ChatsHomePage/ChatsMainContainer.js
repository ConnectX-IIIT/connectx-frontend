import React, { useState } from "react";
import "../../styles/Chats/ChatsMainContainer.css";
import CreatePostInput from "./../CreatePost/CreatePostInput";
import SearchIcon from "../../assets/home/top_navbar/ic_search_icon.svg";
import ChatIndividual from "./ChatIndividual";

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
        className="MessageLeftContainer"
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
        <ChatIndividual />
        <ChatIndividual />
        <ChatIndividual />
        <ChatIndividual />
        <ChatIndividual />
        <ChatIndividual />
        <ChatIndividual />
        <ChatIndividual />
        <ChatIndividual />
        <ChatIndividual />
        <ChatIndividual />
        <ChatIndividual />
        <ChatIndividual />
        <ChatIndividual />
        <ChatIndividual />
        <ChatIndividual />
        <ChatIndividual />

        <ChatIndividual />
      </div>
      <div>b</div>
    </div>
  );
}

export default MessageMainContainer;
