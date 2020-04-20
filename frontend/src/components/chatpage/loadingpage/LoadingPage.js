import React, { useState, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import logo from '../../../icons/shelterNoBackground.png';

import "./LoadingPage.css"

const LoadingPage = () =>{


return(
    <div className="loadingPageOuterBox">
        <img className="loadingLogo" src={logo}/>
        <h1 className="loadingText">Loading ...</h1>
    </div>
)
}

export default LoadingPage;