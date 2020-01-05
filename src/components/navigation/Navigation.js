import React from 'react'

import './navigation.css';

import {connect} from 'react-redux'
import {signOut} from '../../store/actions/authActions'

const Navigation = (props) => {
  const { profile, signOut } = props;

  return (
      <div id='navigation-top'>
        <div id='navigation-logo'>
          Gezako
        </div>
        <div id='signout' onClick={signOut}>
          Sign out
        </div>
        <div id='profile-picture'>
          <img src={profile.photoURL}
               alt={profile.displayName}></img>
          {/*TODO onClick={showSignDropDown}></img>*/}

        </div>
      </div>
  )
};

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
            