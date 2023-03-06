const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const app = require('express')();
app.use(cors);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const server = require('http').createServer(app);
const io = require('socket.io')(server);
 


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


app.get('/', (req, res) => {
  res.send('Hello from Firebase!' );
});

var port = process.env.PORT || 3001;
server.listen(port, function(){
   console.log('listening in https://moments-node.web.app');
});
exports.app = functions.https.onRequest(app);
