import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Navbar.css";
import ConnectxLogo from "../../assets/_logo/svg/logo_2.0.svg";

function Navbar() {
  return (
    <div className="navbar">
      <img
        src={`${ConnectxLogo}`}
        className="connectxlogo"
        alt="Connectx_logo"
      />
      <div className="navbar_buttons">
        <Link to="/signin" className="NavbarLink">
          <button className="login_button"> Login </button>
        </Link>
        <Link to="/signup">
          <button className="sign_up_button">Sign Up</button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
