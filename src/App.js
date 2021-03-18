import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory} from "react-router-dom";
import Header from "./components/Header";
import Profile from "./components/Profile";
import NewAccount from "./components/NewAccount";
import Login from "./components/Login";
import { db } from "./server/firestore";

import "./components/styles/Overrides.css";

function App() {
  const history = useHistory();
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [shopID, setShopID] = useState(null);

  const getShop = () => {
    db.collection("shops")
      .where("user", "==", user.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setShopID(doc.id);
          history.push(`/profile/${doc.id}`);
        });
      });
  };
  useEffect(() => {
    if (user) getShop();
  }, [user]);
  return (
    <div className="App">
      <Header shopID={shopID} />
      <Switch>
        <Route exact={true} path="/login">
          <Login setAuth={setAuth} setUser={setUser} />
        </Route>
        <Route path="/createaccount">
          <NewAccount setUser={setUser} />
        </Route>
        <Route path="/profile/:id">
          <Profile shopID={shopID} />
        </Route>
      </Switch>
    </div>
  );
}
export default App;
