import React, { useEffect, useState } from "react";
import userProfile from "../../assets/profile/user_profile_default_icon.svg";
import { useStateValue } from "../../helper/state_provider";
import "../../styles/Chats/ChatIndividual.css";

function ChatIndividual({ conversation }) {

  const [{ userDetails }, dispatch] = useStateValue();
  const [friendName, setFriendName] = useState("");
  const [friendProfile, setFriendProfile] = useState("");
  console.log("hello");

  useEffect(() => {
    setFriendName(conversation.userNames.find((name) => name !== userDetails.name));
    setFriendProfile(conversation.userProfiles.find((profile) => profile !== userDetails.profilePicture));
  }, []);

  return (
    <div className="ChatSectionIndividual">
      <img src={userProfile} alt="Default" className="ImgChatSection" />
      <div className="ChatInformationContainer">
        <div>
          <h2>{friendName}</h2>
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
