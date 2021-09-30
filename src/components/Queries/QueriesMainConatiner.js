import React, { useEffect, useState } from "react";
import QueriesQuestionContainer from "./QueriesQuestionContainer";
import QueriesPopOutContainer from "./QueriesPopOutContainer";
import { useHistory } from "react-router";
import { fetchQuestions } from "./helper/fetch_questions";

function QueriesMainConatiner() {

  const history = useHistory();
  const [questionData, setQuestionData] = useState([]);

  useEffect(() => {
    fetchQuestions(history, setQuestionData);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div
        className="w-full absolute left-0 z-10 hidden "
        id="QueriesAskQuestionContainer"
        style={{
          backgroundColor: "rgb(0, 19, 36 , 0.6)",
          top: "-1.2vw",
          height: "calc(100% + 1.2vw)",
        }}
      >
        <QueriesPopOutContainer questionData={questionData} setQuestionData={setQuestionData} />
      </div>
      <div
        className="flex flex-col max-w-screen-lg font-manrope mx-auto relative"
        style={{ marginTop: "calc(81px + 1.2vw)", width: "50vw" }}
      >
        <QueriesQuestionContainer questionData={questionData} setQuestionData={setQuestionData} />
      </div>
    </>
  );
}

export default QueriesMainConatiner;
