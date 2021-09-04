import Cookies from "js-cookie";
import instance from "../../../helper/axios";

export const fetchDiscussions = async (history, discussionIds) => {

    const token = Cookies.get("token");

    if (!token) {
        history.replace("/signin");
    }

    try {
        const discussionRes = await instance.post(
            `/discussion/getdiscussions`,
            {
                discussionIds,
            },
            {
                headers: {
                    Authorization: `${token}`,
                },
            }
        );
        return discussionRes.data.discussions;

    } catch (error) {
        if (error.response.status === 500) {
            return alert(`Server error occured!`);
        }
        return alert(`Your session has expired, please login again!`);
    }
};