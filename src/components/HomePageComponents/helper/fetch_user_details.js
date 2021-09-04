import Cookies from "js-cookie";
import instance from "../../../helper/axios";

export const fetchUserDetails = async (userDetails, userId) => {
    try {
        const token = Cookies.get("token");

        if (!userDetails.isVerified) {
            return alert(`Your verification is under process!`);
        }

        if (token) {
            const getDetailsRes = await instance.get(`/user/getdetails/${userId}`, {
                headers: {
                    Authorization: `${token}`,
                },
            });

            const userData = await getDetailsRes.data.userData;
            return userData;
        }
    } catch (error) {
        if (error.response.status === 500) {
            return alert(`Server error occured!`);
        }
        return alert(`Your session has expired, please login again!`);
    }
}