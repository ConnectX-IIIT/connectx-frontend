import React from "react";

import "../../styles/Chats/ChatGroupMember.css";
import DefaultPhoto from "../.././assets/_rough/achi photo part 3.jpg";

function ChatGroupMember() {
  return (
    <div className="chat-group-member">
      <img src={DefaultPhoto} alt="default" />
      <div>Cassita Baby</div>
    </div>
  );
}

export default ChatGroupMember;
