import Cookies from "js-cookie";
import instance from "../../../helper/axios";

export const addQuestion = (userDetails, history, dispatch, UserQueries, questionData, setQuestionData) => async (e) => {
    e.preventDefault();

    const token = Cookies.get("token");

    if (!token) {
        history.replace("/signin");
    }

    const question = UserQueries.askedQuestion;

    if (!question) {
        return alert("Please enter a question!");
    }

    if (!userDetails.isMailVerified) {
        return alert("Please verify your mail!");
    }

    try {
        const addQuestionRes = await instance.post(
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

        const newQuestion = await addQuestionRes.data.question;
        document
            .getElementById("QueriesAskQuestionContainer")
            .classList.toggle("hidden");

        await setQuestionData([
            newQuestion, ...questionData
        ]);

        await dispatch({
            type: "UPDATE_QUESTIONS",
            id: newQuestion._id
        });

    } catch (error) {
        if (error.response.status === 500) {
            return alert(`Server error occured!`);
        }
        if (error.response.status === 400) {
            return alert(`You can't post empty question!`);
        }
        if (error.response.status === 408) {
            return alert(`Please verify your mail!`);
        }
        return alert(`Your session has expired, please login again!`);
    }
};