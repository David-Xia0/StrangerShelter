import React, { useState, useEffect } from "react";

import InfoBar from "./infobar/InfoBar";
import MessagesBox from "./messagesbox/MessagesBox";
import MessageInput from "./messageinput/MessageInput";

import './ChatPage.css';

const ChatPage = () => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = '';

    const sendMessage = (event) => {
        event.preventDefault();

        console.log("sending " + message);
        setMessage('');
    }

    return (
        <div className="outerContainer">
        <div className="container">
            <InfoBar room={room} />
            <MessagesBox messages={messages} name={name} />
            <MessageInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
      </div>
    );
}

export default ChatPage;