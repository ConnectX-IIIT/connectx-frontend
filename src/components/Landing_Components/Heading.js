import React from "react";
import ContentPara from "./ContentPara";
import "../../styles/Landing/Heading.css";

function Heading({ Heading_content, headingWidth, Heading_para, isRight }) {
  return (
    <div style={isRight ? { paddingLeft: "8vw" } : null}>
      <h2 className="Heading" style={{ width: headingWidth }}>
        {Heading_content}
      </h2>
      <ContentPara Content={Heading_para} />
    </div>
  );
}

export default Heading;
