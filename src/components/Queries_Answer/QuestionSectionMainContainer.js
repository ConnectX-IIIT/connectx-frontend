import React, { useState } from "react";
import "../../styles/Question/QuestionSectionMainContainer.css";

import DefaultProfile from "../../assets/_rough/achi photo part 2.jpg";

import UpvotesSection from "./UpvotesSection";
import QuestionSectionButtons from "./QuestionSectionButtons";
import QuestionSectionUserprofile from "./QuestionSectionUserprofile";
import QuestionSectionInput from "./QuestionSectionInput";
import QuestionLowerSection from "./QuestionLowerSection";

function QuestionSectionQuestion() {
  return (
    <div className="question-section-question-wrapper">
      <div className="question-section-question">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, voluptates?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, voluptates?
      </div>
      <div className="question-section-question-bottom">
        <QuestionSectionButtons />
        <QuestionSectionUserprofile
          UserName="Harshil Piro"
          TimeStamp="1:34PM"
          ProfilePhoto={DefaultProfile}
          imgOrder="1"
        />
      </div>
    </div>
  );
}

function QuestionSectionMainContainer() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputValue);
  };

  return (
    <div className="question-section-main-container">
      <div className="question-section-question-wrapper-wrapper">
        <UpvotesSection />
        <QuestionSectionQuestion />
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
