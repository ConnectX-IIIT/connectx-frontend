import React, { useState } from "react";
import FormInput from "./signUpCompontents/FormInput";
import "../styles/Signup/SignUp.css";
import emailValidator from "email-validator";
import { passwordValidate } from "../helper/password_validator";

function SignUp() {
  const [userRegistration, setUserRegistration] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserRegistration({ ...userRegistration, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let name = userRegistration.name;
    let email = userRegistration.email;
    let password = userRegistration.password;
    let confirmPassword = userRegistration.confirmPassword;

    if (!name || !email || !password || !confirmPassword) {
      return alert('Please fill all details properly!');
    }

    if (password !== confirmPassword) {
      return alert('Password not matched!');
    }

    let emailValidation = emailValidator.validate(email);

    if (!emailValidation) {
      return alert('Enter a valid email');
    }

    let passwordValidation = passwordValidate(password);

    if (!passwordValidation[0]) {
      return alert(`${passwordValidation[1]}`);
    }

    console.log(userRegistration);
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
          inputName="confirmPassword"
          inputValue={userRegistration.confirmPassword}
          lableContent="Confirm Password"
          onChangeFunction={handleInput}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default SignUp;
