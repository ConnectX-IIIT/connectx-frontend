import React from "react";
import ImgStackHome from "./ImgStackHome";
import CarouselHome from "./CarouselHome";

import homeUpvoteIcon from "../../assets/home/post/upvotes/ic_upvote.svg";
import homeUpvoteIconHover from "../../assets/home/post/upvotes/h_ic_upvote.svg";
import homeUpvoteIconSelected from "../../assets/home/post/upvotes/s_ic_upvote.svg";

import homeDownvoteIcon from "../../assets/home/post/upvotes/ic_downvote.svg";
import homeDownvoteIconHover from "../../assets/home/post/upvotes/h_ic_downvote.svg";
import homeDownvoteIconSelected from "../../assets/home/post/upvotes/s_ic_downvote.svg";

import "../../styles/HomePage/HomeMainContainer/HomePageCard.css";

function HomePageCard() {
  return (
    <div className="HomePageCard">
      <div id="HomePageCardLeftContainer">
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
        />
        <div id="HomePageCardLeftContainerCount">15</div>
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

      <div id="HomePageCardRightContainer">
        <CarouselHome />
      </div>
    </div>
  );
}

export default HomePageCard;
