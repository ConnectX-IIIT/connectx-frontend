import React from "react";
import QueriesQuestionContainer from "./QueriesQuestionContainer";

function QueriesMainConatiner() {
  return (
    <>
      <div
        className="w-full absolute  left-0 z-10 "
        id="HomeContainerCreatePost"
        style={{
          backgroundColor: "rgb(0, 19, 36 , 0.6)",
          top: "-1.2vw",
          height: "calc(100% + 1.2vw)",
        }}
      ></div>
      <div
        className="flex flex-col max-w-screen-lg font-manrope mx-auto relative"
        style={{ marginTop: "calc(81px + 1.2vw)", width: "50vw" }}
      >
        <QueriesQuestionContainer />
      </div>
    </>
  );
}

export default QueriesMainConatiner;
