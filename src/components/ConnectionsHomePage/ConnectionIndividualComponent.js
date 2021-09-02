import React from "react";
import "../../styles/Connection/ConnectionIndividualComponent.css";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../helper/state_provider";
import instance from "../../helper/axios";
import Cookies from "js-cookie";
import { handlePhoto } from "../HomePageComponents/HomeUserDetails";

export const handleMessage = (user, userDetails, dispatch, history) => async (e) => {

  e.preventDefault();
  const commanConversation = await user.conversations.filter(value => userDetails.conversations.includes(value));

  if (commanConversation.length) {
    history.push(`/home/message/${commanConversation[0]}`);
  } else {

    if (!userDetails.isVerified) {
      return alert("Your verification is under process!");
    }

    try {
      const token = Cookies.get("token");

      if (token) {
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

      } else {
        history.replace("/signin");
      }
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

function ConnectionIndividualComponent({ user }) {

  const history = useHistory();
  const [{ userDetails }, dispatch] = useStateValue();

  return (
    <div className="ConnectionIndividualComponent">
      <div>
        <img src={handlePhoto(user.backgroundPicture, 0)} alt="cover" />
        <img src={handlePhoto(user.profilePicture, 1)} alt="User" />
      </div>
      <div className="ConnectionIndividualComponentDetails">
        <div>{user.name}</div>
        <div>{user.batch}</div>
        <div>
          {user.description}
        </div>
      </div>
      <button className="ConnectionIndividualComponentButton" onClick={(e) => { handleMessage(user, userDetails, dispatch, history)(e) }}>Message</button>
    </div>
  );
}

export default ConnectionIndividualComponent;