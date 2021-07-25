import React, { useState } from "react";
import Button from "./signUpCompontents/Button";
import FormInput from "./signUpCompontents/FormInput";
import SignUpFormBottom from "./signUpCompontents/SignUpFormBottom";
import FooterCopyRight from "./signUpCompontents/FooterCopyRight";
import "../styles/Signup/SignUp.css";
import emailValidator from "email-validator";
import { passwordValidate } from "../helper/password_validator";
import Cookies from "js-cookie";
import instance from "../helper/axios";

function SignUp() {
  const [userRegistration, setUserRegistration] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
    userId: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserRegistration({ ...userRegistration, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let name = userRegistration.name;
    let email = userRegistration.email;
    let password = userRegistration.password;
    let cPassword = userRegistration.cPassword;

    if (!name || !email || !password || !cPassword) {
      return alert("Please fill all details properly!");
    }

    if (password !== cPassword) {
      return alert("Password not matched!");
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
      const signupRes = await instance.post(`/auth/signup`,
        { name, email, password, cPassword }
      )

      const signupData = signupRes.data;

      userRegistration.userId = signupData.userId;
      Cookies.set("token", signupData.token, { expires: 1, secure: true });

    } catch (error) {
      return alert(`${error.response.data.error}`);
    }
  };

  return (
    <div className="SignUpMainPage">
      <form action="" onSubmit={handleSubmit} className="SignupPageForm">
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
          Already Have an account? <a href="/signin">SignIn</a>
        </div>
        <a href="#">Get Support</a>
      </div>
      <FooterCopyRight />
    </div>
  );
}

export default SignUp;
