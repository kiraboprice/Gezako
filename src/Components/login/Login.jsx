import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import Dashboard from '../dashboard/Dashboard';

import backgroundImage from '../../Assets/Imgs/bg.jpg';
import twitterIcon from '../../Assets/Icons/twitter.png';

import './login.css';

class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.callGoogleSignIn = this.callGoogleSignIn.bind(this);
    }

    componentDidMount () {
        firebase.auth().onAuthStateChanged(user => {
        })
    }

    // Cals the login with google firebase authentication
    callGoogleSignIn () {
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            window.location.replace('/')

        }).catch(function(error) {
            alert("An error occured, please try again")
        });
    }

    render() {

        return (
            <React.Fragment>
                {
                    firebase.auth().currentUser 

                    ? 

                    <Dashboard/> 
                    
                    :
                    <div class="login">
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
                                        Gezako Software  Quality Assurance
                                    </h1>
                                    <h2 id='small_text'>
                                        All your software QA needs in one place.
                                    </h2> 

                                    <div id='button' onClick={this.callGoogleSignIn}>
                                        LOGIN IN WITH GOOGLE
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <ul id='others'>
                            <a href='https://medium.com/@powermukisa' target='_blank' rel="noopener noreferrer">
                                <li>
                                    ABOUT US
                                </li>
                            </a>

                            <a href='https://medium.com/@powermukisa' target='_blank' rel="noopener noreferrer">
                                <li>
                                    BLOG
                                </li>
                            </a>
                        </ul>
                    </div>
                }
            </React.Fragment>
        );
    }
}

export default App;