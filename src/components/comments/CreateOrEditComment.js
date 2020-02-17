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
// import * as firebase from "firebase";

const CreateOrEditComment = (props) => {
  const { user } = props;
  const [commentTextAreaActive, setCommentTextAreaActive] = useState(false);

  const [text, setText] = useState('');


  const { createFeatureComment } = props;
  const handleOnClickSave = () => {
    if (text !== '') { //todo Rich: sanitise this input further and add validation! (do the same for email inputs)
      // const comment = new Comment(
      //     user.uid,
      //     user.displayName,
      //     user.photoURL,
      //     // new Date(),
      //     Timestamp.fromDate(new Date()),
      //     text
      // );

      const comment = {
        authorId : user.uid,
        authorName : user.displayName,
        authorPhotoUrl : user.photoURL,
        //createdAt : new Date(),
        // createdAt : Timestamp.fromDate(new Date()),
        createdAt : firebase.firestore.Timestamp.fromDate(new Date()),
        text : text
        // updatedAt: new Date()
      };
      createFeatureComment(props.featureId, comment)
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
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrEditComment)
