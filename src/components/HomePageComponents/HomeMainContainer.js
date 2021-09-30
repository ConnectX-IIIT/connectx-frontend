import React, { useEffect, useState } from "react";
import HomeUserDetails from "./HomeUserDetails";
import HomePageCard from "./HomePageCard";
import addImage from "../../assets/home/post/add_post/ic_add_post.svg";
import "../../styles/HomePage/HomeMainContainer/HomeMainContainer.css";
import { useHistory } from "react-router-dom";
import CreatePost from "./../CreatePost/CreatePost";
import { useStateValue } from "../../helper/state_provider";
import { fetchPosts } from "./helper/fetch_posts";
import { updateFilter } from "./helper/update_filter";

function HomeMainContainer() {
  const history = useHistory();
  const [{ postFilter }] = useStateValue();
  const [index, setIndex] = useState(1);
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    updateFilter(postFilter, setIndex);
  }, [postFilter]);

  useEffect(() => {
    fetchPosts(history, index, setPostData);
  }, [index]); // eslint-disable-line react-hooks/exhaustive-deps

  const HomePageCardDetailsList = postData.map((item, index) => {
    return (
      <HomePageCard
        key={index}
        PostId={item._id}
        UserId={item.user}
        jobLink={item.jobLink}
        UserProfilePhoto={item.userProfile}
        TimeStamp={item.timestamp}
        PostUserName={item.userName}
        PostContent={item.description}
        PostImageUrls={item.attachedImages}
        Upvotes={item.reactions}
        PostTitle={item.title}
        isPostProject={item.isProject}
        discussionsIds={item.discussions}
        postData={postData}
        setPostData={setPostData}
      />
    );
  });

  return (
    <div className="HomeMainContainer relative">
      <div
        className="hidden"
        id="HomeContainerCreatePost"
        style={{ backgroundColor: "rgb(0, 19, 36 , 0.6)" }}
      >
        <CreatePost postData={postData} setPostData={setPostData} />
      </div>

      <HomeUserDetails />
      <div>
        <div
          className="HomePageCard h-14 items-center cursor-pointer"
          onClick={() => {
            document
              .getElementById("HomeContainerCreatePost")
              .classList.toggle("hidden");
          }}
        >
          <img src={addImage} alt="Add Post" className="h-6 mx-5" />
          <p
            className="font-manrope font-semibold text-lg"
            style={{
              color: "#5F5F5F",
            }}
          >
            Create a Post
          </p>
        </div>

        {HomePageCardDetailsList}
      </div>
    </div>
  );
}

export default HomeMainContainer;
