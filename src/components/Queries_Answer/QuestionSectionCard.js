import React from "react";

import DefaultProfile from "../../assets/_rough/achi photo part 2.jpg";

import "../../styles/Question/QuestionSectionCard.css";
import QuestionSectionUserprofile from "./QuestionSectionUserprofile";
import UpvotesSection from "./UpvotesSection";
import HomeCardInnerContent from "./../HomePageComponents/HomeCardInnerContent";

function QuestionSectionCard() {
  return (
    <div className="question-section-card-wrapper">
      <div className="question-section-card-left-wrapper">
        <UpvotesSection />
      </div>
      <div className="question-section-card-right-wrapper">
        <QuestionSectionUserprofile
          UserName="Harshil Piro"
          TimeStamp="15:34 PM"
          ProfilePhoto={DefaultProfile}
        />
        <div className="question-section-read-more-wrapper">
          <HomeCardInnerContent
            styleInnerContent={{
              lineHeight: "initial",
            }}
            InnerContent="Hello"
          />
        </div>
      </div>
    </div>
  );
}

export default QuestionSectionCard;
