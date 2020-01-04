import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createTask } from '../../store/actions/taskActions'

import './tasks.css';

class CreateTask extends Component { //todo authenticate this page
  state = {
    title: '',
    content: ''
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createTask(this.state);
    this.props.history.push('/tasks');
  };
  render() {
    return (
      <div id='tasks-section'>
        <form onSubmit={this.handleSubmit}>
          <h5 >Create a New Task</h5>
          <div >
            <input type="text" name='title' onChange={this.handleChange} />
            <label htmlFor="title">Task Title</label>
          </div>
          <div >
            <input type="text" name='content' onChange={this.handleChange} />
            <label htmlFor="content">Task Content</label>
          </div>
          <div >
            <button >Create</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createTask: (task) => dispatch(createTask(task))
  }
};

export default connect(null, mapDispatchToProps)(CreateTask)
