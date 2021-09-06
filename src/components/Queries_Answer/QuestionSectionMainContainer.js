import React, { useEffect, useState } from "react";
import "../../styles/Question/QuestionSectionMainContainer.css";
import UpvotesSection from "./UpvotesSection";
import QuestionSectionButtons from "./QuestionSectionButtons";
import QuestionSectionUserprofile from "./QuestionSectionUserprofile";
import QuestionSectionInput from "./QuestionSectionInput";
import QuestionLowerSection from "./QuestionLowerSection";
import { useStateValue } from "../../helper/state_provider";
import { useHistory } from "react-router-dom";
import { convertTimestamp } from "../HomePageComponents/helper/convert_timestamp";
import { handlePhoto } from "../HomePageComponents/helper/handle_photo";
import { fetchQuestion } from "./helper/fetch_question";
import { fetchAnswers } from "./helper/fetch_answers";

function QuestionSectionQuestion({ question }) {

  return (
    <div className="question-section-question-wrapper">
      <div className="question-section-question">
        {question.question}
      </div>
      <div className="question-section-question-bottom">
        <QuestionSectionButtons />
        <QuestionSectionUserprofile
          UserName={question.userName}
          TimeStamp={question.timestamp ? convertTimestamp(question.timestamp) : null}
          ProfilePhoto={handlePhoto(question.userProfile, 1)}
          imgOrder="1"
        />
      </div>
    </div>
  );
}

function QuestionSectionMainContainer(props) {

  const history = useHistory();
  const questionId = props.match.params.questionId;
  const [{ userDetails, currentQuestion }, dispatch] = useStateValue();
  const [answers, setAnswers] = useState([]);
  const [inputValue, setInputValue] = useState({
    answer: "",
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  useEffect(() => {
    if (!currentQuestion.user) {
      fetchQuestion(history, dispatch, questionId);
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (!answers.user) {
      fetchAnswers(history, setAnswers, questionId);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="question-section-main-container">
      <div className="question-section-question-wrapper-wrapper">
        <UpvotesSection upvotes={currentQuestion.upvotes} type="question" Id={questionId} />
        <QuestionSectionQuestion question={currentQuestion} />
      </div>
      <div className="question-section-answer-input-wrapper">
        <img src={handlePhoto(userDetails.profilePicture, 1)} alt="default" />
        <div>
          <QuestionSectionInput
            InputName="answer"
            InputValue={inputValue.answer}
            PlaceholderContent="Answer The Question"
            OnChangeFunction={handleInput}
            OnSubmitFunction={handleSubmit}
          />
        </div>
      </div>
      <QuestionLowerSection answers={answers} />
    </div>
  );
}

export default QuestionSectionMainContainer;
