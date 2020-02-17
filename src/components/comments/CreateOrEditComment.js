import React, {useEffect, useState} from 'react';
import "./comments.css";
import {connect} from 'react-redux';

const CreateOrEditComment = (props) => {
  const { user } = props;
  const [isActive, setState] = useState(false);

  return(
        <div id='report'>
          <div id="comment-add-container">
            <img id="comment-picture" src={user.photoURL} alt={user.displayName} />

            <div id="active-container">
            <textarea onClick={() => setState(true)} id={isActive ? "comment-textarea-active" : "comment-textarea"} name="comment" form="usrform" placeholder="Add a comment..."></textarea>
              {
                isActive ? 
                <div id="buttons">
                  <span id="save-button">Save</span>
                  <span id="cancel-button" onClick={() => setState(false)}>Cancel</span>
                </div>
                :
                null
              }
            </div>
          </div>

        </div>
    )
};


const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
   
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrEditComment)
