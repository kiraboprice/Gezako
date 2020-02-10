import React from 'react'

import loading_gif  from "../../assets/Imgs/loading.gif";

import "./loading.css"

const LoadingScreen = () =>{
  return(
      <div className="loading">
        <div className="load-gif">
          <img src={loading_gif} alt="Loading.." />
        </div>
      </div>
  )
}

export default LoadingScreen;