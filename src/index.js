const express = require('express');
const path = require('path');
const app = express();
const handlebars = require('express-handlebars');
const dangnhap = require('./routers/dangnhapRouter.js');
let port = 3000;
const morgan = require('morgan');
const server = require("http").Server(app);
const io = require("socket.io")(server);


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded());
app.use(express.json());

// HTTP Logger
app.use(morgan('combined'));
//Template engine
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resource', 'views'));
// var mangRoom=[]
var mangUser = [];
io.on("connection", (socket) => {
    console.log("co nguoi ket noi: " + socket.id);

    socket.on("disconnect", () => {
        console.log(socket.id + " Vua disconnect")
        mangUser.forEach((m, i) => {
            if (m.nickname == socket.Name) {
                mangUser.splice(i, 1);
                socket.broadcast.emit("List-friend-in-room-server", mangUser);
            }
        });
    });

    socket.on("login-room-client", (data) => {
        console.log("name " +data.nickname)
        if ( data.nickname.length !=0) {

            socket.on("logout-room-client", () => {
                mangUser.forEach((m, i) => {
                    if (m.nickname == socket.Name) {
                        console.log("logout success");
                        mangUser.splice(i, 1);
                        socket.leaveAll(socket.Phong);
                        console.log(socket.Phong);
                        io.sockets.emit("List-friend-in-room-server", mangUser);
                        console.log(socket.adapter.rooms);
                    }
                });
            });


            socket.join(data.room);
            socket.Phong = data.room;
            socket.Name = data.nickname.trim();
            mangUser.push(data);
            // io.sockets.in(socket.Phong).emit("List-friend-in-room-server", mangUser);
            io.sockets.emit("List-friend-in-room-server", mangUser);
            io.sockets.in(socket.Phong).emit("login-room-server", socket.Phong);
            console.log(socket.adapter.rooms);
            socket.on("Client-send-data", (data) => {
                io.sockets.in(socket.Phong).emit("Server-send-data", { ten: socket.Name, noidung: data ,rm : socket.Phong, sk:socket.id});
            });
 
            
            
        }else{
            socket.emit("login-room-success-server","Bạn chưa nhập tên"+data.nickname);
        }
    });

    
    console.log(socket.adapter.rooms);
});



// all socket
// io.sockets.emit("Server-send-data", {name:"Hoang binh",mess:data});
// io.sockets.in("ROOM1").emit("Server-send-data", data);
// your socket
// socket.emit("Server-send-data", data +" your socket");

//all socket not you
// socket.broadcast.emit("Server-send-data", data +" your socket not "+socket.id);












dangnhapRouter(app);

server.listen(process.env.PORT || port, () => { console.log(`Server đang start trên cổng: http://localhost:${port}`) });