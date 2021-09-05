import Cookies from "js-cookie";
import instance from "../../../helper/axios";

export const addQuestion = (userDetails, history, UserQueries) => async (e) => {
    e.preventDefault();

    const token = Cookies.get("token");

    if (!token) {
        history.replace("/signin");
    }

    const question = UserQueries.askedQuestion;

    if (!question) {
        return alert("Please enter a question!");
    }

    if (!userDetails.isVerified) {
        return alert("Your verification is under process!");
    }

    try {
        await instance.post(
            `/home/addquestion`,
            {
                question,
            },
            {
                headers: {
                    Authorization: `${token}`,
                },
            }
        );
        document
            .getElementById("QueriesAskQuestionContainer")
            .classList.toggle("hidden");

    } catch (error) {
        if (error.response.status === 500) {
            return alert(`Server error occured!`);
        }
        if (error.response.status === 400) {
            return alert(`You can't post empty question!`);
        }
        if (error.response.status === 408) {
            return alert(`Your verification is under process!`);
        }
        return alert(`Your session has expired, please login again!`);
    }
};