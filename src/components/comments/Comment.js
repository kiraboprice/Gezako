import React, {useEffect, useState} from 'react';
import moment from "moment";

const Comment = (props) => {
  return(
        <div id='report'>
          <div id="comment-add-container">
            <img id="comment-picture" src={props.comment.authorPhotoUrl} alt={props.comment.authorName} />

            <div id="author-details">
              <span id="comment-authorname">{props.comment.authorName}</span>
              - <span id="comment-time">{moment(props.comment.createdAt.toDate()).calendar()}</span>
              <div id="comment-text">{props.comment.text}</div>
              <span id="modify-comment">Edit</span> - <span id="modify-comment">Delete</span>
            </div>
          </div>
          
        </div>
    )
};

export default Comment
