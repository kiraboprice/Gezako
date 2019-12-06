import React from 'react';
import {Link} from "react-router-dom";

export class Panel extends React.PureComponent{
    state = {
        display: false
    }

    render(){
        return(
            <div>
                <button className="accordion" onClick={() => this.state.display ? this.setState({display: false}) : this.setState({display: true})}>
                    <span style={{fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif", color:'black', fontSize: '14px', lineHeight: '1.6em'}}> {this.props.title} </span>
                    <span id='close_down_panel' onClick={
                        () => this.state.display ? this.setState({display: false}) : this.setState({display: true})
                    }>
                        {this.state.display ? 'x' : '+'}
                    </span>
                </button>

                <div className="panel"  style={{display: this.state.display ? 'block' : 'none'}}>
                  <p><Link to="/spock-reports" class="btn btn-primary">Loans</Link></p>
                </div>
              <div className="panel"  style={{display: this.state.display ? 'block' : 'none'}}>
                <p>Rails</p>
              </div>
              <div className="panel"  style={{display: this.state.display ? 'block' : 'none'}}>
                <p>Users</p>
              </div>
              <div className="panel"  style={{display: this.state.display ? 'block' : 'none'}}>
                <p>Auth</p>
              </div>
              <div className="panel"  style={{display: this.state.display ? 'block' : 'none'}}>
                <p>Surveys</p>
              </div>
            </div>
        )
    }
}