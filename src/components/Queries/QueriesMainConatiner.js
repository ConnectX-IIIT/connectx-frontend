import React from "react";
import QueriesQuestionContainer from "./QueriesQuestionContainer";

function QueriesMainConatiner() {
  return (
    <div
      className="flex flex-col max-w-screen-lg font-manrope mx-auto"
      style={{ marginTop: "calc(81px + 1.2vw)", width: "50vw" }}
    >
      <QueriesQuestionContainer />
    </div>
  );
}

export default QueriesMainConatiner;
