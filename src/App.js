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

function App() {
  const [{ userDetails }, dispatch] = useStateValue();

  useEffect(() => {
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
            type: "UPDATE_DETAILS",
            userData: userData,
          });
        }
      } catch (error) {
        return alert(`${error.response.data.error}`);
      }
    }
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
      </Switch>
    </Router>
  );
}

export default App;
