import Cookies from "js-cookie";
import instance from "../../../helper/axios";

export const updateGroupProfilePicture = async (updateGroupDetails, history) => {

    const token = Cookies.get("token");

    if (!updateGroupDetails.groupPhoto) {
        return;
    }

    if (!token) {
        history.push('/signin');;
    }

    const photoHeight = document.getElementsByClassName("chat-group-image")[0].naturalHeight;
    const photoWidth = document.getElementsByClassName("chat-group-image")[0].naturalWidth;
    const formData = new FormData();
    formData.append("height", photoHeight);
    formData.append("width", photoWidth);
    formData.append("photo", updateGroupDetails.groupPhoto);

    try {
        await instance.post(`/group/updateprofile`, formData, {
            headers: {
                Authorization: `${token}`,
            },
        });

    } catch (error) {
        if (error.response.status === 500) {
            return alert(`Server error occured!`);
        }
        if (error.response.status === 400) {
            return alert("You can't change group profile picture!");
        }
        return alert(`Your session has expired, please login again!`);
    }
};