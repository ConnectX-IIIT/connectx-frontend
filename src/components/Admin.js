import React from "react";
import { Switch, Route } from "react-router-dom";

import AdminPannelHeaderContainer from "./Admin_Components/AdminPannelHeaderContainer";
import VerificationMainContainer from "./Admin_Components/VerificationMainContainer";
import ReportMainContainer from "./Admin_Components/ReportMainContainer";
const Admin = () => {
  return (
    <div>
      <AdminPannelHeaderContainer />
      <Switch>
        <Route
          exact
          path="/admin/verification"
          component={VerificationMainContainer}
        />
        <Route exact path="/admin/reports" component={ReportMainContainer} />
      </Switch>
      {/* <VerificationMainContainer/> */}
      {/* <ReportMainContainer/> */}
    </div>
  );
};

export default Admin;
