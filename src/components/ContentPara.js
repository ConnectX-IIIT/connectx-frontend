import React from "react";
import "../styles/ContentPara.css";

function ContentPara({ Content }) {
  return (
    <div className="ContentPara">
      <p>{Content}</p>
    </div>
  );
}

export default ContentPara;
