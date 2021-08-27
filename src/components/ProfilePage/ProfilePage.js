import React, { useState } from "react";

import ProfilePageImageContainer from "./ProfilePageImageContainer";
import ProfilePageInformationContainer from "./ProfilePageInformationContainer";

import "../../styles/ProfilePage/ProfilePage.css";

function ProfilePage() {
  return (
    <div className="profile-page-wrapper">
      <ProfilePageImageContainer />
      <ProfilePageInformationContainer />
    </div>
  );
}

export default ProfilePage;
