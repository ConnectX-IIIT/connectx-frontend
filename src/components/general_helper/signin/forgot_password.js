import instance from "../../../helper/axios";
import emailValidator from "email-validator";

export const handleForgotPassword = (userRegistration) => async (e) => {
    e.preventDefault();

    let email = userRegistration.email;

    if (!email) {
        return alert('Please enter your registered email!');
    }

    let emailValidation = emailValidator.validate(email);

    if (!emailValidation) {
        return alert("Enter a valid email");
    }

    try {
        await instance.post(`/auth/forgotpassword`,
            { email }
        )
        alert('Link to reset your password has been sent to your email!');

    } catch (error) {
        if (error.response.status === 500) {
            return alert(`Server error occured!`);
        }
        if (error.response.status === 400) {
            return alert(`Enter a valid email!`);
        }
        return alert(`Enter registered email!`);

    }
}