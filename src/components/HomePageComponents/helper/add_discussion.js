import Cookies from "js-cookie";
import instance from "../../../helper/axios";

export const addDiscussion = (userDetails, history, content, postId, reference) => async (e) => {
    e.preventDefault();

    const token = Cookies.get("token");

    if (!token) {
        history.replace("/signin");
    }

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