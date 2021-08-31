import React from "react";

import ImgStackHome from "../HomePageComponents/ImgStackHome";
import "../../styles/Question/UpvotesSection.css";

import homeUpvoteIcon from "../../assets/home/post/upvotes/ic_upvote.svg";
import homeUpvoteIconHover from "../../assets/home/post/upvotes/h_ic_upvote.svg";
import homeUpvoteIconSelected from "../../assets/home/post/upvotes/s_ic_upvote.svg";

import homeDownvoteIcon from "../../assets/home/post/upvotes/ic_downvote.svg";
import homeDownvoteIconHover from "../../assets/home/post/upvotes/h_ic_downvote.svg";
import homeDownvoteIconSelected from "../../assets/home/post/upvotes/s_ic_downvote.svg";

function UpvotesSection() {
  return (
    <div className="upvote-section-main-container">
      <ImgStackHome
        normalImageSrc={homeUpvoteIcon}
        hoverImageSrc={homeUpvoteIconHover}
        activeImageSrc={homeUpvoteIconSelected}
        styleImgStack={{
          transitionDuration: "0.2s",
          width: "2vw",
          height: "2vw",
        }}
        styleImgContainer={{ margin: "0", width: "2vw", height: "2vw" }}
        isActive
      />
      <div className="upvote-section-vote-count">15</div>
      <ImgStackHome
        normalImageSrc={homeDownvoteIcon}
        hoverImageSrc={homeDownvoteIconHover}
        activeImageSrc={homeDownvoteIconSelected}
        styleImgStack={{
          transitionDuration: "0.2s",
          width: "2vw",
          height: "2vw",
        }}
        styleImgContainer={{ margin: "0", width: "2vw", height: "2vw" }}
      />
    </div>
  );
}

export default UpvotesSection;
