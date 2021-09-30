import React, { useEffect, useState } from "react";
import "../../styles/Question/QuestionSectionCard.css";
import QuestionSectionUserprofile from "./QuestionSectionUserprofile";
import UpvotesSection from "./UpvotesSection";
import HomeCardInnerContent from "./../HomePageComponents/HomeCardInnerContent";
import QuestionSectionButtons from "./QuestionSectionButtons";

import QuestionSectionDiscussionSection from "./QuestionSectionDiscussionSection";
import { convertTimestamp } from "../HomePageComponents/helper/convert_timestamp";
import { handlePhoto } from "../HomePageComponents/helper/handle_photo";
import { useHistory } from "react-router";
import { fetchComments } from "./helper/fetch_comments";
import QuestionSectionInput from "./QuestionSectionInput";
import { useStateValue } from "../../helper/state_provider";
import { addComment } from "./helper/add_comment";

function QuestionSectionCard({ answer }) {
  const history = useHistory();
  const [{ userDetails }] = useStateValue();
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");

  const handleInput = (e) => {
    let value = e.target.value;
    setCommentContent(value);
  };

  useEffect(() => {
    fetchComments(history, answer.comments, setComments);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const CommentList = comments.map((item, index) => {
    return (
      <QuestionSectionDiscussionSection
        comment={item.comment}
        replies={item.reply}
        answerId={answer._id}
      />
    );
  });

  return (
    <div className="question-section-card-wrapper">
      <div className="question-section-card-left-wrapper">
        <UpvotesSection
          upvotes={answer.upvotes}
          type="answer"
          Id={answer._id}
        />
      </div>
      <div className="question-section-card-right-wrapper">
        <div className="question-section-card-user-profile">
          <QuestionSectionUserprofile
            UserName={answer.userName}
            TimeStamp={convertTimestamp(answer.timestamp)}
            ProfilePhoto={handlePhoto(answer.userProfile, 1)}
          />
        </div>
        <div className="question-section-read-more-wrapper">
          <HomeCardInnerContent
            styleInnerContent={{
              lineHeight: "initial",
            }}
            InnerContent={answer.answer}
          />
        </div>
        <div className="question-section-card-bottom-wrapper">
          <div
            onClick={() => {
              document.getElementById(answer._id).classList.toggle("hidden");
            }}
          >
            <QuestionSectionButtons buttonType="comment" />
          </div>
          <div>
            <QuestionSectionButtons />
          </div>
        </div>
        <div
          id={answer._id}
          className="hidden question-discussion-section-answer-input-wrapper-wrapper"
        >
          <div className="question-discussion-section-answer-input-wrapper">
            <img
              src={handlePhoto(userDetails.profilePicture, 1)}
              alt="default"
            />
            <div>
              <QuestionSectionInput
                InputName="content"
                InputValue={commentContent}
                PlaceholderContent="Add Something To Comments"
                OnChangeFunction={handleInput}
                OnSubmitFunction={(e) =>
                  addComment(
                    userDetails,
                    history,
                    commentContent,
                    answer._id,
                    "",
                    setCommentContent
                  )(e)
                }
              />
            </div>
          </div>
          {CommentList}
        </div>
      </div>
    </div>
  );
}

export default QuestionSectionCard;
