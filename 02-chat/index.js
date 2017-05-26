var express = require('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
server.listen(port,function(){
  console.log("Server running on port : " + port);
})

app.use(express.static(__dirname));


app.get('/',function(req,res){
  console.log(io.sockets.adapter.rooms);
  res.sendFile(__dirname+'/index.html');
});

app.get('/onlineusers', function(req,res){
  console.log(io.sockets.adapter.rooms);
  res.send(io.sockets.adapter.rooms)
})
io.on('connection',function (socket) {
  console.log("A user connectedL "+socket.id);
  io.emit("user joined", socket.id);

  socket.on('chat.message', function(message) {
    io.emit('chat.message', message);
  });

  socket.on('disconnect', function () {
    console.log("User left: "+socket.id);
    socket.broadcast.emit("user left", socket.id);
  })
})
