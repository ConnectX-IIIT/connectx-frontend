import Cookies from "js-cookie";
import React from "react";
import GoogleLogin from "react-google-login";
import { useHistory } from "react-router-dom";
import instance from "../../helper/axios";
import { useStateValue } from "../../helper/state_provider";
import GoogleIcon from "../../assets/signinup_page/ic_google.svg";
import "../../styles/Signup/SignUpFormBottom.css";

function SignUpFormBottom() {
  const history = useHistory();
  const [, dispatch] = useStateValue();

  const responseSuccessGoogle = async (response) => {
    let pageType = window.location.pathname.split("/")[1];
    try {
      if (pageType === "signin") {
        const googleSigninRes = await instance.post(`/auth/googlesignin`, {
          tokenId: response.tokenId,
        });
        const googleSigninData = googleSigninRes.data;

        const userData = googleSigninData.userData;

        dispatch({
          type: "UPDATE_DETAILS",
          userData: userData,
        });

        Cookies.set("token", googleSigninData.token, {
          expires: 30,
          secure: true,
        });

        history.push("/home");
      } else {
        const googleSignupRes = await instance.post(`/auth/googlesignup`, {
          tokenId: response.tokenId,
        });
        const googleSignupData = googleSignupRes.data;

        const userData = googleSignupData.userData;

        dispatch({
          type: "UPDATE_DETAILS",
          userData: userData,
        });

        Cookies.set("token", googleSignupData.token, {
          expires: 30,
          secure: true,
        });

        history.push("/setpassword");
      }
    } catch (error) {
      if (error.response.status === 500) {
        return alert(`Server error occured!`);
      }
      if (error.response.status === 400) {
        return alert(`User already exists!`);
      }
      return alert(`User does not exist!`);
    }
  };

  const responseErrorGoogle = () => {
    alert(`Google login failed!`);
  };

  return (
    <div className="SignUpformBottom">
      <p id="SignUpformBottomPara"> Or continue with</p>
      <div className="SignUpBottomImageContainer">
        {/* <img onClick={handleSubmit} src={GoogleIcon} alt="Google" /> */}
        <GoogleLogin
          clientId="983656845468-hlvmorv2emsk7l94rmmfi98i4qs0828p.apps.googleusercontent.com"
          // buttonText={""}
          render={(renderProps) => (
            <img src={GoogleIcon} alt="Google" onClick={renderProps.onClick} />
          )}
          onSuccess={responseSuccessGoogle}
          onFailure={responseErrorGoogle}
          cookiePolicy={"single_host_origin"}
          style={{}}
        />
      </div>
    </div>
  );
}

export default SignUpFormBottom;
