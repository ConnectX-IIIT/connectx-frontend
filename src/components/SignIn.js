import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "./signUpCompontents/FormInput";
import Button from "./signUpCompontents/Button";
import SignUpFormBottom from "./signUpCompontents/SignUpFormBottom";
import FooterCopyRight from "./signUpCompontents/FooterCopyRight";

import "../styles/SignIn/SignIn.css";

function SignIn() {
  const [userRegistration, setUserRegistration] = useState({
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserRegistration({ ...userRegistration, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="SignInMainPage">
      <form action="" onSubmit={handleSubmit} className="SignInPageForm">
        <p id="signinpagepara">Sign In</p>
        <FormInput
          inputType="email"
          inputName="email"
          inputValue={userRegistration.email}
          lableContent="Email"
          onChangeFunction={handleInput}
        />
        <FormInput
          inputType="password"
          inputName="password"
          inputValue={userRegistration.password}
          lableContent="Password"
          onChangeFunction={handleInput}
        />
        <Button />
        <SignUpFormBottom />
      </form>
      <div id="bottomElement">
        <div>
          Already Have an account? <Link to="/signup">SignUp </Link>
        </div>
        <Link to="/">Get Support</Link>
      </div>
      <FooterCopyRight />
    </div>
  );
}

export default SignIn;
