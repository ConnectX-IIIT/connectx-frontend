import React from "react";
import "../../styles/Connection/ConnectionMainContainer.css";
import ConnectionIndividualComponent from "./ConnectionIndividualComponent";

function ConnectionMainContainer() {
  return (
    <div className="ConnectionMainContainer">
      <div className="ConnectionMainContainerInnerContainer">
        <ConnectionIndividualComponent />
        <ConnectionIndividualComponent />
        <ConnectionIndividualComponent />
        <ConnectionIndividualComponent />
        <ConnectionIndividualComponent />
        <ConnectionIndividualComponent />
        <ConnectionIndividualComponent />
        <ConnectionIndividualComponent />
        <ConnectionIndividualComponent />
        <ConnectionIndividualComponent />
        <ConnectionIndividualComponent />
      </div>
    </div>
  );
}

export default ConnectionMainContainer;
