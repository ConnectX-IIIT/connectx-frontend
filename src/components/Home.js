import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./HomePageComponents/Navbar";
import HomeMainContainer from "../components/HomePageComponents/HomeMainContainer";
import QueriesMainConatiner from "../components/HomePageComponents/QueriesMainConatiner";

import "../styles/HomePage/HomePage.css";
import ConnectionMainContainer from "./HomePageComponents/ConnectionMainContainer";
import MessageMainContainer from "./HomePageComponents/MessageMainContainer";

export const Home = () => {
  return (
    <div>
      <Navbar />

      <Switch>
        <Route exact path="/home" component={HomeMainContainer} />
        <Route exact path="/home/queries" component={QueriesMainConatiner} />
        <Route
          exact
          path="/home/connection"
          component={ConnectionMainContainer}
        />
        <Route exact path="/home/message" component={MessageMainContainer} />
      </Switch>
    </div>
  );
};
export default Home;
