import React from 'react'
import './report.css';

export default function Report (report){
    return(
        <div id='report'>
            {report.service ?  <div id='service'>{report.service}</div> : null}
            <div id='title'>{report.title}</div>
          <div id='createdAt'>{report.createdAt}</div>
          <div id='createdBy'>{report.createdBy}</div>
        </div>
    )
}