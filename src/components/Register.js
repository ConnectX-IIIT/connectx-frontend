import React, { useState } from "react";
import Button from "./signUpCompontents/Button";
import FooterCopyRight from "./signUpCompontents/FooterCopyRight";
import "../styles/Register/Register.css";

function Register() {
  const [userRegistration, setUserRegistration] = useState({
    mobile: "",
    about: "",
    passingYear: "",
    joiningYear: "",
    currentrole: "",
    gender: "",
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
    <div className="RegisterMainPage">
      <form action="" onSubmit={handleSubmit} className="RegisterPageForm">
        <Button />
      </form>
      <FooterCopyRight />
    </div>
  );
}

export default Register;
