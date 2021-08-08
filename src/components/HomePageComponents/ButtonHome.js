import React from "react";
import "../../styles/HomePage/HomeMainContainer/ButtonHome.css";
function ButtonHome({ content, styleButton, jobLink }) {
  return (
    <button
      onClick={jobLink ? (e) => {
        e.preventDefault();
        window.open(
          jobLink,
          '_blank'
        );
      } : null}
      type="submit"
      className="ButtonHome"
      style={styleButton}>
      {content}
    </button>
  );
}

export default ButtonHome;
