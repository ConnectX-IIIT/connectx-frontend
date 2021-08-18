import React, { useEffect, useState } from "react";
import "../../styles/Chats/ChatsMainContainer.css";
import CreatePostInput from "./../CreatePost/CreatePostInput";
import SearchIcon from "../../assets/home/top_navbar/ic_search_icon.svg";
import UserProfile from "../../assets/profile/user_profile_default_icon.svg";
import ChatIndividual from "./ChatIndividual";
import ChatSingleTextComponent from "./ChatSingleTextComponent";
import sendbutton from "../../assets/chats/send_btn.svg";
import Cookies from "js-cookie";
import instance from "../../helper/axios";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../helper/state_provider";

function MessageMainContainer() {
  const history = useHistory();
  const [{ userDetails }, dispatch] = useStateValue();
  const [conversations, setConversations] = useState([]);
  const [userSearch, setUserSearch] = useState({
    chatSearch: "",
    chatMessage: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserSearch({
      ...userSearch,
      [name]: value,
    });
  };

  const getConversations = async (e) => {
    try {
      const token = Cookies.get("token");

      if (token) {
        const getConversationsRes = await instance.post(
          `/conversation/getconversations`,

          {
            conversationIds: userDetails.conversations,
          },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        const data = await getConversationsRes.data.conversations;

        setConversations(data);
      } else {
        history.replace("/signin");
      }
    } catch (error) {
      if (error.response.status === 500) {
        return alert(`Server error occured!`);
      }
      return alert(`Your session has expired, please login again!`);
    }
  };

  useEffect(() => {
    getConversations();
  }, [userDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userSearch);
  };
  const ConversationsList = conversations.map((item, index) => {
    return <ChatIndividual conversation={item} />;
  });

  return (
    <div className="mx-auto font-manrope grid border MessageMainContainer">
      <div
        className="scrollbarHidden relative"
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
        {ConversationsList}
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
          <ChatSingleTextComponent />
          <ChatSingleTextComponent isRight />
          <ChatSingleTextComponent isRight />
          <ChatSingleTextComponent isRight />
        </div>
        <form action="" className="sticky bottom-0" onSubmit={handleSubmit}>
          <div className=" BottomChatSection">
            <input
              type="text"
              name="chatMessage"
              id="chatMessage"
              value={userSearch.chatMessage}
              onChange={handleInput}
              placeholder="Type a message..."
              autoComplete="off"
            />
            <button type="submit">
              <img src={sendbutton} alt="submit" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MessageMainContainer;
