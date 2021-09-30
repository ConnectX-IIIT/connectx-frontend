import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
import Admin from "./components/Admin";
import PostCardBottomButtonComp from "./components/_general/post_card_button/PostCardBottomButtonComp";
import { fetchUserDetails } from "./components/ProfilePage/helper/get_user_details";

function App() {
  const history = useHistory();
  const [{ userDetails }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    fetchUserDetails(history, dispatch, false);
  }, []);

  const toggleIsLoading = () => {
    setIsLoading(!isLoading);
  };
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
        <Route path="/admin" component={Admin} />
        <Route
          exact
          path="/123"
          component={() => {
            return (
              <div>
                <PostCardBottomButtonComp
                  isActive={isLoading}
                  onClickFunction={toggleIsLoading}
                />
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
