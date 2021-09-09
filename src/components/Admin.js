import React from 'react'
import AdminPannelHeaderContainer from "./Admin_Components/AdminPannelHeaderContainer"
import VerificationMainContainer from './Admin_Components/VerificationMainContainer'
import ReportMainContainer from "./Admin_Components/ReportMainContainer" 
const Admin = () => {
    return (
        <div>
            <AdminPannelHeaderContainer />
            {/* <VerificationMainContainer/> */}
            <ReportMainContainer/>
        </div>
    )
}

export default Admin
