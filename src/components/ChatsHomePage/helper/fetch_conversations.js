import Cookies from "js-cookie";
import instance from "../../../helper/axios";

export const fetchConversations = async (userDetails, history, setConversations) => {
    try {
        const token = Cookies.get("token");

        if (!token) {
            history.push('/signin');
        }

        const getConversationsRes = await instance.post(
            `/conversation/getconversations`,
            {
                conversationIds: userDetails.conversations,
                batch: userDetails.batch,
                joiningYear: userDetails.joiningYear,
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
                conversationData[i]["isGroup"] = true;
            } else {
                conversationData[i]["isGroup"] = false;
            }
        }
        setConversations(conversationData);

    } catch (error) {
        if (error.response.status === 500) {
            return alert(`Server error occured!`);
        }
        return alert(`Your session has expired, please login again!`);
    }
};