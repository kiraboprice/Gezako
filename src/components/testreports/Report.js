import React, {useEffect, useState} from 'react'
import './report.css';
import {getFirstNameFromFullName} from "../../util/StringUtil";
import moment from "moment";

const Report = (props) => {
  return(
        <div id='report'>
          <div id='service'>{props.report.service}</div>
          <div id='title'>{props.report.title}</div>
          <div id='title'>{props.report.status}</div>
          <div id='title'>{props.report.numberOfTests}</div>
          <div id='title'>{props.report.assignedTo}</div>
          <div id='title'>{props.report.createdBy}</div>
          <div id='title'>{moment(props.report.createdAt.toDate()).calendar()}</div>
        </div>
    )
};

export default Report
