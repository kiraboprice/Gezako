import React, { Component } from 'react'
import { connect } from 'react-redux'
import TaskList from "./TaskList";
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

class Tasks extends Component {
  render() {

    const { tasks } = this.props;

    return (
        <div  id='tasks-section'>
          <div className="row">
            <div className="col s12 m6">
              <TaskList tasks={tasks} />
            </div>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.firestore.ordered.tasks
  }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'tasks' }
    ])
)(Tasks)
