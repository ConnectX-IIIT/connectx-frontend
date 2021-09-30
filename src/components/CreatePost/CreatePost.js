import React, { useState } from "react";
import "../../styles/CreatePost/CreatePost.css";
import CreatePostInput from "./CreatePostInput";
import CreatePostRadio from "./CreatePostRadio";
import { useHistory } from "react-router-dom";
import deleteIcon from "../../assets/create_post/ic_close.svg";
import { useStateValue } from "../../helper/state_provider";
import { addPost } from "./helper/add_post";
import CreatePostImagesPreviewTempCompPrimary from "./CreatePostImagesPreviewTempCompPrimary";

function CreatePost({ postData, setPostData }) {
  const history = useHistory();
  const TypeOfPostArr = ["Job", "Project", "Blog"];

  const [isJobLink, setJobLink] = useState(false);
  const [{ userDetails }, dispatch] = useStateValue();
  const [postDetails, setPostDetails] = useState({
    postTitle: "",
    postDescription: "",
    jobLink: "",
    typeOfPost: "",
    attachedImgs: [],
    attachedImgDimensions: [],
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "attachedImgs") {
      setPostDetails({
        ...postDetails,
        [name]: e.target.files,
      });
    } else {
      setPostDetails({ ...postDetails, [name]: value });
    }
    if (name === "typeOfPost") {
      setJobLink(false);
    }
    if (name === "typeOfPost" && value === "Job") {
      setJobLink(true);
    }
  };

  function attachedImagesDimensionsDetailsUpdaterP(
    attachedImagesDimensionsDetails
  ) {
    setPostDetails({
      ...postDetails,
      attachedImgDimensions: attachedImagesDimensionsDetails,
    });
  }

  function attachedImagesDetailsUpdaterP(attachedImagesDetails) {
    setPostDetails({
      ...postDetails,
      attachedImgs: attachedImagesDetails,
    });
  }

  return (
    <div className="PostMainContainer rounded-md">
      <div className="flex justify-between mb-4">
        <h2 className="font-manrope font-semibold text-xl">Create Post</h2>
        <img
          src={deleteIcon}
          alt="delete"
          onClick={() => {
            document
              .getElementById("HomeContainerCreatePost")
              .classList.toggle("hidden");
          }}
          className="cursor-pointer"
        />
      </div>
      <form
        action=""
        onSubmit={(e) => addPost(userDetails, history, dispatch, postDetails, postData, setPostData)(e)}
        encType="multipart/form-data"
        method="post"
        className="flex flex-col"
      >
        <CreatePostInput
          inputType="text"
          inputName="postTitle"
          inputValue={postDetails.postTitle}
          onChangeFunction={handleInput}
          labelContent="Post Title"
          isInput={true}
        />
        <CreatePostInput
          inputType="text"
          inputName="postDescription"
          inputValue={postDetails.postDescription}
          onChangeFunction={handleInput}
          labelContent="Post Description"
        />
        <div
          style={{
            display: "inline-block",
            marginBottom: "1vw",
          }}
        >
          <CreatePostRadio
            RadioHeading="Type Of Post"
            RadioOptions={TypeOfPostArr}
            RadioName="typeOfPost"
            onChangeFunction={handleInput}
            RadioValue={postDetails.typeOfPost}
          />
        </div>
        {isJobLink ? (
          <CreatePostInput
            inputType="text"
            inputName="jobLink"
            inputValue={postDetails.jobLink}
            onChangeFunction={handleInput}
            labelContent="Job Link"
            isInput={true}
          />
        ) : null}
        <div className="mt-2">
          <p
            style={{
              fontFamily: "'Manrope' , sans-serif",
              fontStyle: "normal",
              fontWeight: "500",
              fontSize: "1.1vw",
              lineHeight: "1.4vw",
              color: "#444444",
              marginBottom: "0.8vw",
            }}
          >
            Photos
          </p>
          {
            <CreatePostImagesPreviewTempCompPrimary
              attachedImagesDetailsUpdater={attachedImagesDetailsUpdaterP}
              attachedImagesDimensionsDetailsUpdater={
                attachedImagesDimensionsDetailsUpdaterP
              }
            />
          }
        </div>
        <button
          className="w-28 rounded h-9 font-manrope font-semibold text-white transition-colors duration-200 hover:bg-blue-500 my-8 m-auto"
          style={{ backgroundColor: "#C4C4C4" }}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
