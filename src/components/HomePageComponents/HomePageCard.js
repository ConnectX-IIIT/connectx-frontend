import React from "react";
import ImgStackHome from "./ImgStackHome";
import CarouselHome from "./CarouselHome";

import homeUpvoteIcon from "../../assets/home/post/upvotes/ic_upvote.svg";
import homeUpvoteIconHover from "../../assets/home/post/upvotes/h_ic_upvote.svg";
import homeUpvoteIconSelected from "../../assets/home/post/upvotes/s_ic_upvote.svg";

import homeDownvoteIcon from "../../assets/home/post/upvotes/ic_downvote.svg";
import homeDownvoteIconHover from "../../assets/home/post/upvotes/h_ic_downvote.svg";
import homeDownvoteIconSelected from "../../assets/home/post/upvotes/s_ic_downvote.svg";

import HomeCardInnerContent from "./HomeCardInnerContent";
import UserProfileDefaultIcon from "../../assets/profile/user_profile_default_icon.svg";
import DotImageHome from "../../assets/home/post/body/info/ic_info_dots.svg";

import "../../styles/HomePage/HomeMainContainer/HomePageCard.css";
import ButtonHome from "./ButtonHome";

import textDiscussion from "../../assets/home/post/bottom/ic_dicussion.svg";
import textDiscussionClick from "../../assets/home/post/bottom/d_ic_dicussion.svg";

function HomePageCard({
  UserProfilePhoto,
  TimeStamp,
  PostUserName,
  PostContent,
  PostImageUrls,
  Upvotes,
}) {
  const imgURL = "https://obscure-ridge-13663.herokuapp.com/user/fetch/";

  const handlePhoto = (photo) => {

    if (photo) {
      return imgURL + photo
    }
    return UserProfileDefaultIcon;
  }

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
        <div id="HomePageCardLeftContainerCount">{Upvotes}</div>
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
        <div
          style={{
            paddingLeft: "1.5vw",
            paddingRight: "1.5vw",
          }}
        >
          <div id="PostDetailsContainer">
            <img
              src={handlePhoto(UserProfilePhoto)}
              alt="Userprofile"
              style={{
                width: "3vw",
                height: "3vw",
                objectFit: "cover",
                margin: "auto",
                marginLeft: "0",
                borderRadius: "50%",
              }}
            />
            <div id="PostDetailsContainerTitle">
              <div>
                <div
                  style={{
                    display: "inline",
                    width: "20%",
                    color: "#000000",
                    fontWeight: "500",
                    fontSize: "1.2vw",
                    marginRight: "10px",
                  }}
                >
                  {PostUserName}
                </div>
              </div>
              <div
                style={{
                  color: " #A7A7A7",
                  fontWeight: "500",
                  fontSize: "0.9vw",
                }}
              >
                {TimeStamp}
              </div>
            </div>
            <img
              src={DotImageHome}
              alt="dot"
              style={{
                margin: "auto",
              }}
            />
          </div>

          <HomeCardInnerContent InnerContent={PostContent} />
          <CarouselHome CarouselImgs={PostImageUrls} />
        </div>
        <div className="HomeCardButtonContainer">
          <ButtonHome
            content="APPLY NOW"
            styleButton={{
              width: "10vw",
              height: "3vw",
              fontSize: "1vw",
              margin: "0",
            }}
          />
          <div className="discussInPersonal">Discuss in Personal</div>
        </div>

        <div className="HomeCardDiscussion">
          <img
            src={textDiscussion}
            alt="message"
            style={{
              marginRight: "0.5vw",
            }}
          />
          Discussion
        </div>
      </div>
    </div>
  );
}

export default HomePageCard;
