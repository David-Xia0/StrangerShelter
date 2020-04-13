import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './message/Message';

import './MessagesBox.css';

const MessagesBox = ({ messages, name }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)}
    {
        <div>Testing</div>
    }
  </ScrollToBottom>
);

export default MessagesBox;