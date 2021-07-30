import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  NavLink,
} from "react-router-dom";
import FormInput from "../signUpCompontents/FormInput";
import ImgStackHome from "./ImgStackHome";
import connectxlogo from "../../assets/_logo/svg/logo.svg";
import searchIcon from "../../assets/home/top_navbar/ic_search_icon.svg";
import "../../styles/HomePage/Navbar.css";
import homeImage from "../../assets/home/top_navbar/ic_home.svg";
import hoverHomeImage from "../../assets/home/top_navbar/h_ic_home.svg";
import activeHomeImage from "../../assets/home/top_navbar/a_ic_home.svg";

import queriesImage from "../../assets/home/top_navbar/ic_queries.svg";
import hoverQueriesImage from "../../assets/home/top_navbar/h_ic_queries.svg";
import activeQueriesImage from "../../assets/home/top_navbar/a_ic_queries.svg";

import connectionImage from "../../assets/home/top_navbar/ic_connections.svg";
import hoverConnectionImage from "../../assets/home/top_navbar/h_ic_connections.svg";
import activeConnectionImage from "../../assets/home/top_navbar/a_ic_connections.svg";

import messageImage from "../../assets/home/top_navbar/ic_messages.svg";
import hoverMessageImage from "../../assets/home/top_navbar/h_ic_messages.svg";
import activeMessageImage from "../../assets/home/top_navbar/a_ic_messages.svg";

function Navbar() {
  let { path, url } = useRouteMatch();
  const [userInput, setUserInput] = useState({
    searchedText: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserInput({ ...userInput, [name]: value });
  };
  const [isNavActive, setIsNavActive] = useState([true, false, false, false]);
  const isNavActiveFunction = (index) => {
    if (isNavActive[index]) {
      return;
    } else {
      let temparr = [...isNavActive];
      for (let i = 0; i < temparr.length; i++) {
        if (temparr[i]) {
          temparr[i] = false;
        }
      }
      temparr[index] = true;
      setIsNavActive(temparr);
    }
  };
  return (
    <nav className="Navbar">
      <div className="HomeNavLeft">
        <img src={connectxlogo} alt="connectxlogo" className="ConnectxLogo" />
        <FormInput
          inputType="text"
          inputName="searchedText"
          inputValue={userInput.searchedText}
          lableContent={"Searched Something"}
          onChangeFunction={handleInput}
          style={{
            marginBottom: "0",
            marginLeft: "2vw",
            paddingLeft: "1.75vw",
            width: "24.9vw",
          }}
        />
        <img src={searchIcon} alt="searchicon" className="NavbarSearchIcon" />
      </div>
      <div className="HomeNavRight">
        <NavLink to={`${url}`} onClick={isNavActiveFunction(0)}>
          <ImgStackHome
            normalImageSrc={homeImage}
            hoverImageSrc={hoverHomeImage}
            activeImageSrc={activeHomeImage}
            isActive={isNavActive[0]}
          />
        </NavLink>
        <NavLink to={`${url}/queries`} onClick={isNavActiveFunction(1)}>
          <ImgStackHome
            normalImageSrc={queriesImage}
            hoverImageSrc={hoverQueriesImage}
            activeImageSrc={activeQueriesImage}
            isActive={isNavActive[1]}
          />
        </NavLink>
        <ImgStackHome
          normalImageSrc={connectionImage}
          hoverImageSrc={hoverConnectionImage}
          activeImageSrc={activeConnectionImage}
        />
        <ImgStackHome
          normalImageSrc={messageImage}
          hoverImageSrc={hoverMessageImage}
          activeImageSrc={activeMessageImage}
        />
      </div>
    </nav>
  );
}
// normalImageSrc,
// hoverImageSrc,
// activeImageSrc,
// isActive,
// urlPath,

export default Navbar;
