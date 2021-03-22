import React, { useState, useEffect, useContext } from "react";
import { Context } from "../state/store";
import QuoteList from "./QuoteList";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
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
  const setShopData = (data) => {
    dispatch({ type: "SET_SHOP", shopId: paramData.id, shopData: data });
  };
  const [requests, setRequests] = useState([]);

  const classes = useStyles();

  const getShopData = () => {
    db.collection("shops")
      .doc(shopId)
      .get()
      .then((doc) => {
        const docData = doc.data();
        docData.shop_id = shopId;
        setShopData(docData);
      })
      .catch((err) => console.error(err));
  };
  const getShopRequests = () => {
    setRequests("");
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
    dispatch({ type: "SET_SHOP", shopId: paramData.id, shopData: null });
  }, []);
  useEffect(() => {
    if (shopId) {
      getShopRequests();
      getShopData();
    }
  }, [shopId]);

  return (
    <div className="Profile">
      <div className={classes.content}>
          {requests ? 
          <QuoteList
            requests={requests}
            getShopRequests={getShopRequests}
          /> : <div>No requests =( tell people to submit requests</div>
          }
      </div>
    </div>
  );
};

export default Profile;
