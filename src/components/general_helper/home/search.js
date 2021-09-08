import Cookies from "js-cookie";
import instance from "../../../helper/axios";

export const handleInputSearch = (history, userInput, setUserInput, setPopoutQueries, setPopoutPeople) => async (e) => {

    const token = Cookies.get("token");

    if (!token) {
        history.replace("/signin");
    }

    const name = e.target.name;
    const value = e.target.value;
    setUserInput({ ...userInput, [name]: value });

    if (!value.length || !value.replace(/\s/g, "").length) {
        return;
    }

    try {
        const getSearchRes = await instance.get(`/home/search/${value}`, {
            headers: {
                Authorization: `${token}`,
            },
        });

        const userData = await getSearchRes.data.userData;
        const queriesData = await getSearchRes.data.questionData;
        if (setPopoutPeople) {
            setPopoutPeople(userData);
        }
        setPopoutQueries(queriesData);

    } catch (error) {
        if (error.response.status === 500) {
            return alert(`Server error occured!`);
        }
        return alert(`Your session has expired, please login again!`);
    }
};