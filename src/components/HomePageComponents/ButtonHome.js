import React from "react";
import "../../styles/HomePage/HomeMainContainer/ButtonHome.css";
function ButtonHome({ content, styleButton }) {
  return (
    <button type="submit" className="ButtonHome" style={styleButton}>
      {content}
    </button>
  );
}

export default ButtonHome;
