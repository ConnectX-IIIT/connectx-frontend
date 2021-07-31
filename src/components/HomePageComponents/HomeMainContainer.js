import React from "react";
import HomeUserDetails from "./HomeUserDetails";
import HomePageCard from "./HomePageCard";
import "../../styles/HomePage/HomeMainContainer/HomeMainContainer.css";

function HomeMainContainer() {
  return (
    <div className="HomeMainContainer">
      <HomeUserDetails />
      <HomePageCard />
    </div>
  );
}

export default HomeMainContainer;
