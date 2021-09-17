import Cookies from "js-cookie";
import instance from "../../../helper/axios";

export const fetchMessages = async (userDetails, history, currentChat, setMessages) => {

    const token = Cookies.get("token");

    if (!currentChat) {
        return;
    }

    if (!userDetails.isMailVerified) {
        return alert("Please verify your mail!");
    }

    if (!token) {
        history.replace("/signin");
    }

    try {
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

    } catch (error) {
        if (error.response.status === 500) {
            return alert(`Server error occured!`);
        }
        if (error.response.status === 408) {
            return alert(`Please verify your mail!`);
        }
        return alert(`Your session has expired, please login again!`);
    }
};