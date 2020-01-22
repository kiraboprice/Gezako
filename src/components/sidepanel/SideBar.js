import React, {Component} from 'react'
import './sidepanel.css';
import Links from './Links';

import {Link} from 'react-router-dom';

import menu from '../../assets/Icons/menu.png';
import report from '../../assets/Icons/report.png';
import dev from '../../assets/Icons/dev.png';
import perf from '../../assets/Icons/perf.png';
import task from '../../assets/Icons/task.png';

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstActive: window.location.pathname.includes('completed') || window.location.pathname ===('/'),
      secondActive: window.location.pathname.includes('development'),
      thirdActive: window.location.pathname === '/performance',
      fourthActive: window.location.pathname === '/tasks',
      showCollapsedMenu: true,
      expanded: true,

      showMenuMobile: false,
      isExpandedMobile: true
    };

    this.setFirstActive = this.setFirstActive.bind(this);
    this.setSecondActive = this.setSecondActive.bind(this);
    this.setThirdActive = this.setThirdActive.bind(this);
    this.setFourthActive = this.setFourthActive.bind(this);
  }

  setFirstActive = () => {
    this.setState({firstActive: true});
    this.setState({secondActive: false});
    this.setState({thirdActive: false});
    this.setState({fourthActive: false});
    this.setState({showMenuMobile: false});
  };

  setSecondActive = () => {
    this.setState({firstActive: false});
    this.setState({secondActive: true});
    this.setState({thirdActive: false});
    this.setState({fourthActive: false});
    this.setState({showMenuMobile: false});
  };

  setThirdActive = () => {
    this.setState({firstActive: false});
    this.setState({secondActive: false});
    this.setState({thirdActive: true});
    this.setState({fourthActive: false});
    this.setState({showMenuMobile: false});
  };

  setFourthActive = () => {
    this.setState({firstActive: false});
    this.setState({secondActive: false});
    this.setState({thirdActive: false});
    this.setState({fourthActive: true});
    this.setState({showMenuMobile: false});
  };

  render() {
    return (
        <React.Fragment>
          {
            <React.Fragment>
              <div id='expand-icon' onClick={() => {
                this.state.showCollapsedMenu ?
                    this.setState({showCollapsedMenu: false, expanded: false}) :
                    this.setState({showCollapsedMenu: true, expanded: true})
              }
              }> {this.state.showCollapsedMenu ? 'x' : <img id='menu_bar' src={menu} alt='menu bar'></img>}
              </div>
              <div id='sidepanel' style={{
                width: this.state.expanded ? '21%' : '55px',
                transition: 'all ease-in-out 200ms'
              }}>

                <div onClick={this.setFirstActive}>
                  <Links
                      title={this.state.expanded ? 'Completed Spock Tests'
                          : ''}
                      isExpanded={this.state.expanded}
                      haslinks={true}
                      icon={dev}
                      active={this.state.firstActive}
                      links={[
                        [ "Surveys", '/completed/surveys'],
                        [ "Rules", '/completed/rules'],
                        ["Loans", '/completed/loans'],
                        [ "Users", '/completed/users'],
                        [ "Auth", '/completed/auth'],
                        [ "Rails", '/completed/rails'],
                        [ "Comms", '/completed/comms'],
                        [ "Approval", '/completed/approval'],
                        [ "Scheduler", '/completed/scheduler'],
                        [ "DsRouter", '/completed/dsrouter'],
                        [ "Assignment", '/completed/assignment'],
                        [ "Dss", '/completed/dss'],
                        [ "Kyc", '/completed/kyc'],
                        [ "Attribution", '/completed/attribution'],
                        [ "Settlement", '/completed/settlement'],
                        [ "Verification", '/completed/verification']
                      ]}
                      titleLink={'/completed/surveys'}
                  />
                </div>

                <div onClick={this.setSecondActive}>
                    <Links
                        title={this.state.expanded ? 'Spock Tests In Development'
                            : ''}
                        isExpanded={this.state.expanded}
                        icon={report}
                        haslinks={true}
                        links={[
                          [ "Surveys", '/development/surveys'],
                          [ "Rules", '/development/rules'],
                          ["Loans", '/development/loans'],
                          [ "Users", '/development/users'],
                          [ "Auth", '/development/auth'],
                          [ "Rails", '/development/rails'],
                          [ "Comms", '/development/comms'],
                          [ "Approval", '/development/approval'],
                          [ "Scheduler", '/development/scheduler'],
                          [ "DsRouter", '/development/dsrouter'],
                          [ "Assignment", '/development/assignment'],
                          [ "Dss", '/development/dss'],
                          [ "Kyc", '/development/kyc'],
                          [ "Attribution", '/development/attribution'],
                          [ "Settlement", '/development/settlement'],
                          [ "Verification", '/development/verification']
                        ]}
                        active={this.state.secondActive}
                        titleLink={'/development/surveys'}
                    />
                </div>

                <div onClick={this.setThirdActive}>
                  <Link to='/performance'>
                    <Links
                        title={this.state.expanded ? 'Performance Tests' : ''}
                        isExpanded={this.state.expanded}
                        haslinks={false}
                        icon={perf}
                        active={this.state.thirdActive}
                        links={[]}
                        titleLink={'/performance'}
                    />
                  </Link>
                </div>

                <div onClick={this.setFourthActive}>
                  <Link to='/tasks'>
                    <Links
                        title={this.state.expanded ? 'Tasks' : ''}
                        isExpanded={this.state.expanded}
                        haslinks={false}
                        icon={task}
                        active={this.state.fourthActive}
                        links={[]}
                        titleLink={'/tasks'}
                    />
                  </Link>
                </div>
              </div>

              <div id='sidepanel-mobile'
                   style={{display: this.state.showMenuMobile ? 'block' : 'none'}}>
                <div onClick={this.setFirstActive}>
                  <Links
                      title='Spock Reports'
                      isExpanded={this.state.isExpandedMobile}
                      haslinks={true}
                      icon={report}
                      links={[['Loans', this.state.firstActive],
                        ['Rails', null], ['Users', null], ['Auth', null],
                        ['Surveys', null]]}
                      active={this.state.firstActive}
                      titleLink={'/'}
                  />
                </div>

                <div onClick={this.setSecondActive}>
                  <Links
                      title='Development'
                      isExpanded={this.state.isExpandedMobile}
                      haslinks={true}
                      icon={dev}
                      active={this.state.secondActive}
                      links={[['Loans', this.state.secondActive],
                        ['Rails', null], ['Users', null], ['Auth', null],
                        ['Surveys', null]]}
                      titleLink={'/development'}
                  />
                </div>

                <div onClick={this.setThirdActive}>
                  <Links
                      title='Performance Tests'
                      isExpanded={this.state.isExpandedMobile}
                      haslinks={false}
                      icon={perf}
                      active={this.state.thirdActive}
                      links={[]}
                      titleLink={'/performance'}
                  />
                </div>

                <div onClick={this.setFourthActive}>
                  <Links
                      title='Tasks'
                      isExpanded={this.state.isExpandedMobile}
                      haslinks={false}
                      icon={task}
                      active={this.state.fourthActive}
                      links={[]}
                      titleLink={'/tasks'}
                  />
                </div>

              </div>

              <div id='mobile-expand-icon' onClick={() => {
                this.state.showMenuMobile ?
                    this.setState({showMenuMobile: false}) :
                    this.setState({showMenuMobile: true})
              }
              }> {this.state.showMenuMobile ? 'x' : <img id='menu_bar' src={menu} alt='menu bar'></img>}
              </div>
            </React.Fragment>

          }

        </React.Fragment>
    )
  }

}