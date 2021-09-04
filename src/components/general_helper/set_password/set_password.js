import Cookies from "js-cookie";
import instance from "../../../helper/axios";
import { passwordValidate } from "../../../helper/password_validator";

export const setPassword = (history, userRegistration) => async (e) => {
    e.preventDefault();

    let password = userRegistration.password;
    let cPassword = userRegistration.cPassword;

    if (!password || !cPassword) {
        return alert("Please fill all details properly!");
    }

    if (password !== cPassword) {
        return alert("Password not matched!");
    }

    let passwordValidation = passwordValidate(password);

    if (!passwordValidation[0]) {
        return alert(`${passwordValidation[1]}`);
    }

    try {
        const token = Cookies.get("token");

        await instance.post(`/auth/setpassword`, {
            password,
            cPassword
        },
            {
                headers: {
                    Authorization: `${token}`
                },

            })

        history.push('/register');

    } catch (error) {
        if (error.response.status === 500) {
            return alert(`Server error occured!`);
        }
        if (error.response.status === 400) {
            return alert(`Please fill all the details properly!`);
        }
        if (error.response.status === 401) {
            return alert(`Password not matched!`);
        }
        if (error.response.status === 402) {
            return alert(`${error.response.data.error}`);
        }
        if (error.response.status === 403) {
            return alert(`User does not exist!`);
        }
        return alert(`Your session has expired, please login again!`);
    }
};