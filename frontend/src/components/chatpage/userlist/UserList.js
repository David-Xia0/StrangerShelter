import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import './UserList.css';

const UserList = ({ users : {names} }) => (
  <ScrollToBottom className="outerBox">
     {names? names.map((name, i) => <div key={i}><h1>{name}</h1></div>):null, console.log(names)}
  </ScrollToBottom>
);

export default UserList;