import React, { useState, useEffect } from 'react'
import "./statuscard.css"

import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {
  deleteReport,
  resetUpdateReportState,
  updateReport
} from "../../store/actions/reportActions";
import * as ReportStatus from "../../constants/ReportStatus";

import newImage from "../../assets/Imgs/status/yellow-new.jpeg";
import inReviewImage from "../../assets/Imgs/status/orange-inreview.png";
import requestedChangesImage from "../../assets/Imgs/status/red-requestedchanges.png";
import reuploadedImage from "../../assets/Imgs/status/purple-reuploaded.png";
import approvedImage from "../../assets/Imgs/status/pink-approved.png";
import doneImage from "../../assets/Imgs/status/green-done.png";
import completedImage from "../../assets/Imgs/status/blue-completed.png";
import archivedImage from "../../assets/Imgs/status/grey-archived.png";
import deletedImage from "../../assets/Imgs/status/light-grey-deleted.png";
import {getFirstNameFromFullName} from "../../util/StringUtil";
import moment from "moment";
import CustomSnackbar from "../alerts/CustomSnackbar";
import {DELETED} from "../../constants/ReportStatus";
import {
  showErrorAlert,
  showSuccessAlert
} from "../../store/actions/snackbarActions";
import {COMPLETED} from "../../constants/ReportStatus";
import {COMPLETED_PHASE} from "../../constants/Report";

const StatusCard = (props) => {
  //variables
  const { user } = props;

  //actions
  const { updateReport, resetUpdateReportState } = props;
  const { deleteReport } = props;
  const { showErrorAlert } = props;

  const [status, setStatusValue] = useState('');
  const [assignedToName, setAssignedToName] = useState('NONE NONE');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const [stateFromProps, setLocalState] = useState(props);
  useEffect(() => {
    setLocalState(props);
    const status = props.report.status;
    const assignedToName = props.report.assignedTo ? props.report.assignedTo.displayName : 'NONE';
    // setStatusValue(props.report.status); //todo not sure why this doesnt set the value of Status. same applies for line below
    // setAssignedToName(props.report.assignedTo ? props.report.assignedTo.displayName : 'NONE');

    setStatusValue(status);
    setAssignedToName(assignedToName);

    setDescription(generateDescription(
        status,
        getFirstNameFromFullName(props.report.createdBy),
        getFirstNameFromFullName(assignedToName),
        getFirstNameFromFullName(user.displayName)
        )
    );
    setImage(getImage(status));
  }, [props]);

  function handleStatusChange(e) {
    const status = e.target.value;
    setStatusValue(status);
    setDescription(generateDescription(
        status,
        getFirstNameFromFullName(stateFromProps.report.createdBy),
        getFirstNameFromFullName(assignedToName),
        getFirstNameFromFullName(user.displayName)
        )

    );
    setImage(getImage(status));
  }

  function updateStatus(e) {
    stateFromProps.report.status = status;

    if(status === COMPLETED) {
      stateFromProps.report.phase = COMPLETED_PHASE;
    }

    if(status === DELETED){
      if(user.uid === stateFromProps.report.userId){
        deleteReport(stateFromProps.id)
      }
      else {
        showErrorAlert("Only the author of this report can delete it.");
      }
    }
    else {
      updateReport(stateFromProps.id, stateFromProps.report)
    }
  }

  const { showSuccessAlert } = props;

  useEffect(() => {
    // console.log('PROPSSSSSS', props);
    if(props.updateReportResult === 'success'){
      showSuccessAlert('Updated Successfully!')
    }

    return function cleanup() {
    };
  }, [props]);

  function generateDescription(status, createdBy, assignedTo, loggedInUser) {
    switch(status) {
      case ReportStatus.NEW:
        return `${createdBy} uploaded a new report and is waiting for ${assignedTo} to review`;

      case ReportStatus.IN_REVIEW:
        return `${loggedInUser} started reviewing the report`;

      case ReportStatus.REQUESTED_CHANGES:
        return `${loggedInUser} finished the review and gave some feedback to ${createdBy} to fix a few things`;

      case ReportStatus.RE_UPLOADED:
        return `${createdBy} addressed comments and uploaded an updated report`;

      case ReportStatus.APPROVED:
        return `${loggedInUser} approved the report created by ${createdBy}`;

      case ReportStatus.DONE:
        return `${loggedInUser} moved the report to done`;

      case ReportStatus.COMPLETED:
        return `${loggedInUser} moved the report to the Completed phase`;

      case ReportStatus.ARCHIVED:
        return `${createdBy} archived the report`;

      case ReportStatus.DELETED:
        return `${createdBy} deleted the report`;
      default:
        return "Invalid Status"
    }
  }

  function getImage(status) {
    switch(status) {
      case ReportStatus.NEW:
        return newImage;

      case ReportStatus.IN_REVIEW:
        return inReviewImage;

      case ReportStatus.REQUESTED_CHANGES:
        return requestedChangesImage;

      case ReportStatus.RE_UPLOADED:
        return reuploadedImage;

      case ReportStatus.APPROVED:
        return approvedImage;

      case ReportStatus.DONE:
        return doneImage;

      case ReportStatus.COMPLETED:
        return archivedImage;

      case ReportStatus.ARCHIVED:
        return archivedImage;

      case ReportStatus.DELETED:
        return deletedImage;
        break;
      default:
        return "Invalid Status"
    }
  }

  return (
    <div id="status-card">
      <div id="status-color">
        <img src={image} alt={status}></img>
      </div>
      <div id="report-status">
        Status: {status}
      </div>
      <div id="status-description">
        {description}
      </div>
      <div id="status-updated">
        Status updated: {moment(stateFromProps.report.updatedAt.toDate()).calendar()}
      </div>
      <div id="update-status-options">
        <select value={status} onChange={handleStatusChange}>
          <option value={ReportStatus.NEW}>{ReportStatus.NEW}</option>
          <option value={ReportStatus.IN_REVIEW}>{ReportStatus.IN_REVIEW}</option>
          <option value={ReportStatus.REQUESTED_CHANGES}>{ReportStatus.REQUESTED_CHANGES}</option>
          <option value={ReportStatus.RE_UPLOADED}>{ReportStatus.RE_UPLOADED}</option>
          <option value={ReportStatus.APPROVED}>{ReportStatus.APPROVED}</option>
          <option value={ReportStatus.DONE}>{ReportStatus.DONE}</option>
          <option value={ReportStatus.COMPLETED}>{ReportStatus.COMPLETED}</option>
          <option value={ReportStatus.ARCHIVED}>{ReportStatus.ARCHIVED}</option>
          <option value={ReportStatus.DELETED}>{ReportStatus.DELETED}</option>
        </select>
        <button id="status-update-button" onClick={updateStatus}>
          Update Status
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  // console.log('STATE----', state);
  return {
    user: state.auth.user,
    updateReportResult: state.report.updateReportResult,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateReport: (id, report) => dispatch(updateReport(id, report)),
    resetUpdateReportState: () => dispatch(resetUpdateReportState()),

    deleteReport: (id, report) => dispatch(deleteReport(id)),

    showSuccessAlert: (message) => dispatch(showSuccessAlert(message)),
    showErrorAlert: (message) => dispatch(showErrorAlert(message)),
  }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(StatusCard)
