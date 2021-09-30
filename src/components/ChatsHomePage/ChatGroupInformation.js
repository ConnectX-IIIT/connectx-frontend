import React, { useEffect, useState } from "react";

import closeSign from "../../assets/create_post/ic_close.svg";
import editButton from "../../assets/profile/pen.svg";
import reportIcon from "../../assets/_general/reporting_icon.svg";

import "../../styles/Chats/ChatGroupInformation.css";
import ChatGroupMember from "./ChatGroupMember";
import { handlePhoto } from "../HomePageComponents/helper/handle_photo";
import { updateGroupProfilePicture } from "./helper/update_group_profile";
import { useHistory } from "react-router-dom";

function ChatGroupInformation({ closingFunction, closingState, groupDetails }) {

  const history = useHistory();
  const [updateGroupDetails, setUpdateGroupDetails] = useState({
    groupPhoto: "",
  });

  useEffect(() => {
    if (updateGroupDetails.groupPhoto) {
      updateGroupProfilePicture(updateGroupDetails, history);
    }
  }, [updateGroupDetails]) // eslint-disable-line react-hooks/exhaustive-deps


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
        <img src={handlePhoto(groupDetails.profilePicture, 1)} alt="default" className="chat-group-image" />
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
