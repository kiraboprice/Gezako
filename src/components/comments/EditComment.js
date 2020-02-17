import React, {useEffect, useState} from 'react';
import "./comments.css";
import {connect} from 'react-redux';
import {
  createFeatureComment,
  getFeatureComments, updateFeatureComment
} from "../../store/actions/featureActions";
// import {Comment} from "Comment"; //todo check why this cant be imported
import {Timestamp} from "firebase";
import * as firebase from "firebase";

const EditComment = (props) => {
  const { user } = props;

  const [comment, setComment] = useState(null);
  const [text, setText] = useState('');

  useEffect(() => {
    setComment(props.comment);
    setText(props.comment.text);
  }, [props]);

  const handleCommentTextChange = (e) => {
    setText(e.target.value);
  };

  const { updateFeatureComment } = props;
  const handleOnClickSave = () => {
    if (text !== '') { //todo Rich: sanitise this input further and add validation! (do the same for email inputs)
      props.comment.text = text;
      props.comment.updatedAt = firebase.firestore.Timestamp.fromDate(new Date());

      updateFeatureComment(props.featureId, comment);

      props.setShowEditComment(false) //hide the edit component
    }
  };


  const handleOnClickCancel = () => {
    props.setShowEditComment(false)
  };

  return(
        <div id='report'>
          <div id="comment-add-container">
            <img id="comment-picture" src={user.photoURL} alt={user.displayName} />

            <div id="active-container">
            <textarea
                id="comment-textarea-active"
                onChange={handleCommentTextChange}
                value={text}
            >
            </textarea>

                <div id="buttons">
                  <span id="save-button" onClick={() => handleOnClickSave()}>Save</span>
                  <span id="cancel-button" onClick={() => handleOnClickCancel()}>Cancel</span>
                </div>

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
    updateFeatureComment: (featureId, comment) => dispatch(updateFeatureComment(featureId, comment))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditComment)
