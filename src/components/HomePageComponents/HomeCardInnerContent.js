import React, { useState } from "react";
import "../../styles/HomePage/HomeMainContainer/HomeCardInnerContent.css";

const ReadMore = ({ children }) => {
  const ReadMoreText = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="ReadMoreText">
      {isReadMore ? ReadMoreText.slice(0, 250) : ReadMoreText}
      <span onClick={toggleReadMore} className="readOrHide">
        {isReadMore ? "...Read More" : " Show Less"}
      </span>
    </p>
  );
};

function HomeCardInnerContent({ InnerContent }) {
  return (
    <div className="HomeCardInnerContentContainer">
      <ReadMore>{InnerContent}</ReadMore>
    </div>
  );
}

export default HomeCardInnerContent;
