import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

import "../../styles/ProfilePage/ProfilePageNavbar.css";

const ProfilePageNavbarName = ["Post", "Question", "Answer"];

const ProfilePageNavbarRouter = [
  "/home/userprofile/post",
  "/home/userprofile/question",
  "/home/userprofile/answer",
];

const NavbarRoutersNameList = ProfilePageNavbarName.map((router, index) => {
  return (
    <NavLink
      exact
      to={ProfilePageNavbarRouter[index]}
      key={index}
      activeClassName="profile-page-active-class"
      className="profile-page-link"
    >
      {router}
    </NavLink>
  );
});

function ProfilePageNavbar() {
  return (
    <div className="profile-page-navbar-wrapper">
      <div className="profile-page-navbar-left-wrapper">
        {NavbarRoutersNameList}
      </div>
    </div>
  );
}

export default ProfilePageNavbar;
