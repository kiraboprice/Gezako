import React, {useState ,useEffect} from 'react'

import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

import {signIn, setPrevUrl } from '../../store/actions/authActions'

import backgroundImage from '../../assets/Imgs/bg.jpg';
import twitterIcon from '../../assets/Icons/twitter.png';

import './login.css';

const Login =(props)=> {
  const { setPrevUrl, signIn } = props; 
  const { user, userAuthError, prevUrl } = props;
  // useEffect(() =>{
  //
  // },[user]);

  if(user!== null) {
    if(prevUrl!== null) {
      setPrevUrl(null);
      return <Redirect to= {prevUrl} />
    } else {
      return <Redirect to='/' />
    }
  }

return (
        <div className="login">
          <img id='back_image' src={backgroundImage} alt='background cover'></img>
          <div id='cover'></div>
          <div id='full-opaque-cover'>
            <div id='information'>
              <div id='logo'>
                Gezako
              </div>
              <div id='twitter'>
                <a href='https://twitter.com/gezakoQa' target='_blank'
                   rel="noopener noreferrer">
                  <img src={twitterIcon} alt='Our twitter page'></img>
                </a>
              </div>
              <div id='description'>
                <h1 id='big_text'>
                  Gezako
                </h1>
                <h2 id='small_text'>
                  Organising the Software Testing & QA Process.
                </h2>
                <div id='button' onClick={signIn}>
                  LOGIN IN WITH GOOGLE
                </div>
                <div id='errorText' className="errorText">
                  {/*TODO dismiss loading icon once error is shown*/}
                  {userAuthError ? <p>{userAuthError}</p> : null}
                </div>
              </div>
            </div>
          </div>

          {/*TODO move the stuff below to a footer component*/}
          <ul id='others'>
            <div id='others-contain'>
              <a href='https://medium.com/@powermukisa'
                 target='_blank' rel="noopener noreferrer">
                <li>
                  ABOUT US
                </li>
              </a>

              <a href='https://medium.com/@powermukisa'
                 target='_blank' rel="noopener noreferrer">
                <li>
                  BLOG
                </li>
              </a>
            </div>
          </ul>
        </div>
    );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user, //if auth is successful, store user details in db
    userAuthError: state.auth.userAuthError, //if auth not successful, show error
    prevUrl: state.auth.prevUrl
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: () => dispatch(signIn()),
    setPrevUrl: (url) => dispatch(setPrevUrl(url))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
