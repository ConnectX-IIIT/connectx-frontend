import React from "react";
import "../../styles/Question/QuestionSectionCard.css";
import QuestionSectionUserprofile from "./QuestionSectionUserprofile";
import UpvotesSection from "./UpvotesSection";
import HomeCardInnerContent from "./../HomePageComponents/HomeCardInnerContent";
import QuestionSectionButtons from "./QuestionSectionButtons";

import QuestionSectionDiscussionSection from "./QuestionSectionDiscussionSection";
import { handleTimestamp } from "../HomePageComponents/HomePageCard";
import { handlePhoto } from "./QuestionSectionMainContainer";

function QuestionSectionCard({ answer }) {

  return (
    <div className="question-section-card-wrapper">
      <div className="question-section-card-left-wrapper">
        <UpvotesSection />
      </div>
      <div className="question-section-card-right-wrapper">
        <div className="question-section-card-user-profile">
          <QuestionSectionUserprofile
            UserName={answer.userName}
            TimeStamp={handleTimestamp(answer.timestamp)}
            ProfilePhoto={handlePhoto(answer.userProfile)}
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
