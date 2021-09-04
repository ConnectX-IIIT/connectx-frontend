import React, { useState, useEffect } from "react";
import "../../styles/CreatePost/CreatePost.css";
import CreatePostInput from "./CreatePostInput";
import CreatePostRadio from "./CreatePostRadio";
import DefaultPostImage from "../../assets/create_post/default_image.svg";

import replaceIcon from "../../assets/create_post/ic_delete_image.svg";
import AddIcon from "../../assets/create_post/ic_add_image.svg";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import instance from "../../helper/axios";
import CreatePostImageInput from "./CreatePostImageInput";
import deleteIcon from "../../assets/create_post/ic_close.svg";
import { useStateValue } from "../../helper/state_provider";
import { addPost } from "./helper/add_post";

let tempAttachedImgs = [];
let tempAttachedImgsHeight = [];
let tempAttachedImgsWidth = [];

function CreatePost() {
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
    attachedImgHeight: [],
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
      element2.classList.remove("pointer-events-none");
    }
  }

  function toggleImgSourceDelete(index) {
    if (index < 5) {
      var element = document.getElementsByClassName("ImgCreatePost")[index];
      element.src = AddIcon;
      element.style.pointerEvents = "none";
      var element2 = document.getElementsByClassName("OverLayImageCreatePost")[
        index
      ];
      element2.style.display = "none";
      element2.classList.add("pointer-events-none");
      let element3 = document.getElementsByClassName("CreatePostImage")[index];
      element3.src = DefaultPostImage;
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
    tempAttachedImgs[index] = e.target.files[0];
    setPostDetails({ ...postDetails, attachedImgs: tempImgArr });

    let tempImgHeight = postDetails.attachedImgHeight;

    var _URL = window.URL || window.webkitURL;
    let img = new Image();
    var objectUrl = _URL.createObjectURL(file);
    img.onload = function () {
      console.log(this.width + " " + this.height);
      tempImgHeight.push(this.height);
      tempAttachedImgsHeight[index] = this.height;
      setPostDetails({ ...postDetails, attachedImgHeight: tempImgHeight });
      _URL.revokeObjectURL(objectUrl);
    };
    img.src = objectUrl;

    ImgVisible(index + 1);
    toggleImgSource(index);

    console.log(tempAttachedImgs, tempAttachedImgsHeight);

    // if (document.getElementsByClassName("CreatePostImage")[0] !== undefined) {
    //   console.log(document.getElementsByClassName("CreatePostImage")[0]);
    // }
  };

  const handleDeleteImg = (index) => (e) => {
    let tempImgArr = postDetails.attachedImgs;
    let tempHeightArr = postDetails.attachedImgHeight;
    if (tempImgArr.includes(tempAttachedImgs[index])) {
      for (let i = 0; i < tempImgArr.length; i++) {
        if (tempImgArr[i] === tempAttachedImgs[index]) {
          tempImgArr.splice(i, 1);
          break;
        }
      }
      for (let i = 0; i < tempHeightArr.length; i++) {
        if (tempHeightArr[i] === tempAttachedImgsHeight[index]) {
          tempHeightArr.splice(i, 1);
          break;
        }
      }
      tempAttachedImgs[index] = undefined;
      tempAttachedImgsHeight[index] = undefined;
      setPostDetails({ ...postDetails, attachedImgs: tempImgArr });
      setPostDetails({ ...postDetails, attachedImgHeight: tempHeightArr });
      toggleImgSourceDelete(index);
      console.log(postDetails.attachedImgs, postDetails.attachedImgHeight);
    }
  };

  const handleCreatePostImage = (index) => (e) => {
    if (tempAttachedImgs[index] === undefined) {
      previewFile(index)(e);
      return;
    } else {
      handleDeleteImg(index)(e);
    }
  };

  useEffect(() => {
    ImgVisible(0);
  }, []);

  // console.log(postDetails.attachedImgs);

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
        onSubmit={(e) => addPost(userDetails, history, postDetails)(e)}
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
            <CreatePostImageInput
              index={0}
              onChangeFunction={handleCreatePostImage(0)}
            />
            <CreatePostImageInput
              index={1}
              onChangeFunction={handleCreatePostImage(1)}
            />
            <CreatePostImageInput
              index={2}
              onChangeFunction={handleCreatePostImage(2)}
            />
            <CreatePostImageInput
              index={3}
              onChangeFunction={handleCreatePostImage(3)}
            />
            <CreatePostImageInput
              index={4}
              onChangeFunction={handleCreatePostImage(4)}
            />
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
