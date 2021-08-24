import React from "react";
import "../../styles/Chats/ChatSingleTextComponent.css";
import { format } from "timeago.js";

function ReferenceMessage() {
  return (
    <div className="ReferenceMessageChatSection">
      <h2 className="font-semibold text-lg">Raj Noobda</h2>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
      tenetur, asperiores dolorem quisquam pariatur voluptatem officiis dolores
      atque natus ullam?
    </div>
  )
}

function ChatSingleTextComponent({ message, own, isReference }) {
  return (
    <div
      className="ChatSingleTextComponent"
      style={own ? { marginLeft: "auto" } : { marginRight: "auto" }}
    >
      <h2 className="font-semibold text-lg mb-2">{message.userName}</h2>
      {isReference ? <ReferenceMessage /> : null}
      {message.message}
      <span className="TimeStampSingleChatComponent">{format(message.createdAt)}</span>
    </div>
  );
}

export default ChatSingleTextComponent;
