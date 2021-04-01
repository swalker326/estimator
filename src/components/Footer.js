import React from "react";
import { makeStyles, Container } from "@material-ui/core";

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={`Footer ${classes.root}`}>
      <Container className={classes.container}>
        <div className={classes.column}>
          <h3 className={classes.columnHeader}> About Us </h3>
          <ul>
            <li>
            Tinley Park, Illinois
            </li>
            <li>
              800-123-1234
            </li>
          </ul>
        </div>
        <div className={classes.column}>
          <h3 className={classes.columnHeader}> Get Started </h3>
        </div>
        <div className={classes.column}>
          <h3 className={classes.columnHeader}> Contact Us </h3>
        </div>
      </Container>
    </div>
  );
};

export default Footer;

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '50px',
    display: "flex",
    bottom: '0',
    height: "200px",
    background: "#3f51b5",
    width: "100%",
    color: "#fff",
  },
  container: {
    paddingTop: '20px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  column: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "30%",
  },
}));
