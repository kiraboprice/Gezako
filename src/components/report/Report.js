import React from 'react'
import './report.css';

export default function Report (report){
    return(
        <div id='report'>
            {report.service ?  <div id='report-service'>{report.service}</div> : null}
            <div id='report-title'>{report.title}</div>
            <div id='report-link'><a href={report.report} target='_blank' rel="noopener noreferrer">report</a></div>
        </div>
    )
}