import React from "react";
import { Link } from "react-router-dom";
import ImgStack from "../Landing_Components/ImgStack";
import linkedInIcon from "../../assets/footer/ic_linkedin.svg";
import linkedInIconHover from "../../assets/footer/h_ic_linkedin.svg";
import githubIcon from "../../assets/footer/ic_github.svg";
import githubIconHover from "../../assets/footer/h_ic_github.svg";
import mailIcon from "../../assets/footer/ic_mail.svg";
import mailIconHover from "../../assets/footer/h_ic_mail.svg";
import "../../styles/About/FooterAboutPage.css";
import connectxlogo from "../../assets/_logo/svg/logo_2.0.svg";

function FooterAboutPage() {
  return (
    <footer className="FooterAboutPage">
      <img
        src={connectxlogo}
        alt="connectxlogo"
        style={{
          objectFit: "contain",
          width: "9.54vw",
        }}
      />
      <p
        style={{
          fontFamily: " 'Manrope' , sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontStyle: "normal",
          fontWeight: "600",
          fontSize: "1.25vw",
          color: "rgba(18, 30, 53, 0.31)",
        }}
      >
        copyright (c) 2021
      </p>
      <p className="AboutPageParaFooter">
        <Link to="/">Privacy Policy</Link>
        <span style={{ color: "#929292", padding: "0 0.5vw" }}>|</span>
        <Link to="/">Terms of Use</Link>
      </p>
      <p className="AboutPageParaFooter">
        <Link
          to="/"
          style={{
            marginRight: "1.2vw",
          }}
        >
          Sign Up
        </Link>
        <Link
          to="/"
          style={{
            marginRight: "1.2vw",
          }}
        >
          Home
        </Link>
        <Link to="/">Admin</Link>
      </p>
      <div
        className="footerIcons"
        style={{
          paddingTop: "0.8vw",
        }}
      >
        <ImgStack
          normalDisplay={linkedInIcon}
          hoverDisplay={linkedInIconHover}
        />
        <ImgStack normalDisplay={githubIcon} hoverDisplay={githubIconHover} />{" "}
        <ImgStack normalDisplay={mailIcon} hoverDisplay={mailIconHover} />
      </div>
    </footer>
  );
}

export default FooterAboutPage;
