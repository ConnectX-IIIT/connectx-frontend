import React from "react";
import "../styles/MainOuterBottomContainer.css";

function MainOuterBottomContainer(props) {
  return (
    <div
      style={{
        height: "49.348958333333336vw",
        width: "100%",
        backgroundColor: props.Background_color,
      }}
    >
      <img
        src={props.photo}
        alt="BottomContainerphoto"
        className="BottomContainerPhoto"
      />
    </div>
  );
}

export default MainOuterBottomContainer;
