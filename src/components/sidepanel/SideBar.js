import React, {useEffect, useState} from 'react'
import './sidepanel.css';
import Links from './Links';

import {Link} from 'react-router-dom';

import menu from '../../assets/Icons/menu.png';
import report from '../../assets/Icons/report.png';
import features from '../../assets/Icons/features.png';
import dev from '../../assets/Icons/dev.png';
import {setPrevUrl} from "../../store/actions/authActions";
import {compose} from "redux";
import { connect } from "react-redux";
import {getApps} from "../../store/actions/settingsActions";
import {getCompletedSpockTestLinks, getDevelopmentSpockTestLinks, getFeatureLinks} from "../../util/StringUtil";

const SideBar = (props) => {

  const [firstActive, setFirstActive] = useState(window.location.pathname.includes('features') || window.location.pathname === ('/'));
  const [secondActive, setSecondActive] = useState( window.location.pathname.includes('completed'));
  const [thirdActive, setThirdActive] = useState( window.location.pathname.includes('development'));
  const [fourthActive, setFourthActive] = useState( window.location.pathname === '/performance');
  const [fifthActive, setFifthActive] = useState( window.location.pathname === '/tasks');
  const [showCollapsedMenu, setShowCollapsedMenu] = useState( true);
  const [expanded, setExpanded] = useState( true);

  const [showMenuMobile, setShowMenuMobile] = useState( false);
  const [isExpandedMobile, setIsExpandedMobile] = useState( true);


  const onClickFirst = () => {
    setFirstActive(true)
    setSecondActive(false)
    setThirdActive(false)
    setFourthActive(false)
    setFifthActive(false)
    setShowMenuMobile(false)
  };

  const onClickSecond = () => {
    setFirstActive(false)
    setSecondActive(true)
    setThirdActive(false)
    setFourthActive(false)
    setFifthActive(false)
    setShowMenuMobile(false)
  };

  const onClickThird = () => {
    setFirstActive(false)
    setSecondActive(false)
    setThirdActive(true)
    setFourthActive(false)
    setFifthActive(false)
    setShowMenuMobile(false)
  };

  const onClickFourth = () => {
    setFirstActive(false)
    setSecondActive(false)
    setThirdActive(false)
    setFourthActive(true)
    setFifthActive(false)
    setShowMenuMobile(false)
  };

  const onClickFifth = () => {
    setFirstActive(false)
    setSecondActive(false)
    setThirdActive(false)
    setFourthActive(false)
    setFifthActive(true)
    setShowMenuMobile(false)
  };

  const onClickExpandIcon = () => {
    if (showCollapsedMenu) {
      setShowCollapsedMenu(false)
      setExpanded(false)
    } else {
      setShowCollapsedMenu(true)
      setExpanded(true)
    }
  };

  const onClickMobileExpandIcon = () => {
    if (showMenuMobile) {
      setShowMenuMobile(false)
    } else {
      setShowMenuMobile(true)
    }
  };

  const { apps } = props;

  const { getApps } = props;
  useEffect(() => {
    getApps();
    return function cleanup() {
      // unsubscribeGetApps(); //todo - power implement
      // resetGetApps(); //todo - power implement
    };
  }, [apps]);

    return (
        <React.Fragment>
          {
            <React.Fragment>
              <div id='expand-icon' onClick={onClickExpandIcon}>
                {showCollapsedMenu ? 'x' : <img id='menu_bar' src={menu} alt='menu bar'></img>}
              </div>
              <div id='sidepanel' style={{
                width: expanded ? '21%' : '85px',
                transition: 'all ease-in-out 200ms'
              }}>

                <div onClick={onClickFirst}>
                  <Links
                      title={expanded ? 'Features' : ''}
                      isExpanded={true}
                      haslinks={true}
                      icon={features}
                      active={firstActive}
                      links={getFeatureLinks(apps)}
                      titleLink={'/features/userflow'}
                  />
                </div>

                <div onClick={onClickSecond}>
                  <Links
                      title={expanded ? 'Completed Spock Tests' : ''}
                      isExpanded={false}
                      haslinks={true}
                      icon={report}
                      active={secondActive}
                      links={getCompletedSpockTestLinks(apps)}
                      titleLink={'/completed/surveys'}
                  />
                </div>

                <div onClick={onClickThird}>
                  <Links
                      title={expanded ? 'Spock Tests under Development' : ''}
                      isExpanded={false}
                      icon={dev}
                      haslinks={true}
                      active={thirdActive}
                      links={getDevelopmentSpockTestLinks(apps)}
                      titleLink={'/development/surveys'}
                  />
                </div>

                {/*<div onClick={setFourthActive}>*/}
                {/*<Link to='/performance'>*/}
                {/*<Links*/}
                {/*title={expanded ? 'Performance Tests' : ''}*/}
                {/*isExpanded={expanded}*/}
                {/*haslinks={false}*/}
                {/*icon={perf}*/}
                {/*active={thirdActive}*/}
                {/*links={[]}*/}
                {/*titleLink={'/performance'}*/}
                {/*/>*/}
                {/*</Link>*/}
                {/*</div>*/}

                {/*<div onClick={setFourthActive}>*/}
                {/*<Link to='/tasks'>*/}
                {/*<Links*/}
                {/*title={expanded ? 'Tasks' : ''}*/}
                {/*isExpanded={expanded}*/}
                {/*haslinks={false}*/}
                {/*icon={task}*/}
                {/*active={fourthActive}*/}
                {/*links={[]}*/}
                {/*titleLink={'/tasks'}*/}
                {/*/>*/}
                {/*</Link>*/}
                {/*</div>*/}
              </div>

              <div id='sidepanel-mobile'
                   style={{display: showMenuMobile ? 'block' : 'none'}}>
                <div onClick={onClickFirst}>
                  <Links
                      title='Spock Reports'
                      isExpanded={true}
                      haslinks={true}
                      icon={report}
                      links={[['Loans', firstActive],
                        ['Rails', null], ['Users', null], ['Auth', null],
                        ['Surveys', null]]}
                      active={firstActive}
                      titleLink={'/'}
                  />
                </div>

                <div onClick={onClickSecond}>
                  <Links
                      title='Development'
                      isExpanded={false}
                      haslinks={true}
                      icon={dev}
                      active={secondActive}
                      links={[['Loans', secondActive],
                        ['Rails', null], ['Users', null], ['Auth', null],
                        ['Surveys', null]]}
                      titleLink={'/development'}
                  />
                </div>

                {/*<div onClick={setThirdActive}>*/}
                {/*<Links*/}
                {/*title='Performance Tests'*/}
                {/*isExpanded={isExpandedMobile}*/}
                {/*haslinks={false}*/}
                {/*icon={perf}*/}
                {/*active={thirdActive}*/}
                {/*links={[]}*/}
                {/*titleLink={'/performance'}*/}
                {/*/>*/}
                {/*</div>*/}

                {/*<div onClick={setFourthActive}>*/}
                {/*<Links*/}
                {/*title='Tasks'*/}
                {/*isExpanded={isExpandedMobile}*/}
                {/*haslinks={false}*/}
                {/*icon={task}*/}
                {/*active={fourthActive}*/}
                {/*links={[]}*/}
                {/*titleLink={'/tasks'}*/}
                {/*/>*/}
                {/*</div>*/}

              </div>

              <div id='mobile-expand-icon' onClick={onClickMobileExpandIcon}> {showMenuMobile ? 'x' : <img id='menu_bar' src={menu} alt='menu bar'></img>}
              </div>
            </React.Fragment>

          }

        </React.Fragment>
    )
}

  const mapStateToProps = (state) => {
    return {
      user: state.auth.user,
      apps: state.settings.apps
    }
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      setPrevUrl: (url) => dispatch(setPrevUrl(url)),
      getApps: () => dispatch(getApps())
    }
  };

  export default compose(connect(mapStateToProps, mapDispatchToProps))(SideBar)
