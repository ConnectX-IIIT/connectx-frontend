import Cookies from "js-cookie";
import instance from "../../../helper/axios";

export const fetchUserDetails = async (history, dispatch, userId, setUserData) => {

    const token = Cookies.get("token");

    if (!token) {
        return;
    }

    try {
        if (!userId) {

            const getDetailsRes = await instance.get(`/user/getdetails`, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            const userData = getDetailsRes.data.userData;

            dispatch({
                type: "SET_USER_DETAILS",
                userData: userData,
            });

        } else {
            const getDetailsRes = await instance.get(`/user/getdetails/${userId}`, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            const userData = getDetailsRes.data.userData;

            if (setUserData) {
                setUserData(userData);
            } else {
                return userData;
            }
        }

    } catch (error) {
        if (error.response.status === 500) {
            return alert(`Server error occured!`);
        }
        return alert(`Your session has expired, please login again!`);
    }
}