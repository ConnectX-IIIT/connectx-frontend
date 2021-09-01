import React, { useEffect, useState } from "react";
import "../../styles/Question/QuestionSectionMainContainer.css";
import DefaultProfile from "../../assets/_rough/achi photo part 2.jpg";
import UpvotesSection from "./UpvotesSection";
import QuestionSectionButtons from "./QuestionSectionButtons";
import QuestionSectionUserprofile from "./QuestionSectionUserprofile";
import QuestionSectionInput from "./QuestionSectionInput";
import QuestionLowerSection from "./QuestionLowerSection";
import { useStateValue } from "../../helper/state_provider";
import { handleTimestamp } from "../HomePageComponents/HomePageCard";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import instance from "../../helper/axios";

function QuestionSectionQuestion({ question }) {

  const handlePhoto = (photo) => {
    if (photo) {
      return photo;
    }
    return DefaultProfile;
  };

  return (
    <div className="question-section-question-wrapper">
      <div className="question-section-question">
        {question.question}
      </div>
      <div className="question-section-question-bottom">
        <QuestionSectionButtons />
        <QuestionSectionUserprofile
          UserName={question.userName}
          TimeStamp={handleTimestamp(question.timestamp)}
          ProfilePhoto={handlePhoto(question.userProfile)}
          imgOrder="1"
        />
      </div>
    </div>
  );
}

function QuestionSectionMainContainer(props) {

  const history = useHistory();
  const [{ userDetails, currentQuestion }, dispatch] = useStateValue();
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

  const fetchQuestionData = async (e) => {
    try {
      const token = Cookies.get("token");

      if (token) {
        const getQuestionRes = await instance.post(`/question/getquestions`,
          {
            questionId: props.match.params.questionId,
          },
          {
            headers: {
              Authorization: `${token}`,
            },
          });

        const question = getQuestionRes.data.questions;
        await dispatch({
          type: "SET_CURRENT_QUESTION",
          question,
        });

      } else {
        history.replace("/signin");
      }
    } catch (error) {
      if (error.response.status === 500) {
        return alert(`Server error occured!`);
      }
      return alert(`Your session has expired, please login again!`);
    }
  };

  useEffect(() => {
    if (!currentQuestion.user) {
      fetchQuestionData();
    }
  }, [currentQuestion])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputValue);
  };

  return (
    <div className="question-section-main-container">
      <div className="question-section-question-wrapper-wrapper">
        <UpvotesSection upvotes={currentQuestion.upvotes} />
        <QuestionSectionQuestion question={currentQuestion} />
      </div>
      <div className="question-section-answer-input-wrapper">
        <img src={DefaultProfile} alt="default" />
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
      <QuestionLowerSection />
    </div>
  );
}

export default QuestionSectionMainContainer;
