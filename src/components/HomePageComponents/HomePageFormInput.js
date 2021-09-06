import React from "react";

import "../../styles/HomePage/HomeMainContainer/HomePageFormInput.css";

function HomePageFormInput({
  inputValue,
  onChangeFunction,
  isSearchBarActive,
}) {
  return (
    <div className="FormInputDiv">
      <input
        type="text"
        name="searchedText"
        id="searchedText"
        value={inputValue}
        onChange={onChangeFunction}
        className="FormInput"
        placeholder="Search Something"
        style={{
          marginBottom: "0",
          marginLeft: "2vw",
          width: isSearchBarActive ? "35vw" : "24.9vw",
        }}
      />
    </div>
  );
}

export default HomePageFormInput;
