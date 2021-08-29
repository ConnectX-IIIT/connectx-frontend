import React from "react";
import { useStateValue } from "../../helper/state_provider";
import "../../styles/HomePage/HomeMainContainer/ButtonHome.css";
function ButtonHome({ content, styleButton, jobLink, filter }) {

  const [{ userDetails, postFilter }, dispatch] = useStateValue();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (jobLink) {
      window.open(jobLink, '_blank');
    }

    if (filter) {
      await dispatch({
        type: "UPDATE_POST_FILTER",
        filter,
      })
    }
  }

  return (
    <button
      onClick={handleSubmit}
      type="submit"
      className="ButtonHome"
      style={styleButton}>
      {content}
    </button>
  );
}

export default ButtonHome;
