import React from 'react'
import Fab from '@material-ui/core/Fab';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';

//Local Impots

const Submitted = () => {
  return (
    <div className='Submitted' style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }} >
      <div>
        <h2>We're On it!</h2>
        <CheckCircleOutlineOutlinedIcon style={{ fontSize: '70px', color:'black' }}/>
        <p style={{ padding: '0 2rem' }}>Your request has been submitted. We will reach out to you once we have an Estimate put together.</p>
        <div style={{marginTop: '65%'}}>
          <Fab color="primary" size="large" href='http://localhost:3000' variant="extended" aria-label="add">
            close
        </Fab>
          <p style={{color: 'gray', fontSize: '.50rem' }}>You can close this window or head back to our website.</p>
        </div>
      </div>
    </div>
  )
}

export default Submitted
