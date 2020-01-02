import React, { Component } from 'react'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import './home.css';
import Report from "../reports/Reports";


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLength: 0,
            endpointDataLength: 0,
            featureReports: [],
            endpointReports: [],
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
                firebase.firestore().collection('spock-reports').where('reportType', '==', 'feature').limit(15).onSnapshot(snapshot =>{
                    if(snapshot.size){
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
                firebase.firestore().collection('spock-reports').where('reportType', '==', 'endpoint').limit(15).onSnapshot(snapshot =>{
                //   firebase.firestore().collection('spock-reports').limit(15).onSnapshot(snapshot =>{
                    if(snapshot.size){
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
        }
    }

    render() {
      const { auth } = this.props;
      if (!auth.uid) return <Redirect to='/login' />

      return (
            <div id='home'>

                {/* Reports  */}
                <div id='reports-section'>
                    <div id='features-reports'>
                        <h4>Features</h4>
                      <div id='headers'>
                        {/* TODO Upgrade Headers so that it is more scalable */}
                        <div id='head-start'>Title</div>
                        <div id='head-end'>Report</div>
                      </div>
                        {
                            this.state.featureReports.map((report, index) =>{
                                return(
                                    <div key={index}>
                                        <Report
                                            title = {report.data().reportTitle}
                                            report = {report.data().fileDownLoadUrl}
                                        />
                                        <hr></hr>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div id='endpoints-reports'>
                        <h4>Endpoints</h4>
                      <div id='headers'>
                        {/* TODO Upgrade Headers so that it is more scalable */}
                        <div id='head-start'>Title</div>
                        <div id='head-end'>Report</div>
                      </div>
                        {
                            this.state.endpointReports && this.state.endpointReports.map((report, index) =>{
                                return(
                                    <div key={index}>
                                        <Report
                                            title = {report.data().reportTitle}
                                            report = {report.data().fileDownLoadUrl}
                                        />
                                        <hr></hr>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
         )

    }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  }
};

export default connect(mapStateToProps)(Home)
