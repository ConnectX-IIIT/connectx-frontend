import Cookies from "js-cookie";
import React from "react";
import GoogleLogin from "react-google-login";
import { Link, useHistory } from "react-router-dom";
import instance from "../../helper/axios";
// import GoogleIcon from "../../assets/signinup_page/ic_google.svg";
import "../../styles/Signup/SignUpFormBottom.css";

function SignUpFormBottom() {

  const history = useHistory();

  const responseSuccessGoogle = async (response) => {
    try {
      const googleLoginRes = await instance.post(`/auth/googlelogin`, {
        tokenId: response.tokenId,
      });
      const googleLoginData = googleLoginRes.data;

      Cookies.set("token", googleLoginData.token, { expires: 1, secure: true });
      let pageType = window.location.pathname.split('/')[1];

      if (pageType === "signin") {
        history.push('/home');
      } else {
        history.push('/register');
      }
    } catch (error) {
      return alert(`Server error occured!`);
    }
  };

  const responseErrorGoogle = (response) => {
    alert(`Google login error!`);
  };

  return (
    <div className="SignUpformBottom">
      <p id="SignUpformBottomPara"> Or continue with</p>
      <div className="SignUpBottomImageContainer">
        {/* <img onClick={handleSubmit} src={GoogleIcon} alt="Google" /> */}
        <GoogleLogin
          clientId="983656845468-hlvmorv2emsk7l94rmmfi98i4qs0828p.apps.googleusercontent.com"
          buttonText="Login with google"
          onSuccess={responseSuccessGoogle}
          onFailure={responseErrorGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
      <Link to="/" id="SignUpformBottomAnchor">
        Forgot Password?
      </Link>
    </div>
  );
}

export default SignUpFormBottom;
