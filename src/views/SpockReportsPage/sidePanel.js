import React from 'react';
import {Panel} from './panel';
import './sidePanel.css';


export class SidePanel extends React.PureComponent {
    state = {open: false}
    render(){
        return(
            <div id='accordion-holder'>

                <Panel index = '1'/>

                <Panel index = '2'/>

                <Panel index = '3'/>

            </div>
        )

    }
}
