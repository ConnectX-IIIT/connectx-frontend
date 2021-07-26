import React from "react";
import "../../styles/About/AboutPagePara.css";

function AboutPagePara({ content, paraStyle }) {
  return (
    <div>
      <p style={paraStyle} className="AboutPagePara">
        {content}
      </p>
    </div>
  );
}

export default AboutPagePara;
