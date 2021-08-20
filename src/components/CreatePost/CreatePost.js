import React, { useState, useEffect } from "react";
import "../../styles/CreatePost/CreatePost.css";
import CreatePostInput from "./CreatePostInput";
import CreatePostRadio from "./CreatePostRadio";
import DefaultPostImage from "../../assets/create_post/default_image.svg";

import replaceIcon from "../../assets/create_post/ic_replace_image.svg";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import instance from "../../helper/axios";
import CreatePostImageInput from "./CreatePostImageInput";
import deleteIcon from "../../assets/create_post/ic_close.svg";

function CreatePost() {
  const history = useHistory();
  const TypeOfPostArr = ["Job", "Project", "Blog"];

  const [isJobLink, setJobLink] = useState(false);

  const [postDetails, setPostDetails] = useState({
    postTitle: "",
    postDescription: "",
    jobLink: "",
    typeOfPost: "",
    attachedImgs: [],
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

    // console.log(postDetails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const attachedImgs = postDetails.attachedImgs;
    let isProject = false;

    if (postDetails.typeOfPost === "Project") {
      isProject = true;
    }

    const postData = new FormData();
    postData.append("title", postDetails.postTitle);
    postData.append("description", postDetails.postDescription);
    postData.append("jobLink", postDetails.jobLink);
    postData.append("isProject", isProject);

    for (let file of attachedImgs) {
      postData.append("attachedImgs", file);
    }

    if (!postDetails.postDescription || !postDetails.typeOfPost) {
      return alert("Please fill all the details properly!");
    }

    if (!postDetails.postTitle && postDetails.typeOfPost !== "Blog") {
      return alert("Please add post title!");
    }

    if (!postDetails.jobLink && postDetails.typeOfPost === "Job") {
      return alert("Please add joblink!");
    }

    try {
      const token = Cookies.get("token");

      if (token) {
        const addPostRes = await instance.post(`/home/addpost`, postData, {
          headers: {
            Authorization: `${token}`,
          },
        });

        if (addPostRes.status === 200) {
          history.replace("/home");
          document
            .getElementById("HomeContainerCreatePost")
            .classList.toggle("hidden");
        }
      }
    } catch (error) {
      if (error.response.status === 500) {
        return alert(`Server error occured!`);
      }
      return alert(`Your session has expired, please login again!`);
    }
  };

  function ImgVisible(index) {
    if (index < 5) {
      var element = document.getElementsByClassName("CreatePostImage")[index];
      element.style.display = "block";
    }
  }

  function toggleImgSource(index) {
    if (index < 5) {
      var element = document.getElementsByClassName("ImgCreatePost")[index];
      element.src = replaceIcon;
      element.style.pointerEvents = "auto";
      var element2 = document.getElementsByClassName("OverLayImageCreatePost")[
        index
      ];
      element2.style.display = "block";
    }
  }

  const previewFile = (index) => (e) => {
    let preview = document.getElementsByClassName("CreatePostImage")[index];

    let file =
      document.getElementsByClassName("CreatePostInput")[index].files[0];

    let reader = new FileReader();

    reader.onloadend = function () {
      preview.src = reader.result;
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = DefaultPostImage;
    }

    let tempImgArr = postDetails.attachedImgs;
    tempImgArr.push(e.target.files[0]);
    setPostDetails({ ...postDetails, attachedImgs: tempImgArr });

    ImgVisible(index + 1);
    toggleImgSource(index);
    console.log(file);
  };

  useEffect(() => {
    ImgVisible(0);
  }, []);

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
        onSubmit={handleSubmit}
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
          <div className="flex">
            <CreatePostImageInput index={0} onChangeFunction={previewFile(0)} />
            <CreatePostImageInput index={1} onChangeFunction={previewFile(1)} />
            <CreatePostImageInput index={2} onChangeFunction={previewFile(2)} />
            <CreatePostImageInput index={3} onChangeFunction={previewFile(3)} />
            <CreatePostImageInput index={4} onChangeFunction={previewFile(4)} />
          </div>
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
