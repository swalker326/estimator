import React from 'react'
import { useParams } from "react-router-dom";

//Local Impots

const Settings = (props) => {
  const {setDisplaySettings, } = props
  const shopID = useParams();
return(
   <div className='Settings' >
     display User Settings
     {shopID.id}
   </div>
 )
}

export default Settings