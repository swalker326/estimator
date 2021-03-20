import React, { useEffect, useContext } from "react";
import { Context } from "./state/store";
import { Switch, Route, useHistory } from "react-router-dom";
import Header from "./components/Header";
import Profile from "./components/Profile";
import NewAccount from "./components/NewAccount";
import Login from "./components/Login";
import Request from "./components/Request";
import Settings from "./components/Settings";
import { db } from "./server/firestore";

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
      <Header />
      <Switch>
        <Route exact={true} path="/login">
          <Login />
        </Route>
        <Route path="/createaccount">
          <NewAccount />
        </Route>
        <Route exact path="/profile/:id">
          <Profile />
        </Route>
        <Route path="/profile/settings/:id">
          <Settings />
        </Route>
        <Route path={`/profile/:shop_id/request/:id`}>
          <Request />
      </Route>
      </Switch>
    </div>
  );
}
export default App;
