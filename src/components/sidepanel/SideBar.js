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
import * as services from "../../constants/Services";

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
                        [ services.ANDROID_USER_FLOWS_NAME, `/features/${services.ANDROID_USER_FLOWS_VALUE}`],
                        [ services.ADMIN_USER_FLOWS_NAME, `/features/${services.ADMIN_USER_FLOWS_VALUE}`],
                        [ services.SURVEYS_NAME , `/features/${services.SURVEYS_VALUE}`],
                        [ services.RULES_NAME, `/features/${services.RULES_VALUE}`],
                        [ services.LOANS_NAME, `/features/${services.LOANS_VALUE}`],
                        [ services.USERS_NAME, `/features/${services.USERS_VALUE}`],
                        [ services.AUTH_NAME, `/features/${services.AUTH_VALUE}`],
                        [ services.RAILS_NAME, `/features/${services.RAILS_VALUE}`],
                        [ services.COMMS_NAME, `/features/${services.COMMS_VALUE}`],
                        [ services.APPROVAL_NAME, `/features/${services.APPROVAL_VALUE}`],
                        [ services.SCHEDULER_NAME, `/features/${services.SCHEDULER_VALUE}`],
                        [ services.DSROUTER_NAME, `/features/${services.DSROUTER_VALUE}`],
                        [ services.ASSIGNMENT_NAME, `/features/${services.ASSIGNMENT_VALUE}`],
                        [ services.DSS_NAME, `/features/${services.DSS_VALUE}`],
                        [ services.KYC_NAME, `/features/${services.KYC_VALUE}`],
                        [ services.ATTRIBUTION_NAME, `/features/${services.ATTRIBUTION_VALUE}`],
                        [ services.SETTLEMENT_NAME, `/features/${services.SETTLEMENT_VALUE}`],
                        [ services.VERIFICATION_NAME, `/features/${services.VERIFICATION_VALUE}`],
                        [ services.LENDING_PARTNER_NAME, `/features/${services.LENDING_PARTNER_VALUE}`],
                        [ services.PROVIDER_MEDIATOR_LEGACY_NAME, `/features/${services.PROVIDER_MEDIATOR_LEGACY_VALUE}`],
                        [ services.ACCOUNT_LEGACY_NAME, `/features/${services.ACCOUNT_LEGACY_VALUE}`]
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
                        [ services.SURVEYS_NAME , `/completed/${services.SURVEYS_VALUE}`],
                        [ services.RULES_NAME, `/completed/${services.RULES_VALUE}`],
                        [ services.LOANS_NAME, `/completed/${services.LOANS_VALUE}`],
                        [ services.USERS_NAME, `/completed/${services.USERS_VALUE}`],
                        [ services.AUTH_NAME, `/completed/${services.AUTH_VALUE}`],
                        [ services.RAILS_NAME, `/completed/${services.RAILS_VALUE}`],
                        [ services.COMMS_NAME, `/completed/${services.COMMS_VALUE}`],
                        [ services.COMMS_NAME, `/completed/${services.APPROVAL_VALUE}`],
                        [ services.SCHEDULER_NAME, `/completed/${services.SCHEDULER_VALUE}`],
                        [ services.DSROUTER_NAME, `/completed/${services.DSROUTER_VALUE}`],
                        [ services.ASSIGNMENT_NAME, `/completed/${services.ASSIGNMENT_VALUE}`],
                        [ services.DSS_NAME, `/completed/${services.DSS_VALUE}`],
                        [ services.KYC_NAME, `/completed/${services.KYC_VALUE}`],
                        [ services.ATTRIBUTION_NAME, `/completed/${services.ATTRIBUTION_VALUE}`],
                        [ services.SETTLEMENT_NAME, `/completed/${services.SETTLEMENT_VALUE}`],
                        [ services.VERIFICATION_NAME, `/completed/${services.VERIFICATION_VALUE}`],
                        [ services.LENDING_PARTNER_NAME, `/completed/${services.LENDING_PARTNER_VALUE}`],
                        [ services.PROVIDER_MEDIATOR_LEGACY_NAME, `/completed/${services.PROVIDER_MEDIATOR_LEGACY_VALUE}`],
                        [ services.ACCOUNT_LEGACY_NAME, `/completed/${services.ACCOUNT_LEGACY_VALUE}`]
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
                          [ services.SURVEYS_NAME , `/development/${services.SURVEYS_VALUE}`],
                          [ services.RULES_NAME, `/development/${services.RULES_VALUE}`],
                          [ services.LOANS_NAME, `/development/${services.LOANS_VALUE}`],
                          [ services.USERS_NAME, `/development/${services.USERS_VALUE}`],
                          [ services.AUTH_NAME, `/development/${services.AUTH_VALUE}`],
                          [ services.RAILS_NAME, `/development/${services.RAILS_VALUE}`],
                          [ services.COMMS_NAME, `/development/${services.COMMS_VALUE}`],
                          [ services.COMMS_NAME, `/development/${services.APPROVAL_VALUE}`],
                          [ services.SCHEDULER_NAME, `/development/${services.SCHEDULER_VALUE}`],
                          [ services.DSROUTER_NAME, `/development/${services.DSROUTER_VALUE}`],
                          [ services.ASSIGNMENT_NAME, `/development/${services.ASSIGNMENT_VALUE}`],
                          [ services.DSS_NAME, `/development/${services.DSS_VALUE}`],
                          [ services.KYC_NAME, `/development/${services.KYC_VALUE}`],
                          [ services.ATTRIBUTION_NAME, `/development/${services.ATTRIBUTION_VALUE}`],
                          [ services.SETTLEMENT_NAME, `/development/${services.SETTLEMENT_VALUE}`],
                          [ services.VERIFICATION_NAME, `/development/${services.VERIFICATION_VALUE}`],
                          [ services.LENDING_PARTNER_NAME, `/development/${services.LENDING_PARTNER_VALUE}`],
                          [ services.PROVIDER_MEDIATOR_LEGACY_NAME, `/development/${services.PROVIDER_MEDIATOR_LEGACY_VALUE}`],
                          [ services.ACCOUNT_LEGACY_NAME, `/development/${services.ACCOUNT_LEGACY_VALUE}`]
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
