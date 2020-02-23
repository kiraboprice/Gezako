import React, {useEffect, useState} from 'react'
import add_test_icon from "../../../assets/Icons/plus.png";
import * as ts from "../../../constants/Feature_TestStatus";
import penIcon from "../../../assets/Icons/pen.png";
import {getAllUsers, setPrevUrl} from "../../../store/actions/authActions";
import {
  getFeatureComments, resetGetFeatureComments,
  unsubscribeGetFeatureComments, updateFeature
} from "../../../store/actions/featureActions";
import {
  showErrorAlert,
  showSuccessAlert
} from "../../../store/actions/snackbarActions";
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import AddFeatureTestDialog from "./AddFeatureTestDialog";
import UpdateFeatureTestDialog from "./UpdateFeatureTestDialog";
import FeatureTestRow from "./FeatureTestRow";
import {getServiceNameFromPathName} from "../../../util/StringUtil";
import * as firebase from "firebase";
import InfoBeforeDefaultUI from "../../maincontent/Feature";

const FeatureTest = (props) => {

  const [testsHidden, setTestsHidden] = useState("block");
  const [status, setStatus] = useState('');
  const [assignedTo, setAssignedTo] = useState(null);

  const [feature, setFeature] = useState(null); //use for updating the test metadata

  useEffect(() => {
    setFeature(props.feature);
  }, [props]);

  //once feature is set from props. set UI here
  const [uiToBeDisplayed, setUiToBeDisplayed] = useState('loading');
  useEffect(() => {
    if (feature) {
      switch (props.testType) {
        case 'manual': //todo add this to constants
          setStatus(feature.manualTestsMetadata? feature.manualTestsMetadata.status: ts.NO_TESTS_ADDED_VALUE); //default to no tests added
          setAssignedTo(feature.manualTestsMetadata? feature.manualTestsMetadata.assignedTo: null);
          break;

        case 'postman': //todo add this to constants
          setStatus(feature.postmanTestsMetadata? feature.postmanTestsMetadata.status: ts.NO_TESTS_ADDED_VALUE);
          setAssignedTo(feature.postmanTestsMetadata? feature.postmanTestsMetadata.assignedTo: null);
          break;

        case 'spock': //todo add this to constants
          setStatus(feature.spockTestsMetadata? feature.spockTestsMetadata.status: ts.NO_TESTS_ADDED_VALUE);
          setAssignedTo(feature.spockTestsMetadata? feature.spockTestsMetadata.assignedTo: null);
          break;

        case 'android': //todo add this to constants
          setStatus(feature.androidTestsMetadata? feature.androidTestsMetadata.status: ts.NO_TESTS_ADDED_VALUE);
          setAssignedTo(feature.androidTestsMetadata? feature.androidTestsMetadata.assignedTo: null);
          break;

        case 'performance': //todo add this to constants
          setStatus(feature.performanceTestsMetadata? feature.performanceTestsMetadata.status: ts.NO_TESTS_ADDED_VALUE);
          setAssignedTo(feature.performanceTestsMetadata? feature.performanceTestsMetadata.assignedTo: null);
          break;
        default:
          break;
      }

      //setup ui
      setUiToBeDisplayed('main');
    }
  }, [feature]);

  console.log("assignedTo---", assignedTo);
  const handleChange = (e) => {
    const value = e.target.value;
    // console.log('handleChange: ', value);
    switch (e.target.name) {
      case 'status':
        setStatus(value);
        break;
      default:
        break;
    }

  };

  const handleAssignedToChange = (e) => {
    const sel = document.getElementsByName('assignedTo')[0];
    const opt = sel.options[sel.selectedIndex];
    const value = e.target.value;
    setAssignedTo({'id': value, 'displayName': opt.text});
  };

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [testTypeToAdd, setTestTypeToAdd] = useState();
  const [addFeatureTestResponse, setAddFeatureTestResponse] = useState();
  const handleAddTestClicked = () => {
    setShowAddDialog(true);
    setTestTypeToAdd(props.testType);
  };

  const { updateFeature } = props;
  const { user } = props;
  const handleOnClickUpdateTestMetadata = () => {

    const metadata = {
      assignedTo: assignedTo,
      status: status,
      updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
      updatedBy: {'id': user.uid, 'displayName': user.displayName} //todo Rich or Derek in all places where we set the updateBy value, set this as the new format/standard:  only one feild with a json array
    };

    switch (props.testType) {
      case 'manual': //todo add  to constants
        feature.manualTestsMetadata = metadata;
        updateFeature(props.id, feature);
        break;

      case 'postman': //todo add  to constants
          console.log("metadata----", metadata);
        feature.postmanTestsMetadata = metadata;
        updateFeature(props.id, feature);
        break;

      case 'spock': //todo add  to constants
        feature.spockTestsMetadata = metadata;
        updateFeature(props.id, feature);
        break;

      case 'android': //todo add  to constants
        feature.androidTestsMetadata = metadata;
        updateFeature(props.id, feature);
        break;

      case 'performance': //todo add  to constants
        feature.performanceTestsMetadata = metadata;
        updateFeature(props.id, feature);
        break;

      default:
        break;
    }
    
  };

  const getStatusLineColor = () => {
    switch (status) {
      case ts.NO_TESTS_ADDED_VALUE:
        return 'grey';
      case ts.ADDING_TESTS_VALUE:
        return 'maroon';
      case ts.DONE_VALUE:
        return 'darkgreen';
      case ts.NA_VALUE:
        return 'darkgrey';
      default:
        break;
    }
  };

  /**
   * Add feature test
   * */
  const {showSuccessAlert, showErrorAlert} = props;
  useEffect(() => { //todo check why this isnt working
    if (addFeatureTestResponse){
      if(addFeatureTestResponse.response === "SUCCESS"){
        showSuccessAlert('Successfully created test');
      }

      else if (addFeatureTestResponse.response === "ERROR"){
        showErrorAlert('Failed to create test');
      }
    }
  }, [addFeatureTestResponse]);

  /**
   * Update feature test
   * */
  const [onClickUpdateFeatureTest, setOnClickUpdateFeatureTest] = useState(null);
  const [testToUpdate, setTestToUpdate] = useState(null);
  const [testToUpdateIndex, setTestToUpdateIndex] = useState(null);
  const [showUpdateFeatureTestDialog, setShowUpdateFeatureTestDialog] = useState(false);
  useEffect(() => {
    // console.log('onClickUpdateFeatureTest----', onClickUpdateFeatureTest);
    if (onClickUpdateFeatureTest){
      setTestToUpdate(onClickUpdateFeatureTest.test); //todo get test to update from feature array?
      setTestToUpdateIndex(onClickUpdateFeatureTest.index);
      setShowUpdateFeatureTestDialog(true)
    }
  }, [onClickUpdateFeatureTest]);

  const [updateFeatureTestResponse, setUpdateFeatureTestResponse] = useState(false);

  //load UI
  if(uiToBeDisplayed === 'loading') {
    return (
        <div>
          <InfoBeforeDefaultUI message='Loading...' />
        </div>
    )
  }

  return(
      <div>
        <span><h3>{props.testType} tests</h3></span>

        <button
            id="hide_button"
            onClick={() =>  testsHidden === "block" ? setTestsHidden("none") : setTestsHidden("block")}>
          {testsHidden === "block" ? "hide" : "show"}
        </button>

        <button
            id="add_test_button"
            onClick={() => handleAddTestClicked()}>
          <img src={add_test_icon} alt="add test" />
        </button>

        <span id ="feature-test-status">
            <label>Status: </label>
          <select name='status' value={status} onChange={handleChange}>
            <option value={ts.NO_TESTS_ADDED_VALUE}>{ts.NO_TESTS_ADDED_NAME}</option>
            <option value={ts.ADDING_TESTS_VALUE}>{ts.ADDING_TESTS_NAME}</option>
            <option value={ts.DONE_VALUE}>{ts.DONE_NAME}</option>
            <option value={ts.NA_VALUE}>{ts.NA_NAME}</option>
          </select>
        </span>

        <span id='feature-test-assigned-to'>
          <label>Assigned To: </label>
          <select name='assignedTo' onChange={handleAssignedToChange}>
            <option value={assignedTo? assignedTo.id : null}>{assignedTo? assignedTo.displayName : null}</option>
            {props.users && props.users.map(user => <option value={user.id}>{user.displayName}</option>)}
          </select>
        </span>

        <button id="test-button-summary"
                style={{background: "#f0f0f0"}}
                onClick={()=>handleOnClickUpdateTestMetadata()} >
          Update
        </button>

         <div id="status-line" style={{background: getStatusLineColor(status)}}></div>

        <div style={{display: testsHidden === "block" ? "block" : "none", transition: "all ease-in-out 400ms"}}>
          {props.tests? //todo this will not be needed for feature Features as they'll have empty arrays set for tests (like empty array of manualTests) when a feature is first created
              <div style={{
                display: props.tests.length === 0 ? "none" : "block",
                transition: "all ease-in-out 400ms"
              }}>
                <div id='headers'>
                  <div id='service'>Title</div>
                  <div id='title'>Updated At</div>
                  <div id='title'>Created By</div>
                </div>
              </div>
              :
              null
          }
          { props.tests && props.tests.map((test, index) => {
            return (
                <div>
                  <a href={test.link} target='_blank'
                     rel="noopener noreferrer">
                    <FeatureTestRow
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

        <AddFeatureTestDialog
            id = {props.id}
            showAddDialog = {showAddDialog}
            testTypeToAdd = {testTypeToAdd}
            feature = {props.feature}
            setShowAddDialog = {setShowAddDialog}

            setAddFeatureTestResponse = {setAddFeatureTestResponse}
        />

        <UpdateFeatureTestDialog
            id = {props.id}
            testToUpdate={testToUpdate}
            testToUpdateIndex={testToUpdateIndex}
            feature={props.feature}
            showUpdateFeatureTestDialog={showUpdateFeatureTestDialog}
            setShowUpdateFeatureTestDialog={setShowUpdateFeatureTestDialog}

            setUpdateFeatureTestResponse={setUpdateFeatureTestResponse}
        />

        </div>
    )
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.auth.user,
    updateFeatureResult: state.feature.updateFeatureResult
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    //alerts
    showSuccessAlert: (message) => dispatch(showSuccessAlert(message)),
    showErrorAlert: (message) => dispatch(showErrorAlert(message)),

    updateFeature: (id, feature) => dispatch(updateFeature(id, feature)),
  }
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(FeatureTest);
