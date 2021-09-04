import Cookies from "js-cookie";
import instance from "../../../helper/axios";

export const handleMessage = (user, userDetails, dispatch, history) => async (e) => {

    e.preventDefault();

    const token = Cookies.get("token");

    if (!token) {
        history.replace("/signin");
    }

    const commanConversation = await user.conversations.filter(value => userDetails.conversations.includes(value));

    if (commanConversation.length) {
        history.push(`/home/message/${commanConversation[0]}`);
    } else {

        if (!userDetails.isVerified) {
            return alert("Your verification is under process!");
        }

        try {
            const addConversationRes = await instance.post(
                `/conversation/addconversation`,
                {
                    userNames: [userDetails.name, user.name],
                    userProfiles: [userDetails.profilePicture, user.profilePicture],
                    userIds: [userDetails._id, user._id]
                },
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );

            const conversationId = await addConversationRes.data.id;

            await dispatch({
                type: "UPDATE_CONVERSATIONS",
                id: conversationId,
            });

            history.push(`/home/message/${conversationId}`);

        } catch (error) {
            if (error.response.status === 500) {
                return alert(`Server error occured!`);
            }
            if (error.response.status === 408) {
                return alert(`Your verification is under process!`);
            }
            return alert(`Your session has expired, please login again!`);
        }
    }
}