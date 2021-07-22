import React from "react";
import "../styles/Heading.css";

function Heading({ Heading_content, headingWidth }) {
  return (
    <h2 className="Heading" style={{ width: headingWidth }}>
      {Heading_content}
    </h2>
  );
}

export default Heading;
