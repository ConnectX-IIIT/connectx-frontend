import React from "react";
import { NavLink } from "react-router-dom";
import { useStateValue } from "../../helper/state_provider";

import { useHistory } from "react-router-dom";
import "../../styles/ProfilePage/ProfilePageNavbar.css";
import ProfilePageLogOut from "./ProfilePageLogOut";
import { handleMessage } from "../ConnectionsHomePage/helper/handle_message";

function ProfilePageMessageBtn({ userData }) {
  const history = useHistory();
  const [{ userDetails }, dispatch] = useStateValue();

  return (
    <div>
      <button
        className="logOutBttn"
        style={{
          color: "#1792DD",
          borderColor: "#1792DD",
        }}
      >
        <div
          className="logOut"
          style={{
            color: "#1792DD",
          }}
          onClick={(e) =>
            handleMessage(userData, userDetails, dispatch, history)(e)
          }
        >
          Message
        </div>
      </button>
    </div>
  );
}

function ProfilePageNavbar({ isYourProfile, userData }) {
  return (
    <div className="profile-page-navbar-wrapper">
      <div className="profile-page-navbar-left-wrapper">
        <NavLink
          exact
          to={"/home/user/" + userData._id}
          key={0}
          activeClassName="profile-page-active-class"
          className="profile-page-link"
        >
          Post
        </NavLink>
        <NavLink
          exact
          to={"/home/user/" + userData._id + "/question"}
          key={1}
          activeClassName="profile-page-active-class"
          className="profile-page-link"
        >
          Question
        </NavLink>
        <NavLink
          exact
          to={"/home/user/" + userData._id + "/answer"}
          key={2}
          activeClassName="profile-page-active-class"
          className="profile-page-link"
        >
          Answer
        </NavLink>
      </div>
      <div className="profile-page-navbar-right-wrapper">
        {!isYourProfile ? (
          <ProfilePageMessageBtn userData={userData} />
        ) : (
          <ProfilePageLogOut />
        )}
      </div>
    </div>
  );
}

export default ProfilePageNavbar;
