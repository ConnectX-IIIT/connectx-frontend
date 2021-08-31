import React, { useEffect, useState } from "react";
import HomeUserDetails from "./HomeUserDetails";
import { Link } from "react-router-dom";
import HomePageCard from "./HomePageCard";
import addImage from "../../assets/home/post/add_post/ic_add_post.svg";
import "../../styles/HomePage/HomeMainContainer/HomeMainContainer.css";
import instance from "../../helper/axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import CreatePost from "./../CreatePost/CreatePost";
import { useStateValue } from "../../helper/state_provider";

function HomeMainContainer() {

  const history = useHistory();
  const [{ userDetails, postFilter }, dispatch] = useStateValue();
  const [index, setIndex] = useState(1);
  const [postData, setPostData] = useState([]);

  const updateIndex = () => {
    if (postFilter.jobs === postFilter.projects && postFilter.projects === postFilter.blogs) {
      return setIndex(1);
    }
    if (postFilter.jobs && !postFilter.projects && !postFilter.blogs) {
      return setIndex(5);
    }
    if (!postFilter.jobs && postFilter.projects && !postFilter.blogs) {
      return setIndex(7);
    }
    if (!postFilter.jobs && !postFilter.projects && postFilter.blogs) {
      return setIndex(6);
    }
    if (postFilter.jobs && postFilter.projects && !postFilter.blogs) {
      return setIndex(2);
    }
    if (postFilter.jobs && !postFilter.projects && postFilter.blogs) {
      return setIndex(3);
    }
    if (!postFilter.jobs && postFilter.projects && postFilter.blogs) {
      return setIndex(4);
    }
  }

  const fetchData = async (e) => {
    try {
      const token = Cookies.get("token");

      if (token) {
        const getDetailsRes = await instance.get(`/post/getposts/${index}`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        const data = getDetailsRes.data.postData;
        setPostData(data);
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

  useEffect(() => {
    updateIndex();
  }, [postFilter]);

  useEffect(() => {
    fetchData();
  }, [index]);

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
      />
    );
  });

  return (
    <div className="HomeMainContainer relative">
      <div
        className="h-full w-full absolute top-0 left-0 z-10 hidden"
        id="HomeContainerCreatePost"
        style={{ backgroundColor: "rgb(0, 19, 36 , 0.6)" }}
      >
        <CreatePost />
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
