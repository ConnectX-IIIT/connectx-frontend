import React, { useState } from "react";
import "../../styles/HomePage/HomeMainContainer/HomeCardInnerContent.css";

const ReadMore = ({ children }) => {
  const ReadMoreText = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <pre className="ReadMoreText">
      {isReadMore ? ReadMoreText.slice(0, 250) : ReadMoreText}
      {ReadMoreText.length > 250 ? (
        <span onClick={toggleReadMore} className="readOrHide">
          {isReadMore ? "...Read More" : " Show Less"}
        </span>
      ) : null}
    </pre>
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
