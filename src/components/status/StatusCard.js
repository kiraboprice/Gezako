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
import {updateReport} from "../../store/actions/reportActions";

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
});

const StatusCard = (props) => {
  const classes = useStyles();

  const { updateReport } = props;
  const [statusValue, setStatusValue] = useState('');

  const [state, setLocalState] = useState(props);
  useEffect(() => {
    setLocalState(props);
  }, [props]);

  console.log('state');
  console.log(state);


  function handleStatusChange(e) {
    setStatusValue(e.target.value)
  }

  function updateStatus(e) {
    state.report.status = statusValue;
    updateReport(state.id, state.report)
  }

  return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
              component="img"
              alt="Image"
              height="20"
              image={state.statusImage}
              title={state.report.status}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {state.report.status}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {state.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <select value={statusValue} onChange={handleStatusChange}>
            <option value='new'>New</option>
            <option value='inReview'>In Review</option>
          </select>
          <Button size="small" color="primary" onClick={updateStatus}>
            Update Status
          </Button>
        </CardActions>
      </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    // auth: state.firebase.auth,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateReport: (id, report) => dispatch(updateReport(id, report)),
  }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(StatusCard)
