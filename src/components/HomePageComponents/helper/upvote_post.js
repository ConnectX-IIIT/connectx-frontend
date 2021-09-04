import Cookies from "js-cookie";
import instance from "../../../helper/axios";

export const upvotePost = async (userDetails, history, PostId, type) => {

    if (!userDetails.isMailVerified) {
        return alert("Please verify your mail!");
    }

    if (!userDetails.isVerified) {
        return alert("Your verification is under process!");
    }

    try {
        const token = Cookies.get("token");

        if (token) {
            await instance.post(
                `/post/vote/${type}`,
                {
                    postId: PostId,
                },
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );
        } else {
            history.replace("/signin");
        }
    } catch (error) {
        if (error.response.status === 500 || error.response.status === 400) {
            return alert(`Server error occured!`);
        }
        if (error.response.status === 401) {
            return;
        }
        if (error.response.status === 408) {
            return alert(`Your verification is under process!`);
        }
        return alert(`Your session has expired, please login again!`);
    }
}