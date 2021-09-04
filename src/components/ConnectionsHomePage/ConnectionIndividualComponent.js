import React from "react";
import "../../styles/Connection/ConnectionIndividualComponent.css";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../helper/state_provider";
import { handlePhoto } from "../HomePageComponents/helper/handle_photo";
import { handleMessage } from "./helper/handle_message";

function ConnectionIndividualComponent({ user }) {

  const history = useHistory();
  const [{ userDetails }, dispatch] = useStateValue();

  return (
    <div className="ConnectionIndividualComponent">
      <div>
        <img src={handlePhoto(user.backgroundPicture, 0)} alt="cover" />
        <img src={handlePhoto(user.profilePicture, 1)} alt="User" />
      </div>
      <div className="ConnectionIndividualComponentDetails">
        <div>{user.name}</div>
        <div>{user.batch}</div>
        <div>
          {user.description}
        </div>
      </div>
      <button className="ConnectionIndividualComponentButton" onClick={(e) => { handleMessage(user, userDetails, dispatch, history)(e) }}>Message</button>
    </div>
  );
}

export default ConnectionIndividualComponent;