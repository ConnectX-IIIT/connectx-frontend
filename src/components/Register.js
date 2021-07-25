import React, { useState } from "react";
import FormInput from "./signUpCompontents/FormInput";
import "../styles/Register/Register.css";

function Register() {
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
    <div className="RegisterMainPage">
      <form action="" onSubmit={handleSubmit} className="RegisterPageForm">
        <FormInput
          inputType="email"
          inputName="email"
          inputValue={userRegistration.email}
          lableContent="Email"
          onChangeFunction={handleInput}
        />
      </form>
    </div>
  );
}

export default Register;
