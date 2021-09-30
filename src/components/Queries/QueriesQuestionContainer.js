import React, { useState } from "react";
import "../../styles/Question/QuestionsPrimarySec.css";
import CreatePostInput from "./../CreatePost/CreatePostInput";
import SortComponent from "./SortComponent";
import HomePageCard from "./../HomePageComponents/HomePageCard";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../helper/state_provider";
import { handlePhoto } from "../HomePageComponents/helper/handle_photo";
import { handleQuestionClick } from "./helper/handle_question_click";

function QueriesQuestionContainer({ questionData, setQuestionData }) {
  const history = useHistory();
  const [{ userDetails }, dispatch] = useStateValue();
  const [UserQueries] = useState({
    askedQuestion: "",
  });

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
          UserId={item.user}
          isDiscussionQueries={true}
          questionData={questionData}
          setQuestionData={setQuestionData}
          onQuestionClick={handleQuestionClick(dispatch, history, item)}
          queriesInnerStyle={{
            fontWeight: "600",
            fontFamily: "manrope",
            cursor: "pointer",
          }}
          queriesMainContainerStyle={{ marginLeft: "0" }}
        />
      </div>
    );
  });

  return (
    <div>
      <div className="queries-page-add-question-top-container-sub-wrapper">
        <img
          src={handlePhoto(userDetails.profilePicture, 1)}
          alt="profile"
          className="queries-page-add-question-user-profile-image"
        />
        <div
          className="queries-page-ask-something-input-wrapper"
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
            isDisabled={true}
            style={{
              width: "100%",
              height: "3vw",
              margin: "0",
              backgroundColor: "#ffffff",
              cursor: "pointer",
            }}
          />
        </div>
      </div>

      <SortComponent />
      {HomePageQuestionsList}
    </div>
  );
}

export default QueriesQuestionContainer;
