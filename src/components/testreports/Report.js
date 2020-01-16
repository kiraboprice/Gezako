import React from 'react'
import './report.css';

export default function Report (report){
    return(
        <div id='report'>
            {report.service ?  <div id='service'>{report.service}</div> : null}
            <div id='title'>{report.title}</div>
          <div id='title'>{report.status}</div>
          <div id='title'>{report.assignedTo}</div>
          <div id='title'>{report.createdBy}</div>
          <div id='end-column'>{report.createdAt}</div>
        </div>
    )
}
