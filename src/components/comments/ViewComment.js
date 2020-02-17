import React, {useEffect, useState} from 'react';
import moment from "moment";
import {
  createFeatureComment,
  deleteFeatureComment, updateFeatureComment
} from "../../store/actions/featureActions";
import connect from "react-redux/es/connect/connect";
import CreateOrEditComment from "./CreateComment";
import EditComment from "./EditComment";
import AddFeatureTestDialog
  from "../tests/features/featuredetails/AddFeatureTestDialog";

const ViewComment = (props) => {

  const [showEditComment, setShowEditComment] = useState(false);

  useEffect(() => {
    // setComment(props.comment);
  }, [props]);

  const { updateFeatureComment } = props;
  const handleOnClickEdit = () => {
    setShowEditComment(true);
    // updateFeatureComment(props.featureId, props.comment.id, commentForUpdate);

  };

  const { deleteFeatureComment } = props;
  const handleOnClickDelete = () => {
    deleteFeatureComment(props.featureId, props.comment.id);
  };


  return(
        <div id='report'>
          {/*note: DEREK: the style={{display in the div below causes the Image to be on top of everything else. weird*/}
          {/*<div id="comment-add-container">*/}
            <div id="comment-add-container" style={{display: showEditComment ? 'none' : 'block'}}>
            <img id="comment-picture" src={props.comment.authorPhotoUrl} alt={props.comment.authorName} />

            <div id="author-details">
              <span id="comment-authorname">{props.comment.authorName}</span>
              - <span id="comment-time">{moment(props.comment.createdAt.toDate()).calendar()}</span>
              <div id="comment-text">{props.comment.text}</div>

              <span id="modify-comment" onClick={() => handleOnClickEdit()}>Edit</span> - <span id="modify-comment" onClick={() => handleOnClickDelete()}>Delete</span>
            </div>
          </div>

          { showEditComment?
            <EditComment
                featureId =  {props.featureId}
                comment =  {props.comment}
                setShowEditComment = {setShowEditComment}
            />
              : null
          }

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
    updateFeatureComment: (featureId, commentId, comment) => dispatch(updateFeatureComment(featureId, commentId, comment)),
    deleteFeatureComment: (featureId, commentId) => dispatch(deleteFeatureComment(featureId, commentId)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewComment)
