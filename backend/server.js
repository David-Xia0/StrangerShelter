const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./src/Users');

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

io.on('connection', function (socket) {
  socket.on('join', ({ name, room }, callback) => {
    var roomNumber = 1;
    var r = getUsersInRoom(roomNumber);
    while (true) {
      if (r.length > 3) {
        roomNumber++;
        r = getUsersInRoom(roomNumber);
      } else {
        break;
      }
    }
    
    const { error, user } = addUser({ id: socket.id, name, room: roomNumber });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'Admin', text: `${user.name}, welcome to room ${user.room}.` });
    socket.broadcast.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has joined!` });
    console.log(user.name + "joined chat: " + user.room);
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    console.log(getUsersInRoom(user.room));
    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', function () {

    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
      console.log("disconnected " + user.name);
    }

  });
});

const usersRouter = require('./routes/users');
const chatsRouter = require('./routes/Chats');
const statisticsRouter = require('./routes/Statistics');

app.use('/users', usersRouter);
app.use('/Chats', chatsRouter);
app.use('/Statistics', statisticsRouter);

server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});