import React from "react";

import "../../styles/Question/QuestionSectionDiscussionSection.css";
import QuestionSectionInput from "./QuestionSectionInput";

import DefaultProfile from "../../assets/_rough/achi photo part 2.jpg";
import QuestionSectionDiscussionCard from "./QuestionSectionDiscussionCard";
import { handlePhoto } from "../HomePageComponents/helper/handle_photo";
import { useStateValue } from "../../helper/state_provider";

function QuestionSectionDiscussionSection({ comment, replies }) {

  const [{ userDetails }] = useStateValue();

  const CommentReplyList = replies.map((reply, index) => {
    return (
      <>
        <img
          src={handlePhoto(reply.userProfile, 1)}
          alt="default"
          className="question-section-discussion-section-discussion-wrapper-image"
        />
        <div>
          <QuestionSectionDiscussionCard commentData={reply} />
        </div>
      </>
    );
  });

  return (
    <div>
      <div className="question-discussion-section-answer-input-wrapper">
        <img src={handlePhoto(userDetails.profilePicture, 1)} alt="default" />
        <div>
          <QuestionSectionInput
            InputName="answer"
            // InputValue={inputValue.answer}
            PlaceholderContent="Add Something To Comments"
          // OnChangeFunction={handleInput}
          // OnSubmitFunction={handleSubmit}
          />
        </div>
      </div>
      <div>
        <div className="question-discussion-section-discussion-wrapper ">
          <img
            src={handlePhoto(comment.userProfile, 1)}
            alt="default"
            className="question-section-discussion-section-discussion-wrapper-image"
          />
          <div>
            <QuestionSectionDiscussionCard commentData={comment} />
          </div>
        </div>

        <div className="question-discussion-section-reply">
          <p className="question-discussion-section-reply-para">Reply</p>
          <div className="question-discussion-section-answer-input-wrapper">
            <img src={handlePhoto(userDetails.profilePicture, 1)} alt="default" />
            <div>
              <QuestionSectionInput
                InputName="answer"
                // InputValue={inputValue.answer}
                PlaceholderContent="Add Something To Reply"
              // OnChangeFunction={handleInput}
              // OnSubmitFunction={handleSubmit}
              />
            </div>
          </div>
          <div className="question-discussion-section-discussion-wrapper ">
            {CommentReplyList}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionSectionDiscussionSection;
