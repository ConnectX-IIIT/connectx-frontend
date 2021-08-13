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
    <div className="registerFromInput mx-0 w-auto">
      {isInput ? (
        <input
          type={inputType}
          name={inputName}
          id={inputName}
          value={inputValue}
          onChange={onChangeFunction}
          className="RegisterFormInput text-lg mb-3 w-64"
          autoComplete="Off"
          placeholder={labelContent}
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
            marginRight: "2.5vw",
          }}
          placeholder={labelContent}
        />
      )}
    </div>
  );
}

export default CreatePostInput;
