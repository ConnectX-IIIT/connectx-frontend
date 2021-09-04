import Cookies from "js-cookie";
import instance from "../../../helper/axios";

export const uploadPhoto = async (userDetails, history, dispatch, updatedDetails, setUpdatedDetails, index) => {

    const token = Cookies.get("token");

    if (!updatedDetails.profilePhoto && !updatedDetails.coverPhoto) {
        return;
    }

    if (!token) {
        history.push('/signin');
    }

    const photoHeight = document.getElementsByClassName("profile-page-images")[index].naturalHeight;
    const photoWidth = document.getElementsByClassName("profile-page-images")[index].naturalWidth;
    let type;
    let photoURL;
    const formDataForProfile = new FormData();
    formDataForProfile.append("height", photoHeight);
    formDataForProfile.append("width", photoWidth);

    if (index) {
        formDataForProfile.append("photo", updatedDetails.profilePhoto);
        formDataForProfile.append("type", true);
        type = true;
        photoURL = userDetails.profilePicture;
    } else {
        formDataForProfile.append("photo", updatedDetails.coverPhoto);
        formDataForProfile.append("type", false);
        type = false;
        photoURL = userDetails.backgroundPicture;
    }

    try {
        if (photoURL) {
            await instance.post(
                `/user/removephoto`,
                {
                    type,
                    photoURL,
                },
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );
        }

        const uploadRes = await instance.post(`/user/upload`, formDataForProfile, {
            headers: {
                Authorization: `${token}`,
            },
        });
        const pictureURL = await uploadRes.data.url;

        if (updatedDetails.photoIndex) {
            await dispatch({
                type: "UPDATE_PROFILE",
                url: pictureURL,
            });
        } else {
            await dispatch({
                type: "UPDATE_BACKGROUND",
                url: pictureURL,
            });
        }

        setUpdatedDetails({
            coverPhoto: "",
            profilePhoto: "",
            photoIndex: null
        });

    } catch (error) {
        if (error.response.status === 500) {
            return alert(`Server error occured!`);
        }
        if (error.response.status === 400) {
            return;
        }
        return alert(`Your session has expired, please login again!`);
    }
};