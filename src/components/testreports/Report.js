import React, {useEffect, useState} from 'react'
import './report.css';
import {getAssigneeName, getFirstNameFromFullName} from "../../util/StringUtil";
import moment from "moment";
import {COMPLETED_PHASE, DEVELOPMENT_PHASE} from "../../constants/Report";

const Report = (props) => {

  const [displayDevelopmentFields, setDisplayDevelopmentFields] = useState('');
  const [displayCompletedFields, setDisplayCompletedFields] = useState('');


  useEffect(() => {
    if(props.report.phase === DEVELOPMENT_PHASE) {
      setDisplayDevelopmentFields('block');
      setDisplayCompletedFields('none')
    } else if(props.report.phase === COMPLETED_PHASE) {
      setDisplayDevelopmentFields('none');
      setDisplayCompletedFields('block');
    }
  }, [props]);

  return(
        <div id='report'>
          <div id='service'>{props.report.service}</div>
          <div id='title'>{props.report.title}</div>

          <div id='title' style={{display: displayDevelopmentFields}}>
            {props.report.status}
            </div>

          <div id='title'style={{display: displayCompletedFields}}>
            {props.report.numberOfTests}
            </div>

          <div id='title' style={{display: displayDevelopmentFields}}>
            {getAssigneeName(props.report)}
            </div>

          <div id='title'>{getFirstNameFromFullName(props.report.createdBy)}</div>
          <div id='title'>{moment(props.report.createdAt.toDate()).calendar()}</div>
        </div>
    )
};

export default Report
