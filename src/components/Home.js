import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Navbar from "./HomePageComponents/Navbar";
import HomeMainContainer from "../components/HomePageComponents/HomeMainContainer";
import QueriesMainConatiner from "./Queries/QueriesMainConatiner";

import "../styles/HomePage/HomePage.css";
import ProfilePage from "../components/ProfilePage/ProfilePage";

import ConnectionMainContainer from "./ConnectionsHomePage/ConnectionMainContainer";
import ChatsMainContainer from "./ChatsHomePage/ChatsMainContainer";
import QuestionSectionMainContainer from "./Queries_Answer/QuestionSectionMainContainer";
import SearchBarPopOutPeople from "./HomePageComponents/SearchBarPopOutPeople";
import SearchBarPopOutQueries from "./HomePageComponents/SearchBarPopOutQueries";
import { handleInputSearch } from "./general_helper/home/search";

export const Home = () => {

  const history = useHistory();
  const [popoutPeople, setPopoutPeople] = useState([]);
  const [popoutQueries, setPopoutQueries] = useState([]);

  const PopoutPeopleList = popoutPeople.map((item, index) => {
    return (
      <SearchBarPopOutPeople
        UserProfileSrc={item.profilePicture}
        key={index}
        UserProfileName={item.name}
        UserProfileDescription={item.description}
      />
    );
  });

  const PopoutQueriesList = popoutQueries.map((item, index) => {
    return (
      <SearchBarPopOutQueries SearchBarQueries={item.question} key={index} />
    );
  });

  const [userInput, setUserInput] = useState({
    searchedText: "",
  });

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
        onChangeFunction={(e) => handleInputSearch(history, userInput, setUserInput, setPopoutPeople, setPopoutQueries)(e)}
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
          <Route
            exact
            path="/home/question/:questionId"
            component={QuestionSectionMainContainer}
          />
        </Switch>
      </div>
    </div>
  );
};
export default Home;
