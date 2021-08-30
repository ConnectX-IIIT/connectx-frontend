import React from "react";

import "../../styles/Chats/ChatGroupMember.css";
import DefaultPhoto from "../../assets/profile/user_profile_default_icon.svg";

function ChatGroupMember({ memberDetails }) {

  const handlePhoto = (photo) => {
    if (photo) {
      return photo;
    }
    return DefaultPhoto;
  };

  return (
    <div className="chat-group-member">
      <img src={handlePhoto(memberDetails.userProfile)} alt="default" />
      <div>{memberDetails.userName}</div>
    </div>
  );
}

export default ChatGroupMember;
