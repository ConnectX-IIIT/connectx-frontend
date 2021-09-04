import Cookies from "js-cookie";
import instance from "../../../helper/axios";
import emailValidator from "email-validator";
import { passwordValidate } from "../../../helper/password_validator";

export const handleSignUp = (history, dispatch, userRegistration) => async (e) => {
    e.preventDefault();

    let name = userRegistration.name;
    let email = userRegistration.email;
    let password = userRegistration.password;
    let cPassword = userRegistration.cPassword;

    if (!name || !email || !password || !cPassword) {
        return alert("Please fill all details properly!");
    }

    if (password !== cPassword) {
        return alert("Password not matched!");
    }

    let emailValidation = emailValidator.validate(email);

    if (!emailValidation) {
        return alert("Enter a valid email");
    }

    let passwordValidation = passwordValidate(password);

    if (!passwordValidation[0]) {
        return alert(`${passwordValidation[1]}`);
    }

    try {
        const signupRes = await instance.post(`/auth/signup`,
            { name, email, password, cPassword }
        )

        const signupData = signupRes.data;
        const userData = signupData.userData;

        dispatch({
            type: 'UPDATE_DETAILS',
            userData: userData
        })

        Cookies.set("token", signupData.token, { expires: 30, secure: true });

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
            return alert(`User already exists!`);
        }
        if (error.response.status === 403) {
            return alert(`${error.response.data.error}`);
        }
        if (error.response.status === 404) {
            return alert(`Enter a valid email!`);
        }
        return;
    }
};