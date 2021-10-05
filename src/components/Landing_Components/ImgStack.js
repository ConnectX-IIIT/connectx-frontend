import React, { useState } from "react";
import "../../styles/Landing/ImgStack.css";

function ImgStack(props) {
  const [displayClass, setDisplayClass] = useState("normalDisplay commonImgHome");
  const [hoverClass, setHoverClass] = useState("hoverDisplay commonImgHome");

  return (
    <div
      className="imgStackContainer"
      onMouseOver={() => {
        setDisplayClass("hoverDisplay commonImgHome");
        setHoverClass("normalDisplay commonImgHome");
      }}
      onMouseOut={() => {
        setHoverClass("hoverDisplay commonImgHome");
        setDisplayClass("normalDisplay commonImgHome");
      }}
    >
      <img
        src={props.normalDisplay}
        alt="normal state"
        className={displayClass}
      />
      <img
        src={props.hoverDisplay}
        alt="hover display"
        className={hoverClass}
      />
    </div>
  );
}

export default ImgStack;
