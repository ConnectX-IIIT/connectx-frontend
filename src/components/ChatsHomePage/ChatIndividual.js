import React, { useEffect, useState, useRef } from "react";
import userProfile from "../../assets/profile/user_profile_default_icon.svg";
import { useStateValue } from "../../helper/state_provider";
import "../../styles/Chats/ChatIndividual.css";
import { format } from "timeago.js";

function ChatIndividual({ conversation, isGroup, isActive = false }) {
  const wrapper = useRef(null);
  const [{ userDetails }, dispatch] = useStateValue();
  const [friendName, setFriendName] = useState("");
  const [friendProfile, setFriendProfile] = useState("");
  const [isBeingHovered, setIsBeingHovered] = useState("");

  const handlePhoto = (photo) => {
    if (photo) {
      return photo;
    }
    return userProfile;
  };

  useEffect(() => {
    if (wrapper.current) {
      if (isActive) {
        wrapper.current.style.backgroundColor = "rgb(220, 220, 220)";
      } else if (isBeingHovered) {
        wrapper.current.style.backgroundColor = "rgb(240, 240, 240)";

      } else {
        wrapper.current.style.backgroundColor = "rgb(255, 255, 255)";

      }
    }
  }, [isBeingHovered,isActive]);

  useEffect(() => {
    const name = isGroup
      ? conversation.name
      : conversation.userNames.find((name) => name !== userDetails.name);
    const profile = isGroup
      ? conversation.profilePicture
      : conversation.userProfiles.find(
        (profile) => profile !== userDetails.profilePicture
      );
    setFriendName(name);
    setFriendProfile(profile);
  }, []);

  function setHovering(e) {
    setIsBeingHovered(true);
    wrapper.current = e.target;
  }

  function removeHovering(e) {
    setIsBeingHovered(false);
  }

  return (
    <div
      className="forHover"
      onMouseEnter={(e) => setHovering(e)}
      onMouseLeave={(e) => removeHovering(e)}
    // style={
    //   isActive
    //     ? {
    //         backgroundColor: "rgb(220, 220, 220)",
    //       }
    //     : {}
    // }
    >
      <div className="ChatSectionIndividual">
        <img
          src={handlePhoto(friendProfile)}
          alt="Default"
          className="ImgChatSection"
        />
        <div className="ChatInformationContainer">
          <div>
            <h2>{friendName}</h2>
            <span>{format(conversation.lastModified)}</span>
          </div>
          <div>
            {conversation.lastMessage}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatIndividual;
