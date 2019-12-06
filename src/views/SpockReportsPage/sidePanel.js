import React from 'react';
import {Panel} from './panel';
import './sidePanel.css';


export class SidePanel extends React.PureComponent {
    state = {open: false}
    render(){
        return(
            <div id='accordion-holder'>

                <Panel title = 'Spock Reports'/>

                <Panel title = 'Development'/>

                <Panel title = 'Performance Tests'/>

            </div>
        )

    }
}
