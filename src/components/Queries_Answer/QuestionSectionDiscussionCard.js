import React from "react";
import HomeCardInnerContent from "../HomePageComponents/HomeCardInnerContent";
import UpvotesSection from "./UpvotesSection";

import "../../styles/Question/QuestionSectionDiscussionCard.css";
import { convertTimestamp } from "../HomePageComponents/helper/convert_timestamp";

function QuestionSectionDiscussionCard({ commentData }) {
  return (
    <div className="question-section-discussion-card-wrapper">
      <div className="question-section-discussion-left-card-wrapper">
        <UpvotesSection upvotes={commentData.reactions} Id={commentData._id} type="comment" />
      </div>
      <div>
        <div className="question-section-discussion-right-card-wrapper">
          <p>{commentData.userName}</p>
          <p>{convertTimestamp(commentData.timestamp)}</p>
        </div>
        <div className="question-section-discussion-content-wrapper">
          <HomeCardInnerContent
            InnerContent={commentData.content}
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
