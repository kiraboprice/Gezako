import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import moment from 'moment'
import {Link, Redirect} from 'react-router-dom'

import {setPrevUrl} from "../../../store/actions/authActions";
import {
  downloadReport, getReport, resetGetReport, resetReportDownload, unsubscribeGetReport
} from "../../../store/actions/reportActions";

import './/testdetails.css';
import './/spockreportcustomstyles.css';

import StatusCard from "../../status/StatusCard";

import {getReportPhaseFromPathName} from "../../../util/StringUtil";
import twitterIcon from "../../../assets/Icons/twitter.png";

const TestDetails = (props) => {
  const {user, test} = props;

  const {reportDownload} = props;
  const id = props.match.params.id;

  const {setPrevUrl, downloadReport, resetReportDownload} = props;
  useEffect(() => {
    return function cleanup() {
      resetReportDownload()
    };
  },[]); //componentWillUnmount

  const [displayDevelopmentFields, setDisplayDevelopmentFields] = useState('');
  const [displayCompletedFields, setDisplayCompletedFields] = useState('');
  const {getReport, unsubscribeGetReport, resetGetReport} = props;

  useEffect(() => {
    const phase = getReportPhaseFromPathName(props.location.pathname);
    if(phase === 'development') {
      setDisplayDevelopmentFields('block');
      setDisplayCompletedFields('none');
    } else if (phase === 'completed') {
      setDisplayDevelopmentFields('none');
      setDisplayCompletedFields('block');
    }

    getReport(props.match.params.id);

    return function cleanup() {
      unsubscribeGetReport(props.match.params.id);
      resetGetReport();
    };
  },[]); //componentWillUnmount

  if (!user) {
    setPrevUrl(props.location.pathname);
    return <Redirect to='/login' />;
  }

  // console.log('test');
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
                                          style={{display: displayDevelopmentFields}}>Assigned
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
                      {test.postmanTest ? 'Postman Tests'
                          : 'No Postman Tests Added'}
                    </a>
                  </div>

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
                    <b>Spock Report</b>

                    <div id='github-pr'>
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
                    <b>No Spock Report</b>
                  {/*</div>*/}
                </div>
            }
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

const mapStateToProps = (state) => {
  // console.log('TestDetails state----------');
  // console.log(state);

  return {
    user: state.auth.user,
    test: state.report.getReport,
    reportDownload: state.report.reportDownload,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getReport: (id) => dispatch(getReport(id)),
    unsubscribeGetReport: (id) => dispatch(unsubscribeGetReport(id)),
    resetGetReport: () => dispatch(resetGetReport()),

    downloadReport: (test) => dispatch(downloadReport(test)),
    setPrevUrl: (url) => dispatch(setPrevUrl(url)),
    resetReportDownload: () => dispatch(resetReportDownload())
  }
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(TestDetails);
