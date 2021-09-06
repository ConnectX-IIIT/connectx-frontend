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

function QuestionSectionCard({ answer }) {

  const history = useHistory();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments(history, answer.comments, setComments);
  }, []);

  const CommentList = comments.map((item, index) => {
    return (
      <QuestionSectionDiscussionSection comment={item.comment} replies={item.reply} />
    );
  });

  return (
    <div className="question-section-card-wrapper">
      <div className="question-section-card-left-wrapper">
        <UpvotesSection upvotes={answer.upvotes} type="answer" Id={answer._id} />
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
          <div>
            <QuestionSectionButtons buttonType="comment" />
          </div>
          <div>
            <QuestionSectionButtons />
          </div>
        </div>
        {CommentList}
      </div>
    </div>
  );
}

export default QuestionSectionCard;
