import React from "react";

import "../../styles/Chats/ChatGroupMember.css";
import { handlePhoto } from "../Queries_Answer/QuestionSectionMainContainer";

function ChatGroupMember({ memberDetails }) {

  return (
    <div className="chat-group-member">
      <img src={handlePhoto(memberDetails.userProfile)} alt="default" />
      <div>{memberDetails.userName}</div>
    </div>
  );
}

export default ChatGroupMember;
