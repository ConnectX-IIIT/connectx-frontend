import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Navbar from "./HomePageComponents/Navbar";
import HomeMainContainer from "../components/HomePageComponents/HomeMainContainer";
import QueriesMainConatiner from "./Queries/QueriesMainConatiner";

import "../styles/HomePage/HomePage.css";
import ProfilePage from "../components/ProfilePage/ProfilePage";

import ConnectionMainContainer from "./ConnectionsHomePage/ConnectionMainContainer";
import ChatsMainContainer from "./ChatsHomePage/ChatsMainContainer";
import SearchBarPopOutPeople from "./HomePageComponents/SearchBarPopOutPeople";
import SearchBarPopOutQueries from "./HomePageComponents/SearchBarPopOutQueries";
import instance from "../helper/axios";
import Cookies from "js-cookie";

let PopoutPeople = [];

const PopoutQueries = [
  {
    SearchBarQueries: "akash piro raj piro",
  },
  {
    SearchBarQueries: "akash piro raj piro",
  },
  {
    SearchBarQueries: "akash piro raj piro",
  },
];

const PopoutQueriesList = PopoutQueries.map((item, index) => {
  return (
    <SearchBarPopOutQueries
      SearchBarQueries={item.SearchBarQueries}
      key={index}
    />
  );
});

export const Home = () => {
  const history = useHistory();

  const PopoutPeopleList = PopoutPeople.map((item, index) => {
    return (
      <SearchBarPopOutPeople
        UserProfileSrc={item.profilePicture}
        key={index}
        UserProfileName={item.name}
        UserProfileDescription={item.description}
      />
    );
  });

  const [userInput, setUserInput] = useState({
    searchedText: "",
  });

  const handleInput = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserInput({ ...userInput, [name]: value });

    if (value.length === 0) {
      PopoutPeople = [];
      return;
    }

    try {
      const token = Cookies.get("token");

      if (token) {
        const getSearchRes = await instance.get(`/home/search/${value}`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        const userData = getSearchRes.data.userData;
        PopoutPeople = userData;
        const queriesData = getSearchRes.data.questionData;
      } else {
        history.replace("/signin");
      }
    } catch (error) {
      if (error.response.status === 500) {
        return alert(`Server error occured!`);
      }
      return alert(`Your session has expired, please login again!`);
    }
  };
  const [isSearchBarClicked, setIsSearchBarClicked] = useState(false);

  function onSearchBarClick() {
    setIsSearchBarClicked(!isSearchBarClicked);
  }

  function onSearchBarBlur() {
    if (isSearchBarClicked) setIsSearchBarClicked(false);
  }

  return (
    <div>
      <Navbar
        inputName={userInput.searchedText}
        isSearchBarClicked={onSearchBarClick}
        onSearchBarBlur={onSearchBarBlur}
        onChangeFunction={handleInput}
      />
      <div
        className="OnSearchDisplay"
        style={
          isSearchBarClicked
            ? { opacity: "1", zIndex: "2", height: "100%", top: "0px" }
            : { opacity: "0", zIndex: "1", height: "0", top: "0px" }
        }
      >
        <div
          className="SearchPopOut"
          style={
            isSearchBarClicked
              ? { display: "block" }
              : {
                  display: "none",
                }
          }
        >
          <div className="Queries">
            <div className="queriesHeading">People</div>
            {PopoutPeopleList}
          </div>
          <div className="Queries">
            <div className="queriesHeading">Queries</div>
            {PopoutQueriesList}
          </div>
        </div>
      </div>
      <div>
        <Switch>
          <Route exact path="/home" component={HomeMainContainer} style />
          <Route exact path="/home/queries" component={QueriesMainConatiner} />
          <Route
            exact
            path="/home/connection"
            component={ConnectionMainContainer}
          />
          <Route exact path="/home/message" component={ChatsMainContainer} />
          <Route
            exact
            path="/home/message/:chatId"
            component={ChatsMainContainer}
          />
          <Route exact path="/home/userprofile" component={ProfilePage} />
        </Switch>
      </div>
    </div>
  );
};
export default Home;
