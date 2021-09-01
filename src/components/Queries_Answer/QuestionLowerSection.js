import React from "react";

import "../../styles/Question/QuestionLowerSection.css";
import QuestionSectionCard from "./QuestionSectionCard";

function QuestionLowerSection() {
  return (
    <div className="question-section-lower-wrapper">
      <QuestionSectionCard />
      <QuestionSectionCard />
    </div>
  );
}

export default QuestionLowerSection;
