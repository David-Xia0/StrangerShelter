import React, { useState, Component } from 'react';
import { Link } from "react-router-dom";

import './TOS.css';



export default class TOS extends Component{

    render(){
        return (

            <div className="textBox">
                <h1 className="text"> By using the stranger shelter website/service you agree to the following terms and conditions: </h1>
                <h1 className="text"> Do not use stranger shelter if you are under 13. If you re under 18 use it only with parental guidence and permission. </h1>
                <h1 className="text"> Do not sexually or racially harass anyone, publicises other peoples private and personal infomation, make statements that defame or libel anyone, violate intellectual property rights, use automated programs to start chats, or behave in any illegal way.  </h1>
                
                <h1 className="text"> stranger shelter and all entities associated with stranger shelter, shall not be held liable for any direct or indirect damages that arise from the use of the website </h1>
                <h1 className="text"> use Stranger shelter at your own peril</h1>
            
                <h1 className="text"> </h1>
                <h1 className="text"> Stranger shelter does no retain any chat logs and all messages are deleted after all users leave a chat room</h1>
            
            </div>

        );
    }
}