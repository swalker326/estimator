import React, { useContext, useState } from "react";
import { db } from "../server/firestore";
import { Container, makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Context } from "../state/store";
import { Link, useRouteMatch } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import MenuIcon from "@material-ui/icons/Menu";
import SimpleDialog from "./utils/SimpleDialog";
import AddIcon from "@material-ui/icons/Add";

const QuoteList = (props) => {
  const { url } = useRouteMatch();
  const [state, dispatch] = useContext(Context);
  const [open, setOpen] = useState(false);

  const { requests } = props;
  const classes = useStyles();
  const deleteRequest = (id) => {
    db.collection("requested")
      .doc(id)
      .delete()
      .then((doc) => {
        props.getShopRequests();
      });
  };

  const nameUpperCase = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <Container className={`QuoteList ${classes.container}`}>
      {requests
        ? requests.map((request) => {
            return (
              <Card className={classes.root} key={request.id}>
                <Link
                  onClick={() =>
                    dispatch({
                      type: "SET_REQUEST",
                      currentRequest: request.id,
                    })
                  }
                  to={`${url}/request/${request.id}`}
                >
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={request.images[0]}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {nameUpperCase(request.first_name) + " "}
                        {nameUpperCase(request.last_name)}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="h4"
                      >
                        {request.carYear}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="h6"
                      >
                        {request.carMake} - {request.carModel}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
                <CardActions className={classes.cardButtons}>
                  <Link
                    onClick={() =>
                      dispatch({
                        type: "SET_REQUEST",
                        currentRequest: request.id,
                      })
                    }
                    to={`${url}/request/${request.id}`}
                  >
                    <Button>
                      <MenuIcon style={{color: "#fff"}}/>
                    </Button>
                  </Link>
                  <SimpleDialog
                    onClose={() => {}}
                    deleteRequest={() => deleteRequest(request.id)}
                    open={open}
                    icon={DeleteIcon}
                    iconColor = "#fff"
                  />
                </CardActions>
              </Card>
            );
          })
        : null}
      <Card className={classes.root}>
        <CardActionArea style={{ height: "100%" }}>
          <Link to={`/profile/form/${state.shopId}`}>
            <div className={classes.cardAction}>
              <AddIcon style={{color: '#fff', fontSize: 40}} />
            </div>
          </Link>
        </CardActionArea>
      </Card>
    </Container>
  );
};

export default QuoteList;

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      minWidth: "170px",
    },
    width: "20%",
    minWidth: "130px",
    marginRight: "1rem",
    marginLeft: "1rem",
    marginBottom: "1.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  media: {
    height: 140,
  },
  deleteButtonContainer: {
    float: "right",
  },
  cardButtons: {
    background: "rgba(100, 100, 100, 0.5)",
    display: "flex",
    justifyContent: "space-between",
  },
  addIocn: {
    fontSize: 100,
    color: "#fff",
  },
  cardAction: {
    height: "50px",
    background: "linear-gradient(90deg, rgba(99,92,235,1) 0%, rgba(63,81,181,1) 29%, rgba(63,81,181,1) 29%);",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
