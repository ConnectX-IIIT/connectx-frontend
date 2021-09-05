import Cookies from "js-cookie";
import instance from "../../../helper/axios";

export const upvote = async (userDetails, history, id, typeOfElement, typeOfVote) => {

    const token = Cookies.get("token");

    if (!token) {
        history.replace("/signin");
    }

    if (!userDetails.isVerified) {
        return alert("Your verification is under process!");
    }

    try {
        if (typeOfElement === "post") {
            await instance.post(
                `/post/vote/${typeOfVote}`,
                {
                    postId: id,
                },
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );
        } else if (typeOfElement === "discussion") {
            await instance.post(
                `/discussion/vote/${typeOfVote}`,
                {
                    discussionId: id,
                },
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );
        } else if (typeOfElement === "question") {
            await instance.post(
                `/question/vote/${typeOfVote}`,
                {
                    questionId: id,
                },
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );
        }


    } catch (error) {
        if (error.response.status === 500 || error.response.status === 400) {
            return alert(`Server error occured!`);
        }
        if (error.response.status === 408) {
            return alert(`Your verification is under process!`);
        }
        if (error.response.status === 401) {
            return;
        }
        return alert(`Your session has expired, please login again!`);
    }
}