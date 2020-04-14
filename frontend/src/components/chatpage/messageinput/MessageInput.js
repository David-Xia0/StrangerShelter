import React from 'react';

import './MessageInput.css';

const MessageInput = ({ setMessage, sendMessage, message }) => (
  <form className="chatInputForm">
    <input
      className="chatFormInput"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className="formSendButton" onClick={e => sendMessage(e)}>Send</button>
  </form>
)


export default MessageInput;