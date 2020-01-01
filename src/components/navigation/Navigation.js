import React from 'react'

import './navigation.css';

import {connect} from 'react-redux'
import {signOut} from '../../store/actions/authActions'

const Navigation = (props) => {

  return (
          <div id='navigation-top'>
            <div id='navigation-logo'>
              Gezako
            </div>
            <div id='signout' onClick={props.signOut}>
              Sign out
            </div>
            <div id='profile-picture'>
              <img src={props.profile.photoURL}
                   alt={props.profile.displayName}></img>
              {/*TODO onClick={showSignDropDown}></img>*/}

            </div>
          </div>
  )
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
            