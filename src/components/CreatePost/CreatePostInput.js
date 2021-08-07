import React from "react";

function CreatePostInput({
  inputType,
  inputName,
  inputValue,
  onChangeFunction,
  labelContent,
  isActive,
  isInput,
}) {
  return (
    <div className="registerFromInput">
      {isInput ? (
        <input
          type={inputType}
          name={inputName}
          id={inputName}
          value={inputValue}
          onChange={onChangeFunction}
          className="RegisterFormInput"
          autoComplete="Off"
        />
      ) : (
        <textarea
          name={inputName}
          id={inputName}
          value={inputValue}
          onChange={onChangeFunction}
          className="RegisterFormInput w-96 h-28"
          autoComplete="Off"
          style={{
            paddingTop: "1vw",
          }}
        />
      )}

      <label
        htmlFor={inputName}
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
        {labelContent}
      </label>
    </div>
  );
}

export default CreatePostInput;
