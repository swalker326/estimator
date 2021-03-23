import React from "react";
import Header from "../Header";
import { Route } from "react-router";

const PrivateRoute = ({ children, ...rest }) => {

  return (
    <Route
      {...rest}
      render={() => {
        return (
          <div>
            <Header />
            {children}
          </div>
        );
      }}
    />
  );
};

export default PrivateRoute;
