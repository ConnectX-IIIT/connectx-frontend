import React from "react";
import userProfile from "../../assets/profile/user_profile_default_icon.svg";
import "../../styles/Chats/ChatIndividual.css";

function ChatIndividual() {
  return (
    <div className="ChatSectionIndividual">
      <img src={userProfile} alt="Default" className="ImgChatSection" />
      <div className="ChatInformationContainer">
        <div>
          <h2>2020-IMT</h2>
          <span>15.34</span>
        </div>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit,
          expedita.
        </div>
      </div>
    </div>
  );
}

export default ChatIndividual;
