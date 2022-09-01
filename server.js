const express = require('express');
const path = require('path');
const http = require('http');



const app = express();
const server = http.createServer(app);


const io = require('socket.io')(server);

//Aumentado
app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname+'/public')));

io.on('connection', function(socket){
    socket.on('newuser', function(username){
        socket.broadcast.emit('update', username + 'joined the conversation');
    });
    socket.on('exituser', function(username){
        socket.broadcast.emit('update', username + 'left the conversation');
    });
    socket.on('chat', function(message){
        socket.broadcast.emit('chat', message);
    });
});
//server.listen(3000);
server.listen(app.get('port'));
console.log(`server on port ${app.get('port')}`);
