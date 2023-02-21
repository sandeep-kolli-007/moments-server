let app = require('express')();
let server = require('http').createServer(app);
// let io = require('socket.io')(server);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
    console.log('a user connected');
  
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg.message + ' from ' + msg.sender);
        io.emit('chat message', msg);
      });
  });
//

var port = process.env.PORT || 3001;

server.listen(port, function(){
   console.log('listening in http://localhost:' + port);
});