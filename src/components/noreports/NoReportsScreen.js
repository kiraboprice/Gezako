import React from 'react'

import "./noreports.css"

const NoReportsScreen = (props) =>{
  return(
      <div className='noreports'>
        
        <div id='no-reports-text'>NO REPORTS FOR {props.service.toUpperCase()} SERVICE IN {props.phase.toUpperCase()} PHASE</div>
      </div>
  )
};

export default NoReportsScreen;