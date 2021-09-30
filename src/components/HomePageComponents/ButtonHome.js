import React from "react";
import { useStateValue } from "../../helper/state_provider";
import "../../styles/HomePage/HomeMainContainer/ButtonHome.css";
import { useHistory } from "react-router-dom";
import { handleMessage } from "../ConnectionsHomePage/helper/handle_message";
import { fetchUserDetails } from "../ProfilePage/helper/get_user_details";

function ButtonHome({ content, styleButton, jobLink, filter, postUserId }) {

  const history = useHistory();

  const [{ userDetails }, dispatch] = useStateValue();

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
      if (!userDetails.isVerified) {
        return alert(`Your verification is under process!`);
      }
      const userData = await fetchUserDetails(history, null, postUserId);
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
