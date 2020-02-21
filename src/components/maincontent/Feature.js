import React, {useEffect, useState} from 'react'
import './maincontent.css';
import {getFirstNameFromFullName} from "../../util/StringUtil";
import moment from "moment";

/**
 * This is shown
 * - during loading,
 * - when an item does not exist,
 * - when an error occurred
 */
const InfoBeforeDefaultUI = (props) => {
  return(
      <div id='info-before-default-section'>
        <p>{props.message}</p>
      </div>
    )
};

export default InfoBeforeDefaultUI
