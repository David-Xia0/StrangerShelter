import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component";
import Homepage from "./components/homepage.component"
import CreateUser from "./components/create-user.component"
import JoinPage from "./components/joinpage/JoinPage"

function App() {
  return (
    <Router>
        <Route path="/" exact component={JoinPage} />
        <Route path="/user" component={CreateUser} />
    </Router>
  );
}

export default App;
