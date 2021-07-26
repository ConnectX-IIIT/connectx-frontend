import React from "react";
import AboutPagePara from "../About_Components/AboutPagePara";
import ContentArray from "../../data/AboutPageContent.json";
import "../../styles/About/TopAboutContainer.css";

function TopAboutContainer() {
  return (
    <div className="TopAboutContainer">
      <h1 className="TopAboutContainerHeading">About Connect-X</h1>
      <AboutPagePara
        content={ContentArray[0].AboutPageContent}
        paraStyle={{
          color: "#000000",
          width: "33vw",
        }}
      />
    </div>
  );
}

export default TopAboutContainer;
