import React from 'react'

//Local Impots

const Banner = (props) => {
  const {banner} = props;
return(
   <div className='Banner' style={{width: "100%"}} >
     <div
        style={{
          backgroundColor: "black",
          height: "5rem",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <img
          alt=""
          style={{ maxHeight: "-webkit-fill-available" }}
          src={banner}
        ></img>
      </div>
   </div>
 )
}

export default Banner