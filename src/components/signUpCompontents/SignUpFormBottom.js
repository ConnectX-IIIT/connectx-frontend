import React from "react";
import { Link } from "react-router-dom";
import GoogleIcon from "../../assets/signinup_page/ic_google.svg";
import "../../styles/Signup/SignUpFormBottom.css";

function SignUpFormBottom() {

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="SignUpformBottom">
      <p id="SignUpformBottomPara"> Or continue with</p>
      <div className="SignUpBottomImageContainer">
        <img onClick={handleSubmit} src={GoogleIcon} alt="Google" />
      </div>
      <Link to="/">Forgot Password?</Link>
    </div>
  );
}

export default SignUpFormBottom;
