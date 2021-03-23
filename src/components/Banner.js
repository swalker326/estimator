import React from 'react'

//Local Impots

const Banner = (props) => {
  const {banner} = props;
return(
   <div className='Banner' style={{width: "100%"}} >
     <div
        style={{
          backgroundColor: "black",
          height: "200px",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <img
          alt=""
          style={{ objectFit: "cover", width: "100%" }}
          src={banner}
        ></img>
      </div>
   </div>
 )
}

export default Banner