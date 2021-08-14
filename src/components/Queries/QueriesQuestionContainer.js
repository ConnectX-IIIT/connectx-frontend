import React, { useState } from "react";
import CreatePostInput from "./../CreatePost/CreatePostInput";
import ProfilePhoto from "../../assets/profile/user_profile_default_icon.svg";
import SortComponent from "./SortComponent";
import HomePageCard from "./../HomePageComponents/HomePageCard";
function QueriesQuestionContainer() {
  const [UserQueries, setUserQueries] = useState({
    askedQuestion: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserQueries({ ...UserQueries, [name]: value });
  };

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
        <CreatePostInput
          inputType="text"
          inputName="askedQuestion"
          inputValue={UserQueries.askedQuestion}
          onChangeFunction={handleInput}
          labelContent="Ask Something"
          isInput
          style={{ width: "100%" }}
        />
      </div>

      <SortComponent />

      <HomePageCard
        UserProfilePhoto={ProfilePhoto}
        TimeStamp={1223355499}
        PostUserName="Raj Noobda"
        PostContent="What Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non posuere neque, a tincidunt sem?"
        PostImageUrls={[]}
        Upvotes="12"
        PostId="1"
        isDiscussionQueries={true}
        queriesInnerStyle={{ fontWeight: "600", fontFamily: "manrope" }}
        queriesMainContainerStyle={{ marginLeft: "0" }}
      />
      <HomePageCard
        UserProfilePhoto={ProfilePhoto}
        TimeStamp={1223355499}
        PostUserName="Raj Noobda"
        PostContent="What Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non posuere neque, a tincidunt sem?"
        PostImageUrls={[]}
        Upvotes="12"
        PostId="1"
        isDiscussionQueries={true}
        queriesInnerStyle={{ fontWeight: "600", fontFamily: "manrope" }}
        queriesMainContainerStyle={{ marginLeft: "0" }}
      />
    </div>
  );
}

export default QueriesQuestionContainer;
