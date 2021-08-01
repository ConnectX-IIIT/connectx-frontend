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

function HomeCardInnerContent() {
  return (
    <div className="HomeCardInnerContentContainer">
      <ReadMore>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non
        posuere neque, a tincidunt sem. Proin a diam eu orci ultrices faucibus.
        Sed luctus imperdiet ipsum eget lobortis. Integer eget ex massa.
        Suspendisse eget mauris enim. Sed et condimentum ex, et sollicitudin
        libero. Morbi et diam fermentum, ultrices libero laoreet, mattis orci.
        Quise commodo..
      </ReadMore>
    </div>
  );
}

export default HomeCardInnerContent;
