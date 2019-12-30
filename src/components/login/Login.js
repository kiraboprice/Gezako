import React, { Component } from 'react'
import firebase from 'firebase/app';
import 'firebase/auth';

import Home from '../home/Home';

import backgroundImage from '../../assets/Imgs/bg.jpg';
import twitterIcon from '../../assets/Icons/twitter.png';

import './login.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.signInWithGoogle = this.signInWithGoogle.bind(this);
    }

    componentDidMount () {
        firebase.auth().onAuthStateChanged(user => {
        })
    }

    signInWithGoogle () {
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider).then(function(result) {
            window.location.replace('/')
          //todo store result in db here!

        }).catch(function(err) {
          console.log("An error occurred while logging in", err)
          alert("An error occurred while logging you in. please try again")
        });
    }

    render() {

        return (
            <React.Fragment>
                {
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

                                    <div id='button' onClick={this.signInWithGoogle}>
                                        LOGIN IN WITH GOOGLE
                                    </div>
                                </div>
                            </div>
                        </div>

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

export default App;
