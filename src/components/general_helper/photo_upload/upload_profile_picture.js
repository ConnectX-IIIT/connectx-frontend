import instance from "../../../helper/axios";

export const uploadProfilePic = async (userDetails, token, formDataForProfile) => {

    try {
        if (userDetails.profilePicture !== "") {
            await instance.post(
                `/user/removephoto`,
                {
                    type: true,
                    photoURL: userDetails.profilePicture
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