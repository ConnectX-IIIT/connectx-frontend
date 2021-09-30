import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import FormInput from "./signUpCompontents/FormInput";
import Button from "./signUpCompontents/Button";
import SignUpFormBottom from "./signUpCompontents/SignUpFormBottom";
import FooterCopyRight from "./signUpCompontents/FooterCopyRight";
import "../styles/SignIn/SignIn.css";
import { useStateValue } from "../helper/state_provider";
import { handleSignIn } from "./general_helper/signin/signin";
import { handleForgotPassword } from "./general_helper/signin/forgot_password";

function SignIn() {
  const history = useHistory();
  const [, dispatch] = useStateValue();
  const [userRegistration, setUserRegistration] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserRegistration({ ...userRegistration, [name]: value });
  };

  return (
    <div className="SignInMainPage">
      <form
        action=""
        onSubmit={(e) => handleSignIn(history, dispatch, userRegistration)(e)}
        className="SignInPageForm"
      >
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
        <Link
          to="/signin"
          onClick={(e) => handleForgotPassword(userRegistration)(e)}
          id="SignUpformBottomAnchor"
        >
          Forgot Password?
        </Link>
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
