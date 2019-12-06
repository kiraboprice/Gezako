import React from 'react';
import {Panel} from './panel';
import './sidePanel.css';
import {Link} from "react-router-dom";


export class SidePanel extends React.PureComponent {
    state = {open: false}
    render(){
        return(
            <div id='accordion-holder'>

                <Panel title = 'Spock Reports'/>

              <Link to="/spock-development" ><Panel title = 'Development'/></Link>

              <Panel title = 'Performance Tests'/>

            </div>
        )

    }
}
