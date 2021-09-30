import React from "react";
import ConnectxLogo from "../../assets/_logo/svg/logo_2.0.svg";

import {
  NavLink,
} from "react-router-dom";

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
          <NavLink
            id="admin-pannel-verification-wrapper"
            to="/admin/verification"
            activeClassName="report-section-active-class"
          >
            Verification Requests
          </NavLink>
          <NavLink
            id="admin-pannel-report-wrapper"
            to="/admin/reports"
            activeClassName="report-section-active-class"
          >
            Reports
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AdminPannelHeaderContainer;
