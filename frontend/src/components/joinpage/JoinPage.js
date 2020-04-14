import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './JoinPage.css';

export default function EnterChatRoom() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className="joinOuterContainer">
        <h1 className="title">Welcome to the coronavirus shelter!</h1>
        <h1 className="titleDescription"> come talk to new people and make new friends </h1> 
        <div className="joinHorizontalContainer">
          <div className="joinInnerContainer">
            <h1 className="heading">Please enter a display name below</h1>
            <div>
              <input placeholder="Name" className="joinInput mt-20" type="text" onChange={(event) => setName(event.target.value)} />
            </div>

            <Link to={`/chat`}>
              <button className={'button mt-20'} type="submit">connect</button>
            </Link>

            <h1 className="rulesText"> By using our service you agree with to our terms of service and privacey policy</h1>
            <Link to={`/TOS`} target="_blank" >
              <h1 className="termsOfService"> TOS and PP</h1>
            </Link>
         </div>
          <div className="rulesBox">
            <h1 className="heading"> Rules:  </h1> 
            <li className="rulesText"> &nbsp;&nbsp;&nbsp;&nbsp;No racism, homophobia, sexism.</li> 
            <li className="rulesText"> &nbsp;&nbsp;&nbsp;&nbsp;No catfishing, scaming, phishing.</li> 
            <li className="rulesText"> &nbsp;&nbsp;&nbsp;&nbsp;Be nice to everyone and welcome all strangers.</li> 
            <li className="rulesText"> &nbsp;&nbsp;&nbsp;&nbsp;please choose an aporpriate name.</li> 
          </div>
        </div>
    </div>
  );
}
