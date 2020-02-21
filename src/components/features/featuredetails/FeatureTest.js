import React, {useEffect, useState} from 'react'
import add_test_icon from "../../../assets/Icons/plus.png";
import * as status from "../../../constants/Feature_TestStatus";
import penIcon from "../../../assets/Icons/pen.png";
import {getAllUsers, setPrevUrl} from "../../../store/actions/authActions";
import {
  getFeatureComments, resetGetFeatureComments,
  unsubscribeGetFeatureComments
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

const FeatureTest = (props) => {

  const [testsHidden, setTestsHidden] = useState("block");

  useEffect(() => {

  }, [props]);

  const handleChange = (e) => {
    const value = e.target.value;
    console.log('handleChange: ', value);
    switch (e.target.name) {
      case 'title':
        // setTitle(value);
        break;
      case 'phase':
        // setPhase(value);
        break;
      case 'service':
        // setService(value);
        break;

      case 'type':
        // setType(value);
        break;

      case 'numberOfTests':
        // setNumberOfTests(value);
        break;

      default:
        break;
    }

  };

  const [assignedTo, setAssignedTo] = useState(null);
  const handleAssignedToChange = (e) => {
    const sel = document.getElementsByName('assignedTo')[0];
    const opt = sel.options[sel.selectedIndex];
    const value = e.target.value;
    setAssignedTo({'id': value, 'displayName': opt.text});
  };

  //Update feature tests
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [testTypeToAdd, setTestTypeToAdd] = useState();
  const [addFeatureTestResponse, setAddFeatureTestResponse] = useState();
  const handleAddTestClicked = () => {
    setShowAddDialog(true);
    setTestTypeToAdd(props.testType);
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

  return(
      <div>
        <h3>{props.testType} Tests</h3>

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

        <div id = 'feature-test-status'>
          <label>Status: </label>
          <select name='status' value={status} onChange={handleChange}>
            <option value={status.NO_TESTS_ADDED_VALUE}>{status.NO_TESTS_ADDED_NAME}</option>
            <option value={status.ADDING_TESTS_VALUE}>{status.ADDING_TESTS_NAME}</option>
            <option value={status.DONE_VALUE}>{status.DONE_NAME}</option>
            <option value={status.NA_VALUE}>{status.NA_NAME}</option>
          </select>
        </div>

        <div id='feature-test-assigned-to'>
          <label>Assigned To: </label>
          <select name='assignedTo' onChange={handleAssignedToChange}>
            <option value=''></option>
            {props.allUsers && props.allUsers.map(user => <option value={user.id}>{user.displayName}</option>)}
          </select>
        </div>

        <button id="test-button-summary" style={{
          background: "#f0f0f0"
        }}>Update
        </button>

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
    allUsers: state.auth.allUsers,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    //alerts
    showSuccessAlert: (message) => dispatch(showSuccessAlert(message)),
    showErrorAlert: (message) => dispatch(showErrorAlert(message))
  }
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(FeatureTest);
