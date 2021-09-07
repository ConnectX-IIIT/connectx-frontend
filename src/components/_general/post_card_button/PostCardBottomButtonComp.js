import React from "react";
import { ReactComponent as DefaultSVGComp } from '../../../assets/home/post/bottom/ic_dicussion.svg';


function PostCardBottomButtonComp({
  svgComponent,
  buttonName,
  primaryColors,
  secondaryColors,
  subPrimaryColors,
}) {
  return (
    <div className="post-card-bottom-button-comp-primary-wrapper">
      <div className="post-card-bottom-button-comp-primary-svg-wrapper">
        {svgComponent}
      </div>
      <div className="post-card-bottom-button-comp-primary-text-wrapper"></div>
    </div>
  );
}

export default PostCardBottomButtonComp;
