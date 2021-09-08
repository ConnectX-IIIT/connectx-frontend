import React, { useState } from "react";
import CreatePostInput from "../CreatePost/CreatePostInput";
import deleteIcon from "../../assets/create_post/ic_close.svg";
import "../../styles/Question/QueriesPopOutContainer.css"
import { useStateValue } from "../../helper/state_provider";
import { useHistory } from "react-router-dom";
import { addQuestion } from "./helper/add_question";
import { handleInputSearch } from "../general_helper/home/search";

function QuestionSuggestion({ QuestionInnerContent }) {
  return (
    <div
      className="pl-6 border-2 border-t-0 mx-1.5 font-manrope font-semibold py-1.5 text-lg truncate cursor-pointer"
      style={{
        borderColor: "#959595",
        width: "37.219vw",
      }}
    >
      {QuestionInnerContent}
    </div>
  );
}

function QueriesPopOutContainer() {

  const [{ userDetails }, dispatch] = useStateValue(false);
  const history = useHistory();
  const [popoutQueries, setPopoutQueries] = useState([]);
  const [UserQueries, setUserQueries] = useState({
    askedQuestion: "",
  });

  const PopoutQueriesList = popoutQueries.map((item, index) => {
    return (
      <QuestionSuggestion QuestionInnerContent={item.question} />
    );
  });

  return (
    <div className="PostMainContainer rounded-md mt-24">
      <div className="flex justify-between mb-11">
        <h2 className="font-manrope font-semibold text-xl">Add Question</h2>
        <img
          src={deleteIcon}
          alt="delete"
          onClick={() => {
            document
              .getElementById("QueriesAskQuestionContainer")
              .classList.toggle("hidden");
          }}
          className="cursor-pointer"
        />
      </div>

      <form
        action=""
        encType="multipart/form-data"
        method="post"
        className="queries-pop-out-container-form"
      >
        <CreatePostInput
          inputType="text"
          inputName="askedQuestion"
          inputValue={UserQueries.askedQuestion}
          onChangeFunction={(e) => handleInputSearch(
            history,
            UserQueries,
            setUserQueries,
            setPopoutQueries
          )(e)}
          labelContent="Ask Something"
          isInput={true}
          style={{ width: "100%", marginBottom: "0" }}
        />
      </form>
      {PopoutQueriesList}

      <div className="flex">
        <button
          onClick={(e) => addQuestion(userDetails, history, UserQueries)(e)}
          className="w-28 rounded h-9 font-manrope font-semibold text-white transition-colors duration-200 hover:bg-blue-500 my-8 mx-auto"
          style={{ backgroundColor: "#C4C4C4" }}
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default QueriesPopOutContainer;
