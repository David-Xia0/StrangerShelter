const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const http = require('http');

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

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('sendMessage', (message, callback) => {
    console.log(message);
    message = { user: 'admin', text: message};
    io.emit('message',message);
    callback();
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
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