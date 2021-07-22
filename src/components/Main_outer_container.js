import React from "react";
import Navbar from "./Navbar";
import "../styles/Main_outer_container.css";

function MainOuterContainer({ Background_color, isNavbar }) {
  return (
    <div
      className="Main_outer_container"
      style={{ backgroundColor: Background_color }}
    >
      {isNavbar ? <Navbar /> : null}
    </div>
  );
}

export default MainOuterContainer;
