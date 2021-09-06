import React, { useEffect, useState } from "react";
import "../../styles/Question/QuestionsPrimarySec.css";
import CreatePostInput from "./../CreatePost/CreatePostInput";
import SortComponent from "./SortComponent";
import HomePageCard from "./../HomePageComponents/HomePageCard";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../helper/state_provider";
import { handlePhoto } from "../HomePageComponents/helper/handle_photo";
import { fetchQuestions } from "./helper/fetch_questions";

function QueriesQuestionContainer() {
  const history = useHistory();
  const [{ userDetails }, dispatch] = useStateValue();
  const [questionData, setQuestionData] = useState([]);
  const [UserQueries, setUserQueries] = useState({
    askedQuestion: "",
  });

  useEffect(() => {
    fetchQuestions(history, setQuestionData);
  }, []);

  const handleQuestionClick = (question) => async (e) => {
    e.preventDefault();

    await dispatch({
      type: "SET_CURRENT_QUESTION",
      question,
    });
    history.push(`/home/question/${question._id}`);
  };

  const HomePageQuestionsList = questionData.map((item, index) => {
    return (
      <div>
        <HomePageCard
          UserProfilePhoto={item.userProfile}
          TimeStamp={item.timestamp}
          PostUserName={item.userName}
          PostContent={item.question}
          PostImageUrls={[]}
          Upvotes={item.upvotes}
          PostId={item._id}
          isDiscussionQueries={true}
          onQuestionClick={handleQuestionClick(item)}
          queriesInnerStyle={{ fontWeight: "600", fontFamily: "manrope" }}
          queriesMainContainerStyle={{ marginLeft: "0" }}
        />
      </div>
    );
  });

  return (
    <div>
      <div
        className="grid"
        style={{
          gridTemplateColumns: "7% 93%",
        }}
      >
        <img
          src={handlePhoto(userDetails.profilePicture, 1)}
          alt="profile"
          className="object-cover w-11 h-11 rounded-full"
        />
        <div
          onClick={() => {
            document
              .getElementById("QueriesAskQuestionContainer")
              .classList.toggle("hidden");
          }}
        >
          <CreatePostInput
            inputType="text"
            inputName="askedQuestion"
            inputValue={UserQueries.askedQuestion}
            labelContent="Ask Something"
            isInput
            disabled={true}
            style={{ width: "100%" }}
          />
        </div>
      </div>

      <SortComponent />
      {HomePageQuestionsList}
    </div>
  );
}

export default QueriesQuestionContainer;
