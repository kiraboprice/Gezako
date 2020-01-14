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

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
});

const StatusCard = (props) => {
  const classes = useStyles();
  const { status, statusImage, description } = props;
  const [statusValue, setStatusValue] = useState('');

  //todo set the initial status as the current status in the status list

  // useEffect(() => {
  //   setStatusValue(status); //this doesnt work
  // });

  function handleChange(e) {
    setStatusValue(e.target.value)
  }

  return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
              component="img"
              alt="Image"
              height="20"
              image={statusImage}
              title={status}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {status}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <select value={statusValue} onChange={handleChange}>
            <option value='new'>New</option>
            <option value='inReview'>In Review</option>
          </select>
          <Button size="small" color="primary">
            Update Status
          </Button>
        </CardActions>
      </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    // auth: state.firebase.auth,
    // report: state.report.getReport,
    // reportDownload: state.report.reportDownload
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    // downloadReport: (report) => dispatch(downloadReport(report)),
    // setPrevUrl: (url) => dispatch(setPrevUrl(url)),
    // getReport: (id, phase) => dispatch(getReport(id, phase)),
    // resetState: () => dispatch(resetState())
  }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(StatusCard)
