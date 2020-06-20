import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';
import onlineIcon from '../../../icons/onlineIcon.png';

import './UserList.css';
import { Container, Row, Col } from 'react-bootstrap';

const UserList = ({ users }) => (
<div className="userListBorder">
  <Container>
    <h1 className="userListTitle">People currently chatting:</h1>
    {
      users
        ? (
          <Col className="userListUserContainer">
              {users.map(({ name }) => (
                <Row key={name} className="userListText">
                  {name}
                  <img className="userListOnlineIcon" alt="Online Icon" src={onlineIcon} />
                </Row>
              ))}
          </Col>
        )
        : null
    }
  </Container>
  </div>
);

export default UserList;