import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Report from '../reports/Reports';
import SidePanel from '../sidepanel/SidePanel';
import Navigation from '../navigation/Navigation';

import './home.css';

export default class Home extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dataLength: 0,
            endpointDataLength: 0,
            featureReports: [], // Messages passed here
            endpointReports: [],
            hasEndpointMessages: false,
            hasMessages: false, // Checks if the user has messages
            display: 'block'
        }
    }

    componentDidMount () {
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.setState({profileURL: firebase.auth().currentUser.photoURL})
            }
        })

        try{
            if(firebase.auth().currentUser){

                // Getting feature reports (Also include time stamps when uploading reports so that we can order them by date)
                firebase.firestore().collection('spock-reports').where('reportType', '==', 'feature').limit(10).onSnapshot(snapshot =>{
                    if(snapshot.size){
                        this.setState({hasMessages: true})
                        this.setState({featureReports: snapshot.docs})
                        this.setState({dataLength: snapshot.size})
                        this.setState({last: snapshot.docs[snapshot.docs.length-1]})
                        if(snapshot.size === 10){
                            this.setState({showMore: true})
                        }
                        else{
                            this.setState({showMore: false})
                        }
                    }
                    else{
                        this.setState({showMore: false})
                    }
                    }, err => {
                        console.log(`Encountered error: ${err}`);
                })

                // Getting endpoint reports (Also include time stamps when uploading reports so that we can order them by date)
                firebase.firestore().collection('spock-reports').where('reportType', '==', 'endpoint').limit(10).onSnapshot(snapshot =>{
                    if(snapshot.size){
                        this.setState({hasEndpointMessages: true})
                        this.setState({endpointReports: snapshot.docs})
                        this.setState({endpointDataLength: snapshot.size})
                        this.setState({endpointLast: snapshot.docs[snapshot.docs.length-1]})
                        if(snapshot.size === 10){
                            this.setState({showMore: true})
                        }
                        else{
                            this.setState({showMore: false})
                        }
                    }
                    else{
                        this.setState({showMore: false})
                    }
                    }, err => {
                        console.log(`Encountered error: ${err}`);
                    })
                }

            else{
                throw new Error("User Not logged in")
            }      
                
        }
        
        catch(e){
            console.log(e)
            window.location.replace('/')
        }
    }

    render() {

        return (
            <div id='home'>
                <Navigation/>

                {/* Side Panel  */}
                <SidePanel/>

                {/* Reports  */}
                <div id='reports-section'>
                    <div id='features-reports'>
                        <h4>Features</h4>
                        {
                            this.state.featureReports ? this.state.featureReports.map((report, index) =>{
                                return(
                                    <div key={index}>
                                        <Report 
                                            title = {report.data().reportTitle}
                                            report = {report.data().fileDownLoadUrl}
                                        />
                                        <hr></hr>
                                    </div>
                                )
                            }) : 'No reports check back later'
                        }
                    </div>
                    <div id='endpoints-reports'>
                        <h4>Endpoints</h4>
                        {
                            this.state.endpointReports ? this.state.endpointReports.map((report, index) =>{
                                return(
                                    <div key={index}>
                                        <Report 
                                            title = {report.data().reportTitle}
                                            report = {report.data().fileDownLoadUrl}
                                        />
                                        <hr></hr>
                                    </div>
                                )
                            }) : 'No reports check back later'
                        }
                    </div>
                </div>
            </div>
         )

    }
}