import React from "react";
import "../../styles/Question/QuestionSectionInput.css";

function QuestionSectionInput({
  InputName,
  InputValue,
  PlaceholderContent,
  OnChangeFunction,
  OnSubmitFunction,
}) {
  return (
    <form className="question-section-form" onSubmit={OnSubmitFunction}>
      <textarea
        name={InputName}
        value={InputValue}
        placeholder={PlaceholderContent}
        onChange={OnChangeFunction}
        className="question-section-text-area"
      />
      <button type="submit" className="question-section-form-button">
        Post
      </button>
    </form>
  );
}

export default QuestionSectionInput;
