import React, { useState, useEffect, useContext } from "react";
import {Context} from '../state/store';
import QuoteList from "./QuoteList";
import Request from "./Request";
import { makeStyles } from "@material-ui/core/styles";
import { useParams, Route, useRouteMatch } from "react-router-dom";
import { db } from "../server/firestore";

const useStyles = makeStyles({
  content: {
    marginTop: "1rem",
  },
  profileHeader: {
    display: "flex",
    paddingLeft: "2rem",
    paddingTop: "2rem",
    paddingBottom: "2rem",
  },
  profileHeaderSettings: {
    display: "flex",
    alignItems: "center",
    marginRight: "1rem",
  },
  profileHeaderWrapper: {
    display: "flex",
    color: "white",
    justifyContent: "space-between",
    backgroundColor: "#424242",
  },
  profileCompanyName: {
    margin: "8px",
  },
});

const Profile = (props) => {

  const [state, dispatch] = useContext(Context);
  const paramData = useParams();
  const shopId = state.shopId;
  const shopRequest = state.currentRequest;
  const { path, url } = useRouteMatch();
  const [request, setRequest] = useState(false);
  const [shopData, setShopData] = useState({});
  const [requests, setRequests] = useState([]);

  const classes = useStyles();

  const getShopData = () => {
    db.collection("shops")
      .doc(shopId)
      .get()
      .then((doc) => {
        const docData = doc.data();
        docData.shop_id = shopId;
        console.log("doc", docData); // eslint-disable-line
        setShopData(docData);
      })
      .catch((err) => console.error(err));
  };
  const getShopRequests = () => {
    db.collection("requested")
      .where("shopID", "==", shopId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          docData.id = doc.id;
          setRequests((oldRequests) => [...oldRequests, docData]);
        });
      });
  };
  useEffect(() => {
      console.log("setting shopId"); // eslint-disable-line
      dispatch({type: 'SET_SHOP', shopId: paramData.id, shopData: shopData})
  }, []);
  useEffect(() => {
      console.log("getting shop data"); // eslint-disable-line
      if (shopId) {
        getShopRequests();
        getShopData();
      }
  }, [shopId]);

  return (
    <div className="Profile">
    <div>Shop ID: {shopData.shop_id}</div>
      <div className={classes.content}>
        {request ? null : (
          <QuoteList currentReq={shopRequest} setRequest={setRequest} requests={requests} />
        )}
      </div>
      <Route exact={true} path={`${path}/request/:id`}>
        <Request setRequest= {setRequest} />
      </Route>
    </div>
  );
};

export default Profile;
