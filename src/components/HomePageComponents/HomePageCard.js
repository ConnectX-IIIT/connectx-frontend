import React, { useState } from "react";
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
import DiscussionSection from "./DiscussionSection";

import "../../styles/HomePage/HomeMainContainer/HomePageCard.css";
import ButtonHome from "./ButtonHome";

import textDiscussion from "../../assets/home/post/bottom/ic_dicussion.svg";
import textDiscussionClick from "../../assets/home/post/bottom/h_ic_dicussion.svg";

function isJob(jobLink) {
  return (
    <div className="HomeCardButtonContainer">
      <ButtonHome
        content="APPLY NOW"
        styleButton={{
          width: "10vw",
          height: "3vw",
          fontSize: "1vw",
          margin: "0",
        }}
        jobLink={jobLink}
      />
      <div className="discussInPersonal">Discuss in Personal</div>
    </div>
  );
}

function isProject() {
  return (
    <div className="HomeCardButtonContainer">
      <div className="discussInPersonal">Discuss in Personal</div>
    </div>
  );
}

function HomePageCard({
  UserProfilePhoto,
  TimeStamp,
  PostUserName,
  PostContent,
  PostImageUrls,
  Upvotes,
  PostTitle,
  jobLink,
}) {
  const imgURL = "https://obscure-ridge-13663.herokuapp.com/user/fetch/";
  const [UpvotesHandle, setUpvotesHandle] = useState(Upvotes);
  const [UpvoteActive, setUpvoteActive] = useState(false);
  const [DownvoteActive, setDownvoteActive] = useState(false);
  const [isDiscussion, setIsDiscussion] = useState(false);

  const is_Job = true;
  const is_Project = false;

  const handlePhoto = (photo) => {
    if (photo) {
      return imgURL + photo;
    }
    return UserProfileDefaultIcon;
  };

  const handleTimestamp = (timestamp) => {
    let time = new Date(timestamp);
    let today = new Date();
    let yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
    let timeString;

    if (
      today.getDate() === time.getDate() &&
      Date.now() - timestamp < 86400000
    ) {
      timeString = "Today";
    } else if (
      yesterday.getDate() === time.getDate() &&
      Date.now() - timestamp < 172800000
    ) {
      timeString = "Yesterday";
    } else {
      timeString =
        time.getDate() +
        " " +
        time.toLocaleString("default", { month: "short" }) +
        " " +
        time.getFullYear();
    }

    return (
      timeString +
      " " +
      time.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    );
  };

  function handleUpvotes() {
    setUpvoteActive(!UpvoteActive);
    if (UpvoteActive) {
      setUpvotesHandle(UpvotesHandle - 1);
    } else {
      setUpvotesHandle(UpvotesHandle + 1);
    }
  }
  function handleDownvotes() {
    setDownvoteActive(!DownvoteActive);
    if (DownvoteActive) {
      setUpvotesHandle(UpvotesHandle + 1);
    } else {
      setUpvotesHandle(UpvotesHandle - 1);
    }
  }
  const handleReaction = (isUpvoted) => {
    if (DownvoteActive && isUpvoted) {
      handleUpvotes();
      handleDownvotes();
    } else if (UpvoteActive && !isUpvoted) {
      handleDownvotes();
      handleUpvotes();
    } else {
      if (isUpvoted) {
        handleUpvotes();
      } else {
        handleDownvotes();
      }
    }
  };
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
          onClickFunction={() => {
            handleReaction(true);
          }}
          isActive={UpvoteActive}
        />
        <div id="HomePageCardLeftContainerCount">{UpvotesHandle}</div>
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
          onClickFunction={() => {
            handleReaction(false);
          }}
          isActive={DownvoteActive}
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
                {handleTimestamp(TimeStamp)}
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
          <div className="font-manrope font-medium text-xl my-3">
            {PostTitle}
          </div>
          <HomeCardInnerContent InnerContent={PostContent} />
          {PostImageUrls.length > 0 ? (
            <CarouselHome CarouselImgs={PostImageUrls} />
          ) : null}
        </div>
        {/* <div className="HomeCardButtonContainer"> */}
        {is_Job ? isJob(jobLink) : is_Project ? isProject() : null}

        <div
          style={{
            borderTop: "2px solid #bdbfc4",
          }}
        >
          <div
            className="HomeCardDiscussion"
            onClick={() => {
              setIsDiscussion(!isDiscussion);
            }}
          >
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

        {isDiscussion ? (
          <div
            style={{
              borderTop: "2px solid rgb(189, 191, 196)",
            }}
          >
            <div>
              <DiscussionSection />
              <p className="font-manrope font-semibold ml-20 pl-1">Reply</p>
              <DiscussionSection
                discussionSectionStyle={{ marginLeft: "4vw" }}
              />
              <DiscussionSection
                discussionSectionStyle={{ marginLeft: "4vw" }}
              />
            </div>
            <DiscussionSection />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default HomePageCard;
