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
    <div className="registerFromInput mx-0">
      {isInput ? (
        <input
          type={inputType}
          name={inputName}
          id={inputName}
          value={inputValue}
          onChange={onChangeFunction}
          className="RegisterFormInput text-lg mb-3"
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
          }}
          placeholder={labelContent}
        />
      )}
    </div>
  );
}

export default CreatePostInput;
