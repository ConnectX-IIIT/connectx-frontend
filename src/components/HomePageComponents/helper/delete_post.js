import Cookies from "js-cookie";
import instance from "../../../helper/axios";

export const handleDeletePost = async (userDetails, PostId, history, postData, setPostData, type, isDiscussion, index) => {

    const token = Cookies.get("token");

    if (!token) {
        history.replace("/signin");
    }

    if (!userDetails.isMailVerified) {
        return alert("Please verify your mail!");
    }

    if (type === "post" && !userDetails.posts.includes(PostId)) {
        return alert("You can't remove this post!");
    }

    if (type === "question" && !userDetails.questions.includes(PostId)) {
        return alert("You can't remove this question!");
    }

    if (type === "discussion" && !userDetails.discussions.includes(PostId)) {
        return alert("You can't remove this comment!");
    }

    try {
        await instance.get(`/${type}/remove/${PostId}`, {
            headers: {
                Authorization: `${token}`,
            },
        });

        if (type === 'post' || type === 'question') {
            setPostData(postData.filter((post) => post._id !== PostId));
        }
        if (type === 'discussion' && isDiscussion) {
            setPostData(postData.filter((item) => item.discussions._id !== PostId));
        }

    } catch (error) {
        if (error.response.status === 500) {
            return alert(`Server error occured!`);
        }
        if (error.response.status === 400 || error.response.status === 401) {
            return alert(`You can't remove this comment!`);
        }
        if (error.response.status === 408) {
            return alert(`Please verify your mail!`);
        }
        return alert(`Your session has expired, please login again!`);
    }
}