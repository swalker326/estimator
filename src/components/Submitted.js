import React from "react";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";

//Local Impots

const Submitted = () => {
  return (
    <div
      className="Submitted"
      style={{height: '90vh'}}
    >
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", textAlign: "center" }}>
        <div style={{marginTop: "10%"}}>
          <h2>We're On it!</h2>
          <CheckCircleOutlineOutlinedIcon
            style={{ fontSize: "70px", color: "black" }}
          />
          <p style={{ padding: "0 2rem" }}>
            Your request has been submitted. We will reach out to you once we
            have an Estimate put together.
          </p>
        </div>
        <div>
          <p style={{ color: "gray", fontSize: "1.00rem", paddingRight: "1rem", paddingLeft: "1rem" }}>
            You can close this window or head back to our website.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Submitted;
