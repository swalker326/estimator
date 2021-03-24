import React, { useState } from "react";
import { Redirect } from "react-router";
import PayPalBtn from "./PayPalBtn";
import ComingSoon from "./ComingSoon";

//Local Impots

const Splash = () => {
  const [subscribed, setSubscribed] = useState(false);

  const paypalSubscribe = (data, actions) => {
    return actions.subscription.create({
      plan_id: process.env.REACT_APP_PAYPAL_PLAN_ID,
    });
  };
  const paypalOnError = (err) => {
    console.log("Error");
  };
  const paypalOnApprove = (data, detail) => {
    // call the backend api to store transaction details
    setSubscribed(true);
  };
  if (subscribed) return <Redirect to="/login" />;
  return (
    <div className="Splash">
      {/* <h1>Welcome to a super cool splace screen! YAY!</h1>
      <PayPalBtn
        amount="29.99"
        currency="USD"
        createSubscription={paypalSubscribe}
        onApprove={paypalOnApprove}
        catchError={paypalOnError}
        onError={paypalOnError}
        onCancel={paypalOnError}
      /> */}
      <ComingSoon />
    </div>
  );
};

export default Splash;
