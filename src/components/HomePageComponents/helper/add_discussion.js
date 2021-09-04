import Cookies from "js-cookie";
import instance from "../../../helper/axios";

export const addDiscussion = (userDetails, history, content, postId, reference) => async (e) => {
    e.preventDefault();

    if (!userDetails.isMailVerified) {
        return alert("Please verify your mail!");
    }

    if (!userDetails.isVerified) {
        return alert("Your verification is under process!");
    }

    if (reference || !content) {
        return alert("You can't post empty comment!");
    }

    try {
        const token = Cookies.get("token");

        if (token) {
            await instance.post(
                `/post/adddiscussion`,
                {
                    content,
                    postId,
                    reference,
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
        if (error.response.status === 500) {
            return alert(`Server error occured!`);
        }
        if (error.response.status === 400) {
            return alert(`You can't post empty post!`);
        }
        if (error.response.status === 408) {
            return alert(`Your verification is under process!`);
        }
        return alert(`Your session has expired, please login again!`);
    }
};