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
          className="radioLabel text-lg mt-0 ml-0"
          style={{
            color: "#444444",
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
      }}
    >
      <p
        style={{
          fontFamily: "'Manrope' , sans-serif",
          fontStyle: "normal",
          fontWeight: "500",
          fontSize: "1.1vw",
          lineHeight: "1.4vw",
          color: "#444444",
          marginBottom: "0.8vw",
        }}
      >
        {RadioHeading}
      </p>

      {RadioOptionsList}
    </div>
  );
}

export default CreatePostRadio;
