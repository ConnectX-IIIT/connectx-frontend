import React from "react";
import UserProfileDefaultIcon from "../../assets/profile/user_profile_default_icon.svg";

function SearchBarPopOutPeople() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        paddingLeft: "1vw",
        paddingTop: "0.5vw",
        paddingBottom: "0.5vw",
        borderBottom: "1px solid #959595",
        cursor: "pointer",
      }}
    >
      <img
        src={UserProfileDefaultIcon}
        alt=""
        style={{
          width: "2.1vw",
          marginRight: "0.5vw",
        }}
      />
      <div
        style={{
          fontFamily: "'Manrope' , sans-serif",
          fontSize: "1vw",
          fontWeight: "600",
          fontStyle: "normal",
          color: "#494949",
          marginRight: "0.5vw",
        }}
      >
        ABC XYZ
      </div>
      <div
        style={{
          fontFamily: "'Manrope' , sans-serif",
          fontSize: "0.8vw",
          fontWeight: "600",
          fontStyle: "normal",
          color: "#A7A7A7",
        }}
      >
        Lorem ipsum dolor sit amet.
      </div>
    </div>
  );
}

export default SearchBarPopOutPeople;
