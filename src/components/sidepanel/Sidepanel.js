import React, {Component} from 'react'
import './sidepanel.css';
import Links from './Links';

import {Link} from 'react-router-dom';

import menu from '../../assets/Icons/menu.png';
import report from '../../assets/Icons/report.png';
import dev from '../../assets/Icons/dev.png';
import perf from '../../assets/Icons/perf.png';

export default class SidePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstActive: window.location.pathname === '/' ? true : false,
      secondActive: window.location.pathname === '/development' ? true : false,
      thirdActive: window.location.pathname === '/performance' ? true : false,
      fourthActive: window.location.pathname === '/tasks' ? true : false,
      showMenu: false,
      showDesktopMenu: true,
      isHoveredMobile: true,
      hovered: true
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
    this.setState({showMenu: false});
  };

  setSecondActive = () => {
    this.setState({firstActive: false});
    this.setState({secondActive: true});
    this.setState({thirdActive: false});
    this.setState({fourthActive: false});
    this.setState({showMenu: false});
  };

  setThirdActive = () => {
    this.setState({firstActive: false});
    this.setState({secondActive: false});
    this.setState({thirdActive: true});
    this.setState({fourthActive: false});
    this.setState({showMenu: false});
  };

  setFourthActive = () => {
    this.setState({firstActive: false});
    this.setState({secondActive: false});
    this.setState({thirdActive: false});
    this.setState({fourthActive: true});
    this.setState({showMenu: false});
  };

  render() {
    return (
        <React.Fragment>
          {
            <React.Fragment>
              <div id='expand-icon' onClick={() => {
                this.state.showDesktopMenu ?
                    this.setState({showDesktopMenu: false, hovered: false}) :
                    this.setState({showDesktopMenu: true, hovered: true})
              }
              }> {this.state.showDesktopMenu ? 'x' : <img id='menu_bar' src={menu} alt='menu bar'></img>}
              </div>
              <div id='sidepanel' style={{
                width: this.state.hovered ? '21%' : '55px',
                transition: 'all ease-in-out 200ms'
              }}>

                <div onClick={this.setFirstActive}>
                  <Link to='/'>
                    <Links
                        title={this.state.hovered ? 'Completed Spock Tests'
                            : ''}
                        isHovered={this.state.hovered}
                        icon={report}
                        haslinks={true}
                        links={[['Loans', this.state.firstActive],
                          ['Rails', null], ['Users', null], ['Auth', null],
                          ['Surveys', null]]}
                        active={this.state.firstActive}
                        whereto={'/'}
                    />
                  </Link>
                </div>

                <div onClick={this.setSecondActive}>
                  <Link to='/development'>
                    <Links
                        title={this.state.hovered ? 'Spock Tests In Development'
                            : ''}
                        isHovered={this.state.hovered}
                        haslinks={true}
                        icon={dev}
                        active={this.state.secondActive}
                        links={[['Loans', this.state.secondActive],
                          ['Rails', null], ['Users', null], ['Auth', null],
                          ['Surveys', null]]}
                        whereto={'/development'}
                    />
                  </Link>
                </div>

                <div onClick={this.setThirdActive}>
                  <Link to='/performance'>
                    <Links
                        title={this.state.hovered ? 'Performance Tests' : ''}
                        isHovered={this.state.hovered}
                        haslinks={false}
                        icon={perf}
                        active={this.state.thirdActive}
                        links={[]}
                        whereto={'/performance'}
                    />
                  </Link>
                </div>

                <div onClick={this.setFourthActive}>
                  <Link to='/tasks'>
                    <Links
                        title={this.state.hovered ? 'Tasks' : ''}
                        isHovered={this.state.hovered}
                        haslinks={false}
                        icon={perf}
                        active={this.state.thirdActive}
                        links={[]}
                        whereto={'/tasks'}
                    />
                  </Link>
                </div>
              </div>

              <div id='sidepanel-mobile'
                   style={{display: this.state.showMenu ? 'block' : 'none'}}>
                <div onClick={this.setFirstActive}>
                  <Links
                      title='Spock Reports'
                      isHovered={this.state.isHoveredMobile}
                      haslinks={true}
                      icon={report}
                      links={[['Loans', this.state.firstActive],
                        ['Rails', null], ['Users', null], ['Auth', null],
                        ['Surveys', null]]}
                      active={this.state.firstActive}
                      whereto={'/'}
                  />
                </div>

                <div onClick={this.setSecondActive}>
                  <Links
                      title='Development'
                      isHovered={this.state.isHoveredMobile}
                      haslinks={true}
                      icon={dev}
                      active={this.state.secondActive}
                      links={[['Loans', this.state.secondActive],
                        ['Rails', null], ['Users', null], ['Auth', null],
                        ['Surveys', null]]}
                      whereto={'/development'}
                  />
                </div>

                <div onClick={this.setThirdActive}>
                  <Links
                      title='Performance Tests'
                      isHovered={this.state.isHoveredMobile}
                      haslinks={false}
                      icon={perf}
                      active={this.state.thirdActive}
                      links={[]}
                      whereto={'/performance'}
                  />
                </div>

                <div onClick={this.setFourthActive}>
                  <Links
                      title='Tasks'
                      isHovered={this.state.isHoveredMobile}
                      haslinks={false}
                      icon={perf}
                      active={this.state.fourthActive}
                      links={[]}
                      whereto={'/tasks'}
                  />
                </div>

              </div>

              <div id='mobile-expand-icon' onClick={() => {
                this.state.showMenu ?
                    this.setState({showMenu: false}) :
                    this.setState({showMenu: true})
              }
              }> {this.state.showMenu ? 'x' : <img id='menu_bar' src={menu} alt='menu bar'></img>}
              </div>
            </React.Fragment>

          }

        </React.Fragment>
    )
  }

}
