import React from "react";
import "../../styles/Chats/GroupChat.css";
import SearchIcon from "../../assets/home/top_navbar/ic_search_icon.svg";
import Pen from "../../assets/profile/pen.svg"
import Error from "../../assets/profile/error.svg"

import DefaultProfilePhoto from "../../assets/_rough/Jethalal-1200.jpg";
import GroupMembers from "./GroupMembers";
const GroupChat = () => {
  return (
    <div className="OuterContainer">
      <div className="upperBlock">
        <div className="heading">Group info</div>
        <button><div className="cross">X</div></button>
        <img
          src={DefaultProfilePhoto}
          className="groupImage"
        ></img>
        <div className="imageSideContent">
          <h1>2020-IMT</h1>
          <p>15 members</p>
        </div>
      </div>
      <div className="groupDescription">
        <div className="groupDescriptionHeading">Description</div>
        <button> <img
            src={Pen}
            alt="search"
            className="pen"
           ></img>
            </button>
        <div className="groupDescriptionContent">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem fugit est debitis nemo </div>
      </div>
      <div className="members">
        <div className="numberOfMembers">15 Members</div>
        <button> <img
            src={SearchIcon}
            alt="search"
            className="searchIcon"
            style={{
              top: "40%",
              right: "5%",
            }}></img>
            </button>
      </div>
    
      <GroupMembers />
      <div className="reportBorder">
      <img src={Error} style={{
        position:"relative",
        top:"15px",
     
        left:"90px",
        
      }}></img>
      <div className="report">Report group</div>
      </div>
    </div>
  );
};

export default GroupChat;
