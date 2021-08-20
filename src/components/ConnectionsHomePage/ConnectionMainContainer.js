import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import "../../styles/Connection/ConnectionMainContainer.css";
import ConnectionIndividualComponent from "./ConnectionIndividualComponent";
import instance from "../../helper/axios";

function ConnectionMainContainer() {

  const [userData, setUserData] = useState([]);

  async function fetchData() {
    try {
      const token = Cookies.get("token");

      if (token) {
        const getDetailsRes = await instance.get(`/home/fetchusers`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        const userDetails = await getDetailsRes.data.userData;
        setUserData(userDetails)
      }
    } catch (error) {
      if (error.response.status === 500) {
        return alert(`Server error occured!`);
      }
      return alert(`Your session has expired, please login again!`);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="ConnectionMainContainer">
      <div className="ConnectionMainContainerInnerContainer">
        {userData.map((item, index) => (
          <ConnectionIndividualComponent user={item} />
        ))}
      </div>
    </div>
  );
}

export default ConnectionMainContainer;
