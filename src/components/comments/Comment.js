import React, {useEffect, useState} from 'react'

const Comment = (props) => {
  return(
        <div id='report'>
          <div >{props.comment.text}</div>
        </div>
    )
};

export default Comment
