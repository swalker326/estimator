import React, { useContext } from "react";
import { db } from "../server/firestore";
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles({
  root: {
    minWidth: "20%",
    marginRight: "1rem",
    marginLeft: "1rem",
    marginBottom: "1.5rem",
  },
  media: {
    height: 140,
  },
  deleteButtonContainer: {
    float: "right",
  },
  cardButtons: {
    display: "flex",
    justifyContent: "space-between",
  },
});

const QuoteList = (props) => {
  const { url } = useRouteMatch();
  const [state, dispatch] = useContext(Context);
  const { requests } = props;
  const classes = useStyles();
  const deleteQuote = (id) => {
    db.collection("requested")
      .doc(id)
      .delete()
      .then((doc) => {
        console.log("Doc Removed"); // eslint-disable-line
        props.getShopRequests();
      });
  };
  const nameUpperCase = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div className="QuoteList" style={{ display: "flex", flexWrap: "wrap" }}>
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
                      // title="Contemplative Reptile"
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
                      <MenuIcon />
                    </Button>
                  </Link>
                  <SimpleDialog
                    onClose={() => deleteQuote(request.id)}
                    icon={DeleteIcon}
                  />
                </CardActions>
              </Card>
            );
          })
        : null}
    </div>
  );
};

export default QuoteList;
