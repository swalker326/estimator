import React from "react";

//Local Impots

const Banner = (props) => {
  const { banner, url } = props;
  console.log("url", url); // eslint-disable-line
  return (
    <div className="Banner" style={{ width: "100%" }}>
      <a href={url}>
        <div
          style={{
            backgroundColor: "black",
            height: "200px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            alt=""
            style={{ objectFit: "contain", width: "100%" }}
            src={banner}
          ></img>
        </div>
      </a>
    </div>
  );
};

export default Banner;
