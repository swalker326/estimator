import React, { useEffect, useContext } from "react";
import { Context } from "./state/store";
import { Switch, Route, useHistory } from "react-router-dom";
import HeaderRoute from "./components/utils/HeaderRoute";
import Profile from "./components/Profile";
import NewAccount from "./components/NewAccount";
import Login from "./components/Login";
import Request from "./components/Request";
import Settings from "./components/Settings";
import Splash from "./components/Splash";
import EstimateForm from "./components/EstimateForm";
import { db } from "./server/firestore";
import PrivateRoute from "./components/utils/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";

import "./components/styles/Overrides.css";

function App() {
  const history = useHistory();
  const [state] = useContext(Context);

  const getShop = () => {
    db.collection("shops")
      .where("user", "==", state.user.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          history.push(`/profile/${doc.id}`);
        });
      });
  };
  useEffect(() => {
    if (state.user?.uid) {
      getShop();
    }
  }, [state.user]);
  return (
    <div className="App">
      <Switch>
        <HeaderRoute exact={true} path="/">
          <Splash />
        </HeaderRoute>
        <HeaderRoute exact={true} path="/login">
          <Login />
        </HeaderRoute>
        <HeaderRoute path="/createaccount">
          <NewAccount />
        </HeaderRoute>
        <Route path={`/profile/form/:shop_id`}>
          <EstimateForm />
        </Route>
        <PrivateRoute exact path="/profile/:shop_id">
          <Profile />
        </PrivateRoute>
        <PrivateRoute path="/profile/settings/:shop_id">
          <Settings />
        </PrivateRoute>
        <PrivateRoute path={`/profile/:shop_id/request/:request_id`}>
          <Request />
        </PrivateRoute>
        <HeaderRoute path={`/password_reset`}>
          <ForgotPassword />
        </HeaderRoute>
      </Switch>
    </div>
  );
}
export default App;
