import React, { useState } from "react";
import CreatePostInput from "../CreatePost/CreatePostInput";
import deleteIcon from "../../assets/create_post/ic_close.svg";
import { useStateValue } from "../../helper/state_provider";
import Cookies from "js-cookie";
import instance from "../../helper/axios";
import { useHistory } from "react-router-dom";

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

  const [UserQueries, setUserQueries] = useState({
    askedQuestion: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserQueries({ ...UserQueries, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const question = UserQueries.askedQuestion;

    if (!question) {
      return alert("Please enter a question!");
    }

    if (!userDetails.isVerified) {
      return alert("Your verification is under process!");
    }

    try {
      const token = Cookies.get("token");

      if (token) {
        await instance.post(
          `/home/addquestion`,
          {
            question,
          },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        document
          .getElementById("QueriesAskQuestionContainer")
          .classList.toggle("hidden");
      } else {
        history.replace("/signin");
      }
    } catch (error) {
      if (error.response.status === 500) {
        return alert(`Server error occured!`);
      }
      if (error.response.status === 400) {
        return alert(`You can't post empty question!`);
      }
      if (error.response.status === 408) {
        return alert(`Your verification is under process!`);
      }
      return alert(`Your session has expired, please login again!`);
    }
  };

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
        className="flex flex-col"
        style={{
          width: "38vw",
        }}
      >
        <CreatePostInput
          inputType="text"
          inputName="askedQuestion"
          inputValue={UserQueries.askedQuestion}
          onChangeFunction={handleInput}
          labelContent="Ask Something"
          isInput={true}
          style={{ width: "100%", marginBottom: "0" }}
        />
      </form>
      <QuestionSuggestion QuestionInnerContent="lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem lorem ipsum  " />
      <QuestionSuggestion QuestionInnerContent="lorem ipsum" />
      <QuestionSuggestion QuestionInnerContent="lorem ipsum" />

      <div className="flex">
        <button
          onClick={handleSubmit}
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
