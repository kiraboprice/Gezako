import React, {useEffect, useState} from 'react'
import './report.css';
import {getAssigneeName, getFirstNameFromFullName} from "../../util/StringUtil";
import moment from "moment";
import {COMPLETED_PHASE, DEVELOPMENT_PHASE} from "../../constants/Report";

const SpockTest = (props) => {

  const [displayTestDevelopmentFields, setDisplayTestDevelopmentFields] = useState('');
  const [displayTestCompletedFields, setDisplayTestCompletedFields] = useState('');


  useEffect(() => {
    if(props.report.phase === DEVELOPMENT_PHASE) {
      setDisplayTestDevelopmentFields('block');
      setDisplayTestCompletedFields('none')
    } else if(props.report.phase === COMPLETED_PHASE) {
      setDisplayTestDevelopmentFields('none');
      setDisplayTestCompletedFields('block');
    }
  }, [props]);
// console.log("props.report", props.report);
  return(
        <div id='report'>
          <div id='service'>{props.report.service}</div>
          <div id='title'>{props.report.title}</div>

          <div id='title' style={{display: displayTestDevelopmentFields}}>
            {props.report.status}
            </div>

          <div id='title'style={{display: displayTestCompletedFields}}>
            {props.report.numberOfTests}
            </div>

          <div id='title' style={{display: displayTestDevelopmentFields}}>
            {getAssigneeName(props.report)}
            </div>

          <div id='title'>{moment(props.report.createdAt.toDate()).calendar()}</div>
          <div id='title'>{moment(props.report.updatedAt.toDate()).calendar()}</div>
          <div id='end-column'>{getFirstNameFromFullName(props.report.createdBy)}</div>
        </div>
    )
};

export default SpockTest
