import React from "react";
import "../../styles/Chats/ChatSingleTextComponent.css";

function ChatSingleTextComponent({ isRight }) {
  return (
    <div
      className="ChatSingleTextComponent"
      style={isRight ? { marginLeft: "auto" } : { marginRight: "auto" }}
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas libero
      voluptates error! Repudiandae, assumenda! Maiores praesentium dolores
      dolor hic doloremque debitis? Quod, corrupti sint reiciendis hic provident
      expedita vel earum beatae neque dicta officiis. Dicta, mollitia ratione
      numquam cupiditate excepturi id beatae, aut ad iusto porro minima dolore.
      Rerum, quam.
    </div>
  );
}

export default ChatSingleTextComponent;
