import React, { useContext } from "react";
import {Context} from '../../state/store';
import { Redirect, Route } from "react-router";

const PrivateRoute = ({ children, ...rest }) => {
  
  const [state] = useContext(Context);

  return (
    <Route {...rest} render={() => {
      return state.auth === true
        ? children
        : <Redirect to='/login' />
    }} />
  )
}

export default PrivateRoute