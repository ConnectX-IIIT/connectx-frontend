import React from "react";
import "../../styles//About/start.css";
import ConnectxLogo from "../../assets/_logo/svg/logo.svg";

function Start() {
  return (
    <div className="first">
      <img src={ConnectxLogo} alt="connectxlogo"></img>
      <h1>About Connect-X</h1>
      <p className="aboutpara">
        Welcome to Connectx, where we strive to maintain the senior-junior
        relationship in colleges.
      </p>
    </div>
  );
}
export default Start;
