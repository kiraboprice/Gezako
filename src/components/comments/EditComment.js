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
import {updateSpockReportComment} from "../../store/actions/reportActions";

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

  const { updateFeatureComment, updateSpockReportComment } = props;
  const handleOnClickSave = () => {
    if (text !== '') { //todo Rich: sanitise this input further and add validation! (do the same for email inputs)
      props.comment.text = text;
      props.comment.updatedAt = firebase.firestore.Timestamp.fromDate(new Date());

      if(props.featureId) { //if the parent component is a feature, treat this as a feature comment
        updateFeatureComment(props.featureId, comment);
      }
      else if(props.reportId) {//if the parent component is a report, treat this as a report comment
        updateSpockReportComment(props.reportId, comment);
      }

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
    updateFeatureComment: (featureId, comment) => dispatch(updateFeatureComment(featureId, comment)),
    updateSpockReportComment: (reportId, comment) => dispatch(updateSpockReportComment(reportId, comment))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditComment)
