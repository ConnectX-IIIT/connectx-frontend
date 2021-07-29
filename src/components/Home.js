import React from "react";
import Navbar from "./HomePageComponents/Navbar";
import HomeMainContainer from "../components/HomePageComponents/HomeMainContainer";
import QueriesMainConatiner from "../components/HomePageComponents/QueriesMainConatiner";

import "../styles/HomePage/HomePage.css";

export const Home = () => {
  return (
    <div>
      <Navbar />
      <HomeMainContainer />
      <QueriesMainConatiner />
    </div>
  );
};
export default Home;
