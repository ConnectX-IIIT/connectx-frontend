import Cookies from "js-cookie";
import instance from "../../../helper/axios";

export const upvote = async (userDetails, history, dispatch, id, typeOfElement, typeOfVote) => {

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

            const response = updateUpvotedIds(userDetails.upvotedPosts, userDetails.downvotedPosts, id, typeOfVote);

            await dispatch({
                type: "UPDATE_UPVOTED_POSTS",
                upPosts: response.updatedUpvotedIds,
                downPosts: response.updatedDownvotedIds,
            });

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

            const response = updateUpvotedIds(userDetails.upvotedDiscussions, userDetails.downvotedDiscussions, id, typeOfVote);

            await dispatch({
                type: "UPDATE_UPVOTED_DISCUSSIONS",
                upDiscussions: response.updatedUpvotedIds,
                downDiscussions: response.updatedDownvotedIds,
            });

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

            const response = updateUpvotedIds(userDetails.upvotedQuestions, userDetails.downvotedQuestions, id, typeOfVote);

            await dispatch({
                type: "UPDATE_UPVOTED_QUESTIONS",
                upQuestions: response.updatedUpvotedIds,
                downQuestions: response.updatedDownvotedIds,
            });
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

const updateUpvotedIds = (upvotedIds, downvotedIds, id, type) => {

    let updatedUpvotedIds = upvotedIds;
    let updatedDownvotedIds = downvotedIds;

    switch (type) {
        case 1:
            updatedUpvotedIds.push(id);
            break;

        case 2:
            const i = updatedUpvotedIds.indexOf(id);
            if (i > -1) {
                updatedUpvotedIds.splice(i, 1);
            }
            break;

        case 3:
            updatedDownvotedIds.push(id);
            break;

        case 4:
            const index = updatedDownvotedIds.indexOf(id);
            if (index > -1) {
                updatedDownvotedIds.splice(index, 1);
            }
            break;

        default:
            break;
    }

    return { updatedUpvotedIds, updatedDownvotedIds }
}