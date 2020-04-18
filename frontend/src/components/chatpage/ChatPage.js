import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import logo from '../../icons/shelterNoBackground.png';
import { Prompt } from 'react-router'
import { Redirect } from 'react-router-dom'

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
  const ENDPOINT = 'https://stranger-shelter.herokuapp.com';
  
  const onWindowChange = (event) => {
    socket.disconnect();
    console.log("tf");
  };


  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);
    window.addEventListener('popstate', onWindowChange);
    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
        return <Redirect to='/'/>
      }
    });
    return  () => {
    
      console.log("wtf");

    }

  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', message => {
      console.log(message);
      setMessages(messages => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }


 



  return (
    <div className="chatOuterContainer">

      <img className="logo" src={logo}></img>
      <div className="chatContainerOutline">
        <div className="chatContainer">
          <InfoBar room={room} />
          <MessagesBox messages={messages} name={name} />
          <MessageInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
      </div>
      <div className="userList">
      </div>
      <React.Fragment>
        <Prompt
          message='Are you sure you want to leave this chat room? you may not be able to come back'
        />
        {/* Component JSX */}
      </React.Fragment>

    </div>


  );
}

export default ChatPage;