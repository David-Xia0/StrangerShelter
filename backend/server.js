const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./src/Users.js');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/users');
const chatRouter = require('./routes/chats');

app.use('/users', usersRouter);
app.use('/chats', chatRouter);

io.on('connection', function(socket){

  socket.on('join', ({ name, room }, callback) => {
    console.log("User: " + name + " Joined: " + room);
    const { error, user } = addUser({ id: socket.id, name, room });
    
    if (error) return callback(error);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` });
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!`})


    socket.join(user.room);
    callback();
  });
  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', {user: user.name, text: message});

    callback();
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

server.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});