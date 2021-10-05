import React from "react";
import { Link } from "react-router-dom";
import ImgStack from "./ImgStack";
import Connectxlogo from "../../assets/_logo/svg/logo_2.0.svg";
import Instituelogo from "../../assets/_institute_logo/insitute_logo.svg";
import linkedInIcon from "../../assets/footer/ic_linkedin.svg";
import linkedInIconHover from "../../assets/footer/h_ic_linkedin.svg";
import githubIcon from "../../assets/footer/ic_github.svg";
import githubIconHover from "../../assets/footer/h_ic_github.svg";
import mailIcon from "../../assets/footer/ic_mail.svg";
import mailIconHover from "../../assets/footer/h_ic_mail.svg";
import "../../styles/Landing/Footer.css";
import SignUp from "./../SignUp";

const General = ["Login", "Sign Up", "About", "Home", "Admin"];
const GeneralRoutes = ["signin", "signup", "about", "signin", "signin"];
const Browse = [
  "Projects",
  "Jobs",
  "Queries",
  "Connection",
  "Message",
  "Notification",
  "profile",
];
const Support = ["help.connectx@gmail.com", "(+91) 9113742865"];

const GeneralList = General.map((General, index) => {
  return (
    <li key={index}>
      <Link to={`${GeneralRoutes[index]}`}>{General}</Link>
    </li>
  );
});
const BrowseList = Browse.map((Browse, index) => {
  return (
    <li key={index}>
      <Link to="/signin">{Browse}</Link>
    </li>
  );
});
const SupportList = Support.map((Support, index) => {
  return (
    <li key={index}>
      <Link to="/">{Support}</Link>
    </li>
  );
});

function Footer() {
  // const [footerImage, setFooterImage] = useState(linkedInIcon);

  return (
    <footer className="LandingPageFooter">
      <div className="footerUpperContainer">
        <div className="footerLinks">
          <div style={{ marginLeft: "7.18vw" }}>
            General
            <ul>{GeneralList}</ul>
          </div>
          <div style={{ marginLeft: "6.04vw" }}>
            Browse
            <ul>{BrowseList}</ul>
          </div>
          <div style={{ marginLeft: "6.04vw" }}>
            Support
            <ul>{SupportList}</ul>
          </div>
        </div>
        <a href="/">
          <img src={Connectxlogo} alt="ConnectxLogo" />
        </a>
      </div>

      <div className="footerLowerContainer">
        <div className="instiuteinformation">
          <div className="logoOutercontainer">
            <div className="logoInnerContainer">
              <img src={Instituelogo} alt="Institutelogo" />
            </div>
          </div>
          <p>
            Atal Bihari Vajpayee Indian Institute of Information Technology and
            Management, Gwalior
          </p>
        </div>
        <div className="footerRightIcons">
          <div
            style={{
              display: "flex",
            }}
          >
            <ImgStack
              normalDisplay={linkedInIcon}
              hoverDisplay={linkedInIconHover}
            />
            <ImgStack
              normalDisplay={githubIcon}
              hoverDisplay={githubIconHover}
            />
            <ImgStack normalDisplay={mailIcon} hoverDisplay={mailIconHover} />
          </div>
          <p>
            <Link to="/">Privacy Policy</Link>
            <span style={{ color: "#929292", padding: "0 0.5vw" }}>|</span>
            <Link to="/">Terms of Use</Link>
          </p>
          <div className="copyright">Copyright (c) 2021</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
