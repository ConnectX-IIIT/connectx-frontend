import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./components/Landing";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import About from "./components/About";
import Home from "./components/home_Components/home"
import Cookies from "js-cookie";
import instance from "./helper/axios";
import { useStateValue } from "./helper/state_provider";

function App() {

  const [{ userDetails }, dispatch] = useStateValue();

  useEffect(() => {
    async function fetchData() {

      try {
        const token = Cookies.get("token");

        if (token) {
          const getDetailsRes = await instance.get(`/user/getdetails`, {
            headers: {
              "Authorization": `${token}`
            }
          })

          const userData = getDetailsRes.data.userData;

          dispatch({
            type: 'UPDATE_DETAILS',
            userData: userData
          })
        }

      } catch (error) {
        return alert(`${error.response.data.error}`);
      }
    }
    fetchData();
  });

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/about" component={About} />
        <Route exact path="/home" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
