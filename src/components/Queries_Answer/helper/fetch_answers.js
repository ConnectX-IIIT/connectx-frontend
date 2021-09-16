import Cookies from "js-cookie";
import instance from "../../../helper/axios";

export const fetchAnswers = async (history, setAnswers, questionId, userId) => {

    const token = Cookies.get("token");

    if (!token) {
        history.replace("/signin");
    }

    try {
        const getAnswersRes = await instance.post(`/answer/getanswers`,
            {
                questionId,
                userId
            },
            {
                headers: {
                    Authorization: `${token}`,
                },
            });

        const answerData = getAnswersRes.data.answers;
        setAnswers(answerData);

    } catch (error) {
        if (error.response.status === 500) {
            return alert(`Server error occured!`);
        }
        return alert(`Your session has expired, please login again!`);
    }
};