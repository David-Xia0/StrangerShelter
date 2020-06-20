import React, { useState, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import logo from '../../../icons/shelterNoBackground.png';
import { Container, Row, Col } from 'react-bootstrap';

import "./LoadingPage.css"

const LoadingPage = () => {
    return (
            <Col>
                <img className="loadingPageLogo" src={logo} />
                <h1 className="loadingPageText">Loading ...</h1>
            </Col>
    )
}
export default LoadingPage;