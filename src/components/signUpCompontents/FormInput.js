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
      <label htmlFor={inputName}>{lableContent}</label>
      <input
        type={inputType}
        name={inputName}
        id={inputName}
        value={inputValue}
        onChange={onChangeFunction}
      />
    </div>
  );
}

export default FormInput;
