import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./components/Landing";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import SetPassword from "./components/SetPassword";
import Register from "./components/Register";
import About from "./components/About";
import Home from "./components/Home";
import PhotoUpload from "./components/PhotoUpload";
import Cookies from "js-cookie";
import instance from "./helper/axios";
import { useStateValue } from "./helper/state_provider";
import ResetPassword from "./components/ResetPassword";
import Admin from "./components/Admin";
import CreatePostImagesPreviewTempCompPrimary from "./components/CreatePost/CreatePostImagesPreviewTempCompPrimary";
import PostCardBottomButtonComp from "./components/_general/post_card_button/PostCardBottomButtonComp";

function App() {
  const [{ userDetails }, dispatch] = useStateValue();

  async function fetchData() {
    try {
      const token = Cookies.get("token");

      if (token) {
        const getDetailsRes = await instance.get(`/user/getdetails`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        const userData = getDetailsRes.data.userData;

        dispatch({
          type: "SET_USER_DETAILS",
          userData: userData,
        });
      }
    } catch (error) {
      if (error.response.status === 500) {
        return alert(`Server error occured!`);
      }
      return alert(`Your session has expired, please login again!`);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/setpassword" component={SetPassword} />
        <Route exact path="/resetpassword/:key" component={ResetPassword} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/about" component={About} />
        <Route path="/home" component={Home} />
        <Route exact path="/photoupload" component={PhotoUpload} />
        <Route exact path="/admin" component={Admin} />
        <Route
          exact
          path="/123"
          component={() => {
            return (
              <div>
                <PostCardBottomButtonComp isActive={false} />
                <PostCardBottomButtonComp isActive={false} />
                <PostCardBottomButtonComp isActive={false} />
              </div>
            );
          }}
        />
      </Switch>
    </Router>
  );
}

export default App;
