export const handleQuestionClick = (dispatch, history, question) => async (e) => {
    e.preventDefault();

    await dispatch({
        type: "SET_CURRENT_QUESTION",
        question,
    });

    history.push(`/home/question/${question._id}`);
};