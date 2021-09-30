import React, { useState } from "react";
import Button from "./signUpCompontents/Button";
import FooterCopyRight from "./signUpCompontents/FooterCopyRight";
import "../styles/Register/Register.css";
import { useHistory } from "react-router-dom";
import { addExtraDetails } from "./general_helper/register/add_extra_details";

const Batch = ["IPG-MTech", "IPG-MBA", "BCS", "MTech", "PhD"];
const BatchList = Batch.map((batch) => {
  return (
    <option key={batch} value={batch} className="SelectOptionRegister">
      {batch}
    </option>
  );
});

const passingYear = [];
for (let i = 0; i < 25; i++) {
  passingYear.push(i + 2001);
}

function optionGenerator(year) {
  return (
    <option key={year} value={year} className="SelectOptionRegister">
      {year}
    </option>
  );
}

const passingyearList = passingYear.map((year) => {
  return optionGenerator(year);
});

const joiningYear = [];
for (let i = 0; i < 25; i++) {
  joiningYear.push(i + 1997);
}
const joiningyearList = joiningYear.map((year) => {
  return optionGenerator(year);
});

function Register() {

  const history = useHistory();

  const currentrole = ["Student", "Alumni"];
  const gender = ["Male", "Female", "Other"];
  const [userRegistration, setUserRegistration] = useState({
    mobileNumber: "",
    about: "",
    passingYear: "",
    joiningYear: "",
    batch: "",
    currentrole: "",
    gender: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserRegistration({ ...userRegistration, [name]: value });
  };

  const [isActive, setActive] = useState(false);
  const [isActiveAbout, setActiveAbout] = useState(false);

  function handleTextChange(e) {
    handleInput(e);

    if (e.target.name === "mobileNumber") {
      if (e.target.value !== "") {
        setActive(true);
      } else {
        setActive(false);
      }
    } else if (e.target.name === "about") {
      if (e.target.value !== "") {
        setActiveAbout(true);
      } else {
        setActiveAbout(false);
      }
    } else if (e.target.name === "batch") {
      let Batch = document.getElementsByClassName("SelectRegister")[0];
      Batch.style.color = "#717171";
    } else if (e.target.name === "passingYear") {
      let passingyear = document.getElementsByClassName("SelectRegister")[1];
      passingyear.style.color = "#717171";
    } else if (e.target.name === "joiningYear") {
      let joiningyear = document.getElementsByClassName("SelectRegister")[2];
      joiningyear.style.color = "#717171";
    }
  }

  const currentroleList = currentrole.map((role) => {
    return (
      <>
        <input
          type="radio"
          id={`Registercurrent` + role}
          name="currentrole"
          onChange={handleTextChange}
          value={role}
          key={`Registerrole` + role}
          className="radioInput"
        />
        <label
          htmlFor={`Registercurrent` + role}
          key={role}
          className="radioLabel"
          style={{
            color: "#717171",
          }}
        >
          {role}
        </label>
      </>
    );
  });

  const genderList = gender.map((role) => {
    return (
      <>
        <input
          type="radio"
          id={`Registergender` + role}
          name="gender"
          onChange={handleTextChange}
          value={role[0]}
          key={`Registergender` + role}
          className="radioInput"
        />
        <label
          htmlFor={`Registergender` + role}
          key={role}
          className="radioLabel"
          style={{
            color: "#717171",
          }}
        >
          {role}
        </label>
      </>
    );
  });

  return (
    <div className="RegisterMainPage">
      <form action="" onSubmit={(e) => addExtraDetails(history, userRegistration)(e)} className="RegisterPageForm">
        <div className="registerFromInput">
          <input
            type="number"
            name="mobileNumber"
            id="RegistermobileNumber"
            value={userRegistration.mobileNumber}
            onChange={handleTextChange}
            className="RegisterFormInput"
            autoComplete="Off"
          />
          <label
            htmlFor="mobileNumber"
            className="RegisterFormLabel"
            style={
              isActive
                ? {
                  transform: "translateY(-75%)",
                  fontSize: "0.9vw",
                  transition:
                    "transform 0.2s ease-out , font-size 0.15s ease-out , background-color 0.15s ease-out",
                  paddingLeft: "0.5vw",
                  paddingRight: "0.5vw",
                  left: "4%",
                  backgroundColor: "#fcfdff",
                }
                : {
                  transform: "translateY(0)",
                  fontSize: "1.25vw",
                  transition:
                    "transform 0.2s ease-out , font-size 0.15s ease-out , background-color 0.15s ease-out",
                  backgroundColor: "transparent",
                }
            }
          >
            Mobile Number
          </label>
        </div>

        <div className="registerFromInput">
          <textarea
            name="about"
            id="Registerabout"
            value={userRegistration.about}
            onChange={handleTextChange}
            className="RegisterFormInput"
            autoComplete="Off"
          />
          <label
            htmlFor="about"
            className="RegisterFormLabel"
            style={
              isActiveAbout
                ? {
                  transform: "translateY(-75%)",
                  fontSize: "0.9vw",
                  transition:
                    "transform 0.2s ease-out , font-size 0.15s ease-out , background-color 0.15s ease-out",
                  paddingLeft: "0.5vw",
                  paddingRight: "0.5vw",
                  left: "4%",
                  backgroundColor: "#fcfdff",
                }
                : {
                  transform: "translateY(0)",
                  fontSize: "1.25vw",
                  transition:
                    "transform 0.2s ease-out , font-size 0.15s ease-out , background-color 0.15s ease-out",
                  backgroundColor: "transparent",
                  top: "9%",
                }
            }
          >
            About
          </label>
        </div>

        <div
          style={{
            position: "relative",
            marginLeft: "3.8vw",
            width: "fit-content",
          }}
        >
          {/* <label htmlFor="currentrole" className="SelectLabel">
            Batch
          </label> */}
          <div>
            <div className="arrowSelectRegister" id="arrowBatch"></div>
            <select
              id="RegistrationCurrentRole"
              name="batch"
              value={userRegistration.batch}
              onChange={handleTextChange}
              // onFocus={ChangeColorBatch}
              className="SelectRegister"
              style={{
                color: "#d1d1d1",
              }}
            >
              <option hidden selected value className="SelectOptionRegister">
                Batch
              </option>
              {BatchList}
            </select>

            <div className="arrowSelectRegister"></div>
            <select
              id="RegistrationPassingYear"
              name="passingYear"
              value={userRegistration.passingYear}
              onChange={handleTextChange}
              className="SelectRegister"
              style={{
                color: "#d1d1d1",
              }}
            >
              <option hidden selected value className="SelectOptionRegister">
                Passing Year
              </option>
              {passingyearList}
            </select>
          </div>
        </div>

        <div
          style={{
            position: "relative",
            marginLeft: "3.8vw",
            width: "fit-content",
          }}
        >
          <div className="arrowSelectRegister" id="arrowJoiningYear"></div>
          <select
            id="RegistrationjoiningYear"
            name="joiningYear"
            value={userRegistration.joiningYear}
            onChange={handleTextChange}
            className="SelectRegister"
            style={{
              color: "#d1d1d1",
            }}
          >
            <option hidden selected value className="SelectOptionRegister">
              Joining Year
            </option>
            {joiningyearList}
          </select>
        </div>

        <div
          style={{
            position: "relative",
            marginLeft: "3.8vw",
            marginTop: "1.5vw",
            width: "fit-content",
            marginBottom: "2.5vw",
          }}
        >
          <div
            style={{
              display: "inline-block",
            }}
          >
            <p
              style={{
                fontFamily: "'Manrope' , sans-serif",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "1vw",
                lineHeight: "1.4vw",
                color: "#A6A6A6",
                marginBottom: "0.7vw",
              }}
            >
              Current Role
            </p>

            {currentroleList}
          </div>
          <div
            style={{
              display: "inline-block",
              marginLeft: "5vw",
            }}
          >
            <p
              style={{
                fontFamily: "'Manrope' , sans-serif",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "1vw",
                lineHeight: "1.4vw",
                color: "#A6A6A6",
                marginBottom: "0.7vw",
              }}
            >
              Gender
            </p>

            {genderList}
          </div>
        </div>
        <Button />
      </form>
      <FooterCopyRight />
    </div>
  );
}

export default Register;
