import React from "react";
import "../../styles/CreatePost/create_post_image_preview.css";
import CreatePostRemoveImageIcon from "../../assets/create_post/ic_delete_image.svg";

function CreatePostImageContainerComp({
  previewImageIndex,
  addPostPreviewImageSrc,
  imageRemoverFunction,
  imageDimensionsUpdater,
}) {
  return (
    <div className="create-post-input-image-preview">
      <img
        src={addPostPreviewImageSrc}
        alt=""
        onLoad={(e) => {
          imageDimensionsUpdater(
            previewImageIndex,
            e.target.naturalWidth,
            e.target.naturalHeight
          );
        }}
        className="create-post-preview-img"
      />
      <div className="create-post-preview-image-overlay">
        <img
          src={CreatePostRemoveImageIcon}
          alt=""
          onClick={() => {
            imageRemoverFunction(previewImageIndex);
          }}
          className="create-post-preview-image-delete-button"
        />
      </div>
    </div>
  );
}

export default CreatePostImageContainerComp;
