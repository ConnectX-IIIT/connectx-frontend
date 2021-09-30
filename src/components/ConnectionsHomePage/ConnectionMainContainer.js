import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../../styles/Connection/ConnectionMainContainer.css";
import ConnectionIndividualComponent from "./ConnectionIndividualComponent";
import { fetchUsers } from "./helper/fetch_users";

function ConnectionMainContainer() {

  const history = useHistory();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchUsers(history, setUserData);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
