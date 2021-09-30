import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useStateValue } from "../../helper/state_provider";
import HomePageCard from "../HomePageComponents/HomePageCard";
import { fetchQuestion } from "../Queries_Answer/helper/fetch_question";

function ProfilePageQuestion(props) {
  const history = useHistory();
  const [, dispatch] = useStateValue();
  const [questionData, setQuestionData] = useState([]);
  const userId = props.match.params.userId;

  useEffect(() => {
    fetchQuestion(history, false, false, userId, setQuestionData);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleQuestionClick = (question) => async (e) => {
    e.preventDefault();

    await dispatch({
      type: "SET_CURRENT_QUESTION",
      question,
    });
    history.push(`/home/question/${question._id}`);
  };

  const QuestionsList = questionData.map((item, index) => {
    return (
      <div>
        <HomePageCard
          UserProfilePhoto={item.userProfile}
          TimeStamp={item.timestamp}
          PostUserName={item.userName}
          PostContent={item.question}
          PostImageUrls={[]}
          Upvotes={item.upvotes}
          PostId={item._id}
          UserId={item.user}
          isDiscussionQueries={true}
          onQuestionClick={handleQuestionClick(item)}
          queriesInnerStyle={{
            fontWeight: "600",
            fontFamily: "manrope",
            cursor: "pointer",
          }}
          queriesMainContainerStyle={{ marginLeft: "0" }}
        />
      </div>
    );
  });

  return <div>{QuestionsList}</div>;
}

export default ProfilePageQuestion;
