import Cookies from "js-cookie";
import instance from "../../../helper/axios";

export const fetchDiscussions = async (history, discussionIds) => {
    try {
        const token = Cookies.get("token");

        if (token) {
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
        } else {
            history.replace("/signin");
        }
    } catch (error) {
        if (error.response.status === 500) {
            return alert(`Server error occured!`);
        }
        return alert(`Your session has expired, please login again!`);
    }
};