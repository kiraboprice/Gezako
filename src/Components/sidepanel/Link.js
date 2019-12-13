import React from 'react';
import { Link } from 'react-router-dom';

export default class Links  extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            expand: '+',
            expanded: false
        }
    }
    render(){
        return(
            <div id={this.props.active ? 'active' : 'link'}>
                <Link to={this.props.whereto}>
                  <span id='report_navigation_title'><img id='link-img' src={this.props.icon} alt={this.props.title}></img>{this.props.title}</span>
                </Link>
                
                <span id='expand' onClick={
                    () => {
                        this.state.expand === '+' ? 
                        this.setState({expand: '-', expanded: true}) : this.setState({expand: '+', expanded: false})
                    }
                }>{this.props.haslinks && this.props.isHovered ? this.state.expand : null}</span>

                {
                    this.props.haslinks ?
                        <div id={this.state.expanded && this.props.isHovered ? 'mini-links' : 'no_links_display'}>
                        <ul>
                            {this.props.links.map((link, index) => {
                                return (
                                    <li key={index}>{link}</li>
                                )
                            })}
                        </ul>
                    </div> : null
                }
            </div>
        )
    }

}
