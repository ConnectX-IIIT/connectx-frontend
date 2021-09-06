import React from "react";
import "../../styles/Register/Register.css"

function CreatePostInput({
  inputType,
  inputName,
  inputValue,
  onChangeFunction,
  labelContent,
  isInput,
  style,
  isDisabled = false,
}) {
  return (
    <div className="registerFromInput mx-0 w-auto">
      {isInput ? (
        <input
          type={inputType}
          name={inputName}
          id={inputName}
          value={inputValue}
          onChange={onChangeFunction}
          className="RegisterFormInput text-lg InputCreatePost"
          autoComplete="Off"
          placeholder={labelContent}
          style={style}
          disabled={isDisabled}
        />
      ) : (
        <textarea
          name={inputName}
          id={inputName}
          value={inputValue}
          onChange={onChangeFunction}
          className="RegisterFormInput w-96 h-28 text-lg"
          autoComplete="Off"
          style={{
            paddingTop: "0.4vw",
          }}
          placeholder={labelContent}
        />
      )}
    </div>
  );
}

export default CreatePostInput;
