import Cookies from "js-cookie";
import instance from "../../../helper/axios";

export const fetchPosts = async (history, index, setPostData) => {

    const token = Cookies.get("token");

    if (!token) {
        history.replace("/signin");
    }

    try {
        const getDetailsRes = await instance.get(`/post/getposts/${index}`, {
            headers: {
                Authorization: `${token}`,
            },
        });

        const data = getDetailsRes.data.postData;
        setPostData(data);

    } catch (error) {
        if (error.response.status === 500) {
            return alert(`Server error occured!`);
        }
        return alert(`Your session has expired, please login again!`);
    }
};