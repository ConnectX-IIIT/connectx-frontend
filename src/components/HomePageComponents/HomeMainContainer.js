import React, { useEffect, useState } from "react";
import HomeUserDetails from "./HomeUserDetails";
import HomePageCard from "./HomePageCard";
import "../../styles/HomePage/HomeMainContainer/HomeMainContainer.css";
import instance from "../../helper/axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

function HomeMainContainer() {
  const history = useHistory();
  const [postData, setPostData] = useState([]);

  const fetchData = async (e) => {
    try {
      const token = Cookies.get("token");

      if (token) {
        const getDetailsRes = await instance.get(`/home/posts`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        const data = getDetailsRes.data.postData;
        setPostData(data);
      } else {
        history.replace("/signin");
      }
    } catch (error) {
      return alert(`${error.response.data.error}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const HomePageCardDetailsList = postData.map((item, index) => {
    return (
      <HomePageCard
        key={index}
        PostId={item._id}
        UserId={item.user}
        jobLink={item.jobLink}
        UserProfilePhoto={item.userProfile}
        TimeStamp={item.timestamp}
        PostUserName={item.userName}
        PostContent={item.description}
        PostImageUrls={item.attachedImages}
        Upvotes={item.reactions}
        PostTitle={item.title}
      />
    );
  });

  return (
    <div className="HomeMainContainer">
      <HomeUserDetails />
      <div>{HomePageCardDetailsList}</div>
    </div>
  );
}

export default HomeMainContainer;
