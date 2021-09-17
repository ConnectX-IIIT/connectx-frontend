import Cookies from "js-cookie";
import instance from "../../../helper/axios";

export const addMessage = (userDetails, history, newMessage, currentChat, socket, messages, conversations, setMessages, setNewMessage, setConversations) => async (e) => {
    e.preventDefault();

    const token = Cookies.get("token");

    if (!token) {
        history.replace("/signin");
    }

    if (!newMessage || !currentChat || !newMessage.replace(/\s/g, "").length) {
        return;
    }

    if (!userDetails.isMailVerified) {
        return alert("Please verify your mail!");
    }

    let receiverId = "";
    if (!currentChat.isGroup) {
        receiverId = await currentChat.userIds.find(
            (id) => id !== userDetails._id
        );
    }

    socket.current.emit("sendMessage", {
        senderId: userDetails._id,
        receiverId,
        senderName: userDetails.name,
        text: newMessage,
        isGroup: currentChat.isGroup,
    });

    try {
        const addMessagesRes = await instance.post(
            `/message/addmessage/${currentChat._id}`,
            {
                message: newMessage,
                name: userDetails.name,
                isGroup: currentChat.isGroup,
                reference: "",
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

        let conversationList = conversations.slice();
        let index = conversationList.indexOf(currentChat);
        conversationList[index].lastMessage = newMessage;
        conversationList[index].lastModified = Date.now();
        setConversations(conversationList);

    } catch (error) {
        console.log(error);
        if (error.response.status === 500) {
            return alert(`Server error occured!`);
        }
        if (error.response.status === 400) {
            return alert(`You can't send empty message!`);
        }
        if (error.response.status === 408) {
            return alert(`Please verify your mail!`);
        }
        return alert(`Your session has expired, please login again!`);
    }
};