import React from 'react'

import "./noreports.css"

const NoReportsScreen = (props) =>{
  return(
      <div className='noreports'>
        NO REPORTS FOR {props.service.toUpperCase()} SERVICE IN {props.phase.toUpperCase()} PHASE
      </div>
  )
};

export default NoReportsScreen;