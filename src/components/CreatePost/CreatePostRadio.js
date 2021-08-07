import React from "react";

function CreatePostRadio({
  RadioHeading,
  RadioOptions,
  RadioName,
  onChangeFunction,
}) {
  const RadioOptionsList = RadioOptions.map((RadioOption) => {
    return (
      <>
        <input
          type="radio"
          id={RadioHeading + RadioOption}
          name={RadioName}
          onChange={onChangeFunction}
          value={RadioOption}
          key={RadioHeading + RadioOption}
          className="radioInput"
        />
        <label
          htmlFor={RadioHeading + RadioOption}
          key={RadioOption}
          className="radioLabel"
          style={{
            color: "#717171",
          }}
        >
          {RadioOption}
        </label>
      </>
    );
  });

  return (
    <div
      style={{
        display: "inline-block",
        marginLeft: "4vw",
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
        {RadioHeading}
      </p>

      {RadioOptionsList}
    </div>
  );
}

export default CreatePostRadio;
