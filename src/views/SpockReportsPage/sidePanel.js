import React from 'react';
import {Panel} from './panel';
import './sidePanel.css';


export class SidePanel extends React.PureComponent {
    state = {open: false}
    render(){
        return(
            <div id='accordion-holder'>

                <Panel title = '1'/>

                <Panel title = '2'/>

                <Panel title = '3'/>

            </div>
        )

    }
}
