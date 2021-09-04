import Cookies from "js-cookie";
import instance from "../../../helper/axios";

export const fetchUsers = async (history, setUserData) => {

    const token = Cookies.get("token");

    if (!token) {
        history.replace("/signin");
    }

    try {
        const getDetailsRes = await instance.get(`/home/fetchusers`, {
            headers: {
                Authorization: `${token}`,
            },
        });

        const userDetails = await getDetailsRes.data.userData;
        setUserData(userDetails)

    } catch (error) {
        if (error.response.status === 500) {
            return alert(`Server error occured!`);
        }
        return alert(`Your session has expired, please login again!`);
    }
}