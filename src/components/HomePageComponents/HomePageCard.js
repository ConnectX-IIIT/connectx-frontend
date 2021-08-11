import React, { useEffect, useState } from "react";
import ImgStackHome from "./ImgStackHome";
import CarouselHome from "./CarouselHome";

import homeUpvoteIcon from "../../assets/home/post/upvotes/ic_upvote.svg";
import homeUpvoteIconHover from "../../assets/home/post/upvotes/h_ic_upvote.svg";
import homeUpvoteIconSelected from "../../assets/home/post/upvotes/s_ic_upvote.svg";

import homeDownvoteIcon from "../../assets/home/post/upvotes/ic_downvote.svg";
import homeDownvoteIconHover from "../../assets/home/post/upvotes/h_ic_downvote.svg";
import homeDownvoteIconSelected from "../../assets/home/post/upvotes/s_ic_downvote.svg";

import HomeCardInnerContent from "./HomeCardInnerContent";
import UserProfileDefaultIcon from "../../assets/profile/user_profile_default_icon.svg";
import DotImageHome from "../../assets/home/post/body/info/ic_info_dots.svg";
import DiscussionSection from "./DiscussionSection";

import "../../styles/HomePage/HomeMainContainer/HomePageCard.css";
import ButtonHome from "./ButtonHome";
import UserProfile from "../../assets/profile/user_profile_default_icon.svg";

import { ReactComponent as TextDiscussion } from "../../assets/home/post/bottom/ic_dicussion.svg";
import { ReactComponent as ShareIcon } from "../../assets/home/post/bottom/ic_share.svg";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../helper/state_provider";
import instance from "../../helper/axios";

function isJob(jobLink) {
  return (
    <div className="HomeCardButtonContainer">
      <ButtonHome
        content="APPLY NOW"
        styleButton={{
          width: "10vw",
          height: "3vw",
          fontSize: "1vw",
          marginRight: "1vw",
          margin: "0",
        }}
        jobLink={jobLink}
      />
      <div className="discussInPersonal">Discuss in Personal</div>
    </div>
  );
}

function isProject() {
  return (
    <div className="HomeCardButtonContainer">
      <ButtonHome
        content="Discuss in Personal"
        styleButton={{
          width: "12vw",
          height: "3vw",
          fontSize: "1vw",
          marginRight: "1vw",
          margin: "0",
        }}
      />
    </div>
  );
}

function HomePageCard({
  UserProfilePhoto,
  TimeStamp,
  PostUserName,
  PostContent,
  PostImageUrls,
  Upvotes,
  PostTitle,
  jobLink,
  PostId,
  isPostProject,
  discussionsPost,
}) {
  const history = useHistory();
  const imgURL = "https://obscure-ridge-13663.herokuapp.com/user/fetch/";
  const [UpvotesHandle, setUpvotesHandle] = useState(Upvotes);
  const [UpvoteActive, setUpvoteActive] = useState(false);
  const [DownvoteActive, setDownvoteActive] = useState(false);
  const [isDiscussion, setIsDiscussion] = useState(true);
  const [DiscussionReply, setDiscussionReply] = useState({
    postDiscussion: "",
    postDiscussionReply: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDiscussionReply({ ...DiscussionReply, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(DiscussionReply);
  };
  const [{ userDetails }, dispatch] = useStateValue(false);

  const is_Job = jobLink;
  const is_Project = isPostProject;

  useEffect(() => {
    if (
      userDetails.upvotedPosts &&
      userDetails.upvotedPosts.includes(`${PostId}`)
    ) {
      setUpvoteActive(true);
    }

    if (
      userDetails.downvotedPosts &&
      userDetails.downvotedPosts.includes(`${PostId}`)
    ) {
      setDownvoteActive(true);
    }
  }, [userDetails]);

  const handlePhoto = (photo) => {
    if (photo) {
      return imgURL + photo;
    }
    return UserProfileDefaultIcon;
  };

  const handleTimestamp = (timestamp) => {
    let time = new Date(timestamp);
    let today = new Date();
    let yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
    let timeString;

    if (
      today.getDate() === time.getDate() &&
      Date.now() - timestamp < 86400000
    ) {
      timeString = "Today";
    } else if (
      yesterday.getDate() === time.getDate() &&
      Date.now() - timestamp < 172800000
    ) {
      timeString = "Yesterday";
    } else {
      timeString =
        time.getDate() +
        " " +
        time.toLocaleString("default", { month: "short" }) +
        " " +
        time.getFullYear();
    }

    return (
      timeString +
      " " +
      time.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    );
  };

  async function updateReactions(type) {
    try {
      const token = Cookies.get("token");

      if (token) {
        const voteRes = await instance.post(
          `/post/vote/${PostId}`,
          {
            type,
          },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        return parseInt(voteRes.data.reactions);
      } else {
        history.replace("/signin");
      }
    } catch (error) {
      return alert(`${error}`);
    }
  }

  async function handleUpvotes() {
    setUpvoteActive(!UpvoteActive);
    if (UpvoteActive) {
      const upvotes = await updateReactions(2);
      setUpvotesHandle(upvotes);
    } else {
      const upvotes = await updateReactions(1);
      setUpvotesHandle(upvotes);
    }
  }
  async function handleDownvotes() {
    setDownvoteActive(!DownvoteActive);
    if (DownvoteActive) {
      const upvotes = await updateReactions(4);
      setUpvotesHandle(upvotes);
    } else {
      const upvotes = await updateReactions(3);
      setUpvotesHandle(upvotes);
    }
  }
  const handleReaction = (isUpvoted) => {
    if (DownvoteActive && isUpvoted) {
      handleUpvotes();
      handleDownvotes();
    } else if (UpvoteActive && !isUpvoted) {
      handleDownvotes();
      handleUpvotes();
    } else {
      if (isUpvoted) {
        handleUpvotes();
      } else {
        handleDownvotes();
      }
    }
  };
  return (
    <div className="HomePageCard">
      <div id="HomePageCardLeftContainer">
        <ImgStackHome
          normalImageSrc={homeUpvoteIcon}
          hoverImageSrc={homeUpvoteIconHover}
          activeImageSrc={homeUpvoteIconSelected}
          styleImgStack={{
            transitionDuration: "0.2s",
            width: "2vw",
            height: "2vw",
          }}
          styleImgContainer={{ margin: "0", width: "2vw", height: "2vw" }}
          onClickFunction={() => {
            handleReaction(true);
          }}
          isActive={UpvoteActive}
        />
        <div id="HomePageCardLeftContainerCount">{UpvotesHandle}</div>
        <ImgStackHome
          normalImageSrc={homeDownvoteIcon}
          hoverImageSrc={homeDownvoteIconHover}
          activeImageSrc={homeDownvoteIconSelected}
          styleImgStack={{
            transitionDuration: "0.2s",
            width: "2vw",
            height: "2vw",
          }}
          styleImgContainer={{ margin: "0", width: "2vw", height: "2vw" }}
          onClickFunction={() => {
            handleReaction(false);
          }}
          isActive={DownvoteActive}
        />
      </div>
      <div id="HomePageCardRightContainer">
        <div
          style={{
            paddingLeft: "1.5vw",
            paddingRight: "1.5vw",
          }}
        >
          <div id="PostDetailsContainer">
            <img
              src={handlePhoto(UserProfilePhoto)}
              alt="Userprofile"
              style={{
                width: "3vw",
                height: "3vw",
                objectFit: "cover",
                margin: "auto",
                marginLeft: "0",
                borderRadius: "50%",
              }}
            />
            <div id="PostDetailsContainerTitle">
              <div>
                <div
                  style={{
                    display: "inline",
                    width: "20%",
                    color: "#000000",
                    fontWeight: "500",
                    fontSize: "1.2vw",
                    marginRight: "10px",
                  }}
                >
                  {PostUserName}
                </div>
              </div>
              <div
                style={{
                  color: " #A7A7A7",
                  fontWeight: "500",
                  fontSize: "0.9vw",
                }}
              >
                {handleTimestamp(TimeStamp)}
              </div>
            </div>
            <img
              src={DotImageHome}
              alt="dot"
              style={{
                margin: "auto",
              }}
            />
          </div>
          <div className="font-manrope font-medium text-xl my-3">
            {PostTitle}
          </div>
          <HomeCardInnerContent InnerContent={PostContent} />
          {PostImageUrls.length > 0 ? (
            <CarouselHome CarouselImgs={PostImageUrls} />
          ) : null}
        </div>

        {is_Job ? isJob(jobLink) : is_Project ? isProject() : null}

        <div
          className="flex"
          style={{
            borderTop: "2px solid #bdbfc4",
          }}
        >
          <div
            className="HomeCardDiscussion"
            onClick={() => {
              setIsDiscussion(!isDiscussion);
            }}
          >
            <TextDiscussion className="mr-2 textDiscussion" />
            Discussion
          </div>
          <div
            className="HomeCardDiscussion"
            style={{
              backgroundColor: "#E5F5FF",
              width: "9vw",
            }}
            onClick={() => {
              setIsDiscussion(!isDiscussion);
            }}
          >
            <ShareIcon className="mr-2 textDiscussion" />
            Share
          </div>
        </div>

        {isDiscussion ? (
          <div
            style={{
              borderTop: "2px solid rgb(189, 191, 196)",
            }}
          >
            <div>
              <div className="pt-4 flex">
                <img
                  src={UserProfile}
                  alt="userprofile"
                  className="object-cover w-10 h-10 mx-5"
                />
                <form action="" onSubmit={handleSubmit} className="w-full mr-2">
                  <div className="h-28">
                    <textarea
                      type="text"
                      name="postDiscussion"
                      id="postDiscussion"
                      value={DiscussionReply.postDiscussion}
                      onChange={handleInput}
                      className="FormInput m-0 w-full h-full text-base pt-2"
                      placeholder="Add Something To Discuss"
                    />
                  </div>
                  <button className="ButtonHome m-0 w-20 h-8 mt-4">POST</button>
                </form>
              </div>

              <DiscussionSection />
              <div style={{ marginLeft: "4vw" }}>
                <p className="font-manrope font-semibold ml-5">Reply</p>
                <div className="pt-4 flex">
                  <img
                    src={UserProfile}
                    alt="userprofile"
                    className="object-cover w-10 h-10 mx-5"
                  />
                  <form
                    action=""
                    onSubmit={handleSubmit}
                    className="w-full mr-2"
                  >
                    <div className="">
                      <textarea
                        type="text"
                        name="postDiscussionReply"
                        id="postDiscussionReply"
                        value={DiscussionReply.postDiscussionReply}
                        onChange={handleInput}
                        className="FormInput m-0 w-full h-full text-base pt-2"
                        placeholder="Add Reply"
                      />
                    </div>
                    <button className="ButtonHome m-0 w-20 h-8 mt-4">
                      REPLY
                    </button>
                  </form>
                </div>
                <DiscussionSection />
                <DiscussionSection />
              </div>
            </div>
            <DiscussionSection />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default HomePageCard;
