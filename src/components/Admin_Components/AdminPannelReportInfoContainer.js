import React from "react";
import "../../styles/Admin/AdminPannelReportInfoContainer.css";
import DefaultCoverPhoto from "../../assets/_rough/achi photo part 2.jpg";

const ReportInfoContainerHeading = ({ innerheading }) => {
  return <div className="admin-pannel-report-info-heading">{innerheading}</div>;
};

const AdminPannelReportInfoContainer = () => {
  return (
    <div className="admin-pannel-report-info-container">
      <div className="admin-pannel-report-upper-heading">
        <ReportInfoContainerHeading innerheading="Report for :" />
      </div>
      <div className="admin-pannel-report-image-wrapper">
        <img
          src={DefaultCoverPhoto}
          alt=""
          className="admin-pannel-report-image-wrapper-img"
        />
      </div>
      <ReportInfoContainerHeading innerheading="Reported by :" />
      <div className="admin-pannel-report-user-data">
        <div className="admin-pannel-report-user-profile">
          <img
            src={DefaultCoverPhoto}
            alt=""
            className="admin-pannel-report-user-profile-image-wrapper-img"
          />
        </div>
        <div className="user-profile-report-info-wrapper">
          <p className="user-profile-report-user-name">Raj Noobda</p>
          <p className="user-profile-report-user-batch">WatchMan</p>
          <p className="user-profile-report-user-year">2000-2028</p>
          <p className="user-profile-report-user-description">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque
            sequi pariatur ullam perspiciatis repudiandae amet, odio adipisci
          </p>
          <p className="user-profile-report-user-contact">
            <p className="user-profile-report-phone">4946234949</p>
            <p className="user-profile-report-email">rajnoobda@iiitm.ac.in</p>
          </p>
        </div>
      </div>
      <div className="admin-pannel-report-take-action-wrapper">
        Take Action :
      </div>
      <div className="admin-pannel-report-content-wrapper">
        <div className="admin-pannel-report-ignore-wrapper">Ignore</div>
        <div className="admin-pannel-report-button-wrapper">
          <button className="admin-pannel-report-button">Delete Post</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPannelReportInfoContainer;
