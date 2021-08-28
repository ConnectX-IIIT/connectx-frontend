import React from "react";
import "../../styles/Chats/GroupChat.css";
import SearchIcon from "../../assets/home/top_navbar/ic_search_icon.svg";
import DefaultProfilePhoto from "../../assets/_rough/Jethalal-1200.jpg";
import GroupMembers from "./GroupMembers";
const GroupChat = () => {
  return (
    <div className="OuterContainer">
      <div className="upperBlock">
        <div className="heading">Group info</div>
        <div className="cross">X</div>
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
      {/* <GroupMembers />
      <GroupMembers /> */}
      <div className="report">Report group</div>
    </div>
  );
};

export default GroupChat;
