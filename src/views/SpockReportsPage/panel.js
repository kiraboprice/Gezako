import React from 'react';

export class Panel extends React.PureComponent{
    state = {
        display: false
    }

    render(){
        return(
            <React.Fragment>
                <button className="accordion" onClick={() => this.state.display ? this.setState({display: false}) : this.setState({display: true})}>
                    Section {this.props.index}
                    <span id='close_down_panel' onClick={
                        () => this.state.display ? this.setState({display: false}) : this.setState({display: true})
                    }>
                        {this.state.display ? 'x' : '+'}
                    </span>
                </button>

                <div className="panel"  style={{display: this.state.display ? 'block' : 'none'}}>
                    <p>Lorem ipsum dolor.</p>

                </div>
            </React.Fragment>
        )
    }
}