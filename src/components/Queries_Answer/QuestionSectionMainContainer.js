import React from "react";
import "../../styles/Question/QuestionSectionMainContainer.css";

import DefaultProfile from "../../assets/_rough/achi photo part 2.jpg";

import UpvotesSection from "./UpvotesSection";
import QuestionSectionButtons from "./QuestionSectionButtons";
import QuestionSectionUserprofile from "./QuestionSectionUserprofile";

function QuestionSectionQuestion() {
  return (
    <div className="question-section-question-wrapper">
      <div className="question-section-question">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, voluptates?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, voluptates?
      </div>
      <div className="question-section-question-bottom">
        <QuestionSectionButtons />
        <QuestionSectionUserprofile
          UserName="Harshil Piro"
          TimeStamp="1:34PM"
          ProfilePhoto={DefaultProfile}
          imgOrder="1"
        />
      </div>
    </div>
  );
}

function QuestionSectionMainContainer() {
  return (
    <div className="question-section-main-container">
      <div className="question-section-question-wrapper-wrapper">
        <UpvotesSection />
        <QuestionSectionQuestion />
      </div>
    </div>
  );
}

export default QuestionSectionMainContainer;
