import React from "react";
import HomeCardInnerContent from "../HomePageComponents/HomeCardInnerContent";
import UpvotesSection from "./UpvotesSection";

import "../../styles/Question/QuestionSectionDiscussionCard.css";

function QuestionSectionDiscussionCard() {
  return (
    <div className="question-section-discussion-card-wrapper">
      <div className="question-section-discussion-left-card-wrapper">
        <UpvotesSection />
      </div>
      <div>
        <div className="question-section-discussion-right-card-wrapper">
          <p>Harshil Piro</p>
          <p>15:34</p>
        </div>
        <div className="question-section-discussion-content-wrapper">
          <HomeCardInnerContent
            InnerContent="hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello "
            styleInnerContent={{
              lineHeight: "initial",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default QuestionSectionDiscussionCard;
