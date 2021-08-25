import React from "react";
import DefaultPostImage from "../../assets/create_post/default_image.svg";
import CreatePostAddIcon from "../../assets/create_post/ic_add_image.svg";

function CreatePostImageInput({ index, onChangeFunction }) {
  return (
    <div className="relative mr-4">
      <input
        type="file"
        name="attachedImgs"
        accept=".png , .jpg , .jpeg "
        onChange={onChangeFunction}
        className="CreatePostInput hidden"
      />
      <img
        src={DefaultPostImage}
        alt="uploaded post"
        className="CreatePostImage w-28 h-28  object-cover cursor-pointer"
        style={{ display: "none" }}
        onClick={() => {
          document.getElementsByClassName("CreatePostInput")[index].click();
        }}
      />
      <img
        src={CreatePostAddIcon}
        className="absolute ImgCreatePost z-10 cursor-pointer "
        style={{ top: "39%", left: "40%" }}
        alt="Add Icon"
        onClick={onChangeFunction}
      />
      <div
        className="w-full h-full absolute top-0 left-0 OverLayImageCreatePost pointer-events-none"
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "none",
        }}
      ></div>
    </div>
  );
}

export default CreatePostImageInput;
