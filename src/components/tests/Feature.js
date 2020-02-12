import React, {useEffect, useState} from 'react'
import './report.css';
import {getFirstNameFromFullName} from "../../util/StringUtil";
import moment from "moment";

const Feature = (props) => {

  useEffect(() => {

  }, [props]);
// console.log("props.report", props.report);
  return(
        <div id='report'>
          <div id='title'>{props.feature.title}</div>
          <div id='title'>{moment(props.feature.updatedAt.toDate()).calendar()}</div>
          <div id='end-column'>{getFirstNameFromFullName(props.feature.createdBy)}</div>
        </div>
    )
};

export default Feature
