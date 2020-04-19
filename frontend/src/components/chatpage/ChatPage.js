import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import logo from '../../icons/shelterNoBackground.png';
import { Prompt } from 'react-router'
import { Redirect } from 'react-router-dom'

import InfoBar from "./infobar/InfoBar";
import MessagesBox from "./messagesbox/MessagesBox";
import MessageInput from "./messageinput/MessageInput";
import UserList from "./userlist/UserList";

import './ChatPage.css';

let socket;

const ChatPage = ({ location }) => {

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [toHomePage, setToHomePage] = useState(false);
  const ENDPOINT = 'http://localhost:5000';
  
  const onWindowChange = (event) => {
    socket.disconnect();
  };


  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    window.addEventListener('popstate', onWindowChange);
    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        window.removeEventListener('popstate', onWindowChange);
        alert(error);
        setToHomePage(true);
      }
    });
    return  () => {

    }

  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', message => {
      console.log(message);
      setMessages(messages => [...messages, message]);
    });

    socket.on("roomData", newUsers => {
      console.log(newUsers.users);
      setUsers(newUsers.users)
      console.log(users);
    });

    socket.on("connect_failed",function() {
      setToHomePage(true);
      console.log("connection failed");
    });

    socket.on("reconnect_failed",function() {
      setToHomePage(true);
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
      {toHomePage ? <Redirect to="/"/> : null}
      <img className="logo" src={logo}></img>
      <div className="chatContainerOutline">
        <div className="chatContainer">
          <InfoBar room={room} />
          <MessagesBox messages={messages} name={name} />
          <MessageInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
      </div>
      <UserList users={users}/>
      <React.Fragment>
        <Prompt when = {!toHomePage} message='Are you sure you want to leave this chat room? you may not be able to come back' />
      </React.Fragment>

    </div>


  );
}

export default ChatPage;