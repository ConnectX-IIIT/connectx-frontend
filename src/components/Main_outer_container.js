import React from "react";
import Heading from "./Heading";
import "../styles/Main_outer_container.css";
// import photo from "../assets/landing_page/container_one/container_one.svg";

function MainOuterContainer({ Background_color, isLeft, data, photo }) {
  return (
    <div
      className="Main_outer_container"
      style={{ backgroundColor: Background_color }}
    >
      {/* {isNavbar ? <Navbar /> : null} */}
      {isLeft ? (
        <div className="ContentContainer">
          <Heading
            Heading_content={data.heading}
            headingWidth="41vw"
            Heading_para={data.description}
          />
          <img
            src={photo}
            alt="Container_1_img"
            className="img_landing_page"
            style={{ paddingLeft: "2vw" }}
          />
        </div>
      ) : (
        <div className="ContentContainer">
          <img
            src={`${photo}`}
            alt="Container_1_img"
            className="img_landing_page"
          />
          <Heading
            Heading_content={data.heading}
            headingWidth="43vw"
            Heading_para={data.description}
            isRight
          />
        </div>
      )}
    </div>
  );
}

export default MainOuterContainer;
