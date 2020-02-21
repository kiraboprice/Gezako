import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import moment from 'moment'
import {Link, Redirect} from 'react-router-dom'

import {
  getAllUsers,
  setPrevUrl
} from "../../../store/actions/authActions";

import './featuredetails.css';

import {getServiceNameFromPathName} from "../../../util/StringUtil";
import GetFeatureByIdDbHandler
  from "../featuresdbhandlers/GetFeatureByIdDbHandler";
import {
  getFeatureComments,
  getFeaturesByService, resetGetFeatureComments, unsubscribeGetFeatureComments
} from "../../../store/actions/featureActions";
import ViewComment from "../../comments/ViewComment";
import CreateComment from "../../comments/CreateComment";
import InfoBeforeDefaultUI from "../../maincontent/Feature";
import * as status from "../../../constants/Feature_TestStatus";
import FeatureTest from "./FeatureTest";

const FeatureDetails = (props) => {

  //props needed for ui
  const { id, service } = props;

  //get feature from db
  const [getFeatureByIdInDb, setGetFeatureByIdInDb] = useState(false);
  const [getFeatureByIdResponse, setGetFeatureByIdResponse] = useState(null);
  const [feature, setFeature] = useState('');
  const [unsubscribeGetFeatureByIdInDb, setUnsubscribeGetFeatureByIdInDb] = useState(null);

  //UI
  const [uiToBeDisplayed, setUiToBeDisplayed] = useState('loading');

  useEffect(() => { //get feature on load
    setGetFeatureByIdInDb(true);
    return function cleanup() {
      setUnsubscribeGetFeatureByIdInDb(true);
    };
  }, [id]);

  useEffect(() => { //listen for response from get feature
    if (getFeatureByIdResponse){
      if(getFeatureByIdResponse.response === "NOT_EXIST"){
        setUiToBeDisplayed('notExist');
      }

      else if (getFeatureByIdResponse.response === "EXISTS"){
        setFeature(getFeatureByIdResponse.feature);
        setUiToBeDisplayed('main');
      }

      else if (getFeatureByIdResponse.response === "ERROR"){
        setUiToBeDisplayed('error');
      }
    }
  }, [getFeatureByIdResponse]);

  const { getAllUsers, unsubscribeGetAllUsers} = props;
  useEffect(() => {
    getAllUsers();

    return function cleanup() {
      unsubscribeGetAllUsers()
    };
  }, []);
  const { allUsers } = props;

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

  //load UI
  if(uiToBeDisplayed === 'loading') {
    return (
        <div>
        <InfoBeforeDefaultUI message='Loading Feature...' />
          {/*Purely Functional Non-Ui components - leaving this here as an example to show how to avoid using Redux*/}
        <GetFeatureByIdDbHandler
            getFeatureByIdInDb={getFeatureByIdInDb}
            id={id}

            setGetFeatureByIdResponse={setGetFeatureByIdResponse}

            unsubscribeGetFeatureByIdInDb={unsubscribeGetFeatureByIdInDb}
        />
        </div>
    )
  }

  else if (uiToBeDisplayed === 'notExist') {
    return <InfoBeforeDefaultUI message='Feature does not exist.' />

  }

  else if (uiToBeDisplayed === 'error') {
    return <InfoBeforeDefaultUI message='An Error Occurred.' />

  }
  //load default UI
  return (
      <div>
        {/*Summary Card*/}
        <div id='test-details-section'>
          <div id="test-details-summary">
            <div id="section1">
              <span id="test-title-summary">{feature.title}</span>
              <div id="description-test">{feature.description}</div>
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

        {/**Manual Tests
         *
         **/
        }
        <div id='test-details-section' style={{boxShadow: "0 0 0 rgba(0, 0, 0, 0.0)"}}>

          <FeatureTest
              id = {id}
              feature = {feature}
              tests = {feature.manualTests}
              testType = 'manual' //todo add this to constants
              users = {allUsers}
          />
          <br/>

          <FeatureTest
              id = {id}
              feature = {feature}
              tests = {feature.postmanTests}
              testType = 'postman' //todo add this to constants
              users = {allUsers}
          />
          <br/>

          <FeatureTest
              id = {id}
              feature = {feature}
              tests = {feature.spockTests}
              testType = 'spock' //todo add this to constants
              users = {allUsers}
          />
          <br/>

          <FeatureTest
              id = {id}
              feature = {feature}
              tests = {feature.androidTests}
              testType = 'android' //todo add this to constants
              users = {allUsers}
          />
          <br/>

          <FeatureTest
              id = {id}
              feature = {feature}
              tests = {feature.performanceTests}
              testType = 'performance' //todo add this to constants
          />
          <br/>

        </div>

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
          <div id="uploaded-by">Comments</div>
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
          <CreateComment
              featureId =  {id}
          />
        </div>
        {/*---------------COMMENTS END HERE--------------------*/}
      </div>
  )
};

const mapStateToProps = (state, ownProps) => {
  return {
    //initialise state
    service: getServiceNameFromPathName(ownProps.location.pathname, 'features'),
    id: ownProps.match.params.id,

    user: state.auth.user,
    allUsers: state.auth.allUsers,
    comments: state.feature.getFeatureComments
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPrevUrl: (url) => dispatch(setPrevUrl(url)),

    //comments
    getFeatureComments: (featureId) => dispatch(getFeatureComments(featureId)),
    unsubscribeGetFeatureComments: (featureId) => dispatch(unsubscribeGetFeatureComments(featureId)),
    resetGetFeatureComments: () => dispatch(resetGetFeatureComments()),

    getAllUsers: () => dispatch(getAllUsers()),
    unsubscribeGetAllUsers: () => dispatch(getAllUsers())
  }
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(FeatureDetails);
