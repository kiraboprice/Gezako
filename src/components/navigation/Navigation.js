import React, { useState } from 'react'

import './navigation.css';

import {connect} from 'react-redux'
import {signOut} from '../../store/actions/authActions'

const Navigation = (props) => {
  const { profile, signOut } = props;
  const [displaySignOutButton, setDisplaySignOutButton] = useState('none');

  return (
      <div id='navigation-top'>
        <div id='navigation-logo'>
          Gezako
        </div>
        <div id='signout' style={{display: displaySignOutButton}} onClick={signOut}>
          Sign out
        </div>
        <div id='profile-picture'>

        <img src={profile.photoURL} alt={profile.displayName} onClick={
          () => displaySignOutButton === 'none' ? setDisplaySignOutButton('block') : setDisplaySignOutButton('none')
        }></img>

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
            