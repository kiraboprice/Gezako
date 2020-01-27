import React from 'react'
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom'
import {compose} from "redux";

const PerformanceTests = (props) => {
  const {user} = props;
  if (!user.uid) {return <Redirect to='/login'/>}


  return (
      <div id='home'>
        <div id='reports-section'>
          COMING SOON!
        </div>
      </div>
  )

};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  }
};

export default compose(connect(mapStateToProps))(PerformanceTests)
