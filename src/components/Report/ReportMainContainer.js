import React, { useState } from "react";

import "../../styles/Report/ReportMainContainer.css";
import closeIcon from "../../assets/create_post/ic_close.svg";

function ReportMainContainer() {
  const [report, setReport] = useState({
    reportText: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setReport({
      ...report,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="home-page-report-main-wrapper-wrapper">
      <div className="home-page-report-main-wrapper">
        <div>Report</div>
        <img
          src={closeIcon}
          alt="close"
          onClick={() => {
            document
              .getElementsByClassName("home-main-report-wrapper")[0]
              .classList.toggle("hidden");
          }}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          name="reportText"
          onChange={handleInput}
          className="report-main-container-text-area"
          value={report.reportText}
          placeholder="Enter Your Report Here..."
        />
        <button className="home-page-report-main-wrapper-form-button">
          Report
        </button>
      </form>
    </div>
  );
}

export default ReportMainContainer;
