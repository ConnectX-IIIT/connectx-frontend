import Cookies from "js-cookie";
import instance from "../../../helper/axios";

export const addAnswer = (userDetails, history, answer, questionId, setInputValue) => async (e) => {
    e.preventDefault();

    const token = Cookies.get("token");

    if (!token) {
        history.replace("/signin");
    }

    if (!userDetails.isMailVerified) {
        return alert("Please verify your mail!");
    }

    if (!answer) {
        return alert("You can't post empty answer!");
    }

    if (!answer.replace(/\s/g, "").length) {
        return alert("You can't post answer with only spaces!");
    }

    try {
        await instance.post(
            `/question/addanswer/${questionId}`,
            {
                answer,
            },
            {
                headers: {
                    Authorization: `${token}`,
                },
            }
        );

        setInputValue({
            answer: "",
        });

    } catch (error) {
        if (error.response.status === 500) {
            return alert(`Server error occured!`);
        }
        if (error.response.status === 400) {
            return alert(`You can't post empty answer!`);
        }
        if (error.response.status === 408) {
            return alert(`Please verify your mail!`);
        }
        return alert(`Your session has expired, please login again!`);
    }
};