import React, { Component } from 'react'
import firebase from 'firebase/app';
import 'firebase/auth';

import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'

import Home from '../home/Home';

import backgroundImage from '../../assets/Imgs/bg.jpg';
import twitterIcon from '../../assets/Icons/twitter.png';

import './login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
    }

    componentDidMount () {
        firebase.auth().onAuthStateChanged(user => {
        })
    }

    signIn () {
        //todo show loading icon here
      this.props.signIn()
    }

    render() {
      const { authError } = this.props;
      const { authSuccess } = this.props;
      //todo
      //if auth Success, check to see if email is a tala email or test email
      //if so, add user to db if they havent already been added
      //after adding user to db, update the state to "userAuthenticated" and send to redux auth store
      //the <Home/> component should use that prop to check whether it should be displayed
      //if that prop is not set, do nothing I guess

        return (
            <React.Fragment>
                {
                    // firebase.auth().currentUser //todo use the firebase auth prop here!
                  firebase.auth().currentUser
                    ?

                    <Home/>

                    :
                    <div className="login">
                        <img id='back_image' src={backgroundImage} alt='background cover'></img>
                        <div id='cover'></div>
                        <div id='full-opaque-cover'>
                            <div id='information'>
                                <div id='logo'>
                                    Gezako
                                </div>
                                <div id='twitter'>
                                    <a href='https://twitter.com/gezakoQa' target='_blank' rel="noopener noreferrer">
                                        <img src={twitterIcon} alt='Our twitter page'></img>
                                    </a>
                                </div>
                                <div id='description'>
                                    <h1 id='big_text'>
                                        Gezako Software <br></br> Quality Assurance
                                    </h1>
                                    <h2 id='small_text'>
                                        All your software QA needs in one place.
                                    </h2>

                                    <div id='button' onClick={this.signIn}>
                                        LOGIN IN WITH GOOGLE
                                    </div>
                                  <div id='small_text' className="errorText">
                                      {/*TODO dismiss loading icon once error is shown*/}
                                    { authError ? <p>{authError}</p> : null }
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
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
  return{
    authSuccess: state.auth.authSuccess, //if auth is successful, store user details in db
    authError: state.auth.authError, //if auth not successful, show error
    // auth: state.firebase.auth.sth //use this to know wether the user is logged in
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: () => dispatch(signIn())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
