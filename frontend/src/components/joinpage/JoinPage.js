import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import logo from '../../icons/shelterNoBackground.png';
import { Container, Row, Col } from 'react-bootstrap';



import './JoinPage.css';

export default function EnterChatRoom() {
  const [name, setName] = useState('');
  const room = "DEFAULT"
  const [lockFrontPage, setLock] = useState(false);
  var ENDPOINT;
  if (process.env.NODE_ENV === 'development') {
    ENDPOINT = 'http://localhost:5000';
  }

  if (process.env.NODE_ENV === 'production') {
    ENDPOINT = process.env.REACT_APP_API_URI;
  }

  useEffect(() => {
    axios.get(ENDPOINT + "/Statistics/visitors").then(res => axios.post(ENDPOINT + "/Statistics/update", { name: 'visitors', newValue: (res.data.value + 1) }).then(res => console.log(res.data)));
  }, [])



  return (
    <Container className="joinPageTitleRow" style={{ textAlign: "center" }}>
      <Row>
        <Col>
          <img className="joinPageLogo" src={logo} />
        </Col>
        <Col>
          <h1 className="joinPageTitle">Welcome to Stranger Shelter!</h1>
          <h3 className="joinPageTitleDescription"> come talk to new people and make new friends </h3>
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <h2 className="joinPageHeading">Please enter a display name below</h2>
          <input placeholder="Name" className="joinPageInput mt-20" type="text" onChange={(event) => setName(event.target.value.trim())} />
          <Link onClick={e =>
            axios.post(ENDPOINT + "/users/add", { username: name, chatID: room }).then(res => console.log(res.data)).catch(err => alert("Servers Might be Down")
            )
          }
            to={`/chat?name=${name}&room=${room}`}>
            <button className={'joinPageButton mt-20'} type="submit">connect</button>
          </Link>
        </Col>
        <Col lg={6} className="joinPageRulesBox">
            <h1 className="joinPageRulesText">Rules:</h1>
            <li className="joinPageRulesText"> &nbsp;&nbsp;&nbsp;&nbsp;No racism, homophobia, sexism.</li>
            <li className="joinPageRulesText"> &nbsp;&nbsp;&nbsp;&nbsp;No catfishing, scamming, phishing.</li>
            <li className="joinPageRulesText"> &nbsp;&nbsp;&nbsp;&nbsp;Please be nice and welcoming to everyone.</li>
            <li className="joinPageRulesText"> &nbsp;&nbsp;&nbsp;&nbsp;Please choose an apropriate name.</li>
            <h1></h1>
            <h1 className="joinPageRulesText"> By using our service you agree with to our terms of service and privacy policy</h1>
            <Link to={`/TOS`} target="_blank" >
              <h1 className="termsOfService"> TOS and PP</h1>
            </Link>
        </Col>
      </Row>
    </Container>


    // <div className="joinOuterContainer">
    //   <img className="logo" src={logo} />
    //   <h1 className="title">Welcome to Stranger Shelter!</h1>
    //   <h1 className="titleDescription"> come talk to new people and make new friends </h1>
    //   <div className="joinHorizontalContainer">
    //     <div className="joinInnerContainer">
    //       <h1 className="heading">Please enter a display name below</h1>
    //       <div>
    //         <input placeholder="Name" className="joinInput mt-20" type="text" onChange={(event) => setName(event.target.value.trim())} />
    //       </div>
    //       <Link onClick={e =>
    //         axios.post(ENDPOINT + "/users/add", { username: name, chatID: room }).then(res => console.log(res.data)).catch(err => alert("Servers Might be Down")
    //         )
    //       }

    //         to={`/chat?name=${name}&room=${room}`}>
    //         <button className={'button mt-20'} type="submit">connect</button>
    //       </Link>

    //       <h1 className="rulesText"> By using our service you agree with to our terms of service and privacey policy</h1>
    //       <Link to={`/TOS`} target="_blank" >
    //         <h1 className="termsOfService"> TOS and PP</h1>
    //       </Link>
    //     </div>
    // <div className="rulesBox">
    //   <h1 className="heading"> Rules:  </h1>
    //   <li className="rulesText"> &nbsp;&nbsp;&nbsp;&nbsp;No racism, homophobia, sexism.</li>
    //   <li className="rulesText"> &nbsp;&nbsp;&nbsp;&nbsp;No catfishing, scaming, phishing.</li>
    //   <li className="rulesText"> &nbsp;&nbsp;&nbsp;&nbsp;Please be nice and welcoming to everyone.</li>
    //   <li className="rulesText"> &nbsp;&nbsp;&nbsp;&nbsp;please choose an aporpriate name.</li>
    // </div>
    //   </div>
    // </div>
  );
}


