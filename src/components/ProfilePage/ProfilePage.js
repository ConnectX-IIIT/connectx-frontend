import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ProfilePageImageContainer from "./ProfilePageImageContainer";
import ProfilePageInformationContainer from "./ProfilePageInformationContainer";

import "../../styles/ProfilePage/ProfilePage.css";
import ProfilePageNavbar from "./ProfilePageNavbar";
import ProfilePagePost from "./ProfilePagePost";
import ProfilePageQuestion from "./ProfilePageQuestion";
import ProfilePageAnswer from "./ProfilePageAnswer";
import ProfileEditPage from "./ProfileEditPage";

function ProfilePage() {
  const [isYourProfile, setIsYourProfile] = useState(true);

  return (
    <div className="relative">
      <div id="ProfilePageEditProfile" className="hidden">
        <ProfileEditPage />
      </div>

      <div className="profile-page-wrapper">
        <ProfilePageImageContainer isYourProfile={isYourProfile} />
        <ProfilePageInformationContainer isYourProfile={isYourProfile} />

        <Router>
          <ProfilePageNavbar isYourProfile={isYourProfile} />
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
    </div>
  );
}

export default ProfilePage;
