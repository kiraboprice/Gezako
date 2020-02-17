import React, {Component, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import showButton from "../../assets/Imgs/show.png";
import hideButton from "../../assets/Imgs/hide.png";

const Links = (props) =>  {

  const [showOrHideButton, setShowOrHideButton] = useState(showButton);
  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => {
    setIsExpanded(props.isExpanded);
    isExpanded ? setShowOrHideButton(hideButton) : setShowOrHideButton(showButton);
  }, []);

  useEffect(() => {
    isExpanded ? setShowOrHideButton(hideButton) : setShowOrHideButton(showButton);
  }, [isExpanded]);

  const handleExpandButtonClick = () => {
    if (showOrHideButton === showButton) {
      setShowOrHideButton(hideButton);
      setIsExpanded(true);
    } else {
      setShowOrHideButton(showButton);
      setIsExpanded(false);
    }
  };

  const [activeLinkIndex, setActiveLinkIndex] = useState();
  const handleClick = (index) => {
    setActiveLinkIndex(index)
  };

    return (
        <div id={props.active ? 'active' : 'link'}>
          <Link to={props.titleLink}>
            <span id='report_navigation_title'>
              <img id='link-img' src={props.icon} alt={props.title}></img>{props.title}
            </span>
          </Link>

          <span id='showOrHideButton' onClick={() => handleExpandButtonClick()}>
            {props.haslinks ? <img src={showOrHideButton} alt='expand button'></img> : null}

          </span>

          {
            props.haslinks ?
                <div id={isExpanded
                    ? 'mini-links' : 'no_links_display'}>
                  <ul>
                    {props.links.map((link, index) => {
                      return (
                          <Link to={link[1]} key={index}>
                            <li
                                onClick={() => handleClick(index)}
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
  };

export default Links
