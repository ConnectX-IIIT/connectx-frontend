import React, { useState } from "react";

import closeSign from "../../assets/create_post/ic_close.svg";
import defaultpic from "../../assets/profile/user_profile_default_icon.svg";
import editButton from "../../assets/profile/pen.svg";
import reportIcon from "../../assets/_general/reporting_icon.svg";

import "../../styles/Chats/ChatGroupInformation.css";
import ChatGroupMember from "./ChatGroupMember";

function ChatGroupInformation({ closingFunction, closingState, groupDetails }) {
  const [updateGroupDetails, setUpdateGroupDetails] = useState({
    groupPhoto: "",
  });

  const handlePhoto = (photo) => {
    if (photo) {
      return photo;
    }
    return defaultpic;
  };

  const previewFile = (index) => (e) => {
    let preview = document.getElementsByClassName("chat-group-image")[index];

    let file = document.getElementsByClassName("chat-group-photo-input")[index]
      .files[0];
    let reader = new FileReader();

    reader.onloadend = function () {
      preview.src = reader.result;
      setUpdateGroupDetails({
        ...updateGroupDetails,
        [e.target.name]: e.target.files[0],
        photoIndex: index,
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }
  };

  const groupMembersList = groupDetails.members.map((item, index) => {
    return (
      <ChatGroupMember memberDetails={item} />
    );
  });

  return (
    <div className="chat-group-information scrollbarHidden">
      <div className="chat-group-header">
        <p>Group Info</p>
        <img
          src={closeSign}
          alt="cross"
          style={{ cursor: "pointer" }}
          onClick={() => {
            closingFunction(!closingState);
          }}
        />
      </div>
      <div className="chat-group-details">
        <input
          type="file"
          name="groupPhoto"
          onChange={previewFile(0)}
          className="chat-group-photo-input"
          accept=".png , .jpg , .jpeg "
        />
        <img src={handlePhoto(groupDetails.profilePicture)} alt="default" className="chat-group-image" />
        <img
          src={editButton}
          alt="edit"
          className="chat-group-edit-image"
          onClick={() => {
            document
              .getElementsByClassName("chat-group-photo-input")[0]
              .click();
          }}
        />
        <div>
          <p>{groupDetails.name}</p>
          <p>{groupDetails.members.length} Members</p>
        </div>
      </div>
      <div className="chat-group-description">
        <div>
          <p>Description</p>
          <img src={editButton} alt="edit" />
        </div>
        <div>
          {groupDetails.description}
        </div>
      </div>
      <div className="chat-group-members-list">
        <p>{groupDetails.members.length} Members</p>
        {groupMembersList}
      </div>
      <div className="chat-group-report">
        <img src={reportIcon} alt="" />
        <p>Report Group</p>
      </div>
    </div>
  );
}

export default ChatGroupInformation;
