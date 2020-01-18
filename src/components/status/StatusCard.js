import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {
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
import CustomSnackbar from "../snackbar/CustomSnackbar";

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
});

const StatusCard = (props) => {
  const classes = useStyles();

  const { updateReport } = props;
  const [status, setStatusValue] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const [stateFromProps, setLocalState] = useState(props);
  useEffect(() => {
    setLocalState(props);
    const status = stateFromProps.report.status;
    setStatusValue(status);
    setDescription(generateDescription(
        status,
        getFirstNameFromFullName(stateFromProps.report.createdBy),
        getFirstNameFromFullName(stateFromProps.report.assignedTo ? stateFromProps.report.assignedTo.displayName: null))
    );
    setImage(getImage(status));
  }, [props]);

  function handleStatusChange(e) {
    const status = e.target.value;
    setStatusValue(status);
    setDescription(generateDescription(
        status,
        getFirstNameFromFullName(stateFromProps.report.createdBy),
        getFirstNameFromFullName(stateFromProps.report.assignedTo.displayName))
    );
    setImage(getImage(status));
  }

  function updateStatus(e) {
    stateFromProps.report.status = status;
    updateReport(stateFromProps.id, stateFromProps.report)
  }

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successAlertMessage, setSuccessAlertMessage] = useState('');

  useEffect(() => {
    if(props.updateReportResult === 'success'){
      setShowSuccessAlert(true);
      setSuccessAlertMessage('Updated Status!');
      // props.resetUpdateReportState()
    } else {
      setShowSuccessAlert(false);
      setSuccessAlertMessage('');
    }

    return function cleanup() {
      // props.resetUpdateReportState()
    };
  }, [props]);

  function generateDescription(status, createdBy, assignedTo) {
    switch(status) {
      case ReportStatus.NEW:
        return `${createdBy} uploaded a new report and is waiting for ${assignedTo} to review`;

      case ReportStatus.IN_REVIEW:
        return `${assignedTo} started reviewing the report`;

      case ReportStatus.REQUESTED_CHANGES:
        return `${assignedTo} finished the review and gave some feedback to ${createdBy} to fix a few things`;

      case ReportStatus.RE_UPLOADED:
        return `${createdBy} addressed comments from ${assignedTo} and uploaded an updated report`;

      case ReportStatus.APPROVED:
        return `${assignedTo} approved the report form ${createdBy}`;

      case ReportStatus.DONE:
        return `${createdBy} moved the report to done`;

      case ReportStatus.COMPLETED:
        return `${createdBy} moved the report to the Completed section`;

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
        return completedImage;

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
      <div>
        <Card className={classes.card}>
          <CardActionArea>
          <CardMedia
              component="img"
              alt="Image"
              height="20"
              image={image}
              title={stateFromProps.report.status}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {status}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Update at: {stateFromProps.report.updatedAt ? moment(stateFromProps.report.updatedAt.toDate()).calendar(): null}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
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
          <Button size="small" color="primary" onClick={updateStatus}>
            Update Status
          </Button>
        </CardActions>
      </Card>

        <CustomSnackbar
            showSuccessAlert = {showSuccessAlert}
            successAlertMessage = {successAlertMessage}
        />
     </div>
  );
};

const mapStateToProps = (state) => {
  return {
    updateReportResult: state.report.updateReportResult,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateReport: (id, report) => dispatch(updateReport(id, report)),
    resetUpdateReportState: () => dispatch(resetUpdateReportState())
  }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(StatusCard)
