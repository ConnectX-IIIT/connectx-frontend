import instance from "../../../helper/axios";

export const uploadBackgroundPic = async (userDetails, token, formDataForCover) => {

    try {
        if (userDetails.backgroundPicture !== "") {
            await instance.post(
                `/user/removephoto`,
                {
                    type: false,
                    photoURL: userDetails.backgroundPicture
                },
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );
        }

        const uploadRes = await instance.post(`/user/upload`, formDataForCover, {
            headers: {
                Authorization: `${token}`,
            },
        });

        return uploadRes.data.url;

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