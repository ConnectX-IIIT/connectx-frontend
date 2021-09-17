import Cookies from "js-cookie";
import instance from "../../../helper/axios";

export const addPost = (userDetails, history, dispatch, postDetails, postData, setPostData) => async (e) => {
    e.preventDefault();

    const token = Cookies.get("token");

    if (!token) {
        history.replace("/signin");
    }

    if (!userDetails.isMailVerified) {
        return alert("Please verify your mail!");
    }

    const attachedImgs = postDetails.attachedImgs;
    let isProject = false;

    if (postDetails.typeOfPost === "Project") {
        isProject = true;
    }

    const postFormData = new FormData();
    postFormData.append("title", postDetails.postTitle);
    postFormData.append("description", postDetails.postDescription);
    postFormData.append("jobLink", postDetails.jobLink);
    postFormData.append("attachedImgDimensions", JSON.stringify(postDetails.attachedImgDimensions));
    postFormData.append("isProject", isProject);

    for (let file of attachedImgs) {
        postFormData.append("attachedImgs", file);
    }

    if (!postDetails.postDescription || !postDetails.typeOfPost || !postDetails.postDescription.replace(/\s/g, "").length) {
        return alert("Please fill all the details properly!");
    }

    if ((!postDetails.postTitle || !postDetails.postTitle.replace(/\s/g, "").length) && postDetails.typeOfPost !== "Blog") {
        return alert("Please add post title!");
    }

    if (!(new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(postDetails.jobLink)) && postDetails.typeOfPost === "Job") {
        return alert("Please add a valid joblink!");
    }

    try {
        const addPostRes = await instance.post(`/home/addpost`, postFormData, {
            headers: {
                Authorization: `${token}`,
            },
        });

        const post = await addPostRes.data.post;
        document
            .getElementById("HomeContainerCreatePost")
            .classList.toggle("hidden");

        await setPostData([
            post, ...postData
        ]);

        await dispatch({
            type: "UPDATE_POSTS",
            id: post._id
        })

    } catch (error) {
        if (error.response.status === 500) {
            return alert(`Server error occured!`);
        }
        if (error.response.status === 408) {
            return alert(`Please verify your mail!`);
        }
        return alert(`Your session has expired, please login again!`);
    }
};