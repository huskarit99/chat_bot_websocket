const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const { addUser , removeUser, getUser }  = require('./users');
const url = '127.0.0.1';

const app = express();
const router = express.Router();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

router.get('/', (req, res) => {
  res.send({ respone: 'Server is up and running' }).status(200);
});

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) {
      callback(error);
    } else {
      socket.join(user.room);
      socket.broadcast.to(user.room).emit('new', { name: 'admin', room: user.room, message: user.name + ' has joined !!!' });
      socket.emit('new', { name: 'admin', room: user.room, message: "Let's start, my friend !!!" });
      callback();
    }
  });
  socket.on('sendMessage', (info, callback) => {
    io.to(info.room).emit('responeMessage', info);
    callback();
  });

  socket.on('disconnect', () => {
    const info = getUser(socket.id);
    if (info){
      removeUser(socket.id);
      io.to(info.room).emit('responeMessage', { name: 'admin', room: info.room, message: info.name + ' has left !!!' });
    }
  });
});

server.listen(5000, url, () => console.log('Server has started'));

module.export = router;