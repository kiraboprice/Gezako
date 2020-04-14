import React, { useState } from 'react';

import './navbar.css';

import {connect} from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {signOut} from "../../store/actions/authActions";

const NavBar = (props) => {
  const { user } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const { signOut } = props;

  const handleOnClickProfilePhoto = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnClickLogout = () =>{
    signOut()
  };

  return (
      <div id='navigation-top'>
        <div id='navigation-logo'>
          Gezako
        </div>
        <div id='profile-picture'>

          <img src={user.photoURL} alt={user.displayName}
               aria-controls="simple-menu" aria-haspopup="true"
               position="relative"
               onClick={handleOnClickProfilePhoto}
          ></img>

          <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              style={{marginTop: "55px"}}
          >

            <MenuItem>{user.displayName}</MenuItem>
            <MenuItem onClick={() => handleOnClickLogout()}>Log out</MenuItem>

          </Menu>
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
            