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

const FeatureDetails = (props) => {

  const [service, setService] = useState(getServiceNameFromPathName(props.location.pathname, 'features'));

  //get feature from db
  const [getFeatureByIdInDb, setGetFeatureByIdInDb] = useState(false);
  const [id, setId] = useState(props.match.params.id);
  const [getFeatureByIdResponse, setGetFeatureByIdResponse] = useState(null);
  const [feature, setFeature] = useState('');
  const [unsubscribeGetFeatureByIdInDb, setUnsubscribeGetFeatureByIdInDb] = useState(null);

  //UI
  const [displayLoadingFeatures, setDisplayLoadingFeatures] = useState('block');
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
        setDisplayLoadingFeatures('none');
        setDisplayFeatureDoesNotExist('block');
        setDisplayFeature('none');
        setDisplayError('none');
      }

      else if (getFeatureByIdResponse.response === "EXISTS"){
        console.log('FEATURE RESPONSE---', getFeatureByIdResponse.feature);
        setFeature(getFeatureByIdResponse.feature);

        setDisplayLoadingFeatures('none');
        setDisplayFeatureDoesNotExist('none');
        setDisplayFeature('block');
        setDisplayError('none');
      }

      else if (getFeatureByIdResponse.response === "ERROR"){

        setDisplayLoadingFeatures('none');
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

  const handleAddSpockTestClicked = () => {
    setShowAddDialog(true);
    setTestTypeToAdd('spock'); //todo add this to constants
  };

  const handleAddPostmanTestClicked = () => {
    setShowAddDialog(true);
    setTestTypeToAdd('postman'); //todo add this to constants
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

  const { user, setPrevUrl } = props;
  if (!user) {
    setPrevUrl(props.location.pathname);
    return <Redirect to='/login' />;
  }

  return (
      <div>
        <div id='test-details-section' style={{display: displayLoadingFeatures}}>
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

              <Link to={`/features/${service}/update/${id}`}>
                <button id="test-button-summary" style={{
                  background: "#f0f0f0",
                  marginTop: "25px"
                }}>Update Feature
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/*Manual Tests
           *
        */}
        <div id='feature-reports' style={{width : '40%', position : 'relative', margin : '100px auto 0 auto', transition : 'all ease-in-out 400ms'}}>
          <h3>Manual Tests</h3>
          <div id='headers'>
            <div id='service'>Title</div>
            <div id='title'>Updated At</div>
            <div id='title'>Created By</div>
            <div id='end-column'></div>
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
            <div id="update-status-options" style={{marginTop : '20px'}}>
              <button onClick={()=>setOnClickUpdateFeatureTest({'test' : test, 'index' : index})} ><img src={penIcon} alt="Update"/> </button>
            </div>
            <hr></hr>
          </div>
          )})
          }
          <button
              id="test-button-summary"
              style={{background: "#f0f0f0", marginTop: "25px"}}
              onClick={() => handleAddManualTestClicked()}
          >
            Add Manual Test
          </button>
          <br/>

           {/*Spock Tests
           *
           */}
          <h3>Add Test for Service in Isolation (Spock)</h3>
          <div id='headers'>
            <div id='service'>Title</div>
            <div id='title'>Updated At</div>
            <div id='title'>Created By</div>
            <div id='end-column'></div>
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
                  <div id="update-status-options" style={{marginTop : '20px'}}>
                    <button onClick={()=>setOnClickUpdateFeatureTest({'test' : test, 'index' : index})} ><img src={penIcon} alt="Update"/> </button>
                  </div>
                  <hr></hr>
                </div>
            )})
          }
          <button
              id="test-button-summary"
              style={{background: "#f0f0f0", marginTop: "25px"}}
              onClick={() => handleAddSpockTestClicked()}
          >
            Add Spock Test
          </button>


          {/*Postman Tests
           *
           */}
          <h3>Add Integration Test (Postman)</h3>
          <div id='headers'>
            <div id='service'>Title</div>
            <div id='title'>Updated At</div>
            <div id='title'>Created By</div>
            <div id='end-column'></div>
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
                  <div id="update-status-options" style={{marginTop : '20px'}}>
                    <button onClick={()=>setOnClickUpdateFeatureTest({'test' : test, 'index' : index})} ><img src={penIcon} alt="Update"/> </button>
                  </div>
                  <hr></hr>
                </div>
            )})
          }
          <button
              id="test-button-summary"
              style={{background: "#f0f0f0", marginTop: "25px"}}
              onClick={() => handleAddPostmanTestClicked()}
          >
            Add Postman Test
          </button>

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

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPrevUrl: (url) => dispatch(setPrevUrl(url)),
    showSuccessAlert: (message) => dispatch(showSuccessAlert(message)),
    showErrorAlert: (message) => dispatch(showErrorAlert(message)),
  }
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(FeatureDetails);
