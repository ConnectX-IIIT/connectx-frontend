import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "./signUpCompontents/Button";
import FormInput from "./signUpCompontents/FormInput";
import SignUpFormBottom from "./signUpCompontents/SignUpFormBottom";
import FooterCopyRight from "./signUpCompontents/FooterCopyRight";
import "../styles/Signup/SignUp.css";
import { useStateValue } from "../helper/state_provider";
import { handleSignUp } from "./general_helper/signup/signup";

function SignUp() {
  const history = useHistory();
  const [, dispatch] = useStateValue();
  const [userRegistration, setUserRegistration] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserRegistration({ ...userRegistration, [name]: value });
  };

  return (
    <div className="SignUpMainPage">
      <form
        action=""
        onSubmit={(e) => handleSignUp(history, dispatch, userRegistration)(e)}
        className="SignupPageForm"
      >
        <p>Sign Up</p>
        <FormInput
          inputType="text"
          inputName="name"
          inputValue={userRegistration.name}
          lableContent="Name"
          onChangeFunction={handleInput}
        />
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
        <FormInput
          inputType="password"
          inputName="cPassword"
          inputValue={userRegistration.cPassword}
          lableContent="Confirm Password"
          onChangeFunction={handleInput}
        />
        <Button />
        <SignUpFormBottom />
      </form>
      <div id="bottomElement">
        <div>
          Already Have an account? <Link to="/signin">SignIn </Link>
        </div>
        <Link to="/">Get Support</Link>
      </div>
      <FooterCopyRight />
    </div>
  );
}

export default SignUp;
