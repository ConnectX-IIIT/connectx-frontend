import React from "react";

import "../../styles/Chats/ChatGroupMember.css";
import { handlePhoto } from "../HomePageComponents/helper/handle_photo";

function ChatGroupMember({ memberDetails }) {

  return (
    <div className="chat-group-member">
      <img src={handlePhoto(memberDetails.userProfile, 1)} alt="default" />
      <div>{memberDetails.userName}</div>
    </div>
  );
}

export default ChatGroupMember;
