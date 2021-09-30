import React, { useEffect, useState } from "react";

import ImgStackHome from "../HomePageComponents/ImgStackHome";
import "../../styles/Question/UpvotesSection.css";

import homeUpvoteIcon from "../../assets/home/post/upvotes/ic_upvote.svg";
import homeUpvoteIconHover from "../../assets/home/post/upvotes/h_ic_upvote.svg";
import homeUpvoteIconSelected from "../../assets/home/post/upvotes/s_ic_upvote.svg";

import homeDownvoteIcon from "../../assets/home/post/upvotes/ic_downvote.svg";
import homeDownvoteIconHover from "../../assets/home/post/upvotes/h_ic_downvote.svg";
import homeDownvoteIconSelected from "../../assets/home/post/upvotes/s_ic_downvote.svg";
import { useStateValue } from "../../helper/state_provider";
import { updateUpvotes } from "../HomePageComponents/helper/update_upvotes";
import { useHistory } from "react-router";

function UpvotesSection({ upvotes, Id, type }) {
  const history = useHistory();
  const [{ userDetails }, dispatch] = useStateValue();
  const [UpvotesHandle, setUpvotesHandle] = useState(upvotes);
  const [UpvoteActive, setUpvoteActive] = useState(false);
  const [DownvoteActive, setDownvoteActive] = useState(false);

  useEffect(() => {
    setUpvotesHandle(upvotes);
  }, [upvotes]);

  useEffect(() => {
    if (type === "question") {
      if (
        userDetails.upvotedQuestions &&
        userDetails.upvotedQuestions.includes(`${Id}`)
      ) {
        setUpvoteActive(true);
      }

      if (
        userDetails.downvotedQuestions &&
        userDetails.downvotedQuestions.includes(`${Id}`)
      ) {
        setDownvoteActive(true);
      }
    } else if (type === "answer") {
      if (
        userDetails.upvotedAnswers &&
        userDetails.upvotedAnswers.includes(`${Id}`)
      ) {
        setUpvoteActive(true);
      }

      if (
        userDetails.downvotedAnswers &&
        userDetails.downvotedAnswers.includes(`${Id}`)
      ) {
        setDownvoteActive(true);
      }
    } else if (type === "comment") {
      if (
        userDetails.upvotedComments &&
        userDetails.upvotedComments.includes(`${Id}`)
      ) {
        setUpvoteActive(true);
      }

      if (
        userDetails.downvotedComments &&
        userDetails.downvotedComments.includes(`${Id}`)
      ) {
        setDownvoteActive(true);
      }
    }
  }, [userDetails]);  // eslint-disable-line react-hooks/exhaustive-deps

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
        onClickFunction={() => {
          updateUpvotes(
            userDetails,
            history,
            dispatch,
            Id,
            UpvoteActive,
            DownvoteActive,
            setUpvoteActive,
            setDownvoteActive,
            UpvotesHandle,
            setUpvotesHandle,
            true,
            type
          );
        }}
        isActive={UpvoteActive}
      />
      <div className="upvote-section-vote-count">{UpvotesHandle}</div>
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
          updateUpvotes(
            userDetails,
            history,
            dispatch,
            Id,
            UpvoteActive,
            DownvoteActive,
            setUpvoteActive,
            setDownvoteActive,
            UpvotesHandle,
            setUpvotesHandle,
            false,
            type
          );
        }}
        isActive={DownvoteActive}
      />
    </div>
  );
}

export default UpvotesSection;
