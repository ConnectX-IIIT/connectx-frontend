import Cookies from "js-cookie";
import instance from "../../../helper/axios";

export const fetchComments = async (history, commentIds, setComments) => {

    const token = Cookies.get("token");

    if (!token) {
        history.replace("/signin");
    }

    try {
        const commentRes = await instance.post(
            `/comment/getcomments`,
            {
                commentIds,
            },
            {
                headers: {
                    Authorization: `${token}`,
                },
            }
        );
        const comments = commentRes.data.comments;
        setComments(comments);

    } catch (error) {
        if (error.response.status === 500) {
            return alert(`Server error occured!`);
        }
        return alert(`Your session has expired, please login again!`);
    }
};