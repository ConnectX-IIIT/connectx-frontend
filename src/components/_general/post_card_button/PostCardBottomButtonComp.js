import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as DefaultSVGComp } from "../../../assets/home/post/bottom/ic_dicussion.svg";
import "../.././../styles/_general/post_card_button/PostCardBottomButtonComp.css";
import setButtonColorsHook from "./helper/colorSetter";
import setStatusAccToIActivityStatus from "./helper/buttonStatusSetterAccToIActivityStatus";
import reactDom from "react-dom";
function PostCardBottomButtonComp({
  svgComponent,
  buttonName,
  colorsSet,
  isActive,
  onClickFunction,
}) {
  const [currentButtonColorsState, setCurrentButtonColorsState] =
    useState("INACTIVE");
  const [currentColors, setCurrentColors] = useState({
    primary: colorsSet.inactiveColors.primary,
    secondary: colorsSet.inactiveColors.secondary,
  });

  const svgContaineDiv = useRef(123456);

  useEffect(() => {
    updatedSVGComponentPathFill(
      reactDom.findDOMNode(svgContaineDiv.current).childNodes[0],
      currentColors.primary
    );
  }, [currentColors]);

  useEffect(() => {
    setButtonColorsHook(currentButtonColorsState, colorsSet, setCurrentColors);
  }, [currentButtonColorsState]);

  useEffect(() => {
    setStatusAccToIActivityStatus(isActive, setCurrentButtonColorsState);
  }, [isActive]);

  const updatedSVGComponentPathFill = (svgNode, colorHashCode) => {
    let svgPahts = svgNode.childNodes;
    for (let i = 0; i < svgPahts.length; i++) {
      svgPahts[i].setAttribute("fill", colorHashCode);
    }
  };

  function handleMouseEnterForButtonWrapper() {
    if (!isActive) {
      setCurrentButtonColorsState("HOVER");
    }
  }
  function handleMouseLeaveForButtonWrapper() {
    if (currentButtonColorsState === "HOVER") {
      setStatusAccToIActivityStatus(isActive, setCurrentButtonColorsState);
    }
  }

  return (
    <div
      className="post-card-bottom-button-comp-primary-wrapper"
      style={{
        backgroundColor: currentColors.secondary,
      }}
      onMouseOver={() => {
        handleMouseEnterForButtonWrapper();
      }}
      onMouseLeave={() => {
        handleMouseLeaveForButtonWrapper();
      }}
      onClick={() => {
        onClickFunction();
      }}
    >
      <div
        className="post-card-bottom-button-comp-primary-svg-wrapper"
        ref={svgContaineDiv}
      >
        {svgComponent}
      </div>
      <div
        className="post-card-bottom-button-comp-primary-text-wrapper"
        style={{
          color: currentColors.primary,
        }}
      >
        {buttonName}
      </div>
    </div>
  );
}

export default PostCardBottomButtonComp;

PostCardBottomButtonComp.defaultProps = {
  svgComponent: <DefaultSVGComp />,
  buttonName: "Discussion",
  colorsSet: {
    activeColors: {
      primary: "#00CA51",
      secondary: "#E8FFEB",
    },
    inactiveColors: {
      primary: "#222222",
      secondary: "#F5F5F5",
    },
    hoverColors: {
      primary: "#5CDA8E",
      secondary: "#F2FFF3",
    },
  },
};
