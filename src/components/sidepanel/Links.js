import React, {Component, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";

const Links = (props) =>  {


  const [expandIcon, setExpandIcon] = useState(' +');
  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => {
    setIsExpanded(props.isExpanded);
    return function cleanup() {
      //
    };
  }, []);

  const handleExpandButtonClick = () => {
    if (expandIcon === ' +') {
      setExpandIcon(' -');
      setIsExpanded(true);
    } else {
      setExpandIcon(' +');
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

          <span id='expandIcon' onClick={() => handleExpandButtonClick()}>
            {props.haslinks
                ? expandIcon : null}
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
