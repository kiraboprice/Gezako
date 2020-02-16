import React, {useEffect, useState} from 'react';
import "./comments.css";

const CreateOrEditComment = (props) => {
  const [isActive, setState] = useState(false);

  return(
        <div id='report'>
          <div id="comment-add-container">
            <img id="comment-picture" src="{INSERT PROFILE URL}" /* INSERT USERNAME IN ALT -> */ alt="" />
            {
              isActive ? 
              <div id="active-container">
                  <textarea id="comment-textarea-active" name="comment" form="usrform" placeholder="Add a comment..."></textarea> 
                  <div id="buttons">
                    <span id="save-button">Save</span>
                    <span id="cancel-button" onClick={() => setState(false)}>Cancel</span>
                  </div>
                  
              </div>
              :
              <textarea onClick={() => setState(true)} id="comment-textarea" name="comment" form="usrform" placeholder="Add a comment..."></textarea>
            }
          </div>

        </div>
    )
};

export default CreateOrEditComment
