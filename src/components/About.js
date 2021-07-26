import React from "react";
import TopAboutContainer from "./About_Components/TopAboutContainer";
import BottomAboutContainer from "./About_Components/BottomAboutContainer";
import FooterAboutPage from "./About_Components/FooterAboutPage";

import "../styles/About/About.css";
import AboutUsGroup from "../assets/about_us/about_us_one.svg";
import AboutUsShadow from "../assets/about_us/about_us_one_bottom_shadow_1.svg";
import AboutUsShadow2 from "../assets/about_us/about_us_one_bottom_shadow_2.svg";
import ConnectxLogo from "../assets/_logo/svg/logo.svg";

function About() {
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <img
        src={ConnectxLogo}
        alt="connectxlogo"
        style={{
          position: "absolute",
          top: "3.32vw",
          left: "44.15vw",
          width: "10.67vw",
          objectFit: "contain",
        }}
      />
      <TopAboutContainer />
      <div
        className="AboutImageContainer"
        style={{
          position: "absolute",
          top: "24%",
          left: "27%",
          height: "23.1vw",
          width: "46.2vw",
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
      <FooterAboutPage />
    </div>
  );
}

export default About;
