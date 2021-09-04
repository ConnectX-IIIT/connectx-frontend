import Cookies from "js-cookie";
import instance from "../../../helper/axios";

export const addExtraDetails = (history, userRegistration) => async (e) => {
    e.preventDefault();

    const token = Cookies.get("token");

    if (!token) {
        history.replace("/signin");
    }

    let mobile = userRegistration.mobileNumber;
    let description = userRegistration.about;
    let PassingYear = userRegistration.passingYear;
    let JoiningYear = userRegistration.joiningYear;
    let batch = userRegistration.batch;
    let currentRole = userRegistration.currentrole;
    let gender = userRegistration.gender;
    let isAlumni;

    if (
        !mobile ||
        !description ||
        !JoiningYear ||
        !PassingYear ||
        !batch ||
        !currentRole ||
        !gender
    ) {
        return alert("Please fill all details properly!");
    }

    if (mobile.length !== 10) {
        return alert("Mobile should be of length 10!");
    }

    if (currentRole === "Alumni") {
        isAlumni = true;
    } else {
        isAlumni = false;
    }

    try {
        await instance.post(`/auth/addextradetails`, {
            mobile,
            description,
            passingYear: PassingYear,
            joiningYear: JoiningYear,
            batch,
            isAlumni,
            gender
        },
            {
                headers: {
                    Authorization: `${token}`,
                },
            }
        );

        history.replace("/photoupload");

    } catch (error) {
        if (error.response.status === 500) {
            return alert(`Server error occured!`);
        }
        if (error.response.status === 400) {
            return alert(`Please fill all the details properly!`);
        }
        return alert(`Your session has expired, please login again!`);

    }
};