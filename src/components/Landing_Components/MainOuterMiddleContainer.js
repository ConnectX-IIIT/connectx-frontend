import React from "react";
import "../../styles/Landing/MainOuterMiddleContainer.css";
import MiddleContainerPhoto1 from "../../assets/landing_page/container_five/container_fivecontainer_five_2.svg";
import MiddleContainerPhoto2 from "../../assets/landing_page/container_five/container_fivecontainer_five_1.svg";
import MiddleContainerPhoto3 from "../../assets/landing_page/container_five/container_five_3.svg";
import MiddleContainerPhoto4 from "../../assets/landing_page/container_five/container_five_4.svg";

function MainOuterMiddleContainer(props) {
  return (
    <div
      style={{
        height: "49.348958333333336vw",
        width: "100%",
        backgroundColor: props.Background_color,
      }}
    >
      <h2 className="Middle_container_heading">{props.data.heading}</h2>
      <p className="Middle_container_para">{props.data.description}</p>
      <div className="image_container_middle">
        <img
          src={MiddleContainerPhoto1}
          alt="middlecontainerphoto1"
          className="MiddleContainerBoy"
        />
        <img
          src={MiddleContainerPhoto2}
          alt="middlecontainerphoto2"
          className="MiddleContainerGirl"
        />
        <img
          src={MiddleContainerPhoto3}
          alt="middlecontainerphoto3"
          className="MiddleContainerLine"
        />
        <img
          src={MiddleContainerPhoto4}
          alt="middlecontainerphoto4"
          className="MiddleContainerBlocks"
        />
      </div>
    </div>
  );
}

export default MainOuterMiddleContainer;
