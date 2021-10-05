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
import ReportMainContainer from "./Report/ReportMainContainer";
import { fetchUserDetails } from './ProfilePage/helper/get_user_details';
import { useStateValue } from './../helper/state_provider';

export const Home = () => {
  const history = useHistory();
  const [{ userDetails }, dispatch] = useStateValue();

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

  const [isSearchBarOpen, setIsSearchBarClicked] = useState(false);

  function openSearchBar() {
    setIsSearchBarClicked(true);
  }

  function closeSearchBar() {
    if (isSearchBarOpen) setIsSearchBarClicked(false);
  }

  useEffect(() => {
    if (!userDetails._id) {
      fetchUserDetails(history, dispatch, false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Navbar
        inputName={userInput.searchedText}
        onChangeFunction={(e) => {
          openSearchBar();
          handleInputSearch(
            history,
            userInput,
            setUserInput,
            setPopoutQueries,
            setPopoutPeople
          )(e);
        }}
        searchBarClosingFun={closeSearchBar}
        searchBarOpeningFun={openSearchBar}
        isSearchBarActive={isSearchBarOpen}
      />
      <div
        className="OnSearchDisplay"
        style={
          isSearchBarOpen
            ? {
                opacity: "1",
                zIndex: "2",
                height: "100vh",
                top: "0px",
                paddingTop: "81px",
              }
            : {
                opacity: "0",
                zIndex: "1",
                height: "0",
                top: "0px",
                paddingTop: "20px",
              }
        }
        onClick={() => closeSearchBar()}
      >
        <div
          className="SearchPopOut"
          style={
            isSearchBarOpen
              ? { display: "block", opacity: "1" }
              : {
                  opacity: "0.5",
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
      <div className="home-main-container-wrapper-wrapper ">
        <div className="home-main-report-wrapper hidden">
          <ReportMainContainer />
        </div>
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
          <Route path="/home/user/:userId" component={ProfilePage} />
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
