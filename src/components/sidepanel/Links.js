import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Links extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandIcon: '+',
      isExpanded: false,
      // style: {fontWeight: "700", textDecoration: "underline"}
      style: {fontWeight: '100', textDecoration: 'none'}
    }
  }

  handleClick = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { style } = this.state;

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
                  {this.props.haslinks && this.props.isHovered
                      ? this.state.expandIcon : null}
                  </span>

          {
            this.props.haslinks ?
                <div id={this.state.isExpanded && this.props.isHovered
                    ? 'mini-links' : 'no_links_display'}>
                  <ul>
                    {this.props.links.map((link, index) => {
                      return (
                          <Link to={`/development/${link}`} key={index}>
                            <li style={style[index]} onClick={this.handleClick}>{link}</li>
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
