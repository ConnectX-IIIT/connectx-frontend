import React from "react";
import Button from "./Button";
import connextxLogo from "../../assets/_logo/svg/logo_2.0.svg";
import "../../styles/Landing/MainOuterBottomContainer.css";

function MainOuterBottomContainer(props) {
  return (
    <div
      style={{
        height: "49.348958333333336vw",
        width: "100%",
        backgroundColor: props.Background_color,
        paddingTop: props.BottomContainerPadding,
      }}
    >
      <img
        src={props.photo}
        alt="BottomContainerphoto"
        className="BottomContainerPhoto"
        style={{ width: props.photoWidth }}
      />
      {props.isButton ? <Button /> : null}
      <p className="BottomContainerPara">
        {props.isLogo ? (
          <img
            style={{
              objectFit: "contain",
              width: "8.5vw",
              marginRight: "0.5vw",
            }}
            src={connextxLogo}
            alt="connextxLogo"
          />
        ) : null}{" "}
        {props.BottomParaContent}
      </p>
    </div>
  );
}

export default MainOuterBottomContainer;
