import React, { useEffect, useState } from "react";
import HomeUserDetails from "./HomeUserDetails";
import HomePageCard from "./HomePageCard";
import "../../styles/HomePage/HomeMainContainer/HomeMainContainer.css";
import instance from "../../helper/axios";
import Cookies from "js-cookie";

function HomeMainContainer() {

  const [postData, setPostData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (e) => {
    try {
      const token = Cookies.get("token");

      if (token) {
        const getDetailsRes = await instance.get(`/home/posts`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        const Data = getDetailsRes.data.postData;
        setPostData(Data);

      }
    } catch (error) {
      return alert(`${error.response.data.error}`);
    }
  }

  const HomePageCardDetailsList = postData.map((item, index) => {
    return (
      <HomePageCard
        key={index}
        PostId={item._id}
        UserId={item.user}
        UserProfilePhoto={item.userProfile}
        TimeStamp={item.timestamp}
        PostUserName={item.userName}
        PostContent={item.description}
        PostImageUrls={item.attachedImages}
        Upvotes={item.reactions}
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
