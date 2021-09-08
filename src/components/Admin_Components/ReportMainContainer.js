import React from 'react'
import AdminPannelReportListing from "./AdminPannelReportListing"
import AdminPannelReportMiddleContainer from "./AdminPannelReportMiddleContainer"
import AdminPannelReportInfoContainer from "./AdminPannelReportInfoContainer"
import "../../styles/Admin/ReportMainContainer.css"
const ReportMainContainer = () => {
    return (
        <div className="admin-pannel-report-main-container">
            <div className="admin-pannel-report-left-container">
                <AdminPannelReportListing/>
            </div>
            <div className="admin-pannel-report-middle-container">
                <AdminPannelReportMiddleContainer/>
            </div>
            <div className="admin-pannel-report-right-container">
                 <AdminPannelReportInfoContainer/>
            </div>
        </div>
    )
}

export default ReportMainContainer
