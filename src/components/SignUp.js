import React, { useState } from "react";
import FormInput from "./signUpCompontents/FormInput";
import "../styles/Signup/SignUp.css";

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
    console.log(userRegistration);
  };

  return (
    <form action="" onSubmit={handleSubmit}>
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
  );
}

export default SignUp;
