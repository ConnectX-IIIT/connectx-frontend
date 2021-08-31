import React from "react";

import "../../styles/Question/QuestionSectionUserprofile.css";

function QuestionSectionUserprofile({
  UserName,
  TimeStamp,
  ProfilePhoto,
  imgOrder = "0",
}) {
  return (
    <div className="question-section-user-profile-wrapper">
      <img
        src={ProfilePhoto}
        alt="profile"
        style={
          imgOrder === "0"
            ? { marginRight: "1.2vw" }
            : {
                marginLeft: "1vw",
                order: "1",
              }
        }
      />
      <div className="question-section-user-profile">
        <p>{UserName}</p>
        <p>{TimeStamp}</p>
      </div>
    </div>
  );
}

export default QuestionSectionUserprofile;
