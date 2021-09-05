import Cookies from "js-cookie";
import instance from "../../../helper/axios";

export const fetchQuestions = async (history, setQuestionData) => {

    const token = Cookies.get("token");

    if (!token) {
        history.replace("/signin");
    }

    try {
        const getQuestionsRes = await instance.get(`/question/getquestions/1`, {
            headers: {
                Authorization: `${token}`,
            },
        });

        const questions = getQuestionsRes.data.questions;
        setQuestionData(questions);

    } catch (error) {
        if (error.response.status === 500) {
            return alert(`Server error occured!`);
        }
        return alert(`Your session has expired, please login again!`);
    }
};