import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import './sidepanel.css';
import Links from './Link';

import { Link } from 'react-router-dom';

import menu from '../../assets/Icons/menu.png';
import report from '../../assets/Icons/report.png';
import dev from '../../assets/Icons/dev.png';
import perf from '../../assets/Icons/perf.png';

export default class SidePanel extends React.PureComponent{
    constructor(props){
        super(props);
        this.state ={
            spockReportsActive: window.location.pathname === '/' ? true : false,
            developmentActive: window.location.pathname === '/development' ? true : false,
          perfomanceActive: window.location.pathname === '/perfomance' ? true : false,
          showMenu: false,
          showDesktopMenu: true,
          isHoveredMobile: true,
          hovered: true
        }

        this.setSpockActive = this.setSpockActive.bind(this);
        this.setDevelopmentActive = this.setDevelopmentActive.bind(this);
        this.setPerfomanceActive = this.setPerfomanceActive.bind(this);
    }
  componentDidMount () {
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.setState({profileURL: firebase.auth().currentUser.photoURL, name: firebase.auth().currentUser.displayName})
      }
    })
    }

    setSpockActive = () =>{
      this.setState({spockReportsActive: true})
      this.setState({developmentActive: false})
      this.setState({spockReportsActive: true});
      this.setState({developmentActive: false});
      this.setState({perfomanceActive: false});
      this.setState({showMenu: false});
    }

    setDevelopmentActive = () =>{
      this.setState({spockReportsActive: false})
      this.setState({developmentActive: true})
      this.setState({spockReportsActive: false});
      this.setState({developmentActive: true});
      this.setState({perfomanceActive: false});
      this.setState({showMenu: false});
    }

    setPerfomanceActive = () => {
      this.setState({spockReportsActive: false});
      this.setState({developmentActive: false});
      this.setState({perfomanceActive: true});
      this.setState({showMenu: false});
    }

    render(){
        return(
            <React.Fragment>
              {
                firebase.auth().currentUser
                    ?
                    <React.Fragment>
                      <div id='expand-icon' onClick={() => {
                        this.state.showDesktopMenu ?
                            this.setState({showDesktopMenu: false, hovered: false}) :
                            this.setState({showDesktopMenu: true, hovered: true})}
                      }> {this.state.showDesktopMenu ? 'x' : <img id='menu_bar' src={menu} alt='menu bar' ></img>}
                      </div>
                      <div id='sidepanel' style={{width: this.state.hovered ? '21%' : '55px', transition: 'all ease-in-out 200ms'}}>

                        <div onClick={this.setSpockActive}>
                          <Link to='/'>
                            <Links
                                title = {this.state.hovered ? 'Spock Reports' : ''}
                                isHovered = {this.state.hovered}
                                icon = {report}
                                haslinks = {true}
                                links = {[['Loans', this.state.spockReportsActive], ['Rails', null], ['Users', null], ['Auth', null], ['Surveys', null]]}
                                active = {this.state.spockReportsActive}
                                whereto = {'/'}
                            />
                          </Link>
                        </div>

                        <div onClick={this.setDevelopmentActive}>
                          <Link to='/development'>
                            <Links
                                title = {this.state.hovered ? 'Development' : ''}
                                isHovered = {this.state.hovered}
                                haslinks = {true}
                                icon = {dev}
                                active = {this.state.developmentActive}
                                links = {[['Loans', this.state.developmentActive], ['Rails', null], ['Users', null], ['Auth', null], ['Surveys', null]]}
                                whereto = {'/development'}
                            />
                          </Link>
                        </div>

                        <div onClick={this.setPerfomanceActive}>
                          <Link to='/perfomance'>
                            <Links
                                title = {this.state.hovered ? 'Perfomance Tests' : ''}
                                isHovered = {this.state.hovered}
                                haslinks = {false}
                                icon = {perf}
                                active = {this.state.perfomanceActive}
                                links = {[]}
                                whereto = {'/perfomance'}
                            />
                          </Link>
                        </div>
                      </div>

                      <div id='sidepanel-mobile' style={{display: this.state.showMenu ? 'block' : 'none'}}>
                        <div onClick={this.setSpockActive}>
                          <Links
                              title = 'Spock Reports'
                              isHovered = {this.state.isHoveredMobile}
                              haslinks = {true}
                              icon = {report}
                              links = {[['Loans', this.state.spockReportsActive], ['Rails', null], ['Users', null], ['Auth', null], ['Surveys', null]]}
                              active = {this.state.spockReportsActive}
                              whereto = {'/'}
                          />
                        </div>

                        <div onClick={this.setDevelopmentActive}>
                          <Links
                              title = 'Development'
                              isHovered = {this.state.isHoveredMobile}
                              haslinks = {true}
                              icon = {dev}
                              active = {this.state.developmentActive}
                              links = {[['Loans', this.state.developmentActive], ['Rails', null], ['Users', null], ['Auth', null], ['Surveys', null]]}
                              whereto = {'/development'}
                          />
                        </div>
                        <div onClick={this.setPerfomanceActive}>
                          <Links
                              title = 'Perfomance Tests'
                              isHovered = {this.state.isHoveredMobile}
                              haslinks = {false}
                              icon = {perf}
                              active = {this.state.perfomanceActive}
                              links = {[]}
                              whereto = {'/perfomance'}
                          />
                        </div>
                      </div>

                      <div id='mobile-expand-icon' onClick={() => {
                        this.state.showMenu ?
                            this.setState({showMenu: false}) :
                            this.setState({showMenu: true})}
                      }> {this.state.showMenu ? 'x' : <img id='menu_bar' src={menu} alt='menu bar' ></img>}
                      </div>
                    </React.Fragment>: null

              }

            </React.Fragment>
        )
    }

}
