import React, {useContext} from 'react'
import {Context} from '../state/store';

//Local Impots

const Settings = (props) => {
  const [state, dispatch] = useContext(Context);
return(
   <div className='Settings' >
     <img src={state.shopData.shop_banner} alt="banner"/>
     <div>Shop ID: {state.shopData.shop_id}</div>
     <div>Shop Name: {state.shopData.shop_name}</div>
     <div>Shop Email: {state.shopData.shop_email}</div>
   </div>
 )
}

export default Settings