import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import Homepage from "./components/homepage.component";
import CreateUser from "./components/create-user.component";
import Join from "./components/join/Join";
import Chat from "./components/chat/Chat";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={Homepage} />
        <Route path="/user" component={CreateUser} />
        <Route path="/join" component={Join} />
        <Route path="/chat" component={Chat} />
      </div>
    </Router>
  );
}

export default App;
