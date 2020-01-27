import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import moment from 'moment'
import { Redirect } from 'react-router-dom'

const TaskDetails = (props) => {
  const { user, task } = props;
  if (!user.uid) return <Redirect to='/login' />;

  if (task) {
    return (
        <div id='tasks-section'>
          <div >
            <div >
              <span >{task.title}</span>
              <p>{task.content}</p>
            </div>
            <div >
              <div>Posted by {task.createdBy}</div>
              <div>{moment(task.createdAt.toDate()).calendar()}</div>
            </div>
          </div>
        </div>
    )
  } else {
    return (
        <div id='tasks-section'>
          <p>Loading task...</p>
        </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const tasks = state.firestore.data.tasks;
  const task = tasks ? tasks[id] : null;
  return {
    user: state.auth.user,
    task: task
  }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      {
        collection: 'company',
        doc: 'tala',
        subcollections: [{ collection: 'tasks' }],
        storeAs: 'tasks'
      }
    ])
)(TaskDetails)
