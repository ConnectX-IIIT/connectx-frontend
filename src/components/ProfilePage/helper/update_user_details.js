import Cookies from "js-cookie";
import emailValidator from "email-validator";
import instance from "../../../helper/axios";

export const updateUserDetails = (userDetails, history, userData, dispatch) => async (e) => {
    e.preventDefault();

    let name = userData.name;
    let email = userData.email;
    let mobile = userData.mobile;
    let description = userData.description;

    const token = Cookies.get("token");

    if (!token) {
        history.replace("/signin");
    }

    if (!name || !email || !mobile || !description) {
        return alert("Please fill all the details!");
    }

    if (name === userDetails.name && email === userDetails.email && mobile === userDetails.mobile && description === userDetails.description) {
        document.getElementById("ProfilePageEditProfile").classList.toggle("hidden");
        return;
    }

    let emailValidation = emailValidator.validate(email);

    if (!emailValidation) {
        return alert("Enter a valid email");
    }

    try {
        const updateDetailsRes = await instance.post(`/user/updatedetails`,
            { userName: name, userEmail: email, mobile, description },
            {
                headers: {
                    Authorization: `${token}`,
                },
            }
        )

        if (updateDetailsRes.status === 201) {
            Cookies.set("token", updateDetailsRes.data.token, { expires: 30, secure: true });
        }

        dispatch({
            type: 'UPDATE_USER_DETAILS',
            name,
            email,
            mobile,
            description
        });

        document.getElementById("ProfilePageEditProfile").classList.toggle("hidden");

    } catch (error) {
        if (error.response.status === 500) {
            return alert(`Server error occured!`);
        }
        if (error.response.status === 400) {
            return alert(`User already exists with updated email!`);
        }
        if (error.response.status === 401) {
            return alert(`Enter a valid email!`);
        }
        return alert(`Your session has expired, please login again!`);
    }
};