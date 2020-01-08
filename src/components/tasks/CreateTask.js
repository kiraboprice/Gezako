import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createTask } from '../../store/actions/taskActions'
import { Redirect } from 'react-router-dom'

import './tasks.css';

class CreateTask extends Component {
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
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/login' />;
    return (
      <div id='tasks-section'>
        <form onSubmit={this.handleSubmit}>
          <h3 >Create a New Task</h3>
          <div id="display-content" style={{marginTop: "25px"}}>
            <label htmlFor="title">Task Title</label>
            <input type="text" name='title' onChange={this.handleChange} />
          </div>
          <div id="display-content">
            <label htmlFor="content">Task Content</label>
            <input type="text" name='content' onChange={this.handleChange} />
          </div>
          <div >
            <button >Create</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    createTask: (task) => dispatch(createTask(task))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask)
