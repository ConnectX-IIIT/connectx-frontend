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
import DotImageHome from "../../assets/home/post/body/info/ic_info_dots.svg";
import DiscussionSection from "./DiscussionSection";

import "../../styles/general_post_card/general_post_card.css";
import ButtonHome from "./ButtonHome";

import discussionButtonCompData from "./helper/bottom_buttons_data/postDiscussionButtonData";
import shareButtonCompData from "./helper/bottom_buttons_data/postShareButtonData";

import { useHistory } from "react-router-dom";
import { useStateValue } from "../../helper/state_provider";

import EditButtomImage from "../../assets/home/post/menu/ic_edit_post.svg";
import DeleteButtomImage from "../../assets/home/post/menu/ic_delete_post.svg";
import { convertTimestamp } from "./helper/convert_timestamp";
import { handlePhoto } from "./helper/handle_photo";
import { handleDeletePost } from "./helper/delete_post";
import { addDiscussion } from "./helper/add_discussion";
import { fetchDiscussions } from "./helper/fetch_discussions";
import { updateUpvotes } from "./helper/update_upvotes";
import PostCardBottomButtonComp from "../_general/post_card_button/PostCardBottomButtonComp";

function MoreOptionHomePageCard({ Image, content, style, onClickFunction }) {
  return (
    <div
      className="flex items-center pl-2 rounded-md mb-2 cursor-pointer"
      style={style}
      onClick={onClickFunction}
    >
      <img src={Image} alt="MoreOption" className="w-6 object-contain mr-1" />
      <p
        className="font-manrope font-semibold"
        style={{
          fontSize: "1.25vw",
        }}
      >
        {content}
      </p>
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
  discussionsIds,
  UserId,
  isDiscussionQueries,
  onQuestionClick,
  queriesInnerStyle,
  queriesMainContainerStyle: primaryWrapperStyling,
}) {
  const history = useHistory();
  const [UpvotesHandle, setUpvotesHandle] = useState(Upvotes);
  const [UpvoteActive, setUpvoteActive] = useState(false);
  const [DownvoteActive, setDownvoteActive] = useState(false);

  const [isDiscussionOpen, setIsDiscussionOpen] = useState(false);
  const [DiscussionData, setDiscussionData] = useState([]);
  const [DiscussionReply, setDiscussionReply] = useState({
    content: "",
    postId: PostId,
    reference: "",
  });

  const [isShareButtonActive, setIsShareButtonActive] = useState(false);

  function isJob(jobLink) {
    if (UserId === userDetails._id) {
      return;
    }
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
        <ButtonHome
          content="Discuss in Personal"
          postUserId={UserId}
          styleButton={{
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "0.9vw",
            lineHeight: "1vw",
            color: "#787878",
            marginLeft: "1vw",
            cursor: "pointer",
            backgroundColor: "white",
            width: "10vw",
            height: "3vw",
            marginRight: "1vw",
            margin: "0",
          }}
        />
      </div>
    );
  }

  function isProject() {
    if (UserId === userDetails._id) {
      return;
    }
    return (
      <div className="HomeCardButtonContainer">
        <ButtonHome
          content="Discuss in Personal"
          postUserId={UserId}
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

  async function handleEditPost() {
    console.log(PostId);
  }

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDiscussionReply({ ...DiscussionReply, [name]: value });
  };

  const [{ userDetails }, dispatch] = useStateValue(false);

  const is_Job = jobLink;
  const is_Project = isPostProject;

  useEffect(() => {
    if (isDiscussionQueries) {
      if (
        userDetails.upvotedQuestions &&
        userDetails.upvotedQuestions.includes(`${PostId}`)
      ) {
        setUpvoteActive(true);
      }

      if (
        userDetails.downvotedQuestions &&
        userDetails.downvotedQuestions.includes(`${PostId}`)
      ) {
        setDownvoteActive(true);
      }
    } else {
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
    }
  }, [userDetails]);

  useEffect(() => {}, [userDetails]);

  function handleDisplay(elementId) {
    document.getElementById(elementId).classList.toggle("hidden");
  }

  const [inputDiscussionReply, setInputDiscussionReply] = useState({
    content: "",
    postId: PostId,
    reference: "",
  });

  const [isDiscussionReply, setisDiscussionReply] = useState(false);

  function DiscussionSectionData() {
    const handleInputReply = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setInputDiscussionReply({ ...inputDiscussionReply, [name]: value });
    };

    const DiscussionDataList = DiscussionData.map((item, index) => {
      const DiscussionDataReplyList = item.reply.map((reply, index) => {
        return (
          <DiscussionSection
            InnerContentDiscussion={reply.content}
            key={index}
            UserName={item.reply[index].userName}
            userProfile={item.reply[index].userProfile}
            timestamp={convertTimestamp(item.reply[index].timestamp)}
            discussionId={item.reply[index]._id}
            upvotes={item.reply[index].reactions}
          />
        );
      });

      return (
        <>
          <DiscussionSection
            InnerContentDiscussion={item.discussion.content}
            UserName={item.discussion.userName}
            userProfile={item.discussion.userProfile}
            timestamp={convertTimestamp(item.discussion.timestamp)}
            key={index}
            discussionId={item.discussion._id}
            upvotes={item.discussion.reactions}
          />
          <div style={{ marginLeft: "4vw" }}>
            <p
              className="font-manrope font-semibold ml-5 cursor-pointer"
              onClick={() => {
                setisDiscussionReply(!isDiscussionReply);
                setInputDiscussionReply({
                  ...inputDiscussionReply,
                  reference: item.discussion._id,
                });
                handleDisplay(`${DiscussionData[index].discussion._id}`);
              }}
            >
              Reply
            </p>
            <div>
              <div
                className="pt-4 flex hidden"
                id={`${DiscussionData[index].discussion._id}`}
              >
                <img
                  src={handlePhoto(userDetails.profilePicture, 1)}
                  alt="userprofile"
                  className="object-cover w-10 h-10 mx-5 rounded-full"
                />
                <form
                  action=""
                  onSubmit={(e) =>
                    addDiscussion(
                      userDetails,
                      history,
                      inputDiscussionReply.content,
                      inputDiscussionReply.postId,
                      inputDiscussionReply.reference,
                      setInputDiscussionReply
                    )(e)
                  }
                  className="w-full mr-2"
                >
                  <div>
                    <textarea
                      type="text"
                      name="content"
                      value={null}
                      onChange={handleInputReply}
                      className="FormInput m-0 w-full h-full text-base pt-2"
                      placeholder="Add Reply"
                    />
                  </div>
                  <button className="ButtonHome m-0 w-20 h-8 mt-4">
                    REPLY
                  </button>
                </form>
              </div>
              {DiscussionDataReplyList}
            </div>
          </div>
        </>
      );
    });
    return DiscussionDataList;
  }

  async function discussionButtonClickHandler() {
    setIsDiscussionOpen(!isDiscussionOpen);
    const discussions = await fetchDiscussions(history, discussionsIds);
    setDiscussionData(discussions);
  }

  async function shareButtonClickHandler() {
    setIsShareButtonActive(true);
    setTimeout(() => {
      setIsShareButtonActive(false);
    }, 100);
  }
  return (
    <div className="HomePageCard" style={primaryWrapperStyling}>
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
            isDiscussionQueries
              ? updateUpvotes(
                  userDetails,
                  history,
                  dispatch,
                  PostId,
                  UpvoteActive,
                  DownvoteActive,
                  setUpvoteActive,
                  setDownvoteActive,
                  UpvotesHandle,
                  setUpvotesHandle,
                  true,
                  "question"
                )
              : updateUpvotes(
                  userDetails,
                  history,
                  dispatch,
                  PostId,
                  UpvoteActive,
                  DownvoteActive,
                  setUpvoteActive,
                  setDownvoteActive,
                  UpvotesHandle,
                  setUpvotesHandle,
                  true,
                  "post"
                );
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
            isDiscussionQueries
              ? updateUpvotes(
                  userDetails,
                  history,
                  dispatch,
                  PostId,
                  UpvoteActive,
                  DownvoteActive,
                  setUpvoteActive,
                  setDownvoteActive,
                  UpvotesHandle,
                  setUpvotesHandle,
                  false,
                  "question"
                )
              : updateUpvotes(
                  userDetails,
                  history,
                  dispatch,
                  PostId,
                  UpvoteActive,
                  DownvoteActive,
                  setUpvoteActive,
                  setDownvoteActive,
                  UpvotesHandle,
                  setUpvotesHandle,
                  false,
                  "post"
                );
          }}
          isActive={DownvoteActive}
        />
      </div>
      <div id="HomePageCardRightContainer">
        <div
          onClick={isDiscussionQueries ? onQuestionClick : null}
          style={{
            paddingLeft: "1.5vw",
            paddingRight: "1.5vw",
          }}
        >
          <div id="PostDetailsContainer" className="relative">
            <div
              className="absolute hidden"
              id={`${PostId}` + "MoreOption"}
              style={{ right: "0", top: "2.5vw", width: "7.34vw" }}
            >
              <MoreOptionHomePageCard
                Image={EditButtomImage}
                content="Edit"
                style={{
                  color: "#38ABF0",
                  backgroundColor: "#DDF2FF",
                }}
                onClickFunction={handleEditPost}
              />
              <MoreOptionHomePageCard
                Image={DeleteButtomImage}
                content="Delete"
                style={{
                  color: "#FF6969",
                  backgroundColor: "#FFEDED",
                }}
                onClickFunction={(e) =>
                  handleDeletePost(userDetails, PostId, history)(e)
                }
              />
            </div>
            <img
              src={handlePhoto(UserProfilePhoto, 1)}
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
                {convertTimestamp(TimeStamp)}
              </div>
            </div>
            <img
              src={DotImageHome}
              alt="dot"
              style={{
                margin: "auto",
              }}
              className="cursor-pointer"
              onClick={() => {
                var element = document.getElementById(
                  `${PostId}` + "MoreOption"
                );
                element.classList.toggle("hidden");
              }}
            />
          </div>
          <div className="font-manrope font-medium text-xl my-3">
            {PostTitle}
          </div>
          <HomeCardInnerContent
            InnerContent={PostContent}
            styleInnerContent={queriesInnerStyle}
          />
          {PostImageUrls.length > 0 ? (
            <CarouselHome CarouselImgs={PostImageUrls} />
          ) : null}
        </div>

        {is_Job ? isJob(jobLink) : is_Project ? isProject() : null}

        <div
          className="flex"
          style={{
            borderTop: "2px solid #bdbfc4",
            alignItems: "center",
            paddingLeft: "1.5vw",
            paddingTop: "0.5vw",
            paddingBottom: "0.5vw",
          }}
        >
          {isDiscussionQueries ? null : (
            <PostCardBottomButtonComp
              onClickFunction={discussionButtonClickHandler}
              isActive={isDiscussionOpen}
              svgComponent={discussionButtonCompData.svgComponent}
              buttonName={discussionButtonCompData.buttonName}
              colorsSet={discussionButtonCompData.colorsSet}
              extraStylesForWrapper={
                discussionButtonCompData.extraStylesForWrapper
              }
            />
          )}
          <PostCardBottomButtonComp
            onClickFunction={shareButtonClickHandler}
            isActive={isShareButtonActive}
            svgComponent={shareButtonCompData.svgComponent}
            buttonName={shareButtonCompData.buttonName}
            colorsSet={shareButtonCompData.colorsSet}
          />
        </div>

        {isDiscussionOpen ? (
          <div
            style={{
              borderTop: "2px solid rgb(189, 191, 196)",
            }}
          >
            <div>
              <div className="pt-4 flex">
                <img
                  src={handlePhoto(userDetails.profilePicture, 1)}
                  alt="userprofile"
                  className="object-cover w-10 h-10 mx-5 rounded-full"
                />
                <form
                  action=""
                  onSubmit={(e) =>
                    addDiscussion(
                      userDetails,
                      history,
                      DiscussionReply.content,
                      DiscussionReply.postId,
                      DiscussionReply.reference,
                      setDiscussionReply
                    )(e)
                  }
                  className="w-full mr-2"
                >
                  <div className="h-28">
                    <textarea
                      type="text"
                      name="content"
                      id="postDiscussion"
                      value={DiscussionReply.content}
                      onChange={handleInput}
                      className="FormInput m-0 w-full h-full text-base pt-2"
                      placeholder="Add Something To Discuss"
                    />
                  </div>
                  <button className="ButtonHome m-0 w-20 h-8 mt-4">POST</button>
                </form>
              </div>

              {DiscussionSectionData()}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default HomePageCard;
