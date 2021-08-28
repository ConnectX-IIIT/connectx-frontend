import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ProfilePageImageContainer from "./ProfilePageImageContainer";
import ProfilePageInformationContainer from "./ProfilePageInformationContainer";

import "../../styles/ProfilePage/ProfilePage.css";
import ProfilePageNavbar from "./ProfilePageNavbar";
import ProfilePagePost from "./ProfilePagePost";
import ProfilePageQuestion from "./ProfilePageQuestion";
import ProfilePageAnswer from "./ProfilePageAnswer";
import ProfilePageLogOut from "./ProfilePageLogOut";
function ProfilePage() {
  return (
    <div className="profile-page-wrapper">
      <ProfilePageImageContainer />
      <ProfilePageInformationContainer />
      <ProfilePageLogOut/>
      <Router>
        <ProfilePageNavbar />
        <Switch>
          <Route path="/home/userprofile/post" component={ProfilePagePost} />
          <Route
            path="/home/userprofile/question"
            component={ProfilePageQuestion}
          />
          <Route
            path="/home/userprofile/answer"
            component={ProfilePageAnswer}
          />
        </Switch>
      </Router>
      
    </div>
  );
}

export default ProfilePage;
