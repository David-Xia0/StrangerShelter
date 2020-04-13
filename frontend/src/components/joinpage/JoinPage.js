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

            <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
              <button className={'button mt-20'} type="submit">connect</button>
            </Link>
         </div>
          <div className="rulesBox">
            <h1 className="heading"> Rules:  </h1> 
            <h1 className="rulesText"> &nbsp;&nbsp;&nbsp;&nbsp;Cuties only </h1> 
            <h1 className="rulesText"> &nbsp;&nbsp;&nbsp;&nbsp;Ur mom Gay </h1> 
            <h1 className="rulesText"> &nbsp;&nbsp;&nbsp;&nbsp;hi </h1> 
          </div>
        </div>
    </div>
  );
}
