import React, { Component } from 'react'
import { connect } from 'react-redux'
import TaskList from "./TaskList";
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import {BASE_DOCUMENT} from "../../constants/Constants";

const Tasks = (props) => {
    const { auth, tasks } = props;
    if (!auth.uid) return <Redirect to='/login' />;

    return (
        <div  id='tasks-section'>
          <div className="row">
            <div className="col s12 m6">
              <TaskList tasks={tasks} />
            </div>
          </div>
        </div>
    )
  };

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    tasks: state.firestore.ordered.tasks
  }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: BASE_DOCUMENT + 'tasks' }
    ])
)(Tasks)
