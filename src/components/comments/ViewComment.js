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
  from "../features/featuredetails/AddFeatureTestDialog";
import {deleteSpockReportComment} from "../../store/actions/reportActions";

const ViewComment = (props) => {

  const [showEditComment, setShowEditComment] = useState(false);

  useEffect(() => {
    // setComment(props.comment);
  }, [props]);

  const { updateFeatureComment } = props;
  const handleOnClickEdit = () => { //this is for extra security but not required
    if(loggedInUserIsCommentAuthor()) {
      setShowEditComment(true);
    }
  };

  const { deleteFeatureComment, deleteSpockReportComment } = props;
  const handleOnClickDelete = () => {
    if(loggedInUserIsCommentAuthor()) { //this is for extra security but not required
      if(props.featureId) { //if the parent component is a feature, treat this as a feature comment
        deleteFeatureComment(props.featureId, props.comment.id);
      }
      else if(props.reportId) {//if the parent component is a report, treat this as a report comment
        deleteSpockReportComment(props.reportId, props.comment.id);
      }
    }
  };

  const { user } = props;
  const loggedInUserIsCommentAuthor = () => {
    return user.uid === props.comment.authorId
    };

  return(
        <div id='report'>
          <div style={{display: showEditComment ? 'none' : 'block'}}>
            <div id="comment-add-container">
              <img id="comment-picture" src={props.comment.authorPhotoUrl}
                   alt={props.comment.authorName}/>

              <div id="author-details">
                <span id="comment-authorname">{props.comment.authorName}</span>
                - <span id="comment-time">{moment(
                  props.comment.createdAt.toDate()).calendar()}</span>
                <div id="comment-text">{props.comment.text}</div>
                {console.log("loggedInUserIsCommentAuthor",
                    loggedInUserIsCommentAuthor())}
                {
                  loggedInUserIsCommentAuthor() ?
                      <div>
                      <span id="modify-comment"
                            onClick={() => handleOnClickEdit()}>Edit</span> - <span
                          id="modify-comment"
                          onClick={() => handleOnClickDelete()}>Delete</span>
                      </div>
                      :
                      null
                }
              </div>
            </div>
          </div>

          { showEditComment?
            <EditComment
                featureId =  {props.featureId}
                reportId =  {props.reportId}
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
    deleteFeatureComment: (featureId, commentId) => dispatch(deleteFeatureComment(featureId, commentId)),
    deleteSpockReportComment: (reportId, commentId) => dispatch(deleteSpockReportComment(reportId, commentId)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewComment)
