import React from "react";

import "../../styles/ProfilePage/ProfilePageInformationContainer.css";

function ProfilePageInformationContainer() {
  return (
    <div className="profile-page-information-container-wrapper">
      <div className="profile-page-information-container">
        <div>Jaxson AminofF</div>
        <div></div>
        <div>IPG-M.Tech</div>
        <div></div>
        <div>2015-2020</div>
      </div>
      <div className="profile-page-description-container">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut dicta
        repellat totam quam quaerat voluptatum perspiciatis debitis quod error
        at?
      </div>
      <div
        style={{
          background: "#FAFFF5",
          borderColor: "#5DAD0D",
          color: "#5DAD0D",
        }}
        className="profile-page-year-batch"
      >
        Alumni
      </div>
    </div>
  );
}

export default ProfilePageInformationContainer;
