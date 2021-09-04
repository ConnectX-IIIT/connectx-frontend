import Cookies from "js-cookie";
import instance from "../../../helper/axios";
import emailValidator from "email-validator";
import { passwordValidate } from "../../../helper/password_validator";

export const handleSignIn = (history, dispatch, userRegistration) => async (e) => {
    e.preventDefault();

    let email = userRegistration.email;
    let password = userRegistration.password;

    if (!email || !password) {
        return alert("Please fill all details properly!");
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
        const signinRes = await instance.post(`/auth/signin`,
            { email, password }
        )

        const signinData = signinRes.data;
        const userData = signinData.userData;

        dispatch({
            type: 'UPDATE_DETAILS',
            userData: userData
        })

        Cookies.set("token", signinData.token, { expires: 30, secure: true });
        history.push('/home');

    } catch (error) {
        if (error.response.status === 500) {
            return alert(`Server error occured!`);
        }
        if (error.response.status === 400) {
            return alert(`Please fill all the details properly!`);
        }
        if (error.response.status === 401) {
            return alert(`User does not exist!`);
        }
        return alert(`Incorrect password!`);
    }
};