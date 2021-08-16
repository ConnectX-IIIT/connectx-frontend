import React, { useEffect, useState } from "react";
import CreatePostInput from "./../CreatePost/CreatePostInput";
import ProfilePhoto from "../../assets/profile/user_profile_default_icon.svg";
import SortComponent from "./SortComponent";
import HomePageCard from "./../HomePageComponents/HomePageCard";
import Cookies from "js-cookie";
import instance from "../../helper/axios";
import { useHistory } from "react-router-dom";

const imgURL = "https://obscure-ridge-13663.herokuapp.com/user/fetch/";

function QueriesQuestionContainer() {

  const history = useHistory();
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
      return imgURL + photo;
    }
    return ProfilePhoto;
  };

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
      <HomePageCard
        UserProfilePhoto={item.userProfile}
        TimeStamp={item.timestamp}
        PostUserName={item.userName}
        PostContent={item.question}
        PostImageUrls={[]}
        Upvotes={item.upvotes}
        PostId="1"
        isDiscussionQueries={true}
        queriesInnerStyle={{ fontWeight: "600", fontFamily: "manrope" }}
        queriesMainContainerStyle={{ marginLeft: "0" }}
      />
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
          src={ProfilePhoto}
          alt="profile"
          className="object-cover w-11 h-11"
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
