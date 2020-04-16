import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import InfoBar from "./infobar/InfoBar";
import MessagesBox from "./messagesbox/MessagesBox";
import MessageInput from "./messageinput/MessageInput";

import './ChatPage.css';

let socket;

const ChatPage = ({ location }) => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'http://localhost:5000';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
    
        socket = io(ENDPOINT);
    
        setRoom(room);
        setName(name)
    
        socket.emit('join', { name, room }, (error) => {
          if(error) {
            alert(error);
          }
        });
      }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', message => {
            console.log(message);
            setMessages(messages => [ ...messages, message ]);
        });
        
        socket.on("roomData", ({ users }) => {
          setUsers(users);
        });
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();

        if(message) {
          socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    return (
        <div className="chatOuterContainer">
        <div className="chatContainer">
            <InfoBar room={room} />
            <MessagesBox messages={messages} name={name} />
            <MessageInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
      </div>
    );
}

export default ChatPage;