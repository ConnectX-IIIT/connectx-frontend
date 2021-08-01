import React from "react";
import HomeUserDetails from "./HomeUserDetails";
import HomePageCard from "./HomePageCard";
import "../../styles/HomePage/HomeMainContainer/HomeMainContainer.css";

function HomeMainContainer() {
  return (
    <div className="HomeMainContainer">
      <HomeUserDetails />
      <div>
        <HomePageCard />
        <HomePageCard />
      </div>
    </div>
  );
}

export default HomeMainContainer;
