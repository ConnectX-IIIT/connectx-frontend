import React, { useState } from "react";

import "../../styles/Question/QuestionSectionDiscussionSection.css";
import QuestionSectionInput from "./QuestionSectionInput";

import QuestionSectionDiscussionCard from "./QuestionSectionDiscussionCard";
import { handlePhoto } from "../HomePageComponents/helper/handle_photo";
import { useStateValue } from "../../helper/state_provider";
import { addComment } from "./helper/add_comment";
import { useHistory } from "react-router";

function QuestionSectionDiscussionSection({ comment, replies, answerId }) {

  const history = useHistory();
  const [{ userDetails }] = useStateValue();
  const [commentContent, setCommentContent] = useState("");

  const handleInput = (e) => {
    let value = e.target.value;
    setCommentContent(value);
  };

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
          <p
            className="question-discussion-section-reply-para"
            onClick={() => {
              document.getElementById(comment._id).classList.toggle("hidden");
            }}
          >
            Reply
          </p>
          <div>
            <div className="question-discussion-section-answer-input-wrapper hidden" id={comment._id} >
              <img
                src={handlePhoto(userDetails.profilePicture, 1)}
                alt="default"
              />
              <div>
                <QuestionSectionInput
                  InputName="content"
                  InputValue={commentContent}
                  PlaceholderContent="Add Something To Reply"
                  OnChangeFunction={handleInput}
                  OnSubmitFunction={(e) => addComment(userDetails, history, commentContent, answerId, comment._id, setCommentContent)(e)}
                />
              </div>
            </div>
            <div className="question-discussion-section-discussion-wrapper ">
              {CommentReplyList}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionSectionDiscussionSection;
