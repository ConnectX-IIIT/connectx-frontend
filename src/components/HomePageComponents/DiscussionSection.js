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
import DotImageHome from "../../assets/home/post/body/info/ic_info_dots.svg";
import EditButtomImage from "../../assets/home/post/menu/ic_edit_post.svg";
import DeleteButtomImage from "../../assets/home/post/menu/ic_delete_post.svg";
import ReportButtomImage from "../../assets/home/post/menu/ic_report_post.svg";
import { handleDeletePost } from "./helper/delete_post";

function MoreOptionHomePageCard({ Image, content, style, onClickFunction }) {
  return (
    <div
      className="flex items-center pl-2 rounded-md mb-2 cursor-pointer"
      style={style}
      onClick={onClickFunction}
    >
      <img src={Image} alt="MoreOption" className="w-6 object-contain mr-1" />
      <p
        className="font-manrope font-semibold"
        style={{
          fontSize: "1.25vw",
        }}
      >
        {content}
      </p>
    </div>
  );
}

function DiscussionSection({
  InnerContentDiscussion,
  UserName,
  userProfile,
  timestamp,
  discussionId,
  upvotes,
  userId,
  key,
  isDiscussion,
  discussionData,
  setDiscussionData
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
  }, [userDetails]);  // eslint-disable-line react-hooks/exhaustive-deps

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
            position: "relative",
          }}
        >
          <div
            className="absolute hidden"
            id={`${discussionId}MoreOption`}
            style={{ right: "0", top: "2.5vw", width: "7.34vw" }}
          >
            {userId === userDetails?._id ? (
              <>
                <MoreOptionHomePageCard
                  Image={EditButtomImage}
                  content="Edit"
                  style={{
                    color: "#38ABF0",
                    backgroundColor: "#DDF2FF",
                  }}
                />
                <MoreOptionHomePageCard
                  Image={DeleteButtomImage}
                  content="Delete"
                  style={{
                    color: "#FF6969",
                    backgroundColor: "#FFEDED",
                  }}
                  onClickFunction={() => handleDeletePost(userDetails, discussionId, history, discussionData, setDiscussionData, "discussion", isDiscussion, key)}
                />
              </>
            ) : (
              <MoreOptionHomePageCard
                Image={ReportButtomImage}
                content="Report"
                style={{
                  color: "#FFA800",
                  backgroundColor: "#FEF5E5",
                }}
                onClickFunction={() => {
                  document
                    .getElementsByClassName("home-main-report-wrapper")[0]
                    .classList.toggle("hidden");
                }}
              />
            )}
          </div>
          <div
            className="mt-4 mb-2"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ width: "96%" }}>
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
            <img
              src={DotImageHome}
              alt="dot"
              style={{
                margin: "auto",
              }}
              className="cursor-pointer"
              onClick={() => {
                var element = document.getElementById(
                  `${discussionId}MoreOption`
                );
                element.classList.toggle("hidden");
              }}
            />
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
