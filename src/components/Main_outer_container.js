import React from "react";
import Navbar from "./Navbar";
import Heading from "./Heading";
import "../styles/Main_outer_container.css";

function MainOuterContainer({ Background_color, isNavbar, isLeft }) {
  return (
    <div
      className="Main_outer_container"
      style={{ backgroundColor: Background_color }}
    >
      {isNavbar ? <Navbar /> : null}
      <div className="ContentContainer">
        {isLeft ? (
          <Heading
            Heading_content="We're delighted to have you here. "
            headingWidth="41vw"
          />
        ) : null}
      </div>
    </div>
  );
}

export default MainOuterContainer;
