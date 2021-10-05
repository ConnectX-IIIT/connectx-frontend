import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Landing from "./components/Landing";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import SetPassword from "./components/SetPassword";
import Register from "./components/Register";
import About from "./components/About";
import Home from "./components/Home";
import PhotoUpload from "./components/PhotoUpload";
import { useStateValue } from "./helper/state_provider";
import ResetPassword from "./components/ResetPassword";
import { fetchUserDetails } from "./components/ProfilePage/helper/get_user_details";
import PrivateRoute from "./helper/PrivateRoute";

function App() {
  const history = useHistory();
  const [{ userDetails }, dispatch] = useStateValue();

  useEffect(() => {
    if (!userDetails._id) {
      fetchUserDetails(history, dispatch, false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/setpassword" component={SetPassword} />
        <Route exact path="/about" component={About} />
        <PrivateRoute
          exact
          path="/resetpassword/:key"
          component={ResetPassword}
        />
        <PrivateRoute exact path="/register" component={Register} />
        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute exact path="/photoupload" component={PhotoUpload} />
        <Route render={() => <Redirect to={{ pathname: "/" }} />} />
      </Switch>
    </Router>
  );
}

export default App;
