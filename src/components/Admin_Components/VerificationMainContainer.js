import React from "react";
import "../../styles/Admin/VerificationMainContainer.css";
import AdminPannelListingComponent from "./AdminPannelListingComponent";
import AdminPannelUserProfile from "./AdminPannelUserProfile";

const VerificationMainContainer = () => {
  return (
    <div className="admin-pannel-verification-main-container">
      <div className="admin-pannel-left-container">
        <AdminPannelListingComponent />
      </div>
      <div>
          <AdminPannelUserProfile/>
      </div>
    </div>
  );
};

export default VerificationMainContainer;
