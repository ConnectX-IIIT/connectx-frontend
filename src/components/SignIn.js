import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import FormInput from "./signUpCompontents/FormInput";
import Button from "./signUpCompontents/Button";
import SignUpFormBottom from "./signUpCompontents/SignUpFormBottom";
import FooterCopyRight from "./signUpCompontents/FooterCopyRight";
import emailValidator from "email-validator";
import { passwordValidate } from "../helper/password_validator";
import Cookies from "js-cookie";
import instance from "../helper/axios";

import "../styles/SignIn/SignIn.css";

function SignIn() {

  const history = useHistory();
  const [userRegistration, setUserRegistration] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserRegistration({ ...userRegistration, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let email = userRegistration.email;
    let password = userRegistration.password;

    if (!email || !password) {
      return alert("Please fill all details properly!");
    }

    let emailValidation = emailValidator.validate(email);

    if (!emailValidation) {
      return alert("Enter a valid email");
    }

    let passwordValidation = passwordValidate(password);

    if (!passwordValidation[0]) {
      return alert(`${passwordValidation[1]}`);
    }

    try {
      const signinRes = await instance.post(`/auth/signin`,
        { email, password }
      )

      const signinData = signinRes.data;

      Cookies.set("token", signinData.token, { expires: 1, secure: true });

      history.push('/home');

    } catch (error) {
      return alert(`${error.response.data.error}`);
    }
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
