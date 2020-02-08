import React, {useEffect, useState} from 'react'
import moment from "moment";
import {getFirstNameFromFullName} from "../../../../util/StringUtil";
import penIcon from "../../../../assets/Icons/pen.png";

const FeatureTest = (props) => {

  useEffect(() => {

  }, [props]);
  return(
        <div id='report'>
          <div id='service'>
              {props.test.title}
          </div>

          <div id='title'>
              {/*{moment(props.test.updatedAt.toDate()).calendar()}*/}
          </div>

          <div id='end-column'>
              {getFirstNameFromFullName(props.test.createdBy)}
          </div>
        </div>
    )
};

export default FeatureTest
