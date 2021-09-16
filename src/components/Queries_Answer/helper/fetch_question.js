import Cookies from "js-cookie";
import instance from "../../../helper/axios";

export const fetchQuestion = async (history, dispatch, questionId, userId, setQuestionData) => {

    const token = Cookies.get("token");

    if (!token) {
        history.replace("/signin");
    }

    try {

        const getQuestionRes = await instance.post(`/question/getquestions`,
            {
                questionId,
                userId
            },
            {
                headers: {
                    Authorization: `${token}`,
                },
            });

        const question = getQuestionRes.data.questions;

        if (questionId) {
            await dispatch({
                type: "SET_CURRENT_QUESTION",
                question,
            });
        } else {
            setQuestionData(question);
        }

    } catch (error) {
        if (error.response.status === 500) {
            return alert(`Server error occured!`);
        }
        return alert(`Your session has expired, please login again!`);
    }
};