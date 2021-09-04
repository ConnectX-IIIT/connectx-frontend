import Cookies from "js-cookie";
import instance from "../../../helper/axios";

export const handleDeletePost = (userDetails, PostId, history) => async (e) => {
    e.preventDefault();

    const token = Cookies.get("token");

    if (!token) {
        history.replace("/signin");
    }

    try {
        if (!userDetails.isMailVerified) {
            return alert("Please verify your mail!");
        }
        if (!userDetails.isVerified) {
            return alert("Your verification is under process!");
        }
        if (!userDetails.posts.includes(PostId)) {
            return alert("You can't remove this post!");
        }
        await instance.get(`/post/remove/${PostId}`, {
            headers: {
                Authorization: `${token}`,
            },
        });

    } catch (error) {
        if (error.response.status === 500) {
            return alert(`Server error occured!`);
        }
        if (error.response.status === 400 || error.response.status === 401) {
            return alert(`You can't remove this comment!`);
        }
        if (error.response.status === 408) {
            return alert(`Your verification is under process!`);
        }
        return alert(`Your session has expired, please login again!`);
    }
}