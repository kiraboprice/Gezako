import React, { Component } from 'react'
import { connect } from 'react-redux'
import TaskList from "./TaskList";

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
    tasks: state.task.tasks
  }
}

export default connect(mapStateToProps)(Tasks)
