import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Report from '../reports/Reports';
import SidePanel from '../sidepanel/Sidepanel';
import Navigation from '../navigation/Navigation';

export default class Development extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            profileURL: null,
            dataLength: 0,
            developmentReports: [], // Messages passed here
            hasMessages: false, // Checks if the user has messages
            display: 'block'
        }
    }
    componentDidMount () {
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.setState({user: true})
            }
        })

        try{

            // Getting endpoint reports (Also include time stamps when uploading reports so that we can order them by date)
            firebase.firestore().collection('reports').limit(15).onSnapshot(snapshot =>{
                if(snapshot.size){
                    this.setState({hasEndpointMessages: true})
                    this.setState({developmentReports: snapshot.docs})
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
                
        
        catch(e){
            console.log(e)
        }
    }

    render(){
        return(
            <React.Fragment>
                <Navigation/>
                <SidePanel/>
                <div id='reports-section'>
                    {/* Reports  */}
                    <div id='features-reports'>
                        <h4>Development</h4>
                        <div id='headers'>
                            {/* TODO Upgrade Headers so that it is more scalable */}
                            <div id='head-start' className='service'>Service</div>
                            <div id='head'>Title</div>
                            <div id='head-end'>Report</div>
                        </div>
                        {
                            this.state.developmentReports ? this.state.developmentReports.map(report =>{
                                return(
                                    <React.Fragment>
                                        <Report 
                                            service = {report.data().service}
                                            title = {report.data().feature}
                                            report = {report.data().fileDownLoadUrl}
                                        />
                                        <hr></hr>
                                    </React.Fragment>
                                )
                            }) : 'No reports check back later'
                        }
                    </div>
                </div>
            </React.Fragment>
            
        )
    }

}
