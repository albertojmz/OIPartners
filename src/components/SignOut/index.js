import React from 'react';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
   <div style={{marginLeft:"20px"}} onClick={firebase.doSignOut}>

    <i className="far fa-times-circle" style={{ fontSize: '1.75em' }} onClick={firebase.doSignOut} />
       <span style={{marginBottom:"3px", marginLeft:"10px"}}>Sign Out</span>
   </div>
);

export default withFirebase(SignOutButton);
