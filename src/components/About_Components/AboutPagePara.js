import React from "react";
import "../../styles/About/AboutPagePara.css";

function AboutPagePara({ content, paraColor, paraWidth }) {
  return (
    <div>
      <p
        style={{
          color: paraColor,
          width: paraWidth,
        }}
        className="AboutPagePara"
      >
        {content}
      </p>
    </div>
  );
}

export default AboutPagePara;
