import React, {Component} from 'react'
import './sidepanel.css';
import Links from './Links';

import {Link} from 'react-router-dom';

import menu from '../../assets/Icons/menu.png';
import report from '../../assets/Icons/report.png';
import features from '../../assets/Icons/features.png';
import dev from '../../assets/Icons/dev.png';
import perf from '../../assets/Icons/perf.png';
import task from '../../assets/Icons/task.png';
import {
  ANDROID_USER_FLOWS_NAME,
  ANDROID_USER_FLOWS_VALUE
} from "../../constants/Services";

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstActive: window.location.pathname.includes('features') || window.location.pathname ===('/'),
      secondActive: window.location.pathname.includes('completed'),
      thirdActive: window.location.pathname.includes('development'),
      fourthActive: window.location.pathname === '/performance',
      fifthActive: window.location.pathname === '/tasks',
      showCollapsedMenu: true,
      expanded: true,

      showMenuMobile: false,
      isExpandedMobile: true
    };

    this.setFirstActive = this.setFirstActive.bind(this);
    this.setSecondActive = this.setSecondActive.bind(this);
    this.setThirdActive = this.setThirdActive.bind(this);
    this.setFourthActive = this.setFourthActive.bind(this);
    this.setFifthActive = this.setFifthActive.bind(this);
  }

  setFirstActive = () => {
    this.setState({firstActive: true});
    this.setState({secondActive: false});
    this.setState({thirdActive: false});
    this.setState({fourthActive: false});
    this.setState({fifthActive: false});
    this.setState({showMenuMobile: false});
  };

  setSecondActive = () => {
    this.setState({firstActive: false});
    this.setState({secondActive: true});
    this.setState({thirdActive: false});
    this.setState({fourthActive: false});
    this.setState({fifthActive: false});
    this.setState({showMenuMobile: false});
  };

  setThirdActive = () => {
    this.setState({firstActive: false});
    this.setState({secondActive: false});
    this.setState({thirdActive: true});
    this.setState({fourthActive: false});
    this.setState({fifthActive: false});
    this.setState({showMenuMobile: false});
  };

  setFourthActive = () => {
    this.setState({firstActive: false});
    this.setState({secondActive: false});
    this.setState({thirdActive: false});
    this.setState({fourthActive: true});
    this.setState({fifthActive: false});
    this.setState({showMenuMobile: false});
  };

  setFifthActive = () => {
    this.setState({firstActive: false});
    this.setState({secondActive: false});
    this.setState({thirdActive: false});
    this.setState({fourthActive: false});
    this.setState({fifthActive: true});
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
                width: this.state.expanded ? '21%' : '85px',
                transition: 'all ease-in-out 200ms'
              }}>

                <div onClick={this.setFirstActive}>
                  <Links
                      title={this.state.expanded ? 'Features'
                          : ''}
                      isExpanded={true}
                      haslinks={true}
                      icon={features}
                      active={this.state.firstActive}
                      links={[
                        [ ANDROID_USER_FLOWS_NAME, `/features/${ANDROID_USER_FLOWS_VALUE}`],
                        [ "Admin (CARE) User Flows", '/features/admin'],
                        [ "Surveys", '/features/surveys'],
                        [ "Rules", '/features/rules'],
                        ["Loans", '/features/loans'],
                        [ "Users", '/features/users'],
                        [ "Auth", '/features/auth'],
                        [ "Rails", '/features/rails'],
                        [ "Comms", '/features/comms'],
                        [ "Approval", '/features/approval'],
                        [ "Scheduler", '/features/scheduler'],
                        [ "DsRouter", '/features/dsrouter'],
                        [ "Assignment", '/features/assignment'],
                        [ "Dss", '/features/dss'],
                        [ "Kyc", '/features/kyc'],
                        [ "Attribution", '/features/attribution'],
                        [ "Settlement", '/features/settlement'],
                        [ "Verification", '/features/verification'],
                        [ "Lending Partner", '/features/lendingpartner'],
                        [ "Provider Mediator (Legacy)", '/features/providermediator'],
                        [ "Account (Legacy)", '/features/account']
                      ]}
                      titleLink={'/features/userflow'}
                  />
                </div>

                <div onClick={this.setSecondActive}>
                  <Links
                      title={this.state.expanded ? 'Completed Spock Tests'
                          : ''}
                      isExpanded={false}
                      haslinks={true}
                      icon={report}
                      active={this.state.secondActive}
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
                        [ "Verification", '/completed/verification'],
                        [ "Lendingpartner", '/completed/lendingpartner'],
                        [ "Provider Mediator (Legacy)", '/features/providermediator'],
                        [ "Account (Legacy)", '/features/account']
                      ]}
                      titleLink={'/completed/surveys'}
                  />
                </div>

                <div onClick={this.setThirdActive}>
                    <Links
                        title={this.state.expanded ? 'Spock Tests under Development'
                            : ''}
                        isExpanded={false}
                        icon={dev}
                        haslinks={true}
                        active={this.state.thirdActive}
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
                          [ "Verification", '/development/verification'],
                          [ "Lendingpartner", '/development/lendingpartner'],
                          [ "Provider Mediator (Legacy)", '/features/providermediator'],
                          [ "Account (Legacy)", '/features/account']

                        ]}
                        titleLink={'/development/surveys'}
                    />
                </div>

                {/*<div onClick={this.setFourthActive}>*/}
                  {/*<Link to='/performance'>*/}
                    {/*<Links*/}
                        {/*title={this.state.expanded ? 'Performance Tests' : ''}*/}
                        {/*isExpanded={this.state.expanded}*/}
                        {/*haslinks={false}*/}
                        {/*icon={perf}*/}
                        {/*active={this.state.thirdActive}*/}
                        {/*links={[]}*/}
                        {/*titleLink={'/performance'}*/}
                    {/*/>*/}
                  {/*</Link>*/}
                {/*</div>*/}

                {/*<div onClick={this.setFourthActive}>*/}
                  {/*<Link to='/tasks'>*/}
                    {/*<Links*/}
                        {/*title={this.state.expanded ? 'Tasks' : ''}*/}
                        {/*isExpanded={this.state.expanded}*/}
                        {/*haslinks={false}*/}
                        {/*icon={task}*/}
                        {/*active={this.state.fourthActive}*/}
                        {/*links={[]}*/}
                        {/*titleLink={'/tasks'}*/}
                    {/*/>*/}
                  {/*</Link>*/}
                {/*</div>*/}
              </div>

              <div id='sidepanel-mobile'
                   style={{display: this.state.showMenuMobile ? 'block' : 'none'}}>
                <div onClick={this.setFirstActive}>
                  <Links
                      title='Spock Reports'
                      isExpanded={true}
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
                      isExpanded={false}
                      haslinks={true}
                      icon={dev}
                      active={this.state.secondActive}
                      links={[['Loans', this.state.secondActive],
                        ['Rails', null], ['Users', null], ['Auth', null],
                        ['Surveys', null]]}
                      titleLink={'/development'}
                  />
                </div>

                {/*<div onClick={this.setThirdActive}>*/}
                  {/*<Links*/}
                      {/*title='Performance Tests'*/}
                      {/*isExpanded={this.state.isExpandedMobile}*/}
                      {/*haslinks={false}*/}
                      {/*icon={perf}*/}
                      {/*active={this.state.thirdActive}*/}
                      {/*links={[]}*/}
                      {/*titleLink={'/performance'}*/}
                  {/*/>*/}
                {/*</div>*/}

                {/*<div onClick={this.setFourthActive}>*/}
                  {/*<Links*/}
                      {/*title='Tasks'*/}
                      {/*isExpanded={this.state.isExpandedMobile}*/}
                      {/*haslinks={false}*/}
                      {/*icon={task}*/}
                      {/*active={this.state.fourthActive}*/}
                      {/*links={[]}*/}
                      {/*titleLink={'/tasks'}*/}
                  {/*/>*/}
                {/*</div>*/}

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
