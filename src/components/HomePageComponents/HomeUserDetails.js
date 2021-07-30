import React from "react";
import { Link } from "react-router-dom";
import DefaultCoverPhoto from "../../assets/profile/user_profile_default_cover.svg";
import DefaultProfilePhoto from "../../assets/profile/user_profile_default_icon.svg";
import TrendingIcon from "../../assets/home/left_container/ic_trending.svg";
import filterIcon from "../../assets/home/left_container/ic_filter.svg";
import "../../styles/HomePage/HomeMainContainer/HomeUserDetails.css";
import ButtonHome from "../../components/HomePageComponents/ButtonHome";

function HomeUserDetails() {
  return (
    <div className="HomeUserDetails">
      <div id="UpperImageContainer">
        <img src={DefaultCoverPhoto} alt="Cover" />
        <img src={DefaultProfilePhoto} alt="profile" />
      </div>
      <div id="UserDetailsContent">
        <h2>Raj Noobda</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim,
          consequuntur?
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
          <div class="form-group">
            <input type="checkbox" id="jobs" />
            <label for="jobs">Jobs</label>
          </div>
          <div class="form-group">
            <input type="checkbox" id="projects" />
            <label for="projects">Projects</label>
          </div>
          <div class="form-group">
            <input type="checkbox" id="blogs" />
            <label for="blogs">Blogs</label>
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
