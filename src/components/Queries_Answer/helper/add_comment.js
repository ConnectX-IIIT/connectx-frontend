import Cookies from "js-cookie";
import instance from "../../../helper/axios";

export const addComment = (userDetails, history, content, answerId, reference, setCommentContent) => async (e) => {
    e.preventDefault();

    const token = Cookies.get("token");

    if (!token) {
        history.replace("/signin");
    }

    if (!userDetails.isMailVerified) {
        return alert("Please verify your mail!");
    }

    if (!content) {
        return alert("You can't post empty comment!");
    }

    if (!content.replace(/\s/g, "").length) {
        return alert("You can't post comment with only spaces!");
    }

    try {
        await instance.post(
            `/answer/addcomment`,
            {
                content,
                answerId,
                reference,
            },
            {
                headers: {
                    Authorization: `${token}`,
                },
            }
        );

        setCommentContent("")

    } catch (error) {
        if (error.response.status === 500) {
            return alert(`Server error occured!`);
        }
        if (error.response.status === 400) {
            return alert(`You can't answer empty answer!`);
        }
        if (error.response.status === 408) {
            return alert(`Please verify your mail!`);
        }
        return alert(`Your session has expired, please login again!`);
    }
};