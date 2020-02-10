import React, {useEffect, useState} from 'react'
import {getFirstNameFromFullName} from "../../../../util/StringUtil";
import {getDateString} from "../../../../util/DateUtil";

const FeatureTest = (props) => {

  useEffect(() => {

  }, [props]);
  return(
        <div id='report'>
          <div id='service'>
              {props.test.title}
          </div>

          <div id='title'>
              {getDateString(props.test.updatedAt)}
          </div>

          <div id='title'>
              {getFirstNameFromFullName(props.test.createdBy)}
          </div>
        </div>
    )
};

export default FeatureTest
