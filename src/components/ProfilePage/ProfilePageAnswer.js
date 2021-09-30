import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { fetchAnswers } from "../Queries_Answer/helper/fetch_answers";
import QuestionSectionCard from "../Queries_Answer/QuestionSectionCard";

function ProfilePageAnswer(props) {
  const history = useHistory();
  const [answerData, setAnswerData] = useState([]);
  const userId = props.match.params.userId;

  useEffect(() => {
    fetchAnswers(history, setAnswerData, false, userId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const answersList = answerData.map((item) => {
    return <QuestionSectionCard answer={item} />;
  });

  return <div>{answersList}</div>;
}

export default ProfilePageAnswer;
