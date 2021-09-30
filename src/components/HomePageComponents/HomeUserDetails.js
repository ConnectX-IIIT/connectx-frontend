import React, { useState } from "react";
import { Link } from "react-router-dom";
import TrendingIcon from "../../assets/home/left_container/ic_trending.svg";
import filterIcon from "../../assets/home/left_container/ic_filter.svg";
import "../../styles/HomePage/HomeMainContainer/HomeUserDetails.css";
import ButtonHome from "../../components/HomePageComponents/ButtonHome";
import { useStateValue } from "../../helper/state_provider";
import { handlePhoto } from "./helper/handle_photo";

function HomeUserDetails() {
  const [{ userDetails }] = useStateValue();
  const [filter, setFilter] = useState({
    jobs: false,
    projects: false,
    blogs: false,
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value === "true";
    if (value) {
      setFilter({ ...filter, [name]: false });
    } else {
      setFilter({ ...filter, [name]: true });
    }
  };

  return (
    <div className="HomeUserDetails">
      <div id="UpperImageContainer">
        <img src={handlePhoto(userDetails.backgroundPicture, 0)} alt="Cover" />
        <img src={handlePhoto(userDetails.profilePicture, 1)} alt="profile" />
      </div>
      <div id="UserDetailsContent">
        <h2>{userDetails.name}</h2>
        <p>{userDetails.description}</p>
        <Link to={`/home/user/${userDetails._id}`}>View Profile</Link>
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
            <input
              type="checkbox"
              name="jobs"
              value={filter.jobs}
              onChange={handleInput}
              id="jobs"
            />
            <label htmlFor="jobs">Jobs</label>
          </div>
          <div className="form-group">
            <input
              type="checkbox"
              name="projects"
              value={filter.projects}
              onChange={handleInput}
              id="projects"
            />
            <label htmlFor="projects">Projects</label>
          </div>
          <div className="form-group">
            <input
              type="checkbox"
              name="blogs"
              value={filter.blogs}
              onChange={handleInput}
              id="blogs"
            />
            <label htmlFor="blogs">Blogs</label>
          </div>
          <ButtonHome
            content="Apply"
            filter={filter}
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
