import React from "react";

import DefaultProfile from "../../assets/_rough/achi photo part 2.jpg";

import "../../styles/Question/QuestionSectionCard.css";
import QuestionSectionUserprofile from "./QuestionSectionUserprofile";
import UpvotesSection from "./UpvotesSection";
import HomeCardInnerContent from "./../HomePageComponents/HomeCardInnerContent";
import QuestionSectionButtons from "./QuestionSectionButtons";

import QuestionSectionDiscussionSection from "./QuestionSectionDiscussionSection";

function QuestionSectionCard() {
  return (
    <div className="question-section-card-wrapper">
      <div className="question-section-card-left-wrapper">
        <UpvotesSection />
      </div>
      <div className="question-section-card-right-wrapper">
        <div className="question-section-card-user-profile">
          <QuestionSectionUserprofile
            UserName="Harshil Piro"
            TimeStamp="15:34 PM"
            ProfilePhoto={DefaultProfile}
          />
        </div>
        <div className="question-section-read-more-wrapper">
          <HomeCardInnerContent
            styleInnerContent={{
              lineHeight: "initial",
            }}
            InnerContent="Hello Everyone"
          />
        </div>
        <div className="question-section-card-bottom-wrapper">
          <div>
            <QuestionSectionButtons buttonType="comment" />
          </div>
          <div>
            <QuestionSectionButtons />
          </div>
        </div>
        <QuestionSectionDiscussionSection />
      </div>
    </div>
  );
}

export default QuestionSectionCard;
