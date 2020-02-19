import React, {useEffect, useState} from 'react';
import "./comments.css";
import {connect} from 'react-redux';
import {
  createFeatureComment,
  getFeatureComments
} from "../../store/actions/featureActions";
// import {Comment} from "Comment"; //todo check why this cant be imported
import {Timestamp} from "firebase";
import * as firebase from "firebase";
import {createSpockReportComment} from "../../store/actions/reportActions";
// import * as firebase from "firebase";

const CreateComment = (props) => {
  const { user } = props;
  const [commentTextAreaActive, setCommentTextAreaActive] = useState(false);

  const [text, setText] = useState('');

  const { createFeatureComment, createSpockReportComment } = props;
  const handleOnClickSave = () => {
    if (text !== '') { //todo Rich: sanitise this input further and add validation! (do the same for email inputs)
      // const comment = new Comment(
      //     user.uid,
      //     user.displayName,
      //     user.photoURL,
      //     Timestamp.fromDate(new Date()),
      //     text,
      //     Timestamp.fromDate(new Date())
      // );

      const comment = {
        authorId : user.uid,
        authorName : user.displayName,
        authorPhotoUrl : user.photoURL,
        createdAt : firebase.firestore.Timestamp.fromDate(new Date()),
        text : text,
        updatedAt : firebase.firestore.Timestamp.fromDate(new Date())
      };

      if(props.featureId) { //if the parent component is a feature, treat this as a feature comment
        createFeatureComment(props.featureId, comment);
      }
      else if(props.reportId) {//if the parent component is a report, treat this as a report comment
        createSpockReportComment(props.reportId, comment);
      }
      //reset UI
      setText('');
    }
  };

  const handleCommentTextChange = (e) => {
    setText(e.target.value);
  };

  return(
        <div id='report'>
          <div id="comment-add-container">
            <img id="comment-picture" src={user.photoURL} alt={user.displayName} />

            <div id="active-container">
            <textarea
                id={commentTextAreaActive ? "comment-textarea-active" : "comment-textarea"}
                placeholder="Add a comment..."
                onChange={handleCommentTextChange}
                value={text}
                onClick={() => setCommentTextAreaActive(true)}>

            </textarea>

              {commentTextAreaActive ?
                <div id="buttons">
                  <span id="save-button" onClick={() => handleOnClickSave()}>Save</span>
                  <span id="cancel-button" onClick={() => setCommentTextAreaActive(false)}>Cancel</span>
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
    createFeatureComment: (featureId, comment) => dispatch(createFeatureComment(featureId, comment)),
    createSpockReportComment: (reportId, comment) => dispatch(createSpockReportComment(reportId, comment)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateComment)
