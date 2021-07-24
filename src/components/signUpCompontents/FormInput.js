import React from "react";
import "../../styles/Signup/FormInput.css";

function FormInput({
  inputType,
  inputName,
  inputValue,
  lableContent,
  onChangeFunction,
}) {
  return (
    <div>
      <label htmlFor={inputName} className="FormLabel">
        {lableContent}
      </label>
      <input
        type={inputType}
        name={inputName}
        id={inputName}
        value={inputValue}
        onChange={onChangeFunction}
        className="FormInput"
      />
    </div>
  );
}

export default FormInput;
