import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ProfilePageImageContainer from "./ProfilePageImageContainer";
import ProfilePageInformationContainer from "./ProfilePageInformationContainer";

import "../../styles/ProfilePage/ProfilePage.css";
import ProfilePageNavbar from "./ProfilePageNavbar";
import ProfilePagePost from "./ProfilePagePost";
import ProfilePageQuestion from "./ProfilePageQuestion";
import ProfilePageAnswer from "./ProfilePageAnswer";
import ProfileEditPage from "./ProfileEditPage";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../helper/state_provider";
import { fetchUserDetails } from "./helper/get_user_details";

function ProfilePage(props) {

  const history = useHistory();
  const [{ userDetails }] = useStateValue();
  const [userData, setUserData] = useState({});
  const [isYourProfile, setIsYourProfile] = useState(true);
  const userId = props.match.params.userId;

  useEffect(() => {
    if (userDetails._id) {
      if (userId === userDetails._id) {
        setUserData(userDetails);
        setIsYourProfile(true);
      } else {
        fetchUserDetails(history, null, userId, setUserData);
        setIsYourProfile(false);
      }
    }
  }, [userDetails]);  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative">
      <div id="ProfilePageEditProfile" className="hidden">
        <ProfileEditPage />
      </div>

      <div className="profile-page-wrapper">
        <ProfilePageImageContainer isYourProfile={isYourProfile} userDetails={userData} />
        <ProfilePageInformationContainer isYourProfile={isYourProfile} userDetails={userData} />

        <Router>
          <ProfilePageNavbar isYourProfile={isYourProfile} userData={userData} />
          <Switch>
            <Route exact path="/home/user/:userId" component={ProfilePagePost} />
            <Route
              path="/home/user/:userId/question"
              component={ProfilePageQuestion}
            />
            <Route
              path="/home/user/:userId/answer"
              component={ProfilePageAnswer}
            />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default ProfilePage;
