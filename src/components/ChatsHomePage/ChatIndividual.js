import React, { useEffect, useState } from "react";
import { useStateValue } from "../../helper/state_provider";
import "../../styles/Chats/ChatIndividual.css";
import { format } from "timeago.js";
import { handlePhoto } from "../HomePageComponents/helper/handle_photo";

function ChatIndividual({ conversation, isGroup, isActive = false }) {
  /* eslint-disable no-unused-vars */
  const [{ userDetails }, dispatch] = useStateValue();
  /* eslint-enable no-unused-vars */
  const [friendName, setFriendName] = useState("");
  const [friendProfile, setFriendProfile] = useState("");
  const [isBeingHovered, setIsBeingHovered] = useState("");

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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function setHovering(e) {
    setIsBeingHovered(true);
  }

  function removeHovering(e) {
    setIsBeingHovered(false);
  }

  return (
    <div
      className="forHover"
      onMouseEnter={(e) => setHovering(e)}
      onMouseLeave={(e) => removeHovering(e)}
      style={
        isBeingHovered
          ? {
              backgroundColor: "rgb(240, 240, 240)",
            }
          : {
              backgroundColor: "rgb(255, 255, 255)",
            }
      }
    >
      <div
        className="ChatSectionIndividual"
        style={
          isActive
            ? {
                backgroundColor: "rgb(220, 220, 220)",
              }
            : {}
        }
      >
        <img
          src={handlePhoto(friendProfile, 1)}
          alt="Default"
          className="ImgChatSection"
        />
        <div className="ChatInformationContainer">
          <div>
            <h2>{friendName}</h2>
            <span>{format(conversation.lastModified)}</span>
          </div>
          <div>{conversation.lastMessage}</div>
        </div>
      </div>
    </div>
  );
}

export default ChatIndividual;
