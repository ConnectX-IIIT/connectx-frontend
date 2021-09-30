import React, { useState } from "react";
import { useRouteMatch, NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import "../../styles/HomePage/Navbar.css";

import ImgStackHome from "./ImgStackHome";
import connectxlogo from "../../assets/_logo/svg/logo.svg";
import searchIcon from "../../assets/home/top_navbar/ic_search_icon.svg";

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

import HomePageFormInput from "./HomePageFormInput";
import { useStateValue } from "../../helper/state_provider";
import { handlePhoto } from "./helper/handle_photo";

function Navbar({
  searchBarOpeningFun,
  searchBarClosingFun,
  onChangeFunction,
  inputValue,
  isSearchBarActive,
}) {
  let { url } = useRouteMatch();
  const history = useHistory();
  const [{ userDetails }] = useStateValue();

  const [navLocation, setNavLocation] = useState("home");

  return (
    <nav
      className="Navbar"
      onClick={() => {
        searchBarClosingFun();
      }}
    >
      <div className="HomeNavLeft">
        <img
          src={connectxlogo}
          alt="connectxlogo"
          className="ConnectxLogo"
          onClick={() => {
            history.push("/home");
          }}
        />
        <div
          onClick={() => {
            searchBarOpeningFun();
          }}
        >
          <HomePageFormInput
            isSearchBarActive={isSearchBarActive}
            inputValue={inputValue}
            onChangeFunction={onChangeFunction}
          />
          <img src={searchIcon} alt="searchicon" className="NavbarSearchIcon" />
        </div>
      </div>
      <div className="HomeNavRight">
        <NavLink
          to={`${url}`}
          isActive={(match, location) => {
            setNavLocation(location.pathname);
          }}
        >
          <ImgStackHome
            normalImageSrc={homeImage}
            hoverImageSrc={hoverHomeImage}
            activeImageSrc={activeHomeImage}
            isActive={navLocation === "/home" ? true : false}
          />
        </NavLink>
        <NavLink to={`${url}/queries`}>
          <ImgStackHome
            normalImageSrc={queriesImage}
            hoverImageSrc={hoverQueriesImage}
            activeImageSrc={activeQueriesImage}
            isActive={navLocation.startsWith("/home/qu") ? true : false}
          />
        </NavLink>
        <NavLink to={`${url}/connection`}>
          <ImgStackHome
            normalImageSrc={connectionImage}
            hoverImageSrc={hoverConnectionImage}
            activeImageSrc={activeConnectionImage}
            isActive={navLocation.startsWith("/home/connection") ? true : false}
          />
        </NavLink>
        <NavLink to={`${url}/message`}>
          <ImgStackHome
            normalImageSrc={messageImage}
            hoverImageSrc={hoverMessageImage}
            activeImageSrc={activeMessageImage}
            isActive={navLocation.startsWith("/home/message") ? true : false}
          />
        </NavLink>

        <div className="NavbarUserProfile">
          <img
            src={handlePhoto(userDetails.profilePicture, 1)}
            alt="user profile icon"
            className="NavbarUserProfile object-cover"
            onClick={() => {
              history.push(`/home/user/${userDetails._id}`);
            }}
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
