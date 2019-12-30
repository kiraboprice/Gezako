import React, { Component } from 'react'
import './report.css';

export default function Report (props){
    return(
        <div id='report'>
            {props.service ?  <div id='report-service'>{props.service}</div> : null}
            <div id='report-title'>{props.title}</div>
            <div id='report-link'><a href={props.report} target='_blank' rel="noopener noreferrer">report</a></div>
        </div>
    )
}