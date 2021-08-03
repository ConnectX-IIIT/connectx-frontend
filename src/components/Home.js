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

export const Home = () => {
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
        isSearchBarClicked={onSearchBarClick}
        onSearchBarBlur={onSearchBarBlur}
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
            <SearchBarPopOutPeople />
            <SearchBarPopOutPeople />
            <SearchBarPopOutPeople />
          </div>
          <div className="Queries">
            <div className="queriesHeading">Queries</div>
            <SearchBarPopOutQueries />
            <SearchBarPopOutQueries />
            <SearchBarPopOutQueries />
            <SearchBarPopOutQueries />
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
