import React, { useEffect, useState } from "react";
import userProfile from "../../assets/profile/user_profile_default_icon.svg";
import { useStateValue } from "../../helper/state_provider";
import "../../styles/Chats/ChatIndividual.css";

function ChatIndividual({ conversation, isGroup }) {
  const [{ userDetails }, dispatch] = useStateValue();
  const [friendName, setFriendName] = useState("");
  const [friendProfile, setFriendProfile] = useState("");

  const handlePhoto = (photo) => {
    if (photo) {
      return photo;
    }
    return userProfile;
  }

  useEffect(() => {
    const name = isGroup ? conversation.name : conversation.userNames.find((name) => name !== userDetails.name);
    const profile = isGroup ? conversation.profilePicture : conversation.userProfiles.find((profile) => profile !== userDetails.profilePicture);
    setFriendName(name);
    setFriendProfile(profile);
  }, []);

  return (<div className="forHover">
    <div className="ChatSectionIndividual">
      <img src={handlePhoto(friendProfile)} alt="Default" className="ImgChatSection" />
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
  </div>
  )
}

export default ChatIndividual;
