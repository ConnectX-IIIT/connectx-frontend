import instance from "../../../helper/axios";
import { passwordValidate } from "../../../helper/password_validator";

export const resetPassword = (history, userRegistration, key) => async (e) => {
    e.preventDefault();

    let password = userRegistration.password;
    let cPassword = userRegistration.cPassword;
    const token = key;

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
        await instance.post(`/auth/resetpassword`, {
            password,
            cPassword,
            token
        })

        history.replace('/signin');

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
        if (error.response.status === 404) {
            return alert(`Token not found!`);
        }
        if (error.response.status === 403) {
            return alert(`User does not exist!`);
        }
        if (error.response.status === 405) {
            return alert(`Reset password link expired!`);
        }
        if (error.response.status === 402) {
            return alert(`${error.response.passwordValidate.error}`);
        }
        return;
    }
};