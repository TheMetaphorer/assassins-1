var express = require('express');
var app = express();
var favicon = require('serve-favicon');
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.use(express.static('public'));

app.use(favicon(__dirname + '/favicon.ico'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('*', function(req, res) {
    res.redirect('/');
});

io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });
});

http.listen(port, function() {
  console.log('listening on *:' + port);
});
