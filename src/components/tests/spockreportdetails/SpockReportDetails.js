import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import moment from 'moment'
import {Link, Redirect} from 'react-router-dom'

import {setPrevUrl} from "../../../store/actions/authActions";
import {
  downloadReport,
  getReport,
  getSpockReportComments,
  resetGetReport, resetGetSpockReportComments,
  resetReportDownload,
  unsubscribeGetReport, unsubscribeGetSpockReportComments
} from "../../../store/actions/reportActions";

import './/spockreportdetails.css';
import './/spockreportcustomstyles.css';

import StatusCard from "../../status/StatusCard";

import {getTestPhaseFromPathName} from "../../../util/StringUtil";
import twitterIcon from "../../../assets/Icons/twitter.png";
import ViewComment from "../../comments/ViewComment";
import CreateComment from "../../comments/CreateComment";

const SpockReportDetails = (props) => {
  //props needed for ui
  const { id } = props;

  const {user, test} = props;

  const {reportDownload} = props;



  const {setPrevUrl, downloadReport, resetReportDownload} = props;
  useEffect(() => {
    return function cleanup() {
      resetReportDownload()
    };
  },[]); //componentWillUnmount

  const [displayTestDevelopmentFields, setDisplayTestDevelopmentFields] = useState('');
  const [displayTestCompletedFields, setDisplayTestCompletedFields] = useState('');
  const {getReport, unsubscribeGetReport, resetGetReport} = props;

  /**
   * Init display and getReport
   * */
  useEffect(() => {
    const phase = getTestPhaseFromPathName(props.location.pathname);
    if(phase === 'development') {
      setDisplayTestDevelopmentFields('block');
      setDisplayTestCompletedFields('none');
    } else if (phase === 'completed') {
      setDisplayTestDevelopmentFields('none');
      setDisplayTestCompletedFields('block');
    }

    getReport(props.match.params.id);

    return function cleanup() {
      unsubscribeGetReport(props.match.params.id);
      resetGetReport();
    };
  },[]); //componentWillUnmount


  /**
   * Comments
   * */
  const { getSpockReportComments, unsubscribeGetSpockReportComments, resetGetSpockReportComments } = props;
  useEffect(() => {
    getSpockReportComments(id);

    return function cleanup() {
      unsubscribeGetSpockReportComments(id);
      resetGetSpockReportComments();
    };
  }, [id]);
  const { comments } = props;

  if (!user) {
    setPrevUrl(props.location.pathname);
    return <Redirect to='/login' />;
  }

  function goToExternalLink(productSpec) {
    window.open(productSpec) //open new tab
    // window.location.replace(productSpec) //stay on page
  }

  if (test) {
    if(test.toString == 'GET_REPORT_ERROR_NOT_EXISTS'.toString) {
      return (
          <div id='test-details-section'>
            <p>Test does not exist.</p>
          </div>
      )
    }
    else {
      // console.log('BEFORE DOWNLOAD------test');
      // console.log(test);
      let htmlReport = null;
      if(test.fileDownLoadUrl) {
        downloadReport(test);
        htmlReport = {__html: reportDownload};
      }

      return (
          <div>
            <div id='test-details-section'>
              <div id="test-details-summary">
                <div id="section1">
                  <span id="test-title-summary">{test.title}</span>
                  <div id="uploaded-by">Uploaded by {test.createdBy}, {moment(
                      test.createdAt.toDate()).calendar()}</div>

                  {test.assignedTo ? <div id="uploaded-by"
                                          style={{display: displayTestDevelopmentFields}}>Assigned
                    to {test.assignedTo.displayName}</div> : null}

                  <button id="test-button-summary"
                          style={{background: "#ff6f69", marginRight: "10px"}}
                          onClick={() => goToExternalLink(test.productSpec)}>
                    {test.techSpec ? 'Product Requirements Spec'
                        : 'No Product Requirements Spec Set'}
                  </button>

                  <button id="test-button-summary"
                          style={{background: "#ffeead"}}
                          onClick={() => goToExternalLink(test.techSpec)}>
                    {test.techSpec ? 'Technical Design Doc'
                        : 'No Technical Design Doc Set'}
                  </button>

                  <div id='postman-tests'>
                    <a href={test.postmanTest} target='_blank'>
                      {test.postmanTest ? 'Integration Tests (Postman)'
                          : 'No Integration Tests Added (Postman)'}
                    </a>
                  </div>

                  {/*<div id='perfomance-tests'>*/}
                    {/*<a href={test.perfomanceTests} target='_blank'>*/}
                      {/*{test.perfomanceTests ? 'Load Performance Tests (Gatling)'*/}
                          {/*: 'No Load Performance Tests Added (Gatling) - COMING SOON'}*/}
                    {/*</a>*/}
                  {/*</div>*/}

                  <Link to={`/${test.phase}/update-report/${id}`}>
                    <button id="test-button-summary" style={{
                      background: "#f0f0f0",
                      marginTop: "25px"
                    }}>Update Test
                    </button>
                  </Link>
                </div>

                <div id="status-card-section">
                  <StatusCard
                      id={id}
                      report={test}
                  />
                </div>

              </div>
            </div>

            {test.fileDownLoadUrl
                ?
                <div id='test-details-section'>
                  <div id="spock-report-container">
                    <b>Service Tests In Isolation (Spock)</b>

                    <div id='github-pr' style={{display: displayTestDevelopmentFields}}>
                      <a href={test.githubPR} target='_blank'>
                        {test.githubPR ? 'Github Pull Request'
                            : 'No Github Pull Request Opened'}
                      </a>
                    </div>

                    <div dangerouslySetInnerHTML={htmlReport}/>

                  </div>
                </div>
                :
                <div id='test-details-section'>
                  {/*<div id="spock-report-container">*/}
                    <b>No Service Tests In Isolation Added(Spock)</b>
                  {/*</div>*/}
                </div>
            }

            {/*---------------COMMENTS BEGIN HERE--------------------*/}
            <div id="comments-container">
              {/*Long term Note: Bring this button back when we have too many firestore
          reads and decide to only load comments on demand to optimise load time and cost*/}

              {/*<button id="test-button-summary" style={{*/}
              {/*background: "#f0f0f0",*/}
              {/*marginTop: "25px"*/}
              {/*}}> {comments ? comments.length === 0 ? "No" : "Load" : null} {comments ? comments.length === 0 ? "" : comments.length : null} comment{comments ? comments.length === 0 ? "s" : "" : comments ? comments.length > 1 ? "s" : "" : ""} */}
              {/*</button>*/}

              {/*todo Rich/Derek place this in it's own css style thing (not the copied "uploaded-by" used below)*/}
              <div id="comments-container-inner">

                <div id="uploaded-by">Comments</div>
                  { comments && comments.map(comment => {
                    return (
                        <div key={comment.id}>
                          <ViewComment
                              reportId={id}
                              comment={comment}
                          />
                        </div>
                    )
                  })
                  }
                  <CreateComment
                      reportId =  {id}
                  />
                </div>
              </div>
            {/*---------------COMMENTS END HERE--------------------*/}

          </div>
      )
    }
  }
  else {
    return (
        <div id='test-details-section'>
          <p>Loading report...</p>
        </div>
    )
  }

};

const mapStateToProps = (state, ownProps) => {
  // console.log('TestDetails state----------');
  // console.log(state);

  return {
    //initialise state
    id: ownProps.match.params.id,

    user: state.auth.user,
    test: state.report.getReport,
    reportDownload: state.report.reportDownload,
    comments: state.report.getSpockReportComments
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getReport: (id) => dispatch(getReport(id)),
    unsubscribeGetReport: (id) => dispatch(unsubscribeGetReport(id)),
    resetGetReport: () => dispatch(resetGetReport()),

    downloadReport: (test) => dispatch(downloadReport(test)),
    setPrevUrl: (url) => dispatch(setPrevUrl(url)),
    resetReportDownload: () => dispatch(resetReportDownload()),

    //comments
    getSpockReportComments: (reportId) => dispatch(getSpockReportComments(reportId)),
    unsubscribeGetSpockReportComments: (reportId) => dispatch(unsubscribeGetSpockReportComments(reportId)),
    resetGetSpockReportComments: () => dispatch(resetGetSpockReportComments())
  }
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(SpockReportDetails);
