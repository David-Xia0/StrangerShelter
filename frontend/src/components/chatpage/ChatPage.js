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
import LoadingPage from "./loadingpage/LoadingPage";

import './ChatPage.css';

let socket;

const ChatPage = ({ location }) => {

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [toHomePage, setToHomePage] = useState(false);
  const [pageIsLoading, setPageIsLoading] = useState(true);
  var ENDPOINT;
  if(process.env.NODE_ENV === 'development') {
    ENDPOINT = 'http://localhost:5000';
  }
  
  if(process.env.NODE_ENV === 'production') {
    ENDPOINT = process.env.REACT_APP_API_URI;
  }
  
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
      setPageIsLoading(false);
    });
    return  () => {

    }

  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', message => {
      console.log(message);
      setMessages(messages => [...messages, message]);
    });

    socket.on("roomData", ( { users } ) => {
      console.log(users);
      setUsers(users);
    });

    socket.on('connect_failed',function() {
      setToHomePage(true);
      console.log("connection failed");
    });
    socket.on('connect_error',function() {
      setToHomePage(true);
      console.log("connection failed");
    });

    socket.on("reconnect_failed",function() {
      setToHomePage(true);
      console.log("connection failed");
    });

  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div>
      {toHomePage?<Redirect to='/'/>:null}
      {pageIsLoading? <div><LoadingPage/></div> : 
      <div className="chatOuterContainer">
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
    }
    </div>
  );
}

export default ChatPage;