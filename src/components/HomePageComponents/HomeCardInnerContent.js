import React, { useState } from "react";
import "../../styles/HomePage/HomeMainContainer/HomeCardInnerContent.css";

const ReadMore = ({ children, styleInnerContent }) => {
  const ReadMoreText = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <pre className="ReadMoreText" style={styleInnerContent}>
      {isReadMore ? ReadMoreText.slice(0, 250) : ReadMoreText}
      {ReadMoreText.length > 250 ? (
        <span onClick={toggleReadMore} className="readOrHide">
          {isReadMore ? "...Read More" : " ..Show Less"}
        </span>
      ) : null}
    </pre>
  );
};

function HomeCardInnerContent({ InnerContent, styleInnerContent }) {
  return (
    <div className="HomeCardInnerContentContainer">
      <ReadMore styleInnerContent={styleInnerContent}>{InnerContent}</ReadMore>
    </div>
  );
}

export default HomeCardInnerContent;
