import React from 'react'
import DefaultProfilePhoto from "../../assets/_rough/Jethalal-1200.jpg";
import "../../styles/Chats/GroupMembers.css";
const GroupMembers = () => {
    return (
        <div className="groupmembers">
            <div className="MemberName">Jethalal</div>
            <div className="MemberInfo">Lorem ipsum, dolor sit amet consectetur ...</div>
            <img src={DefaultProfilePhoto} className="MembersProfile"></img>
        </div>
    )
}

export default GroupMembers
