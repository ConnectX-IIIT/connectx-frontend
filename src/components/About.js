import React from "react";
import TopAboutContainer from "./About_Components/TopAboutContainer";
import BottomAboutContainer from "./About_Components/BottomAboutContainer";
import "../styles/About/About.css";
import AboutUsGroup from "../assets/about_us/about_us_one.svg";
import AboutUsShadow from "../assets/about_us/about_us_one_bottom_shadow_1.svg";
import AboutUsShadow2 from "../assets/about_us/about_us_one_bottom_shadow_2.svg";

function About() {
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <TopAboutContainer />
      <div
        className="AboutImageContainer"
        style={{
          position: "absolute",
          top: "24%",
          left: "27%",
        }}
      >
        <img src={AboutUsGroup} className="AboutUsGroup" alt="Aboutus" />
        <img src={AboutUsShadow} className="AboutUsShadow" alt="Aboutshadow" />
        <img
          src={AboutUsShadow2}
          className="AboutUsShadow2"
          alt="Aboutshadow"
        />
      </div>
      <BottomAboutContainer />
    </div>
  );
}

export default About;
