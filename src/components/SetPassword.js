import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "./signUpCompontents/Button";
import FormInput from "./signUpCompontents/FormInput";
import FooterCopyRight from "./signUpCompontents/FooterCopyRight";
import "../styles/SetPassword/SetPassword.css";
import { setPassword } from "./general_helper/set_password/set_password";

function SetPassword() {

    const history = useHistory();
    const [userRegistration, setUserRegistration] = useState({
        password: "",
        cPassword: ""
    });

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserRegistration({ ...userRegistration, [name]: value });
    };

    return (
        <div className="SetPasswordMainPage">
            <form action="" onSubmit={(e) => setPassword(history, userRegistration)(e)} className="SetPasswordPageForm">
                <p>Set Password</p>
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

export default SetPassword;
