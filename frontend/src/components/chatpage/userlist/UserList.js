import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';
import onlineIcon from '../../../icons/onlineIcon.png';

import './UserList.css';

const UserList = ({ users }) => (

  <div className="innerBoxOutline">
    <div className="innerBox">
      <h1 className="userTitle">People currently chatting:</h1>
      {
        users
          ? (
            <div>
              <div className="activeContainer">
                <h2 className="userText">
                  {users.map(({ name }) => (
                    <div key={name} className="activeItem">
                      {name}
                      <img alt="Online Icon" src={onlineIcon} />
                    </div>
                  ))}
                </h2>
              </div>
            </div>
          )
          : null
      }
    </div>
  </div>
);

export default UserList;