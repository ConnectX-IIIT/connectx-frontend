import React from "react";
import ConnectxLogo from "../../assets/_logo/svg/logo_2.0.svg";
import "../../styles/Admin/OuterContainer.css";
const AdminPannelHeaderContainer = () => {
  return (
    <div className="admin-pannel-outer-container">
      <div className="admin-pannel-header">
        <img
          src={`${ConnectxLogo}`}
          className="admin-pannel-connectx-logo"
          alt="connectx-logo"
        />
        <div className="admin-pannel-heading">
          <p id="admin-pannel-verification-wrapper">Verification requests</p>
          <p id="admin-pannel-report-wrapper">Reports</p>
        </div>
      </div>
      
    </div>
  );
};

export default AdminPannelHeaderContainer;
