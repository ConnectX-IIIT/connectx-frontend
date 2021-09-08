import React from 'react'
import "../../styles/Admin/AdminPannelReportListing.css"

const ListingReportComponent = ({innerdata}) =>{
    return(
        <div className="admin-pannel-report-listing-individual-wrapper">
            {innerdata}
        </div>
    )
    }
const AdminPannelReportListing = () => {
    return (
        <div className="admin-pannel-report-listing-container">
            <ListingReportComponent innerdata="Posts"/>
            <ListingReportComponent innerdata="Questions"/>
            <ListingReportComponent innerdata="Answers"/>
            <ListingReportComponent innerdata="Users"/>
        </div>
    )
}

export default AdminPannelReportListing
