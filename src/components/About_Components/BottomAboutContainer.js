import React from "react";
import AboutBottomHeading from "../About_Components/AboutBottomHeading";
import ContentArray from "../../data/AboutPageContent.json";
import AboutPagePara from "../About_Components/AboutPagePara";
import "../../styles/About/BottomAboutContainer.css";

function BottomAboutContainer() {
  return (
    <div className="BottomAboutContainer">
      <div>
        <AboutBottomHeading headingContent="Objective" />
        <AboutPagePara
          content={ContentArray[1].AboutPageContent}
          paraStyle={{
            color: "rgba(0, 63, 120, 1)",
            width: "58vw",
            paddingTop: "2.25vw",
            paddingBottom: "4.5vw",
          }}
        />
      </div>
      <div>
        <AboutBottomHeading headingContent="Who are We?" />
        <AboutPagePara
          content={ContentArray[2].AboutPageContent}
          paraStyle={{
            color: "rgba(0, 63, 120, 1)",
            width: "58vw",
            paddingTop: "2.25vw",
            paddingBottom: "4.5vw",
          }}
        />
      </div>
      <AboutPagePara
        content={ContentArray[3].AboutPageContent}
        paraStyle={{
          color: "rgba(0, 63, 120, 1)",
          width: "66vw",
        }}
      />
    </div>
  );
}

export default BottomAboutContainer;
