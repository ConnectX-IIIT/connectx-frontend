import React from "react";
import "../../styles/Question/QuestionSectionButtons.css";
import shareIcon from "../../assets/home/post/bottom/ic_share.svg";
import commentIcon from "../../assets/home/post/bottom/ic_discussion.svg";

const shareStyle = {
  backgroundColor: "#E5F5FF",
  Color: "#1792DD",
};
const commentStyle = {
  backgroundColor: "#E8FFEB",
  Color: "#00CA51",
};

function QuestionSectionButtons({ buttonType = "share" }) {
  return (
    <button
      className="QuestionSectionButtons"
      style={buttonType === "share" ? shareStyle : commentStyle}
    >
      <img src={buttonType === "share" ? shareIcon : commentIcon} alt="icon" />
      <div>{buttonType === "share" ? "Share" : "Comments"}</div>
    </button>
  );
}

export default QuestionSectionButtons;
