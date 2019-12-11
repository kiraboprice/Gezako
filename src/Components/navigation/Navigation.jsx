import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import './navigation.css';

export default class Navigation extends React.PureComponent {
    state = {
        display: 'block'
    }

    componentDidMount () {
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.setState({profileURL: firebase.auth().currentUser.photoURL, name: firebase.auth().currentUser.displayName})
            }
        })
    }
    
    render() {
        return (
            <div id='navigation-top'>
                    <div id='navigation-logo'>
                        Gezako
                    </div>
                    <div id='signout' style={{display: this.state.display}} onClick={ () => {
                        // Logs out the user
                        firebase.auth().signOut().then(function() {
                            console.log("Signed out succesfully!")
                            window.location.replace('/')
                        }).catch(function(error) {
                            console.log("An error happened.")
                        })
                    }}>
                        sign out
                    </div>
                    <div id='profile-picture'>
                        <img src={this.state.profileURL} alt={this.state.name} onClick={
                            () => this.state.display === 'block' ? this.setState({display: 'none'}) : this.setState({display: 'block'})
                        }></img>
                    </div>
            </div>
        )
    }
}
            