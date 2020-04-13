import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import Homepage from "./components/homepage.component";
import CreateUser from "./components/create-user.component";
import ChatPage from "./components/chatpage/ChatPage";

function App() {
  return (
    <Router>
      <Navbar />
        <Route path="/" exact component={Homepage} />
        <Route path="/user" component={CreateUser} />
        <Route path="/chat" component={ChatPage} />
    </Router>
  );
}

export default App;
