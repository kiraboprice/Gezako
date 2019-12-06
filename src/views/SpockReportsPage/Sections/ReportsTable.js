import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import 'App.css';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black, //todo change color here
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  root: {
    width: '80%',
    // overflowX: 'auto',
    marginLeft: '150px'
  },
  table: {
    minWidth: 700
  },
});

export default function ReportsTable(props) {
  const classes = useStyles();
  const reports = props.reports;
  return (
      <div >
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell align="left">Report</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map(report => (
                //todo pass the db key here
                <StyledTableRow key={report.fileDownLoadUrl}>
                  <StyledTableCell align="left">{report.reportTitle}</StyledTableCell>
                  <StyledTableCell align="left"><a href = {report.fileDownLoadUrl}>Report</a></StyledTableCell>
                  <a href={report.fileDownLoadUrl}>Report</a>
                  <td><a href = {report.fileDownLoadUrl}>Report</a></td>
                </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      </div>
  );
}
