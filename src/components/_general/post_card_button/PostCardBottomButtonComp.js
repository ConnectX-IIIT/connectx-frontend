import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as DefaultSVGComp } from "../../../assets/home/post/bottom/ic_discussion.svg";
import "../.././../styles/_general/post_card_button/PostCardBottomButtonComp.css";
import setButtonColorsHook from "./helper/colorSetter";
import {
  setStatusAccToIActivityStatus,
  setStatusAccToIActivityStatusForMouseLeave,
} from "./helper/buttonStatusSetterAccToIActivityStatus";
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
  const [isBeingHovered, setIsBeingHovered] = useState(false);

  const svgContaineDiv = useRef(123456);

  useEffect(() => {
    updatedSVGComponentPathFill(
      reactDom.findDOMNode(svgContaineDiv.current).childNodes[0],
      currentColors.primary
    );
  }, [currentColors, colorsSet]);

  useEffect(() => {
    setButtonColorsHook(currentButtonColorsState, colorsSet, setCurrentColors);
  }, [currentButtonColorsState]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setStatusAccToIActivityStatus(
      isActive,
      isBeingHovered,
      setCurrentButtonColorsState
    );
  }, [isActive]); // eslint-disable-line react-hooks/exhaustive-deps

  const updatedSVGComponentPathFill = (svgNode, colorHashCode) => {
    let svgPahts = svgNode.childNodes;
    for (let i = 0; i < svgPahts.length; i++) {
      svgPahts[i].setAttribute("fill", colorHashCode);
    }
  };

  function handleMouseEnterForButtonWrapper() {
    setIsBeingHovered(true);
    if (!isActive) {
      setCurrentButtonColorsState("HOVER");
    }
  }
  function handleMouseLeaveForButtonWrapper() {
    setIsBeingHovered(false);
    if (currentButtonColorsState === "HOVER") {
      setStatusAccToIActivityStatusForMouseLeave(
        isActive,
        setCurrentButtonColorsState
      );
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
