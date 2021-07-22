import React from "react";
import "../styles/Navbar.css";
import ConnectxLogo from "../assets/_logo/svg/logo_2.0.svg";

function Navbar() {
  return (
    <div className="navbar">
      <img
        src={`${ConnectxLogo}`}
        className="connectxlogo"
        alt="Connectx_logo"
      />
      <div className="navbar_buttons">
        <button className="login_button"> Login </button>
        <button className="sign_up_button">Sign Up</button>
      </div>
    </div>
  );
}

export default Navbar;
