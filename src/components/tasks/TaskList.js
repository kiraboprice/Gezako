import React from 'react'
import TaskSummary from "./TaskSummary";
import { Link } from 'react-router-dom'

const TaskList = ({tasks}) => {
  return (
    <div className="project-list section">
      { tasks && tasks.map(task => {
        return (
            <Link to={'/task/' + task.id} key={task.id}>
              <TaskSummary task={task} />
            </Link>
        )
      })}  
    </div>
  )
}

export default TaskList
