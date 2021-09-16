import React, { useEffect, useState } from "react";
import ImgStackHome from "./ImgStackHome";

import homeUpvoteIcon from "../../assets/home/post/upvotes/ic_upvote.svg";
import homeUpvoteIconHover from "../../assets/home/post/upvotes/h_ic_upvote.svg";
import homeUpvoteIconSelected from "../../assets/home/post/upvotes/s_ic_upvote.svg";

import homeDownvoteIcon from "../../assets/home/post/upvotes/ic_downvote.svg";
import homeDownvoteIconHover from "../../assets/home/post/upvotes/h_ic_downvote.svg";
import homeDownvoteIconSelected from "../../assets/home/post/upvotes/s_ic_downvote.svg";
import HomeCardInnerContent from "./HomeCardInnerContent";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../helper/state_provider";
import { handlePhoto } from "./helper/handle_photo";
import { updateUpvotes } from "./helper/update_upvotes";

function DiscussionSection({
  InnerContentDiscussion,
  UserName,
  userProfile,
  timestamp,
  discussionId,
  upvotes,
}) {
  const history = useHistory();
  const [{ userDetails }, dispatch] = useStateValue();
  const [UpvotesHandle, setUpvotesHandle] = useState(upvotes);
  const [UpvoteActive, setUpvoteActive] = useState(false);
  const [DownvoteActive, setDownvoteActive] = useState(false);

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

  return (
    <div className="flex pt-4">
      <img
        src={handlePhoto(userProfile, 1)}
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
              updateUpvotes(
                userDetails,
                history,
                dispatch,
                discussionId,
                UpvoteActive,
                DownvoteActive,
                setUpvoteActive,
                setDownvoteActive,
                UpvotesHandle,
                setUpvotesHandle,
                true,
                "discussion"
              );
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
              updateUpvotes(
                userDetails,
                history,
                dispatch,
                discussionId,
                UpvoteActive,
                DownvoteActive,
                setUpvoteActive,
                setDownvoteActive,
                UpvotesHandle,
                setUpvotesHandle,
                false,
                "discussion"
              );
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
            {/* <div>hello</div> */}
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
