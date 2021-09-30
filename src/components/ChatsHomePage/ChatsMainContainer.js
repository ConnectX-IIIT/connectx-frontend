import React, { useEffect, useRef, useState } from "react";
import "../../styles/Chats/ChatsMainContainer.css";
import CreatePostInput from "./../CreatePost/CreatePostInput";
import SearchIcon from "../../assets/home/top_navbar/ic_search_icon.svg";
import ChatSingleTextComponent from "./ChatSingleTextComponent";
import ChatIndividual from "./ChatIndividual";
import sendbutton from "../../assets/chats/send_btn.svg";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../helper/state_provider";
import socketIo from "socket.io-client";
import ChatGroupInformation from "./ChatGroupInformation";
import { handlePhoto } from "../HomePageComponents/helper/handle_photo";
import { fetchConversations } from "./helper/fetch_conversations";
import { fetchMessages } from "./helper/fetch_messages";
import { addMessage } from "./helper/add_message";

function MessageMainContainer(props) {
  const history = useHistory();
  const scrollRef = useRef();
  const socket = useRef();
  /* eslint-disable no-unused-vars */
  const [{ userDetails }, dispatch] = useStateValue();
  /* eslint-enable no-unused-vars */
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalRoom, setArrivalRoom] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [userSearch, setUserSearch] = useState({
    chatSearch: "",
    chatMessage: "",
  });
  const [currentActiveStates, setCurrentActiveStates] = useState([]);
  const [isGroupsSectionOpen, setIsGroupsSectionOpen] = useState(false);

  useEffect(() => {
    if (props.match.params.chatId) {
      const chatId = props.match.params.chatId;
      const conversation = conversations.find(
        (conversation) => conversation._id === chatId
      );
      let i = conversations.findIndex(
        (conversation) => conversation._id === chatId
      );
      updateCurrentActiveChat(i);
      setCurrentChat(conversation);
    } else {
      setCurrentChat(null);
    }
  }, [props.match.params.chatId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserSearch({
      ...userSearch,
      [name]: value,
    });
  };

  useEffect(() => {
    socket.current = socketIo("https://immense-oasis-49966.herokuapp.com", {
      transports: ["websocket"],
    });

    socket.current.on("getMessage", (data) => {
      setArrivalRoom(data.room);
      setArrivalMessage({
        userId: data.message.senderId,
        message: data.message.text,
        userName: data.message.senderName,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    if (
      arrivalRoom &&
      currentChat &&
      currentChat.isGroup &&
      currentChat.name === arrivalRoom
    ) {
      setMessages([...messages, arrivalMessage]);
    }

    if (arrivalRoom) {
      let conversationList = conversations.slice();
      let index = conversationList.findIndex(
        (conversation) => conversation.isGroup === true
      );
      conversationList[index].lastMessage = arrivalMessage.message;
      conversationList[index].lastModified = arrivalMessage.createdAt;
      setConversations(conversationList);
    }

    if (arrivalRoom === "") {
      let conversationList = conversations.slice();
      let index = conversationList.findIndex((conversation) =>
        conversation.userIds.includes(arrivalMessage.userId)
      );
      conversationList[index].lastMessage = arrivalMessage.message;
      conversationList[index].lastModified = arrivalMessage.createdAt;
      setConversations(conversationList);
    }

    if (
      arrivalRoom === "" &&
      currentChat &&
      !currentChat.isGroup &&
      currentChat.userIds.includes(arrivalMessage.userId)
    ) {
      setMessages([...messages, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    socket.current.emit(
      "addUser",
      userDetails._id,
      userDetails.name,
      userDetails.batch + "-" + userDetails.joiningYear
    );
    socket.current.on("getUsers", (users) => {
      // console.log(users);
    });
  }, [userDetails]);

  useEffect(() => {
    if (userDetails.name) {
      fetchConversations(userDetails, history, setConversations);
    }
  }, [userDetails]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (conversations.length > 0) {
      let tempArr = currentActiveStates.slice();
      if (!tempArr.length > 0) {
        for (let index = 0; index < conversations.length; index++) {
          tempArr.push(false);
        }
      }
      setCurrentActiveStates(tempArr);
    }
  }, [conversations]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchMessages(userDetails, history, currentChat, setMessages);
  }, [currentChat]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function updateCurrentActiveChat(i) {
    let tempArr = [];
    for (let index = 0; index < conversations.length; index++) {
      if (i === index) {
        tempArr.push(true);
      } else {
        tempArr.push(false);
      }
    }
    setCurrentActiveStates(tempArr);
  }

  const ConversationsList = conversations.map((item, index) => {
    return (
      <div
        onClick={() => {
          updateCurrentActiveChat(index);
          history.push(`/home/message/${item._id}`);
        }}
      >
        <ChatIndividual
          isActive={currentActiveStates[index]}
          conversation={conversations[index]}
          isGroup={conversations[index].isGroup}
        />
      </div>
    );
  });

  return (
    <div
      className="mx-auto font-manrope grid border MessageMainContainer"
      style={
        currentChat?.isGroup && isGroupsSectionOpen
          ? { gridTemplateColumns: "30% 46% 24%" }
          : { gridTemplateColumns: "32.76% 67.24%" }
      }
    >
      <form
        action=""
        className="MessageMainContainerForm"
        onSubmit={addMessage(
          userDetails,
          history,
          newMessage,
          currentChat,
          socket,
          messages,
          conversations,
          setMessages,
          setNewMessage,
          setConversations
        )}
        style={
          currentChat?.isGroup && isGroupsSectionOpen
            ? { right: "3%", bottom: "0" }
            : { right: "0" }
        }
      >
        <div
          className=" BottomChatSection"
          style={
            currentChat?.isGroup && isGroupsSectionOpen
              ? { width: "68.5%" }
              : { width: "100%" }
          }
        >
          <input
            type="text"
            name="chatMessage"
            id="chatMessage"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
            autoComplete="off"
          />
          <button type="submit">
            <img className="submitButton" src={sendbutton} alt="submit" />
          </button>
        </div>
      </form>
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
        {currentChat ? (
          <>
            <div
              className=" sticky top-0 flex items-center cursor-pointer"
              onClick={() => {
                if (currentChat?.isGroup) {
                  setIsGroupsSectionOpen(!isGroupsSectionOpen);
                }
              }}
              style={{
                backgroundColor: "#F5F5F5",
                padding: "0.68vw 1vw",
                height: "66.89px",
              }}
            >
              <img
                src={handlePhoto(
                  currentChat.isGroup
                    ? currentChat.profilePicture
                    : currentChat.userProfiles.find(
                        (profile) => profile !== userDetails.profilePicture
                      ),
                  1
                )}
                alt="profile"
                className="ImgChatSection"
              />
              <h2 className="font-manrope font-semibold text-xl">
                {currentChat.isGroup
                  ? currentChat.name
                  : currentChat.userNames.find(
                      (name) => name !== userDetails.name
                    )}
              </h2>
            </div>

            <div className=" main-chat-wrapper">
              {messages.map((message) => (
                <div ref={scrollRef}>
                  <ChatSingleTextComponent
                    message={message}
                    own={message.userId === userDetails._id}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <span className="selectChat">Select a chat to start messaging</span>
        )}
      </div>
      <div
        style={
          currentChat?.isGroup && isGroupsSectionOpen
            ? { display: "block" }
            : { display: "none" }
        }
      >
        {currentChat?.isGroup && (
          <ChatGroupInformation
            closingFunction={setIsGroupsSectionOpen}
            closingState={isGroupsSectionOpen}
            groupDetails={currentChat}
          />
        )}
      </div>
    </div>
  );
}

export default MessageMainContainer;
