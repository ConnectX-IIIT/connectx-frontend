import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./HomePageComponents/Navbar";
import HomeMainContainer from "../components/HomePageComponents/HomeMainContainer";
import QueriesMainConatiner from "../components/HomePageComponents/QueriesMainConatiner";

import "../styles/HomePage/HomePage.css";
import ConnectionMainContainer from "./HomePageComponents/ConnectionMainContainer";
import MessageMainContainer from "./HomePageComponents/MessageMainContainer";
import SearchBarPopOutPeople from "./HomePageComponents/SearchBarPopOutPeople";
import SearchBarPopOutQueries from "./HomePageComponents/SearchBarPopOutQueries";

const PopoutPeople = [
  {
    UserProfileSrc:
      "https://obscure-ridge-13663.herokuapp.com/user/fetch/82760836477864477ad674944107679d",
    UserProfileName: "Raj Noobda",
    UserProfileDescription: "Ujjawal piro harshil piro",
  },
  {
    UserProfileSrc:
      "https://obscure-ridge-13663.herokuapp.com/user/fetch/82760836477864477ad674944107679d",
    UserProfileName: "Raj Noobda",
    UserProfileDescription: "Ujjawal piro harshil piro",
  },
  {
    UserProfileSrc:
      "https://obscure-ridge-13663.herokuapp.com/user/fetch/82760836477864477ad674944107679d",
    UserProfileName: "Raj Noobda",
    UserProfileDescription: "Ujjawal piro harshil piro",
  },
];

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

const PopoutPeopleList = PopoutPeople.map((item, index) => {
  return (
    <SearchBarPopOutPeople
      UserProfileSrc={item.UserProfileSrc}
      key={index}
      UserProfileName={item.UserProfileName}
      UserProfileDescription={item.UserProfileDescription}
    />
  );
});
const PopoutQueriesList = PopoutQueries.map((item, index) => {
  return (
    <SearchBarPopOutQueries
      SearchBarQueries={item.SearchBarQueries}
      key={index}
    />
  );
});

export const Home = () => {
  const [userInput, setUserInput] = useState({
    searchedText: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserInput({ ...userInput, [name]: value });
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
            ? { opacity: "1", zIndex: "2", height: "100%" }
            : { opacity: "0", zIndex: "1", height: "0" }
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
          <Route exact path="/home/message" component={MessageMainContainer} />
        </Switch>
      </div>
    </div>
  );
};
export default Home;
