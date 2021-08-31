import React from "react";
import { useStateValue } from "../../helper/state_provider";
import { handleMessage } from "../ConnectionsHomePage/ConnectionIndividualComponent";
import "../../styles/HomePage/HomeMainContainer/ButtonHome.css";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import instance from "../../helper/axios";

function ButtonHome({ content, styleButton, jobLink, filter, postUserId }) {

  const history = useHistory();
  const [{ userDetails, postFilter }, dispatch] = useStateValue();

  async function fetchData(userId) {
    try {
      const token = Cookies.get("token");

      if (token) {
        const getDetailsRes = await instance.get(`/user/getdetails/${userId}`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        const userData = await getDetailsRes.data.userData;
        return userData;
      }
    } catch (error) {
      if (error.response.status === 500) {
        return alert(`Server error occured!`);
      }
      return alert(`Your session has expired, please login again!`);
    }
  }

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
      const userData = await fetchData(postUserId);
      handleMessage(userData, userDetails, dispatch, history)(e);
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
