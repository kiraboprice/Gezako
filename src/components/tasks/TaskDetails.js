import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

const TaskDetails = (props) => {
  const { task } = props;
  if (task) {
    return (
        <div id='tasks-section'>
          <div className="card z-depth-0">
            <div className="card-content">
              <span className="card-title">{task.title}</span>
              <p>{task.content}</p>
            </div>
            <div className="card-action grey lighten-4 grey-text">
              <div>Posted by {task.authorFirstName} {task.authorLastName}</div>
              <div>2nd September, 2am</div>
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
    task: task
  }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{
      collection: 'tasks'
    }])
)(TaskDetails)
