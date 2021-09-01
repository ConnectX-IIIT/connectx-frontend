import React from "react";

import "../../styles/Question/QuestionSectionDiscussionSection.css";
import QuestionSectionInput from "./QuestionSectionInput";

import DefaultProfile from "../../assets/_rough/achi photo part 2.jpg";
import QuestionSectionDiscussionCard from "./QuestionSectionDiscussionCard";

function QuestionSectionDiscussionSection() {
  return (
    <div>
      <div className="question-discussion-section-answer-input-wrapper">
        <img src={DefaultProfile} alt="default" />
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
            src={DefaultProfile}
            alt="default"
            className="question-section-discussion-section-discussion-wrapper-image"
          />
          <div>
            <QuestionSectionDiscussionCard />
          </div>
        </div>

        <div className="question-discussion-section-reply">
          <p className="question-discussion-section-reply-para">Reply</p>
          <div className="question-discussion-section-answer-input-wrapper">
            <img src={DefaultProfile} alt="default" />
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
            <img
              src={DefaultProfile}
              alt="default"
              className="question-section-discussion-section-discussion-wrapper-image"
            />
            <div>
              <QuestionSectionDiscussionCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionSectionDiscussionSection;
