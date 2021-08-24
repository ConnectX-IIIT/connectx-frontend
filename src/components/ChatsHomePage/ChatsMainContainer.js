import React, { useEffect, useRef, useState } from "react";
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
import socketIo from "socket.io-client";

function MessageMainContainer(props) {
  const history = useHistory();
  const scrollRef = useRef();
  const socket = useRef();
  const [{ userDetails }, dispatch] = useStateValue();
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

  useEffect(() => {
    if (props.match.params.chatId) {
      const chatId = props.match.params.chatId;
      const conversation = conversations.find((conversation) => conversation._id === chatId);
      setCurrentChat(conversation);
    } else {
      setCurrentChat(null)
    }
  }, [props.match.params.chatId, []])

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserSearch({
      ...userSearch,
      [name]: value,
    });
  };

  useEffect(() => {
    socket.current = socketIo("https://immense-oasis-49966.herokuapp.com", { transports: ['websocket'] });

    socket.current.on("getMessage", data => {
      setArrivalRoom(data.room)
      setArrivalMessage({
        userId: data.message.senderId,
        message: data.message.text,
        userName: data.message.senderName,
        createdAt: Date.now()
      })
    })
  }, []);

  const handlePhoto = (photo) => {
    if (photo) {
      return photo
    }
    return UserProfile;
  }

  useEffect(() => {

    if (arrivalRoom && currentChat.isGroup && currentChat.name === arrivalRoom) {
      setMessages([...messages, arrivalMessage]);
    }

    if (arrivalRoom === "" && !currentChat.isGroup && currentChat.userIds.includes(arrivalMessage.userId)) {
      setMessages([...messages, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    socket.current.emit("addUser", userDetails._id, userDetails.name, userDetails.batch + "-" + userDetails.joiningYear);
    socket.current.on("getUsers", users => {
      // console.log(users);
    })
  }, [userDetails]);

  const fetchConversations = async (e) => {
    try {
      const token = Cookies.get("token");

      if (token) {
        const getConversationsRes = await instance.post(
          `/conversation/getconversations`,
          {
            conversationIds: userDetails.conversations,
            batch: userDetails.batch,
            joiningYear: userDetails.joiningYear
          },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        const conversationData = await getConversationsRes.data.conversations;
        const groupData = await getConversationsRes.data.group;
        await conversationData.push(groupData);

        for (let i = 0; i < conversationData.length; i = i + 1) {
          if (i === conversationData.length - 1) {
            conversationData[i]['isGroup'] = true;
          } else {
            conversationData[i]['isGroup'] = false;
          }
        }
        setConversations(conversationData);

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

  const fetchMessages = async (e) => {
    try {
      const token = Cookies.get("token");

      if (!currentChat) {
        return;
      }

      if (token) {
        const getMessagesRes = await instance.get(
          `/message/getmessages/${currentChat._id}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        const data = await getMessagesRes.data.messages;
        setMessages(data);

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
    if (userDetails.name) {
      fetchConversations();
    }
  }, [userDetails]);

  useEffect(() => {
    fetchMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newMessage || !currentChat || !newMessage.replace(/\s/g, '').length) {
      return;
    }

    let receiverId = "";
    if (!currentChat.isGroup) {
      receiverId = await currentChat.userIds.find((id) => id !== userDetails._id);
    }

    socket.current.emit("sendMessage", {
      senderId: userDetails._id,
      receiverId,
      senderName: userDetails.name,
      text: newMessage,
      isGroup: currentChat.isGroup
    })

    try {
      const token = Cookies.get("token");

      if (token) {
        const addMessagesRes = await instance.post(
          `/message/addmessage/${currentChat._id}`,
          {
            message: newMessage,
            name: userDetails.name,
            reference: ""
          },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        const msg = await addMessagesRes.data.message;
        setMessages([...messages, msg]);
        setNewMessage("");

      } else {
        history.replace("/signin");
      }
    } catch (error) {
      if (error.response.status === 500) {
        return alert(`Server error occured!`);
      }
      if (error.response.status === 400) {
        return alert(`You can't send empty message!`);
      }
      return alert(`Your session has expired, please login again!`);
    }
  };

  const ConversationsList = conversations.map((item, index) => {
    return <div onClick={() => history.push(`/home/message/${item._id}`)}>
      <ChatIndividual conversation={item} isGroup={item.isGroup} />
    </div>
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
        {
          currentChat ?
            <>
              <div
                className=" sticky top-0 flex items-center"
                style={{
                  backgroundColor: "#F5F5F5",
                  padding: "0.68vw 1vw",
                  height: "66.89px",
                }}
              >
                <img src={handlePhoto(currentChat.isGroup ? currentChat.profilePicture : currentChat.userProfiles.find((profile) => profile !== userDetails.profilePicture))} alt="profile" className="ImgChatSection" />
                <h2 className="font-manrope font-semibold text-xl">{currentChat.isGroup ? currentChat.name : currentChat.userNames.find((name) => name !== userDetails.name)}</h2>
              </div>
              <div className="w-full p-4">
                {messages.map((message) => (
                  <div ref={scrollRef}>
                    <ChatSingleTextComponent message={message} own={message.userId === userDetails._id} />
                  </div>
                ))}
              </div>
              <form action="" className="sticky bottom-0" onSubmit={handleSubmit}>
                <div className=" BottomChatSection">
                  <input
                    type="text"
                    name="chatMessage"
                    id="chatMessage"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    autoComplete="off"
                  />
                  <button type="submit">
                    <img className="submitButton" src={sendbutton} alt="submit" />
                  </button>
                </div>
              </form>
            </> :
            <span className="selectChat">Select a chat to start messaging</span>
        }
      </div>
    </div>
  );
}

export default MessageMainContainer;
