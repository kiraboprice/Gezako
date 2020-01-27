import React, { useState } from 'react'

import './navbar.css';

import {connect} from 'react-redux'
import {signOut} from '../../store/actions/authActions'

const NavBar = (props) => {
  const { user, signOut } = props;
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

        <img src={user.photoURL} alt={user.displayName} onClick={
          () => displaySignOutButton === 'none' ? setDisplaySignOutButton('block') : setDisplaySignOutButton('none')
        }></img>

        </div>
      </div>
  )
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
            