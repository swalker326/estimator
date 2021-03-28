import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const ComingSoon = () => {
  const classes = useStyles();
  return (
    <div className="ComingSoon">
      <div className={classes.textContent}>
        <h1>Coming Soon!</h1>
        <h2>We are currently working on this site and will launch soon!</h2>
      </div>
      <div className={classes.backgroundImage}></div>
    </div>
  );
};

export default ComingSoon;

const useStyles = makeStyles({
  backgroundImage: {
    display: "flex",
    opacity: "1.8",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    position: "fixed",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1471958680802-1345a694ba6d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2632&q=80')",
    height: "100%",
    width: "100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  textContent: {
    color: "#fff",
    position: "fixed",
    zIndex: 1,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
    marginTop: "15rem",
  },
});
