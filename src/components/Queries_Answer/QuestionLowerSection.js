import React from "react";

import "../../styles/Question/QuestionLowerSection.css";
import QuestionSectionCard from "./QuestionSectionCard";

function QuestionLowerSection({ answers }) {

  const answersList = answers.map((item, index) => {
    return (
      <QuestionSectionCard answer={item} />
    );
  });

  return (
    <div className="question-section-lower-wrapper">
      {answersList}
    </div>
  );
}

export default QuestionLowerSection;
