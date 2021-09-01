import React, { useEffect, useState } from "react";
import CreatePostInput from "./../CreatePost/CreatePostInput";
import ProfilePhoto from "../../assets/profile/user_profile_default_icon.svg";
import SortComponent from "./SortComponent";
import HomePageCard from "./../HomePageComponents/HomePageCard";
import Cookies from "js-cookie";
import instance from "../../helper/axios";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../helper/state_provider";

function QueriesQuestionContainer() {
  const history = useHistory();
  const [{ userDetails }, dispatch] = useStateValue();
  const [questionData, setQuestionData] = useState([]);
  const [UserQueries, setUserQueries] = useState({
    askedQuestion: "",
  });

  useEffect(() => {
    fetchQuestionData();
  }, []);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserQueries({ ...UserQueries, [name]: value });
  };

  const handlePhoto = (photo) => {
    if (photo) {
      return photo;
    }
    return ProfilePhoto;
  };

  const handleQuestionClick = (question) => async (e) => {
    e.preventDefault();

    await dispatch({
      type: "SET_CURRENT_QUESTION",
      question,
    });
    history.push(`/home/question/${question._id}`);
  }

  const fetchQuestionData = async (e) => {
    try {
      const token = Cookies.get("token");

      if (token) {
        const getQuestionsRes = await instance.get(`/question/getquestions/1`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        const questions = getQuestionsRes.data.questions;
        setQuestionData(questions);
      } else {
        history.replace("/signin");
      }
    } catch (error) {
      if (error.response.status === 500) {
        return alert(`Server error occured!`);
      }
      return alert(`Your session has expired, please login again!`);
    }
  };

  const HomePageQuestionsList = questionData.map((item, index) => {
    return (
      <div onClick={handleQuestionClick(item)}>
        <HomePageCard
          UserProfilePhoto={item.userProfile}
          TimeStamp={item.timestamp}
          PostUserName={item.userName}
          PostContent={item.question}
          PostImageUrls={[]}
          Upvotes={item.upvotes}
          PostId={item._id}
          isDiscussionQueries={true}
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
          src={handlePhoto(userDetails.profilePicture)}
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
