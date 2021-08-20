import React from "react";
import UserPhoto from "../../assets/_rough/Jethalal-1200.jpg";
import CoverPhoto from "../../assets/_rough/achi photo part 2.jpg";
import "../../styles/Connection/ConnectionIndividualComponent.css";

function ConnectionIndividualComponent() {
  return (
    <div className="ConnectionIndividualComponent">
      <div>
        <img src={CoverPhoto} alt="cover" />
        <img src={UserPhoto} alt="User" />
      </div>
      <div className="ConnectionIndividualComponentDetails">
        <div>Light Yagami</div>
        <div>2020-IMT</div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
        </div>
      </div>
      <button className="ConnectionIndividualComponentButton">Message</button>
    </div>
  );
}

export default ConnectionIndividualComponent;
