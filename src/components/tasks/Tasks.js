import React, { Component } from 'react'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import './tasks.css';

import Report from "../reports/Reports";

export default class Development extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
                <div id='tasks-section'>
                    Tasks!
                </div>

        )
    }

}
