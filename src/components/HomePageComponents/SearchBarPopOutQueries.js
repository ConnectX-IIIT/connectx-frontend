import React from "react";

function SearchBarPopOutQueries({ SearchBarQueries }) {
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
      <div
        style={{
          fontFamily: "'Manrope' , sans-serif",
          fontSize: "0.9vw",
          fontWeight: "600",
          fontStyle: "normal",
          color: "#494949",
          marginRight: "0.5vw",
        }}
      >
        {SearchBarQueries}
      </div>
    </div>
  );
}

export default SearchBarPopOutQueries;
