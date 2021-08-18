import React from "react";
import "../../styles/Chats/ChatSingleTextComponent.css";

function ReferenceMessage() {
  return (
    <div className="ReferenceMessageChatSection">
      <h2 className="font-semibold text-lg">Raj Noobda</h2>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
      tenetur, asperiores dolorem quisquam pariatur voluptatem officiis dolores
      atque natus ullam?
    </div>
  );
}

function ChatSingleTextComponent({ isRight, isReference = true }) {
  return (
    <div
      className="ChatSingleTextComponent"
      style={isRight ? { marginLeft: "auto" } : { marginRight: "auto" }}
    >
      <h2 className="font-semibold text-lg mb-2">Raj Noobda</h2>
      {isReference ? <ReferenceMessage /> : null}
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas libero
      voluptates error! Repudiandae, assumenda! Maiores praesentium dolores
      dolor hic doloremque debitis? Quod, corrupti sint reiciendis hic provident
      expedita vel earum beatae neque dicta officiis. Dicta, mollitia ratione
      numquam cupiditate excepturi id beatae, aut ad iusto porro minima dolore.
      Rerum, quam. lorem impdfsd fdsfjdsjkl
      <span className="TimeStampSingleChatComponent">15:34</span>
    </div>
  );
}

export default ChatSingleTextComponent;
