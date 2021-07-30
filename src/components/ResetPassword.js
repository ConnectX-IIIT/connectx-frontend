import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Button from "./signUpCompontents/Button";
import FormInput from "./signUpCompontents/FormInput";
import FooterCopyRight from "./signUpCompontents/FooterCopyRight";
import "../styles/ResetPassword/ResetPassword.css";
import { passwordValidate } from "../helper/password_validator";
import instance from "../helper/axios";

function ResetPassword() {

    const history = useHistory();
    const { key } = useParams();
    const [userRegistration, setUserRegistration] = useState({
        password: "",
        cPassword: ""
    });

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserRegistration({ ...userRegistration, [name]: value });
    };

    const handleSubmit = async (e) => {
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

            history.push('/');

        } catch (error) {
            console.log(error);
            return alert(`${error.response.data.error}`);
        }
    };

    return (
        <div className="ResetPasswordMainPage">
            <form action="" onSubmit={handleSubmit} className="ResetPasswordPageForm">
                <p>Reset Password</p>
                <FormInput
                    inputType="password"
                    inputName="password"
                    inputValue={userRegistration.password}
                    lableContent="Password"
                    onChangeFunction={handleInput}
                />
                <FormInput
                    inputType="password"
                    inputName="cPassword"
                    inputValue={userRegistration.cPassword}
                    lableContent="Confirm Password"
                    onChangeFunction={handleInput}
                />
                <Button />
            </form>
            <div id="bottomElement">
                <Link to="/">Get Support</Link>
            </div>
            <FooterCopyRight />
        </div>
    );
}

export default ResetPassword;
