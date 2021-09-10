import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useStateValue } from "../../helper/state_provider";
import { fetchPosts } from "../HomePageComponents/helper/fetch_posts";
import HomePageCard from "../HomePageComponents/HomePageCard";

function ProfilePagePost(props) {

  const history = useHistory();
  const [{ userDetails }, dispatch] = useStateValue();
  const [postData, setPostData] = useState([]);
  const userId = props.match.params.userId;

  useEffect(() => {
    fetchPosts(history, userId, setPostData);
  }, []);

  const postList = postData.map((item, index) => {
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
        isPostProject={item.isProject}
        discussionsIds={item.discussions}
      />
    );
  });

  return <div>{postList}</div>;
}

export default ProfilePagePost;
