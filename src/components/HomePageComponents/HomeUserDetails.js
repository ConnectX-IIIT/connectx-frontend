import React from "react";
import { Link } from "react-router-dom";
import DefaultCoverPhoto from "../../assets/profile/user_profile_default_cover.svg";
import DefaultProfilePhoto from "../../assets/profile/user_profile_default_icon.svg";
import TrendingIcon from "../../assets/home/left_container/ic_trending.svg";
import filterIcon from "../../assets/home/left_container/ic_filter.svg";
import "../../styles/HomePage/HomeMainContainer/HomeUserDetails.css";
import ButtonHome from "../../components/HomePageComponents/ButtonHome";
import { useStateValue } from "../../helper/state_provider";

function HomeUserDetails() {

  const imgURL = "https://obscure-ridge-13663.herokuapp.com/user/fetch/";
  const [{ userDetails }, dispatch] = useStateValue();

  return (
    <div className="HomeUserDetails">
      <div id="UpperImageContainer">
        <img src={`${imgURL}${userDetails.backgroundPicture}`} alt="Cover" />
        <img src={`${imgURL}${userDetails.profilePicture}`} alt="profile" />
      </div>
      <div id="UserDetailsContent">
        <h2>{userDetails.name}</h2>
        <p>
          {userDetails.description}
        </p>
        <Link to="/">View Profile</Link>
      </div>
      <div className="ProfileOptions">
        <img src={TrendingIcon} alt="trending" />
        Trending
      </div>
      <div className="ProfileOptions">
        <img src={filterIcon} alt="filter" />
        Filter
      </div>
      <div>
        <form action="">
          <div className="form-group">
            <input type="checkbox" id="jobs" />
            <label htmlFor="jobs">Jobs</label>
          </div>
          <div className="form-group">
            <input type="checkbox" id="projects" />
            <label htmlFor="projects">Projects</label>
          </div>
          <div className="form-group">
            <input type="checkbox" id="blogs" />
            <label htmlFor="blogs">Blogs</label>
          </div>
          <ButtonHome
            content="Apply"
            styleButton={{
              width: "6.25vw",
              height: "2.2vw",
              textTransform: "uppercase",
              fontSize: "0.9vw",
              marginTop: "2vw",
              marginBottom: "2vw",
            }}
          />
        </form>
      </div>
    </div>
  );
}

export default HomeUserDetails;
