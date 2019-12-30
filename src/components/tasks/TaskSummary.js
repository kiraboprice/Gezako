import React from 'react'

const TaskSummary = ({task}) => {
  return (
    <div >
      <div >
        <span >{task.title}</span>
        <p>{task.content}</p>
      </div>
    </div>
  )
}

export default TaskSummary
