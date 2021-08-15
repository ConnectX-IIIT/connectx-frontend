import React, { useEffect, useState } from "react";
import ImgStackHome from "./ImgStackHome";

import homeUpvoteIcon from "../../assets/home/post/upvotes/ic_upvote.svg";
import homeUpvoteIconHover from "../../assets/home/post/upvotes/h_ic_upvote.svg";
import homeUpvoteIconSelected from "../../assets/home/post/upvotes/s_ic_upvote.svg";

import homeDownvoteIcon from "../../assets/home/post/upvotes/ic_downvote.svg";
import homeDownvoteIconHover from "../../assets/home/post/upvotes/h_ic_downvote.svg";
import homeDownvoteIconSelected from "../../assets/home/post/upvotes/s_ic_downvote.svg";

import UserProfile from "../../assets/profile/user_profile_default_icon.svg";
import HomeCardInnerContent from "./HomeCardInnerContent";
import Cookies from "js-cookie";
import instance from "../../helper/axios";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../helper/state_provider";

function DiscussionSection({
  InnerContentDiscussion,
  UserName,
  userProfile,
  timestamp,
  discussionId,
  upvotes
}) {

  const history = useHistory();
  const [{ userDetails }, dispatch] = useStateValue(false);
  const [UpvotesHandle, setUpvotesHandle] = useState(upvotes);
  const [UpvoteActive, setUpvoteActive] = useState(false);
  const [DownvoteActive, setDownvoteActive] = useState(false);
  const imgURL = "https://obscure-ridge-13663.herokuapp.com/user/fetch/";

  useEffect(() => {
    if (
      userDetails.upvotedDiscussions &&
      userDetails.upvotedDiscussions.includes(`${discussionId}`)
    ) {
      setUpvoteActive(true);
    }

    if (
      userDetails.downvotedDiscussions &&
      userDetails.downvotedDiscussions.includes(`${discussionId}`)
    ) {
      setDownvoteActive(true);
    }
  }, [userDetails]);

  async function updateReactions(type) {
    try {
      const token = Cookies.get("token");

      if (token) {
        await instance.post(
          `/discussion/vote/${type}`,
          {
            discussionId,
          },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
      } else {
        history.replace("/signin");
      }
    } catch (error) {
      if (error.response.status === 500 || error.response.status === 400) {
        return alert(`Server error occured!`);
      }
      return alert(`Your session has expired, please login again!`);
    }
  }

  const handlePhoto = (photo) => {
    if (photo) {
      return imgURL + photo;
    }
    return UserProfile;
  };

  async function handleUpvotes() {
    setUpvoteActive(!UpvoteActive);
    if (UpvoteActive) {
      await updateReactions(2);
      upvotes = upvotes - 1;
      setUpvotesHandle(upvotes);
    } else {
      await updateReactions(1);
      upvotes = upvotes + 1;
      setUpvotesHandle(upvotes);
    }
  }

  async function handleDownvotes() {
    setDownvoteActive(!DownvoteActive);
    if (DownvoteActive) {
      await updateReactions(4);
      upvotes = upvotes + 1;
      setUpvotesHandle(upvotes);
    } else {
      const upvotes = await updateReactions(3);
      upvotes = upvotes - 1;
      setUpvotesHandle(upvotes);
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
    <div className="flex pt-4">
      <img
        src={UserProfile}
        alt="userprofile"
        className="object-cover w-10 h-10 mx-5 rounded-full"
      />
      <div className="HomePageCard ml-0 mr-2">
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
            styleImgContainer={{ margin: "0", width: "1.5vw", height: "2vw" }}
            onClickFunction={() => {
              handleReaction(true);
            }}
            isActive={UpvoteActive}
          />
          <div
            id="HomePageCardLeftContainerCount"
            className="text-base leading-3"
          >
            {UpvotesHandle}
          </div>
          <ImgStackHome
            normalImageSrc={homeDownvoteIcon}
            hoverImageSrc={homeDownvoteIconHover}
            activeImageSrc={homeDownvoteIconSelected}
            styleImgStack={{
              transitionDuration: "0.2s",
              width: "2vw",
              height: "2vw",
            }}
            styleImgContainer={{ margin: "0", width: "1.5vw", height: "2vw" }}
            onClickFunction={() => {
              handleReaction(false);
            }}
            isActive={DownvoteActive}
          />
        </div>
        <div
          id="HomePageCardRightContainer"
          style={{
            paddingLeft: "1vw",
            paddingRight: "1vw",
          }}
        >
          <div className="mt-4 mb-2">
            <h2 className="font-manrope font-medium inline text-lg mr-3">
              {UserName}
            </h2>
            <p
              className="font-manrope inline text-xs font-semibold"
              style={{
                color: "#999999",
              }}
            >
              {timestamp}
            </p>
          </div>
          <HomeCardInnerContent
            InnerContent={InnerContentDiscussion}
            styleInnerContent={{ fontSize: "1rem" }}
          />
        </div>
      </div>
    </div>
  );
}

export default DiscussionSection;
