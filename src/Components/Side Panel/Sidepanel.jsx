import React from 'react';
import './sidepanel.css';
import Links from './Link';

export default class SidePanel  extends React.PureComponent{
    constructor(props){
        super(props);
        this.state ={
            spockReportsActive: window.location.pathname === '/' ? true : false,
            developmentActive: window.location.pathname === '/developments' ? true : false,
            showMenu: false
        }

        this.setSpockActive = this.setSpockActive.bind(this);
        this.setDevelopmentActive = this.setDevelopmentActive.bind(this);
    }

    setSpockActive = () =>{
        this.setState({spockReportsActive: true})
        this.setState({developmentActive: false})
    }

    setDevelopmentActive = () =>{
        this.setState({spockReportsActive: false})
        this.setState({developmentActive: true})
    }

    render(){
        return(
            <React.Fragment>
                <div id='sidepanel'>
                    <div onClick={this.setSpockActive}>
                        <Links
                            title = 'Spock Reports'
                            haslinks = {true}
                            links ={['Loans', 'Rails', 'Users', 'Auth', 'Surveys']}
                            active = {this.state.spockReportsActive}
                            whereto = {'/'}
                        />
                    </div>
                
                

                    <div onClick={this.setDevelopmentActive}>
                        <Links
                            title = 'Developments'
                            haslinks = {false}
                            active = {this.state.developmentActive}
                            links ={[]}
                            whereto = {'/developments'}
                        />
                    </div>
                </div>

                <div id='sidepanel-mobile' style={{display: this.state.showMenu ? 'block' : 'none'}}>
                    <div onClick={this.setSpockActive}>
                        <Links
                            title = 'Spock Reports'
                            haslinks = {true}
                            links ={['Loans', 'Rails', 'Users', 'Auth', 'Surveys']}
                            active = {this.state.spockReportsActive}
                            whereto = {'/'}
                        />
                    </div>
                
                

                    <div onClick={this.setDevelopmentActive}>
                        <Links
                            title = 'Developments'
                            haslinks = {false}
                            active = {this.state.developmentActive}
                            links ={[]}
                            whereto = {'/developments'}
                        />
                    </div>
                </div>

                <div id='mobile-expand-icon' onClick={() => {
                    this.state.showMenu ? 
                    this.setState({showMenu: false}) : 
                    this.setState({showMenu: true})}
                }> {this.state.showMenu ? 'x' : '='}</div>
            </React.Fragment>
        )
    }
    
}