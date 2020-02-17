import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import moment from 'moment'
import {Link, Redirect} from 'react-router-dom'

import {setPrevUrl} from "../../../../store/actions/authActions";

import './featuredetails.css';

import {getServiceNameFromPathName} from "../../../../util/StringUtil";
import GetFeatureByIdDbHandler
  from "../featuresdbhandlers/GetFeatureByIdDbHandler";
import AddFeatureTestDialog from "./AddFeatureTestDialog";
import {
  showErrorAlert,
  showSuccessAlert
} from "../../../../store/actions/snackbarActions";
import FeatureTest from "./FeatureTest";
import twitterIcon from "../../../../assets/Icons/twitter.png";
import UpdateFeatureTestDialog from "./UpdateFeatureTestDialog";
import penIcon from "../../../../assets/Icons/pen.png";
import add_test_icon from "../../../../assets/Icons/plus.png";
import Test from "../../Test";
import CreateOrEditComment from "../../../comments/CreateComment";
import {
  getFeatureComments,
  getFeaturesByService, resetGetFeatureComments, unsubscribeGetFeatureComments
} from "../../../../store/actions/featureActions";
import ViewComment from "../../../comments/ViewComment";

const FeatureDetails = (props) => {

  //props needed for ui
  const { id, service } = props;

  //ui
  const [manualTestsHidden, setManualTestsHidden] = useState("block");
  const [postmanTestsHidden, setPostmanTestsHidden] = useState("block");
  const [spockTestsHidden, setSpockTestsHidden] = useState("block");
  const [androidTestsHidden, setAndroidTestsHidden] = useState("block");
  const [performanceTestsHidden, setPerformanceTestsHidden] = useState("block");

  //get feature from db
  const [getFeatureByIdInDb, setGetFeatureByIdInDb] = useState(false);
  const [getFeatureByIdResponse, setGetFeatureByIdResponse] = useState(null);
  const [feature, setFeature] = useState('');
  const [unsubscribeGetFeatureByIdInDb, setUnsubscribeGetFeatureByIdInDb] = useState(null);

  //UI
  const [displayLoadingFeature, setDisplayLoadingFeature] = useState('block');
  const [displayFeatureDoesNotExist, setDisplayFeatureDoesNotExist] = useState('none');
  const [displayFeature, setDisplayFeature] = useState('none');
  const [displayError, setDisplayError] = useState('none');

  //Update feature tests
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [testTypeToAdd, setTestTypeToAdd] = useState();
  const [addFeatureTestResponse, setAddFeatureTestResponse] = useState();

  useEffect(() => { //get feature on load
    setGetFeatureByIdInDb(true);
    console.log('getFeatureByIdInDb', getFeatureByIdInDb);
    return function cleanup() {
      setUnsubscribeGetFeatureByIdInDb(true);
    };
  }, [id]);

  useEffect(() => { //listen for response from get feature
    if (getFeatureByIdResponse){
      if(getFeatureByIdResponse.response === "NOT_EXIST"){
        setDisplayLoadingFeature('none');
        setDisplayFeatureDoesNotExist('block');
        setDisplayFeature('none');
        setDisplayError('none');
      }

      else if (getFeatureByIdResponse.response === "EXISTS"){
        console.log('FEATURE RESPONSE---', getFeatureByIdResponse.feature);
        setFeature(getFeatureByIdResponse.feature);

        setDisplayLoadingFeature('none');
        setDisplayFeatureDoesNotExist('none');
        setDisplayFeature('block');
        setDisplayError('none');
      }

      else if (getFeatureByIdResponse.response === "ERROR"){

        setDisplayLoadingFeature('none');
        setDisplayFeatureDoesNotExist('none');
        setDisplayFeature('none');
        setDisplayError('block');
      }
    }
  }, [getFeatureByIdResponse]);

  /**
  * Add feature test
  * */
  const handleAddManualTestClicked = () => {
    setShowAddDialog(true);
    setTestTypeToAdd('manual'); //todo add this to constants
  };

  const handleAddPostmanTestClicked = () => {
    setShowAddDialog(true);
    setTestTypeToAdd('postman'); //todo add this to constants
  };

  const handleAddSpockTestClicked = () => {
    setShowAddDialog(true);
    setTestTypeToAdd('spock'); //todo add this to constants
  };

  const handleAddAndroidTestClicked = () => {
    setShowAddDialog(true);
    setTestTypeToAdd('android'); //todo add this to constants
  };

  const handleAddPerformanceTestClicked = () => {
    setShowAddDialog(true);
    setTestTypeToAdd('performance'); //todo add this to constants
  };

  const {showSuccessAlert, showErrorAlert} = props;
  useEffect(() => { //listen for response from update feature
    if (addFeatureTestResponse){
      if(addFeatureTestResponse.response === "SUCCESS"){
        // console.log('IN SUCCESS!!!!!!!');
        showSuccessAlert('Successfully created test');
      }

      else if (addFeatureTestResponse.response === "ERROR"){
        showErrorAlert('Failed to create test');
      }
    }
  }, [addFeatureTestResponse]);

    function goToExternalLink(productSpec) {
    window.open(productSpec) //open new tab
    // window.location.replace(productSpec) //stay on page
  }

  /**
  * Update feature test
  * */
  const [onClickUpdateFeatureTest, setOnClickUpdateFeatureTest] = useState(null);
  const [testToUpdate, setTestToUpdate] = useState(null);
  const [testToUpdateIndex, setTestToUpdateIndex] = useState(null);
  const [showUpdateFeatureTestDialog, setShowUpdateFeatureTestDialog] = useState(false);
  useEffect(() => {
    console.log('onClickUpdateFeatureTest----', onClickUpdateFeatureTest);
    if (onClickUpdateFeatureTest){
      setTestToUpdate(onClickUpdateFeatureTest.test); //todo get test to update from feature array?
      setTestToUpdateIndex(onClickUpdateFeatureTest.index);
      setShowUpdateFeatureTestDialog(true)
    }
  }, [onClickUpdateFeatureTest]);

  const [updateFeatureTestResponse, setUpdateFeatureTestResponse] = useState(false);


  /**
   * Comments
   * */
  const { getFeatureComments, unsubscribeGetFeatureComments, resetGetFeatureComments } = props;
  useEffect(() => {
    getFeatureComments(id);

    return function cleanup() {
      unsubscribeGetFeatureComments(id);
      resetGetFeatureComments();
    };
  }, [id]);
  const { comments } = props;

  const { user, setPrevUrl } = props;
  if (!user) {
    setPrevUrl(props.location.pathname);
    return <Redirect to='/login' />;
  }

  return (
      <div>
        <div id='test-details-section' style={{display: displayLoadingFeature}}>
          <p>Loading Feature...</p>
        </div>

        <div id='test-details-section' style={{display: displayFeatureDoesNotExist}}>
          <p>Feature does not exist.</p>
        </div>

        <div id='test-details-section' style={{display: displayError}}>
          <p>An Error Occurred.</p>
        </div>

        {/*Summary Card*/}
        <div id='test-details-section' style={{display: displayFeature}}>
          <div id="test-details-summary">
            <div id="section1">
              <span id="test-title-summary">{feature.title}</span>
              <div id="uploaded-by">Created by {feature.createdBy}, {moment(
                  feature.createdAt? feature.createdAt.toDate() : null).calendar()}</div>

              <button id="test-button-summary"
                      style={{background: "#ff6f69", marginRight: "10px"}}
                      onClick={() => goToExternalLink(feature.productSpec)}>
                {feature.techSpec ? 'Product Requirements Spec'
                    : 'No Product Requirements Spec Set'}
              </button>

              <button id="test-button-summary"
                      style={{background: "#ffeead"}}
                      onClick={() => goToExternalLink(feature.techSpec)}>
                {feature.techSpec ? 'Technical Design Doc'
                    : 'No Technical Design Doc Set'}
              </button>
              <br/>

              <Link to={`/features/${service}/update`}>
                <button id="test-button-summary" style={{
                  background: "#f0f0f0",
                  marginTop: "25px"
                }}>Update Feature FIX THIS BUTTON!
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/*Manual Tests
           *
        */}
        <div id='test-details-section' style={{boxShadow: "0 0 0 rgba(0, 0, 0, 0.0)", display: displayFeatureDoesNotExist === "block" ? "none" : "block"}}>
          <h3>Manual Tests</h3>

          <button
            id="hide_button"
            onClick={() =>  manualTestsHidden === "block" ? setManualTestsHidden("none") : setManualTestsHidden("block")}>
            {manualTestsHidden === "block" ? "hide" : "show"}
          </button>

          <button
            id="add_test_button"
            onClick={() => handleAddManualTestClicked()}>
              <img src={add_test_icon} alt="add test" />
          </button>

          <div style={{display: manualTestsHidden === "block" ? "block" : "none", transition: "all ease-in-out 400ms"}}>
            <div id='headers'>
              <div id='service'>Title</div>
              <div id='title'>Updated At</div>
              <div id='title'>Created By</div>
            </div>
            { feature.manualTests && feature.manualTests.map((test, index) => {
            return (
            <div>
              <a href={test.link} target='_blank'
                rel="noopener noreferrer">
                <FeatureTest
                    key={index} //this is required by React but we may not need it
                    index={index}
                    test={test}
                />
              </a>
              <div id="end-column">
                <button className="update_report" onClick={()=>setOnClickUpdateFeatureTest({'test' : test, 'index' : index})} ><img src={penIcon} alt="Update"/> </button>
              </div>
              <hr></hr>
            </div>
            )})
            }
          </div>

          <br/>
          <br/>

          {/*Postman Tests
           *
           */}
          <h3>Add Integration Test (Postman)</h3>
          <button
              id="hide_button"
              onClick={() =>  postmanTestsHidden === "block" ? setPostmanTestsHidden("none") : setPostmanTestsHidden("block")}>
            {postmanTestsHidden === "block" ? "hide" : "show"}
          </button>

          <button
              id="add_test_button"
              onClick={() => handleAddPostmanTestClicked()}>
            <img src={add_test_icon} alt="add test" />
          </button>


          <div style={{display: postmanTestsHidden === "block" ? "block" : "none", transition: "all ease-in-out 400ms"}}>
          <div id='headers'>
            <div id='service'>Title</div>
            <div id='title'>Updated At</div>
            <div id='title'>Created By</div>
          </div>
          { feature.postmanTests && feature.postmanTests.map((test, index) => {
            return (
                <div>
                  <a href={test.link} target='_blank'
                     rel="noopener noreferrer">
                    <FeatureTest
                        key={index} //this is required by React but we may not need it
                        index={index}
                        test={test}
                    />
                  </a>
                  <div id="end-column">
                    <button className="update_report" onClick={()=>setOnClickUpdateFeatureTest({'test' : test, 'index' : index})} ><img src={penIcon} alt="Update"/> </button>
                  </div>
                  <hr></hr>
                </div>
            )})
          }
          </div>

          <br/>
          <br/>

          {/*Spock Tests
           *
           */}
          <h3>Add Test for Service in Isolation (Spock)</h3>
          <button
              id="hide_button"
              onClick={() =>  spockTestsHidden === "block" ? setSpockTestsHidden("none") : setSpockTestsHidden("block")}>
            {spockTestsHidden === "block" ? "hide" : "show"}
          </button>

          <button
              id="add_test_button"
              onClick={() => handleAddSpockTestClicked()}>
            <img src={add_test_icon} alt="add test" />
          </button>

          <div style={{display: spockTestsHidden === "block" ? "block" : "none", transition: "all ease-in-out 400ms"}}>
            <div id='headers'>
              <div id='service'>Title</div>
              <div id='title'>Updated At</div>
              <div id='title'>Created By</div>
            </div>
            { feature.spockTests && feature.spockTests.map((test, index) => {
              return (
                  <div>
                    <a href={test.link} target='_blank'
                       rel="noopener noreferrer">
                    <FeatureTest
                          key={index} //this is required by React but we may not need it
                          index={index}
                          test={test}
                      />
                    </a>
                    <div id="end-column">
                      <button className="update_report" onClick={()=>setOnClickUpdateFeatureTest({'test' : test, 'index' : index})} ><img src={penIcon} alt="Update"/> </button>
                    </div>
                    <hr></hr>
                  </div>
              )})
            }
          </div>

          <br/>
          <br/>

          {/*Android Tests
           *
           */}
          <h3>Add Android App Automated Tests</h3>
          <button
              id="hide_button"
              onClick={() =>  androidTestsHidden === "block" ? setAndroidTestsHidden("none") : setAndroidTestsHidden("block")}>
            {androidTestsHidden === "block" ? "hide" : "show"}
          </button>

          <button
              id="add_test_button"
              onClick={() => handleAddSpockTestClicked()}>
            <img src={add_test_icon} alt="add test" />
          </button>

          <div style={{display: androidTestsHidden === "block" ? "block" : "none", transition: "all ease-in-out 400ms"}}>
            <div id='headers'>
              <div id='service'>Title</div>
              <div id='title'>Updated At</div>
              <div id='title'>Created By</div>
            </div>
            { feature.androidTests && feature.androidTests.map((test, index) => {
              return (
                  <div>
                    <a href={test.link} target='_blank'
                       rel="noopener noreferrer">
                      <FeatureTest
                          key={index} //this is required by React but we may not need it
                          index={index}
                          test={test}
                      />
                    </a>
                    <div id="end-column">
                      <button className="update_report" onClick={()=>setOnClickUpdateFeatureTest({'test' : test, 'index' : index})} ><img src={penIcon} alt="Update"/> </button>
                    </div>
                    <hr></hr>
                  </div>
              )})
            }
          </div>

          <br/>
          <br/>

          {/*Performance Tests
           *
           */}
          <h3>Add Load Performance Tests (Gatling)</h3>
          <button
              id="hide_button"
              onClick={() =>  performanceTestsHidden === "block" ? setPerformanceTestsHidden("none") : setPerformanceTestsHidden("block")}>
            {performanceTestsHidden === "block" ? "hide" : "show"}
          </button>

          <button
              id="add_test_button"
              onClick={() => handleAddPerformanceTestClicked()}>
            <img src={add_test_icon} alt="add test" />
          </button>

          <div style={{display: performanceTestsHidden === "block" ? "block" : "none", transition: "all ease-in-out 400ms"}}>
            <div id='headers'>
              <div id='service'>Title</div>
              <div id='title'>Updated At</div>
              <div id='title'>Created By</div>
            </div>
            { feature.performanceTests && feature.performanceTests.map((test, index) => {
              return (
                  <div>
                    <a href={test.link} target='_blank'
                       rel="noopener noreferrer">
                      <FeatureTest
                          key={index} //this is required by React but we may not need it
                          index={index}
                          test={test}
                      />
                    </a>
                    <div id="end-column">
                      <button className="update_report" onClick={()=>setOnClickUpdateFeatureTest({'test' : test, 'index' : index})} ><img src={penIcon} alt="Update"/> </button>
                    </div>
                    <hr></hr>
                  </div>
              )})
            }
          </div>

          <br/>
          <br/>

        </div>
        
        <div id="comments-container">
          <button id="test-button-summary" style={{
            background: "#f0f0f0",
            marginTop: "25px"
          }}> {comments ? comments.length === 0 ? "No" : "Load" : null} {comments ? comments.length === 0 ? "" : comments.length : null} comment{comments ? comments.length === 0 ? "s" : "" : comments ? comments.length > 1 ? "s" : "" : ""} 
          </button>

          { comments && comments.map(comment => {
            return (
                <div key={comment.id}>
                  <ViewComment
                      featureId={id}
                      comment={comment}
                  />
                </div>
            )
          })
          }
          <CreateOrEditComment
              featureId =  {id}
          />
        </div>

        <AddFeatureTestDialog
            showAddDialog = {showAddDialog}
            testTypeToAdd = {testTypeToAdd}
            feature = {feature}
            setShowAddDialog = {setShowAddDialog}

            setAddFeatureTestResponse = {setAddFeatureTestResponse}
        />

        <UpdateFeatureTestDialog
            testToUpdate={testToUpdate}
            testToUpdateIndex={testToUpdateIndex}
            feature={feature}
            showUpdateFeatureTestDialog={showUpdateFeatureTestDialog}
            setShowUpdateFeatureTestDialog={setShowUpdateFeatureTestDialog}

            setUpdateFeatureTestResponse={setUpdateFeatureTestResponse}
        />

        {/*Purely Functional Non-Ui components*/}
        <GetFeatureByIdDbHandler
            getFeatureByIdInDb = {getFeatureByIdInDb}
            id = {id}

            setGetFeatureByIdResponse = {setGetFeatureByIdResponse}

            unsubscribeGetFeatureByIdInDb = {unsubscribeGetFeatureByIdInDb}
        />
      </div>
  )
};

const mapStateToProps = (state, ownProps) => {
  return {
    //initialise state
    service: getServiceNameFromPathName(ownProps.location.pathname, 'features'),
    id: ownProps.match.params.id,

    user: state.auth.user,
    comments: state.feature.getFeatureComments,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPrevUrl: (url) => dispatch(setPrevUrl(url)),

    //comments
    getFeatureComments: (featureId) => dispatch(getFeatureComments(featureId)),
    unsubscribeGetFeatureComments: (featureId) => dispatch(unsubscribeGetFeatureComments(featureId)),
    resetGetFeatureComments: () => dispatch(resetGetFeatureComments()),

    //alerts
    showSuccessAlert: (message) => dispatch(showSuccessAlert(message)),
    showErrorAlert: (message) => dispatch(showErrorAlert(message))
  }
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(FeatureDetails);
