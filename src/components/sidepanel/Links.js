import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Links extends Component {
    state = {
      expandIcon: '+',
      isExpanded: false
    };

  handleClick = (index) => {
    this.setState({
      activeLinkIndex: index
    });
  };

  render() {
    const { activeLinkIndex } = this.state;

    return (
        <div id={this.props.active ? 'active' : 'link'}>
          <Link to={this.props.titleLink}>
            <span id='report_navigation_title'>
              <img id='link-img' src={this.props.icon} alt={this.props.title}></img>{this.props.title}</span>
          </Link>

          <span id='expandIcon' onClick={
            () => {
              this.state.expandIcon === '+' ?
                  this.setState({expandIcon: '-', isExpanded: true}) : this.setState(
                  {expandIcon: '+', isExpanded: false})
            }
          }>
                  {this.props.haslinks && this.props.isExpanded
                      ? this.state.expandIcon : null}
                  </span>

          {
            this.props.haslinks ?
                <div id={this.state.isExpanded && this.props.isExpanded
                    ? 'mini-links' : 'no_links_display'}>
                  <ul>
                    {this.props.links.map((link, index) => {
                      return (
                          <Link to={link[1]} key={index}>
                            <li
                                onClick={() => this.handleClick(index)}
                                style={ index === activeLinkIndex ? {fontWeight: '700', textDecoration: 'underline'} : null}
                            >{link[0]}</li>
                          </Link>

                      )
                    })}
                  </ul>
                </div> : null
          }
        </div>
    )
  }
}
