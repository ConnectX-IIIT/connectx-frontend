import React from "react";
import { useStateValue } from "../../helper/state_provider";
import { handleMessage } from "../ConnectionsHomePage/ConnectionIndividualComponent";
import "../../styles/HomePage/HomeMainContainer/ButtonHome.css";
import { useHistory } from "react-router-dom";
import { fetchUserDetails } from "./helper/fetch_user_details";

function ButtonHome({ content, styleButton, jobLink, filter, postUserId }) {

  const history = useHistory();
  const [{ userDetails, postFilter }, dispatch] = useStateValue();

  const handleSubmit = async (e) => {

    if (jobLink) {
      e.preventDefault();
      window.open(jobLink, '_blank');
    }

    if (filter) {
      e.preventDefault();
      await dispatch({
        type: "UPDATE_POST_FILTER",
        filter,
      })
    }

    if (postUserId) {
      const userData = await fetchUserDetails(userDetails, history, postUserId);
      if (userData) {
        handleMessage(userData, userDetails, dispatch, history)(e);
      }
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
