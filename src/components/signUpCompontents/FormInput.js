import React, { useState } from "react";
import "../../styles/Signup/FormInput.css";

function FormInput({
  inputType,
  inputName,
  inputValue,
  lableContent,
  onChangeFunction,
}) {
  const [isActive, setActive] = useState(false);

  function handleTextChange(e) {
    onChangeFunction(e);

    if (e.target.value != "") {
      setActive(true);
    } else {
      setActive(false);
    }
  }

  return (
    <div className="FormInputDiv">
      <input
        type={inputType}
        name={inputName}
        id={inputName}
        value={inputValue}
        onChange={handleTextChange}
        className="FormInput"
        autoComplete="Off"
      />
      <label
        htmlFor={inputName}
        className="FormLabel"
        style={
          isActive
            ? {
                transform: "translateY(-72%)",
                fontSize: "0.9vw",
                transition:
                  "transform 0.15s ease-out , font-size 0.2s ease-out",
                paddingLeft: "0.5vw",
                paddingRight: "0.5vw",
                left: "12%",
              }
            : {
                transform: "translateY(0)",
                fontSize: "1.25vw",
                transition:
                  "transform 0.15s ease-out , font-size 0.2s ease-out",
              }
        }
      >
        {lableContent}
      </label>
    </div>
  );
}
export default FormInput;
